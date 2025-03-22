import { request } from '@/shared/library';

const { VITE_API_ALL_MENU } = import.meta.env;

const getAllMenuAsync = () =>
    request({
        url: VITE_API_ALL_MENU,
        method: 'get',
    });

export { getAllMenuAsync };
