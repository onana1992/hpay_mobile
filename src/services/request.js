import { client } from "./axiosClient";

export function signInRequest(login,password) {
    return client.get(`/signin?phone=${login}&password=${password}`);

}

export function signUpRequest(login, password) {
    return client.get(`/signup?phone=${login}&password=${password}`);
}


export function verifyTelRequest(login,code) {
    return client.get(`/code-validation?phone=${login}&code=${code}`);
}


export function PostIdentityRequest(idclient, name, firstName, sex, dateNaiss) {
    return client.post(`/submit-identity`,

		{
            "idclient": idclient,
            "name": "Onana",
            "firstname": "Joe Junior",
            "sex": "M",
            "datenaiss": "1992-04-09"
		}

	);
}

export function PostEmailRequest(idclient,email) {
    return client.post(`/submit-email`,

        {
            "idclient": idclient,
            "email": email
        }

    );
}


export function getPaysRequest(login, code) {
    return client.get(`/get_pays`);
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



