import { useEffect, useMemo, useRef, useState } from "react";
import { DataTableColumn } from "mantine-datatable"
import { ActionIcon, Button, Flex, Group, Text, Tooltip } from "@mantine/core";
import { IconCirclePlus, IconEdit, IconTrash } from "@tabler/icons-react";
import getTaxService from "../services/getTax.service";
import { ConfirmDialog, DataTable } from "../../../components";
import { useDisclosure } from "@mantine/hooks";
import { getTaxProperties } from "../../../utils/getTaxProperties";
import deleteTaxService from "../services/deleteTax.service";
import MantineDrawer from "../../../components/Drawer";

import getTaxsService from "../services/getTaxs.service";
import InputsFilters from "../../../components/InputsFilters";
import { Title } from "../../../layouts";
import { SnackbarManager } from "../../../utils";
import FormTax from "./FormTax";





const CONFIRM_MESSAGE = "¿Seguro que desea eliminar el impuesto?"
const SUCCESS_DELETE = "Impuesto eliminado exitosamente"

export interface TaxData {
    id: string,
    tax: string,
    percentage: number,
    status: boolean | string
}

function TaxTable() {
    const [listTax, setListTax] = useState<TaxData[]>([]);
    const listTaxRef = useRef<TaxData[]>([]);
    const [selectedTax, setSelectedTax] = useState<TaxData | null>(null)
    const [opened, { open, close }] = useDisclosure()
    const [openedDialog, { open: openDialog, close: closeDialog }] = useDisclosure()

    const onClickEditButton = async (tax: TaxData) => {
        const { id } = tax;
        const taxToEdit = await getTax(id);

        if (taxToEdit == null) return;
        setSelectedTax({ ...taxToEdit });
        open()
    }

    const onClickDeleteButton = (tax: TaxData) => {
        setSelectedTax(tax);
        openDialog()
    }

    const getTax = async (id: string) => {
        const res = await getTaxService(id);
        if (res.error || res.data === null) return null;

        return getTaxProperties(res.data.data);
    };

    const handleDeleteRoutineAlert = async () => {
        const { id } = selectedTax!;
        if (!id) return;
        const res = await deleteTaxService(id);
        if (res.error || res.data === null) return
        SnackbarManager.success(SUCCESS_DELETE)
        onSubmitSuccess();
        closeDialog();
    }

    const onClickAddButton = () => {
        setSelectedTax(null);
        open()
    }

    const getTaxs = async () => {
        const res = await getTaxsService();
        if (res.error || res.data === null) return
        const taxData = res.data.data;

        const tax: TaxData[] = taxData.map(tax => (
            {
                id: tax.id || "",
                tax: tax.tax,
                percentage: tax.percentage,
                status: tax.status
            }
        ));
        setListTax(tax);
        listTaxRef.current = tax;
    };

    const generalFilter = (value: string) => {
        if (value == "") {
            return setListTax(listTaxRef.current);
        }
        const filteredList = listTaxRef.current.filter(
            ({ tax, percentage, status}: TaxData) => {
                const filter = `${tax} ${percentage} ${status}`;
                return filter.toLowerCase().includes(value.trim().toLowerCase());
            },
        );
        return setListTax(filteredList);

    }

    useEffect(() => {
        getTaxs();
    }, [])

    const onSubmitSuccess = async () => {
        close()
        await getTaxs()
    }

    const taxColumns = useMemo<DataTableColumn<TaxData>[]>(() => [
        { accessor: "tax", title: "Impuesto", textAlignment: 'center' },
        { accessor: "percentage", title: "Porcentaje", textAlignment: 'center' },
        { accessor: "status", title: "Estado", textAlignment: 'center', render: (category) => <Text>{(category.status) ? "Activo" : "Inactivo"}</Text> },
        {
            accessor: "actions",
            title: "Acciones",
            render: (tax) => (
                <Group spacing={10} position="center" noWrap>
                    <>
                        <ActionIcon
                            color="red"
                            variant="light"

                            onClick={() => onClickDeleteButton(tax)}
                        >
                            <IconTrash />
                        </ActionIcon>
                        <Tooltip label="Editar">
                            <ActionIcon
                                color="violet"
                                variant="light"
                                onClick={() => onClickEditButton(tax)}
                            >
                                <IconEdit />
                            </ActionIcon>
                        </Tooltip>
                    </>
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
            <DataTable columns={taxColumns} records={listTax} />
            <ConfirmDialog opened={openedDialog} onClose={closeDialog} message={CONFIRM_MESSAGE} onConfirm={handleDeleteRoutineAlert} />
            <MantineDrawer opened={opened} close={close} >
            <FormTax onCancel={close} onSubmitSuccess={onSubmitSuccess} selectedTax={selectedTax} />
            </MantineDrawer>
        </Flex>
    )
}
export default TaxTable