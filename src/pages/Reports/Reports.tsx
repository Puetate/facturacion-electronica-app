import { useEffect } from "react";

function Reports() {
  useEffect(() => {
		document.title = "Reportes";
	},[]);
  return (
    <div>Reports</div>
  )
}

export default Reports