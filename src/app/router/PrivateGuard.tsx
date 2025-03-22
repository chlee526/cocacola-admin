// 메뉴별 권한 관리
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { PATH_KEY } from '@/shared/config';
import { ProviderProps } from '@/shared/model';

interface OwnProps extends ProviderProps {
    auth: number;
}

const PrivateGuard = ({ children, auth }: OwnProps) => {
    // ✅ dummy - 사용자 권한 가져오는 hook사용
    const userAuth = 1;
    const navigator = useNavigate();

    useEffect(() => {
        if (userAuth < auth) {
            navigator(`${PATH_KEY.ERROR}/401`);
        }
    }, [navigator, auth]);

    return children;
};

export { PrivateGuard };
