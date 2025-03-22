import { useCallback, useMemo } from 'react';

import { usePersonalizationStore } from '@chlee526/ui-kit-react';
import { create } from 'zustand';

import { GetKeywordRequestModel } from '../model/model';

const initSearchParam = {
    seq: '',
    searchType: 1,
    searchKeyword: '',
    op: '',
    filterType: '',
    sgSeqs: '',
    state: [],
    sort: ['regDate,desc'],
    page: 1,
    rowLimit: 100,
};

interface SearchParameterStoreModel {
    searchParameter: GetKeywordRequestModel;
    setSearchParameter: (params: GetKeywordRequestModel) => void;
}

const searchParameterStore = create<SearchParameterStoreModel>((set, get) => ({
    searchParameter: { ...initSearchParam },
    setSearchParameter: (params: GetKeywordRequestModel) => {
        const previous = get().searchParameter;
        set(() => ({
            searchParameter: {
                ...previous,
                ...params,
            },
        }));
    },
}));

const useSearchParameterStore = () => {
    const { searchParameter, setSearchParameter } = searchParameterStore();
    const rowLimit = usePersonalizationStore().getPersonalizationDataList('keyword')?.rowLimit || 100;

    const getSearchParameter = useMemo(() => {
        return {
            ...searchParameter,
            rowLimit,
        };
    }, [searchParameter, rowLimit]);

    const updateSearchParameter = useCallback((param: GetKeywordRequestModel) => {
        setSearchParameter(param);
    }, []);

    return {
        getSearchParameter,
        updateSearchParameter,
    };
};

export { useSearchParameterStore };
