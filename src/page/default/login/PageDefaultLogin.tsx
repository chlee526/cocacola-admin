import { AnimatePresence } from 'framer-motion';

import { FeatureAuthLoginForm } from '@/feature/auth';
import { PageTransition } from '@/shared/ui';

import { containerStyle, wrapStyle } from './PageDefaultLogin.style';

import LockIcon from '@mui/icons-material/Lock';
import { Avatar, Paper } from '@mui/material';

const PageDefaultLogin = () => {
    return (
        <AnimatePresence mode="wait">
            <PageTransition>
                <div css={containerStyle}>
                    <Paper elevation={4} css={wrapStyle}>
                        <Avatar className="icon">
                            <LockIcon />
                        </Avatar>
                        <div className="title">
                            <h1>Member Login</h1>
                        </div>
                        <FeatureAuthLoginForm />
                    </Paper>
                </div>
            </PageTransition>
        </AnimatePresence>
    );
};

export { PageDefaultLogin };
