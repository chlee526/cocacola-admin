import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';

import { SelectBox } from '@chlee526/ui-kit-react';
import { Controller, useForm } from 'react-hook-form';

import { useAuthStore } from '@/entity/auth';
import { useDuplicateId, useJoinMember, useUpdateMember } from '@/entity/member';
import { AsideBox } from '@/shared/ui';

import { InputField } from './InputField';
import { saveEditStyle } from './SaveEdit.style';
import { MemberConfig } from '../config/config';
import { FormValues, SaveEditPropsModel } from '../model/model';

import { Button, FormControlLabel, Switch } from '@mui/material';

const SaveEdit = ({ selectedItem, setSelectedItem }: SaveEditPropsModel) => {
    const [duplicateChk, setDuplicateChk] = useState(false); // 중복 체크 여부
    const { getAuthList } = useAuthStore(); // 권한 목록

    // 리액트 훅 폼 기본 값 설정
    const defaultValues = useMemo(() => {
        if (selectedItem) {
            const { authSeq, id, name, position, dept, phone, email, state } = selectedItem;
            return {
                authSeq: String(authSeq),
                id,
                pw: '',
                name,
                position,
                dept,
                phone,
                email,
                state,
            };
        }
        return MemberConfig.InputFiledOpts.reduce(
            (acc, input) => ({
                ...acc,
                [input.field]: '',
            }),
            {},
        );
    }, [selectedItem]);

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        trigger,
        formState: { isValid, isDirty },
    } = useForm<FormValues>({
        mode: 'onChange',
        defaultValues,
        shouldFocusError: false,
    });

    // 리액트 쿼리 관련
    const joinMemberMutation = useJoinMember(); // 사용자 가입
    const updateMemberMutation = useUpdateMember(); // 사용자 업데이트
    const duplicateIdQuery = useDuplicateId({ memberId: watch('id') }); // 아이디 중복 체크

    // 저장 버튼 유효성 체크
    const isFormValid = useCallback(() => {
        if (selectedItem) {
            // 선택된 아이템이 있는 경우
            const isChanged = MemberConfig.InputFiledOpts.map(input => {
                const currentValue = watch(input.field);
                const originalValue = selectedItem[input.field];
                if (input.field === 'pw') {
                    return currentValue.trim().length >= 4 && isValid && isDirty;
                }

                return String(currentValue) !== String(originalValue || '');
            }).some(value => value === true);
            return isChanged && isValid;
        }

        return duplicateChk && isValid && isDirty;
    }, [duplicateChk, watch, selectedItem, isValid, isDirty, trigger]);

    // 저장 버튼 핸들러
    const onSubmit = (data: FormValues) => {
        if (!selectedItem) {
            // 가입
            const param = { ...data, authSeq: Number(data.authSeq) };
            joinMemberMutation.mutateAsync(param).then(() => reset(defaultValues));
        } else {
            // 수정
            const param = {
                ...data,
                seq: selectedItem.seq,
                authSeq: Number(data.authSeq),
            };
            updateMemberMutation.mutateAsync([param]).then(() => setSelectedItem(null));
        }
    };

    // 선택 아이템 유무에 따른 Form 기본 값 업데이트
    useLayoutEffect(() => {
        reset(defaultValues);
    }, [selectedItem]);

    return (
        <div css={saveEditStyle}>
            <AsideBox
                title={selectedItem ? '사용자 수정' : '사용자 등록'}
                headerButton={
                    selectedItem
                        ? {
                              label: '사용자 등록',
                              onClick: () => {
                                  setSelectedItem(null);
                              },
                          }
                        : null
                }
            >
                <div className="contents">
                    <div className="inputs">
                        {MemberConfig.InputFiledOpts.map(input => (
                            <div key={input.field} className={`${input.field}`}>
                                {/* 권한명 */}
                                {input.field === 'authSeq' && (
                                    <Controller
                                        control={control}
                                        name={input.field}
                                        rules={{ required: !selectedItem }}
                                        render={({ field: { value, onChange } }) => (
                                            <FormControlLabel
                                                labelPlacement="start"
                                                label={input.label}
                                                control={
                                                    <div className="selectBoxWrap">
                                                        <SelectBox
                                                            size="small"
                                                            value={[value, onChange]}
                                                            list={getAuthList()}
                                                        />
                                                    </div>
                                                }
                                            />
                                        )}
                                    />
                                )}

                                {/* 인풋필드 */}
                                {input.field !== 'state' && input.field !== 'authSeq' && (
                                    <InputField
                                        input={input}
                                        control={control}
                                        watch={watch}
                                        selectedItem={selectedItem}
                                        duplicateChk={duplicateChk}
                                        setDuplicateChk={setDuplicateChk}
                                        duplicateIdQuery={duplicateIdQuery}
                                    />
                                )}

                                {/* 사용여부 */}
                                {input.field === 'state' && selectedItem && (
                                    <Controller
                                        control={control}
                                        name={input.field}
                                        render={() => (
                                            <FormControlLabel
                                                className="switchLabel"
                                                labelPlacement="start"
                                                label={input.label}
                                                control={
                                                    <div className="switchWrap">
                                                        <Switch
                                                            size="small"
                                                            color="default"
                                                            checked={watch('state') === 'Y'}
                                                            onChange={(
                                                                e: React.ChangeEvent<HTMLInputElement>,
                                                            ) => {
                                                                setValue(
                                                                    'state',
                                                                    e.target.checked ? 'Y' : 'N',
                                                                );
                                                                trigger();
                                                            }}
                                                        />
                                                    </div>
                                                }
                                            />
                                        )}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="btnArea">
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => reset(defaultValues)}
                        >
                            초기화
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            color="success"
                            disabled={!isFormValid()}
                            onClick={handleSubmit(onSubmit)}
                        >
                            저장
                        </Button>
                    </div>
                </div>
            </AsideBox>
        </div>
    );
};

export { SaveEdit };
