// 로그인 필수 라우트
import { Navigate, RouteObject } from 'react-router-dom';

import { RootErrorBoundary } from '@/app/errorBoundary/RootErrorBoundary';
import {
    PageAdminMember,
    PageAdminReplace,
    PageAdminSite,
    PageAdminHistory,
    PageAdminAuth,
    PageAdminReceiver,
} from '@/page/admin';
import { PageAdminExclusion } from '@/page/admin/exclusion/PageAdminExclusion';
import { PageAdminKeyword } from '@/page/admin/keyword/PageAdminKeyword';
import { PageDefaultError } from '@/page/default';
import { PATH_KEY } from '@/shared/config';
import { APIErrorBoundary } from '@/shared/library';

import { PermissionGuard } from './PermissionGuard';
// import { PrivateGuard } from './PrivateGuard';
import DefaultLayout from '../layout/DefaultLayout';

const PrivateRoute: RouteObject[] = [
    {
        element: (
            <RootErrorBoundary>
                <APIErrorBoundary>
                    <PermissionGuard require>
                        <DefaultLayout />
                    </PermissionGuard>
                </APIErrorBoundary>
            </RootErrorBoundary>
        ),
        errorElement: <PageDefaultError />,
        children: [
            {
                path: PATH_KEY.ADMIN,
                element: <Navigate to={PATH_KEY.MEMBERS} />,
            },
            {
                path: PATH_KEY.MEMBERS,
                element: <PageAdminMember />,
            },
            {
                index: true,
                path: PATH_KEY.REPLACE,
                element: <PageAdminReplace />,
            },
            {
                path: PATH_KEY.SITE,
                element: <PageAdminSite />,
            },
            {
                path: PATH_KEY.HISTORY,
                element: <PageAdminHistory />,
            },
            {
                path: PATH_KEY.EXCLUSION,
                element: <PageAdminExclusion />,
            },
            {
                path: PATH_KEY.AUTH,
                element: <PageAdminAuth />,
            },
            {
                path: PATH_KEY.RECEIVER,
                element: <PageAdminReceiver />,
            },
            {
                path: PATH_KEY.KEYWORD,
                element: <PageAdminKeyword />,
            },
        ],
    },
];

export { PrivateRoute };
