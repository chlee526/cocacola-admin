import { http, HttpResponse } from 'msw';

const adminMockApi = [
    // 특정 권한
    http.get(`${import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_AUTH}/24`, async () => {
        // await delay(2000);
        return HttpResponse.json({
            result: {
                code: '200',
                message: 'OK',
                total: 1,
                data: {
                    auth: {
                        seq: 24,
                        authName: 'test',
                        state: 'Y',
                        regDate: '2024-12-16T15:08:59.663087',
                        menuAuthList: [
                            {
                                authMenuMappingSeq: 228,
                                methods: ['GET'],
                                menuDto: {
                                    menuSeq: 1,
                                    name: '관리자',
                                    pseq: 0,
                                    depth: 0,
                                    url: '/view/admin',
                                    regDate: '2024-09-27T16:06:57.1669',
                                    comment: null,
                                    child: [
                                        {
                                            authMenuMappingSeq: 229,
                                            methods: ['GET'],
                                            menuDto: {
                                                menuSeq: 3,
                                                name: '권한 관리',
                                                pseq: 1,
                                                depth: 1,
                                                url: '/view/admin/auth',
                                                regDate: '2024-09-27T16:08:27.941072',
                                                comment: null,
                                                child: [],
                                                mseq: 54,
                                                mname: '승재',
                                            },
                                        },
                                    ],
                                    mseq: 54,
                                    mname: '승재',
                                },
                            },
                        ],
                        mseq: 3,
                        mname: '이창환',
                    },
                },
            },
        });
    }),

    // 권한 등록
    http.post(import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_AUTH, async () => {
        // await delay(2000);
        return new HttpResponse(null, {
            status: 200,
        });
    }),

    // 권한 수정
    http.put(import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_AUTH_STATE, async () => {
        // await delay(2000);
        return new HttpResponse(null, {
            status: 200,
        });
    }),

    // 권한 삭제
    http.delete(import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_AUTH, async () => {
        // await delay(2000);
        return new HttpResponse(null, {
            status: 200,
        });
    }),
];

export { adminMockApi };
