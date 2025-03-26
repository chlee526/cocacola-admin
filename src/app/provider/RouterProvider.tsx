import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { PATH_KEY } from '@/shared/config';

import { PrivateRoute, PublicRoute } from '../router';

const router = createBrowserRouter(
    [
        ...PrivateRoute,
        ...PublicRoute,
        {
            path: '/',
            element: <Navigate to={PATH_KEY.ROOT} />,
        },
        {
            path: '*',
            element: <Navigate to={`${PATH_KEY.ERROR}/404`} />,
        },
    ],
    {
        // react-router v7 관련 경고콘솔 임시 막기
        future: {
            v7_relativeSplatPath: true,
            v7_startTransition: true,
        } as any,
    },
);

const provider = () => <RouterProvider router={router} />;

export { provider as RouterProvider };
