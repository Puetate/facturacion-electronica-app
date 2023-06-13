import { useEffect } from "react";

function Categories() {
  useEffect(() => {
		document.title = "Categorías";
	},[]);
  return (
    <div>Categories</div>
  )
}

export default Categories