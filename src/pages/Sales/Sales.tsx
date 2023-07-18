import { Flex } from "@mantine/core";
import { useEffect } from "react";
import { BillInfo, ClientSection, Controls, ProductsSection } from "./components";
import { useSalesStore } from "./store";

function Sales() {
  const { clearStore } = useSalesStore((state) => ({ clearStore: state.clearStore }));
  useEffect(() => {
    return () => {
      clearStore();
    }
  }, [])
  return (
    <Flex h="100%" direction="column" gap="xl">
      <ClientSection />
      <ProductsSection />
      <BillInfo />
      <Controls />
    </Flex>
  )
}

export default Sales