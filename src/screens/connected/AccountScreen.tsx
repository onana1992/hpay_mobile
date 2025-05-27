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
    Text,
    ActivityIndicator,
    SectionList,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import { getHistory } from '../../services/request';
import { formatDate, formatHeure } from '../../helpers/functions';
import HistoryItem from '../../components/HistoryItem';



function AccountScreen({ navigation }: { navigation: any }) {

    const route = useRoute<any>();
    const { t } = useTranslation();
    const user = useSelector((state: any) => state.profil.user);
    const [visible, setVisible] = React.useState(false);
    const [langageModalvisible, setLangageModalvisible] = React.useState(false);
    const { account } = route.params;
    const [loading, setLoading] = React.useState(true);
    const [content, setContent] = React.useState<any[]>([]);
    const [page, setPage] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [size, setSize] = React.useState<number>(8);
    const [totalElement, setTotalElement] = React.useState<number>(0);
    const [histories, setHistories] = React.useState<any[]>([]);

    //console.log(account.compte.idCompte);


    React.useEffect(() => {
        fetchHistory(user?.client?.id,  account.compte.idCompte, 'desc', page, size);
    }, []);


    const protectedNavigation = (screen: string, accountParm:any) => {

        if (user.client.valider === '1') {
            navigation.navigate(screen, { accountParm: accountParm });
        } else {
            navigation.navigate('kyc');
        }

    };


    const fetchHistory = (

        idClient: string,
        idCompte: string,
        sortDirection: string,
        pageN: number,
        sizeN: number) => {

        getHistory(
            idClient,
            idCompte,
            sortDirection,
            pageN,
            sizeN
        ).then((response) => {

            //console.log(response.data.content);
            const grouped: any = {};
            setSize(response.data.numberOfElements);
            setTotalElement(response.data.totalElements);
            setTotalPages(response.data.totalPages);

            setContent([...content, ...response.data.content]);
            const newContent = [...content, ...response.data.content];

            newContent.forEach(item => {
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
                });
            });

            const DATA = Object.keys(grouped).map(date => ({
                title: date,
                data: grouped[date],
            }));


            setHistories(DATA);
            setLoading(false);


        }).catch((error) => {

            //console.log(error.response);
            setLoading(false);
        });

    };


    const fetchMore = () => {
        setPage((prev) => prev + 1);
        fetchHistory(user?.client?.id, account.compte.idCompte, 'desc', page + 1, size);
    };



    const EmptyCard = () => {
        return (
            <View style={styles.emptycard}>
                {
                    loading ?
                        <View>
                            <ActivityIndicator size="small" color={Colors.primary} />
                            <Text style={{ color: Colors.text }}>{t('account.loadinginprogress')}</Text>
                        </View>
                        :
                        <Text style={{ color: Colors.text }}>{t('account.notransactionmade')}</Text>
                }
            </View>
        );
    };



    const Footer = () => {
        return (
            <View>
                {
                    totalPages > page + 1 &&
                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 20 }}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity style={styles.morebutton} onPress={() => { fetchMore(); }}>
                                <Text style={styles.morebuttonText}> {t('account.seemore')} </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        );
    };



    const Header = () => {

        return (
            <View>

                <View style={{ alignItems: 'center' }}>

                    <View style={{
                        width: 100,
                        height:100,
                        borderRadius:50,
                        backgroundColor:'#e6e4e0',
                        alignItems:'center',
                        justifyContent:'center',
                    }}>
                        <Text style={{  fontSize: 60, color:'white' }}>
                            {account?.emoji}
                        </Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>

                        {
                            account.compte.typeCompte.typeCompteCode === 'HPAY' &&
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: Colors.text, marginTop: 5, }}>
                                {t('account.principalAccount')}
                            </Text>

                        }

                        {
                            account.compte.typeCompte.typeCompteCode !== 'HPAY' &&
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: Colors.text, marginTop: 5 }}>
                                {t('account.currencyaccount')} {account.compte.devise}
                            </Text>
                        }

                        <Text style={{ textAlign: 'center', fontSize: 14, color: Colors.gray, marginTop: 0 }}>
                            {t('account.accountnumber')} : {account.compte.numCompte}
                        </Text>

                    </View>


                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 30, color: Colors.text, marginTop: 10 }}>
                            {account.compte.solde.toFixed(2)} {account.compte.devise}
                        </Text>
                    </View>


                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>

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
                                onPress={() => { protectedNavigation('CashInScreen', account ); }}
                            >
                                <AntDesign name="pluscircleo" size={26} color="#ffffff"/>
                            </TouchableOpacity>
                            <View style={{ height: 50 }}>
                                <Text
                                    style={{
                                        color: 'black',
                                        fontWeight: 'bold',
                                        marginTop: 5,
                                        textAlign: 'center',
                                    }}
                                >
                                    {t('account.add')}
                                </Text>
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
                                onPress={() => { protectedNavigation('TransfertScreen', account); }}
                            >
                                <Feather name="send" size={26} color={Colors.text} />
                            </TouchableOpacity>
                            <View style={{ height: 50 }}>
                                <Text style={{ color: 'black', fontWeight: 'bold', marginTop: 5, textAlign: 'center' }}>{t('account.send')}</Text>
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
                                onPress={() => { protectedNavigation('PayScreen', account); }}
                            >
                                <AntDesign name="qrcode" size={26} color={Colors.text} />
                            </TouchableOpacity>
                            <View style={{ height: 50 }}>
                                <Text style={{ color: 'black', fontWeight: 'bold', marginTop: 5, textAlign: 'center' }}>{t('account.pay')}</Text>
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
                                onPress={() => { navigation.navigate('CardDetail', { account: account }) }}
                            >
                                <AntDesign name="creditcard" size={26} color={Colors.text} />
                            </TouchableOpacity>
                            <View style={{ height: 50 }}>
                                <Text style={{ color: 'black', fontWeight: 'bold', marginTop: 5, textAlign: 'center' }}>{t('account.card')}</Text>
                            </View>
                        </View>


                    </View>

                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: Colors.text }}>
                        {t('account.transactionhistory')}
                    </Text>
                </View>

            </View>
        );

    };



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
                        taux={item.tauxConversion}
                    />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.text, marginTop: 20 }}>{title}</Text>
                )}

                ListEmptyComponent={EmptyCard}
                ListFooterComponent={Footer}
                ListHeaderComponent={Header}
            />


        </View>
    );
}


const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
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


export default AccountScreen;
