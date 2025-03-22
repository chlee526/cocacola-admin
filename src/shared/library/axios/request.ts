import Axios, { AxiosRequestConfig, AxiosError } from 'axios';
import qs from 'qs';

import { getDuplicateErrorState } from '@/shared/store/ErrorStore';

interface CustomRequestConfig extends AxiosRequestConfig {
    id?: string;

    isRefreshRequest?: boolean;
}

interface QueItem {
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
    config: CustomRequestConfig;
}

// 토큰 갱신 중인지 여부를 나타내는 플래그
let isRefreshing = false;

// 토큰 만료로 실패한 요청들을 저장할 큐
let failedQue: QueItem[] = [];

const axios = Axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    withCredentials: true, // httpOnly 쿠키 사용시 필수
});

const processQue = (error: AxiosError | null = null) => {
    failedQue.forEach(({ resolve, reject, config }) => {
        if (error) {
            reject(error);
        } else {
            resolve(axios(config));
        }
    });

    failedQue = [];
};

axios.interceptors.request.use(
    async config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

axios.interceptors.response.use(
    async response => {
        return response;
    },
    async error => {
        const originConfig = error.config as CustomRequestConfig;

        const { isLogin } = localStorage.getItem('authStore')
            ? JSON.parse(localStorage.getItem('authStore') || '').state
            : { isLogin: false };

        if (!originConfig) {
            return Promise.reject(error);
        }

        /**
         * 에러 스토어에 에러 저장 케이스
         * '해당 멤버를 찾을 수 없습니다.'
         * '해당 ID로 다른 사용자가 로그인 하였습니다.'
         */

        if (error.response?.data.code === 'A014' || error.response?.data.code === 'AU002') {
            const { updateDuplicateError } = getDuplicateErrorState();
            updateDuplicateError({ ...error.response?.data, status: error.response.status });
            return Promise.reject(error);
        }

        // 401 에러 처리 시 isRefreshRequest가 아닌 경우에만 refresh를 시도
        if (error.response?.status === 401 && isLogin && !originConfig.isRefreshRequest) {
            if (!isRefreshing) {
                isRefreshing = true;

                try {
                    const refreshRes = await axios.post('v1/refresh', {}, {
                        isRefreshRequest: true,
                    } as CustomRequestConfig);

                    // 토큰이 갱신 완료
                    if (refreshRes.status === 200) {
                        processQue(); // 대기 중인 요청들을 처리
                        return axios(originConfig); // 원래 요청 재시도 (대기열에 없는 요청 => 토큰 갱신을 트리거하는 초기 요청)
                    }
                } catch (refreshError) {
                    // 토큰 갱신 실패 -> 401에러 페이지로 전달
                    processQue(refreshError as AxiosError);
                    window.location.href = '/error/401';

                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            } else {
                // 토큰이 갱신 중일 경우, 요청을 큐에 추가하고 대기
                return new Promise((resolve, reject) => {
                    failedQue.push({ resolve, reject, config: originConfig });
                });
            }
        }

        return Promise.reject(error);
    },
);

// 쿼리스트링 직렬화
axios.defaults.paramsSerializer = params => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
};

const request = (req: CustomRequestConfig) => {
    return axios({
        ...req,
    });
};

export { request };
