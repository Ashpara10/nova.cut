import { env } from "@/env";
import { dodopaymentsClient } from "@dodopayments/better-auth/client";
import { genericOAuthClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: env.BETTER_AUTH_URL,
  plugins: [
    genericOAuthClient(),
    dodopaymentsClient()
  ],
});

export default authClient;

// Export hooks for convenience
export const { useSession, signIn, signUp, signOut } = authClient;
