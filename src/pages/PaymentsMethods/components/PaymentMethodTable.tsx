import { useEffect, useMemo, useRef, useState } from "react";
import { DataTableColumn } from "mantine-datatable"
import { ActionIcon, Button, Flex, Group, Tooltip, Text } from "@mantine/core";
import { IconCirclePlus, IconEdit } from "@tabler/icons-react";
import { DataTable } from "../../../components";
import { useDisclosure } from "@mantine/hooks";
import MantineDrawer from "../../../components/Drawer";
import InputsFilters from "../../../components/InputsFilters";
import { Title } from "../../../layouts";
import { State, PaymentMethods } from "../../../models";
import { FormPaymentMethod } from ".";
import { getPaymentMethodsService } from "../services";

function PaymentMethodsTable() {
    const [listPaymentMethods, setListPaymentMethods] = useState<PaymentMethods[]>([]);
    const listPaymentMethodsRef = useRef<PaymentMethods[]>([]);
    const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<PaymentMethods | null>(null)
    const [opened, { open, close }] = useDisclosure()


    const onClickEditButton = async (paymentMethod: PaymentMethods) => {
        paymentMethod.status = paymentMethod.status.toString();

        setSelectedPaymentMethods({ ...paymentMethod });

        open()
    }
    const onClickAddButton = () => {
        setSelectedPaymentMethods(null);
        open()
    }

    const getPaymentMethods = async () => {
        const res = await getPaymentMethodsService();
        
        if (res.error || res.data === null) return
        const PaymentMethodsData = res.data.data;
        console.log(PaymentMethodsData);
        setListPaymentMethods(PaymentMethodsData);
        listPaymentMethodsRef.current = PaymentMethodsData;

    };

    const generalFilter = (value: string) => {
        if (value == "") {
            return setListPaymentMethods(listPaymentMethodsRef.current);
        }
        const filteredList = listPaymentMethodsRef.current.filter(

            ({ payment, status }: PaymentMethods) => {
                status = (status) ? State.ACTIVE : State.INACTIVE;
                const filter = `${payment} ${status}`;
                return filter.toLowerCase().includes(value.trim().toLowerCase());
            },
        );
        return setListPaymentMethods(filteredList);
    }

    useEffect(() => {
        getPaymentMethods();
    }, [])

    const onSubmitSuccess = async () => {
        close()
        await getPaymentMethods()
    }

    const PaymentMethodsColumns = useMemo<DataTableColumn<PaymentMethods>[]>(() => [
        { accessor: "payment", title: "Tipo de Pago", textAlignment: 'center' },
        { accessor: "status", title: "Estado", textAlignment: 'center', render: (paymentMethods) => <Text>{(paymentMethods.status) ? "Activo" : "Inactivo"}</Text> },
        {
            accessor: "actions",
            title: "Acciones",
            render: (paymentMethod) => (
                <Group spacing={10} position="center" noWrap>
                    <Tooltip label="Editar">
                        <ActionIcon
                            color="violet"
                            variant="light"
                            onClick={() => onClickEditButton({ ...paymentMethod })}
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
            <DataTable columns={PaymentMethodsColumns} records={listPaymentMethods} />
            <MantineDrawer opened={opened} close={close} isBig={false} >
                <FormPaymentMethod onCancel={close} onSubmitSuccess={onSubmitSuccess} selectedPaymentMethods={selectedPaymentMethods} />
            </MantineDrawer>
        </Flex>
    )
}

export default PaymentMethodsTable