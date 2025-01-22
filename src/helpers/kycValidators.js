function firstNameValidator(firstName) {
	return ''
}

function familyNameValidator(familyName) {
	if (!familyName) return "identitycreen.requiredvalue";
	return ''
}

function dateNaissValidator(dateNaiss) {
	if (!dateNaiss || undefined) return "identitycreen.requiredvalue"
	return ''
}

function nationalityValidator(nationality) {
	if (!nationality) return "identitycreen.requiredvalue";
	return ''
}


function emailValidator(email) {
	if (!email) return "identitycreen.requiredvalue";

	const re = /\S+@\S+\.\S+/
	if (!email) {
		return '';
	}
	else {
		if (!re.test(email)) return 'Adresse email invalide'
		return '';
	}
}


function countryValidator(country) {
	if (!country) return "identitycreen.requiredvalue";
	return '';
}


function townValidator(town) {
	if (!town) return "identitycreen.requiredvalue";
	return '';
}

function addressValidator(address) {
	if (!address) return "identitycreen.requiredvalue";
	return ''
}

function DocumentNumberValidator(number) {
	if (!number) return "identitycreen.requiredvalue";
	return ''
}

function DateExpValidator(date) {
	if (!date) return "identitycreen.requiredvalue";
	return ''
}




export {
	firstNameValidator, familyNameValidator,
	dateNaissValidator,
	nationalityValidator, emailValidator,
	countryValidator, townValidator, addressValidator,
	DocumentNumberValidator, DateExpValidator
}




