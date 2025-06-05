/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-lone-blocks */
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
    Text,
    RefreshControl,
    FlatList,
    SectionList,
    ActivityIndicator,
    Platform,
    Alert,
    Dimensions
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { saveAccount, signIn, saveBenefs, savenotReadMessage } from '../../store/profilSlice';
import Colors from '../../themes/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-virtualized-view';
import { connect } from 'react-redux';
import { fetchBeficiariesRequest, fetchRatesRequest, getHistory, getNumberMessageNonlu, saveFCMTokenRequest, searchClientByPhoneRequest } from '../../services/request';
import AvartarButton from '../../components/connected/AvartarButton';
import HistoryItem from '../../components/HistoryItem';
import { useTranslation } from 'react-i18next';
import { formatDate, formatHeure } from '../../helpers/functions';
import { RESULTS, requestNotifications } from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import { client } from '../../services/axiosClient';
import {
    BarChart,
} from "react-native-chart-kit";


function HomeScreen({ navigation, user }: { navigation: any, user: any }) {

    //console.log(user.comptes);

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
    const notReadMessage = useSelector<number>((state: any) => state.profil.notReadMessage);
    const [icon, setIcon] = React.useState('');
    const [chartData, setChartData] = React.useState<any[]>([]);


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


    const protectedNavigation = (screen:string) => {

        if (user.client.valider === '1') {
            navigation.navigate(screen);
        } else {
            navigation.navigate('kyc');
        }

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
        // console.log('le token est :', token);

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
        fetchNotReadNumber();
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
            fetchNotReadNumber();
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

           // devises.push(accounts[1]?.compte.devise);
           // devises.push(accounts[2]?.compte.devise);
            //devises.push(accounts[3]?.compte.devise);
            for (let i = 1; i < accounts.length; i++){
                devises.push(accounts[i]?.compte.devise);
            }

            fetchRatesRequest(accounts[0]?.compte.devise, devises).then((response) => {

                console.log(response.data);

                const hpayRateCAD = response.data['CAD']?.hpayRate ?? 1;
                const hpayRateUSD = response.data['USD']?.hpayRate ?? 1;
                const hpayRateEUR = response.data['EUR']?.hpayRate ?? 1;
                const hpayRateGBP = response.data['GBP']?.hpayRate ?? 1;

                setChartData(
                    [
                        Number(1 / hpayRateCAD).toFixed(2),
                        Number(1 / hpayRateUSD).toFixed(2),
                        Number(1 / hpayRateEUR).toFixed(2),
                        Number(1 / hpayRateGBP).toFixed(2),
                    ]
                );


                montant = accounts[0]?.compte.solde;

               // console.log(accounts);


                for (let j = 1; j < accounts.length; j++){



                    if (accounts[j].compte.devise === 'CAD') {
                        montant = montant + accounts[j]?.compte.solde / hpayRateCAD;
                   }

                    if (accounts[j].compte.devise  === 'USD') {
                        montant = montant + accounts[j]?.compte.solde / hpayRateUSD;
                    }


                    else if (accounts[j].compte.devise === 'EUR') {
                        montant = montant + accounts[j]?.compte.solde / hpayRateEUR;
                    }


                    else if (accounts[j].compte.devise  === 'GBP') {
                        montant = montant + accounts[j]?.compte.solde / hpayRateGBP;
                    }

                }

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

            console.log(response.data.content);
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
                    tauxConversion: item.tauxConversion,
                    montantTo: item.montantTo,
                    montantFrom: item.montantFrom,
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

        let allAccount = [];

        const mainAccount = parmUser.client.comptes.find((account: any) => {
            if (account.typeCompte.idTypeCompte === 6) {
                //console.log('compte principal', account.devise);
                return true;
            }
        });

        const otherAccounts = parmUser.client.comptes.filter((account: any) => {
            if (account.typeCompte.idTypeCompte !== 6 && account.typeCompte.idTypeCompte !== 2) {
                return account;
            }
        });


        allAccount.push(mainAccount);

        for (const acc of otherAccounts) {
            allAccount.push(acc);
        }

        const newAccountsList = allAccount.map((account: any) => {

            setIcon(account.pays.emoji);

           if (account.typeCompte.idTypeCompte === 6) {
                return {
                    id: account.typeCompte.idTypeCompte,
                    icon: require('../../assets/cad.png'),
                    emoji: account.pays.emoji,
                    compte: account,
                };
            }


            else if (account.devise === 'CAD') {
                return {
                    id: account.typeCompte.idTypeCompte,
                    icon: require('../../assets/cad.png'),
                    emoji: '🇨🇦',
                    compte: account,
                };
            }

            else if (account.devise === 'USD') {
                return {
                    id: account.typeCompte.idTypeCompte,
                    icon: require('../../assets/us.png'),
                    emoji:'🇺🇸',
                    compte: account,
                };
            }


            else if (account.devise === 'EUR') {
                return {
                    id: account.typeCompte.idTypeCompte,
                    icon: require('../../assets/ue.png'),
                    emoji:'🇪🇺',
                    compte: account,
                };
            }

            else if (account.devise === 'GBP') {
                return {
                    id: account.typeCompte.idTypeCompte,
                    icon: require('../../assets/gb.png'),
                    emoji:'🇬🇧',
                    compte: account,
                };
            }

        });

        //console.log(newAccountsList);
        setAccounts(newAccountsList);

        // enregistrement dans le redux
        dispatch(saveAccount(newAccountsList));

        // cacul du total
        calculateAmmount();

    };




    const AccountItem = ({ item }) => (
        <TouchableOpacity style={styles.accountItem} onPress={() => { navigation.navigate('AccountScreen', { account: item}); } }>

            <View style={{ flex: 1, flexDirection: 'row', height: 20 }}>
              { /*
                    <Image
                    source={item?.icon}
                    style={{
                        height: 40,
                        width: 40,
                        overflow: 'hidden',
                        borderWidth: 1,
                        borderRadius: 20,
                    }}
                />

                */
              }

                <View style={{
                    width: 40,
                    height:40,
                    borderRadius:20,
                    backgroundColor:'white',
                    alignItems:'center',
                    justifyContent:'center',
                }}>
                    <Text style={{  fontSize: 24, color:'white' }}>
                        {item?.emoji}
                    </Text>
                </View>

                <Text style={{ marginTop:6,  marginLeft: 10, fontWeight: 'bold', fontSize: 17, color: Colors.text }}>
                    {item?.compte.devise}
                </Text>

            </View>


            <View style={{ flex: 1, flexDirection: 'row', height: 40, alignItems: 'flex-end' }}>
                {
                    currencyVisible ?
                    <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 20, color: Colors.text }}>
                          {item?.compte.solde.toFixed(2)}
                    </Text>
                    :
                    <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 20, color: Colors.text }}>
                        ****
                    </Text>
                }
            </View>

        </TouchableOpacity>
    );


    const fetchNotReadNumber = () => {
        getNumberMessageNonlu(user?.client?.id).then((response) => {
            dispatch(savenotReadMessage(response.data.nonLu));
        }).catch((error) => {
            // console.log(error);
        });
    };


    const EmptyCard = () => {

        return (
            <View style={styles.emptycard}>
                {
                    loading ?
                        <View>
                            <ActivityIndicator size="small" color={Colors.primary} />
                            <Text style={{ color: Colors.text }}>{t('homescreen.loadinginprogress')}</Text>
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
        fetchNotReadNumber();
    }, []);



    const Footer = () => {

        return (
            <View>
                {
                    totalElement > 8 &&
                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 20 }}>
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

                    <View style={{ flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', padding: 20, paddingTop: 20, height: 75 }} >

                        <AvartarButton
                            prenom={user?.client.prenoms}
                            profilUrl={user?.client.photoClient}
                        />

                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity style={{ justifyContent: 'center', marginRight: 10 }} onPress={() => { navigation.navigate('MyMessageScreen'); }}>
                                <View style={styles.eye} >
                                    <Feather name="bell" size={16} color={Colors.text} />
                                </View>
                                { Number(notReadMessage) > 0 ?

                                    <View style={{
                                        position: 'relative',
                                        width: 10,
                                        height: 10,
                                        backgroundColor: 'red',
                                        left: 24,
                                        bottom: 24,
                                        borderRadius: 5,
                                    }}>
                                    </View>
                                    :
                                    <View style={{
                                        position: 'relative',
                                        width: 10,
                                        height: 10,
                                        backgroundColor: 'transparent',
                                        left: 24,
                                        bottom: 24,
                                        borderRadius: 5,
                                    }}>
                                    </View>
                                }

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
                                <View style={{
                                    position: 'relative',
                                    width: 10,
                                    height: 10,
                                    backgroundColor: 'transparent',
                                    left: 24,
                                    bottom: 24,
                                    borderRadius: 5,
                                }}>
                                    <></>
                                </View>
                            </TouchableOpacity>

                        </View>

                    </View>



                    <ScrollView
                        style={{ padding: 20, paddingVertical: 10, paddingTop: 0, }}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    >
                        {
                            accounts.length > 0 &&
                            <View>
                                <View>
                                        <Text style={{ fontSize: 16, color: Colors.text }}>{t('homescreen.totalamount')}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 26, color: Colors.text, fontWeight: 'bold' }}>{montantTotal.toFixed(2)} {accounts[0]?.compte.devise} </Text>
                                </View>
                            </View>

                        }


                        <FlatList
                            data={accounts}
                            renderItem={AccountItem}
                            keyExtractor={item => item?.compte.id}
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
                                    disabled={true}
                                    onPress={() => { protectedNavigation('CashInScreen'); }}
                                >
                                    <AntDesign name="pluscircleo" size={26} color="#ffffff"/>
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

                                    onPress={() => { protectedNavigation('TransfertScreen')}}
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
                                    disabled={true}
                                    onPress={() => { protectedNavigation('PayScreen'); }}
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


                        {chartData.length > 0 &&
                            <View>
                                <Text style={{ fontSize: 22, marginBottom: 10, fontWeight: 'bold', color: Colors.text }}>{t('homescreen.currentexchangerate')}{accounts[0]?.compte.devise}</Text>

                                <BarChart
                                    data={{
                                        labels: ["CAD", "USD", "EUR", "GBP"],
                                        datasets: [
                                            {
                                                data: chartData
                                            }
                                        ]
                                    }}
                                    width={Dimensions.get("window").width - 40} // from react-native
                                    height={180}
                                    //yAxisLabel={accounts[0]?.compte.devise + " "}
                                    //yAxisSuffix="k"

                                    yAxisInterval={1} // optional, defaults to 1
                                    chartConfig={{
                                        backgroundColor: Colors.primary,
                                        backgroundGradientFrom: Colors.primary,
                                        backgroundGradientTo: "#ffa726",
                                        decimalPlaces: 2, // optional, defaults to 2dp
                                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        style: {
                                            borderRadius: 16
                                        },
                                        propsForDots: {
                                            r: "6",
                                            strokeWidth: "2",
                                            stroke: "#ffa726"
                                        }
                                    }}
                                    showValuesOnTopOfBars={true}
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16,
                                    }}
                            />
                            </View>
                        }




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
                                        montantFrom={item.montantFrom}
                                        montantTo={item.montantTo}
                                        devise={item.devise}
                                        heure={item.heure}
                                        index={index}
                                        size={size}
                                        taux={item.tauxConversion}
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