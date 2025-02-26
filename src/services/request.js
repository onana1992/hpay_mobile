import { client, client2 } from "./axiosClient";



export function signInRequest(login, password) {
    return client.post(`/auth/signin`,

        {
            "login": login,
            "password": password,
        }

    );
}


export function signUpRequest(login, password) {
    return client.post(`/auth/signup`,

        {
            "login": login,
            "password": password,
            "idPays": 9,
            "idVille": 560
        }

    );
}

export function verifyTelRequest(idLogin, code) {
    return client.post(`/auth/validate`,

        {
            "idLoginClient": idLogin,
            "activationCode": code
        }

    );
}

//update activation code
export function updateActivationCodeRequest(idLogin) {
    return client.post(`/auth/updateActivationCode/${idLogin}`,

        {

        }

    );
}


// post client identity
export function PostIdentityRequest(idclient, name, firstName, sex, dateNaiss) {
    return client.post(`/auth/infoClient/${idclient}`,

        {
            "nom": name,
            "prenoms": firstName,
            "dateNaissance": dateNaiss,
            "lieuNaissance": '',
            "sex": sex
        }

	);
}


// add email to a client
export function postEmailRequest(idclient,email) {
    return client.post(`/auth/2faemail/${idclient}/${email}`,

        {
           
        }

    );
}

// verify email
export function verifyEmailRequest(idLogin, code) {
    return client.post(`/auth/validate/email`,

        {
            "idLoginClient": idLogin,
            "activationCode": code
        }

    );
}


//search client by phone
export function searchClientByPhoneRequest(phone) {
    return client.get(`/auth/client/search/${phone}`);
}


//add sponsorship to a new client
export function addParrain(parrainee,parrain) {
    return client.post(`/auth/addparrainage/${parrainee}/${parrain}`,

        {
           
        }

    );
}


// fetch all the country
export function getPaysRequest() {
    return client.get(`/pays`);
}


//password forgot code request
export function passforgotCodeRequest(phone) {
    return client.get(`/auth/passwordforgot/requestcode/${phone}`);
}


//verify phone number for passord recover
export function passforgotVerifyPhoneRequest(phone,code) {
    return client.get(`/auth/passwordforgot/validatecode/${phone}/${code}`);
}


//update  the  password
export function passforgotUpdatePasswordRequest(phone, newPassword) {
    return client.get(`/auth/passwordforgot/update/${phone}/${newPassword}`);
}


//Save kyc
export function saveKyc(formData) {

    return client2.post(
        `/kyc/save`,
        formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Required for file uploads
            },
        }
        
    );

}




export function postKycRequest(data) {

    console.log(data.idtype_piece);

    return client.post(`/kyc_submit`,

        {
            "idclient": data.idclient,
            "nom": data.nom,
            "prenoms": data.prenoms,
            "sexe": data.sexe,
            "statut_mat": data.statut_mat,
            "date_naissance": data.date_naissance,
            "lieu_naissance": data.lieu_naissane,
            "nationalite": data.nationalite,
            "adresse": data.adresse,
            "id_pays": data.pays,
            "id_ville": data.ville,
            "telephone": data.telephone,
            "telephone2": data.telephone2,
            "email": data.email,
            "idtype_piece": data.idtype_piece,
            "piece_cni": 1,
            "num_piece_cni": "",
            "date_expire_cni": null,
            "piece_passport": 2,
            "num_piece_passport": "",
            "date_expire_passport": null,
            "piece_carte": 3,
            "num_piece_carte": "",
            "date_expire_carte": null,
            "photo_piece_recto": data.photo_piece_recto,
            "photo_piece_verso": data.photo_piece_verso,
            "expire_piece": data.expire_piece,
            "num_piece": data.num_piece,
            
        }
        
    );
}



