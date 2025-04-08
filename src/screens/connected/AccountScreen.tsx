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
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes';
import {  useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';



function AccountScreen({ navigation }: { navigation: any }) {

    const route = useRoute<any>();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [visible, setVisible] = React.useState(false);
    const [langageModalvisible, setLangageModalvisible] = React.useState(false);
    const { account } = route.params;


    const EmptyCard = () => {
        return (
            <View style={styles.emptycard}>
                <Text style={{ color: Colors.text, }}>Aucune transaction effectué</Text>
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

            <ScrollView>

                <View style={{  alignItems: 'center' }}>
                    <Image
                        source={account.icon}
                        style={{
                            height: 100,
                            width: 100,
                            overflow: 'hidden',
                            borderWidth: 1,
                            borderRadius: 20,
                        }}
                    />

                    <View style={{ alignItems:'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 17, color: Colors.text, marginTop: 10 }}>
                            {t('account.currencyaccount')} {account.compte.devise}
                        </Text>
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
                                onPress={() => { navigation.navigate('CashInScreen', { accountParm: account }) }}
                            >
                                <AntDesign name="pluscircleo" size={26} color={Colors.text} />
                            </TouchableOpacity>
                            <View style={{ height: 50 }}>
                                <Text style={{ color: 'black', fontWeight: 'bold', marginTop: 5, textAlign: 'center' }}>{t('account.add')}</Text>
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
                                onPress={() => { navigation.navigate('TransfertScreen', { accountParm: account }) }}
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
                                onPress={() => { navigation.navigate('PayScreen', { accountParm: account }) }}
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

                <View style={{ marginTop: 30 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: Colors.text }}>
                        {t('account.transactionhistory')}
                    </Text>
                    <EmptyCard/>
                </View>

            </ScrollView>



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
        marginTop: 10,
        backgroundColor: '#e6e4e0',
        padding: 20,
        borderRadius: 10,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
    },

});


export default AccountScreen;
