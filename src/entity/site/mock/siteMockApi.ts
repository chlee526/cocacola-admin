import { http, HttpResponse, delay } from 'msw';
const SITE_ALL = import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_SITE_ALL_LIST;
const SITE_MAPPING = import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_SITE_MAPPING;
const SITE_CHNS = import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_SITE_CHNS;
const siteMockApi = [
    // 전체 사이트 조회
    http.get(SITE_ALL, async () => {
        // await delay(2000);
        return HttpResponse.json({
            result: {
                code: '200',
                message: 'OK',
                total: 22,
                data: [
                    {
                        seq: 10,
                        siteName: '한국일보',
                        url: 'https://www.hankookilbo.com',
                        active: 1,
                        channels: 'MAIN',
                        lang: 'KOR',
                        country: 'KOR',
                    },
                    {
                        seq: 11,
                        siteName: '서울경제',
                        url: 'https://www.sedaily.com',
                        active: 1,
                        channels: 'MAIN',
                        lang: 'KOR',
                        country: 'KOR',
                    },
                    {
                        seq: 12,
                        siteName: '헤럴드경제',
                        url: 'http://biz.heraldcorp.com',
                        active: 1,
                        channels: 'MAIN',
                        lang: 'KOR',
                        country: 'KOR',
                    },
                    {
                        seq: 59,
                        siteName: '건강보험심사평가원',
                        url: 'http://www.hira.or.kr',
                        active: 1,
                        channels: 'MAIN',
                        lang: 'KOR',
                        country: 'KOR',
                    },
                    {
                        seq: 363,
                        siteName: '씽크풀',
                        url: 'https://www.thinkpool.com',
                        active: 1,
                        channels: 'MAIN',
                        lang: 'KOR',
                        country: 'KOR',
                    },
                    {
                        seq: 596,
                        siteName: '[네이버블로그] 지구의벗 환경운동연합',
                        url: 'https://blog.naver.com/kfemblog',
                        active: 1,
                        channels: 'MAIN',
                        lang: 'KOR',
                        country: 'KOR',
                    },
                    {
                        seq: 1777,
                        siteName: 'TheKoreaPost',
                        url: 'https://www.koreapost.com',
                        active: 1,
                        channels: 'MAIN',
                        lang: 'ENG',
                        country: 'ENG',
                    },
                    {
                        seq: 2196,
                        siteName: '네이버뉴스',
                        url: 'https://news.naver.com',
                        active: 1,
                        channels: 'MAIN',
                        lang: 'KOR',
                        country: 'KOR',
                    },
                    {
                        seq: 2199,
                        siteName: '다음뉴스',
                        url: 'https://news.daum.net',
                        active: 1,
                        channels: 'MAIN',
                        lang: 'KOR',
                        country: 'KOR',
                    },
                    {
                        seq: 2867,
                        siteName: '카액션',
                        url: 'http://www.car-action.com',
                        active: 1,
                        channels: 'MAIN',
                        lang: 'KOR',
                        country: 'KOR',
                    },
                    {
                        seq: 3555,
                        siteName: '네이버카페',
                        url: 'http://section.cafe.naver.com',
                        active: 1,
                        channels: 'MAIN',
                        lang: 'KOR',
                        country: 'KOR',
                    },
                    {
                        seq: 4608,
                        siteName: 'HeyKorean',
                        url: 'http://www.heykorean.com',
                        active: 1,
                        channels: 'MAIN',
                        lang: 'GLB',
                        country: 'GLB',
                    },
                    {
                        seq: 4662,
                        siteName: '호주시드니한인회',
                        url: 'https://sydneyhanin.korean.net',
                        active: 1,
                        channels: 'MAIN',
                        lang: 'GLB',
                        country: 'GLB',
                    },
                    {
                        seq: 4809,
                        siteName: '오늘의유머',
                        url: 'https://www.todayhumor.co.kr',
                        active: 1,
                        channels: 'MAIN',
                        lang: 'KOR',
                        country: 'KOR',
                    },
                    {
                        seq: 5170,
                        siteName: 'RFDH',
                        url: 'http://www.rfdh.com',
                        active: 1,
                        channels: 'MAIN',
                        lang: 'ENG',
                        country: 'ENG',
                    },
                    {
                        seq: 5911,
                        siteName: '이글루스',
                        url: 'http://www.egloos.com',
                        active: 1,
                        channels: 'MAIN',
                        lang: 'KOR',
                        country: 'KOR',
                    },
                    {
                        seq: 8064,
                        siteName: '뽐뿌',
                        url: 'https://www.ppomppu.co.kr',
                        active: 1,
                        channels: 'MAIN',
                        lang: 'KOR',
                        country: 'KOR',
                    },
                    {
                        seq: 9151,
                        siteName: '[네이버블로그] 국회의원_배은희',
                        url: 'https://blog.naver.com/behappytalk',
                        active: 1,
                        channels: 'MAIN',
                        lang: 'KOR',
                        country: 'KOR',
                    },
                    {
                        seq: 5011100,
                        siteName: 'mk:CN',
                        url: 'https://www.mk.co.kr/chuna/cn',
                        active: 1,
                        channels: 'MAIN',
                        lang: 'ZHO',
                        country: 'ZHO',
                    },
                    {
                        seq: 5024620,
                        siteName: '오토카페',
                        url: 'http://www.autocafe.co.kr',
                        active: 1,
                        channels: 'MAIN',
                        lang: 'KOR',
                        country: 'KOR',
                    },
                    {
                        seq: 5025408,
                        siteName: '마간다카페',
                        url: 'https://www.magandacafe.com',
                        active: 1,
                        channels: 'MAIN',
                        lang: 'KOR',
                        country: 'KOR',
                    },
                    {
                        seq: 5031729,
                        siteName: '티카페',
                        url: 'https://www.tcafe2a.com',
                        active: 1,
                        channels: 'MAIN',
                        lang: 'KOR',
                        country: 'KOR',
                    },
                ],
            },
        });
    }),

    // 수집 사이트 조회
    http.get(SITE_MAPPING, async () => {
        // await delay(2000);
        return HttpResponse.json({
            result: {
                code: '200',
                message: 'OK',
                total: 4,
                data: [
                    {
                        seq: 34,
                        chSeq: 1,
                        channel: '뉴스',
                        siteName: '동아일보',
                        url: 'https://www.donga.com',
                        active: 1,
                        lang: 'KOR',
                        sseq: 4,
                    },
                    {
                        seq: 36,
                        chSeq: 1,
                        channel: '뉴스',
                        siteName: '매일경제',
                        url: 'https://www.mk.co.kr',
                        active: 1,
                        lang: 'KOR',
                        sseq: 6,
                    },
                    {
                        seq: 35,
                        chSeq: 2,
                        channel: '포탈',
                        siteName: '중앙일보',
                        url: 'https://www.joongang.co.kr',
                        active: 1,
                        lang: 'KOR',
                        sseq: 5,
                    },
                    {
                        seq: 37,
                        chSeq: 3,
                        channel: '블로그',
                        siteName: '한겨레',
                        url: 'https://www.hani.co.kr',
                        active: 1,
                        lang: 'KOR',
                        sseq: 9,
                    },
                ],
            },
        });
    }),

    // 수집 사이트 제거
    http.delete(SITE_MAPPING, async () => {
        // await delay(2000);
        return new HttpResponse(null, {
            status: 200,
        });
    }),

    // 수집 사이트 등록
    http.post(SITE_MAPPING, async () => {
        // await delay(2000);
        return new HttpResponse(null, {
            status: 200,
        });
    }),

    // 사이트 그룹 조회
    http.get(SITE_CHNS, async () => {
        // await delay(2000);
        return HttpResponse.json({
            result: {
                code: '200',
                message: 'OK',
                total: 20,
                data: [
                    {
                        seq: 1,
                        channel: '뉴스',
                    },
                    {
                        seq: 2,
                        channel: '포탈',
                    },
                    {
                        seq: 3,
                        channel: '블로그',
                    },
                    {
                        seq: 4,
                        channel: '카페',
                    },
                    {
                        seq: 5,
                        channel: '커뮤니티',
                    },
                    {
                        seq: 6,
                        channel: '트위터',
                    },
                    {
                        seq: 7,
                        channel: '페이스북',
                    },
                    {
                        seq: 8,
                        channel: '인스타그램',
                    },
                    {
                        seq: 9,
                        channel: '유투브',
                    },
                    {
                        seq: 10,
                        channel: '정부/공공기관',
                    },
                    {
                        seq: 11,
                        channel: '스토어',
                    },
                    {
                        seq: 12,
                        channel: '어플스토어',
                    },
                    {
                        seq: 13,
                        channel: '해외언론',
                    },
                    {
                        seq: 14,
                        channel: '해외포럼',
                    },
                    {
                        seq: 15,
                        channel: '웨이보',
                    },
                    {
                        seq: 16,
                        channel: '포탈탑',
                    },
                    {
                        seq: 17,
                        channel: '섹션',
                    },
                    {
                        seq: 18,
                        channel: '기타_국내',
                    },
                    {
                        seq: 19,
                        channel: '기타_해외',
                    },
                    {
                        seq: 20,
                        channel: '뉴스',
                    },
                ],
            },
        });
    }),

    // 사이트 그룹 등록
    http.post(SITE_CHNS, async () => {
        // await delay(2000);
        return new HttpResponse(null, {
            status: 200,
        });
    }),

    // 사이트 그룹 삭제
    http.delete(SITE_CHNS, async () => {
        // await delay(2000);
        return new HttpResponse(null, {
            status: 200,
        });
    }),

    // 사이트 그룹 수정
    http.put(SITE_CHNS, async () => {
        // await delay(2000);
        return new HttpResponse(null, {
            status: 200,
        });
    }),
];

export { siteMockApi };
