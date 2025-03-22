import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAlert } from '@/shared/store';

import { getOptionListAsync, postOptionAsync } from '../api/api';
import { PostOptionRequestModel } from '../model/model';

const useGetOptionListQuery = () => {
    return useQuery({
        queryKey: ['OPTION_LIST'],
        queryFn: async () => {
            try {
                const response = await getOptionListAsync();
                const { result } = response.data;

                return result.data;
            } catch (error) {
                console.error('쿼리 에러 발생', error);
                throw error;
            }
        },
    });
};

const usePostOptionMutation = () => {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();

    return useMutation({
        mutationFn: async (param: PostOptionRequestModel) => postOptionAsync(param),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['OPTION_LIST'] });
            showAlert('옵션 등록을 성공했습니다.', 'success');
        },
        onError: err => {
            console.error('옵션 등록 에러', err);
            showAlert('옵션 등록에 실패했습니다.');
        },
    });
};

export { useGetOptionListQuery, usePostOptionMutation };
