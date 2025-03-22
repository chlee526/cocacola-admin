import { useEffect } from 'react';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/entity/auth';
import { PATH_KEY } from '@/shared/config';
import { usePageLoaderContext } from '@/shared/context';
import { useAlert } from '@/shared/store';
import { useDuplicateErrorStore } from '@/shared/store/ErrorStore';

const APIErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
    const { showAlert } = useAlert();
    const { setUserState, setLoginState } = useAuthStore();
    const { resetPageLoader } = usePageLoaderContext();

    const resetAuth = () => {
        setUserState(null);
        setLoginState(false);
        window.location.reload();
    };

    useEffect(() => {
        // 에러를 리셋해서 UI가 그대로 유지되도록 함, 없으면 ErrorFallback 무한 요청
        resetErrorBoundary();
        resetPageLoader(); // 페이지 로더 초기화

        const status = error?.response?.status;

        // auth 관련 에러 제외 모든 api 관련 에러 처리
        if (isAxiosError(error)) {
            if (error.response?.config.method === 'post') {
                switch (status) {
                    case 401:
                        showAlert(
                            error.response?.data.message || '알 수 없는 에러가 발생했습니다.',
                            'error',
                        );
                        break;

                    default:
                        showAlert(
                            error.response?.data.message || '알 수 없는 에러가 발생했습니다.',
                            'error',
                        );
                }
            } else if (error.response?.config.method === 'get') {
                switch (status) {
                    // 토큰 위변조로 인한 페이지 접근 500에러 발생 시 초기화 후 리프레쉬
                    case 500:
                        // ErrorBoundary는 비동기를 기다려주지 않는다
                        setTimeout(() => {
                            resetAuth();
                        }, 500);
                        break;

                    default:
                    // showAlert(
                    //     error.response?.data.message || '알 수 없는 에러가 발생했습니다.',
                    //     'error',
                    // );
                }
            }
        }
    }, [error, showAlert, resetErrorBoundary]);

    if (isAxiosError(error)) {
        // 500 에러일때 에러 페이지 이동
        if (error.response?.status === 500) {
            return <Navigate to={`${PATH_KEY.ERROR}/500`} replace />;
        }
    }

    return <Navigate to={`${PATH_KEY.ERROR}`} replace />;
};

const APIErrorBoundary = ({ children }: { children: React.ReactNode }) => {
    const { reset } = useQueryErrorResetBoundary();
    const navigate = useNavigate();
    const { resetPageLoader } = usePageLoaderContext();
    const duplicateError = useDuplicateErrorStore().getDuplicateError();

    useEffect(() => {
        resetPageLoader();
        // 중복에러 스토어에 에러가 존재하면 에러 페이지에 에러 상태 담아 리다이렉트
        if (duplicateError) {
            navigate(`error/${duplicateError.status}`, { state: { errorData: duplicateError } });
        }
    }, [duplicateError]);

    return (
        <ErrorBoundary FallbackComponent={APIErrorFallback} onReset={reset}>
            {children}
        </ErrorBoundary>
    );
};

export { APIErrorBoundary };
