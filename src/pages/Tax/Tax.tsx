import { Flex } from "@mantine/core";
import { useEffect } from "react";
import { TaxTable } from "./components";

function Tax() {
  useEffect(() => {
		document.title = "Impuesto";
	},[]);
  
  return (
    <Flex
    h="100%"
    direction="column"
    >
        <TaxTable/>
    </Flex>
  )
}

export default Tax