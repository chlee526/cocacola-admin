import { BoardColumnsModel } from '@chlee526/ui-kit-react';

import { dateToString } from '@/shared/util';

const BoardColumns: readonly BoardColumnsModel[] = [
    {
        id: 'email',
        label: 'Email',
        useSort: true,
        useColumns: true,
        format: (value: unknown) => {
            return `<strong>${value}</strong>`;
        },
        align: 'center',
    },
    {
        id: 'rname',
        label: '이름',
        width: '10%',
        useSort: true,
        useColumns: true,
        align: 'center',
    },
    {
        id: 'dept',
        label: '부서',
        width: '15%',
        useSort: true,
        useColumns: true,
        align: 'center',
    },
    {
        id: 'position',
        label: '직급',
        width: '10%',
        useSort: true,
        useColumns: true,
        format: (value: unknown) => (value || '') as string,
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
    {
        id: 'mname',
        label: '최종 작성자',
        width: '80px',
        useSort: true,
        useColumns: false,
        align: 'center',
    },
    {
        id: 'state',
        label: '사용',
        width: '50px',
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
];

export { BoardColumns };
