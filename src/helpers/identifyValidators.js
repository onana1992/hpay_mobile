
function firstNameValidator(firstName) {
	return ''
}

function familyNameValidator(familyName) {
	if (!familyName) return "identitycreen.requiredvalue";
	/*if (tel.length < 5) return 'Le numero de telephone doit avoir au moins 5 caracteres'*/
	return ''
}

function dateNaissValidator(dateNaiss) {

	if (!dateNaiss || undefined) return "identitycreen.requiredvalue"
	return ''
}

export { firstNameValidator, familyNameValidator, dateNaissValidator }
