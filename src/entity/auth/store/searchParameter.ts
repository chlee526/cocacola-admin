import { create } from 'zustand';

import { GetAuthRequestModel } from '../model/adminModel';

const initSearchParam = {
    searchType: 1,
    searchKeyword: '',
    sort: ['regDate,desc'],
    state: [],
    page: 1,
    rowLimit: 100,
};

interface SearchParameterStoreModel {
    searhParameter: GetAuthRequestModel;
    setSearchParameter: (params: GetAuthRequestModel) => void;
}

const searchParameterStore = create<SearchParameterStoreModel>((set, get) => ({
    searhParameter: { ...initSearchParam },
    setSearchParameter: (params: GetAuthRequestModel) => {
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
