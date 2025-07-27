/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable quotes */
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
    Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCardRequest, searchClientByPhoneRequest } from '../../services/request';
import Toast from 'react-native-toast-message';
import { saveAccount, signIn } from '../../store/profilSlice';
import LoadingModal from '../../components/LoadingModal';
import { useTranslation } from 'react-i18next';
import { NetworkInfo } from 'react-native-network-info';
import CardQrCode from '../../components/CardQrCode';


function CardDetail({ navigation }: { navigation: any }) {


    const user = useSelector((state: any) => state.profil.user);
    const route = useRoute<any>();
    const { account } = route.params;
    const [modalVisible, setModalVisible] = React.useState(false);
    const [qrmodalVisible, setQrModalVisible] = React.useState(false);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [ipAdress, setIpAddress] = React.useState<string | null>("");


    React.useEffect(() => {
        NetworkInfo.getIPAddress()
            .then(ip => setIpAddress(ip))
            .catch(error => console.error(error));
    }, []);



    const cancel = () => {
        navigation.navigate("AccountScreen", { account: account });
    };


    const deleteCard = () => {


        if (user.client.valider === '1') {

            Alert.alert('', t('account.Areyousureyouwanttoremovethiscard'), [
                {
                    text: t('no'),
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: t('yes'), onPress: () => confirmDelete() },
            ]);


        } else {

            navigation.navigate('kyc');
        }

    };


    const navigateTo = (page:string) => {
        if (user.client.valider === '1') {
            navigation.navigate(page, { account: account });
        } else {
            navigation.navigate('kyc');
        }
    };




    const confirmDelete = () => {

        setModalVisible(true);
        deleteCardRequest(
            account.compte.carteClientQr.idCarteClientQr,
            user.idLoginClient,
            ipAdress
        ).then((response: any) => {

            getClient();

        }).catch((error: any) => {

            //console.log(error.response.data);
            /*Toast.show({
                type: 'error',
                text1: t('Error'),
                text2: t('account.deletionfailed'),
                position: 'top',
            });*/

            Toast.show({
                type: 'errorMessage',
                props: { text: t('account.deletionfailed') },
            });

            setModalVisible(false);
        });
    };



    const getClient = () => {

        searchClientByPhoneRequest(user.login).then((response: any) => {
            dispatch(signIn(response.data.response.data));
            fetchAccount(response.data.response.data);
        }).catch((error: any) => {

        });
    };


    function formatCreditCard(number: string) {

        // Remove non-digit characters
        const cleaned = number.replace(/\D/g, '');

        // Format the number into groups of four digits
        const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');

        return formatted;
    }


    const fetchAccount = (parmUser: any) => {

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
                    emoji: '🇺🇸',
                    compte: account,
                };
            }


            else if (account.devise === 'EUR') {
                return {
                    id: account.typeCompte.idTypeCompte,
                    icon: require('../../assets/ue.png'),
                    emoji: '🇪🇺',
                    compte: account,
                };
            }

            else if (account.devise === 'GBP') {
                return {
                    id: account.typeCompte.idTypeCompte,
                    icon: require('../../assets/gb.png'),
                    emoji: '🇬🇧',
                    compte: account,
                };
            }

        });


        let newCompte = newAccountsList.find((acc: any) => {
            if (account.id === acc.id) {
                return acc;
            }
        });

        dispatch(saveAccount(newAccountsList));
        setTimeout(() => {
            setModalVisible(false);
            navigation.navigate("CardDetail", { account: newCompte });
        }, 1000);

    };



    const Card = () => {
        return (
            <View style={styles.emptycard}>

                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, flexDirection: 'row', height: 40, alignItems: 'flex-start' }}>
                        {/*<Image
                            source={account.icon}
                            style={{
                                height: 40,
                                width: 40,
                                overflow: 'hidden',
                                borderWidth: 1,
                                borderRadius: 20,
                            }}
                        />*/}
                        <View>
                            {


                            }
                            <Text style={{ marginLeft: 5, fontWeight: 'bold', fontSize: 17, color: Colors.text }}>
                                {
                                    account.compte.carteClientQr.typeCarte === "CARTE_HPAY" && t('account.hpaycard')
                                }
                            </Text>
                            <Text style={{ marginLeft: 5,  fontSize: 14, color: Colors.text }}>
                                {t('account.currencycard') } {account.compte.devise}
                            </Text>
                        </View>

                     </View>
                </View>


                <View style={{ flex: 7, alignItems: 'center', justifyContent: 'center', marginTop:20 }}>
                    <Text style={{ color: Colors.text, fontSize: 22 }}> {formatCreditCard(account.compte.carteClientQr.numCarte)} </Text>
                </View>

                <View style={{ marginBottom: 0, paddingVertical: 2, flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'space-between',  }}>
                    <View  >
                        <Text style={{ color: Colors.text, marginTop: -3, fontWeight:'bold' }}>EXP: {account.compte.carteClientQr?.dateExpire?.split('T')[0]} </Text>
                    </View>

                    <View>
                        {
                            account.compte.carteClientQr.actif === '1' ?
                                <Text style={{ color:'green', marginTop: -3 }}>{t('account.active')} </Text>
                                :
                                <Text style={{ color: 'red', marginTop: -3 }}>{t('account.desactive')} </Text>
                        }

                    </View>
                </View>

            </View>
        );
    };



    const EmptyCard = () => {
        return (
            <View style={styles.emptycard}>

                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, flexDirection: 'row', height: 40, alignItems: 'flex-start' }}>
                        {/*<Image
                            source={account.icon}
                            style={{
                                height: 40,
                                width: 40,
                                overflow: 'hidden',
                                borderWidth: 1,
                                borderRadius: 20,
                            }}
                        />*/}
                        {/*<Text style={{ marginLeft: 5, fontWeight: 'bold', fontSize: 17, color: Colors.text }}>
                             {account.compte.devise}
                        </Text>*/}

                        <View style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: 'white',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{ fontSize: 24, color: 'white' }}>
                                {account?.emoji}
                            </Text>
                        </View>

                        <Text style={{ marginTop: 6, marginLeft: 10, fontWeight: 'bold', fontSize: 17, color: Colors.text }}>
                            {account?.compte.devise}
                        </Text>

                    </View>
                </View>


                <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: Colors.text }}>{t('account.nocardregistered')} </Text>
                </View>

            </View>
        );
    };




    return (
        <View style={styles.main}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                <TouchableOpacity

                    style={{
                    justifyContent: 'center',
                    backgroundColor: '#e6e4e0',
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    borderRadius: 20,
                }} onPress={() => { cancel() }} >
                    <View>
                        <Ionicons name="chevron-back" color={Colors.text} size={24} />
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView>

                <View style={{}}>
                    <Text style={styles.title}>{t('account.card')}</Text>
                </View>

                {
                    account.compte.carteClientQr == null ?
                        <EmptyCard />
                        :
                        <Card/>
                }

                <View>

                    <View style={{ paddingVertical: 20 }}>
                        <Text style={{
                            color: Colors.text,
                            fontSize: 22,
                            fontWeight: 'bold',
                        }}>
                            {t('account.Cardmanagement')}
                        </Text>
                    </View>


                    <TouchableOpacity
                        style={styles.addrow}
                        disabled={account.compte.carteClientQr != null}
                        onPress={() => navigateTo('AddCardScreen') } >

                        <View style={{
                            flex: 1,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                        }}>
                            <View style={{
                                borderColor: Colors.background,
                                borderWidth: 1,
                                height: 40,
                                width: 40,
                                borderRadius: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <AntDesign name="plus" size={22} color={Colors.text} />
                            </View>

                        </View>

                        <View style={{
                            flex: 3,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                        }}>
                            <Text style={account.compte.carteClientQr == null ? styles.addrowText : styles.addrowTextdesable}>{t('account.Addacardtoyouraccount')} </Text>
                        </View>

                        <View style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                        }}>
                            <Ionicons name="chevron-forward-outline" size={16} color={Colors.gray} />
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.addrow}
                        disabled={account.compte.carteClientQr == null}
                        onPress={() => { deleteCard(); }} >

                        <View style={{
                            flex: 1,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                        }}>
                            <View style={{
                                borderColor: Colors.background,
                                borderWidth: 1,
                                height: 40,
                                width: 40,
                                borderRadius: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <AntDesign name="delete" size={22} color={Colors.text} />
                            </View>

                        </View>

                        <View style={{
                            flex: 3,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                        }}>
                            <Text style={account.compte.carteClientQr != null ? styles.addrowText : styles.addrowTextdesable}>{t('account.Deletethecard')} </Text>
                        </View>

                        <View style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                        }}>
                            <Ionicons name="chevron-forward-outline" size={16} color={Colors.gray} />
                        </View>
                    </TouchableOpacity>




                    <TouchableOpacity
                        style={styles.addrow}
                        disabled={account.compte.carteClientQr == null}
                        onPress={() => { navigateTo('ModifyCardPinScreen'); }} >

                        <View style={{
                            flex: 1,
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}>
                            <View style={{
                                borderColor: Colors.background,
                                borderWidth: 1,
                                height: 40,
                                width: 40,
                                borderRadius: 20,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Feather name="code" size={22} color={Colors.text} />
                            </View>

                        </View>

                        <View style={{
                            flex: 3,
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}>
                            <Text style={account.compte.carteClientQr != null ? styles.addrowText : styles.addrowTextdesable}>{t('account.ChangePINcode')} </Text>
                        </View>

                        <View style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                        }}>
                            <Ionicons name="chevron-forward-outline" size={16} color={Colors.gray} />
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity
                        disabled={account.compte.carteClientQr == null}
                        style={styles.addrow}
                        onPress={() => {
                            navigateTo('ActivationCarteScreen');
                        }} >

                        <View style={{
                            flex: 1,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                        }}>
                            <View style={{
                                borderColor: Colors.background,
                                borderWidth: 1,
                                height: 40,
                                width: 40,
                                borderRadius: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Feather name="toggle-right" size={22} color={Colors.text} />
                            </View>

                        </View>

                        <View style={{
                            flex: 3,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                        }}>
                            <Text style={account.compte.carteClientQr != null ? styles.addrowText : styles.addrowTextdesable}>{t('account.enabledisable')}</Text>
                        </View>

                        <View style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                        }}>
                            <Ionicons name="chevron-forward-outline" size={16} color={Colors.gray} />
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity
                        disabled={account.compte.carteClientQr == null}
                        style={styles.addrow}
                        onPress={() => {
                            setQrModalVisible(true);
                        }} >

                        <View style={{
                            flex: 1,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                        }}>
                            <View style={{
                                borderColor: Colors.background,
                                borderWidth: 1,
                                height: 40,
                                width: 40,
                                borderRadius: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <AntDesign name="qrcode" size={22} color={Colors.text} />
                            </View>

                        </View>

                        <View style={{
                            flex: 3,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                        }}>
                            <Text style={account.compte.carteClientQr != null ? styles.addrowText : styles.addrowTextdesable}>{t('account.displaytheqrcode')}</Text>
                        </View>

                        <View style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                        }}>
                            <Ionicons name="chevron-forward-outline" size={16} color={Colors.gray} />
                        </View>
                    </TouchableOpacity>

                </View>

                <LoadingModal setModalVisible={setModalVisible} modalVisible={modalVisible} />

                <CardQrCode
                    isVisible={qrmodalVisible}
                    onClose={() => setQrModalVisible(false)}
                    cardNum={account.compte.carteClientQr?.numCarte}
                />


            </ScrollView>

        </View>
    );


}

const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
        paddingBottom: 0,
        paddingVertical: 10,
    },

    title: {
        color: Colors.text,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingVertical: 5,
        marginTop: 10,
    },

    emptycard: {
        marginTop: 20,
        backgroundColor: '#e6e4e0',
        padding: 10,
        borderRadius: 10,
        height: 190,
        alignItems: 'center',
        justifyContent: 'center',
    },

    mode: {
        height: 40,
        width: 40,
        overflow: 'hidden',
        borderWidth: 1,
        borderRadius: 20,
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

    addrowTextdesable: {
        fontSize: 16,
        color: Colors.gray,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
    },


});


export default CardDetail;
