import { useTranslation } from 'react-i18next';

export function confirmPasswordValidator(password, confirmPassword) {


	if (!confirmPassword) return "signinscreen.requiredvalue";
	if (password != confirmPassword) return "signupscreen.differentfrompassword"
	return ''
}