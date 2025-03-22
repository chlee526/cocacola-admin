import { BoardColumnsModel } from '@chlee526/ui-kit-react';

import { EXCLUSION_FILTER_TYPE, EXCLUSION_OP } from '@/shared/config/common';
import { dateToString } from '@/shared/util';

const columns: readonly BoardColumnsModel[] = [
    {
        id: 'exclusionKeyword',
        label: '키워드',
        useSort: true,
        useColumns: true,
        align: 'center',
        width: '300px',
        format: value => {
            return `<strong>${value}</strong>`;
        },
    },
    {
        id: 'op',
        label: '종류',
        useSort: true,
        useColumns: true,
        align: 'center',
        width: '150px',
        filter: {
            key: 'op',
            options: [...EXCLUSION_OP.map(({ seq, name }) => ({ code: seq, name }))],
        },
        format: value => {
            const item = value as {
                value: number;
                leftLength: number;
                rightLength: number;
            };

            const name = EXCLUSION_OP.find(({ seq }) => seq === item.value)?.name;

            if (name === '인접') {
                return `<span style="display: flex; flex-direction: column;">
                    <span>${name}</span>
                    <span>(${item.leftLength}~, ~${item.rightLength})</span>
                </span>`;
            }

            return name || '';
        },
    },
    {
        id: 'filterType',
        label: '검색 영역',
        useSort: true,
        useColumns: true,
        align: 'center',
        width: '150px',
        filter: {
            key: 'filterType',
            options: [...EXCLUSION_FILTER_TYPE.map(({ seq, name }) => ({ code: seq, name }))],
        },
        format: value => {
            const name = EXCLUSION_FILTER_TYPE.find(({ seq }) => seq === value)?.name;

            return name || '';
        },
    },
    {
        id: 'regDate',
        label: '최종 작성일시',
        width: '280px',
        useSort: true,
        format: value => dateToString(String(value), 'YYYY-MM-DD hh:mm:ss'),
        useColumns: true,
        align: 'center',
    },
    {
        id: 'mname',
        label: '최종 작성자',
        width: '180px',
        useSort: true,
        useColumns: true,
        align: 'center',
    },
    {
        id: 'state',
        label: '사용',
        width: '50px',
        useSort: false,
        useColumns: true,
        filter: {
            key: 'state',
            options: [
                { code: 'Y', name: '사용' },
                { code: 'N', name: '미사용' },
            ],
        },
        align: 'center',
    },
];

export { columns };
