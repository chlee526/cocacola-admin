interface CommonDataModel {
    seq: number;
    cmmType: number;
    cmmCode: number;
    cmmName: string;
    cmmPseq: number;
    cmmOrder: number;
    color: string;
    state: string;
    comment: null;
    children: CommonDataModel[] | null;
}

interface CommonResponseModel {
    result: {
        code: string;
        data: CommonDataModel[];
        message: string;
        total: number;
    };
}

type CommonKeyType = '채널' | '필터조건' | '검색조건' | '사용자그룹';

export type { CommonDataModel, CommonResponseModel, CommonKeyType };
