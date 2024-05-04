/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */

import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, SectionList, FlatList } from 'react-native';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Background from '../components/Background';
import Paragraph from '../components/Paragraph';
import { useTranslation } from 'react-i18next';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../store/profilSlice';
import Colors from '../themes/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/Button';
import { Portal } from '@gorhom/portal';
import TransactionSwipeablePanel from '../components/TransactionSwipeablePanel';
import { ScrollView } from 'react-native-virtualized-view';
import { useFocusEffect } from '@react-navigation/native';
import { connect } from 'react-redux';

function HomeScreen({ navigation,user }: { navigation: any, user:any }) {


    const dispatch = useDispatch();
    const [isPanelActive, setIsPanelActive] = React.useState(false);
    const [filePath, setFilePath] = React.useState(null);
    const logOut = () => {
        dispatch(signOut(null));
    };

    console.log(user);


    React.useEffect(() => {

       setFilePath(user?.photo_client);

    }, [user]);


    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
           // console.log(user);
            //setFilePath(user.photo_client);
        });

        return unsubscribe;
    }, [navigation]);



    const DATA = [
        {
            jour: '15/03/2024',
            data: [
                {
                    nom: 'Kasavubu',
                    prenom: 'Henry Xavy',
                    numCompte: '12457924798',
                    type: 'Virement interne entrant',
                    montant: +500,
                    time: '10:30 AM',
                },
                {
                    nom: 'Mastadi',
                    prenom: 'Roland Joel',
                    numCompte: '3454574798',
                    type: 'Virement externe sortant',
                    montant: -500,
                    time: '11:45 AM',
                },
            ],
        },

        {
            jour: '16/03/2024',
            data: [
                {
                    nom: 'Deschamps',
                    prenom: 'Jean charle',
                    numCompte: '3724574788',
                    type: 'Transfert Sortant',
                    montant: -1000,
                    time: '09:30 AM',
                },
                {
                    nom: 'Benze',
                    prenom: 'Olivier Chamberlin',
                    numCompte: '37235774788',
                    type: 'Recharge',
                    montant: +3000,
                    time: '12:30 AM',
                },
            ],
        },

        {
            jour: '17/03/2024',
            data: [
                {
                    nom: 'Abene',
                    prenom: 'Lous De paul',
                    type: 'Virement interne entrant',
                    montant: +3000,
                    numCompte: '372357747848',
                    time: '09:30 AM',
                },
                {
                    nom: 'Deschamps',
                    prenom: 'Jean charle',
                    type: 'Virement externe  entrant',
                    numCompte: '372357747848',
                    montant: +3000,
                    time: '10:30 PM',
                },
            ],
        },

        {
            jour: '18/03/2024',
            data: [
                {
                    nom: 'Sage',
                    prenom: 'Paul Alain',
                    type: 'Virement interne entrant',
                    numCompte: '372937747888',
                    montant: +700,
                    time: '10:30 PM',
                },
                {
                    nom: 'Montana',
                    prenom: 'Alexia Ciara',
                    type: 'Transfert sortant',
                    numCompte: '37293445747888',
                    montant: -300,
                    time: '10:30 PM',
                },
            ],
        },
    ];

    const RECIPENTS = [

        {
            id: '0',
            prenom: 'Henry Xavy',
        },

        {
            id: '1',
            prenom: 'Jean charle',
        },

        {
            id: '3',
            prenom: 'Lous De paul',
        },

        {
            id: '4',
            prenom: 'Jean charle',
        },

    ];

    const AmountView = ({ amount }) => {
        return (
            <Currency
                quantity={amount}          // Required
                //currency=""            // Optional (USD by default)
                //locale="en_EN"            // Optional
                pattern="##,### !"        // Optional
                decimal=","               // Optional
                group=" "                 // Optional
            />
        );
    };


    const RenderRow = ({ item }) => {

        return (

            <View style={{ flexDirection: 'row', minHeight: 80, padding: 10, borderBottomColor: 'gray', borderBottomWidth: 0.5 }}>

                <View style={{ flex: 2, paddingTop: 5 }}>
                    <Image
                        source={require('../assets/avatar.jpg')}
                        style={{
                            height: 40,
                            width: 40,
                            overflow: 'hidden',
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 20,
                        }}
                    />
                </View>

                <View style={{ flex: 7.5, paddingLeft: 8 }}>
                    <Text style={{ color: "black", fontSize: 14, fontWeight: 'bold' }} numberOfLines={1}>
                        {item.prenom} {item.nom}
                    </Text>
                    {/*<Text style={{ color: "black", fontSize: 13 }}>{item.numCompte} </Text>*/}
                    <Text style={{ color: "black", fontSize: 13 }}>{item.type}</Text>
                    <Text style={{ color: "gray", fontSize: 12 }}>{item.time} </Text>
                </View>

                <View style={{ flex: 3.5, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Text style={item.montant > 0 ? styles.entrant : styles.sortant}> {item.montant} HTC   </Text>
                </View>
            </View>
        );
    };

    const RecipientItem = ({ item }) => {

        return (
            <View style={{ marginHorizontal: 20, justifyContent: 'center', alignItems: 'center' }} >
                <Image
                    source={require('../assets/avatar.jpg')}
                    style={{
                        height: 40,
                        width: 40,
                        overflow: 'hidden',
                        borderColor: 'gray',
                        borderWidth: 1,
                        borderRadius: 20,
                    }}
                />
                <Text style={{ color: Colors.text, paddingTop: 5, fontWeight: 500 }}>{item.prenom}</Text>
            </View>
        );
    };



    return (
        <ScrollView style={styles.main}>

            <View style={styles.header}>
                <View style={{ flexDirection: 'row', marginTop:5 }}>
                    <View style={{ flex: 3, flexDirection:'row' }}>
                        <View style={styles.avatar} >
                            <TouchableOpacity onPress={() => { viewProfil() }}>
                                <Image
                                    source={filePath ? { uri: filePath } : require('../assets/avatar.jpg')}
                                    style={styles.avatarImage}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.profil} >
                            <Text style={{ color: '#fff', paddingTop: 5, fontWeight: 'bold', fontSize: 16 }}> {user.prenoms}{' '}{user.nom} </Text>
                            <Text style={{ color: '#fff', fontSize: 12 }}> {user.telephone}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                    </View>
                </View>
            </View>

            <View style={{ height: 180, backgroundColor: 'white', margin: 10, marginTop: -50, borderRadius: 20 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 20 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize:15 }}>SOLDE TOTAL DES COMPTES</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 10 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize:18, }}>O HTC</Text>
                </View>

                <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#d3d3d3', height: 5, margin: 10}}></View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 10 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="cash-plus" size={35} style={{ color: Colors.primary }} />
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>Recharge</Text>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="swap-vertical-circle-outline" size={35} style={{ color: Colors.primary }} />
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>Virement interne</Text>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="send-circle-outline" size={35} style={{ color: Colors.primary }} />
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>Transfert</Text>
                    </View>
                </View>

            </View>

            <View style={{ backgroundColor: 'white', padding: 10, marginTop:30 }}>

               {/* <View style={{ margin: 10 }}>
                    <View>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize:16 }}>Recents beneficiaires</Text>
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <FlatList
                            horizontal
                            data={RECIPENTS}
                            renderItem={({ item }) => <RecipientItem item={item} />}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>


                </View>*/}

                <View style={{ margin: 10 }}>
                    <View>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Historiques des transactions</Text>
                    </View>

                    <View style={{ minHeight: 180, backgroundColor: 'white', marginTop: 10, borderRadius: 20 }}>
                        <SectionList
                            sections={DATA}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({ item }) => <RenderRow item={item} />}
                            renderSectionHeader={({ section: { jour } }) => (
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    color: 'black',
                                    paddingLeft: 10,
                                    paddingTop: 10,
                                }}>{jour}</Text>
                            )}
                            ListFooterComponent={
                                <View style={{ margin: 10 }}>
                                    <Button
                                        mode="contained"
                                        onPress={() => { logOut(); }}
                                    >
                                        Voir plus de transactions
                                    </Button>
                                </View>
                            }
                        />
                    </View>

                </View>

            </View>


            <Portal hostName="">
                <TransactionSwipeablePanel isPanelActive={isPanelActive} setIsPanelActive={setIsPanelActive}/>
            </Portal>




            {/*<Button
                mode="contained"
                onPress={() => { logOut(); }}>
                    Se déconnecter
            </Button>*/}

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    main: {
        //backgroundColor: '#ffff',
        flex: 1,
    },

    header: {
        height: 160,
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        padding: 30,
    },

    avatar: {
        width: 60,
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