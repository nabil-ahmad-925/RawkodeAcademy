import { createOAuth2Request, encodeBasicCredentials, sendTokenRequest } from "arctic/dist/request";
import type { OAuth2Tokens } from "arctic";

const baseUrl = "https://zitadel.rawkode.academy";
const authorizationEndpoint = `${baseUrl}/oauth/v2/authorize`;
const tokenEndpoint = `${baseUrl}/oauth/v2/token`;

export class Zitadel {
	private clientId: string;
	private clientSecret: string;
	private redirectURI: string | null;

	constructor(clientId: string, clientSecret: string, redirectURI: string | null) {
		this.clientId = clientId;
		this.clientSecret = clientSecret;
		this.redirectURI = redirectURI;
	}

	public createAuthorizationURL(state: string, scopes: string[]): URL {
		const url = new URL(authorizationEndpoint);
		url.searchParams.set("response_type", "code");
		url.searchParams.set("client_id", this.clientId);
		url.searchParams.set("state", state);
		url.searchParams.set("scope", scopes.join(" "));
		if (this.redirectURI !== null) {
			url.searchParams.set("redirect_uri", this.redirectURI);
		}
		return url;
	}

	public async validateAuthorizationCode(code: string): Promise<OAuth2Tokens> {
		const body = new URLSearchParams();
		body.set("grant_type", "authorization_code");
		body.set("code", code);
		if (this.redirectURI !== null) {
			body.set("redirect_uri", this.redirectURI);
		}
		const request = createOAuth2Request(tokenEndpoint, body);
		const encodedCredentials = encodeBasicCredentials(this.clientId, this.clientSecret);
		request.headers.set("Authorization", `Basic ${encodedCredentials}`);
		const tokens = await sendTokenRequest(request);
		return tokens;
	}

	public async refreshAccessToken(refreshToken: string): Promise<OAuth2Tokens> {
		const body = new URLSearchParams();
		body.set("grant_type", "refresh_token");
		body.set("refresh_token", refreshToken);
		const request = createOAuth2Request(tokenEndpoint, body);
		const encodedCredentials = encodeBasicCredentials(this.clientId, this.clientSecret);
		request.headers.set("Authorization", `Basic ${encodedCredentials}`);
		const tokens = await sendTokenRequest(request);
		return tokens;
	}
}
