import { request } from '@/shared/library';

const getCommonAsync = () => {
    return request({
        url: import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_COMMON,
        method: 'get',
    });
};

export { getCommonAsync };
