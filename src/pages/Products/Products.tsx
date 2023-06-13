import { useEffect } from "react";

function Products() {
  useEffect(() => {
		document.title = "Productos";
	},[]);
  return (
    <div>Products</div>
  )
}

export default Products