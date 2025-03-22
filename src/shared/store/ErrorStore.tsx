import { useCallback } from 'react';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/** 중복 로그인 에러 처리를 위한 에러 스토어 */
interface DuplicateErrorState {
    duplicateError: { code: string; message: string; status: number } | null;
    updateDuplicateError: (error: { code: string; message: string; status: number } | null) => void;
}

const duplicateErrorStore = create<DuplicateErrorState>()(
    devtools(
        set => ({
            duplicateError: null,
            updateDuplicateError: error => set({ duplicateError: error }),
        }),
        { name: 'errorStore', enabled: process.env.NODE_ENV === 'development' },
    ),
);

const useDuplicateErrorStore = () => {
    const { duplicateError, updateDuplicateError } = duplicateErrorStore();

    const getDuplicateError = () => {
        return duplicateError;
    };

    const setDuplicateError = useCallback(
        (error: { code: string; message: string; status: number } | null) => {
            updateDuplicateError(error);
        },
        [],
    );

    return { getDuplicateError, setDuplicateError };
};

/** ts 파일에서 스토어 상태 사용해야 할 경우 */
const getDuplicateErrorState = () => {
    return duplicateErrorStore.getState();
};

export { useDuplicateErrorStore, getDuplicateErrorState };
