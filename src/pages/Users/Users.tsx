import { Flex } from "@mantine/core";
import { useEffect } from "react";
import { UserTable } from "./components";

function Users() {
  useEffect(() => {
		document.title = "Usuarios";
	},[]);
  
  return (
    <Flex
    h="100%"
    direction="column"
    >
        <UserTable/>
    </Flex>
  )
}

export default Users