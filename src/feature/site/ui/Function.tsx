import { useEffect, useMemo, useState } from 'react';

import { WidgetSearchBar, SelectBox, SelectBoxListType, SearchChipType } from '@chlee526/ui-kit-react';

import { useFunction } from '../hook/useStie';

const Function = () => {
    const {
        listType,
        sortList,
        languageList,
        language,
        setLanguage,
        sort: sortContext,
        setSort: setSortContext,
        keyword: keywordContext,
        setKeyword: setKeywordContext,
    } = useFunction();

    // 언어
    const [lang, setLang] = useState<string | number | null>(language || '');
    const langList: SelectBoxListType[] = useMemo(
        () =>
            languageList?.map(item => {
                return { seq: item.code, name: item.name };
            }) || [],
        [languageList],
    );
    useEffect(() => {
        setLanguage(lang);
    }, [lang]);

    // 정렬
    const [sort, setSort] = useState<string | number | null>(sortContext || '');
    useEffect(() => {
        setSortContext(sort);
    }, [sort]);

    // 검색 키워드
    const [keyword, setKeyword] = useState<SearchChipType>(keywordContext);
    useEffect(() => {
        setKeywordContext(keyword);
    }, [keyword]);

    // Langeage 로드 전엔 렌더하지 않음
    if (!languageList) return <div>로딩중...</div>;

    return (
        <div className="filters">
            <SelectBox
                id={`${listType}_languageSelect`}
                value={[lang, setLang]}
                list={langList}
                allSelect="언어 전체"
                size="small"
            />
            {listType === 'SELECT' && (
                <SelectBox
                    id={`${listType}_sortSelect`}
                    value={[sort, setSort]}
                    list={sortList}
                    emptySelect="정렬 없음"
                    size="small"
                />
            )}
            <WidgetSearchBar
                value={[keyword, setKeyword]}
                size="small"
                style={{
                    marginLeft: 'auto',
                }}
            />
        </div>
    );
};

export { Function };
