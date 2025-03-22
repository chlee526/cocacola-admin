import { useCallback, useEffect, useMemo, useState } from 'react';

import { InputBox } from '@chlee526/ui-kit-react';
import { Controller, useForm } from 'react-hook-form';

import { WhiteButton } from '@/feature/replace/ui/ReplaceFunction.style';
import { COMMON_CHANNEL, EXCLUSION_FILTER_TYPE, EXCLUSION_OP } from '@/shared/config/common';

import { KeywordSaveOptionStyle } from './KeywordSaveOption.style';
import { SaveOptionFormValues } from '../model/model';

import InfoIcon from '@mui/icons-material/Info';
import {
    Button,
    FormLabel,
    Popover,
    styled,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    tooltipClasses,
    TooltipProps,
} from '@mui/material';

interface OwnProps {
    keywordType: number;
    setKeywordOption: (params: SaveOptionFormValues) => void;
}
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)(
    ({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            fontSize: theme.typography.pxToRem(13),
            lineHeight: 1.3,
            fontWeight: 300,
            padding: '0.7rem',
        },
    }),
);

const specialCheckTitle = (
    <span>
        키워드에 특수문자 포함 여부를 설정합니다. <br />
        특수문자 제거 시 모든 특수문자가 제한됩니다.
    </span>
);

const KeywordSaveOption = ({ keywordType, setKeywordOption }: OwnProps) => {
    const [anchorElement, setanchorElement] = useState<HTMLButtonElement | null>(null);
    const isOpen = useMemo(() => Boolean(anchorElement), [anchorElement]);

    const defaultValues = useMemo(() => {
        const result =
            keywordType === 1
                ? {
                      optionName: '',
                      specialCheck: 1,
                      op: {
                          value: 1,
                          leftLength: 15,
                          rightLength: 15,
                      },
                      filterType: 1,
                      sgSeqs: [],
                  }
                : {
                      optionName: '',
                      specialCheck: 1,
                      op: {
                          value: 1,
                          leftLength: 15,
                          rightLength: 15,
                      },
                      filterType: 1,
                  };

        return result;
    }, [keywordType]);

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<SaveOptionFormValues>({ defaultValues });

    const togglePopover = useCallback((element: HTMLButtonElement | null) => {
        setanchorElement(element);
    }, []);

    const handleReset = () => {
        reset();
    };

    const isFormValid = useCallback(() => {
        return String(watch('sgSeqs')).length && String(watch('optionName')).length;
    }, [watch()]);

    const onAdd = async ({ optionName, specialCheck, op, filterType, sgSeqs }: SaveOptionFormValues) => {
        if (keywordType === 1) {
            setKeywordOption({ keywordType, optionName, specialCheck, op, filterType, sgSeqs });
        } else {
            setKeywordOption({ keywordType, optionName, specialCheck, op, filterType });
        }

        togglePopover(null);
    };

    useEffect(() => {
        setTimeout(() => {
            reset();
        }, 200);
    }, [anchorElement]);

    return (
        <>
            <Button variant="contained" size="small" color="white" onClick={event => togglePopover(event.currentTarget)}>
                옵션 추가
            </Button>
            <Popover
                id="settingButton"
                anchorEl={anchorElement}
                open={isOpen}
                onClose={() => togglePopover(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                slotProps={{
                    paper: {
                        sx: {
                            mt: '3px',
                        },
                    },
                }}
            >
                <div className="ui-box" css={KeywordSaveOptionStyle}>
                    <div className="header">
                        <h3>{keywordType === 1 ? '키워드' : '제외 키워드'} 옵션 등록</h3>
                    </div>
                    <hr />
                    <div className="contents">
                        <div className="inputs">
                            <div>
                                <Controller
                                    control={control}
                                    name="optionName"
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <InputBox
                                            id="optionName"
                                            size="small"
                                            value={[value, onChange]}
                                            placeholder="옵션명을 입력하세요"
                                            autoComplete="off"
                                            sx={{ width: '100%' }}
                                        />
                                    )}
                                />
                            </div>
                            {keywordType === 1 && (
                                <div>
                                    <Controller
                                        control={control}
                                        name="sgSeqs"
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { value, onChange } }) => (
                                            <ToggleButtonGroup
                                                id="sgSeqs"
                                                value={value}
                                                exclusive
                                                onChange={(_, item) => {
                                                    // eslint-disable-next-line no-extra-boolean-cast
                                                    if (!!item && typeof value === 'object') {
                                                        if (value.includes(item as number)) {
                                                            onChange(value.filter(i => i !== item));
                                                        } else {
                                                            onChange([...value, item]);
                                                        }
                                                    }
                                                }}
                                            >
                                                {COMMON_CHANNEL.map(({ seq, cmmName }) => {
                                                    return (
                                                        <ToggleButton
                                                            key={seq}
                                                            value={seq}
                                                            title={cmmName}
                                                            sx={{ lineHeight: 1 }}
                                                            size="small"
                                                        >
                                                            {cmmName}
                                                        </ToggleButton>
                                                    );
                                                })}
                                            </ToggleButtonGroup>
                                        )}
                                    />

                                    {errors.sgSeqs && <div>{errors.sgSeqs.message}</div>}
                                </div>
                            )}
                            <div>
                                <Controller
                                    control={control}
                                    name="filterType"
                                    render={({ field: { value, onChange } }) => (
                                        <ToggleButtonGroup
                                            id="filterType"
                                            value={value}
                                            exclusive
                                            onChange={(_, item) => {
                                                // eslint-disable-next-line no-extra-boolean-cast
                                                if (!!item) {
                                                    // 선택 해제가 되지 않도록 방지
                                                    onChange(item as number);
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
                                                }}
                                            >
                                                <ToggleButton value={1} title="특수문자 포함" sx={{ lineHeight: 1 }} size="small">
                                                    포함
                                                </ToggleButton>
                                                <ToggleButton value={2} title="특수문자 제거" sx={{ lineHeight: 1 }} size="small">
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
                            <Button variant="contained" size="small" onClick={handleReset}>
                                초기화
                            </Button>

                            <Button
                                variant="contained"
                                size="small"
                                color="success"
                                disabled={!isFormValid()}
                                onClick={handleSubmit(onAdd)}
                            >
                                저장
                            </Button>
                        </div>
                    </div>
                </div>
            </Popover>
        </>
    );
};

export { KeywordSaveOption };
