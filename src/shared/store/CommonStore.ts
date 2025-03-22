import { useCallback } from 'react';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/** 중복 로그인 에러 처리를 위한 에러 스토어 */
interface CommonStroeType {
    currentPaths: string[];
    updateCurrentPaths: (value: string[]) => void;
}

const commonStore = create<CommonStroeType>()(
    devtools(set => ({
        currentPaths: [],
        updateCurrentPaths: value => set({ currentPaths: value }),
    })),
);

const useCommonStroe = () => {
    const { currentPaths, updateCurrentPaths } = commonStore();

    const getCurrentPath = () => {
        return currentPaths;
    };

    const setCurrentPath = useCallback((value: string[]) => {
        updateCurrentPaths(value);
    }, []);

    return { getCurrentPath, setCurrentPath };
};

export { useCommonStroe };
