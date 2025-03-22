import { BoardColumnsModel } from '@chlee526/ui-kit-react';

import { dateToString } from '@/shared/util';

const BoardColumns: readonly BoardColumnsModel[] = [
    {
        id: 'seq',
        label: '번호',
        width: '60px',
        useSort: false,
        useColumns: true,
        align: 'center',
    },
    {
        id: 'authName',
        label: '권한명',
        useSort: true,
        useColumns: true,
        format: (value: unknown) => {
            return `<strong>${value}</strong>`;
        },
        align: 'center',
    },
    {
        id: 'state',
        label: '사용',
        width: '10%',
        useSort: false,
        filter: {
            key: 'state',
            options: [
                { code: 'Y', name: '사용' },
                { code: 'N', name: '미사용' },
            ],
        },
        useColumns: true,
        align: 'center',
    },
    {
        id: 'mname',
        label: '등록자',
        width: '10%',
        useSort: true,
        useColumns: true,
        align: 'center',
    },
    {
        id: 'regDate',
        label: '등록일시',
        width: '150px',
        useSort: true,
        useColumns: true,
        format: (value: unknown) => dateToString(String(value), 'YYYY-MM-DD hh:mm:ss'),
        align: 'center',
    },
];

export { BoardColumns };
