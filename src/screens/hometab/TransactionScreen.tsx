/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */

import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, RefreshControl, FlatList } from 'react-native';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Background from '../../components/Background';
import Paragraph from '../../components/Paragraph';
import { useTranslation } from 'react-i18next';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { useSelector, useDispatch } from 'react-redux';
import { saveBenef, signOut } from '../../store/profilSlice';
import Colors from '../../themes/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-virtualized-view';
import AvartarButton from '../../components/connected/AvartarButton';
import Toast from 'react-native-toast-message';
import { ApiContext } from '../../../App';




export default function TransactionScreen({ navigation }: { navigation: any}) {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [isPanelActive, setIsPanelActive] = React.useState(false);
    const [filePath, setFilePath] = React.useState(null);
    const user = useSelector((state: any) => state.profil.user);
    const { photoUrl } = React.useContext(ApiContext);

    const getPhotoUrl = (name: string) => {
        return photoUrl + '/' + name;
    };

    const EmptyCard = () => {
        return (
            <View style={styles.emptycard}>
                <Text style={{ color: Colors.text }}>Aucune transaction effectué</Text>
            </View>
        );
    };


    const protectedNavigation = (screen: string) => {

        if (user.client.valider === '1') {
            navigation.navigate(screen);
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


    return (
        <View style={styles.main}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                <AvartarButton
                    prenom={user.client.prenoms}
                    profilUrl={getPhotoUrl(user.client.photoClient)}
                />

                <View >
                </View>
            </View>

            <ScrollView>
                <Text style={styles.title}>{t('transaction.transactions')}</Text>

                <View style={{ minHeight: 200, borderRadius: 10, marginTop:10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                            <TouchableOpacity
                                style={{
                                    height: 130,
                                    width: '90%',
                                    borderRadius: 25,
                                    backgroundColor: '#e6e4e0',
                                    padding: 15,
                                }}
                                disabled={true}
                                onPress={() => { protectedNavigation('CashInScreen');}}
                            >
                                <View style={{  }}>
                                    <AntDesign name="pluscircleo" size={26} color={Colors.primary} />
                                </View>
                                <View style={{ }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', marginTop: 5,  }}>{t('transaction.makeadeposit')}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity
                                style={{
                                    height: 130,
                                    width: '90%',
                                    borderRadius: 25,
                                    backgroundColor: '#e6e4e0',
                                    padding: 15,
                                }}

                                onPress={() => { protectedNavigation('TransfertScreen') }}
                            >
                                <View style={{  }}>
                                    <Feather name="send" size={26} color={Colors.primary} />
                                </View>
                                <View style={{ }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', marginTop: 5}}>{t('transaction.sendmoney')}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={{
                                height: 130,
                                width: '90%',
                                borderRadius: 25,
                                backgroundColor: '#e6e4e0',
                                padding: 15,
                            }}
                                disabled={true}
                                onPress={() => { protectedNavigation('PayScreen'); }}
                            >
                                <View style={{ }}>
                                    <AntDesign name="qrcode" size={26} color={Colors.primary} />
                                </View>
                                <View style={{  }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', marginTop: 5 }}>{t('transaction.payatthemerchant')}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>


                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                            <TouchableOpacity style={{
                                height: 130,
                                width: '90%',
                                borderRadius: 25,
                                backgroundColor: '#e6e4e0',
                                padding: 15,
                            }}
                                onPress={() => { protectedNavigation('TransfertBetweenAccount'); }}
                            >
                                <View style={{}}>
                                    <Ionicons name="swap-vertical" size={26} color={Colors.primary} />
                                </View>
                                <View style={{}}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', marginTop: 5, }}>{t('transaction.transferbetweenaccounts')}</Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={{
                                height: 130,
                                width: '90%',
                                borderRadius: 25,
                                backgroundColor: '#e6e4e0',
                                padding: 15,
                            }}
                                onPress={() => { protectedNavigation('BuyScreen'); }}
                            >
                                <View style={{}}>
                                    <Feather name="shopping-cart" size={26} color={Colors.primary} />
                                </View>
                                <View style={{}}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', marginTop: 5, }}>Hpay Store</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                        </View>

                    </View>
                </View>


                {/*
                 <View style={{ marginTop: 30, }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: Colors.text }}>Historiques des transactions</Text>
                    <View >
                        <EmptyCard />
                    </View>
                </View>
                */}


            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({

    main: {
        backgroundColor: '#ffffff',
        padding:20,
        flex: 1,
        paddingVertical: 10,
    },

    avatarImage: {
        height: 100,
        width: 100,
        overflow: 'hidden',
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 30,
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

    emptycard: {
        marginTop: 20,
        backgroundColor: '#e6e4e0',
        padding: 20,
        borderRadius: 10,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
    },

});