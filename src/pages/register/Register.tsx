import { useEffect } from "react";
import { Background, FormRegister } from "./components";

function Register() {
    useEffect(() => {
		document.title = "Registro";
	},[]);
	return (
		
		<Background>
			
			<FormRegister />
		</Background>
	);
}

export default Register