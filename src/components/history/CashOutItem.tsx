/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */

import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../themes';
import { ApiContext } from '../../../App';



type PropType = {
    id: string,
    montant: string,
    total: string,
    devise: string,
    urlPhoto: string,
    nom: string,
    prenom: string,
    frais: string,
    telephone: string,
    date: string,
    heure: string
}



export default function CashOutItem ({ id, montant, total, devise, urlPhoto, nom, prenom, frais, telephone, date, heure }: PropType) {

    const { t } = useTranslation();
    const { photoUrl, setPhotoUrl } = React.useContext(ApiContext);

    //console.log(urlPhoto);


    const getInitials = (phrase: string) => {

        const words = phrase.split(' '); // Divise la phrase en mots

        if (words.length < 2) {
            // Si la phrase a moins de 2 mots, retourner les initiales du premier mot
            return words[0][0].toUpperCase();
        }

        // Retourne les initiales des deux premiers mots en majuscule
        return words[0][0].toUpperCase() + words[1][0].toUpperCase();
    };


    const getPhotoUrl = (name: string) => {
        return photoUrl + name;
    };



    return (

        <View style={{ flexDirection: 'row', marginTop: 25, padding: 5, paddingBottom: 10, borderBottomColor: Colors.gray, /*borderBottomWidth: index + 1 === size ? 0 : 0.4 */ }}>

            <View style={{ flex: 1, }}>
                <View style={{
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    alignItems: 'center',
                }} onPress ={() => { }} >
                    <View style={styles.avatar} >
                        {urlPhoto != null ?
                            <Image
                                source={{ uri: getPhotoUrl(urlPhoto) }}
                                style={styles.avatarImage}
                            />
                            :
                            <View style={{}}>
                                <Text style={{ color: Colors.text, fontWeight: 'bold', fontSize: 16 }}>{getInitials(prenom)}</Text>
                            </View>
                        }
                    </View>
                </View>
            </View>

            <View style={{ flex: 5, alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: 25 }}>
                <Text style={{ lineHeight: 15, fontWeight: 'bold', fontSize: 16, color: Colors.text }}>{t('transaction.cashout')}</Text>
                <Text style={{ lineHeight: 20, fontSize: 14, color: Colors.gray }}>{prenom} {nom}</Text>
                <Text style={{ lineHeight: 20, fontSize: 14, color: Colors.gray }}>{heure}</Text>
            </View>

            <View style={{ flex: 3, alignItems: 'flex-end' }}>
                <Text style={{ lineHeight: 20, fontSize: 14, color: 'red' }}> - {Number(total).toFixed(2)} {devise} </Text>
            </View>

        </View>
    );


}


const styles = StyleSheet.create({

    avatarImage: {
        height: 50,
        width: 50,
        overflow: 'hidden',
        borderColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 25,
    },

    avatar : {
        width: 50,
        height: 50,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6e4e0',
    },

    currencyImage: {
        position: 'relative',
        height: 20,
        width: 20,
        overflow: 'hidden',
        top: 20,
        left: -20,
    },


    currencyImageTo : {
        position: 'relative',
        height: 20,
        width: 20,
        overflow: 'hidden',
        top: -20,
        left: -17,
    },


    currencyImageFrom : {
        position: 'relative',
        height: 20,
        width: 20,
        overflow: 'hidden',
        top: 20,
        left: -37,
    },

});