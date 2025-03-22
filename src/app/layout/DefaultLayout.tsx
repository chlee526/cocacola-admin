import { useEffect } from 'react';

import { MenuAuthContext } from '@chlee526/ui-kit-react';
import { AnimatePresence } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';

import { useAuthStore } from '@/entity/auth';
import { useGetCommonQuery } from '@/entity/common';
import { useGetAuthListQuery } from '@/feature/auth/hook/useAuth';
import { usePageLoaderContext } from '@/shared/context';
import { useCommonStroe } from '@/shared/store';
import { PageTransition } from '@/shared/ui';
import { WidgetGnbHeader } from '@/widget/header';

import { breadcrumbsStyle, defaultLayoutStyle } from './DefaultLayout.style';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Breadcrumbs, Link } from '@mui/material';

const DefaultLayout = () => {
    const { showPageLoader } = usePageLoaderContext();

    // 권한
    const location = useLocation();
    const authMenuMethod = useAuthStore().getAuthMethodsState()[location.pathname];

    // 공통 코드 호출
    const getCommonCode = useGetCommonQuery();
    // 권한 목록 호출
    const getAuthList = useGetAuthListQuery();

    // BreadCrumb
    const { getCurrentPath } = useCommonStroe();

    useEffect(() => {
        showPageLoader('COMMON_LIST', getCommonCode.isLoading);
        showPageLoader('AUTH_LIST', getCommonCode.isLoading);
    }, [getCommonCode.isLoading, getAuthList.isLoading]);

    return (
        getCommonCode.isSuccess && (
            <div css={defaultLayoutStyle}>
                <WidgetGnbHeader />
                <div css={breadcrumbsStyle}>
                    <LocationOnIcon />
                    <Breadcrumbs aria-label="breadcrumb">
                        {getCurrentPath().map((path, idx) =>
                            idx !== getCurrentPath().length - 1 ? (
                                <Link key={path} underline="hover" color="inherit" href={path}>
                                    {path}
                                </Link>
                            ) : (
                                <span key={path}>{path}</span>
                            ),
                        )}
                    </Breadcrumbs>
                </div>
                <AnimatePresence mode="wait">
                    <PageTransition id="container">
                        <MenuAuthContext.Provider value={authMenuMethod}>
                            <Outlet />
                        </MenuAuthContext.Provider>
                    </PageTransition>
                </AnimatePresence>
            </div>
        )
    );
};

export default DefaultLayout;
