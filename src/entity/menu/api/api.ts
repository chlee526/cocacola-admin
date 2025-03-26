import { request } from '@/shared/library';

const getAllMenuAsync = () =>
    request({
        url: import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_ALL_MENU,
        method: 'get',
    });

export { getAllMenuAsync };
