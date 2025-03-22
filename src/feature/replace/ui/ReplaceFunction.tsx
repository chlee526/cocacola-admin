import { useCallback, useMemo, useState } from 'react';

import { useMenuAuthContext } from '@chlee526/ui-kit-react';

import { DeleteReplaceRequestModel, UpdateReplaceRequestModel } from '@/entity/replace';

import { functionStyle, WhiteButton } from './ReplaceFunction.style';
import { BoardFunctionProps } from '../model/replaceBoardModel';

import SearchIcon from '@mui/icons-material/Search';
import {
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    MenuItem,
    Popover,
    Select,
    SelectChangeEvent,
    Stack,
} from '@mui/material';

const ReplaceFunction = ({
    updateEvent,
    deleteEvent,
    setSelectedItem,
    checkedItems: check,
    openAside,
    searchParameter: search,
}: BoardFunctionProps) => {
    const [checkedItems, setCheckedItems] = check;
    const [searchParameter, setSearchParameter] = search;

    // 권한
    const methods = useMenuAuthContext();

    const [boardOptions, setBoardOptions] = useState({
        inputSearchType: searchParameter.searchType,
        inputSearchKeyword: searchParameter.searchKeyword,
    });

    // 일괄설정 popover관련
    const [anchorElement, setanchorElement] = useState<HTMLButtonElement | null>(null);
    const isPopoverOpen = useMemo(() => Boolean(anchorElement), [anchorElement]);

    const searchOptions = useMemo(
        () => [
            {
                code: 1,
                name: '키워드',
            },
            {
                code: 2,
                name: '최종 수정자',
            },
        ],
        [],
    );

    const togglePopover = (element: HTMLButtonElement | null) => {
        setanchorElement(element);
    };

    // 검색 트리거
    const handleSearchParameter = () => {
        setSearchParameter({
            ...searchParameter,
            searchType: Number(boardOptions.inputSearchType),
            searchKeyword: boardOptions.inputSearchKeyword,
        });
    };

    /**
     * 키워드 등록 버튼 클릭
     */
    const handleAside = () => {
        openAside();
        setSelectedItem(null);
    };

    const handleChange = (event: SelectChangeEvent | React.ChangeEvent) => {
        const { value, name } = event.target as HTMLInputElement;

        setBoardOptions(state => ({
            ...state,
            [name]: name === 'inputSearchType' ? Number(value) : value,
        }));
    };

    const successProcess = useCallback(() => {
        togglePopover(null);
        setCheckedItems([]);
    }, []);

    const handleMultiDelete = async () => {
        const params = { seq: checkedItems };

        const result = await deleteEvent(params as DeleteReplaceRequestModel);

        if (result) {
            successProcess();
        }
    };

    const handleMultiState = async (state: 'Y' | 'N') => {
        const params = checkedItems.map(item => {
            return {
                seq: item,
                state,
            };
        });

        const result = await updateEvent(params as UpdateReplaceRequestModel[]);

        if (result) {
            successProcess();
        }
    };

    const popoverList = () => {
        const list = [];

        if (methods) {
            if (methods.includes('PUT')) {
                list.push(
                    {
                        primary: '사용',
                        click: () => handleMultiState('Y'),
                    },
                    {
                        primary: '정지',
                        click: () => handleMultiState('N'),
                    },
                );
            }

            if (methods.includes('DELETE')) {
                list.push({
                    primary: '삭제',
                    click: () => handleMultiDelete(),
                });
            }
        }

        return list;
    };

    return (
        <Stack direction="row" justifyContent="space-between" css={functionStyle}>
            <Stack direction="row" gap={1}>
                {methods && methods.includes('POST') && (
                    <WhiteButton variant="contained" size="small" onClick={handleAside}>
                        키워드 등록
                    </WhiteButton>
                )}
                {methods && (methods.includes('DELETE') || methods.includes('PUT')) && (
                    <WhiteButton
                        aria-describedby="settingButton"
                        variant="contained"
                        size="small"
                        disabled={checkedItems.length < 1}
                        onClick={event => togglePopover(event.currentTarget)}
                    >
                        일괄설정 ({checkedItems.length}개)
                    </WhiteButton>
                )}
            </Stack>
            <Popover
                id="settingButton"
                anchorEl={anchorElement}
                open={isPopoverOpen}
                onClose={() => togglePopover(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <List sx={{ p: 0, width: '67px' }}>
                    {popoverList().map(item => {
                        return (
                            <ListItem key={item.primary} disablePadding onClick={item.click}>
                                <ListItemButton sx={{ p: 1 }}>
                                    <ListItemText
                                        primary={item.primary}
                                        sx={{ textAlign: 'center' }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Popover>

            <Stack direction="row" className="search-box">
                {searchOptions && (
                    <Select
                        className="select-box"
                        name="inputSearchType"
                        value={String(boardOptions.inputSearchType)}
                        displayEmpty
                        onChange={handleChange}
                    >
                        {searchOptions?.map(item => {
                            return (
                                <MenuItem
                                    key={item.code}
                                    value={item.code}
                                    style={{ fontSize: '13px' }}
                                >
                                    {item.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                )}
                <div className="input-box">
                    <InputBase
                        type="text"
                        name="inputSearchKeyword"
                        value={boardOptions.inputSearchKeyword}
                        placeholder="검색어를 입력하세요."
                        size="small"
                        onChange={handleChange}
                        onKeyDown={({ key }) => {
                            if (key === 'Enter') handleSearchParameter();
                        }}
                    />
                    <IconButton type="button" aria-label="search" onClick={handleSearchParameter}>
                        <SearchIcon />
                    </IconButton>
                </div>
            </Stack>
        </Stack>
    );
};

export { ReplaceFunction };
