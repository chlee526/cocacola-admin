import { SiteType } from '@/entity/site';
import { FeatureSiteGrpTab, FeatureSiteList, FeatureSiteListFunction } from '@/feature/site';

import { SiteListStyle } from './SiteMovement.style';
import { SiteListProvider } from '../provider/SiteListProvider';

interface OwnProps {
    listType: SiteType;
}

const SiteList = ({ listType = 'ALL' }: OwnProps) => {
    return (
        <div css={SiteListStyle}>
            <SiteListProvider listType={listType}>
                <FeatureSiteListFunction />
                <div className="listWrap" style={{ overflow: 'hidden' }}>
                    {listType === 'SELECT' && <FeatureSiteGrpTab />}
                    <FeatureSiteList />
                </div>
            </SiteListProvider>
        </div>
    );
};

export { SiteList };
