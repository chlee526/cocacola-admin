import { http, HttpResponse } from 'msw';

const analysisHandeler = [
    http.get('./analysis', async ({ request }) => {
        const body = await request.json();
        console.log('body', body);

        return HttpResponse.json({ result: 'success' });
    }),
];

export { analysisHandeler };
