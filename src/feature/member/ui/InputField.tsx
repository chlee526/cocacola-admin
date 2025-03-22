import { useCallback, useEffect, useState } from 'react';

import { InputBox } from '@chlee526/ui-kit-react';
import { Controller } from 'react-hook-form';

import { InputFieldErrorMsgModel, InputFieldPropsModel } from '../model/model';

import { Button, FormControlLabel } from '@mui/material';

const InputField = ({
    input,
    control,
    watch,
    selectedItem,
    duplicateChk,
    setDuplicateChk,
    duplicateIdQuery,
}: InputFieldPropsModel) => {
    const [errorMsg, setErrorMsg] = useState<InputFieldErrorMsgModel>({
        id: '',
        pw: '',
        name: '',
        dept: '',
    });
    const isRegistMode = !selectedItem;

    const handleErrorMsg = useCallback((type: keyof InputFieldErrorMsgModel, msg: string) => {
        setErrorMsg(prev => ({
            ...prev,
            [type]: msg,
        }));
    }, []);

    const validateField = useCallback(
        (name: string, value: string) => {
            const validations: Record<string, () => boolean> = {
                id: () => {
                    if (isRegistMode) {
                        if (value.length === 0) {
                            handleErrorMsg('id', '필수값입니다.');
                            return false;
                        }
                        if (!duplicateChk) {
                            handleErrorMsg('id', '중복 아이디 검사를 진행하세요.');
                            return false;
                        }
                    }
                    handleErrorMsg('id', '');
                    return true;
                },
                pw: () => {
                    if (isRegistMode && value.length === 0) {
                        handleErrorMsg('pw', '필수값입니다.');
                        return false;
                    }
                    if (value.length > 0 && value.length < 4) {
                        handleErrorMsg('pw', '4글자 이상 입력하세요.');
                        return false;
                    }
                    handleErrorMsg('pw', '');
                    return true;
                },
                name: () => {
                    if (value.length === 0) {
                        handleErrorMsg('name', '필수값입니다.');
                        return false;
                    }
                    handleErrorMsg('name', '');
                    return true;
                },
                dept: () => {
                    if (isRegistMode && value.length === 0) {
                        handleErrorMsg('dept', '필수값입니다');
                        return false;
                    }
                    handleErrorMsg('dept', '');
                    return true;
                },
            };

            return validations[name] ? validations[name]() : true;
        },
        [isRegistMode, duplicateChk, handleErrorMsg],
    );

    // 중복체크 여부 감지
    useEffect(() => {
        if (duplicateIdQuery.isSuccess) {
            setDuplicateChk(true);
            handleErrorMsg('id', '');
        } else if (duplicateIdQuery.error) {
            setDuplicateChk(false);
            handleErrorMsg('id', '이미 사용된 아이디입니다.');
        }
    }, [duplicateIdQuery.isFetching, duplicateIdQuery.isSuccess, duplicateIdQuery.error]);

    // 에러메세지 초기화
    useEffect(() => {
        setErrorMsg({ id: '', pw: '', name: '', dept: '' });
    }, [selectedItem]);

    return (
        <div className={`input ${isRegistMode && input.require && 'require'}`}>
            <Controller
                control={control}
                name={input.field}
                rules={{
                    required: isRegistMode && input.require && '필수값입니다',
                }}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <FormControlLabel
                        labelPlacement="start"
                        label={input.label}
                        control={
                            <div className="inputWrap">
                                {selectedItem && ['id', 'name'].includes(input.field) ? (
                                    <strong>{value}</strong>
                                ) : (
                                    <InputBox
                                        id={input.field}
                                        name={input.field}
                                        className="inputBox"
                                        size="small"
                                        type={input.field === 'pw' ? 'password' : 'text'}
                                        value={[value, onChange]}
                                        required={!selectedItem && input.require}
                                        error={!!error}
                                        errorMessage={
                                            errorMsg[input.field as 'id' | 'pw' | 'name' | 'dept']
                                        }
                                        onChange={e => {
                                            if (input.field === 'id') {
                                                setDuplicateChk(false);
                                            }
                                            validateField(input.field, e.target.value);
                                        }}
                                        autoComplete="one-time-code"
                                    />
                                )}

                                {input.field === 'id' && !selectedItem && (
                                    <Button
                                        id="duplicateBtn"
                                        className="duplicateBtn"
                                        size="small"
                                        variant="outlined"
                                        onClick={() => duplicateIdQuery.refetch()}
                                        disabled={!watch('id').length}
                                    >
                                        중복검사
                                    </Button>
                                )}
                            </div>
                        }
                    />
                )}
            />
        </div>
    );
};

export { InputField };
