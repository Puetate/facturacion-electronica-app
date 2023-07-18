import { Flex } from "@mantine/core";
import { useEffect } from "react";
import MainTabs from "./components/Tabs";

function Reports() {
  useEffect(() => {
		document.title = "Reportes";
	},[]);
  return (
    <Flex
    h="100%"
    direction="column"
    >
        <MainTabs/>
    </Flex>
  )
  
}

export default Reports