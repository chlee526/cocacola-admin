import { useCallback } from 'react';

import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

import { AuthStoreModel, MenuModel, MethodType, UserModel } from '../model/authModel';

const authStore = create<AuthStoreModel>()(
    devtools(
        persist(
            set => ({
                isLogin: false,
                user: null,
                authMenu: null,
                authMethods: {},
                authList: [],
                updateLogin: (data: boolean) => {
                    set(() => ({ isLogin: data }));
                },
                updateUser: (data: UserModel | null) => {
                    set(() => ({ user: data }));
                },
                updateAuthMenu: (data: MenuModel[] | null) => {
                    set(() => ({ authMenu: data }));
                },
                updateAuthMethods: (data: Record<string, MethodType[]>) => {
                    set(() => ({ authMethods: data }));
                },
                updateAuthList: (data: { code: string; name: string }[]) => {
                    set(() => ({ authList: data }));
                },
            }),
            {
                name: 'authStore',
                partialize: state => ({ isLogin: state.isLogin }),
            },
        ),

        // devtools options
        { name: 'authStore', enabled: process.env.NODE_ENV === 'development' },
    ),
);

const useAuthStore = () => {
    const {
        isLogin,
        user,
        authMenu,
        authMethods,
        authList,
        updateLogin,
        updateUser,
        updateAuthMenu,
        updateAuthMethods,
        updateAuthList,
    } = authStore();
    const getLoginState = () => {
        return isLogin;
    };

    const getUserState = () => {
        return user;
    };

    const getAuthMenuState = () => {
        return authMenu;
    };
    const getAuthMethodsState = () => {
        return authMethods;
    };

    const getAuthList = () => {
        return authList;
    };

    const setLoginState = useCallback((data: boolean) => {
        return updateLogin(data);
    }, []);

    const setUserState = useCallback((data: UserModel | null) => {
        return updateUser(data);
    }, []);

    const setAuthMenuState = useCallback((data: MenuModel[] | null) => {
        return updateAuthMenu(data);
    }, []);

    const setAuthMethodsState = useCallback((data: Record<string, MethodType[]>) => {
        return updateAuthMethods(data);
    }, []);

    const setAuthList = useCallback((data: { code: string; name: string }[]) => {
        updateAuthList(structuredClone(data));
    }, []);

    return {
        getLoginState,
        getUserState,
        getAuthMenuState,
        getAuthMethodsState,
        getAuthList,
        setLoginState,
        setUserState,
        setAuthMenuState,
        setAuthMethodsState,
        setAuthList,
    };
};

export { useAuthStore };
