import { useContext } from "react";
import { LayoutContext } from "../context";

export const useLayout = () => {
	return useContext(LayoutContext);
};
