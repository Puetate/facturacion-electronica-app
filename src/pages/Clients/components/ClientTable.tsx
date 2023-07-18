import { useEffect, useMemo, useRef, useState } from "react";
import { DataTableColumn } from "mantine-datatable"
import { ActionIcon, Button, Flex, Group, Tooltip, Text } from "@mantine/core";
import { IconCirclePlus, IconEdit } from "@tabler/icons-react";
import { DataTable } from "../../../components";
import { useDisclosure } from "@mantine/hooks";
import MantineDrawer from "../../../components/Drawer";
import InputsFilters from "../../../components/InputsFilters";
import { Title } from "../../../layouts";
import { State, Client } from "../../../models";
import { FormClient } from ".";
import { getClientsService } from "../services";

function ClientTable() {
    const [listClients, setListClients] = useState<Client[]>([]);
    const listClientsRef = useRef<Client[]>([]);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null)
    const [opened, { open, close }] = useDisclosure()


    const onClickEditButton = async (client: Client) => {
        client.status = client.status.toString();
        setSelectedClient({ ...client });
        open()
    }
    const onClickAddButton = () => {
        setSelectedClient(null);
        open()
    }

    const getClients = async () => {
        const res = await getClientsService();
        if (res.error || res.data === null) return
        const clientsData = res.data.data;     
        setListClients(clientsData);
        listClientsRef.current = clientsData;
    };

    const generalFilter = (value: string) => {
        if (value == "") {
            return setListClients(listClientsRef.current);
        }
        const filteredList = listClientsRef.current.filter(
            ({ identification, fullname, email, address, telephone, status }: Client) => {
                status = (status) ? State.ACTIVE : State.INACTIVE;
                const filter = `${identification} ${fullname} ${email} ${address} ${telephone} ${status}`;
                return filter.toLowerCase().includes(value.trim().toLowerCase());

            },
        );
        return setListClients(filteredList);

    }

    useEffect(() => {
        getClients();
    }, [])

    const onSubmitSuccess = async () => {
        close()
        await getClients()
    }

    const ClientsColumns = useMemo<DataTableColumn<Client>[]>(() => [
        { accessor: "fullname", title: "Nombre", textAlignment: 'center' },
        { accessor: "identification", title: "Identificación", textAlignment: 'center' },
        { accessor: "email", title: "Email", textAlignment: 'center' },
        { accessor: "address", title: "Dirección", textAlignment: 'center' },
        { accessor: "telephone", title: "Teléfono", textAlignment: 'center' },
        { accessor: "status", title: "Estado", textAlignment: 'center', render: (client) => <Text>{(client.status) ? "Activo" : "Inactivo"}</Text> },
        {
            accessor: "actions",
            title: "Acciones",
            render: (client) => (
                <Group spacing={10} position="center" noWrap>
                    <Tooltip label="Editar">
                        <ActionIcon
                            color="violet"
                            variant="light"
                            onClick={() => onClickEditButton({ ...client })}
                        >
                            <IconEdit />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            ),
            textAlignment: 'center'
        },

    ], [])

    return (

        <Flex direction="column" h="100%" gap=".15rem">
            <Title />
            <Flex justify="space-between" align="center">
                <InputsFilters onChangeFilters={generalFilter} />
                <Button size="md" leftIcon={<IconCirclePlus />} onClick={onClickAddButton}>
                    Agregar
                </Button>
            </Flex>
            <DataTable columns={ClientsColumns} records={listClients} />
            <MantineDrawer opened={opened} close={close} isBig={false} >
                <FormClient onCancel={close} onSubmitSuccess={onSubmitSuccess} selectedClient={selectedClient} />
            </MantineDrawer>
        </Flex>
    )
}

export default ClientTable