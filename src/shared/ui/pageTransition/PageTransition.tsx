import { ReactNode } from 'react';

import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface OwnProps {
    id?: string;
    children: ReactNode;
}

const PageTransition = ({ id, children }: OwnProps) => {
    const location = useLocation();

    return (
        <motion.div
            id={id}
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            {children}
        </motion.div>
    );
};

export { PageTransition };
