import { AxiosResponse } from 'axios';

import { request } from '@/shared/library';

import {
    DeleteMembersRequestModel,
    DuplicateIdRequestModel,
    GetMembersRequestModel,
    GetMembersResponseModel,
    GetParticularMemberRequestModel,
    GetParticularMemberResponseModel,
    JoinMembersRequestModel,
    UpdateMembersRequestModel,
} from '../model/model';

/** 사용자 등록 */
const joinMembersAsync = (param: JoinMembersRequestModel) => {
    return request({
        url: import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_MEMBERS,
        method: 'post',
        data: param,
    });
};

/** 전체 사용자 조회 */
const getMembersAsync = (param: GetMembersRequestModel): Promise<AxiosResponse<GetMembersResponseModel>> => {
    return request({
        url: import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_MEMBERS,
        method: 'get',
        params: param,
    });
};

/** 특정 사용자 조회 */
const getParticularMemberAsync = (
    param: GetParticularMemberRequestModel,
): Promise<AxiosResponse<GetParticularMemberResponseModel>> => {
    return request({
        url: `${import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_MEMBERS}/${param.memberSeq}`,
        method: 'get',
        params: param,
    });
};

/** 사용자 수정 */
const updateMembersAsync = (param: UpdateMembersRequestModel) => {
    return request({
        url: import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_MEMBERS,
        method: 'put',
        data: param,
    });
};

/** 사용자 삭제 */
const deleteMembersAsync = (param: DeleteMembersRequestModel) => {
    return request({
        url: import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_MEMBERS,
        method: 'delete',
        data: param,
    });
};

/** 중복 ID 체크 */
const duplicateIdAsync = (param: DuplicateIdRequestModel) => {
    return request({
        url: import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_MEMBERS_DUPLICATE,
        method: 'get',
        params: param,
    });
};

export { joinMembersAsync, getMembersAsync, getParticularMemberAsync, updateMembersAsync, deleteMembersAsync, duplicateIdAsync };
