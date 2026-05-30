import { env } from "@/env";
import DodoPayments from "dodopayments";

export const dodoPayments = new DodoPayments({
    bearerToken: env.DODO_PAYMENTS_API_KEY!,
    environment: env.DODO_PAYMENTS_ENVIRONMENT
});