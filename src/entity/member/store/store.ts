import { useCallback, useEffect, useMemo } from 'react';

import { usePersonalizationStore } from '@chlee526/ui-kit-react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { BoardDataModel, GetMembersRequestModel, MemberPageStoreModel } from '../model/model';

const initSearchParam = {
    searchKeyword: '',
    sort: ['regDate,desc'],
    state: [],
    authFilter: [],
    page: 1,
    rowLimit: 100,
};

const initBoardData = {
    total: 0,
    page: 1,
    list: [],
};

const memberPageStore = create<MemberPageStoreModel>()(
    devtools(
        (set, get) => ({
            boardData: initBoardData,
            searchParam: initSearchParam,
            updateBoardData: (data: BoardDataModel) => {
                set(() => ({ boardData: data }));
            },
            updateSearchParam: (data: GetMembersRequestModel) => {
                const prev = get().searchParam;
                set(() => ({ searchParam: { ...prev, ...data } }));
            },
        }),

        // devtools options
        { name: 'memberPageStore', enabled: process.env.NODE_ENV === 'development' },
    ),
);

const useMemberPageStore = () => {
    const { boardData, searchParam, updateBoardData, updateSearchParam } = memberPageStore();

    const getBoardData = () => {
        return boardData;
    };

    const rowLimit =
        usePersonalizationStore().getPersonalizationDataList('replace')?.rowLimit || 100;

    const getSearchParam: GetMembersRequestModel = useMemo(() => {
        return {
            ...searchParam,
            rowLimit,
        };
    }, [searchParam, rowLimit]);

    const setBoardData = useCallback((data: BoardDataModel) => {
        updateBoardData(structuredClone(data));
    }, []);

    const setSearchParam = useCallback((data: GetMembersRequestModel) => {
        updateSearchParam(structuredClone(data));
    }, []);

    const resetState = () => {
        updateBoardData(initBoardData);
        updateSearchParam(initSearchParam);
    };

    useEffect(() => {
        return () => {
            resetState();
        };
    }, []);

    return {
        getBoardData,
        getSearchParam,
        setBoardData,
        setSearchParam,
    };
};

export { useMemberPageStore };
