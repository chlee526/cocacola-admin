import { Loader } from '@/shared/ui';

import { SelectGrpDialog } from './SelectGrpDialog';
import { useControl } from '../hook/useStie';

import { Button, Grid } from '@mui/material';

const Control = () => {
    const {
        allSiteSelected,
        selSiteSelected,
        isLoading,
        handleAdd,
        handleDel,
        selGrpDialogOpen,
        setSelGrpDialogOpen,
        setDialogSelGrpCode,
        allGrpList,
    } = useControl();

    // if (isLoading) return <div>로딩중...</div>;

    return (
        <>
            <Grid
                container
                spacing={1.5}
                sx={{
                    height: '100%',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Grid item>
                    <Button
                        disabled={allSiteSelected.size === 0}
                        onClick={handleAdd}
                        variant="contained"
                        size="large"
                        fullWidth
                    >
                        우측 이동({allSiteSelected.size}개)
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        disabled={selSiteSelected.size === 0}
                        onClick={handleDel}
                        variant="contained"
                        size="large"
                        fullWidth
                    >
                        좌측 이동({selSiteSelected.size}개)
                    </Button>
                </Grid>
            </Grid>

            <SelectGrpDialog
                open={selGrpDialogOpen}
                setOpen={setSelGrpDialogOpen}
                setGrp={setDialogSelGrpCode}
                allGrpList={allGrpList}
            />

            <Loader open={isLoading} />
        </>
    );
};

export { Control };
