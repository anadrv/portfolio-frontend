import { PublicClientApplication } from "@azure/msal-browser";

console.log("CLIENT ID:", import.meta.env.VITE_CLIENT_ID);
console.log("TENANT ID:", import.meta.env.VITE_TENANT_ID);
console.log("REDIRECT:", import.meta.env.VITE_REDIRECT_URI);

export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID,

    authority:
      `https://login.microsoftonline.com/${import.meta.env.VITE_TENANT_ID}`,

    redirectUri: import.meta.env.VITE_REDIRECT_URI,

    navigateToLoginRequestUrl: false,
  },
};

export const msalInstance =
  new PublicClientApplication(msalConfig);