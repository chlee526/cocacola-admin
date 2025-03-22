import { useAuthStore } from '@/entity/auth';

import { profileAvatarStyle } from './ProfileChip.style';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const ProfileChip = () => {
    const user = useAuthStore().getUserState();

    return (
        <Stack direction="row" spacing={1}>
            <Chip
                size="small"
                css={profileAvatarStyle}
                avatar={
                    <Avatar>
                        <AccountCircleIcon />
                    </Avatar>
                }
                label={user?.memberName}
            />
        </Stack>
    );
};
export { ProfileChip };
