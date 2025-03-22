import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useErrorBoundary } from 'react-error-boundary';

import { fetchMyAuthAsync, fetchUserInfoAsync, useAuthStore, transformMenuData, transformMenuMethods } from '@/entity/auth';
import { usePageLoaderContext } from '@/shared/context/usePageLoaderContext';

/** 사용자 인증 & 권한 메뉴 훅 */
const useReceiver = () => {
    const { getLoginState, getUserState, setUserState, setAuthMenuState, setAuthMethodsState } = useAuthStore();
    const { showPageLoader } = usePageLoaderContext();
    const { showBoundary } = useErrorBoundary();
    const isLogin = getLoginState();
    const user = getUserState();

    const userInfoResult = useQuery({
        queryKey: ['userInfo'],
        queryFn: fetchUserInfoAsync,
        enabled: (!user && isLogin) || isLogin,
        retry: false,
    });

    const myAuthResult = useQuery({
        queryKey: ['myAuth'],
        queryFn: fetchMyAuthAsync,
        // 사용자 인증 api 성공 후 권한 메뉴 api 진행
        enabled: userInfoResult.isSuccess && ((!user && isLogin) || isLogin),
        retry: false,
    });

    const isLoading = userInfoResult.isLoading || myAuthResult.isLoading;
    const isSuccess = userInfoResult.isSuccess && myAuthResult.isSuccess;
    const error = userInfoResult.error || myAuthResult.error;

    useEffect(() => {
        if (error) showBoundary(error);
    }, [error]);

    useEffect(() => {
        showPageLoader('getAuth', isLoading);
    }, [isLoading]);

    useEffect(() => {
        if (isSuccess) {
            const userInfo = userInfoResult.data?.data;
            const authList = myAuthResult.data?.data.auth.menuAuthList;

            setUserState(structuredClone(userInfo));
            setAuthMenuState(structuredClone(transformMenuData(authList)));
            setAuthMethodsState(structuredClone(transformMenuMethods(authList)));
        }
    }, [isSuccess]);

    return { isLogin };
};

export { useReceiver };
