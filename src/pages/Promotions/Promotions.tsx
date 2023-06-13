import { useEffect } from "react";

function Promotions() {
  useEffect(() => {
		document.title = "Promociones";
	},[]);
  return (
    <div>Promotions</div>
  )
}

export default Promotions