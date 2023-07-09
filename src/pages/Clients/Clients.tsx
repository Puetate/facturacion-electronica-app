import { Flex } from "@mantine/core";
import { useEffect } from "react";
import { ClientTable } from "./components";

function Clients() {
  useEffect(() => {
		document.title = "Clientes";
	},[]);
  return (
    <Flex
    h="100%"
    direction="column"
    >
        <ClientTable/>
    </Flex>
  )
}

export default Clients