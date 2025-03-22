import { CommonModel } from '../model';

interface CommonModelNew {
    seq: number;
    name: string;
}

const COMMON_CHANNEL: readonly CommonModel[] = [
    {
        seq: 2,
        cmmType: 1,
        cmmCode: 1,
        cmmName: '뉴스',
        cmmPseq: 1,
        cmmOrder: 1,
        color: '',
    },
    {
        seq: 3,
        cmmType: 1,
        cmmCode: 2,
        cmmName: '포털',
        cmmPseq: 1,
        cmmOrder: 2,
        color: '',
    },
    {
        seq: 4,
        cmmType: 1,
        cmmCode: 3,
        cmmName: '블로그',
        cmmPseq: 1,
        cmmOrder: 3,
        color: '',
    },
    {
        seq: 5,
        cmmType: 1,
        cmmCode: 4,
        cmmName: '카페',
        cmmPseq: 1,
        cmmOrder: 4,
        color: '',
    },
    {
        seq: 6,
        cmmType: 1,
        cmmCode: 5,
        cmmName: '커뮤니티',
        cmmPseq: 1,
        cmmOrder: 5,
        color: '',
    },
    {
        seq: 7,
        cmmType: 1,
        cmmCode: 6,
        cmmName: '트위터',
        cmmPseq: 1,
        cmmOrder: 6,
        color: '',
    },
    {
        seq: 8,
        cmmType: 1,
        cmmCode: 7,
        cmmName: '인스타그램',
        cmmPseq: 1,
        cmmOrder: 7,
        color: '',
    },
];

const COMMON_FILTER: readonly CommonModel[] = [
    {
        seq: 10,
        cmmType: 2,
        cmmCode: 1,
        cmmName: '제목+내용',
        cmmPseq: 9,
        cmmOrder: 1,
        color: '',
    },
    {
        seq: 11,
        cmmType: 2,
        cmmCode: 2,
        cmmName: '제목',
        cmmPseq: 9,
        cmmOrder: 2,
        color: '',
    },
    {
        seq: 12,
        cmmType: 2,
        cmmCode: 3,
        cmmName: '내용',
        cmmPseq: 9,
        cmmOrder: 3,
        color: '',
    },
    {
        seq: 13,
        cmmType: 2,
        cmmCode: 4,
        cmmName: '메뉴명',
        cmmPseq: 9,
        cmmOrder: 4,
        color: '',
    },
    {
        seq: 14,
        cmmType: 2,
        cmmCode: 5,
        cmmName: 'URL',
        cmmPseq: 9,
        cmmOrder: 5,
        color: '',
    },
    {
        seq: 15,
        cmmType: 2,
        cmmCode: 6,
        cmmName: '특수문자포함',
        cmmPseq: 9,
        cmmOrder: 6,
        color: '',
    },
    {
        seq: 16,
        cmmType: 2,
        cmmCode: 7,
        cmmName: '특수문자제거',
        cmmPseq: 9,
        cmmOrder: 7,
        color: '',
    },
    {
        seq: 17,
        cmmType: 2,
        cmmCode: 8,
        cmmName: '일반',
        cmmPseq: 9,
        cmmOrder: 8,
        color: '',
    },
    {
        seq: 18,
        cmmType: 2,
        cmmCode: 9,
        cmmName: '구문',
        cmmPseq: 9,
        cmmOrder: 9,
        color: '',
    },
    {
        seq: 19,
        cmmType: 2,
        cmmCode: 10,
        cmmName: '인접',
        cmmPseq: 9,
        cmmOrder: 10,
        color: '',
    },
];

const COMMON_USER_GROUP: readonly CommonModel[] = [
    {
        seq: 30,
        cmmType: 4,
        cmmCode: 1,
        cmmName: '기본',
        cmmPseq: 29,
        cmmOrder: 1,
        color: '',
    },
    {
        seq: 31,
        cmmType: 4,
        cmmCode: 2,
        cmmName: '개발',
        cmmPseq: 29,
        cmmOrder: 2,
        color: '',
    },
    {
        seq: 32,
        cmmType: 4,
        cmmCode: 3,
        cmmName: '관리자',
        cmmPseq: 29,
        cmmOrder: 3,
        color: '',
    },
];

const COMMON_HISTORY_FILTER: readonly CommonModelNew[] = [
    {
        seq: 1,
        name: '시스템',
    },
    {
        seq: 2,
        name: '권한명',
    },
    {
        seq: 3,
        name: '접속 IP',
    },
    {
        seq: 4,
        name: '아이디',
    },
    {
        seq: 5,
        name: '이름',
    },
];

/**
 * 제외 키워드 검색 타입
 */
const EXCLUSION_SEARCH_TYPE: readonly CommonModelNew[] = [
    {
        seq: 1,
        name: '키워드',
    },
    {
        seq: 2,
        name: '최종 수정자',
    },
];
/**
 * 제외 키워드 옵션 종류
 */
const EXCLUSION_OP: readonly CommonModelNew[] = [
    {
        seq: 1,
        name: '일반',
    },
    {
        seq: 2,
        name: '구문',
    },
    {
        seq: 3,
        name: '인접',
    },
];
/**
 * 제외 키워드 필터링 구분
 */
const EXCLUSION_FILTER_TYPE: readonly CommonModelNew[] = [
    {
        seq: 1,
        name: '제목+내용',
    },
    {
        seq: 2,
        name: '제목',
    },
    {
        seq: 3,
        name: '내용',
    },
    {
        seq: 4,
        name: '게시판명',
    },
    {
        seq: 5,
        name: 'URL',
    },
];

/**
 * 키워드 검색 타입
 */
const KEYWORD_SEARCH_TYPE: readonly CommonModelNew[] = [
    {
        seq: 1,
        name: '키워드',
    },
    {
        seq: 2,
        name: '제외 키워드',
    },
    {
        seq: 3,
        name: '최종 수정자',
    },
];

export {
    COMMON_CHANNEL,
    COMMON_FILTER,
    COMMON_USER_GROUP,
    COMMON_HISTORY_FILTER,
    EXCLUSION_SEARCH_TYPE,
    EXCLUSION_OP,
    EXCLUSION_FILTER_TYPE,
    KEYWORD_SEARCH_TYPE,
};
