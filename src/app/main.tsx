import ReactDOM from 'react-dom/client';

import App from './provider';

const initApp = async () => {
    if (process.env.NODE_ENV !== 'development' || import.meta.env.VITE_API_MSW === 'false') {
        return;
    }
    const startApiMockWorker = await import('./mock/browser');
    await startApiMockWorker.startApiMockWorker();
};

initApp().then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        // <React.StrictMode>
        <App />,
        // </React.StrictMode>,
    );
});
