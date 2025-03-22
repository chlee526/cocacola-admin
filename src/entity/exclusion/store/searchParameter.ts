import { create } from 'zustand';

import { GetExclusionRequestModel } from '../model/model';

const initSearchParam: GetExclusionRequestModel = {
    searchType: 1,
    searchKeyword: '',
    op: [],
    filterType: [],
    sort: ['regDate,desc'],
    state: [],
    page: 1,
    rowLimit: 100,
};

interface SearchParameterStoreModel {
    searhParameter: GetExclusionRequestModel;
    setSearchParameter: (params: GetExclusionRequestModel) => void;
}

const searchParameterStore = create<SearchParameterStoreModel>((set, get) => ({
    searhParameter: { ...initSearchParam },
    setSearchParameter: (params: GetExclusionRequestModel) => {
        const previous = get().searhParameter;
        set(() => ({
            searhParameter: {
                ...previous,
                ...params,
            },
        }));
    },
}));

export { searchParameterStore };
