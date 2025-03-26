import { http, HttpResponse, delay } from 'msw';

const replaceMockApi = [
    http.get(import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_REPLACE, async ({ request }) => {
        // await delay(2000);
        return HttpResponse.json({
            result: {
                code: '200',
                message: 'OK',
                total: 54,
                data: [
                    {
                        seq: 150,
                        findKeyword: '테스트',
                        replaceKeyword: '테스트',
                        state: 'Y',
                        regDate: '2024-09-27T14:19:46.878135',
                        mseq: 70,
                        mname: '이창환',
                    },
                    {
                        seq: 132,
                        findKeyword: '37',
                        replaceKeyword: '테스트',
                        state: 'Y',
                        regDate: '2024-09-26T16:16:15.696392',
                        mseq: 70,
                        mname: '이창환',
                    },

                    {
                        seq: 97,
                        findKeyword: '게시판',
                        replaceKeyword: '테스트',
                        state: 'Y',
                        regDate: '2024-09-26T16:14:59.517443',
                        mseq: 70,
                        mname: '이창환',
                    },
                    {
                        seq: 96,
                        findKeyword: '보드',
                        replaceKeyword: '테스트',
                        state: 'Y',
                        regDate: '2024-09-26T16:14:59.516774',
                        mseq: 70,
                        mname: '이창환',
                    },
                    {
                        seq: 95,
                        findKeyword: '페이징',
                        replaceKeyword: '테스트',
                        state: 'Y',
                        regDate: '2024-09-26T16:14:59.514983',
                        mseq: 70,
                        mname: '이창환',
                    },
                    {
                        seq: 94,
                        findKeyword: '수',
                        replaceKeyword: '테스트으',
                        state: 'Y',
                        regDate: '2024-09-26T15:22:24.699872',
                        mseq: 70,
                        mname: '윤혜인',
                    },
                    {
                        seq: 93,
                        findKeyword: '테스트',
                        replaceKeyword: '테스트',
                        state: 'Y',
                        regDate: '2024-09-26T15:22:06.297509',
                        mseq: 70,
                        mname: '윤혜인',
                    },
                    {
                        seq: 92,
                        findKeyword: '등록',
                        replaceKeyword: '테스트',
                        state: 'Y',
                        regDate: '2024-09-26T14:32:21.152904',
                        mseq: 70,
                        mname: '윤혜인',
                    },
                    {
                        seq: 91,
                        findKeyword: '테스트',
                        replaceKeyword: 'tt',
                        state: 'Y',
                        regDate: '2024-09-26T14:28:22.387301',
                        mseq: 70,
                        mname: '윤혜인',
                    },
                    {
                        seq: 90,
                        findKeyword: 'dd',
                        replaceKeyword: 'fff',
                        state: 'Y',
                        regDate: '2024-09-25T15:17:37.83138',
                        mseq: 3,
                        mname: '이창환',
                    },
                    {
                        seq: 3,
                        findKeyword: 'cj',
                        replaceKeyword: 'ex)공백',
                        state: 'Y',
                        regDate: '2024-08-16T16:16:55.369643',
                        mseq: 54,
                        mname: '승재',
                    },
                    {
                        seq: 6,
                        findKeyword: '출처=CJ CGV',
                        replaceKeyword: '',
                        state: 'Y',
                        regDate: '2024-08-16T16:16:55.369643',
                        mseq: 54,
                        mname: '승재',
                    },
                    {
                        seq: 8,
                        findKeyword: '출처=CJ',
                        replaceKeyword: '',
                        state: 'Y',
                        regDate: '2024-08-16T16:16:55.369643',
                        mseq: 54,
                        mname: '승재',
                    },
                    {
                        seq: 9,
                        findKeyword: 'CJ 공장부지',
                        replaceKeyword: '',
                        state: 'Y',
                        regDate: '2024-08-16T16:16:55.369643',
                        mseq: 54,
                        mname: '승재',
                    },
                    {
                        seq: 10,
                        findKeyword: '출처/ CJ',
                        replaceKeyword: '',
                        state: 'Y',
                        regDate: '2024-08-16T16:16:55.369643',
                        mseq: 54,
                        mname: '승재',
                    },
                    {
                        seq: 11,
                        findKeyword: '출처 = CJ',
                        replaceKeyword: '',
                        state: 'Y',
                        regDate: '2024-08-16T16:16:55.369643',
                        mseq: 54,
                        mname: '승재',
                    },
                    {
                        seq: 12,
                        findKeyword: '찍고 있다.',
                        replaceKeyword: '',
                        state: 'Y',
                        regDate: '2024-08-16T16:16:55.369643',
                        mseq: 54,
                        mname: '승재',
                    },
                    {
                        seq: 13,
                        findKeyword: '찍고 있다 < CJ',
                        replaceKeyword: '',
                        state: 'Y',
                        regDate: '2024-08-16T16:16:55.369643',
                        mseq: 54,
                        mname: '승재',
                    },
                    {
                        seq: 2,
                        findKeyword: 'cj',
                        replaceKeyword: 'ex)공백',
                        state: 'Y',
                        regDate: '2024-08-16T16:16:14.531894',
                        mseq: 54,
                        mname: '승재',
                    },
                    {
                        seq: 5,
                        findKeyword: 'CJ∨공장 부지',
                        replaceKeyword: '',
                        state: 'Y',
                        regDate: '2024-08-16T16:16:14.531894',
                        mseq: 54,
                        mname: '승재',
                    },
                    {
                        seq: 4,
                        findKeyword: 'cj  = 부지',
                        replaceKeyword: ' ',
                        state: 'Y',
                        regDate: '2024-08-16T16:15:33.582492',
                        mseq: 54,
                        mname: '승재',
                    },
                ],
            },
        });
    }),
    http.post(import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_REPLACE, async ({ request }) => {
        // await delay(2000);
        return HttpResponse.json({
            result: {
                code: '200',
                message: 'OK',
                total: 0,
                data: null,
            },
        });
    }),
    http.put(import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_REPLACE, async ({ request }) => {
        // await delay(2000);
        return HttpResponse.json({
            result: {
                code: '200',
                message: 'OK',
                total: 0,
                data: null,
            },
        });
    }),

    http.delete(import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_REPLACE, async ({ request }) => {
        // await delay(2000);

        return HttpResponse.json({
            result: {
                code: '200',
                message: 'OK',
                total: 0,
                data: null,
            },
        });
    }),
];

export { replaceMockApi };
