export function validateIdentification(identification: string): boolean {
    // Eliminar espacios en blanco y guiones
    identification = identification.replace(/\s|-/g, '');

    // Validar cédula
    const cedulaRegex = /^[0-9]{10}$/;
    if (cedulaRegex.test(identification)) {
        const provincia = parseInt(identification.substr(0, 2), 10);
        const tercerDigito = parseInt(identification.charAt(2), 10);
        const coeficiente = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        let suma = 0;
        let verificador = parseInt(identification.charAt(9), 10);

        if (provincia >= 1 && provincia <= 24 && tercerDigito < 6) {
            for (let i = 0; i < 9; i++) {
                let valor = parseInt(identification.charAt(i), 10) * coeficiente[i];
                if (valor >= 10) {
                    valor -= 9;
                }
                suma += valor;
            }
            suma %= 10;
            if ((suma === 0 && verificador === 0) || (suma !== 0 && verificador === 10 - suma)) {
                return true;
            }
        }
    }

    // Validar RUC (persona jurídica o entidad pública)
    const rucRegex = /^[0-9]{13}$/;
    if (rucRegex.test(identification)) {
        const cedula = identification.substring(0, 10);
        const cod = identification.substring(10);
        
        if (validateIdentification(cedula) && cod == "001") return true;
        return false;
    }

    return false;
}
