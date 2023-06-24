import { Flex } from "@mantine/core";
import { useEffect } from "react";
import { CategoryTable } from "./components";

function Categories() {
  useEffect(() => {
		document.title = "Categorías";
	},[]);
  return (
    <Flex
    h="100%"
    direction="column"
    >
        <CategoryTable/>
    </Flex>
  )
}

export default Categories