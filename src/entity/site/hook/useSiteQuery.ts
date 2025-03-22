import { useMutation, useQuery } from '@tanstack/react-query';

import {
    siteGrpAddAsync,
    siteGrpDelAsync,
    siteGrpListAsync,
    siteGrpMdfyAsync,
    siteListAsync,
    siteListSelectAsync,
    siteMoveAsync,
} from '../api/siteApi';
import {
    SiteType,
    SiteGrpAddReqeustModel,
    SiteGrpDelReqeustModel,
    SiteGrpMdfyReqeustModel,
    SiteMoveReqeustModel,
} from '../model/siteModel';

/**
 * 사이트 목록
 * @param {SiteType} listType 게시편 타입(전체 | 선택)
 */
const useSiteListQuery = (listType: SiteType) => {
    return useQuery({
        queryKey: ['siteList', listType],
        queryFn: async () => {
            const response =
                listType === 'ALL' ? await siteListAsync() : await siteListSelectAsync();
            const { result } = response.data;
            return result.data;
        },
        staleTime: Infinity,
    });
};

/**
 * 사이트 이동
 * @param {SiteMoveResponseModel} docData 사이트 이동 타입
 */
const useSiteMoveMutation = () => {
    return useMutation({
        mutationFn: async (params: SiteMoveReqeustModel) => {
            const response = await siteMoveAsync(params);
            return response;
        },
    });
};

/**
 * 사이트 그룹 목록
 * @returns
 */
const useSiteGrpListQuery = () => {
    return useQuery({
        queryKey: ['siteGrpList'],
        queryFn: async () => {
            const response = await siteGrpListAsync();
            const { result } = response.data;
            return result.data;
        },
        staleTime: Infinity,
    });
};

/**
 * 사이트 그룹 추가
 */
const useSiteGrpAddMutation = () => {
    return useMutation({
        mutationFn: async (params: SiteGrpAddReqeustModel) => {
            const response = await siteGrpAddAsync(params);
            return response;
        },
    });
};

/**
 * 사이트 그룹 수정
 */
const useSiteGrpMdfyMutation = () => {
    return useMutation({
        mutationFn: async (params: SiteGrpMdfyReqeustModel) => {
            const response = await siteGrpMdfyAsync(params);
            return response;
        },
    });
};

/**
 * 사이트 그룹 삭제
 */
const useSiteGrpDelMutation = () => {
    return useMutation({
        mutationFn: async (params: SiteGrpDelReqeustModel) => {
            const response = await siteGrpDelAsync(params);
            return response;
        },
    });
};

export {
    useSiteListQuery,
    useSiteMoveMutation,
    useSiteGrpListQuery,
    useSiteGrpAddMutation,
    useSiteGrpMdfyMutation,
    useSiteGrpDelMutation,
};
