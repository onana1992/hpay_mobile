
export function passwordValidator(password) {


	var checkpassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/

	if (!password) return "signupscreen.requiredvalue";

	if (!password.match(checkpassword)) return "signupscreen.passwordinvalidformat";

	/*if (password.length < 5) return 'Le mot de passe doit avoir au moins 5 caracteres'*/
	
	return ''
}

export function passwordValidator1(password) {
	if (!password) return "signinscreen.requiredvalue";
	return ''
}
passwordValidator1