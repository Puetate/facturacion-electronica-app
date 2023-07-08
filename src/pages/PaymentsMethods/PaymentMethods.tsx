import { Flex } from "@mantine/core"
import { PaymentMethodTable } from "./components"
import { useEffect } from "react";

function PaymentMethods() {
  useEffect(() => {
		document.title = "Métodos de Pago";
	},[]);
  
  return (
    <Flex
    h="100%"
    direction="column"
    >
        <PaymentMethodTable/>
    </Flex>
  )
}

export default PaymentMethods