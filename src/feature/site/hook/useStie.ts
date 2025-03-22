import {
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

import { useQueryClient } from '@tanstack/react-query';

import {
    SiteFiltersType,
    SiteGrpListModel,
    SiteGrpResponseType,
    SiteListContext,
    SiteListModel,
    SitePageContext,
    useSiteGrpAddMutation,
    useSiteGrpDelMutation,
    useSiteGrpListQuery,
    useSiteGrpMdfyMutation,
    useSiteListQuery,
    useSiteMoveMutation,
} from '@/entity/site';

import { SelectChangeEvent } from '@mui/material';

/**
 * 컨트롤 Hook
 */
const useControl = () => {
    const queryClient = useQueryClient();
    const {
        allSiteSelected,
        setAllSiteSelected,
        selSiteSelected,
        setSelSiteSelected,
        selGrp,
        allGrpList,
        setAllGrpList,
    } = useContext(SitePageContext);
    const { mutateAsync, isPending: isLoading } = useSiteMoveMutation();
    const selectedGrp = useMemo(() => {
        return selGrp;
        // return selGrp && selGrp?.split(',').length === 1;
    }, [selGrp]);
    const [selGrpDialogOpen, setSelGrpDialogOpen] = useState(false);
    const [dialogSelGrpCode, setDialogSelGrpCode] = useState<string | null>(null);

    const addSites = useCallback(async () => {
        try {
            const result = await mutateAsync({
                sseq: [...allSiteSelected],
                type: 'POST',
                chSeq: (selGrp && selectedGrp ? selGrp : dialogSelGrpCode) as number,
            });
            console.log('등록 성공', result);
            queryClient.invalidateQueries({ queryKey: ['siteList'] });
            setDialogSelGrpCode(null);
            setAllSiteSelected(new Set());
        } catch (error) {
            console.error('등록 실패', error);
        }
    }, [selGrp, selectedGrp, dialogSelGrpCode, allSiteSelected]);

    useEffect(() => {
        if (dialogSelGrpCode) addSites();
    }, [dialogSelGrpCode]);

    const handleAdd = async () => {
        if (!selectedGrp) setSelGrpDialogOpen(true);
        else addSites();
    };

    const handleDel = async () => {
        if (selSiteSelected.size) {
            const result = await mutateAsync({
                seq: [...selSiteSelected],
                type: 'DELETE',
            });
            console.log('삭제 성공', result);
            queryClient.invalidateQueries({ queryKey: ['siteList'] });
            setSelSiteSelected(new Set());
        }
    };

    return {
        allSiteSelected,
        selSiteSelected,
        isLoading,
        handleAdd,
        handleDel,
        selGrpDialogOpen,
        setSelGrpDialogOpen,
        setDialogSelGrpCode,
        allGrpList,
        setAllGrpList,
    };
};

/**
 * 사이트 목록 Hook
 */
const useList = () => {
    const { data, filters } = useContext(SiteListContext);
    const parseData = useMemo(() => {
        if (data && filters) {
            let result = null;

            // language
            if (filters.lang) {
                result = data?.filter(item => {
                    return filters?.lang && filters?.lang.split(',').includes(item.lang);
                });
            } else {
                result = [...data];
            }

            // sort
            if (filters.sort === 'date' || filters.sort === 'name') {
                result = result ? [...result] : [];
                result.sort((a, b) => {
                    let comparison = 0;

                    if (filters?.sort === 'date') {
                        // 최신순(seq순)
                        comparison = a.seq - b.seq;
                        return -comparison;
                    }
                    if (filters?.sort === 'name') {
                        // 최신순(이름)
                        comparison = a.siteName.localeCompare(b.siteName);
                    }

                    // 조건 없음
                    return comparison;
                });
            }

            // keyword
            if (filters.keyword) {
                result = result?.filter(item => {
                    return (
                        filters.keyword &&
                        (item.siteName
                            .toLowerCase()
                            .includes(filters.keyword.trim().toLowerCase()) ||
                            item.url.toLowerCase().includes(filters.keyword.trim().toLowerCase()))
                    );
                });
            }

            // grp
            if (filters.channel) {
                result = result ? [...result] : [];
                result = result.filter(item => {
                    return filters.channel === item.chSeq;
                });
            }

            return result;
        }

        return data;
    }, [data, filters]);

    return { data: parseData, filters };
};

/**
 * 사이트 목록 필터 Hook
 */
const useFunction = () => {
    const { languageList } = useContext(SitePageContext);
    const { listType, filters, setFilters } = useContext(SiteListContext);

    // Language
    const [language, setLanguage] = useState<string | number | null>(null);
    useEffect(() => {
        if (languageList) setLanguage(languageList[0].code);
    }, [languageList]);
    const handleLanguageChange = (event: SelectChangeEvent) => {
        setLanguage(event.target.value as string);
    };

    // Sort
    const [sort, setSort] = useState<string | number | null>('');
    const sortList = [
        { code: 'date', name: '최신순' },
        { code: 'name', name: '사이트명' },
    ];
    const handleSortChange = (event: SelectChangeEvent) => {
        setSort(event.target.value as string);
    };

    // Keyword
    const [keyword, setKeyword] = useState({ searchKeyword: '' });

    useEffect(() => {
        if (language !== null && sort !== null) {
            setFilters({
                ...filters,
                lang: String(language),
                sort: String(sort),
                keyword: String(keyword.searchKeyword),
            });
        }
    }, [language, sort, keyword]);

    return {
        language,
        setLanguage,
        sort,
        setSort,
        keyword,
        setKeyword,
        listType,
        sortList,
        languageList,
        handleLanguageChange,
        handleSortChange,
    };
};

/**
 * 사이트 그룹
 */
interface DataGroupCount {
    [key: string]: number;
}
const useGrpTab = () => {
    const { setAllGrpList } = useContext(SitePageContext);
    const { filters, setFilters } = useContext(SiteListContext);
    const { data, isFetching: isSiteGrpLoading } = useSiteGrpListQuery();
    const { data: siteListData, isFetching: isListLoading } = useSiteListQuery('SELECT');
    const isLoading = isSiteGrpLoading || isListLoading;

    const useData = useMemo(() => {
        if (data) {
            data.map(item => item.seq).join(',');
            return [{ seq: '', channel: '전체' }, ...data];
        }
        return [{ seq: '', channel: '전체' }];
    }, [data]);
    useEffect(() => {
        setAllGrpList(useData as SiteGrpListModel[]);
    }, [useData]);

    const grpCntData = useMemo(() => {
        let totCnt = 0;
        if (siteListData && data) {
            const temp = siteListData.reduce<DataGroupCount>((acc, item: SiteListModel) => {
                if (item.chSeq) {
                    acc[item.chSeq] = (acc[item.chSeq] || 0) + 1;
                    totCnt += 1;
                }
                return acc;
            }, {});
            return {
                ...temp,
                total: totCnt,
            } as DataGroupCount;
        }
        return null;
    }, [useData, siteListData]);

    const [selGrp, setSelGrp] = useState<number | string>('');

    const handleChange = (_: React.MouseEvent<HTMLElement>, value: string) => {
        setSelGrp(value || '');
        setFilters({
            ...filters,
            channel: value || '',
        } as SiteFiltersType);
    };

    // 원/더블클릭 체크
    const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);
    const handleItemSelect = (event: React.MouseEvent<HTMLElement>, newSelection: string) => {
        event.preventDefault();
        if (clickTimeout) {
            // 더블 클릭
            clearTimeout(clickTimeout);
            setClickTimeout(null);
        } else {
            // 원클릭
            const timeout = setTimeout(() => {
                handleChange(event, newSelection);
                setClickTimeout(null);
            }, 200);
            setClickTimeout(timeout);
        }
    };

    useEffect(() => {
        if (useData) {
            setSelGrp(useData[0].seq);
            setFilters({
                ...filters,
                channel: useData[0].seq,
            } as SiteFiltersType);
        }
    }, [useData]);

    return { isLoading, grpData: useData, grpCntData, selGrp, handleItemSelect };
};
const useGrpAdd = () => {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const { mutateAsync, isPending: isLoading } = useSiteGrpAddMutation();

    const addGrp = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const { channel } = Object.fromEntries(formData.entries());
        try {
            const result = await mutateAsync({
                channel: channel as string,
            });
            console.log('그룹 등록 성공', result);
            queryClient.invalidateQueries({ queryKey: ['siteGrpList'] });
            setIsOpen(false);
        } catch (error) {
            console.error('등록 실패', error);
        }
    }, []);

    const handleOn = () => {
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
    };

    return { isLoading, isOpen, addGrp, handleOn, handleClose };
};
const useGrpMdfy = (
    mdfyItemState: [
        SiteGrpResponseType | null,
        Dispatch<SetStateAction<SiteGrpResponseType | null>>,
    ],
) => {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [mdfyItem, setMdfyItem] = mdfyItemState;
    const { mutateAsync: mdfyMutateAsync, isPending: isMdfyLoading } = useSiteGrpMdfyMutation();
    const { mutateAsync: delMutateAsync, isPending: isDelLoading } = useSiteGrpDelMutation();
    const isLoading = isMdfyLoading || isDelLoading;

    const handleClose = () => {
        setIsOpen(false);
        setMdfyItem(null);
    };

    const handleMdfy = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const { channel } = Object.fromEntries(formData.entries());
            try {
                const result = await mdfyMutateAsync({
                    seq: Number(mdfyItem?.seq),
                    channel: channel as string,
                });
                console.log('그룹 수정 성공', result);
                queryClient.invalidateQueries({ queryKey: ['siteGrpList'] });
                handleClose();
            } catch (error) {
                console.error('수정 실패', error);
            }
        },
        [mdfyItem],
    );

    const handleDelete = useCallback(async () => {
        // event.preventDefault();
        try {
            const result = await delMutateAsync({
                seq: Number(mdfyItem?.seq),
            });
            console.log('그룹 삭제 성공', result);
            queryClient.invalidateQueries({ queryKey: ['siteGrpList'] });
            queryClient.invalidateQueries({ queryKey: ['siteList'] });
            handleClose();
        } catch (error) {
            console.error('삭제 실패', error);
        }
    }, [mdfyItem]);

    useEffect(() => {
        if (mdfyItem) {
            console.log('mdfyItem', mdfyItem);
            setIsOpen(true);
        }
    }, [mdfyItem]);

    return { mdfyItem, isLoading, isOpen, setIsOpen, handleDelete, handleMdfy, handleClose };
};

export { useControl, useList, useFunction, useGrpTab, useGrpAdd, useGrpMdfy };
