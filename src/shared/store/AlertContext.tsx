import { createContext, useState, useContext, useCallback, useMemo, ReactNode } from 'react';

import { AlertColor } from '@mui/material';

interface AlertItem {
    id: number;
    message: string;
    severity: AlertColor;
}

interface AlertContext {
    showAlert: (message: string, severity?: AlertColor) => void;
    hideAlert: (id: number) => void;
    alerts: AlertItem[];
}
interface AlertContextType {
    showAlert: (message: string, severity?: AlertColor) => void;
    hideAlert: () => void;
    alertState: {
        open: boolean;
        message: string;
        severity: AlertColor;
    };
}

interface AlertProvider {
    children: ReactNode;
}

const initialState = {
    showAlert: () => {},
    hideAlert: () => {},
    alerts: [],
};

const AlertContext = createContext<AlertContext>(initialState);

const AlertProvider = ({ children }: AlertProvider) => {
    const [alerts, setAlerts] = useState<AlertItem[]>([]);
    const [nextId, setNextId] = useState(0);

    const hideAlert = useCallback((id: number) => {
        setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, []);

    const showAlert = useCallback(
        (message: string, severity: AlertColor = 'info', duration: number = 3000) => {
            const id = nextId;
            setNextId(prev => prev + 1);

            const newAlert: AlertItem = {
                id,
                message,
                severity,
            };

            setAlerts(prev => [newAlert, ...prev]);

            setTimeout(() => {
                hideAlert(id);
            }, duration);
        },
        [nextId],
    );

    const value = useMemo(() => ({ showAlert, hideAlert, alerts }), [showAlert, hideAlert, alerts]);

    return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
};

const useAlert = () => {
    const context = useContext(AlertContext);
    if (context === undefined) {
        throw new Error('AlertProvider Error');
    }
    return context;
};

export { AlertProvider, useAlert };
export type { AlertContextType };
