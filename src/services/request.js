import { client, client2 } from "./axiosClient";


// sign in request
export function signInRequest(login, password) {
    return client.post(`/auth/signin`,

        {
            "login": login,
            "password": password,
        }

    );
}


//signup request
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


//verification of the phone number
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


// Renew password request
export function passforgotUpdatePasswordRequest(phone, password) {
    return client.get(`/auth/passwordforgot/update/${phone}/${password}`);
}


//search client by phone
export function searchClientByPhoneRequest(phone) {
    return client.get(`/auth/client/search/${phone}`);
}


//search client by sponsorShipCode
export function searchClientBySponsorShipCodeRequest(code) {
    return client.get(`/auth/client/parrain/${code}`);
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


// fetch all the country with no cities
export function getPaysRequest1() {
    return client.get(`/pays/allwithnocity`);
}


// fetch all the cities
export function getVilleRequest(idPays) {
    return client.get(`/ville/pays/${idPays}`);
}


//password forgot code request
export function passforgotCodeRequest(phone) {
    return client.get(`/auth/passwordforgot/requestcode/${phone}`);
}



//verify phone number for passord recover
export function passforgotVerifyPhoneRequest(phone,code) {
    return client.get(`/auth/passwordforgot/validatecode/${phone}/${code}`);
}




//add sponsorship to a new client
export function removeClientRequest(idClient, idBenef) {
    return client.post(`/benef/remove`,

        {
            "idclient": idClient, 
            "idbenef": idBenef
        }

    );
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


// fetch list of beneficiaries
export function fetchBeficiariesRequest(IdLoginClient) {
    return client.get(`/benef/list/${IdLoginClient}`);
}



//add beneficiaire
export function addBenefRequest(idLoginClient, idLoginBeneficiaire) {
    return client.post(`/benef/add`,

        {
            "idclient": idLoginClient,
            "idbenef": idLoginBeneficiaire
        }

    );
}


// fetch list of beneficiaries

export function fetchBeficiariesInMyContactRequest(IdLoginClient, PhoneList) {
    return client.post(`/benef/incontact/list`,

        {
            "idclient": IdLoginClient, //idloginClient
            "list": PhoneList
        }

    );
}




// add a list of beneficiarres
export function addBenefListRequest(idLoginClient,listIdClients) {
    return client.post(`/benef/incontact/list/add/${idLoginClient}`,

        {
            "beneficiaireIds": listIdClients,
        }

    );
}



// fetch currency rate 
export function currencyRateRequest(currencyFrom, currencyTo) {
    return client.post(`https://taux.hpaytest.cash/calculate_rate/calculate_rate.php`,

        {
            
            "currencyFrom": currencyFrom,
            "currencyTo": currencyTo
        
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



