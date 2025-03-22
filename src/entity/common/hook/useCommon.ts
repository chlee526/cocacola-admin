import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { useAuthStore } from '@/entity/auth';

import { getCommonAsync } from '../api/api';
import { CommonDataModel, CommonKeyType, CommonResponseModel } from '../model/defaultModel';

const useGetCommonQuery = () => {
    const user = useAuthStore().getUserState();
    return useQuery({
        queryKey: ['COMMON_LIST'],
        queryFn: async () => getCommonAsync(),
        enabled: !!user,
    });
};

const useCommon = () => {
    const data = useQueryClient().getQueryData<AxiosResponse<CommonResponseModel>>(['COMMON_LIST']);

    const getCommonData = (keys: CommonKeyType[]): (CommonDataModel[] | null)[] => {
        const list: CommonDataModel[] = data?.data.result.data || [];

        return list
            .filter(({ cmmName }) => keys.includes(cmmName as CommonKeyType))
            .map(({ children }) => (children !== null ? children : null));
    };

    return {
        getCommonData,
    };
};

export { useGetCommonQuery, useCommon };
