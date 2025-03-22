import { request } from '@/shared/library';

const { VITE_API_COMMON } = import.meta.env;

const getCommonAsync = () =>
    request({
        url: VITE_API_COMMON,
        method: 'get',
    });

export { getCommonAsync };
