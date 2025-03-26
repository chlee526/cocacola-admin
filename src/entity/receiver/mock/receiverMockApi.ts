import { http, HttpResponse } from 'msw';
const URL = import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_RECEIVER;
const RECEIVER_DUPLICATE = import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_RECEIVER_DUPLICATE;
const RECEIVER_EXCEL = import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_RECEIVER_EXCEL;
const receiverMockApi = [
    // 정보 수신자 조회
    http.get(URL, async () => {
        // await delay(2000);
        return HttpResponse.json({
            result: {
                code: '200',
                message: 'OK',
                total: 9,
                data: [
                    {
                        seq: 58,
                        email: 'test7@test.com',
                        position: '사원',
                        dept: '서비스개발',
                        state: 'Y',
                        regDate: '2024-12-10T09:45:21.987966',
                        mseq: 3,
                        mname: '이창환',
                        rname: '홍길동',
                    },
                    {
                        seq: 57,
                        email: 'test6@test.com',
                        position: null,
                        dept: '서비스개발',
                        state: 'N',
                        regDate: '2024-12-10T09:45:21.986364',
                        mseq: 3,
                        mname: '이창환',
                        rname: '홍길동',
                    },
                    {
                        seq: 56,
                        email: 'test5@test.com',
                        position: '과장',
                        dept: '서비스개발',
                        state: 'N',
                        regDate: '2024-12-10T09:45:21.984751',
                        mseq: 3,
                        mname: '이창환',
                        rname: '홍길동',
                    },
                    {
                        seq: 55,
                        email: 'test4@test.com',
                        position: '대리',
                        dept: '서비스개발',
                        state: 'N',
                        regDate: '2024-12-10T09:45:21.983148',
                        mseq: 3,
                        mname: '이창환',
                        rname: '홍길동',
                    },
                    {
                        seq: 54,
                        email: 'test8@test.com',
                        position: '사원',
                        dept: '서비스개발',
                        state: 'Y',
                        regDate: '2024-12-10T09:45:21.98159',
                        mseq: 3,
                        mname: '이창환',
                        rname: '123',
                    },
                    {
                        seq: 53,
                        email: 'test3@test.com',
                        position: null,
                        dept: '서비스개발',
                        state: 'N',
                        regDate: '2024-12-10T09:45:21.979772',
                        mseq: 3,
                        mname: '이창환',
                        rname: '123',
                    },
                    {
                        seq: 52,
                        email: 'test2@test.com',
                        position: '과장',
                        dept: '서비스개발',
                        state: 'N',
                        regDate: '2024-12-10T09:45:21.978127',
                        mseq: 3,
                        mname: '이창환',
                        rname: '홍길동',
                    },
                    {
                        seq: 51,
                        email: 'test1@test.com',
                        position: '사원',
                        dept: '서비스개발',
                        state: 'Y',
                        regDate: '2024-12-10T09:45:21.976552',
                        mseq: 3,
                        mname: '이창환',
                        rname: '홍길동',
                    },
                    {
                        seq: 50,
                        email: 'test@test.com',
                        position: '사원',
                        dept: '서비스개발',
                        state: 'Y',
                        regDate: '2024-12-10T09:45:21.974628',
                        mseq: 3,
                        mname: '이창환',
                        rname: '홍길동',
                    },
                ],
            },
        });
    }),

    // 특정 정보 수신자 조회
    http.get(`${URL}/58`, async () => {
        // await delay(2000);
        return HttpResponse.json({
            result: {
                code: '200',
                message: 'OK',
                total: 1,
                data: {
                    seq: 58,
                    email: 'test7@test.com',
                    position: '사원',
                    dept: '서비스개발',
                    state: 'Y',
                    regDate: '2024-12-10T09:45:21.987966',
                    mseq: 3,
                    mname: '이창환',
                    rname: '홍길동',
                },
            },
        });
    }),

    // 정보 수신자 등록
    http.post(URL, async () => {
        // await delay(2000);
        return new HttpResponse(null, {
            status: 200,
        });
    }),

    // 정보 수신자 수정
    http.put(URL, async () => {
        // await delay(2000);
        return new HttpResponse(null, {
            status: 200,
        });
    }),

    // 정보 수신자 삭제
    http.delete(URL, async () => {
        // await delay(2000);
        return new HttpResponse(null, {
            status: 200,
        });
    }),

    // 이메일 중복검사
    http.get(RECEIVER_DUPLICATE, async () => {
        // await delay(2000);
        return new HttpResponse(null, {
            status: 200,
        });
    }),

    // 정보 수신자 등록(Excel)
    http.post(RECEIVER_EXCEL, async () => {
        // await delay(2000);
        return new HttpResponse(null, {
            status: 200,
        });
    }),
];

export { receiverMockApi };
