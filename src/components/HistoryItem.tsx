/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import React from 'react';
import {  Text, StyleSheet, View, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '../themes';
import { ApiContext } from '../../App';


type PropType = {
    user:any
    clientFrom: any,
    clientTo: any,
    compteFrom: any,
    compteTo: any,
    montant: string,
    montantFrom: string,
    montantTo: string,
    devise: string,
    heure: string
    index: number
    size: number
    taux:number
}




export default function HistoryItem({user, clientFrom, clientTo, compteFrom, compteTo, montant, montantFrom, montantTo, devise, heure, index,size, taux }: PropType) {

    const { t } = useTranslation();
    const { photoUrl, setPhotoUrl } = React.useContext(ApiContext);

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


    if (clientTo.id !== clientFrom.id && clientFrom.id === user.client.id) {

        // l'utlisateur est l'émetteur
        return (
            <View style={{ flexDirection: 'row', marginTop: 25, padding: 5, paddingBottom: 10, borderBottomColor: Colors.gray, borderBottomWidth: index + 1 === size ? 0 : 0.4 }}>
                <View style={{ flex: 1, }}>
                    <View style={{
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }} onPress={() => { }} >
                        <View style={styles.avatar} >
                            {clientTo.photoClient != null ?
                                <Image
                                    source={{ uri: getPhotoUrl(clientTo.photoClient) }}
                                    style={styles.avatarImage}
                                />
                                :
                                <View style={{}}>
                                    <Text style={{ color: Colors.text, fontWeight: 'bold', fontSize: 16 }}>{getInitials(clientTo.prenoms)}</Text>
                                </View>

                            }
                        </View>
                        {/*
                           <View style={{}} >
                            <Image
                                source={currencyIcon(compteTo?.devise)}
                                style={styles.currencyImage}
                            />
                        </View> 
                        */}
                    </View>

                </View>

                <View style={{ flex: 5, alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: 25 }}>
                    <Text style={{ lineHeight: 15, fontWeight: 'bold', fontSize: 16, color: Colors.text }}>{t('transaction.transfersentto')}</Text>
                    <Text style={{ lineHeight: 20, fontSize: 14, color: Colors.gray }}>{clientTo.prenoms} {clientTo.nom}</Text>
                    <Text style={{ lineHeight: 20, fontSize: 14, color: Colors.gray }}>{heure}</Text>
                </View>

                <View style={{ flex: 3, alignItems: 'flex-end' }}>
                    <Text style={{ lineHeight: 20, fontSize: 14, color: 'red' }} >- {Number(montantFrom).toFixed(2)} {compteFrom.devise}</Text>
                </View>
            </View>
        );
    }

    else if (clientTo.id !== clientFrom.id && clientTo.id === user.client.id) {

        // l'utlisateur est recepteur
        return (
            <View style={{ flexDirection: 'row', marginTop: 25, padding: 5, paddingBottom: 10, borderBottomColor: Colors.gray, borderBottomWidth: index + 1 === size ? 0 : 0.4 }}>
                <View style={{ flex:1, }}>
                    <View style={{
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }} onPress={() => { }} >
                        <View style={styles.avatar} >
                            {clientFrom.photoClient != null ?
                                <Image
                                    source={{ uri: getPhotoUrl(clientFrom.photoClient) }}
                                    style={styles.avatarImage}
                                />
                                :
                                <View style={{}}>
                                    <Text style={{ color: Colors.text, fontWeight: 'bold', fontSize: 16 }}>{getInitials(clientFrom.prenoms)}</Text>
                                </View>

                            }
                        </View>

                        {/*
                            <View style={{}} >
                                <Image
                                    source={currencyIcon(compteFrom?.devise)}
                                    style={styles.currencyImage}
                                />
                            </View>
                         */}

                    </View>

                </View>

                <View style={{ flex: 5, alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: 25 }}>
                    <Text style={{ lineHeight: 15, fontWeight: 'bold', fontSize: 16, color: Colors.text }}>{t('transaction.Transferreceivedfrom')}</Text>
                    <Text style={{ lineHeight: 20, fontSize: 14, color: Colors.gray }}>{clientFrom.prenoms} {clientFrom.nom}</Text>
                    <Text style={{ lineHeight: 20, fontSize: 14, color: Colors.gray }}>{heure}</Text>
                </View>

                <View style={{ flex: 3, alignItems: 'flex-end' }}>
                    <Text style={{ lineHeight: 20, fontSize: 14, color: 'green' }} >+ {Number(montantTo).toFixed(2)} {compteTo.devise}</Text>
                </View>

            </View>
        );
    }


    else if (clientTo.id === clientFrom.id && clientTo.id === user.client.id) {

        // transfert entre compte
        return (
            <View style={{ flexDirection: 'row', marginTop: 25, padding: 5, paddingBottom: 10, borderBottomColor: Colors.gray, borderBottomWidth: index + 1 === size ? 0 : 0.4 }}>
                <View style={{ flex: 1, }}>
                    <View style={{
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }} onPress={() => { }} >
                        <View style={styles.avatar} >
                            {clientFrom.photoClient != null ?
                                <Image
                                    source={{ uri: getPhotoUrl(clientFrom?.photoClient) }}
                                    style={styles.avatarImage}
                                />
                                :
                                <View style={{}}>
                                    <Text style={{ color: Colors.text, fontWeight: 'bold', fontSize: 16 }}>{getInitials(clientFrom.prenoms)} </Text>
                                </View>

                            }
                        </View>
                        {/*
                        <View style={{}} >

                            <Image
                                source={currencyIcon(compteTo?.devise)}
                                style={styles.currencyImageTo}
                            />

                        </View>
                        */}
                        {/*
                        <View style={{}} >

                            <Image
                                source={currencyIcon(compteFrom?.devise)}
                                style={styles.currencyImageFrom}
                            />

                        </View>*/}

                    </View>

                </View>

                <View style={{ flex: 5, alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: 25 }}>
                    <Text style={{ lineHeight: 15, fontWeight: 'bold', fontSize: 16, color: Colors.text }}>{t('transaction.transferbetweenaccounts')}</Text>
                    <Text style={{ lineHeight: 20, fontSize: 14, color: Colors.gray }}>{clientFrom.prenoms} {clientFrom.nom}</Text>
                    <Text style={{ lineHeight: 20, fontSize: 14, color: Colors.gray }}>{heure}</Text>
                </View>

                <View style={{ flex: 3, alignItems: 'flex-end' }}>
                    <Text style={{ lineHeight: 20, fontSize: 14, color: 'green' }} >+ {(Number(montantTo)).toFixed(2)}  {compteTo.devise }</Text>
                    <Text style={{ lineHeight: 20, fontSize: 14, color: 'red' }} >- {(Number(montantFrom)).toFixed(2)}  {compteFrom.devise}</Text>
                </View>

            </View>
        );
    }

    return (
        <View>

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

    avatar: {
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
        left:-20,
    },


    currencyImageTo: {
        position: 'relative',
        height: 20,
        width: 20,
        overflow: 'hidden',
        top: -20,
        left: -17,
    },

    currencyImageFrom: {
        position: 'relative',
        height: 20,
        width: 20,
        overflow: 'hidden',
        top: 20,
        left: -37,
    },

});