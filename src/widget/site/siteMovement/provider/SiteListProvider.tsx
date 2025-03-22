import { ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { SiteListContext, SitePageContext, SiteType } from '@/entity/site';
import { SiteFiltersType } from '@/entity/site/model/siteModel';
import { getLanguage, useSiteListQuery } from '@/feature/site';
import { Loader } from '@/shared/ui';

interface OwnProps {
    listType: SiteType;
    children: ReactNode;
}

const SiteListProvider = ({ listType, children }: OwnProps) => {
    // 전체사이트에서 선택, 선택사이트에서 선택 목록(전체 컨텐스트에서 관리)
    const {
        allSiteSelected,
        selSiteSelected,
        setAllSiteSelected,
        setSelSiteSelected,
        setlanguageList,
        setSelGrp,
    } = useContext(SitePageContext);

    // 사이트(API) 목록 데이터
    const { data, isFetching: isLoading } = useSiteListQuery(listType);

    useEffect(() => {
        if (listType === 'ALL' && data) {
            const languageList = getLanguage(data);
            if (languageList) setlanguageList(languageList);
        }
    }, [data]);

    // 선택 아이템
    const handleToggle = useCallback((seq: number) => {
        if (listType === 'ALL') {
            setAllSiteSelected(prevSelected => {
                const newSelected = new Set(prevSelected);
                if (newSelected.has(seq)) {
                    newSelected.delete(seq);
                } else {
                    newSelected.add(seq);
                }
                return newSelected;
            });
        } else {
            setSelSiteSelected(prevSelected => {
                const newSelected = new Set(prevSelected);
                if (newSelected.has(seq)) {
                    newSelected.delete(seq);
                } else {
                    newSelected.add(seq);
                }
                return newSelected;
            });
        }
    }, []);

    // 필터링
    const [filters, setFilters] = useState<SiteFiltersType | null>(null);
    useEffect(() => {
        if (filters) {
            setSelGrp(filters?.channel || '');
        }
    }, [filters]);

    // Export
    const value = useMemo(() => {
        return listType === 'ALL'
            ? { listType, data, selectedItems: allSiteSelected, handleToggle, filters, setFilters }
            : { listType, data, selectedItems: selSiteSelected, handleToggle, filters, setFilters };
    }, [listType, data, allSiteSelected, selSiteSelected, handleToggle, filters]);

    return (
        <SiteListContext.Provider value={value}>
            {data ? children : <div>사이트가가 없습니다.</div>}
            <Loader open={isLoading} />
        </SiteListContext.Provider>
    );
};

export { SiteListProvider };
