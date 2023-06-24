import { useEffect, useMemo, useRef, useState } from "react";
import { DataTableColumn } from "mantine-datatable"
import { ActionIcon, Button, Flex, Group, Tooltip, Text } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import getCategoriesService from "../services/getCategories.service";
import { ConfirmDialog, DataTable } from "../../../components";
import { useDisclosure } from "@mantine/hooks";
import { SnackbarManager, getCategoryProperties } from "../../../utils";
import deleteCategoryService from "../services/deleteCategory.service";
import MantineDrawer from "../../../components/Drawer";
import { FormCategory } from ".";
import { getCategoryService } from "../services";


//const TITLE = "Categorías";
const CONFIRM_MESSAGE = "¿Seguro que desea eliminar la categoría?"
const SUCCESS_DELETE = "Categoría eliminada exitosamente"

export interface CategoryData {
    id: string,
    category: string,
    tax: string,
    promotion: string,
    status: boolean | string
}

function CategoryTable() {
    const [listCategories, setListCategories] = useState<CategoryData[]>([]);
    const recordsRef = useRef<CategoryData[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null)
    const [title, setTitle] = useState("");
    const [opened, { open, close }] = useDisclosure()
    const [openedDialog, { open: openDialog, close: closeDialog }] = useDisclosure()


    const onClickEditButton = async (category: CategoryData) => {
        const { id } = category;
        const categoryToEdit = await getCategory(id);

        if (categoryToEdit == null) return;
        setSelectedCategory({ ...categoryToEdit });
        setTitle("Editar Categoría")
        open()
    }

    const onClickDeleteButton = (category: CategoryData) => {
        setSelectedCategory(category);
        openDialog()
    }

    const getCategory = async (id: string) => {
        const res = await getCategoryService(id);
        if (res.error || res.data === null) return null;
        
        return getCategoryProperties(res.data.data);
    };

    const handleDeleteRoutineAlert = async () => {
        const { id } = selectedCategory!;
        if (!id) return;
        const res = await deleteCategoryService(id);
        if (res.error || res.data === null) return
        SnackbarManager.success(SUCCESS_DELETE)
    }
    const onClickAddButton = () => {
        setSelectedCategory(null);
        setTitle("Nueva Categoría")
        open()
    }

    const getCategories = async () => {
        const res = await getCategoriesService();
        if (res.error || res.data === null) return
        const categoriesData = res.data.data;

        const categories: CategoryData[] = categoriesData.map(category => (
            {
                id: category.id || "",
                category: category.category,
                tax: (category.tax != null) ? `${category.tax.percentage.toString()}%` : "",
                promotion: (category.promotion != null) ? category.promotion.description : "",
                status: category.status
            }
        ));
        setListCategories(categories);
        recordsRef.current = categories;
    };

    useEffect(() => {
        getCategories();
    }, [])

    const onSubmitSuccess = async () => {
        close()
        await getCategories()
    }

    const categoriesColumns = useMemo<DataTableColumn<CategoryData>[]>(() => [
        { accessor: "category", title: "Categoría", textAlignment: 'center' },
        { accessor: "tax", title: "Impuesto", textAlignment: 'center' },
        { accessor: "promotion", title: "Promoción", textAlignment: 'center' },
        { accessor: "state", title: "Estado", textAlignment: 'center', render: (category) => <Text key={category.id}>{(category.status) ? "Activo" : "Inactivo"}</Text> },
        {
            accessor: "actions",
            title: "Acciones",
            render: (category) => (
                <Group spacing={10} position="center" noWrap>
                    <>
                        <ActionIcon
                            color="red"
                            variant="filled"
                            onClick={() => onClickDeleteButton(category)}
                        >
                            <IconTrash />
                        </ActionIcon>
                        <Tooltip label="Editar">
                            <ActionIcon
                                color="orange"
                                variant="filled"
                                onClick={() => onClickEditButton(category)}
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
        <Flex direction="column" h="100%" gap="xs">
            <Flex>
                <Flex gap="xs">

                    <Button onClick={onClickAddButton}>
                        Agregar
                    </Button>
                </Flex>
            </Flex>
            <DataTable columns={categoriesColumns} records={listCategories} />
            <ConfirmDialog opened={openedDialog} onClose={closeDialog} message={CONFIRM_MESSAGE} onConfirm={handleDeleteRoutineAlert} />
            <MantineDrawer opened={opened} title={title} close={close} >
                <FormCategory onCancel={close} onSubmitSuccess={onSubmitSuccess} selectedCategory={selectedCategory}/>
            </MantineDrawer>
        </Flex>
    )
}

export default CategoryTable