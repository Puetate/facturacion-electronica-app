import { useEffect } from "react";

function Companies() {
  useEffect(() => {
		document.title = "Compañías";
	},[]);
  return (
    <div>Companies</div>
  )
}

export default Companies