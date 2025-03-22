import { setupWorker } from 'msw/browser';

import { authMockApi } from '@/entity/auth/mock/authMockApi';

import { analysisHandeler } from './analysisMock';

const worker = setupWorker(...analysisHandeler, ...authMockApi);

const startApiMockWorker = async () => {
    await worker.start({
        onUnhandledRequest(request, print) {
            const url = new URL(request.url);

            if (/\.png|jpg|svg|tsx?|css|jsx?|woff2$/.test(url.pathname)) {
                return;
            }

            print.warning();
        },
    });
};

export { startApiMockWorker };
