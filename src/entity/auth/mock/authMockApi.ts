import { http, HttpResponse, delay } from 'msw';

const authMockApi = [
    http.post('/login', async () => {
        await delay(2000);
        return HttpResponse.json({
            name: '홍길동(테스트)',
            user_no: 0,
            auth: [
                {
                    key: 'MEMBER',
                    name: '사용자',
                    auth: 2,
                },
                {
                    key: 'KEYWORD',
                    name: '키워드',
                    auth: 0,
                },
            ],
        });
        // return new HttpResponse(null, {
        //     status: 403,
        // });
    }),

    http.post('/logout', async () => {
        // await delay(3000);
        return HttpResponse.json({
            msg: 'success',
        });
    }),

    http.post('/auth', async () => {
        // await delay(2000);
        return HttpResponse.json({
            name: '홍길동(테스트)',
            user_no: 0,
            auth: [
                {
                    key: 'MEMBER',
                    name: '사용자',
                    auth: 2,
                },
                {
                    key: 'KEYWORD',
                    name: '키워드',
                    auth: 0,
                },
            ],
        });
    }),
];

export { authMockApi };
