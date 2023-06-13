import { useEffect } from "react";

function Tax() {
  useEffect(() => {
		document.title = "Impuesto";
	},[]);
  
  return (
    <div>Tax</div>
  )
}

export default Tax