import { useEffect, useMemo, useRef, useState } from "react";
import { DataTableColumn } from "mantine-datatable"
import { ActionIcon, Button, Flex, Group, Tooltip, Text } from "@mantine/core";
import { IconCirclePlus, IconEdit } from "@tabler/icons-react";
import { ConfirmDialog, DataTable } from "../../../components";
import { useDisclosure } from "@mantine/hooks";
import { SnackbarManager } from "../../../utils";
import MantineDrawer from "../../../components/Drawer";
import InputsFilters from "../../../components/InputsFilters";
import { Title } from "../../../layouts";
import { State, Supplier } from "../../../models";
import { FormSupplier } from ".";
import { deleteSupplierService, getSuppliersService } from "../services";


//const TITLE = "Categorías";
const CONFIRM_MESSAGE = "¿Seguro que desea eliminar el proveedor?"
const SUCCESS_DELETE = "Proveedor eliminado exitosamente"

function SupplierTable() {
    const [listSuppliers, setListSuppliers] = useState<Supplier[]>([]);
    const listSuppliersRef = useRef<Supplier[]>([]);
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
    const [opened, { open, close }] = useDisclosure()
    const [openedDialog, { close: closeDialog }] = useDisclosure()


    const onClickEditButton = async (supplier: Supplier) => {
        supplier.status = supplier.status.toString();
        setSelectedSupplier({ ...supplier });
        open()
    }

    const handleDeleteRoutineAlert = async () => {
        const { id } = selectedSupplier!;
        if (!id) return;
        const res = await deleteSupplierService(id);
        if (res.error || res.data === null) return
        SnackbarManager.success(SUCCESS_DELETE)
        onSubmitSuccess();
        closeDialog();
    }
    const onClickAddButton = () => {
        setSelectedSupplier(null);
        open()
    }

    const getSuppliers = async () => {
        const res = await getSuppliersService();
        if (res.error || res.data === null) return
        const suppliersData = res.data.data;
        setListSuppliers(suppliersData);
        listSuppliersRef.current = suppliersData;
    };

    const generalFilter = (value: string) => {
        if (value == "") {
            return setListSuppliers(listSuppliersRef.current);
        }
        const filteredList = listSuppliersRef.current.filter(
            ({ identification, name, email, address, telephone, status }: Supplier) => {
                status = (status) ? State.ACTIVE : State.INACTIVE;
                const filter = `${identification} ${name} ${email} ${address} ${telephone} ${(status)}`;
                return filter.toLowerCase().includes(value.trim().toLowerCase());

            },
        );
        return setListSuppliers(filteredList);

    }

    useEffect(() => {
        getSuppliers();
    }, [])

    const onSubmitSuccess = async () => {
        close()
        await getSuppliers()
    }

    const SuppliersColumns = useMemo<DataTableColumn<Supplier>[]>(() => [
        { accessor: "name", title: "Nombre", textAlignment: 'center' },
        { accessor: "identification", title: "Identificación", textAlignment: 'center' },
        { accessor: "email", title: "Email", textAlignment: 'center' },
        { accessor: "address", title: "Dirección", textAlignment: 'center' },
        { accessor: "telephone", title: "Teléfono", textAlignment: 'center' },
        { accessor: "status", title: "Estado", textAlignment: 'center', render: (supplier) => <Text>{(supplier.status) ? "Activo" : "Inactivo"}</Text> },
        {
            accessor: "actions",
            title: "Acciones",
            render: (supplier) => (
                <Group spacing={10} position="center" noWrap>
                    <Tooltip label="Editar">
                        <ActionIcon
                            color="violet"
                            variant="light"
                            onClick={() => onClickEditButton({ ...supplier })}
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
            <DataTable columns={SuppliersColumns} records={listSuppliers} />
            <ConfirmDialog opened={openedDialog} onClose={closeDialog} message={CONFIRM_MESSAGE} onConfirm={handleDeleteRoutineAlert} />
            <MantineDrawer opened={opened} close={close} isBig={false} >
                <FormSupplier onCancel={close} onSubmitSuccess={onSubmitSuccess} selectedSupplier={selectedSupplier} />
            </MantineDrawer>
        </Flex>
    )
}

export default SupplierTable