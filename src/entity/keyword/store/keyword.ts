import { useCallback } from 'react';

import { TreeViewDataModel } from '@chlee526/ui-kit-react';
import { create } from 'zustand';

import { KeywordBoardModel } from '@/feature/keyword';

interface KeywordStore {
    categoryList: TreeViewDataModel[];
    selectedCategory: TreeViewDataModel | null;
    selectedKeyword: KeywordBoardModel;
    updateCategoryList: (data: TreeViewDataModel[]) => void;
    updateSelectedCategory: (data: TreeViewDataModel | null) => void;
    updateSelectedKeyword: (data: KeywordBoardModel) => void;
}
const keywordStore = create<KeywordStore>(set => ({
    categoryList: [],
    selectedCategory: null,
    selectedKeyword: null,
    updateCategoryList: (data: TreeViewDataModel[]) => {
        set(() => ({ categoryList: data }));
    },
    updateSelectedCategory: (data: TreeViewDataModel | null) => {
        set(() => ({ selectedCategory: data }));
    },
    updateSelectedKeyword: (data: KeywordBoardModel) => {
        set(() => ({ selectedKeyword: data }));
    },
}));

const useKeywordStore = () => {
    const { categoryList, selectedCategory, selectedKeyword, updateCategoryList, updateSelectedCategory, updateSelectedKeyword } =
        keywordStore();

    const getCategoryList = () => {
        return categoryList;
    };

    const getSelectedCategory = () => {
        return selectedCategory;
    };
    const getSelectedKeyword = () => {
        return selectedKeyword;
    };

    const setCategoryList = useCallback((data: TreeViewDataModel[]) => {
        return updateCategoryList(structuredClone(data));
    }, []);

    const setSelectedCategory = useCallback((data: TreeViewDataModel | null) => {
        return updateSelectedCategory(structuredClone(data));
    }, []);

    const setSelectedKeyword = useCallback((data: KeywordBoardModel) => {
        return updateSelectedKeyword(structuredClone(data));
    }, []);

    return {
        getCategoryList,
        getSelectedCategory,
        getSelectedKeyword,
        setCategoryList,
        setSelectedCategory,
        setSelectedKeyword,
    };
};

const getKeywordStore = () => {
    return keywordStore.getState();
};

export { useKeywordStore, getKeywordStore };
