import { useEffect } from "react";
import { Background, FormRegister } from ".";

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