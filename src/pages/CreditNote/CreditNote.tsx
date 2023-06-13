import { useEffect } from "react";

function CreditNote() {
  useEffect(() => {
		document.title = "Nota de Crédito";
	},[]);
  return (
    <div>CreditNote</div>
  )
}

export default CreditNote