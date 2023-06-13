import { useEffect } from "react";

function Purchases() {
  useEffect(() => {
		document.title = "Compras";
	},[]);
  return (
    <div>Purchases</div>
  )
}

export default Purchases