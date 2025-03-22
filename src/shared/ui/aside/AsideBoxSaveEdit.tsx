import { useState } from 'react';

import { useMenuAuthContext } from '@chlee526/ui-kit-react';

import { AsideBox } from './AsideBox';
import { AsideBoxSaveEditProps, AsideButtonActionType } from './model/asideModel';

import { Button, ButtonGroup } from '@mui/material';

const AsideBoxSaveEdit = ({ title, children, handleButtonAction }: AsideBoxSaveEditProps) => {
    const [isEdit] = useState(false);
    const methods = useMenuAuthContext();

    const getTitle = () => {
        if (isEdit) {
            return `${title} 수정`;
        }
        return `${title} 등록`;
    };

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const { target } = event;
        const { name } = target as HTMLButtonElement;
        handleButtonAction(name as AsideButtonActionType);
    };

    return (
        <AsideBox title={getTitle()}>
            {children}

            <ButtonGroup>
                {
                    // 삭제 권한
                    methods && methods.includes('DELETE') && (
                        <Button
                            color="error"
                            title="삭제"
                            name="DEKETE"
                            onClick={handleButtonClick}
                        >
                            삭제
                        </Button>
                    )
                }

                <Button title="초기화" name="RESET" onClick={handleButtonClick}>
                    초기화
                </Button>
                {
                    // 생성 권한
                    methods &&
                        // 수정 권한
                        (methods.includes('POST') || (isEdit && methods.includes('PUT'))) && (
                            <Button
                                title="저장"
                                name="SAVE"
                                color="success"
                                onClick={handleButtonClick}
                            >
                                저장
                            </Button>
                        )
                }
            </ButtonGroup>
        </AsideBox>
    );
};

export { AsideBoxSaveEdit };
