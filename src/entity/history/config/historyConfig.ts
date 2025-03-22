import { BoardColumnsModel } from '@chlee526/ui-kit-react';

import { dateToString } from '@/shared/util';

// 게시판
const BoardColumns: readonly BoardColumnsModel[] = [
    {
        id: 'sysName',
        label: '시스템',
        width: '10%',
        useSort: false,
        useColumns: true,
        align: 'center',
    },
    {
        id: 'authName',
        label: '사용자권한',
        width: '15%',
        useSort: true,
        useColumns: true,
        align: 'center',
    },
    {
        id: 'ip',
        label: '접속IP',
        width: '15%',
        useSort: false,
        useColumns: true,
        align: 'center',
    },
    {
        id: 'mid',
        label: '아이디',
        // width: '150px',
        useSort: true,
        useColumns: true,
        align: 'center',
    },
    {
        id: 'mname',
        label: '사용자',
        width: '20%',
        useSort: true,
        useColumns: true,
        format: value => {
            return `<strong>${value}</strong>`;
        },
        align: 'center',
    },
    {
        id: 'regDate',
        label: '접속일시',
        width: '15%',
        useSort: true,
        useColumns: true,
        format: (value: unknown) => dateToString(String(value), 'YYYY-MM-DD hh:mm:ss'),
        align: 'center',
    },
];

export { BoardColumns };
