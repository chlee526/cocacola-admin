import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { getAllMenuAsync } from '../api/api';
import { MenuType } from '../model/model';

const useGetAllMenuQuery = (): UseQueryResult<MenuType[], Error> => {
    return useQuery({
        queryKey: ['ALL_MENU_LIST'],
        queryFn: async () => {
            try {
                const response = await getAllMenuAsync();
                const { result } = response.data;
                return result.data;
            } catch (error) {
                console.error('GetMemberList Error', error);
                throw error;
            }
        },
    });
};

export { useGetAllMenuQuery };
