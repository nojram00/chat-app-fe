import type instance from "nojram-messaging-api-client";

declare global {
    interface Window {
        MessagingApi: typeof instance
    }
}