import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { genericOAuth } from "better-auth/plugins"; // <-- add this
import { db } from "@/db";
import { env } from "../env";
import { checkout, dodopayments, portal, webhooks } from "@dodopayments/better-auth";
import { dodoPayments } from "./dodo-payments";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),

  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  plugins: [
    dodopayments({
      client: dodoPayments,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "pdt_xxxxxxxxxxxxxxxxxxxxx",
              slug: "premium-plan",
            },
          ],
          successUrl: "/dashboard/success",
          authenticatedUsersOnly: true,
        }),
        portal(),
        webhooks({
          webhookKey: env.DODO_PAYMENTS_WEBHOOK_SECRET!,
          onPayload: async (payload) => {
            console.log("Received webhook:", payload.type);
          },
        }),
      ]
    }),
    genericOAuth({
      config: [
        {
          providerId: "youtube",
          clientId: env.YOUTUBE_CLIENT_ID!,
          clientSecret: env.YOUTUBE_CLIENT_SECRET!,
          authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth",
          tokenUrl: "https://oauth2.googleapis.com/token",
          scopes: [
            "https://www.googleapis.com/auth/youtube.upload",
            "https://www.googleapis.com/auth/youtube.readonly",
            "openid",
            "profile",
            "email",
          ],
          accessType: "offline",   // <-- required to get a refresh token
          prompt: "consent",       // <-- forces Google to return refresh token every time
          getUserInfo: async (tokens) => {
            const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
              headers: { Authorization: `Bearer ${tokens.accessToken}` },
            });
            const profile = await res.json();
            return {
              id: profile.sub,
              name: profile.name,
              email: profile.email,
              image: profile.picture,
              emailVerified: true,
            };
          },
        },
      ],
    }),
  ],
}); 