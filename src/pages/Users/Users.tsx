import { useEffect } from "react";

function Users() {
  useEffect(() => {
		document.title = "Usuarios";
	},[]);
  
  return (
    <div>Users</div>
  )
}

export default Users