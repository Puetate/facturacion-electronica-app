import { Flex, Text } from "@mantine/core";
import { useSalesStore } from "../store";

const USDollar = new Intl.NumberFormat('es-EC', {
    style: 'currency',
    currency: 'USD',
});

const IVA = 1.12;

export default function BillInfo() {
    const { totalToPay } = useSalesStore((state) => ({ totalToPay: state.totalToPay }))
    return (
        <Flex direction="column" justify="flex-end" style={{ alignSelf: "flex-end" }}>
            <Flex display="flex" gap="sm" >
                <Text color="blue"> Subtotal IVA 0% </Text><Text color="black">{USDollar.format(totalToPay / IVA)}</Text>
            </Flex>
            <Flex display="flex" gap="sm" >
                <Text color="blue"> Total IVA 12%</Text><Text color="black">{USDollar.format(totalToPay)}</Text>
            </Flex>
            <Flex display="flex" gap="sm" >
                <Text color="blue">Total</Text><Text color="black">{USDollar.format(totalToPay)}</Text>
            </Flex>
        </Flex>
    )
}