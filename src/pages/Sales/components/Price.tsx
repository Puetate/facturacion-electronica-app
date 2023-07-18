import { Flex, Text } from "@mantine/core";
import { useSalesStore } from "../store";

const USDollar = new Intl.NumberFormat('es-EC', {
    style: 'currency',
    currency: 'USD',
});

export default function Price() {
    const {totalToPay} = useSalesStore();

    return (
        <Flex direction="column">
            <Text color="blue" weight="bold" size="1rem">Total A Pagar</Text>
            <Text align="center" weight="bold" size="1.5rem">{USDollar.format(totalToPay)}</Text>
        </Flex>
    )
}