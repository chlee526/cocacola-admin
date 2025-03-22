import { memo } from 'react';

import { AsideBox, TreeViewDataModel, useMenuAuthContext } from '@chlee526/ui-kit-react';

import { EditForm } from '@/feature/keyword/ui/EditForm';

import { KeywordSaveEditStyle } from './SaveEdit.style';
import { SaveForm } from './SaveForm';
import { useEditHandler } from '../hook/useEditHandler';
import { useSaveHandler } from '../hook/useSaveHandler';

import { Button, FormControlLabel, Switch } from '@mui/material';

const SaveEdit = memo(() => {
    const methods = useMenuAuthContext();

    // 커스텀 훅
    const {
        isUse,
        inputData,
        categoryValue,
        categoryOptions,
        optionList,
        selectOption,
        selectedKeyword,
        selectedCategory,
        isSelectBoxValid,
        isSubmitValid,
        setIsUse,
        setCategoryValue,
        handleInputChange,
        handleOptionClick,
        handleSubmit,
        resetForm,
        setAddOptionData,
    } = useSaveHandler();

    const { handleKeywordState, handleDeleteKeyword, setSelectedKeyword } = useEditHandler();

    return (
        <div>
            <AsideBox
                title={selectedKeyword ? '키워드 수정' : '키워드 등록'}
                headerButton={
                    selectedKeyword
                        ? {
                              label: '키워드 등록',
                              onClick: () => {
                                  setSelectedKeyword(null);
                              },
                          }
                        : null
                }
            >
                <div className="contents" css={KeywordSaveEditStyle()}>
                    <FormControlLabel
                        control={
                            <Switch
                                id={selectedKeyword ? String(selectedKeyword.seq) : ''}
                                checked={selectedKeyword ? selectedKeyword.state === 'Y' : isUse}
                                color="default"
                                onChange={e => {
                                    if (selectedKeyword) {
                                        const param = {
                                            seq: [Number(e.currentTarget?.id)],
                                            state: e.currentTarget?.checked ? 'Y' : 'N',
                                        };
                                        handleKeywordState(param);
                                    } else {
                                        setIsUse(prev => !prev);
                                    }
                                }}
                            />
                        }
                        labelPlacement="start"
                        label="사용여부"
                    />

                    {!selectedKeyword ? (
                        <SaveForm
                            categoryValue={categoryValue}
                            setCategoryValue={setCategoryValue}
                            isSelectBoxValid={isSelectBoxValid}
                            selectedCategory={selectedCategory as TreeViewDataModel}
                            categoryOptions={categoryOptions}
                            inputData={inputData}
                            handleInputChange={handleInputChange}
                            setAddOptionData={setAddOptionData}
                            optionList={optionList}
                            selectOption={selectOption}
                            handleOptionClick={handleOptionClick}
                        />
                    ) : (
                        <EditForm optionList={optionList.exclusion} />
                    )}

                    <div className="btnArea">
                        {selectedKeyword &&
                            // 삭제 권한
                            methods &&
                            methods.includes('DELETE') && (
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="error"
                                    onClick={() => handleDeleteKeyword(Number(selectedKeyword.seq))}
                                >
                                    삭제
                                </Button>
                            )}

                        {!selectedKeyword && (
                            <>
                                <Button variant="contained" size="small" onClick={resetForm}>
                                    초기화
                                </Button>
                                {methods && (methods.includes('POST') || (selectedKeyword && methods.includes('PUT'))) && (
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="success"
                                        disabled={!!isSubmitValid}
                                        onClick={handleSubmit}
                                    >
                                        저장
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </AsideBox>
        </div>
    );
});
SaveEdit.displayName = 'SaveEdit';

export { SaveEdit };
