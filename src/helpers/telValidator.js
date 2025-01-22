
export function telValidator1(tel) {
	if (!tel) return "signinscreen.requiredvalue"
	return ''
}


export function telValidator(tel) {
	if (!tel) return "signupscreen.requiredvalue"
	/*if (tel.length < 5) return 'Le numero de telephone doit avoir au moins 5 caracteres'*/
	return ''
}


