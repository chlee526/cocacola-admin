/**
 * 전역 가드 컴포넌트
 * 인증 확인 여부에 따라 페이지 이동
 * 로그인 페이지: 인증 안된 사용자만 접근 가능. 인증된 사용자는 '/' 페이지로 리다이렉트
 * Private 페이지 : 인증된 사용자만 접근 가능. 인증 안된 사용자는 로그인 페이지로 리다이렉트
 */

import { Navigate } from 'react-router-dom';

import { useAuth } from '@/feature/auth';
import { PATH_KEY } from '@/shared/config/pathKey';
import { ProviderProps } from '@/shared/model';

interface OwnProps extends ProviderProps {
    require: boolean;
}

/**
 *  @param auth 라우트 인증 필수 여부
 *  @param children ReactNode
 */
const PermissionGuard = ({ require, children }: OwnProps) => {
    // 사용자 재인증 훅
    const { isLogin } = useAuth();

    if (require) {
        return isLogin ? children : <Navigate to={PATH_KEY.LOGIN} />;
    }

    return !isLogin ? children : <Navigate to="/" />;
};

export { PermissionGuard };
