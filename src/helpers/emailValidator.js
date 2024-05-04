
export function emailValidator(email) {
	const re = /\S+@\S+\.\S+/
	if (!email) return "Valeur requise"
	if (!re.test(email)) return 'Adresse email invalide'
	return ''
}