import { useCallback, useEffect, useRef, useState } from 'react';

import { getValidationEmail } from '@chlee526/ui-kit-react';
import { useQueryClient } from '@tanstack/react-query';
import * as ExcelJS from 'exceljs';

import { PostReceiverRequestModel, usePostReceiverExcelMutation } from '@/entity/receiver';
import { Loader } from '@/shared/ui';

import { ExcelUploaderTable } from './ExcelUploaderTable';
import { HiddenInput } from './HiddenInput';
import { ExcelData, ExcelHeaderType } from '../model/type';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

/**
 * 엑셀 헤더 정보
 */
const excelColumns: ExcelHeaderType[] = [
    { key: 'id', width: 30, name: '번호' },
    { key: 'rname', width: 100, name: '이름', rules: ['required'] },
    { key: 'email', name: '이메일', rules: ['required', 'validation', 'duplicate'] },
    { key: 'position', width: 50, name: '직급' },
    { key: 'dept', width: 110, name: '부서', rules: ['required'] },
    { key: 'state', width: 70, name: '사용', rules: ['required'], defaultValue: 'N' },
];

/**
 * 엑셀 데이터에서 name으로 매칭된 ExcelHeaderType 객체 반환
 * @param {string} name 이름
 * @returns {ExcelHeaderType} name으로 매칭된 해더 객체
 */
const getKeyByName = (name: string): ExcelHeaderType => {
    const found = excelColumns.find(item => item.name === name);
    if (!found)
        return {
            key: '',
            name: '',
        };
    return found;
};

const setError = (error: Map<string, string[]>, key: string, type: string) => {
    const currentRules = error.get(key);
    if (currentRules) {
        const updatedRules = currentRules.map(r => {
            if (type.indexOf('complete') >= 0) return r === type.split('-')[0] ? type : r;
            return r.split('-')[0] === type ? type : r;
        });
        error.set(key, updatedRules);
    }
};

const ExcelUploader = () => {
    const [excelData, setExcelData] = useState<ExcelData[] | null>(null);
    // const isOpenExcelModal = useMemo(() => !!excelData, [excelData]);
    const [isOpenExcelModal, setIsOpenExcelModal] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    /**
     * 로드된 엑셀 데이터 테이블에서 유효성 검사
     * @param {string} key 키명칭
     * @param {string} value 값
     * @returns {string} 에러 메시지, 에러가 없는경우 빈 문자열('') 반환
     */
    const getMdfyValidation = useCallback(
        (rule: string[], row: ExcelData, error: Map<string, string[]>, key: string, value: string): string => {
            if (excelData) {
                if (rule.length) {
                    // 필수
                    if (rule.includes('required')) {
                        if (value.trim() === '') {
                            setError(error, key, 'required');
                            return '필수';
                        }
                        setError(error, key, 'required-complete');
                    }

                    // 유효성
                    if (rule.includes('validation')) {
                        // 이메일 요소 유효성
                        if (key === 'email') {
                            if (!getValidationEmail(value)) {
                                setError(error, key, 'validation');
                                return '이메일 형식';
                            }
                        }
                        setError(error, key, 'validation-complete');
                    }

                    // 중복
                    if (rule.includes('duplicate')) {
                        // console.log(excelData, rule, row, error, key, value);

                        const rowData = excelData.find(item => item.id === row.id);

                        // 이메일 요소 유효성
                        const duplicateItems = excelData.filter(item => {
                            return item[key] === value;
                        });
                        if (duplicateItems && duplicateItems.length > 1) {
                            if (rowData) setError(rowData.error as Map<string, string[]>, key, 'duplicate');
                            setError(error, key, 'duplicate');
                            return '중복';
                        }
                        if (rowData) setError(rowData.error as Map<string, string[]>, key, 'duplicate-complete');
                        setError(error, key, 'duplicate-complete');
                    }
                }
            }
            return '';
        },
        [excelData],
    );

    // 엑셀 테이블 Dialog Close
    const handleClose = () => {
        setIsOpenExcelModal(false);
    };
    const handleExited = () => {
        setExcelData(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // 에러 카운트
    const [errorCount, setErrorCount] = useState(0);
    useEffect(() => {
        setTimeout(() => {
            if (excelData) {
                const newErrorCount = excelData.reduce((count, item) => {
                    if (item.error instanceof Map) {
                        const itemErrorCount = Array.from(item.error.keys()).reduce((keyCount, key) => {
                            const errors = (item.error as Map<string, string[]>).get(key);
                            return keyCount + (errors && errors.some(error => !error.includes('-complete')) ? 1 : 0);
                        }, 0);
                        return count + itemErrorCount;
                    }
                    return count;
                }, 0);
                setErrorCount(newErrorCount);
            } else {
                setErrorCount(0);
            }
        }, 100);
    }, [excelData]);

    // API
    const queryClient = useQueryClient();
    const { mutateAsync: postExcelMutate, isPending: postExcelIsLoading } = usePostReceiverExcelMutation();
    const handleSubmit = async () => {
        if (excelData) {
            try {
                const param: PostReceiverRequestModel[] = excelData?.map(item => ({
                    dept: item.dept ?? '',
                    email: item.email ?? '',
                    state: item.state === '사용' ? 'Y' : 'N',
                    rname: item.rname ?? '',
                    ...(item.position ? { position: item.position } : {}),
                }));
                await postExcelMutate(param);
                queryClient.invalidateQueries({ queryKey: ['RECEIVER_LIST'] });
                handleClose();
            } catch (e) {
                console.log('Excek Upload Error >> ', e);
            }
        }
    };

    // 파일 선택 완료
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const workbook = new ExcelJS.Workbook();
        try {
            await workbook.xlsx.load(await file.arrayBuffer());
            const worksheet = workbook.getWorksheet(1);

            if (!worksheet) {
                return;
            }

            const jsonData: ExcelData[] = [];
            const headers: string[] = [];
            const emailSet = new Set<string>();

            // 헤더 행 처리
            worksheet.getRow(1).eachCell({ includeEmpty: true }, cell => {
                headers.push(cell.value?.toString() || '');
            });

            // 데이터 행 처리
            worksheet.eachRow({ includeEmpty: false }, (_row, rowNumber) => {
                if (rowNumber > 1) {
                    const rowData: ExcelData = {};
                    rowData.id = rowNumber - 1;
                    rowData.error = new Map();
                    for (let colNumber = 1; colNumber <= headers.length; colNumber += 1) {
                        const cell = worksheet.getCell(rowNumber, colNumber);

                        const headerName = headers[colNumber - 1];
                        const { key, rules } = getKeyByName(headerName);

                        rowData[key] = ((): string => {
                            if (typeof cell.value === 'string') return String(cell.value);
                            if (cell.value && typeof cell.value === 'object') {
                                if ('text' in cell.value && typeof cell.value.text === 'string') {
                                    return cell.value.text.trim();
                                }
                                if ('result' in cell.value && typeof cell.value.result === 'string') {
                                    return cell.value.result.trim();
                                }
                            }
                            if (cell.value instanceof Date) {
                                return cell.value.toISOString();
                            }
                            return String(cell.value || '').trim();
                        })();

                        // 대체 값
                        if (key === 'state' && (cell.value === null || cell.value === undefined)) {
                            rowData[key] = '미사용';
                        }

                        // 유효성 검사
                        if (rules && rowData.error) {
                            const errors: string[] = [];

                            // 빈값 체크
                            if (rules.includes('required') && rowData[key].trim() === '') errors.push('required');
                            // 이메일 형식 체크
                            if (rules.includes('validation')) {
                                if (key === 'email' && !getValidationEmail(rowData[key] as string)) errors.push('validation');
                            }
                            // 중복 체크
                            if (rules.includes('duplicate')) {
                                if (emailSet.has(rowData[key] as string)) {
                                    errors.push('duplicate');
                                } else {
                                    emailSet.add(rowData[key] as string);
                                }
                            }

                            // 에러가 있는 경우에만 Map에 추가
                            if (errors.length > 0) {
                                rowData.error.set(key, errors);
                            }
                        }
                    }
                    jsonData.push(rowData);
                }
            });
            setExcelData(jsonData);
            setIsOpenExcelModal(true);
        } catch (error) {
            console.error('Error reading Excel file:', error);
        }
    };

    const scrollerRef = useRef(null);
    return (
        <>
            <Button component="label" variant="contained" color="white" size="small" startIcon={<FileUploadIcon />}>
                엑셀파일로 등록
                <HiddenInput ref={fileInputRef} type="file" onChange={handleFileUpload} accept=".xlsx, .csv" />
            </Button>
            <Dialog
                fullWidth
                maxWidth="md"
                open={isOpenExcelModal}
                TransitionProps={{
                    onExited: handleExited,
                }}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        handleSubmit();
                        console.log(excelData);
                    },
                }}
            >
                <DialogTitle>[Excel 업로드] 정보 수신자</DialogTitle>
                <DialogContent ref={scrollerRef} style={{ overflow: 'hidden' }}>
                    <DialogContentText fontSize={13}>업로드 된 엑셀 데이터 입니다.</DialogContentText>
                    <ExcelUploaderTable
                        columns={excelColumns}
                        excelData={[excelData, setExcelData]}
                        validationFunc={getMdfyValidation}
                        errorCount={errorCount}
                        scrollerRef={scrollerRef}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="white">
                        취소
                    </Button>
                    <Button type="submit" variant="contained" color="success" disabled={errorCount !== 0}>
                        등록
                    </Button>
                </DialogActions>
                <Loader open={postExcelIsLoading} />
            </Dialog>
        </>
    );
};

export { ExcelUploader };
