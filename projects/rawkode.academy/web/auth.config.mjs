import Zitadel from "@auth/core/providers/zitadel";
import { defineConfig } from "auth-astro";

export default defineConfig({
	providers: [
		Zitadel({
			wellKnown:
				`${import.meta.env.ZITADEL_URL}/.well-known/openid-configuration`,
			issuer: import.meta.env.ZITADEL_URL,
			clientId: import.meta.env.ZITADEL_CLIENT_ID,
			checks: ["pkce", "state"],
			client: {
				token_endpoint_auth_method: "none",
			},
		}),
	],
	skipCSRFCheck: true,
	callbacks: {
		session({ session, token }) {
			console.debug(session);

			if (session.user && token?.sub) {
				session.user.id = token.sub;
			}
			return session;
		},
	},
});
