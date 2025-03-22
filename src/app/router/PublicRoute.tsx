// 로그인 없이 접근 가능한 라우트
import { RouteObject } from 'react-router-dom';

import { RootErrorBoundary } from '@/app/errorBoundary/RootErrorBoundary';
import { PageDefaultError } from '@/page/default/error/PageDefaultError';
import { PageDefaultLogin } from '@/page/default/login/PageDefaultLogin';
import { PATH_KEY } from '@/shared/config';
import { APIErrorBoundary } from '@/shared/library';

import { PermissionGuard } from './PermissionGuard';

const PublicRoute: RouteObject[] = [
    {
        path: PATH_KEY.LOGIN,
        element: (
            <RootErrorBoundary>
                <PermissionGuard require={false}>
                    <APIErrorBoundary>
                        <PageDefaultLogin />
                    </APIErrorBoundary>
                </PermissionGuard>
            </RootErrorBoundary>
        ),
    },
    {
        path: `${PATH_KEY.ERROR}/:code`,
        element: <PageDefaultError />,
    },
];

export { PublicRoute };
