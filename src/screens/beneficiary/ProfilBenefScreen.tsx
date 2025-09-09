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
    FlatList,
    Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../themes';
import { useSelector, useDispatch } from 'react-redux';
import { removeClientRequest } from '../../services/request';
import { useRoute } from '@react-navigation/native';
import { saveBenef} from '../../store/profilSlice';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { ApiContext } from '../../../App';


function ProfilBenefScreen({ navigation }: { navigation: any }) {

    const route = useRoute<any>();
    const {client} = route.params;
    const user = useSelector((state: any) => state.profil.user);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { photoUrl } = React.useContext(ApiContext);

    const devises = [
        { id: '1',  icon: require('../../assets/cad.png'), currency: 'CAD'},
        { id: '2',  icon: require('../../assets/us.png'), currency: 'USD' },
        { id: '3',  icon: require('../../assets/gb.png'), currency: 'GBP' },
        { id: '4',  icon: require('../../assets/ue.png'), currency: 'EUR'},
    ];

    const getPhotoUrl = (name: string) => {
        return photoUrl +  name;
    };


    function getInitials(phrase: string) {
        const words = phrase.split(' '); // Divise la phrase en mots
        if (words.length < 2) {
            // Si la phrase a moins de 2 mots, retourner les initiales du premier mot
            return words[0][0].toUpperCase();
        }

        // Retourne les initiales des deux premiers mots en majuscule
        return words[0][0].toUpperCase() + words[1][0].toUpperCase();
    }


    const deleteClient = () => {

        Alert.alert('', t('benef.Doyoureallywanttodeletethisbeneficiary'), [
            {
                text: t('cancel'),
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: t('delete'), onPress: () => confirmDelete() },
        ]);

    };


    const confirmDelete = () => {
        removeClientRequest(user.client.id.toString(), client.id.toString()).then((response: any) => {

            //console.log(response.data);
            navigation.goBack();

        }).catch((error: any) => {
            console.log(error);
        });
    };


    const send = () => {

        if (user.client.valider === '1') {
            dispatch(saveBenef(client));
            navigation.navigate('TransfertScreen');
        } else {

            if (user.client.valider === '2') {
                Toast.show({
                    type: 'alertMessage',
                    props: { text: t('homescreen.completeregistrationmessage') }
                });
            }
            navigation.navigate('kyc');
        }
    };


    const Header = () => {
        return (
            <View style={{
                marginTop: 20,
            }}>

                <View style={{ alignItems:'center' }}>
                    <View style={styles.avatar}>
                        {client.photo != null ?
                            <Image
                                source={{ uri: getPhotoUrl(client.photo) }}
                                style={styles.avatarImage}
                            />
                            :
                            <View >
                                <Text style={{ color: Colors.text, fontWeight: 'bold', fontSize: 26 }}> {getInitials(client.prenoms)} </Text>
                            </View>
                        }

                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: Colors.text, textAlign: 'center', paddingTop: 10, fontSize: 26, fontWeight: 'bold' }}> {client.prenoms}{' '}{client.nom} </Text>
                        <Text style={{ color: Colors.text, paddingTop: 0, marginTop: 3, fontSize: 16 }}> {client.telephone} </Text>
                    </View>


                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>

                        <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal:10 }}>
                            <TouchableOpacity
                                style={{
                                    height: 60,
                                    width: 60,
                                    borderRadius: 25,
                                    backgroundColor: '#e6e4e0',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}

                                onPress={() => { send()}}
                            >
                                <Feather name="send" size={26} color={Colors.text} />
                            </TouchableOpacity>
                            <View style={{ height: 50 }}>
                                <Text style={{ color: 'black', fontWeight: 'bold', marginTop: 5, textAlign: 'center' }}>{t('benef.send')}</Text>
                            </View>
                        </View>

                        <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
                            <TouchableOpacity
                                onPress={() => { deleteClient() }}
                                style={{
                                    height: 60,
                                    width: 60,
                                    borderRadius: 25,
                                    backgroundColor: 'red',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <AntDesign name="close" size={32} color={Colors.text} />
                            </TouchableOpacity>
                            <View style={{ height: 50 }}>
                                <Text style={{ color: 'black', fontWeight: 'bold', marginTop: 5, textAlign: 'center' }}>{t('benef.delete')}</Text>
                            </View>
                        </View>
                    </View>
                </View>


            </View>
        );
    };



    const getAccount = (devise:string) => {


        if (devise === 'CAD') {

            return devises[0].icon;
        }

        else if (devise === 'USD') {

             return devises[1].icon;
        }

        else if (devise === 'EUR') {

             return devises[2].icon;
        }

        else if  (devise === 'GBP') {

             return devises[3].icon;
        }

        return null;

    };



    const AccountItem = ({ item }: {item:any}) => (
        <View style={styles.accountItem}>
            <View style={{ flex: 1, flexDirection: 'row', height: 40, alignItems: 'flex-start', marginRight:10 }}>
                <Image
                    source={getAccount(item.devise)}
                    style={{
                        height: 40,
                        width: 40,
                        overflow: 'hidden',
                        borderWidth: 1,
                        borderRadius: 20,
                    }}
                />
                <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 17, color: Colors.text }}>
                    {item.devise}
                </Text>
            </View>
        </View>
    );


    return (
        <View style={styles.main}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between',  }} >
                <TouchableOpacity style={{
                    justifyContent: 'center',
                    backgroundColor: '#e6e4e0',
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    borderRadius: 20,
                }} onPress={() => { navigation.goBack(); }} >
                    <View>
                        <Ionicons name="chevron-back" color={Colors.text} size={24} />
                    </View>
                </TouchableOpacity>
            </View>


            <FlatList
                /*data={client.compte.filter((item:any) => {
                    return item.devise !== 'HPC';
                })}*/
                data={[]}
                renderItem={AccountItem}
                ListHeaderComponent={<Header /> }
                keyExtractor={item => item.idCompte.toString()}
                columnWrapperStyle={{
                    flex: 1,
                    justifyContent: 'space-between',
                }}
                    numColumns={2}
            />

        </View>
    );
}

const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding:20,
    },

    header: {
        height: 150,
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        padding: 30,
    },

    profif: {
        marginLeft: 0,
    },

    avatar: {
        width: 100,
        height: 100,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6e4e0',
    },

    avatarImage: {
        height: 100,
        width: 100,
        overflow: 'hidden',
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 50,
    },

    addButton: {
        height: 40,
        width: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        position: 'absolute',
        right: -5,
        bottom: -5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    addButtonIcon: {
        height: 30,
        width: 30,
    },

    usernameText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#ffffff',
        marginTop: 12,
    },

    accountItem: {
        height: 70,
        width:'48%',
        backgroundColor: '#e6e4e0',
        marginRight: 0,
        marginVertical: 10,
        borderRadius: 10,
        padding: 10,
    },
});


export default ProfilBenefScreen;
