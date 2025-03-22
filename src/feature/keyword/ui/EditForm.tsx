import { memo } from 'react';

import { KeywordModel, OptionModel } from '@/entity/keyword';
import { FilterKey, useEditHandler } from '@/feature/keyword';
import { Textarea } from '@/shared/ui';

import { KeywordSaveOption } from './KeywordSaveOption';
import { EditFormStyle } from './SaveEdit.style';
import { useKeywordCommon } from '../hook/useKeywordCommon';

import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, List, ListItem, ListItemButton, ListItemText, Switch } from '@mui/material';

interface OwnProps {
    optionList: OptionModel[];
}

const EditForm = memo(({ optionList }: OwnProps) => {
    // 커스텀 훅
    const {
        inputData,
        selectOption,
        categoryNames,
        selectedKeyword,
        handleInputChange,
        handleKeywordState,
        handleAddExKeyword,
        handleDeleteKeyword,
        handleSelectOption,
        isAddExKeywordValid,
        setAddOptionData,
    } = useEditHandler(true);

    const { HtmlTooltip, getFilterValue, getFilterValueIcon } = useKeywordCommon();

    return (
        <div css={EditFormStyle()}>
            <div className="keywordInfo">
                <div className="keyword">
                    <span>{categoryNames}</span>
                    <strong>{selectedKeyword?.keyword}</strong>
                </div>
                <ul className="filters">
                    {FilterKey.map(filter => (
                        <li className="filter" key={filter.key}>
                            <strong>{filter.name}</strong>
                            <span>{getFilterValue(filter.key, selectedKeyword)}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="exKeywordArea">
                <div className="label">
                    <span>제외 키워드</span>
                </div>

                <div className="exKeywordWrap">
                    <ul className="exKeywordList">
                        {selectedKeyword?.children &&
                            selectedKeyword.children.map((item: KeywordModel) => (
                                <li key={item?.seq} className="exKeywordItem">
                                    <div className="lc">
                                        <Switch
                                            id={String(item?.seq)}
                                            size="small"
                                            color="default"
                                            checked={item?.state === 'Y'}
                                            onChange={e => {
                                                const param = {
                                                    seq: [Number(e.currentTarget?.id)],
                                                    state: e.currentTarget?.checked ? 'Y' : 'N',
                                                };

                                                handleKeywordState(param);
                                            }}
                                        />
                                        <span>{item?.keyword}</span>
                                    </div>
                                    <div className="rc">
                                        <div className="filters">
                                            {['specialCheck', 'filterType', 'opSeq'].map(
                                                key =>
                                                    getFilterValueIcon(key as 'specialCheck' | 'filterType' | 'opSeq', item) && (
                                                        <span key={key}>
                                                            {getFilterValueIcon(
                                                                key as 'specialCheck' | 'filterType' | 'opSeq',
                                                                item,
                                                            )}
                                                        </span>
                                                    ),
                                            )}
                                        </div>
                                        <IconButton size="small" onClick={() => handleDeleteKeyword(Number(item?.seq))}>
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>

                <div className="addExKeywordWrap">
                    <div className="inputArea">
                        <Textarea
                            id="addExKeyword"
                            value={inputData}
                            placeholder="제외 키워드 입력"
                            onChange={handleInputChange}
                        />
                    </div>
                    <Box sx={{ pb: 1, textAlign: 'right' }}>
                        <KeywordSaveOption keywordType={2} setKeywordOption={setAddOptionData} />
                    </Box>
                    <div className="optionArea">
                        <div className="wrap">
                            <List className="list">
                                {optionList?.map(option => (
                                    <HtmlTooltip
                                        arrow
                                        key={option.seq}
                                        title={FilterKey.map(item => (
                                            <dl key={item.key} className="tooltipDl">
                                                {item.key !== 'sgSeqs' && (
                                                    <>
                                                        <dt>{item.name} :</dt>
                                                        <dd> {getFilterValue(item.key, option)}</dd>
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
                                            key={option.seq}
                                            className={`item ${selectOption?.seq === option.seq && 'is-select'}`}
                                        >
                                            <ListItemButton onClick={() => handleSelectOption(option)}>
                                                <ListItemText>{option.name}</ListItemText>
                                            </ListItemButton>
                                        </ListItem>
                                    </HtmlTooltip>
                                ))}
                            </List>
                        </div>
                    </div>
                    <div className="addExKeywordBtn">
                        <Button variant="contained" size="small" disabled={isAddExKeywordValid} onClick={handleAddExKeyword}>
                            제외 키워드 추가
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
});

EditForm.displayName = 'EditForm';

export { EditForm };
