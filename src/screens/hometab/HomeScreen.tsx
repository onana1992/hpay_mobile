/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */

import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text,RefreshControl,FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { saveBenef, saveAccount, signOut, signIn } from '../../store/profilSlice';
import Colors from '../../themes/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-virtualized-view';
import { connect } from 'react-redux';
import { currencyRateRequest, fetchBeficiariesRequest, searchClientByPhoneRequest } from '../../services/request';
import AvartarButton from '../../components/connected/AvartarButton';


function HomeScreen({ navigation, user }: { navigation: any, user: any }) {


   // console.log(user.client.comptes);

    const dispatch = useDispatch();
    const [isPanelActive, setIsPanelActive] = React.useState(false);
    const [accounts, setAccounts] =  React.useState<any>([]);
    const [filePath, setFilePath] = React.useState(null);
    const [refreshing, setRefreshing] = React.useState(false);
    const [currencyVisible, setCurrencyVisible] = React.useState(true);

    //console.log(user.login);


    React.useEffect(() => {
        getBeneficiaries();
        fetchAccount(user);
    }, []);




    React.useEffect(() => {
        setFilePath(user?.photo_client);
    }, [user]);



    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getClient();
        });

        return unsubscribe;
    }, [navigation]);





    const getBeneficiaries = () => {

        fetchBeficiariesRequest(user.login).then((response: any) => {
            console.log(response.data.response.data);
            //dispatch(signIn(response.data.response.data));

        }).catch((error: any) => {


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





    const getRate = async (currencyFrom: string, currencyTo: string) => {

        currencyRateRequest(currencyFrom, currencyTo).then((response: any) => {

            return response.data.realRate;

        }).catch((error: any) => {

        });

    };




    const calculateAmmount = async () => {

        // console.log(accounts);

        let amount = 0;

        for (const acc of accounts) {

            if (acc.compte.typeCompte.idTypeCompte == 6) {
                console.log(acc.compte.devise);
                console.log(accounts[0].compte.devise);
                const rate = getRate("CAD", "USD");
                //amount +=  acc.compte.solde * rate;
                console.log(rate);
            }

            /* else if (acc.compte.typeCompte.idTypeCompte == 1) {
                 console.log(acc.compte.devise);
                 amount += acc.compte.solde * getRate(acc.compte.devise, accounts[0].compte.devise);
                 console.log(amount);
             }
 
             else if (acc.compte.typeCompte.idTypeCompte == 4) {
                 console.log(acc.compte.devise);
                 amount += acc.compte.solde * getRate(acc.compte.devise, accounts[0].compte.devise);
                 console.log(amount);
             }
 
             else if (acc.compte.typeCompte.idTypeCompte == 5) {
                 console.log(acc.compte.devise);
                 amount += acc.compte.solde * getRate(acc.compte.devise, accounts[0].compte.devise);
                 console.log(amount);
             }*/
        }


    };



    const fetchAccount = (parmUser:any) => {

        const mainAccount = parmUser.client.comptes.find((account: any) => {
            if (account.typeCompte.idTypeCompte == 6) {
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

            if (account.typeCompte.idTypeCompte == 6) {
                return {
                    id: account.typeCompte.idTypeCompte,
                    icon: require('../../assets/cad.png'),
                    compte: account
                };
            }

            else if (account.typeCompte.idTypeCompte == 1) {
                return {
                    id: account.typeCompte.idTypeCompte,
                    icon: require('../../assets/us.png'),
                    compte: account
                };
            }

            else if (account.typeCompte.idTypeCompte == 4) {
                return {
                    id: account.typeCompte.idTypeCompte,
                    icon: require('../../assets/ue.png'),
                    compte: account
                };
            }

            else if (account.typeCompte.idTypeCompte == 5) {
                return {
                    id: account.typeCompte.idTypeCompte,
                    icon: require('../../assets/gb.png'),
                    compte: account
                };
            }


        });

        setAccounts(newAccountsList);

        // enregistrement dans le redux
        dispatch(saveAccount(newAccountsList));


    };




    const AccountItem = ({ item }) => (
        <TouchableOpacity style={styles.accountItem} onPress={() => { navigation.navigate('AccountScreen', { account: item}); } }>

            <View style={{ flex: 1, flexDirection: 'row', height: 40, alignItems: 'flex-start' }}>
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
                <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 17, color: Colors.text }}>
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
                <Text style={{ color: Colors.text,  }}>Aucune transaction effectué</Text>
            </View>
        );
    };



    const onRefresh = React.useCallback(() => {

        
        setRefreshing(true);
        getClient();
       /* setTimeout(() => {
            setRefreshing(false);
        }, 2000);*/

    }, []);



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

                        <View>
                            <View>
                                <Text style={{ fontSize: 16, color: Colors.text }}>Solde Total</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 26, color: Colors.text, fontWeight: 'bold' }}>0.00 CAD</Text>
                            </View>
                        </View>


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
                                    onPress={() => { navigation.navigate("CashInScreen")}}
                                >
                                    <AntDesign name="pluscircleo" size={26} color={Colors.text} />
                                </TouchableOpacity>
                                <View style={{ height: 50 }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', marginTop: 5, textAlign: 'center' }}>Ajouter</Text>
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

                                    onPress={() => { navigation.navigate("TransfertScreen") }}
                                >
                                    <Feather name="send" size={26} color={Colors.text} />
                                </TouchableOpacity>
                                <View style={{ height: 50 }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', marginTop: 5, textAlign: 'center' }}>Envoyer</Text>
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
                                    <Text style={{ color: 'black', fontWeight: 'bold', marginTop: 5, textAlign: 'center' }}>Payer</Text>
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
                                    <Text style={{ color: 'black', fontWeight: 'bold', marginTop: 5, textAlign: 'center' }}>Tout</Text>
                                </View>
                            </View>

                        </View>


                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', color: Colors.text }}>Transactions récentes</Text>
                            <EmptyCard />
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
        marginTop:20,
        backgroundColor: '#e6e4e0',
        padding: 20,
        borderRadius: 10,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
    }

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