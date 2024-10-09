import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ params, request }) => {
	const id = params.id;
	return new Response(
		JSON.stringify({
			name: "rawkode",
		})
	)
}
