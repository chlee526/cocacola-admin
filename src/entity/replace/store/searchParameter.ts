import { create } from 'zustand';

import { GetReplaceRequestModel } from '../model/replaceModel';

const initSearchParam = {
    searchType: 1,
    searchKeyword: '',
    sort: ['regDate,desc'],
    state: [],
    page: 1,
    rowLimit: 100,
};

interface SearchParameterStoreModel {
    searhParameter: GetReplaceRequestModel;
    setSearchParameter: (params: GetReplaceRequestModel) => void;
}

const searchParameterStore = create<SearchParameterStoreModel>((set, get) => ({
    searhParameter: { ...initSearchParam },
    setSearchParameter: (params: GetReplaceRequestModel) => {
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
