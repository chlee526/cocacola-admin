import { Dispatch, forwardRef, SetStateAction, useCallback, useMemo, useRef, useState } from 'react';

import { InputBox } from '@chlee526/ui-kit-react';
// import Chance from 'chance';
import { TableVirtuoso, TableComponents, TableVirtuosoHandle } from 'react-virtuoso';

import { ExcelData, ExcelHeaderType } from '../model/type';

import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface OwnProps {
    columns: ExcelHeaderType[];
    // excelData: ExcelData[] | null;
    excelData: [ExcelData[] | null, React.Dispatch<React.SetStateAction<ExcelData[] | null>>];
    validationFunc:
        | ((rule: string[], row: ExcelData, error: Map<string, string[]>, key: string, value: string) => string)
        | (() => string);
    errorCount: number;
    scrollerRef: React.RefObject<HTMLDivElement | HTMLElement | Window>;
}

let columns: ExcelHeaderType[] = [
    // {
    //     width: 100,
    //     name: '이름',
    //     key: 'rname',
    // },
];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let getValidation = (_rule: string[], _row: ExcelData, _error: Map<string, string[]>, _key: string, _value: string) => '';
// let getValidation = (key: string, value: string): string => {
//     if (value === '') return '필수 요소 입니다';
//     if (key === 'email' && !getValidationEmail(value)) return '이메일 형식이 올바르지 않습니다';
//     return '';
// };

const VirtuosoScroller = forwardRef<HTMLDivElement>((props, ref) => <TableContainer {...props} ref={ref} />);
VirtuosoScroller.displayName = 'VirtuosoScroller';

const VirtuosoTable = (props: React.ComponentProps<typeof Table>) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
);

const VirtuosoTableHead = forwardRef<HTMLTableSectionElement>((props, ref) => <TableHead {...props} ref={ref} />);
VirtuosoTableHead.displayName = 'VirtuosoTableHead';

const VirtuosoTableBody = forwardRef<HTMLTableSectionElement>((props, ref) => <TableBody {...props} ref={ref} />);
VirtuosoTableBody.displayName = 'VirtuosoTableBody';

const VirtuosoTableComponents: TableComponents<ExcelData> = {
    Scroller: VirtuosoScroller,
    Table: VirtuosoTable,
    TableHead: VirtuosoTableHead,
    TableRow,
    TableBody: VirtuosoTableBody,
};

let inputIsFocused = false;
let focusTimer: NodeJS.Timeout | null = null;
const rowContent = (
    _index: number,
    row: ExcelData,
    updateExcelData: (index: number, key: keyof ExcelData, value: string) => void,
    errorLocations: {
        row: number;
        col: number;
    }[],
    errorIdx: number,
    setErrorIdx: Dispatch<SetStateAction<number>>,
) => {
    return (
        <>
            {columns.map((column, colIndex) => (
                <TableCell
                    key={column.key}
                    align={column.numeric || false ? 'right' : 'left'}
                    data-row={_index}
                    data-col={colIndex}
                >
                    {row.error instanceof Map && row.error.get(column.key as string) ? (
                        <InputBox
                            value={[
                                String(row[column.key] || ''),
                                (newValue: string | number | null) => updateExcelData(_index, column.key, newValue as string),
                            ]}
                            size="small"
                            errorMessage={getValidation(
                                column.rules as string[],
                                row,
                                row.error,
                                column.key as string,
                                row[column.key] as string,
                            )}
                            onFocus={() => {
                                if (focusTimer) clearTimeout(focusTimer);
                                inputIsFocused = true;
                            }}
                            onBlur={() => {
                                inputIsFocused = false;
                                if (focusTimer) clearTimeout(focusTimer);
                                focusTimer = setTimeout(() => {
                                    if (!inputIsFocused) {
                                        setErrorIdx(-1);
                                    }
                                }, 500);
                            }}
                            onMouseDown={() => {
                                const errorIndex = errorLocations.findIndex(loc => loc.row === _index && loc.col === colIndex);
                                if (errorIdx !== errorIndex) setErrorIdx(errorIndex);
                            }}
                        />
                    ) : (
                        row[column.key]
                    )}
                </TableCell>
            ))}
        </>
    );
};

const fixedHeaderContent = () => {
    return (
        <TableRow>
            {columns.map(column => (
                <TableCell
                    key={column.key}
                    variant="head"
                    align={column.numeric || false ? 'right' : 'left'}
                    style={{ width: column.width }}
                    sx={{ backgroundColor: 'background.paper' }}
                >
                    {column.name}
                </TableCell>
            ))}
        </TableRow>
    );
};

/**
 * 엑셀 테이블
 * @param {ExcelHeaderType[]} columns 엑셀 Header 정보
 * @param {ExcelData} excelData 엑셀 데이터
 * @param {((key: string, value: string) => string) | (() => string)} validationFunc 테이블에서 유효성 검사에 사용될 함수
 * @returns {EmotionJSX.Element}
 */
const ExcelUploaderTable = ({ columns: initColumns, excelData: ownsExcelData, validationFunc, errorCount }: OwnProps) => {
    columns = initColumns;
    getValidation = validationFunc;

    const [excelData, setExcelData] = ownsExcelData;
    const handleUpdateExcelData = (index: number, key: keyof ExcelData, value: string) => {
        setExcelData(prevData => {
            if (!prevData) return null;
            const newData = [...prevData];
            newData[index] = { ...newData[index], [key]: value };
            return newData;
        });
    };

    const [currentErrorIndex, setCurrentErrorIndex] = useState(-1);
    const virtuosoRef = useRef<TableVirtuosoHandle>(null);

    // (row.error as Map<string, string[]>)

    const findErrorLocations = () => {
        if (!excelData) return [];
        return excelData.reduce(
            (acc, row, rowIndex) => {
                if (row.error instanceof Map) {
                    columns.forEach((column, colIndex) => {
                        const errorMessages = (row.error as Map<string, string[]>).get(column.key as string);

                        if (errorMessages && errorMessages.some(item => !item.includes('complete'))) {
                            acc.push({ row: rowIndex, col: colIndex });
                        }
                    });
                }
                return acc;
            },
            [] as { row: number; col: number }[],
        );
    };
    const errorLocations = useMemo(findErrorLocations, [excelData]);

    const handleMoveScroll = useCallback(
        (newValue: number) => {
            if (newValue >= 0 && virtuosoRef.current) {
                const targetError = errorLocations[newValue];
                virtuosoRef.current.scrollToIndex({
                    index: targetError.row,
                    align: 'center',
                    // behavior: 'smooth',
                });

                // 입력 필드에 포커스
                setTimeout(() => {
                    const targetElement = document.querySelector(
                        `[data-row="${targetError.row}"][data-col="${targetError.col}"]`,
                    ) as HTMLElement;
                    if (targetElement) {
                        const inputElement = targetElement.querySelector('input');
                        if (inputElement) {
                            inputElement.focus();
                        }
                    }
                }, 100); // 스크롤 완료 후 포커스를 위해 약간의 지연 추가
            }
            // console.log(currentErrorIndex, errorLocations);
        },
        [errorLocations],
    );

    const handleNextError = () => {
        if (errorLocations.length === 0) return;
        setCurrentErrorIndex(prevIndex => {
            const newValue = (prevIndex + 1) % errorLocations.length;
            handleMoveScroll(newValue);
            return newValue;
        });
        // setTimeout(handleMoveScroll, 1000);
    };

    // useEffect(() => {
    //     if (currentErrorIndex >= 0 && virtuosoRef.current) {
    //         const targetError = errorLocations[currentErrorIndex];
    //         virtuosoRef.current.scrollToIndex({
    //             index: targetError.row,
    //             align: 'center',
    //             behavior: 'smooth',
    //         });

    //         // 입력 필드에 포커스
    //         setTimeout(() => {
    //             const targetElement = document.querySelector(
    //                 `[data-row="${targetError.row}"][data-col="${targetError.col}"]`,
    //             ) as HTMLElement;
    //             if (targetElement) {
    //                 const inputElement = targetElement.querySelector('input');
    //                 if (inputElement) {
    //                     inputElement.focus();
    //                 }
    //             }
    //         }, 100); // 스크롤 완료 후 포커스를 위해 약간의 지연 추가
    //     }
    // }, [currentErrorIndex, errorLocations]);

    if (!excelData) return <div>데이터가 없습니다.</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '70vh', width: '100%' }}>
            <div style={{ flex: '0', display: 'flex', alignItems: 'center', gap: '0.5em', padding: '1em 0' }}>
                <span style={{ display: 'flex', fontSize: '14px' }}>
                    <span>수정:</span>
                    <strong style={{ color: '#ff0000' }}>{errorCount || 0}</strong>
                    <span>개</span>
                </span>
                <Button variant="contained" size="small" color="error" onClick={handleNextError} disabled={errorCount === 0}>
                    다음 수정 사항
                </Button>
            </div>

            <TableVirtuoso
                ref={virtuosoRef}
                data={excelData}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={(index, row) =>
                    rowContent(index, row, handleUpdateExcelData, errorLocations, currentErrorIndex, setCurrentErrorIndex)
                }
                style={{ flex: '1' }}
            />
        </div>
    );
};

export { ExcelUploaderTable };
