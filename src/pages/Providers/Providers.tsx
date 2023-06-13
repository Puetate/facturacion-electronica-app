import { useEffect } from "react";

function Providers() {
  useEffect(() => {
		document.title = "Proveedores";
	},[]);
  return (
    <div>Providers</div>
  )
}

export default Providers