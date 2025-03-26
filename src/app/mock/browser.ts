import { setupWorker } from 'msw/browser';

import { authMockApi } from '@/entity/auth/mock/authMockApi';

import { replaceMockApi } from '@/entity/replace/mock/replaceMockApi';
import { commonMockApi } from '@/entity/common/mock/commonMockApi';
import { memberMockApi } from '@/entity/member/mock/memberMockApi';
import { menuMockApi } from '@/entity/menu/mock/menuMockApi';
import { adminMockApi } from '@/entity/auth/mock/adminMockApi';
import { exclusionMockApi } from '@/entity/exclusion/mock/exclusionMockApi';
import { keywordMockApi } from '@/entity/keyword/mock/keywordMockApi';
import { siteMockApi } from '@/entity/site/mock/siteMockApi';
import { historyMockApi } from '@/entity/history/mock/historyMockApi';
import { receiverMockApi } from '@/entity/receiver/mock/receiverMockApi';

const worker = setupWorker(
    ...authMockApi,
    ...adminMockApi,
    ...commonMockApi,
    ...replaceMockApi,
    ...memberMockApi,
    ...menuMockApi,
    ...exclusionMockApi,
    ...keywordMockApi,
    ...siteMockApi,
    ...historyMockApi,
    ...receiverMockApi,
);

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
