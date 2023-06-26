import { Flex } from "@mantine/core";
import { useEffect } from "react";
import { PromotionTable } from "./components";

function Promotions() {
  useEffect(() => {
		document.title = "Promociones";
	},[]);
  return (
    <Flex
    h="100%"
    direction="column"
    >
        <PromotionTable/>
    </Flex>
  )
}

export default Promotions