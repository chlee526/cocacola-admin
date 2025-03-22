import { useEffect } from 'react';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Navigate } from 'react-router-dom';

import { PATH_KEY } from '@/shared/config';
import { ProviderProps } from '@/shared/model';

const RootErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
    useEffect(() => {
        resetErrorBoundary();
    }, []);

    return <Navigate to={PATH_KEY.ERROR} />;
};

const RootErrorBoundary = ({ children }: ProviderProps) => {
    const { reset } = useQueryErrorResetBoundary();

    return (
        <ErrorBoundary FallbackComponent={RootErrorFallback} onReset={reset}>
            {children}
        </ErrorBoundary>
    );
};

export { RootErrorBoundary };
