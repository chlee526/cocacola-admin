import { Dispatch, SetStateAction } from 'react';

interface SiteResonseModel<T> {
    result: {
        code: string;
        message: string;
        total: number;
        data: T;
    };
}

// 사이트 목록 타입
type SiteType = 'ALL' | 'SELECT';

// 사이트 목록
interface SiteListModel {
    seq: number;
    siteName: string;
    url: string;
    active: number;
    chSeq?: string;
    channels: string;
    lang: string;
    country: string;
}

// 사이트 이동
interface SiteMoveReqeustModel {
    seq?: number[];
    sseq?: number[];
    type: 'POST' | 'DELETE';
    chSeq?: number;
}
interface SiteMoveResponseModel {
    result: {
        code: string;
        message: string;
        total: number;
        data: SiteListModel[];
    };
}

// 사이트 그룹 목록
interface SiteGrpListModel {
    seq: string; // 시퀀스
    channel: string; // 그룹명
    grp?: string;
}
interface SiteGrpResponseType {
    seq: number | string;
    channel: string;
}

// 사이트 그룹 추가/삭제
interface SiteGrpAddReqeustModel {
    channel: string;
}
interface SiteGrpMdfyReqeustModel {
    seq: number;
    channel: string;
}
interface SiteGrpDelReqeustModel {
    seq: number;
}

// 언어
interface SiteLanguageType {
    code: string;
    name: string;
}

// 필터링 조건
interface SiteFiltersType {
    lang: string;
    sort?: string;
    channel?: number | string;
    keyword?: string;
}

// 컨텍스트 - 사이트페이지
interface SitePageContextModel {
    allSiteSelected: Set<number>;
    setAllSiteSelected: Dispatch<SetStateAction<Set<number>>>;
    selSiteSelected: Set<number>;
    setSelSiteSelected: Dispatch<SetStateAction<Set<number>>>;
    languageList?: SiteLanguageType[] | null;
    setlanguageList: Dispatch<SetStateAction<SiteLanguageType[] | null>>;
    selGrp: string | number | null;
    setSelGrp: Dispatch<SetStateAction<string | number | null>>;
    allGrpList: SiteGrpListModel[] | null;
    setAllGrpList: Dispatch<SetStateAction<SiteGrpListModel[] | null>>;
}

// 컨텍스트 - 리스트
interface ListContextModel {
    listType: SiteType;
    data: SiteListModel[] | undefined;
    selectedItems: Set<number>;
    handleToggle: (seq: number) => void;
    filters: SiteFiltersType | null;
    setFilters: Dispatch<React.SetStateAction<SiteFiltersType | null>>;
}

export type {
    SiteResonseModel,
    SiteType,
    SiteLanguageType,
    SiteListModel,
    SiteGrpListModel,
    SiteGrpAddReqeustModel,
    SiteGrpMdfyReqeustModel,
    SiteGrpDelReqeustModel,
    SiteFiltersType,
    SiteMoveReqeustModel,
    SiteMoveResponseModel,
    SiteGrpResponseType,
    SitePageContextModel,
    ListContextModel,
};
