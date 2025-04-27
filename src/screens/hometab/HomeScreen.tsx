/* eslint-disable curly */
/* eslint-disable dot-notation */
/* eslint-disable react-hooks/exhaustive-deps */
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
    RefreshControl,
    FlatList,
    SectionList,
    ActivityIndicator,
    Platform,
    Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { saveAccount,  signIn, saveBenefs } from '../../store/profilSlice';
import Colors from '../../themes/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-virtualized-view';
import { connect } from 'react-redux';
import { fetchBeficiariesRequest, fetchRatesRequest, getHistory, saveFCMTokenRequest, searchClientByPhoneRequest } from '../../services/request';
import AvartarButton from '../../components/connected/AvartarButton';
import HistoryItem from '../../components/HistoryItem';
import { useTranslation } from 'react-i18next';
import { formatDate, formatHeure } from '../../helpers/functions';
import {
    RESULTS,
    requestNotifications,
} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';

function HomeScreen({ navigation, user }: { navigation: any, user: any }) {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [montantTotal, setMontantTotal] = React.useState<number>(0);
    const [isPanelActive, setIsPanelActive] = React.useState(false);
    const [accounts, setAccounts] =  React.useState<any>([]);
    const [filePath, setFilePath] = React.useState(null);
    const [refreshing, setRefreshing] = React.useState(false);
    const [currencyVisible, setCurrencyVisible] = React.useState(true);
    const [histories, setHistories] = React.useState<any[]>([]);
    const [size, setSize] = React.useState<number>(0);
    const [totalElement, setTotalElement] = React.useState<number>(0);
    const [loading, setLoading] = React.useState(true);
    const isIos = () => Platform.OS === 'ios';
    const isAndroid = () => Platform.OS === 'android';
    const getPlatformVersion = () => Number(Platform.Version);

    //console.log(user.client.id);

    const requestNotificationsPermission = (onGranted: () => void, onBlocked: () => void) => {
        requestNotifications(['alert', 'sound', 'badge']).then(({ status }) => {
            if (status === RESULTS.GRANTED) {
                onGranted();
            } else {
                onBlocked();
            }
        });
    };


    const checkNotificationPermissionStatus = (): Promise<boolean> => {
        return new Promise(async (resolve, reject) => {
            return messaging()
                .hasPermission()
                .then(enabled => {
                    let granted =
                        enabled === messaging.AuthorizationStatus.AUTHORIZED ||
                        enabled === messaging.AuthorizationStatus.PROVISIONAL;
                    return resolve(granted);
                })
                .catch(error => reject(error));
        });
    };



    const passTokenToBackend = (token: string) => {
        // envois le token au serveur
    };


    // demande de la permission pour push notofictio
    React.useEffect(() => {

        if (isIos() || (isAndroid() && getPlatformVersion() >= 33)) {
            requestNotificationsPermission(() => {
                //notification granted tasks
            }, () => {
                //notification denied tasks
            });
        }

    }, []);


    const setNotificationsHandler = async () => {
        let granted = await checkNotificationPermissionStatus();
        if (!granted) return;

        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        console.log('le token est :', token);

        saveToken(user.client.id,token);

        // mise à jour du token
        messaging().onTokenRefresh((token) => {
            //call api and pass the token
            saveToken(user.client.id, token);
        });
    };


    // demande et mise à jour de FCM token
    React.useEffect(() => {
        setNotificationsHandler();

    }, []);



    // message en foreground
    React.useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
           // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });

        return unsubscribe;
    }, []);



    //console.log(user.login);
    React.useEffect(() => {
        getBeneficiaries();
        fetchAccount(user);
        fetchHistory();
    }, []);




    React.useEffect(() => {
        setFilePath(user?.photo_client);
    }, [user]);



    React.useEffect(() => {
        calculateAmmount();
    }, [accounts]);




    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getClient();
            fetchAccount(user);
            fetchHistory();
        });

        return unsubscribe;
    }, [navigation]);



    const getBeneficiaries = () => {

        fetchBeficiariesRequest(user.login).then((response: any) => {
            console.log(response.data.response.data);
            dispatch(saveBenefs(response.data.response.data));

        }).catch((error: any) => {


        });

    };


    const saveToken = (idClient: string, token: string) => {
        saveFCMTokenRequest(idClient, token).then(() => {
        }).catch((error) => {

            console.log(error);
        });
    };


    const getClient = () => {

        searchClientByPhoneRequest(user.login).then((response: any) => {
            dispatch(signIn(response.data.response.data));
            fetchAccount(response.data.response.data);
            setRefreshing(false);

        }).catch((error: any) => {
            setRefreshing(false);
        });

    };



    const calculateAmmount = () => {

        let devises: any[] = [];
        let montant: number = 0;

        if (accounts.length > 0) {
            devises.push(accounts[1].compte.devise);
            devises.push(accounts[2].compte.devise);
            devises.push(accounts[3].compte.devise);

            fetchRatesRequest(accounts[0].compte.devise, devises).then((response) => {

                console.log(devises);
                console.log(response.data);
                //console.log(response.data['EUR']);
                //console.log(response.data['USD']);
                //console.log(response.data['GBP']);

                montant = accounts[0].compte.solde + accounts[1].compte.solde / response.data['USD'].hpayRate ;
                montant = montant + accounts[2].compte.solde / response.data['EUR'].hpayRate ;
                montant = montant + accounts[3].compte.solde / response.data['GBP'].hpayRate ;
                setMontantTotal(montant);
            }).catch((error) => {



            });
        }


    };



    const fetchHistory = () => {

        setLoading(true);
        getHistory(
            user?.client?.id,
            '',
            'desc',
            0,
            8
        ).then((response) => {

          //  console.log(response.data.content);
            const grouped: any = {};
            setSize(response.data.numberOfElements);
            setTotalElement(response.data.totalElements);

            response.data.content.forEach(item => {
                const date = formatDate(item.dateInitiale);
                const heure = formatHeure(item.dateInitiale);

                if (!grouped[date]) {
                    grouped[date] = [];
                }

                grouped[date].push({
                    id: item.idVirementInterne,
                    montant: item.montant,
                    total: item.total,
                    devise: item.deviseFrom,
                    raison: item.virementRaison,
                    clientFrom: item.clientFrom,
                    clientTo: item.clientTo,
                    compteFrom: item.compteFrom,
                    compteTo: item.compteTo,
                    numVirement: item.virementNum,
                    heure: heure,
                });
            });

            const DATA = Object.keys(grouped).map(date => ({
                title: date,
                data: grouped[date],
            }));

            setHistories(DATA);
            setLoading(false);


        }).catch((error) => {

           // console.log(error.response);
            setLoading(false);

        });

    };



    const fetchAccount = (parmUser:any) => {

        const mainAccount = parmUser.client.comptes.find((account: any) => {
            if (account.typeCompte.idTypeCompte === 6) {
                console.log('compte principal', account.devise);
                return true;
            }
        });

        const otherAccounts = parmUser.client.comptes.filter((account: any) => {

            if (account.typeCompte.idTypeCompte != 6 && account.typeCompte.idTypeCompte != 2) {

                return account;
            }

        });


        let allAccount = [];
        allAccount.push(mainAccount);

        for (const acc of otherAccounts) {
            allAccount.push(acc);
        }

        const newAccountsList = allAccount.map((account: any) => {

            if (account.typeCompte.idTypeCompte === 6) {
                return {
                    id: account.typeCompte.idTypeCompte,
                    icon: require('../../assets/cad.png'),
                    compte: account,
                };
            }

            else if (account.typeCompte.idTypeCompte == 1) {
                return {
                    id: account.typeCompte.idTypeCompte,
                    icon: require('../../assets/us.png'),
                    compte: account,
                };
            }

            else if (account.typeCompte.idTypeCompte == 4) {
                return {
                    id: account.typeCompte.idTypeCompte,
                    icon: require('../../assets/ue.png'),
                    compte: account,
                };
            }

            else if (account.typeCompte.idTypeCompte == 5) {
                return {
                    id: account.typeCompte.idTypeCompte,
                    icon: require('../../assets/gb.png'),
                    compte: account,
                };
            }

        });


        setAccounts(newAccountsList);

        // enregistrement dans le redux
        dispatch(saveAccount(newAccountsList));

        // cacul du total
        calculateAmmount();

    };




    const AccountItem = ({ item }) => (
        <TouchableOpacity style={styles.accountItem} onPress={() => { navigation.navigate('AccountScreen', { account: item}); } }>

            <View style={{ flex: 1, flexDirection: 'row', height: 20,   }}>
                <Image
                    source={item.icon}
                    style={{
                        height: 40,
                        width: 40,
                        overflow: 'hidden',
                        borderWidth: 1,
                        borderRadius: 20,
                    }}
                />
                <Text style={{ marginTop:10,  marginLeft: 10, fontWeight: 'bold', fontSize: 17, color: Colors.text }}>
                    {item.compte.devise}
                </Text>
            </View>


            <View style={{ flex: 1, flexDirection: 'row', height: 40, alignItems: 'flex-end' }}>
                {
                    currencyVisible ?
                    <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 20, color: Colors.text }}>
                            {item.compte.solde.toFixed(2)}
                    </Text>
                    :
                    <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 20, color: Colors.text }}>
                        ****
                    </Text>
                }
            </View>

        </TouchableOpacity>
    );


    const EmptyCard = () => {

        return (
            <View style={styles.emptycard}>
                {
                    loading ?
                        <View>
                            <ActivityIndicator size="small" color={Colors.primary} />
                            <Text style={{ color: Colors.text }}> {t('homescreen.loadinginprogress')} </Text>
                        </View>
                        :
                        <Text style={{ color: Colors.text }}>{t('homescreen.notransactionmade')}</Text>
                }
            </View>
        );

    };



    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getClient();
        fetchHistory();
    }, []);




    const Footer = () => {

        return (
            <View>
                {
                    totalElement > 8 &&
                    < View style={{ flexDirection: 'row', width: '100%', marginTop: 20 }}>
                        <View style={{ flex: 1 }}>
                                <TouchableOpacity style={styles.morebutton} onPress={() => { navigation.navigate('MyHistoriesScreen') }}>
                                    <Text style={styles.morebuttonText}>{t('homescreen.seealltransactions')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        );

    };




    return (

        <View style={styles.main}>

            {user != null ?

                <View style={{ height:'100%' }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingVertical: 10 }} >
                        <AvartarButton
                            prenom={user?.client.prenoms}
                            profilUrl={user?.client.photoClient}
                        />

                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity style={{ justifyContent: 'center', marginRight: 10 }} onPress={() => { navigation.navigate('MyMessageScreen'); }}>
                                <View style={styles.eye} >
                                    <Feather name="bell" size={16} color={Colors.text} />

                                    <View style={{}}>

                                    </View>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => { setCurrencyVisible((prev) => !prev); }}>
                                <View style={styles.eye} >
                                    {
                                        currencyVisible ?
                                            <Feather name="eye" size={16} color={Colors.text} />
                                            :
                                            <Feather name="eye-off" size={16} color={Colors.text} />
                                    }
                                </View>
                            </TouchableOpacity>

                        </View>

                    </View>



                    <ScrollView
                        style={{ padding: 20, paddingVertical: 10 }}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    >
                        {
                            accounts.length > 0 &&
                            <View>
                                <View>
                                    <Text style={{ fontSize: 16, color: Colors.text }}>Solde Total</Text>
                                </View>
                                <View>
                                        <Text style={{ fontSize: 26, color: Colors.text, fontWeight: 'bold' }}>{montantTotal.toFixed(2)} {accounts[0].compte.devise} </Text>
                                </View>
                            </View>

                        }


                        <FlatList
                            data={accounts}
                            renderItem={AccountItem}
                            keyExtractor={item => item.id}
                            horizontal={true}  // Makes the FlatList scroll horizontally
                            showsHorizontalScrollIndicator={false}  // Hide horizontal scroll indicator (optional)
                        />

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                                <TouchableOpacity style={{
                                    height: 60,
                                    width: 60,
                                    borderRadius: 25,
                                    backgroundColor: Colors.primary,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                    onPress={() => { navigation.navigate('CashInScreen')}}
                                >
                                    <AntDesign name="pluscircleo" size={26} color="#ffffff" />
                                </TouchableOpacity>
                                <View style={{ height: 50 }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', marginTop: 5, textAlign: 'center' }}>{t('homescreen.add')}</Text>
                                </View>
                            </View>


                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity
                                    style={{
                                        height: 60,
                                        width: 60,
                                        borderRadius: 25,
                                        backgroundColor: '#e6e4e0',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}

                                    onPress={() => { navigation.navigate('TransfertScreen')}}
                                >
                                    <Feather name="send" size={26} color={Colors.text} />
                                </TouchableOpacity>
                                <View style={{ height: 50 }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', marginTop: 5, textAlign: 'center' }}>{t('homescreen.send')}</Text>
                                </View>
                            </View>


                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity style={{
                                    height: 60,
                                    width: 60,
                                    borderRadius: 25,
                                    backgroundColor: '#e6e4e0',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                    onPress={() => { navigation.navigate('PayScreen'); }}
                                >
                                    <AntDesign name="qrcode" size={26} color={Colors.text} />
                                </TouchableOpacity>
                                <View style={{ height: 50 }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', marginTop: 5, textAlign: 'center' }}>{t('homescreen.pay')}</Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity style={{
                                    height: 60,
                                    width: 60,
                                    borderRadius: 25,
                                    backgroundColor: '#e6e4e0',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                    onPress={() => navigation.navigate('Transactions')}
                                >
                                    <AntDesign name="swap" size={28} color={Colors.text} />
                                </TouchableOpacity>
                                <View style={{ height: 50 }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', marginTop: 5, textAlign: 'center' }}>{t('homescreen.all')}</Text>
                                </View>
                            </View>

                        </View>


                        <View style={{ marginTop: 10, marginBottom:30 }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', color: Colors.text }}>{t('homescreen.recenttransactions')}</Text>

                            <SectionList
                                sections={histories}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item, index }) => (

                                    <HistoryItem
                                        user={user}
                                        clientFrom={item.clientFrom}
                                        clientTo={item.clientTo}
                                        compteFrom={item.compteFrom}
                                        compteTo={item.compteTo}
                                        montant={item.montant}
                                        devise={item.devise}
                                        heure={item.heure}
                                        index={index}
                                        size={size}
                                    />
                                )}
                                renderSectionHeader={({ section: { title } }) => (
                                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.text, marginTop:20 }}>{title}</Text>
                                )}

                                ListEmptyComponent={EmptyCard}
                                ListFooterComponent={Footer}
                            />

                        </View>

                    </ScrollView>
            </View>
            :
            <View></View>
        }
        </View>
    );
}



const styles = StyleSheet.create({

    main: {
        backgroundColor: '#ffffff',
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

    accountItem: {
        height: 150,
        width: 220,
        backgroundColor: '#e6e4e0',
        marginRight: 20,
        marginVertical:20,
        borderRadius: 10,
        padding: 10,
    },

    eye: {
        width: 30,
        height: 30,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6e4e0',
    },

    header: {
        height: 160,
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        padding: 30,
    },


    profif: {
        marginLeft:0,
    },


    avatarImage: {
        height: 50,
        width: 50,
        overflow: 'hidden',
        borderColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 25,
    },


    entrant: {
        fontSize: 12,
        color: '#00665e',
        fontWeight: 'bold',
    },


    sortant: {
        color: 'red',
        fontSize: 12,
        fontWeight: 'bold',
    },

    emptycard: {
        backgroundColor: '#e6e4e0',
        padding: 20,
        borderRadius: 10,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:20
    },

    morebutton: {
        height: 50,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    morebuttonText: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 16,
    },


});


//export default HomeScreen;

const mapStateToProps = (state) => {
    return {
        user: state.profil.user,
    };
};


export default connect(mapStateToProps)(HomeScreen);


/*Login: 0150182512
123456789A*/