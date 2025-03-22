import { BoardColumnsModel } from '@chlee526/ui-kit-react';

import { COMMON_CHANNEL, EXCLUSION_FILTER_TYPE, EXCLUSION_OP } from '@/shared/config/common';
import { dateToString } from '@/shared/util';

import { KeywordModel } from '../model/model';

const KeywordBoardColumns: BoardColumnsModel[] = [
    {
        id: 'category',
        label: '그룹',
        width: '8%',
        useSort: false,
        useColumns: true,
        align: 'center',
    },
    {
        id: 'keyword',
        label: '키워드',
        width: '10%',
        useSort: true,
        useColumns: true,
        align: 'center',
    },
    {
        id: 'op',
        label: '종류',
        width: '5%',
        useSort: false,
        useColumns: true,
        align: 'center',
        filter: {
            key: 'op',
            options: [...EXCLUSION_OP.map(({ seq, name }) => ({ code: seq, name }))],
        },
        format: value => {
            const name = EXCLUSION_OP.find(({ seq }) => seq === Number(value))?.name;
            return name || '';
        },
    },
    {
        id: 'filterType',
        label: '검색 영역',
        width: '12%',
        useSort: false,
        useColumns: true,
        align: 'center',
        filter: {
            key: 'filterType',
            options: [...EXCLUSION_FILTER_TYPE.map(({ seq, name }) => ({ code: seq, name }))],
        },
        format: value => {
            const name = EXCLUSION_FILTER_TYPE.find(({ seq }) => seq === Number(value))?.name;

            return name || '';
        },
    },
    {
        id: 'sgSeqs',
        label: '채널',
        width: '10%',
        useSort: false,
        useColumns: true,
        align: 'center',
        filter: {
            key: 'sgSeqs',
            options: [...COMMON_CHANNEL.map(({ seq, cmmName }) => ({ code: seq, name: cmmName }))],
        },
        format: value => {
            const clone = value as number[];
            const name = clone
                .map(seq => COMMON_CHANNEL.find(item => item.seq === Number(seq)))
                .filter(item => item)
                .map(item => item?.cmmName);

            return name.length <= 3
                ? name.join(',')
                : `<span title="${name.join()}">${name[0]} 외 ${name.length - 1}개</span>` || '';
        },
    },
    {
        id: 'children',
        label: '제외 키워드',
        // width: '100px',
        useSort: false,
        useColumns: true,
        align: 'center',
        format: value => {
            const clone = value as Omit<KeywordModel, 'sgSeqs'>[];
            const name = clone?.map(child => child.state === 'Y' && child?.keyword).filter(item => item);
            return name.length
                ? `<span class="is-ellipsis" title="${name.join(',')}">${name.join(',')}</span>${name.length > 1 ? `<span class="is-ellipsis is-length">(총 ${name.length.toLocaleString()}개)</span>` : ''}`
                : '';
        },
    },
    {
        id: 'regDate',
        label: '등록일',
        width: '12%',
        useSort: true,
        useColumns: true,
        align: 'center',
        format: (value: unknown) => dateToString(String(value), 'YYYY-MM-DD hh:mm:ss'),
    },
    {
        id: 'mname',
        label: '작성자',
        width: '8%',
        useSort: false,
        useColumns: true,
        align: 'center',
    },
    {
        id: 'state',
        label: '사용',
        width: '5%',
        useSort: false,
        useColumns: true,
        align: 'center',
        filter: {
            key: 'state',
            options: [
                { code: 'Y', name: '사용' },
                { code: 'N', name: '미사용' },
            ],
        },
    },
];

export { KeywordBoardColumns };
