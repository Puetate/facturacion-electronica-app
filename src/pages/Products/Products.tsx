import { Flex } from "@mantine/core";
import { useEffect } from "react";
import { ProductTable } from "./components";

function Products() {
  useEffect(() => {
		document.title = "Productos";
	},[]);
  return (
    <Flex
    h="100%"
    direction="column"
    >
        <ProductTable/>
    </Flex>
  )
}

export default Products