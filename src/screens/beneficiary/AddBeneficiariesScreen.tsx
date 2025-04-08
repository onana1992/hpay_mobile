/* eslint-disable curly */
/* eslint-disable no-alert */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */

import * as React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import { signOut } from '../../store/profilSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes';
import { useSelector, useDispatch } from 'react-redux';
import { saveBenef} from '../../store/profilSlice';
import { useTranslation } from 'react-i18next';
import { Searchbar } from 'react-native-paper';
import { addBenefRequest, fetchBeficiariesRequest, searchClientByPhoneRequest } from '../../services/request';
import LoadingModal from '../../components/LoadingModal';
import Toast from 'react-native-toast-message';



function AddBeneficiariesScreen({ navigation }: { navigation: any }) {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.profil.user);
    const [filePath, setFilePath] = React.useState(null);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [client, setClient] = React.useState<null | any>(null);
    const [modalVisible, setModalVisible] = React.useState<null | any>(null);
    const [messageVisible, setmessageVisible] = React.useState<boolean>(true);


    const lauchSponsorSearch = () => {

        setClient(null);
        setModalVisible(true);
        searchClientByPhoneRequest(searchQuery).then((response: any) => {
            console.log(response.data.response.data);
            setClient(response.data.response.data);
            setModalVisible(false);

        }).catch((_error: any) => {

            console.log(_error);

            setModalVisible(false);

           if (_error.response.status === 404) {
                Toast.show({
                    type: 'error',
                    text1: 'Non trouvé',
                    text2: "Aucun utlisateur HPay ne correspond à ce numéro.",
                    position: 'top'
                });
            } 

        });

    };


    const addBenef = () => {

        if (user.idLoginClient == client.idLoginClient) {

            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: "Impossible d'ajouter. Ce compte ce compte correspond au votre",
                position: 'top'
            });

        } else {

            setModalVisible(true);
            addBenefRequest(user.idLoginClient, client.idLoginClient).then((response: any) => {

                console.log(response.data);

                Toast.show({
                    type: 'success',
                    text1: t('success'),
                    text2: t('benef.addsuccess'),
                    position: 'top',
                });

                setModalVisible(false);
                setClient(null);
                setSearchQuery('');

            }).catch((_error: any) => {

                setModalVisible(false);
                setClient(null);
                setSearchQuery('');
                if (_error.response.status === 404) {
                    Toast.show({
                        type: 'error',
                        text1: t('Error'),
                        text2: t('benef.alreadyinyourbeneficiaries'),
                        position: 'top',
                    });
                } else {

                }

            });

        }

    };


    const EmptySearch = () => {

        return (
            <View style={styles.emptycard}>
                <Ionicons name="search-outline" size={80} />
                <Text style={{ color: Colors.text, paddingTop:10, }}>
                    Recherchez un béneficiaire
                </Text>
            </View>
        );
    };


    const getInitials = (phrase: string) => {

        const words = phrase.split(' '); // Divise la phrase en mots
        if (words.length < 2) {
            // Si la phrase a moins de 2 mots, retourner les initiales du premier mot
            return words[0][0].toUpperCase();
        }

        // Retourne les initiales des deux premiers mots en majuscule
        return words[0][0].toUpperCase() + words[1][0].toUpperCase();
    };



    return (
        <KeyboardAvoidingView
            enabled={true}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.main}
        >

            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}} >
                    <TouchableOpacity style={{
                        justifyContent: 'center',
                        backgroundColor: '#e6e4e0',
                        height: 40,
                        width: 40,
                        alignItems: 'center',
                        borderRadius: 20,
                    }} onPress={() => { navigation.goBack(); }} >
                        <View>
                            <Ionicons name="close-outline" color={Colors.text} size={24} />
                        </View>
                    </TouchableOpacity>

                    <View>
                    </View>
                </View>
            </View>

            <View style={{ }}>
                <ScrollView style={{ marginBottom:45 }}>

                    <View style={{  }}>
                        <Text style={styles.title}>Ajoutez un bénéficiaire</Text>
                    </View>

                    <View style={{ marginTop: 20, flexDirection: 'row', width: '100%', }}>
                        <Searchbar
                            placeholder="Numéro de téléphone"
                            onChangeText={setSearchQuery}
                            value={searchQuery}
                            onIconPress={() => {lauchSponsorSearch(); }}
                            onSubmitEditing={() => {lauchSponsorSearch(); }}
                            keyboardType="numeric"
                            style={{ flex: 1, backgroundColor: '#ffffff', borderColor: 'gray', borderWidth: 1 }}
                        />
                    </View>

                    { messageVisible &&
                        <View style={{
                            marginTop: 20,
                            width: '100%',
                            backgroundColor: '#e6e4e0',
                            padding: 10,
                            borderRadius: 10,
                            flexDirection: 'row'

                        }}>
                            <TouchableOpacity onPress={() => { setmessageVisible(false) }}>
                                <Ionicons name="close-outline" color={Colors.text} size={22} />
                            </TouchableOpacity>
                            <View style={{paddingHorizontal:5 }}>
                                <Text style={{ color: Colors.text, paddingHorizontal:5 }}>Entrez le numéro de télephone avec l'indicatif du pays. Ex: 14388833759</Text>
                            </View>
                        </View>
                    }


                    <View style={{
                        flex: 1,
                        width: "100%",
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 60,
                        paddingHorizontal:0
                    }}>
                        {
                            client &&
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.avatar}>
                                        { client.client.photoClient!=null ?
                                            <Image
                                                source={{ uri: client.client.photoClient} }
                                                style={styles.avatarImage}
                                            />
                                            :
                                            <View style={{} }>
                                                    <Text style={{ color: Colors.text, fontWeight: 'bold', fontSize: 26 }}>{getInitials(client?.client?.prenoms)}</Text>
                                            </View>

                                        }
                                </View>

                                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
                                    <Text style={{ textAlign: 'center', color: Colors.text, paddingTop: 10, fontSize: 26, fontWeight: 'bold' }}>{client?.client?.prenoms} {client?.client?.nom} </Text>
                                    <Text style={{ textAlign: 'center', color: Colors.text, paddingTop: 0, marginTop: 3, fontSize: 14 }}> {client?.login}</Text>
                                </View>
                            </View>
                        }

                        {
                            !client &&
                            <View style={{ alignItems: 'center', marginTop: 20, width: "100%", }}>
                                    {/*<EmptySearch/>*/}
                            </View>
                        }
                    </View>

                </ScrollView>
            </View>


            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom:10 }}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    {/*<View style={{ flex: 1, marginRight:20 }}>
                        <TouchableOpacity style={styles.cancelbutton}>
                            <Text style={styles.cancelbuttonText}>Annuler</Text>
                        </TouchableOpacity>
                    </View>*/}

                    <View style={{ flex: 1 }}>
                        <TouchableOpacity disabled={!client} style={client ? styles.addbutton : styles.addbuttonDisabled} onPress={() => { addBenef()}}>
                            <Text style={styles.addbuttonText}>Ajouter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <LoadingModal setModalVisible={setModalVisible} modalVisible={modalVisible} />

        </KeyboardAvoidingView>
    );

}

const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },

    title: {
        color: Colors.text,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingVertical: 5,
        marginTop: 10,
    },

    avatar: {
        width: 100,
        height: 100,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    avatarImage: {
        height: 100,
        width: 100,
        overflow: 'hidden',
        borderWidth: 1,
        borderRadius: 60,
    },

    searchImage: {

        marginTop:40,
        height: 120,
        width: 120,
        overflow: 'hidden',

    },

    addrow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
    },

    addrowText: {
        fontSize: 16,
        color: Colors.text,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
    },

    display: {
        marginTop: 5,
        padding: 5,
        backgroundColor: Colors.background,
        borderRadius: 20,
    },

    item: {
        paddingVertical: 10,
    },

    name: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.text,
    },

    phone: {
        fontSize: 12,
        color: 'gray',
    },

    benefavatar: {
        width: 50,
        height: 50,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },

    cancelbutton: {
        height: 50,
        backgroundColor: Colors.background,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:'center',
    },

    addbutton: {
        height: 50,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    addbuttonDisabled: {
        height: 50,
        backgroundColor: Colors.primary1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cancelbuttonText: {
        color: Colors.text,
        fontWeight: 'bold',
        fontSize: 16,
    },

    addbuttonText: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 16,
    },

    emptycard: {
        marginTop: 20,
        backgroundColor: '#e6e4e0',
        width:'100%',
        padding: 20,
        borderRadius: 10,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
    },


});


export default AddBeneficiariesScreen;
