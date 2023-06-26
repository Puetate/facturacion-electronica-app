import { ActionIcon, Button, Flex, Group, Text, Tooltip } from "@mantine/core";
import { Title } from "../../../layouts";
import InputsFilters from "../../../components/InputsFilters";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { SnackbarManager } from "../../../utils";
import { DataTableColumn } from "mantine-datatable";
import { IconCirclePlus, IconEdit, IconTrash } from "@tabler/icons-react";
import { ConfirmDialog, DataTable } from "../../../components";
import MantineDrawer from "../../../components/Drawer";

import { getPromotionProperties } from "../../../utils/getPromotionProperties";
import deletePromotionService from "../services/deletePromotion.service";
import getPromotionService from "../services/getPromotion.service";
import getPromotionsService from "../services/getPromotions.service";
import FormPromotion from "./FormPromotions";

const CONFIRM_MESSAGE = "¿Seguro que desea eliminar la promoción?"
const SUCCESS_DELETE = "Promoción eliminada exitosamente"

export interface PromotionData {
    id: string,
    description: string,
    value: number,
    status: boolean | string
}

function PromotionTable() {
    const [listPromotions, setListPromotions] = useState<PromotionData[]>([]);
    const listPromotionsRef = useRef<PromotionData[]>([]);
    const [selectedPromotion, setSelectedPromotion] = useState<PromotionData | null>(null)
    const [opened, { open, close }] = useDisclosure()
    const [openedDialog, { open: openDialog, close: closeDialog }] = useDisclosure()


    const onClickEditButton = async (promotion: PromotionData) => {
        const { id } = promotion;
        const promotionToEdit = await getPromotion(id);

        if (promotionToEdit == null) return;
        setSelectedPromotion({ ...promotionToEdit });
        open()
    }

    const onClickDeleteButton = (promotion: PromotionData) => {
        setSelectedPromotion(promotion);
        openDialog()
    }

    const getPromotion = async (id: string) => {
        const res = await getPromotionService(id);
        if (res.error || res.data === null) return null;

        return getPromotionProperties(res.data.data);
    };

    const handleDeleteRoutineAlert = async () => {
        const { id } = selectedPromotion!;
        if (!id) return;
        const res = await deletePromotionService(id);
        if (res.error || res.data === null) return
        SnackbarManager.success(SUCCESS_DELETE)
        onSubmitSuccess();
        closeDialog();
    }
    const onClickAddButton = () => {
        setSelectedPromotion(null);
        open()
    }

    const getPromotions = async () => {
        const res = await getPromotionsService();
        if (res.error || res.data === null) return
        const promotionData = res.data.data;

        const promotion: PromotionData[] = promotionData.map(promotion => (
            {
                id: promotion.id || "",
                description: promotion.description,
                value: promotion.value,
                status: promotion.status
            }
        ));
        setListPromotions(promotion);
        listPromotionsRef.current = promotion;
    };

    const generalFilter = (text: string) => {
        if (text == "") {
            return setListPromotions(listPromotionsRef.current);
        }
        const filteredList = listPromotionsRef.current.filter(
            ({ description,value, status }: PromotionData) => {
                const filter = `${description} ${value} ${status}`;
                return filter.toLowerCase().includes(text.trim().toLowerCase());

            },
        );
        return setListPromotions(filteredList);

    }

    useEffect(() => {
        getPromotions();
    }, [])

    const onSubmitSuccess = async () => {
        close()
        await getPromotions()
    }

    const promotionsColumns = useMemo<DataTableColumn<PromotionData>[]>(() => [
        { accessor: "description", title: "Promoción", textAlignment: 'center' },
        { accessor: "value", title: "Valor", textAlignment: 'center' },
        { accessor: "status", title: "Estado", textAlignment: 'center', render: (category) => <Text>{(category.status) ? "Activo" : "Inactivo"}</Text> },
        {
            accessor: "actions",
            title: "Acciones",
            render: (promotion) => (
                <Group spacing={10} position="center" noWrap>
                    <>
                        <ActionIcon
                            color="red"
                            variant="light"

                            onClick={() => onClickDeleteButton(promotion)}
                        >
                            <IconTrash />
                        </ActionIcon>
                        <Tooltip label="Editar">
                            <ActionIcon
                                color="violet"
                                variant="light"
                                onClick={() => onClickEditButton(promotion)}
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
            <DataTable columns={promotionsColumns} records={listPromotions} />
            <ConfirmDialog opened={openedDialog} onClose={closeDialog} message={CONFIRM_MESSAGE} onConfirm={handleDeleteRoutineAlert} />
            <MantineDrawer opened={opened} close={close} >
                <FormPromotion onCancel={close} onSubmitSuccess={onSubmitSuccess} selectedPromotion={selectedPromotion} />
            </MantineDrawer>
        </Flex>
    )
}

export default PromotionTable