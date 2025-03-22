import { useCallback, useMemo, useState } from 'react';

import { PageLoaderStateContext, pageLoaderInitState } from '@/shared/context';
import { ProviderProps } from '@/shared/model/default/context';
import { Loader, PageLoaderModel } from '@/shared/ui';

const PageLoaderProvider = ({ children }: ProviderProps) => {
    const [state, setState] = useState<PageLoaderModel>(pageLoaderInitState);

    const showPageLoader = useCallback((id: string, open: boolean) => {
        setState(prev => {
            // 현재 스택에서 해당 id의 로더를 제거
            const newStack = prev.loaderStack.filter(loader => loader.id !== id);

            // open이 true인 경우, 새 로더를 스택에 추가
            if (open) {
                newStack.push({ id, isOpen: true });
            }

            return {
                ...prev,
                loaderStack: newStack,
                isOpen: newStack.length > 0, // 스택에 하나 이상의 로더가 있으면 isOpen을 true로 설정
            };
        });
    }, []);

    // 페이지 로더 초기화 함수
    const resetPageLoader = useCallback(() => {
        setState(prev => {
            return {
                ...prev,
                loaderStack: [],
                isOpen: false,
            };
        });
    }, []);

    const value = useMemo(
        () => ({ ...state, showPageLoader, resetPageLoader }),
        [state, showPageLoader, resetPageLoader],
    );

    return (
        <PageLoaderStateContext.Provider value={value}>
            {children}
            <Loader open={state.isOpen} sx={{ position: 'fixed' }} />
        </PageLoaderStateContext.Provider>
    );
};

export { PageLoaderProvider };
