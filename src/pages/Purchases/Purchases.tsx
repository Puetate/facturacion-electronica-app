import { Flex } from "@mantine/core";
import { useEffect } from "react";
import { PurchaseTable } from "./components";

function Purchases() {
  useEffect(() => {
		document.title = "Compras";
	},[]);
  return (
    <Flex
    h="100%"
    direction="column"
    >
        <PurchaseTable/>
    </Flex>
  )
}

export default Purchases