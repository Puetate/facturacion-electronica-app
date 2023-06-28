import { useEffect } from "react";
import { SupplierTable } from "./components";
import { Flex } from "@mantine/core";

function Suppliers() {
    useEffect(() => {
		document.title = "Proveedores";
	},[]);
  return (
    <Flex
    h="100%"
    direction="column"
    >
        <SupplierTable/>
    </Flex>
  )
}

export default Suppliers