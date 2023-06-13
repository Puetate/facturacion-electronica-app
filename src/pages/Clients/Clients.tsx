import { useEffect } from "react";

function Clients() {
  useEffect(() => {
		document.title = "Clientes";
	},[]);
  return (
    <div>Clients</div>
  )
}

export default Clients