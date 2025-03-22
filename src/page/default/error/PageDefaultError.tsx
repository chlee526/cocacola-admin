import { AnimatePresence } from 'framer-motion';
import { useLocation, useParams } from 'react-router-dom';

import { useAuthStore } from '@/entity/auth';
import { ERROR_MESSAGES } from '@/shared/config';
import { useDuplicateErrorStore } from '@/shared/store/ErrorStore';
import { PageTransition } from '@/shared/ui';

import { wrapStyle } from './PageDefaultError.style';

import { Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import Button from '@mui/material/Button';

type ErrorCode = keyof typeof ERROR_MESSAGES;
interface OwnProps {
    code?: keyof typeof ERROR_MESSAGES;
}

const PageDefaultError = ({ code = '404' }: OwnProps) => {
    const param = useParams();
    const location = useLocation();
    const errorCode = (param.code || code) as ErrorCode;
    const { title, txt, btn, link } = ERROR_MESSAGES[errorCode];

    const { setLoginState } = useAuthStore();
    const { setDuplicateError } = useDuplicateErrorStore();

    const movePage = () => {
        if (param.code === '400' || param.code === '401' || param.code === '500') {
            setLoginState(false);
            setDuplicateError(null); // 중복에러 스토어 에러 초기화
        }
        window.location.href = link;
    };

    return (
        <AnimatePresence mode="wait">
            <PageTransition>
                <div css={wrapStyle}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardHeader title={location.state?.errorData?.message || title} />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {txt}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant="contained" onClick={movePage}>
                                {btn}
                            </Button>
                        </CardActions>
                    </Card>
                </div>
            </PageTransition>
        </AnimatePresence>
    );
};

export { PageDefaultError };
