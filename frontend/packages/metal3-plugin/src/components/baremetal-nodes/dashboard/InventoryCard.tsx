import * as React from 'react';
import { Card, CardBody, CardHeader, CardTitle } from '@patternfly/react-core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { NodeInventoryItem } from '@console/app/src/components/nodes/node-dashboard/InventoryCard';
import { NodeDashboardContext } from '@console/app/src/components/nodes/node-dashboard/NodeDashboardContext';
import { resourcePathFromModel } from '@console/internal/components/utils';
import { PodModel, NodeModel } from '@console/internal/models';
import InventoryItem from '@console/shared/src/components/dashboard/inventory-card/InventoryItem';
import { getPodStatusGroups } from '@console/shared/src/components/dashboard/inventory-card/utils';
import { getHostStorage, getHostNICs, getHostCPU } from '../../../selectors';
import { BareMetalNodeDashboardContext } from './BareMetalNodeDashboardContext';

const InventoryCard: React.FC = () => {
  const { t } = useTranslation();
  const { obj } = React.useContext(NodeDashboardContext);
  const { host } = React.useContext(BareMetalNodeDashboardContext);

  const NICTitleComponent = React.useCallback(
    ({ children }) => (
      <Link to={`${resourcePathFromModel(NodeModel, obj.metadata.name)}/nics`}>{children}</Link>
    ),
    [obj.metadata.name],
  );

  const DiskTitleComponent = React.useCallback(
    ({ children }) => (
      <Link to={`${resourcePathFromModel(NodeModel, obj.metadata.name)}/disks`}>{children}</Link>
    ),
    [obj.metadata.name],
  );

  return (
    <Card data-test-id="inventory-card">
      <CardHeader>
        <CardTitle>{t('metal3-plugin~Inventory')}</CardTitle>
      </CardHeader>
      <CardBody>
        <NodeInventoryItem
          nodeName={obj.metadata.name}
          model={PodModel}
          mapper={getPodStatusGroups}
        />
        <InventoryItem
          isLoading={!obj}
          title={t('metal3-plugin~Image')}
          titlePlural={t('metal3-plugin~Images')}
          count={obj.status?.images?.length}
          error={!obj.status?.images}
        />
        <InventoryItem
          title={t('metal3-plugin~Disk')}
          isLoading={!obj}
          count={getHostStorage(host).length}
          TitleComponent={DiskTitleComponent}
        />
        <InventoryItem
          title={t('metal3-plugin~NIC')}
          isLoading={!obj}
          count={getHostNICs(host).length}
          TitleComponent={NICTitleComponent}
        />
        <InventoryItem
          title={t('metal3-plugin~CPU')}
          isLoading={!obj}
          count={getHostCPU(host).count}
        />
      </CardBody>
    </Card>
  );
};

export default InventoryCard;
