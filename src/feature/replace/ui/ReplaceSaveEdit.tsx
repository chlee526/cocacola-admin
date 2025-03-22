import { useEffect, useState } from 'react';

import { useMenuAuthContext } from '@chlee526/ui-kit-react';
import { Controller, useForm } from 'react-hook-form';

import {
    AddReplaceRequestModel,
    DeleteReplaceRequestModel,
    ReplaceBoardDataModel,
    UpdateReplaceRequestModel,
} from '@/entity/replace';
import { AsideBox, Textarea } from '@/shared/ui';

import { replaceSaveEditStyle } from './ReplaceSaveEdit.style';

import InfoIcon from '@mui/icons-material/Info';
import { Button, FormControlLabel, Switch } from '@mui/material';

interface OwnProps {
    addEvent: (param: AddReplaceRequestModel[]) => Promise<boolean>;
    updateEvent: (param: UpdateReplaceRequestModel[]) => Promise<boolean>;
    deleteEvent: (param: DeleteReplaceRequestModel) => Promise<boolean>;
    selectedItem: [ReplaceBoardDataModel, (editItem: ReplaceBoardDataModel) => void];
}

const UiHelpBox = () => (
    <div className="ui-help">
        <div className="wrap">
            <ul>
                <li className="title">
                    <InfoIcon className="icon" />
                    <strong>도움말</strong>
                </li>
                <li>
                    <span>
                        구문 입력만 가능합니다.
                        <br />
                        <em>찾을 키워드는 줄넘김으로 다중등록 가능합니다.</em>
                        <br />
                        <em>치환 키워드는 줄바꿈(개행)을 사용할 수 없습니다.</em>
                    </span>
                </li>
                <li>
                    <span>제목 + 내용 에서만 치환 됩니다.</span>
                </li>
                <li>
                    <span>
                        특수문자 입력 가능 합니다.
                        <br />
                        <em>&apos;(싱글 따옴표),&quot;(더블 따옴표) 입력 불가</em>
                    </span>
                </li>
            </ul>
        </div>
    </div>
);

const ReplaceSaveEdit = ({
    addEvent,
    updateEvent,
    deleteEvent,
    selectedItem: selected,
}: OwnProps) => {
    const [selectedItem, setSelectedItem] = selected;

    const methods = useMenuAuthContext();

    const [isUse, setIsUse] = useState(true);
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { isValid, isDirty },
    } = useForm({
        defaultValues: { find: '', replace: '' },
        mode: 'onChange',
    });

    const onSubmit = async (data: { find: string; replace: string }) => {
        const keywords = data.find.split('\n');

        const params = selectedItem
            ? {
                  seq: selectedItem?.seq,
                  findKeyword: data?.find,
                  replaceKeyword: data?.replace,
                  state: isUse ? 'Y' : 'N',
              }
            : keywords.map(word => ({
                  findKeyword: word,
                  replaceKeyword: data.replace,
                  state: isUse ? 'Y' : 'N',
              }));

        if (selectedItem) {
            updateEvent([params] as UpdateReplaceRequestModel[]);
        } else {
            const result = await addEvent(params as AddReplaceRequestModel[]);

            if (result) {
                reset();
            }
        }
    };

    const onDelete = async () => {
        if (selectedItem?.seq) {
            const param = { seq: [selectedItem?.seq] };

            const result = await deleteEvent(param);

            if (result) {
                setSelectedItem(null);
                reset();
            }
        }
    };

    const isFormValid = () => {
        const watchFind = watch('find');
        const watchReplace = watch('replace');
        const curState = isUse ? 'Y' : 'N';
        if (!selectedItem) return isValid && isDirty;
        return (
            curState !== selectedItem.state ||
            ((watchFind !== selectedItem.findKeyword ||
                watchReplace !== selectedItem.replaceKeyword) &&
                watchFind !== '' &&
                watchReplace !== '')
        );
    };

    const handleReset = () => {
        if (selectedItem) {
            setValue('find', selectedItem.findKeyword);
            setValue('replace', selectedItem.replaceKeyword);
        } else {
            reset();
        }
    };

    useEffect(() => {
        if (selectedItem) {
            setValue('find', selectedItem.findKeyword);
            setValue('replace', selectedItem.replaceKeyword);
            setIsUse(selectedItem.state === 'Y');
        } else {
            reset();
        }
    }, [selectedItem]);

    return (
        <div css={replaceSaveEditStyle}>
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
                <div className="contents">
                    <FormControlLabel
                        control={
                            <Switch checked={isUse} onChange={() => setIsUse(prev => !prev)} />
                        }
                        labelPlacement="start"
                        label="사용여부"
                    />

                    <div className="inputs">
                        {(['find', 'replace'] as const).map(fieldName => (
                            <div key={fieldName} className={fieldName}>
                                <Controller
                                    control={control}
                                    name={fieldName}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <Textarea
                                            id={fieldName}
                                            value={value}
                                            onChange={e => {
                                                const patten =
                                                    !selectedItem && fieldName === 'find'
                                                        ? /['"]/g
                                                        : /['"\n\r]/g;
                                                const filtered = e.target.value.replace(patten, '');
                                                onChange(filtered);
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        ))}
                    </div>

                    <UiHelpBox />

                    <div className="btnArea">
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

export { ReplaceSaveEdit };
