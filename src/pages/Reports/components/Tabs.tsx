import { Tabs } from '@mantine/core';
import { IconReceipt, IconPackages } from '@tabler/icons-react';
import { TabReportsBills, TabReportsInventory } from '.';
import { Title } from '../../../layouts';

export default function MainTabs() {
    return (
        <>
            <Title />
            <Tabs style={{display:"flex", flexDirection:"column", height:"100%"}} variant="default" color="blue" defaultValue="bills">
                <Tabs.List >
                    <Tabs.Tab value="bills" icon={<IconReceipt size="1rem" />}>Reporte de Facturas</Tabs.Tab>
                    <Tabs.Tab value="inventory" icon={<IconPackages size="1rem" />}>Reporte de Inventario</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel style={{height:"100%"}}  value="bills" pt="md">
                    <TabReportsBills />
                </Tabs.Panel>

                <Tabs.Panel style={{height:"100%"}} value="inventory" pt="md">
                    <TabReportsInventory />
                </Tabs.Panel>
            </Tabs>
        </>

    );
}