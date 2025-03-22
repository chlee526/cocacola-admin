import { Link } from 'react-router-dom';

import { EntityAuthProfileChip } from '@/entity/auth';
import { useLogout } from '@/feature/auth';
import { FeatureNavigation } from '@/feature/navigation';
import { PATH_KEY } from '@/shared/config';

import { headerStyle } from './GnbHeader.style';

import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton, Stack } from '@mui/material';

const GnbHeader = () => {
    const logoutMutation = useLogout();
    const getLogo = () => {
        return import.meta.env.VITE_APP_LOGO;
    };

    return (
        <header css={headerStyle}>
            <div className="wrap">
                <Stack direction="row" spacing={1}>
                    <h1>
                        <Link to={PATH_KEY.HOME}>
                            <span>{getLogo()}</span>
                        </Link>
                    </h1>

                    <FeatureNavigation />
                </Stack>

                <Stack className="userUtil" direction="row" spacing={1}>
                    <EntityAuthProfileChip />

                    <IconButton
                        title="로그아웃"
                        aria-label="로그아웃"
                        onClick={() => logoutMutation.mutate()}
                    >
                        <LogoutIcon />
                    </IconButton>
                </Stack>
            </div>
        </header>
    );
};

export { GnbHeader };
