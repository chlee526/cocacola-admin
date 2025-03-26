import { useEffect, useMemo } from 'react';

import { AsideBox, InputBox } from '@chlee526/ui-kit-react';
import { useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';

import {
    AuthBoardDataModel,
    useGetAuthMutation,
    usePostAuthMutation,
    usePutAuthMutation,
    PostAuthRequestMseqModel,
    PutAuthRequestModel,
} from '@/entity/auth';
import { allMenuStore } from '@/entity/menu/store/menu';
import { useAlert } from '@/shared/store';
import { transAuthToLevel } from '@/shared/util';

import { AuthMngr } from './AuthMngr';
import { Styles } from './SaveEdit.style';
import { getMenuAuthAllEnabled, transformAuthLevels } from '../util/util';

import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';

interface OwnProps {
    selectedItem: [AuthBoardDataModel, React.Dispatch<React.SetStateAction<AuthBoardDataModel>>];
    updateEvent: (param: PutAuthRequestModel[]) => void;
}

interface FormValues {
    authName: string;
    authMenuList: PostAuthRequestMseqModel[];
}

interface SelectedAuthModel {
    menuDto: {
        child: [{ menuDto: { menuSeq: number }; methods: string[] }];
    };
}

const getAuthMenuList = (selData: AuthBoardDataModel) => {
    return (
        (selData &&
            (selData.menuAuthList as SelectedAuthModel[])
                .map((menuAuthList) => {
                    return menuAuthList.menuDto?.child.map((item) => ({
                        menuSeq: item?.menuDto?.menuSeq,
                        level: transAuthToLevel(item.methods),
                    }));
                })
                .flat()) ||
        []
    );
};

const SaveEdit = ({ selectedItem: ownPropsSelectedItem }: OwnProps) => {
    const { showAlert } = useAlert();

    // 전체 메뉴 목록
    const { allMenuList } = allMenuStore();

    // 선택 아이템
    const [selectedItem, setSelectedItem] = ownPropsSelectedItem;
    const { mutate, data: selData } = useGetAuthMutation();

    // 폼 초기값
    const defaultValues = useMemo(() => {
        if (selectedItem && selData) {
            return {
                authName: selData.authName,
                authMenuList: getAuthMenuList(selData),
            };
        }
        return {
            authName: '',
            authMenuList: [] as PostAuthRequestMseqModel[],
        };
    }, [selectedItem, selData]);

    // 폼
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { isValid, isDirty },
    } = useForm<FormValues>({
        mode: 'onChange',
        defaultValues,
        shouldFocusError: false,
    });

    // 선택 아이템이 변경될 때
    useEffect(() => {
        if (selectedItem) {
            // 선택된 아이템이 있는 경우 API 호출
            // mutate(selectedItem.seq);
            mutate();
        } else {
            // 없는 경우 reset
            reset(defaultValues);
        }
    }, [selectedItem]);
    useEffect(() => {
        if (selData) {
            // 선택한 아이템의 데이터를 가져온후 폼 데이터에 할당
            setValue('authName', selData.authName);
            setValue('authMenuList', getAuthMenuList(selData));
        }
    }, [selData]);

    // 1뎁스에서 권한 할당
    const handleAuthAll = () => {
        const dp1Auths = getMenuAuthAllEnabled({ level: 3, list: allMenuList });
        setValue('authMenuList', transformAuthLevels(dp1Auths));
    };

    // 폼 Submit
    const queryClient = useQueryClient();
    const { mutateAsync: postMutate } = usePostAuthMutation();
    const { mutateAsync: putMutate } = usePutAuthMutation();
    const onSubmit = async (data: FormValues) => {
        if (!selectedItem) {
            // 추가
            try {
                await postMutate(data);
                queryClient.invalidateQueries({ queryKey: ['AUTH_LIST'] });
                reset(defaultValues);
                showAlert(`권한이 등록 되었습니다.`, 'success');
            } catch (error) {
                console.log(error);
            }
        } else {
            // 수정
            try {
                await putMutate({ authSeq: selectedItem.seq, authState: 'Y', ...data });
                queryClient.invalidateQueries({ queryKey: ['AUTH_LIST'] });
                showAlert(`권한이 수정 되었습니다.`, 'success');
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <AsideBox
            title={selectedItem ? '권한 수정' : '권한 등록'}
            headerButton={
                selectedItem
                    ? {
                          label: '권한 등록',
                          onClick: () => {
                              setSelectedItem(null);
                          },
                      }
                    : null
            }
        >
            <Grid container sx={{ width: '100%' }} component="form" css={Styles}>
                <Grid size={24} sx={{ width: '100%' }}>
                    <Box sx={{ py: 2 }}>
                        <Controller
                            control={control}
                            name="authName"
                            rules={{
                                required: '필수값입니다.',
                                minLength: {
                                    value: 2,
                                    message: '최소 2글자 이상 입력해주세요.',
                                },
                            }}
                            render={({ field: { value, onChange, onBlur }, fieldState: { error, isTouched } }) => {
                                return (
                                    <InputBox
                                        value={[value, onChange]}
                                        label="권한명"
                                        sx={{ width: '100%' }}
                                        onBlur={onBlur}
                                        errorMessage={isTouched && error?.message ? error?.message : ''}
                                    />
                                );
                            }}
                        />
                    </Box>
                    <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#f6f6f6' }}>
                        <Box sx={{ pb: 1 }}>
                            <Button variant="contained" color="white" onClick={handleAuthAll}>
                                전체 권한 허용
                            </Button>
                        </Box>
                        <Box sx={{ pb: 1 }} className="authMngr">
                            <Controller
                                control={control}
                                name="authMenuList"
                                render={({ field: { value, onChange } }) => <AuthMngr value={[value, onChange]} />}
                            />
                        </Box>
                    </Box>
                </Grid>

                <div className="btnArea">
                    <Button variant="contained" size="small" onClick={() => reset(defaultValues)}>
                        초기화
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        color="success"
                        disabled={!isValid && !isDirty}
                        onClick={handleSubmit(onSubmit)}
                    >
                        저장
                    </Button>
                </div>
            </Grid>
        </AsideBox>
    );
};

export { SaveEdit };

// import { SelectBox } from '@chlee526/ui-kit-react';
// import { Controller, useForm } from 'react-hook-form';

// import { useAuthStore } from '@/entity/auth';
// import { MembersModel, useDuplicateId, useJoinMember, useUpdateMember } from '@/entity/member';
// import { AsideBox } from '@/shared/ui';

// import { InputField } from './InputField';
// import { saveEditStyle } from './SaveEdit.style';
// import { FormValues, InputFieldModel, InputFieldType, SaveEditPropsModel } from '../model/model';

// import { Button, FormControlLabel, Switch } from '@mui/material';

// const inputFieldState: InputFieldModel[] = [
//     { field: 'authSeq', label: '권한명', require: true, type: 'select' },
//     { field: 'id', label: '아이디', require: true },
//     { field: 'pw', label: '비밀번호', require: true, type: 'password' },
//     { field: 'name', label: '이름', require: true },
//     { field: 'position', label: '직급', require: false },
//     { field: 'dept', label: '부서', require: true },
//     { field: 'phone', label: '연락처', require: false },
//     { field: 'email', label: 'E-Mail', require: false },
//     { field: 'state', label: '사용여부', require: false },
// ] as const;

// const SaveEdit = ({ selectedItem, setSelectedItem }: SaveEditPropsModel) => {
//     const [duplicateChk, setDuplicateChk] = useState(false); // 중복 체크 여부
//     const { getAuthList } = useAuthStore(); // 권한 목록

//     // 리액트 훅 폼 관련 설정
//     const defaultValues = inputFieldState.reduce(
//         (acc, input) => ({
//             ...acc,
//             [input.field]: '',
//         }),
//         {},
//     );
//     const {
//         control,
//         handleSubmit,
//         reset,
//         setValue,
//         watch,
//         trigger,
//         formState: { isValid, isDirty },
//     } = useForm<FormValues>({
//         mode: 'onChange',
//         defaultValues,
//         shouldFocusError: false,
//     });

//     // 리액트 쿼리 관련
//     const joinMemberMutation = useJoinMember(); // 사용자 가입
//     const updateMemberMutation = useUpdateMember(); // 사용자 업데이트
//     const duplicateIdQuery = useDuplicateId({ memberId: watch('id') }); // 아이디 중복 체크

//     // 저장 버튼 유효성 체크
//     const isFormValid = useCallback(() => {
//         if (selectedItem) {
//             // 선택된 아이템이 있는 경우
//             const isChanged = inputFieldState
//                 .map(input => {
//                     const currentValue = watch(input.field);
//                     const originalValue = selectedItem[input.field];
//                     if (input.field === 'pw') {
//                         return currentValue.trim().length >= 4 && isValid && isDirty;
//                     }

//                     return String(currentValue) !== String(originalValue || '');
//                 })
//                 .some(value => value === true);
//             return isChanged && isValid;
//         }

//         return duplicateChk && isValid && isDirty;
//     }, [duplicateChk, watch, selectedItem, isValid, isDirty, trigger]);

//     // 초기화 버튼 핸들러
//     const handleResetForm = () => {
//         if (selectedItem) {
//             setValue('authSeq', String(selectedItem?.authSeq));
//             (Object.keys(selectedItem) as Array<keyof MembersModel>).forEach(key => {
//                 if (key in defaultValues) {
//                     setValue(
//                         key as InputFieldType,
//                         !selectedItem[key] || key === 'pw' ? '' : String(selectedItem[key]),
//                     );
//                 }
//             });
//         } else {
//             reset(defaultValues);
//         }
//     };

//     // 저장 버튼 핸들러
//     const onSubmit = (data: FormValues) => {
//         if (!selectedItem) {
//             // 가입
//             const param = { ...data, authSeq: Number(data.authSeq) };
//             joinMemberMutation.mutateAsync(param).then(() => reset(defaultValues));
//         } else {
//             // 수정
//             const param = {
//                 ...data,
//                 seq: selectedItem.seq,
//                 authSeq: Number(data.authSeq),
//             };
//             updateMemberMutation.mutateAsync([param]).then(() => setSelectedItem(null));
//         }
//     };

//     // 선택 아이템 유무에 따른 Form 기본 값 업데이트
//     useEffect(() => {
//         if (selectedItem) {
//             setValue('authSeq', String(selectedItem?.authSeq));
//             (Object.keys(selectedItem) as Array<keyof MembersModel>).forEach(key => {
//                 if (key in defaultValues) {
//                     setValue(
//                         key as InputFieldType,
//                         !selectedItem[key] || key === 'pw' ? '' : String(selectedItem[key]),
//                     );
//                 }
//             });
//         } else {
//             reset(defaultValues);
//         }
//     }, [selectedItem]);

//     return (
//         <div css={saveEditStyle}>
//             <AsideBox
//                 title={selectedItem ? '사용자 수정' : '사용자 등록'}
//                 headerButton={
//                     selectedItem
//                         ? {
//                               label: '사용자 등록',
//                               onClick: () => {
//                                   setSelectedItem(null);
//                               },
//                           }
//                         : null
//                 }
//             >
//                 <div className="contents">
//                     <div className="inputs">
//                         {inputFieldState.map(input => (
//                             <div key={input.field} className={`${input.field}`}>
//                                 {/* 권한명 */}
//                                 {input.field === 'authSeq' && (
//                                     <Controller
//                                         control={control}
//                                         name={input.field}
//                                         rules={{ required: !selectedItem }}
//                                         render={({ field: { value, onChange } }) => (
//                                             <FormControlLabel
//                                                 labelPlacement="start"
//                                                 label={input.label}
//                                                 control={
//                                                     <div className="selectBoxWrap">
//                                                         <SelectBox
//                                                             size="small"
//                                                             value={[value, onChange]}
//                                                             list={getAuthList()}
//                                                         />
//                                                     </div>
//                                                 }
//                                             />
//                                         )}
//                                     />
//                                 )}

//                                 {/* 인풋필드 */}
//                                 {input.field !== 'state' && input.field !== 'authSeq' && (
//                                     <InputField
//                                         input={input}
//                                         control={control}
//                                         watch={watch}
//                                         selectedItem={selectedItem}
//                                         duplicateChk={duplicateChk}
//                                         setDuplicateChk={setDuplicateChk}
//                                         duplicateIdQuery={duplicateIdQuery}
//                                     />
//                                 )}

//                                 {/* 사용여부 */}
//                                 {input.field === 'state' && selectedItem && (
//                                     <Controller
//                                         control={control}
//                                         name={input.field}
//                                         render={({ field: { value } }) => (
//                                             <FormControlLabel
//                                                 className="switchLabel"
//                                                 labelPlacement="start"
//                                                 label={input.label}
//                                                 control={
//                                                     <div className="switchWrap">
//                                                         <Switch
//                                                             size="small"
//                                                             color="default"
//                                                             checked={value === 'Y'}
//                                                             onChange={(
//                                                                 e: React.ChangeEvent<HTMLInputElement>,
//                                                             ) => {
//                                                                 setValue(
//                                                                     'state',
//                                                                     e.target.checked ? 'Y' : 'N',
//                                                                 );
//                                                                 trigger();
//                                                             }}
//                                                         />
//                                                     </div>
//                                                 }
//                                             />
//                                         )}
//                                     />
//                                 )}
//                             </div>
//                         ))}
//                     </div>

//                     <div className="btnArea">
//                         <Button variant="contained" size="small" onClick={handleResetForm}>
//                             초기화
//                         </Button>
//                         <Button
//                             variant="contained"
//                             size="small"
//                             color="success"
//                             disabled={!isFormValid()}
//                             onClick={handleSubmit(onSubmit)}
//                         >
//                             저장
//                         </Button>
//                     </div>
//                 </div>
//             </AsideBox>
//         </div>
//     );
// };

// export { SaveEdit };
