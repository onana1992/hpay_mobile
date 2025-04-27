/* eslint-disable react-hooks/exhaustive-deps */
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
    RefreshControl,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../themes';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Searchbar } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
import { fetchBeficiariesRequest, fetchBeficiariesInMyContactRequest } from '../../services/request';
import { saveBenefs, saveNewClients } from '../../store/profilSlice';
import Contacts from 'react-native-contacts';
import AvartarButton from '../../components/connected/AvartarButton';


function BeneficiariesScreen({ navigation }: { navigation: any }) {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [visible, setVisible] = React.useState(false);
    const user = useSelector((state: any) => state.profil.user);
    const newClients = useSelector((state: any) => state.profil.newClients);
    const benefs = useSelector((state: any) => state.profil.benefs);
    const [filePath, setFilePath] = React.useState(null);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [hasPermission, setHasPermission] = React.useState(false);
    const [contacts, setContacts] = React.useState<number[]>([]);


    useFocusEffect(
        React.useCallback(() => {
            checkPermissions();
            getBeneficiaries();
            fetchContacts();

            return () => {

            };

        }, [])
    );


    function getInitials(phrase: string) {
        const words = phrase.split(' '); // Divise la phrase en mots
        if (words.length < 2) {
            // Si la phrase a moins de 2 mots, retourner les initiales du premier mot
            return words[0][0].toUpperCase();
        }

        // Retourne les initiales des deux premiers mots en majuscule
        return words[0][0].toUpperCase() + words[1][0].toUpperCase();
    }



    const getBeneficiaries = () => {

       // alert(user.idLoginClient); 

        fetchBeficiariesRequest(user.idLoginClient).then((response: any) => {
            dispatch(saveBenefs(response.data.response.data));
            setIsRefreshing(false);

        }).catch((error: any) => {

            console.log(error.response.data);

        });
    };


    const onRefresh = () => {
        getBeneficiaries();
        fetchContacts();
    };


    const checkPermissions = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setHasPermission(true);
            } else {
               // console.log('Permission denied');
            }
        } else {
            setHasPermission(true); // iOS automatically handles permissions
        }
    };


    const fetchContacts = () => {
        if (hasPermission) {
            Contacts.getAll()
                .then(contacts => {

                    const phoneNumbersArray = contacts
                        .map(contact => contact.phoneNumbers)  // Get phone numbers from each contact
                        .flat()  // Flatten the array of phone numbers
                        .map(phone => {
                            // Remove '+', '(', ')', '-', and white spaces and convert to Number
                            const cleanedNumber = phone.number.replace(/[+\s\(\)\-]/g, '');
                            return Number(cleanedNumber);  // Convert to Number
                        })
                        .filter((phone) => {
                            return phone !== Number(user.login);
                        });

                   // console.log(phoneNumbersArray);

                    setContacts(phoneNumbersArray);
                    getClientInMyContact(phoneNumbersArray);

                })
                .catch(error => {
                    //console.log('Error fetching contacts:', error);
                });
        } else {
           // console.log('Permission not granted');
        }
    };



    const getClientInMyContact = (contactList) => {

        fetchBeficiariesInMyContactRequest(user.idLoginClient, contactList ).then((response: any) => {
          //  console.log(response.data.response.data);
           dispatch(saveNewClients(response.data.response.data));
        }).catch((error: any) => {

            console.log(error.response.data);

        });

    };


    const EmptyCard = () => {

        return (
            <View style={styles.emptycard}>
                <Text style={{ color: Colors.text }}>{t('benef.nobeneficiaryregistered')}</Text>
            </View>
        );

    };



    const Header = () => {

        return (
            <View>
                <View>
                    <Text style={styles.title}>{t('benef.mybeneficiaries')}</Text>
                </View>

                <View style={{ marginTop: 10, flexDirection: 'row', width: '100%' }}>
                    <Searchbar
                        placeholder={t('benef.Firstnamelastnamenumber')}
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        iconColor={Colors.text}
                        placeholderTextColor="gray"
                        style={{ flex: 1, color:Colors.text, backgroundColor: '#ffffff', borderColor: 'gray', borderWidth: 1 }}
                        onPressIn={() => { navigation.navigate('FilterBeneficiaireScreen')}}
                    />
                </View>

                <View style={{ marginBottom: 20, marginTop: 20}}>

                    <TouchableOpacity style={styles.addrow} onPress={() => {navigation.navigate('AddBeneficiariesScreen'); }} >

                        <View style={{
                            flex: 1,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                        }}>
                            <View style={{
                                borderColor: Colors.background,
                                borderWidth: 1,
                                height: 50,
                                width: 50,
                                borderRadius: 25,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Feather name="plus" size={22} color={Colors.text} />
                            </View>

                        </View>

                        <View style={{
                            flex: 3,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                        }}>
                            <Text style={styles.addrowText}>{t('benef.manuallyaddabeneficiary')}</Text>
                        </View>

                        <View style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                        }}>
                            <Ionicons name="chevron-forward-outline" size={16} color={Colors.gray} />
                        </View>
                    </TouchableOpacity>

                    {
                        newClients.length > 0 &&
                        <TouchableOpacity style={styles.addrow} onPress={() => { navigation.navigate('AddDirectoryBenefScreen'); }} >

                            <View style={{
                                flex: 1,
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                            }}>
                                <View style={{
                                    borderColor: Colors.background,
                                    borderWidth: 1,
                                    height: 50,
                                    width: 50,
                                    borderRadius: 25,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <AntDesign name="addusergroup" size={22} color={Colors.text} />
                                </View>

                            </View>

                            <View style={{
                                flex: 2,
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                            }}>
                                {
                                        newClients.length > 1 ?
                                        <Text style={styles.addrowText}>{newClients[0].prenoms} {t('benef.and')}  {newClients.length - 1 } {t('benef.otherpeopleinyourdirectoryuseHPay')}</Text>
                                        :
                                        <Text style={styles.addrowText}>{newClients[0].prenoms} {t('benef.fromyourdirectoryuseHPay')}</Text>
                                 }
                            </View>

                            <View style={{
                                flex: 2,
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                            }}>
                                <View style={styles.display}>
                                    <Text style={{color:Colors.text}}>{t('benef.displayall')}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    }


                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontWeight: 'bold', color: Colors.text, fontSize: 22 }}>{t('benef.registeredbeneficiaries')}</Text>
                    </View>


                </View>


            </View>
        );



    };


    return (
        <View style={styles.main}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                <AvartarButton
                    prenom={user.client.prenoms}
                    profilUrl={user.client.photoClient}
                />

                <View >

                </View>
            </View>


            <FlatList
                data={benefs}
                keyExtractor={item => item.id.toString()}
                ListHeaderComponent={Header}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('ProfilBenefScreen', { client : item }); }} >

                        <View style={{ flexDirection: 'row' }}>

                            <View style={{flex:1} }>
                                <View style={styles.benefavatar}>
                                    {filePath ?
                                        <Image
                                            source={filePath ? { uri: filePath } : require('../../assets/avatar.jpg')}
                                            style={styles.avatarImage}
                                        />
                                        :
                                        <View>
                                            <Text style={{ color: Colors.text, fontWeight: 'bold', fontSize: 16 }}>{getInitials(item.prenoms)}</Text>
                                        </View>
                                    }
                                </View>
                            </View>


                            <View style={{ flex: 3 }}>
                                <Text style={styles.name}>{item.prenoms} {item.nom}</Text>
                                <Text style={styles.phone}>{item.telephone}</Text>
                            </View>

                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Ionicons name="chevron-forward-outline" size={16} color={Colors.gray} />
                            </View>

                        </View>

                    </TouchableOpacity>
                )}

                ListEmptyComponent={ <EmptyCard/> }

                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                        tintColor="blue"  // Optional, customize the refresh indicator color
                    />
                }
            />


        </View>
    );

}

const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
        paddingBottom: 0,
        paddingVertical: 10 
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
        width: 40,
        height: 40,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6e4e0',
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
        marginTop:5,
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


    benefavatar : {
        width: 50,
        height:50,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },


    avatarImage: {
        height: 100,
        width: 100,
        overflow: 'hidden',
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 30,
    },

    emptycard: {
        backgroundColor: '#e6e4e0',
        padding: 20,
        borderRadius: 10,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
    },



});


export default BeneficiariesScreen;
