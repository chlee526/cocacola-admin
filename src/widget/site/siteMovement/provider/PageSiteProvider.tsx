import { ReactNode, useMemo, useState } from 'react';

import { SiteGrpListModel, SiteLanguageType, SitePageContext } from '@/entity/site';

interface OwnProps {
    children: ReactNode;
}

const PageSiteProvider = ({ children }: OwnProps) => {
    // 각 선택 사이트 목록
    const [allSiteSelected, setAllSiteSelected] = useState<Set<number>>(new Set());
    const [selSiteSelected, setSelSiteSelected] = useState<Set<number>>(new Set());

    // 언어 목록
    const [languageList, setlanguageList] = useState<SiteLanguageType[] | null>(null);

    // 전체 그룹 목록
    const [allGrpList, setAllGrpList] = useState<SiteGrpListModel[] | null>(null);

    // 선택 목록 - 선택 그룹
    const [selGrp, setSelGrp] = useState<string | number | null>(null);

    // Export
    const value = useMemo(
        () => ({
            allSiteSelected,
            setAllSiteSelected,
            selSiteSelected,
            setSelSiteSelected,
            languageList,
            setlanguageList,
            selGrp,
            setSelGrp,
            allGrpList,
            setAllGrpList,
        }),
        [
            allSiteSelected,
            selSiteSelected,
            setAllSiteSelected,
            setSelSiteSelected,
            languageList,
            setlanguageList,
            selGrp,
            allGrpList,
        ],
    );

    // if (isGrpLoading || isAllSiteLoading || isSelSiteLoading) return <div>로딩중</div>;

    return <SitePageContext.Provider value={value}>{children}</SitePageContext.Provider>;
};

export { PageSiteProvider };
