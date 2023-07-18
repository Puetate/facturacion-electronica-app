import { Button, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUser } from "@tabler/icons-react";
import { shallow } from 'zustand/shallow';
import { ClientInfo } from ".";
import MantineDrawer from "../../../components/Drawer";
import { FormClient } from "../../Clients/components";
import { useSalesStore } from "../store";

export default function ClientSection() {
    const [opened, { open, close }] = useDisclosure();
    const { client, setClient } = useSalesStore((state) => ({ client: state.client, setClient: state.setClient }),shallow);
    return (
        <div>
            <Flex justify="space-between">
                <ClientInfo />
                <Button onClick={open} tt="uppercase" leftIcon={<IconUser />}>Añadir cliente</Button>
            </Flex>
            <MantineDrawer opened={opened} close={close} isBig={false}>
                <FormClient onCancel={close} onSubmitSuccess={setClient} selectedClient={client}/>
            </MantineDrawer>
        </div>
    )
}