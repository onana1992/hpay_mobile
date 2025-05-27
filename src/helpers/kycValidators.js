
function isValidDateInput(input) {
	const date = new Date(input);
	return date instanceof Date && !isNaN(date.getTime());
}

function firstNameValidator(firstName) {
	if (!firstName) return "identitycreen.requiredvalue";
	return ''
}

function familyNameValidator(familyName) {
	if (!familyName) return "identitycreen.requiredvalue";
	return ''
}

function dateNaissValidator(dateNaiss) {

	if (!dateNaiss || undefined) {

		return "identitycreen.requiredvalue";
	} else if (!isValidDateInput(dateNaiss)) {
		return "identitycreen.invalidformat";

	}

	return '';
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
	

	if (!date || undefined) {

		return "identitycreen.requiredvalue";
	} else if (!isValidDateInput(date)) {
		return "identitycreen.invalidformat";

	}

	return '';
}




export {
	firstNameValidator, familyNameValidator,
	dateNaissValidator,
	nationalityValidator, emailValidator,
	countryValidator, townValidator, addressValidator,
	DocumentNumberValidator, DateExpValidator
}




