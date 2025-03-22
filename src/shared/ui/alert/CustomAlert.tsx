import { motion, AnimatePresence, easeIn } from 'framer-motion';

import { useAlert } from '@/shared/store/AlertContext';

import { Alert, Fade } from '@mui/material';

const CustomAlert = () => {
    const { hideAlert, alerts } = useAlert();

    return (
        <AnimatePresence>
            {alerts.map((alert, idx) => (
                <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 55 }}
                    animate={{ opacity: 1, y: idx * -55 }}
                    exit={{ opacity: 0, y: idx * -80 }}
                    transition={{
                        duration: 0.4,
                        ease: easeIn,
                    }}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '40px',
                        width: 'calc(90% - 20px)',
                        maxWidth: '400px',
                        zIndex: 9999,
                    }}
                >
                    <Fade key={alert.id} in>
                        <Alert
                            severity={alert.severity}
                            onClose={() => hideAlert(alert.id)}
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                boxShadow: 3,
                            }}
                        >
                            {alert.message}
                        </Alert>
                    </Fade>
                </motion.div>
            ))}
        </AnimatePresence>
    );
};

export { CustomAlert };
