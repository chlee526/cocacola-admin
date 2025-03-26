import { useEffect, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useErrorBoundary } from 'react-error-boundary';
import { useForm } from 'react-hook-form';

import {
    fetchMyAuthAsync,
    fetchUserInfoAsync,
    loginAsync,
    logoutAsync,
    useAuthStore,
    duplicateLoginAsync,
    transformMenuData,
    transformMenuMethods,
    fetchAllAuthAsync,
    GetMyAuthResponseModel,
} from '@/entity/auth';
import { usePageLoaderContext } from '@/shared/context/usePageLoaderContext';
import { useAlert } from '@/shared/store';

/** 로그인 훅 */
const useLogin = () => {
    const { setLoginState } = useAuthStore();
    const { showAlert } = useAlert();
    const [openDialog, setOpenDialog] = useState(false);
    const queryClient = useQueryClient();
    const {
        control,
        handleSubmit,
        getValues,
        formState: { isValid, isDirty },
    } = useForm({
        defaultValues: { id: '', pw: '' },
        mode: 'onChange',
    });

    const handleLoginSuccess = () => {
        console.log('로그인 성공!!!');
        setLoginState(true);
        queryClient.invalidateQueries({ queryKey: ['userInfo', 'myAuth'] });
    };

    const handleLoginError = (error: AxiosError) => {
        const errorData = error.response?.data as { code: string; message: string };

        if (errorData.message === '이미 해당 ID로 로그인된 사용자가 있습니다.') {
            setOpenDialog(true);
        } else {
            showAlert(
                error.response?.status === 401 ? '아이디 혹은 비밀번호가 일치하지 않습니다.' : '알 수 없는 에러가 발생했습니다.',
                'error',
            );
        }
    };

    const loginMutation = useMutation({
        mutationFn: () => duplicateLoginAsync(getValues()),
        onSuccess: handleLoginSuccess,
        onError: handleLoginError,
    });

    const compelLoginMutation = useMutation({
        mutationFn: () => loginAsync(getValues()),
        onSuccess: handleLoginSuccess,
        onError: () => showAlert('알 수 없는 에러가 발생했습니다.', 'error'),
    });

    const handleConfirm = () => {
        compelLoginMutation.mutate();
        setOpenDialog(false);
    };

    return {
        loginMutation,
        openDialog,
        setOpenDialog,
        handleConfirm,
        control,
        handleSubmit,
        getValues,
        isValid,
        isDirty,
    };
};

/** 로그아웃 훅 */
const useLogout = () => {
    const { setUserState, setLoginState, setAuthMenuState, setAuthMethodsState } = useAuthStore();
    const queryClient = useQueryClient();
    const { showBoundary } = useErrorBoundary();

    return useMutation({
        mutationFn: () => logoutAsync(),
        onSuccess: () => {
            setUserState(null);
            setLoginState(false);
            setAuthMenuState(null);
            setAuthMethodsState({});
            queryClient.clear();
        },
        onError: (error) => {
            showBoundary(error); // 에러바운더리로 전달
        },
    });
};

/** 사용자 인증 & 권한 메뉴 훅 */
const useAuth = () => {
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

/** 권한 목록 조회 */
const useGetAuthListQuery = () => {
    const { setAuthList, getUserState } = useAuthStore();
    return useQuery({
        queryKey: ['AUTH_LIST'],
        queryFn: async () => {
            try {
                const response = await fetchAllAuthAsync();
                const { data } = response;
                const result = data.result.data?.map((item: GetMyAuthResponseModel) => {
                    return { code: String(item.auth.seq), name: item.auth.authName };
                });

                setAuthList(result);
                return result;
            } catch (error) {
                console.error('GetAuthList Error', error);
                throw error;
            }
        },
        enabled: !!getUserState(),
    });
};

export { useLogin, useLogout, useAuth, useGetAuthListQuery };
