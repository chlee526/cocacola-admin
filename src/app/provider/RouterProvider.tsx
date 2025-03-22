import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { PATH_KEY } from '@/shared/config';

import { PrivateRoute, PublicRoute } from '../router';

const router = createBrowserRouter([
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
]);

const provider = () => <RouterProvider router={router} />;

export { provider as RouterProvider };
