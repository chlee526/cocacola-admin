import { memo } from 'react';

import { SelectBox, TreeViewDataModel } from '@chlee526/ui-kit-react';

import { OptionModel } from '@/entity/keyword';
import { Textarea } from '@/shared/ui';

import { KeywordSaveOption } from './KeywordSaveOption';
import { FilterKey } from '../config/config';
import { useKeywordCommon } from '../hook/useKeywordCommon';
import { SaveOptionFormValues } from '../model/model';

import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

interface SaveFormProps {
    categoryValue: string | number | null;
    categoryOptions: TreeViewDataModel[];
    inputData: { [key: string]: string };
    selectedCategory?: TreeViewDataModel;
    selectOption: { [key: string]: OptionModel | null };
    optionList: { [key: string]: OptionModel[] };
    isSelectBoxValid: boolean;
    setCategoryValue: (value: string | number | null) => void;
    handleInputChange: (keyType: string, value: string) => void;
    handleOptionClick: (option: OptionModel) => void;
    setAddOptionData: (data: SaveOptionFormValues | null) => void;
}

const SaveForm = memo(
    ({
        categoryValue,
        setCategoryValue,
        isSelectBoxValid,
        selectedCategory,
        categoryOptions,
        inputData,
        handleInputChange,
        setAddOptionData,
        optionList,
        selectOption,
        handleOptionClick,
    }: SaveFormProps) => {
        const { getFilterValue, HtmlTooltip } = useKeywordCommon();

        return (
            <>
                <div className="categorySelect">
                    <SelectBox
                        value={[categoryValue, setCategoryValue]}
                        label={isSelectBoxValid ? selectedCategory?.name : '카테고리를 선택하세요'}
                        size="small"
                        list={categoryOptions}
                        disabled={isSelectBoxValid}
                    />
                </div>

                {(['keyword', 'exclusion'] as const).map(keyType => (
                    <Box
                        key={keyType}
                        sx={keyType === 'keyword' ? { pb: 2 } : { p: 2, mb: 2, borderRadius: 1, background: '#f6f6f6' }}
                    >
                        {keyType === 'exclusion' && (
                            <Box sx={{ pb: 2 }}>
                                <span>제외 키워드</span>
                            </Box>
                        )}

                        <div className="inputArea">
                            <Textarea
                                id={keyType}
                                value={inputData[keyType]}
                                placeholder={`${keyType === 'keyword' ? '키워드' : '제외 키워드'} 입력`}
                                onChange={e => {
                                    const pattern = /['"]/g;
                                    const filtered = e.target.value.replace(pattern, '');
                                    handleInputChange(keyType, filtered);
                                }}
                            />
                        </div>

                        <Box sx={{ pb: 1, textAlign: 'right' }}>
                            <KeywordSaveOption keywordType={keyType === 'keyword' ? 1 : 2} setKeywordOption={setAddOptionData} />
                        </Box>

                        <div className="optionArea">
                            <div className="wrap">
                                <List className="list">
                                    {optionList[keyType]?.map(option => (
                                        <HtmlTooltip
                                            arrow
                                            key={option.seq}
                                            title={FilterKey.map(item => (
                                                <dl key={item.key} className="tooltipDl">
                                                    {(keyType === 'keyword' ||
                                                        (keyType === 'exclusion' && item.key !== 'sgSeqs')) && (
                                                        <>
                                                            <dt>{item.name} :</dt>
                                                            <dd>
                                                                {item.key === 'sgSeqs' && keyType === 'keyword'
                                                                    ? getFilterValue('sgSeqs', option)
                                                                    : getFilterValue(item.key, option)}
                                                            </dd>
                                                        </>
                                                    )}
                                                </dl>
                                            ))}
                                            placement="top-start"
                                            slotProps={{
                                                popper: {
                                                    modifiers: [
                                                        {
                                                            name: 'offset',
                                                            options: {
                                                                offset: [0, -10],
                                                            },
                                                        },
                                                    ],
                                                },
                                            }}
                                        >
                                            <ListItem
                                                className={`item ${selectOption[keyType]?.seq === option.seq && 'is-select'}`}
                                            >
                                                <ListItemButton onClick={() => handleOptionClick(option)}>
                                                    <ListItemText>{option.name}</ListItemText>
                                                </ListItemButton>
                                            </ListItem>
                                        </HtmlTooltip>
                                    ))}
                                </List>
                            </div>
                        </div>
                    </Box>
                ))}
            </>
        );
    },
);

SaveForm.displayName = 'SaveForm';
export { SaveForm };
