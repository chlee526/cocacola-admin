import { useEffect, useMemo, useState } from 'react';

import { AsideBox, InputBox } from '@chlee526/ui-kit-react';
import { useQueryClient } from '@tanstack/react-query';
import { Controller, FieldError, useForm } from 'react-hook-form';

import {
    PostReceiverRequestModel,
    PutReceiverRequestModel,
    ReceiverBoardDataModel,
    useGetReceiverDuplicateMutation,
    useGetReceiverMutation,
    usePostReceiverMutation,
    usePutReceiverMutation,
} from '@/entity/receiver';
import { useAlert } from '@/shared/store';
import { Loader } from '@/shared/ui';
import { CuiAsideInputs } from '@/shared/ui/aside/AsideInputs';

import { Styles } from './SaveEdit.style';
import { InputFieldSettings } from '../config/config';

import { Button, FormControlLabel, Stack, Switch } from '@mui/material';

interface OwnProps {
    selectedItem: [ReceiverBoardDataModel, React.Dispatch<React.SetStateAction<ReceiverBoardDataModel>>];
    updateEvent: (param: PutReceiverRequestModel[]) => void;
}

const asideName = '정보 수신자';

const SaveEdit = ({ selectedItem: ownPropsSelectedItem }: OwnProps) => {
    const { showAlert } = useAlert();

    // 선택 아이템
    const [selectedItem, setSelectedItem] = ownPropsSelectedItem;
    const { mutate, data: selData } = useGetReceiverMutation();
    const [emailModify, setEmailModify] = useState(false);

    // 폼 초기값
    const defaultValues: PostReceiverRequestModel = useMemo(() => {
        if (selectedItem && selData) {
            return {
                state: selData.state,
                rname: selData.rname,
                dept: selData.dept,
                position: selData.position,
                email: selData.email,
                emailChk: true,
                emailDuplicate: false,
            };
        }
        return {
            state: 'Y',
            rname: '',
            dept: '',
            position: '',
            email: '',
            emailChk: false,
            emailDuplicate: false,
        };
    }, [selectedItem, selData]);

    // 폼
    const {
        control,
        handleSubmit,
        trigger,
        reset,
        setValue,
        getValues,
        watch,
        formState: { isValid, isDirty },
    } = useForm<PostReceiverRequestModel>({
        mode: 'onChange',
        defaultValues,
        shouldFocusError: false,
    });

    // email 감시
    const emailValue = watch('email');
    useEffect(() => {
        if (getValues('email').trim().length && getValues('email') !== defaultValues.email) {
            setValue('emailChk', false);
            trigger('email');
        }
    }, [emailValue]);

    // 선택 아이템 데이터
    useEffect(() => {
        if (selectedItem) {
            // 선택된 아이템이 있는 경우 API 호출
            mutate(selectedItem.seq);
            setEmailModify(false);
        } else {
            // 없는 경우 reset
            reset(defaultValues);
        }
    }, [selectedItem]);
    useEffect(() => {
        if (selData) {
            reset(defaultValues);
        }
    }, [selData]);

    // 중복검사
    const { mutateAsync: duplicateMutate } = useGetReceiverDuplicateMutation();
    const handleDuplicate = async (error: FieldError | undefined) => {
        if (!error || error.type === 'validate' || !getValues('emailChk')) {
            setValue('emailChk', true);
            trigger('email');
            try {
                if (getValues('email') !== defaultValues.email) {
                    await duplicateMutate({ email: getValues('email') });
                    setValue('emailDuplicate', false);
                }
            } catch (e) {
                setValue('emailDuplicate', true);
            }
            trigger('email');
        }
    };

    // 폼 Submit
    const queryClient = useQueryClient();
    const { mutateAsync: postMutate, isPending: postIsLoading } = usePostReceiverMutation();
    const { mutateAsync: putMutate, isPending: putIsLoading } = usePutReceiverMutation();
    const onSubmit = async (data: PostReceiverRequestModel | PutReceiverRequestModel) => {
        if (!selectedItem) {
            // 추가
            try {
                await postMutate({ ...data, state: 'Y' } as PostReceiverRequestModel);
                queryClient.invalidateQueries({ queryKey: ['RECEIVER_LIST'] });
                reset(defaultValues);
                showAlert(`정보수신자가 등록 되었습니다.`, 'success');
            } catch (error) {
                console.log(error);
            }
        } else {
            // 수정
            try {
                await putMutate({ seq: [selectedItem.seq], ...data });
                queryClient.invalidateQueries({ queryKey: ['RECEIVER_LIST'] });
                showAlert(`정보수신자가 수정 되었습니다.`, 'success');
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div css={Styles}>
            <AsideBox
                title={selectedItem ? `${asideName} 수정` : `${asideName} 등록`}
                headerButton={
                    selectedItem
                        ? {
                              label: `${asideName} 등록`,
                              onClick: () => {
                                  setSelectedItem(null);
                              },
                          }
                        : null
                }
            >
                <div className="contents">
                    <div className="inputs">
                        <CuiAsideInputs>
                            <Stack>
                                <Controller
                                    control={control}
                                    name="state"
                                    render={({ field: { value, onChange } }) => {
                                        return (
                                            <FormControlLabel
                                                className="isAutoWid"
                                                labelPlacement="start"
                                                label="사용"
                                                control={
                                                    <Switch
                                                        color="default"
                                                        checked={value === 'Y'}
                                                        onChange={e => onChange(e.target.checked ? 'Y' : 'N')}
                                                    />
                                                }
                                            />
                                        );
                                    }}
                                />
                            </Stack>
                            {InputFieldSettings.map(fieldItem => {
                                return (
                                    <Stack key={fieldItem.id}>
                                        <Controller
                                            control={control}
                                            name={fieldItem.id}
                                            rules={fieldItem.rules}
                                            render={({
                                                field: { value, onChange, onBlur },
                                                fieldState: { error, isTouched },
                                            }) => {
                                                return (
                                                    <>
                                                        <FormControlLabel
                                                            required={!!fieldItem.rules?.required}
                                                            labelPlacement="start"
                                                            label={fieldItem.label}
                                                            onClick={e => {
                                                                e.preventDefault();
                                                            }}
                                                            control={
                                                                fieldItem.id === 'email' && selectedItem && !emailModify ? (
                                                                    <span className="text">{value}</span>
                                                                ) : (
                                                                    <InputBox
                                                                        value={[
                                                                            typeof value === 'boolean' ? '' : value || '',
                                                                            onChange,
                                                                        ]}
                                                                        onBlur={onBlur}
                                                                        size="small"
                                                                        errorMessage={
                                                                            isTouched && error?.message ? error?.message : ''
                                                                        }
                                                                    />
                                                                )
                                                            }
                                                        />
                                                        {fieldItem.id === 'email' &&
                                                            (selectedItem && !emailModify ? (
                                                                <Button
                                                                    variant="outlined"
                                                                    size="small"
                                                                    onClick={() => setEmailModify(true)}
                                                                >
                                                                    변경
                                                                </Button>
                                                            ) : (
                                                                <Button
                                                                    variant="outlined"
                                                                    size="small"
                                                                    color={getValues('emailChk') ? 'success' : 'primary'}
                                                                    onClick={() => handleDuplicate(error)}
                                                                    disabled={defaultValues.email === value}
                                                                >
                                                                    중복검사
                                                                </Button>
                                                            ))}
                                                    </>
                                                );
                                            }}
                                        />
                                    </Stack>
                                );
                            })}
                        </CuiAsideInputs>
                    </div>
                    <div className="btnArea">
                        <Button variant="contained" onClick={() => reset(defaultValues)}>
                            초기화
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            disabled={!isValid || !isDirty}
                            onClick={handleSubmit(onSubmit)}
                        >
                            저장
                        </Button>
                    </div>
                </div>
                <Loader open={postIsLoading || putIsLoading} />
            </AsideBox>
        </div>
    );
};

export { SaveEdit };
