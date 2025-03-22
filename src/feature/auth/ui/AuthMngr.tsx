import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { isEqual } from 'lodash';

import { PostAuthRequestMseqModel } from '@/entity/auth/model/adminModel';
import { allMenuStore } from '@/entity/menu/store/menu';

import { Styles } from './AuthMngr.style';
import { AuthMngrLevelSelector } from './AuthMngrLevelSelector';
import {
    getMenuAuthAllEnabled,
    transformAuthLevels,
    transformAuthLevelsToRecord,
} from '../util/util';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import Grid from '@mui/material/Grid2';

interface OwnProps {
    value: [PostAuthRequestMseqModel[], Dispatch<SetStateAction<PostAuthRequestMseqModel[]>>];
}

const AuthMngr = ({ value }: OwnProps) => {
    // 전체 메뉴 목록
    const { allMenuList } = allMenuStore();

    // 데이터
    const [ownAuthLevels, setOwnAuthLevels] = value;
    const [authLevels, setAuthLevels] = useState<Record<string, string>>({});

    // 부모 <-> 자식 변경된 데이터 전달
    useEffect(() => {
        if (!isEqual(transformAuthLevels(authLevels), ownAuthLevels)) {
            setAuthLevels(transformAuthLevelsToRecord(ownAuthLevels));
        }
    }, [ownAuthLevels]);
    useEffect(() => {
        if (!isEqual(transformAuthLevels(authLevels), ownAuthLevels)) {
            setOwnAuthLevels(transformAuthLevels(authLevels));
        }
    }, [authLevels]);

    // 1뎁스에서 권한 할당
    const handleAuth1dp = (seq: number, val: number) => {
        const dp1Auths = getMenuAuthAllEnabled({ seq, level: val, list: allMenuList });
        setAuthLevels({ ...authLevels, ...dp1Auths });
    };

    if (!allMenuList || allMenuList.length === 0) return <div>데이터가 없습니다.</div>;

    return (
        <Grid sx={{ p: 2, borderRadius: 2, bgcolor: '#fff' }} css={Styles}>
            {allMenuList &&
                allMenuList.map((dp1Item, idx) => (
                    <Grid
                        container
                        key={`${dp1Item.seq}_${dp1Item.name}`}
                        sx={{
                            pb: idx !== allMenuList.length - 1 ? 2 : 0,
                            mb: idx !== allMenuList.length - 1 ? 2 : 0,
                            borderBottom: idx !== allMenuList.length - 1 ? '1px solid #e0e0e0' : '',
                        }}
                    >
                        <Grid size={3}>
                            <div className="category is1dp">
                                <div>{dp1Item.name}</div>
                                <ToggleButtonGroup value={value} size="xsmall">
                                    <ToggleButton
                                        value="1"
                                        onClick={(_e, val) => handleAuth1dp(dp1Item.seq, val)}
                                        title="조회"
                                    >
                                        1
                                    </ToggleButton>
                                    <ToggleButton
                                        value="2"
                                        onClick={(_e, val) => handleAuth1dp(dp1Item.seq, val)}
                                        title="조회,등록,수정"
                                    >
                                        2
                                    </ToggleButton>
                                    <ToggleButton
                                        value="3"
                                        onClick={(_e, val) => handleAuth1dp(dp1Item.seq, val)}
                                        title="조회,등록,수정,삭제"
                                    >
                                        3
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </Grid>
                        <Grid size={9}>
                            {dp1Item?.child &&
                                dp1Item?.child.map(childItem => (
                                    <Grid
                                        key={`${childItem.seq}_${childItem.name}`}
                                        container
                                        sx={{
                                            pb: dp1Item?.child && dp1Item?.child.length > 1 ? 1 : 0,
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Grid flexGrow={1}>
                                            <div
                                                className={`category ${!authLevels[childItem.seq] ? 'isNoneAuth' : ''}`}
                                            >
                                                {childItem.name}
                                            </div>
                                        </Grid>
                                        <Grid>
                                            <AuthMngrLevelSelector
                                                seq={childItem.seq}
                                                value={[authLevels[childItem.seq], setAuthLevels]}
                                            />
                                        </Grid>
                                    </Grid>
                                ))}
                        </Grid>
                    </Grid>
                ))}
        </Grid>
    );
};

export { AuthMngr };
