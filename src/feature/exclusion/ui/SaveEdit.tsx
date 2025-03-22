import { useCallback, useEffect, useMemo, useState } from 'react';

import { InputBox, useMenuAuthContext } from '@chlee526/ui-kit-react';
import { Controller, useForm } from 'react-hook-form';

import {
    AddExclusionRequestModel,
    DeleteExclusionRequestModel,
    ExclusionBoardDataModel,
    UpdateExclusionRequestModel,
    useAddExclusion,
} from '@/entity/exclusion';
import { WhiteButton } from '@/feature/replace/ui/ReplaceFunction.style';
import { EXCLUSION_FILTER_TYPE, EXCLUSION_OP } from '@/shared/config/common';
import { AsideBox, Textarea } from '@/shared/ui';

import { ExclusionSaveEditStyle } from './SaveEdit.style';

import InfoIcon from '@mui/icons-material/Info';
import {
    Button,
    FormControlLabel,
    FormLabel,
    styled,
    Switch,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    tooltipClasses,
    TooltipProps,
} from '@mui/material';

interface OwnProps {
    updateEvent: (param: UpdateExclusionRequestModel) => void;
    deleteEvent: (param: DeleteExclusionRequestModel) => void;
    selectedItem: [ExclusionBoardDataModel, (editItem: ExclusionBoardDataModel) => void];
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        fontSize: theme.typography.pxToRem(13),
        lineHeight: 1.3,
        fontWeight: 300,
        padding: '0.7rem',
    },
}));

const specialCheckTitle = (
    <span>
        키워드에 특수문자 포함 여부를 설정합니다. <br />
        특수문자 제거 시 모든 특수문자가 제한됩니다.
    </span>
);

const SaveEdit = ({ updateEvent, deleteEvent, selectedItem: ownSelectedItem }: OwnProps) => {
    const [isUse, setIsUse] = useState(true);
    const [selectedItem, setSelectedItem] = ownSelectedItem;

    const keys: Array<keyof typeof selectedItem> = useMemo(
        () =>
            ['exclusionKeyword', 'op', 'filterType', 'specialCheck'] as Array<
                keyof typeof selectedItem
            >,
        [],
    );

    const methods = useMenuAuthContext();

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { isValid, isDirty },
    } = useForm({
        defaultValues: {
            exclusionKeyword: '',
            op: {
                value: 1,
                leftLength: 15,
                rightLength: 15,
            },
            filterType: 1,
            specialCheck: 1,
        },
        mode: 'onChange',
    });

    const addMutation = useAddExclusion();
    const addEvent = async (param: AddExclusionRequestModel[]) => {
        try {
            await addMutation.mutateAsync(param);

            // 입력 초기화
            reset();
        } catch (ERROR) {
            console.error('add failed:', ERROR);
        }
    };

    const onSubmit = async ({
        exclusionKeyword,
        op,
        filterType,
        specialCheck,
    }: {
        exclusionKeyword: string;
        op: {
            value: number;
            leftLength: number;
            rightLength: number;
        };
        filterType: number;
        specialCheck: number;
    }) => {
        const keywords = exclusionKeyword.split('\n');

        const params = selectedItem
            ? {
                  seq: [selectedItem?.seq],
                  exclusionKeyword,
                  filterType,
                  specialCheck,
                  op: op.value,
                  leftLength: op.leftLength as number,
                  rightLength: op.rightLength as number,
                  state: isUse ? 'Y' : 'N',
              }
            : keywords.map(word => ({
                  exclusionKeyword: word,
                  filterType,
                  specialCheck,
                  op: op.value,
                  leftLength: op.leftLength,
                  rightLength: op.rightLength,
                  state: isUse ? 'Y' : 'N',
              }));

        if (selectedItem) {
            updateEvent(params as UpdateExclusionRequestModel);
        } else {
            addEvent(params as AddExclusionRequestModel[]);
        }
    };

    const onDelete = async () => {
        if (selectedItem?.seq) {
            const param = { seq: [selectedItem?.seq] };

            deleteEvent(param);
        }
    };

    const removeForbiddenChars = () => {
        const keyword = watch('exclusionKeyword');
        const specialCheck = watch('specialCheck');
        let cleanKeyword = keyword.replace(/['"`]|(\n)\n+/g, '');

        if (specialCheck === 2) {
            cleanKeyword = keyword.replace(/\n+(?=\n)|[^\uAC00-\uD7A3ㄱ-ㅎㅏ-ㅣ\w\s\n]/g, '');
        }

        setValue('exclusionKeyword', cleanKeyword);
    };

    const isFormValid = useCallback(() => {
        if (!selectedItem) return isValid && isDirty;

        const curState = isUse ? 'Y' : 'N';

        const isChanged = keys.some(key => {
            if (key === 'op') {
                return (
                    (selectedItem.op.value !== watch('op.value') ||
                        selectedItem.op.leftLength !== watch('op.leftLength') ||
                        selectedItem.op.rightLength !== watch('op.rightLength')) &&
                    Object.values(watch('op')).every(value => (value as number) > 0)
                );
            }

            return selectedItem[key] !== watch(key) && String(watch(key)).length;
        });

        return curState !== selectedItem.state || isChanged;
    }, [selectedItem, watch()]);

    const handleReset = () => {
        if (selectedItem) {
            keys.forEach(key => {
                setValue(key, selectedItem[key]);
            });
            setIsUse(selectedItem.state === 'Y');
        } else {
            reset();
            setIsUse(true);
        }
    };

    useEffect(() => {
        handleReset();
    }, [selectedItem]);

    return (
        <div>
            <AsideBox
                title={selectedItem ? '키워드 수정' : '키워드 등록'}
                headerButton={
                    selectedItem && methods && methods.includes('POST')
                        ? {
                              label: '키워드 등록',
                              onClick: () => {
                                  setSelectedItem(null);
                                  reset();
                              },
                          }
                        : null
                }
            >
                <div className="contents" css={ExclusionSaveEditStyle}>
                    <FormControlLabel
                        control={
                            <Switch checked={isUse} onChange={() => setIsUse(prev => !prev)} />
                        }
                        labelPlacement="start"
                        label="사용여부"
                    />

                    <div className="inputs">
                        <div>
                            <Controller
                                control={control}
                                name="exclusionKeyword"
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <Textarea
                                        id="exclusionKeyword"
                                        value={value}
                                        placeholder="키워드 입력"
                                        onChange={e => {
                                            const pattern = selectedItem
                                                ? /['"\n]/g
                                                : /\n+(?=\n)|['"]/g;

                                            onChange(e.target.value.replace(pattern, ''));

                                            removeForbiddenChars();
                                        }}
                                    />
                                )}
                            />
                        </div>

                        <div>
                            <Controller
                                control={control}
                                name="filterType"
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <ToggleButtonGroup
                                        id="filterType"
                                        value={value}
                                        exclusive
                                        onChange={(_, data) => {
                                            // eslint-disable-next-line no-extra-boolean-cast
                                            if (!!data) {
                                                // 선택 해제가 되지 않도록 방지
                                                onChange(data as number);
                                            }
                                        }}
                                    >
                                        {EXCLUSION_FILTER_TYPE.map(({ seq, name }) => {
                                            return (
                                                <ToggleButton
                                                    key={seq}
                                                    value={seq}
                                                    title={name}
                                                    sx={{ lineHeight: 1 }}
                                                    size="small"
                                                >
                                                    {name}
                                                </ToggleButton>
                                            );
                                        })}
                                    </ToggleButtonGroup>
                                )}
                            />
                        </div>
                        <div className="specialCheck-box">
                            <HtmlTooltip title={specialCheckTitle} placement="left" arrow>
                                <WhiteButton size="small">
                                    <InfoIcon fontSize="small" />
                                </WhiteButton>
                            </HtmlTooltip>
                            <Controller
                                control={control}
                                name="specialCheck"
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <>
                                        <FormLabel component="legend">특수문자</FormLabel>
                                        <ToggleButtonGroup
                                            id="specialCheck"
                                            value={value}
                                            exclusive
                                            onChange={(_, data) => {
                                                // 선택 해제가 되지 않도록 방지
                                                // eslint-disable-next-line no-extra-boolean-cast
                                                if (!!data) {
                                                    onChange(data as number);
                                                }
                                                removeForbiddenChars();
                                            }}
                                        >
                                            <ToggleButton
                                                value={1}
                                                title="특수문자 포함"
                                                sx={{ lineHeight: 1 }}
                                                size="small"
                                            >
                                                포함
                                            </ToggleButton>
                                            <ToggleButton
                                                value={2}
                                                title="특수문자 제거"
                                                sx={{ lineHeight: 1 }}
                                                size="small"
                                            >
                                                제거
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    </>
                                )}
                            />
                        </div>
                        <div id="op">
                            <Controller
                                control={control}
                                name="op"
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <>
                                        <ToggleButtonGroup
                                            id="op.value"
                                            value={value.value}
                                            exclusive
                                            onChange={(_, data) => {
                                                // eslint-disable-next-line no-extra-boolean-cast
                                                if (!!data) {
                                                    // 선택 해제가 되지 않도록 방지
                                                    onChange({
                                                        ...value,
                                                        value: data as number,
                                                    });
                                                }
                                            }}
                                        >
                                            {EXCLUSION_OP.map(({ seq, name }) => {
                                                return (
                                                    <ToggleButton
                                                        key={seq}
                                                        value={seq}
                                                        title={name}
                                                        sx={{ lineHeight: 1 }}
                                                        size="small"
                                                    >
                                                        {name}
                                                    </ToggleButton>
                                                );
                                            })}
                                        </ToggleButtonGroup>

                                        {value.value === 3 && (
                                            <div id="op-length">
                                                <InputBox
                                                    id="op.leftLength"
                                                    name="op.leftLength"
                                                    size="small"
                                                    sx={{ width: '50px' }}
                                                    type="number"
                                                    value={[
                                                        value.leftLength,
                                                        data => {
                                                            // eslint-disable-next-line no-extra-boolean-cast
                                                            if (!!data) {
                                                                // 선택 해제가 되지 않도록 방지
                                                                onChange({
                                                                    ...value,
                                                                    leftLength: Number(data),
                                                                });
                                                            }
                                                        },
                                                    ]}
                                                />

                                                <FormLabel component="legend">인접 길이</FormLabel>

                                                <InputBox
                                                    id="op.rightLength"
                                                    name="op.rightLength"
                                                    size="small"
                                                    sx={{ width: '50px' }}
                                                    type="number"
                                                    value={[
                                                        value.rightLength,
                                                        data => {
                                                            // eslint-disable-next-line no-extra-boolean-cast
                                                            if (!!data) {
                                                                // 선택 해제가 되지 않도록 방지

                                                                onChange({
                                                                    ...value,
                                                                    rightLength: Number(data),
                                                                });
                                                            }
                                                        },
                                                    ]}
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                    </div>

                    <div className="button-box">
                        {selectedItem &&
                            // 삭제 권한
                            methods &&
                            methods.includes('DELETE') && (
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="error"
                                    onClick={onDelete}
                                >
                                    삭제
                                </Button>
                            )}
                        <Button variant="contained" size="small" onClick={handleReset}>
                            초기화
                        </Button>
                        {methods &&
                            (methods.includes('POST') ||
                                (selectedItem && methods.includes('PUT'))) && (
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="success"
                                    disabled={!isFormValid()}
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    저장
                                </Button>
                            )}
                    </div>
                </div>
            </AsideBox>
        </div>
    );
};

export { SaveEdit };
