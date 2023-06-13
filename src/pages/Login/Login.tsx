import { useEffect } from "react";
import { Background, FormLogin } from "./components";

export default function Login() {
	useEffect(() => {
		document.title = "Login";
	},[]);
	return (
		
		<Background>
			
			<FormLogin />
		</Background>
	);
}
