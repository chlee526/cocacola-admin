import { FeatureSiteControl } from '@/feature/site';

import { SiteList } from './SiteList';
import { PageSiteProvider } from '../provider/PageSiteProvider';

import { Grid } from '@mui/material';

const SiteMovement = () => {
    return (
        <PageSiteProvider>
            <Grid
                component="main"
                container
                columns={24}
                sx={{ height: 'calc(100vh - 73px)', minHeight: '500px' }}
            >
                <Grid
                    className="ui-box"
                    item
                    xs={10}
                    sx={{ display: 'flex', position: 'relative' }}
                >
                    <SiteList listType="ALL" />
                </Grid>
                <Grid className="ui-box" item sx={{ width: '200px', position: 'relative' }}>
                    <FeatureSiteControl />
                </Grid>
                <Grid
                    className="ui-box"
                    item
                    xs={12}
                    sx={{ display: 'flex', position: 'relative' }}
                >
                    <SiteList listType="SELECT" />
                </Grid>
            </Grid>
        </PageSiteProvider>
    );
};

export { SiteMovement };
