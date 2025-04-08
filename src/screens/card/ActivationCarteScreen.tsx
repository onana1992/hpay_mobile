/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable eqeqeq */
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
    KeyboardAvoidingView,
    Pressable,
    Platform,
    Keyboard,
    ScrollView,
    Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { modifyPinRequest, toogleActivationRequest } from '../../services/request';
import { searchClientByPhoneRequest } from '../../services/request';
import Toast from 'react-native-toast-message';
import LoadingModal from '../../components/LoadingModal';
import { saveAccount, signIn } from '../../store/profilSlice';
import { useTranslation } from 'react-i18next';
import { Switch } from 'react-native-paper';
import { NetworkInfo } from 'react-native-network-info';


function pinValidator(pin: string) {
    if (!pin) return "signupscreen.requiredvalue";
    if (pin.length < 4) return "account.pinlessthan4";
    return '';
}


function ActivationCarteScreen({ navigation }: { navigation: any }) {


    const route = useRoute<any>();
    const { account } = route.params;
    const accounts = useSelector((state: any) => state.profil.accounts);
    const [numero, setNumero] = React.useState({ value: account.compte.carteClientQr.numCarte, error: '' });
    const [pin, setPin] = React.useState({ value: account.compte.carteClientQr.pin, error: '' });
    const [pinShow, setPinShow] = React.useState(false);
    const user = useSelector((state: any) => state.profil.user);
    const [modalVisible, setModalVisible] = React.useState(false);
    const dispatch = useDispatch();
    var newAccount: any = null;
    const { t } = useTranslation();
    const [isSwitchOn, setIsSwitchOn] = React.useState(account.compte.carteClientQr.actif == '1');
    const [ipAdress, setIpAddress] = React.useState<string | null>("");

    console.log(account.compte.idCompte);


    React.useEffect(() => {

        NetworkInfo.getIPAddress()
            .then(ip => setIpAddress(ip))
            .catch(error => console.error(error));
    }, []);


    const cancel = () => {
        navigation.goBack();
    };



    const disableCard = () => {
        Alert.alert('', t('account.areyousureyouwanttodisablethiscard'), [
            {
                text: t('no'),
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: t('yes'), onPress: () => toggleCardPin() },
        ]);
    };


    const onToggleSwitch = () => {

        if (account.compte.carteClientQr.actif == '1') {
            disableCard();
        } else {
            toggleCardPin();

        }

    };


    const toggleCardPin = () => {

        setModalVisible(true);
        toogleActivationRequest(
            account.compte.idCompte,
            user.idLoginClient,
            pin.value,
        ).then((response: any) => {

            getClient();
            setIsSwitchOn(!isSwitchOn);

        }).catch((error: any) => {

            Toast.show({
                type: 'error',
                text1: 'EChec',
                text2: "Card non enregistrée",
                position: 'top',
            });
            setModalVisible(false);
            console.log(error.response.data);
        });

    };


    const getClient = () => {

        searchClientByPhoneRequest(user.login).then((response: any) => {
            dispatch(signIn(response.data.response.data));
            fetchAccount(response.data.response.data);
        }).catch((error: any) => {

        });
    };


    const fetchAccount = (parmUser: any) => {

        const mainAccount = parmUser.client.comptes.find((account: any) => {
            if (account.typeCompte.idTypeCompte === 6) {
                return true;
            }
        });

        const otherAccounts = parmUser.client.comptes.filter((account: any) => {

            if (account.typeCompte.idTypeCompte !== 6 && account.typeCompte.idTypeCompte !== 2) {

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



        let newCompte = newAccountsList.find((acc: any) => {
            if (account.id == acc.id) {
                return acc;
            }
        });

        dispatch(saveAccount(newAccountsList));
        setTimeout(() => {
            setModalVisible(false);
            navigation.navigate("CardDetail", { account: newCompte });
        }, 1000);

    };



    const accountName = (account: any) => {

        if (account.compte.devise == "CAD") {
            return "Dollard Canadien";
        }


        else if (account.compte.devise == "USD") {
            return "Dollard Americain";
        }

        else if (account.compte.devise == 'EUR') {
            return "Euro";
        }

        else if (account.compte.devise == 'GBP') {
            return "Livre Sterling";
        }

    };



    const EmptyCard = () => {
        return (
            <View style={styles.emptycard}>
                <Text style={{ color: Colors.text }}> Aucune carte enregistré </Text>
            </View>
        );
    };





    return (
        <View style={styles.main}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                <TouchableOpacity style={{
                    justifyContent: 'center',
                    backgroundColor: '#e6e4e0',
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    borderRadius: 20,
                }} onPress={() => { cancel() }} >
                    <View>
                        <Ionicons name="close" color={Colors.text} size={24} />
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView>

                <View style={{}}>
                    <Text style={styles.title}>{t('account.enabledisable')}</Text>
                </View>


                <KeyboardAvoidingView
                    enabled={true}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ marginTop: 20 }}
                >
                    <Pressable onPress={Keyboard.dismiss}>

                        <Text style={[styles.inputTitleText, { marginBottom: 0 }]}>Compte</Text>
                        <View style={styles.account} >
                            <View style={{ width: '60%', padding: 5 }} >
                                <View style={{ flex: 1, flexDirection: 'row', height: 40, alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <Image
                                        source={account?.icon}
                                        style={styles.currency}
                                    />
                                    <View>
                                        <Text style={{ marginLeft: 5, fontWeight: 'bold', fontSize: 17, color: Colors.text }}>
                                            {account?.compte?.devise}
                                        </Text>
                                        <Text style={{ marginLeft: 5, color: Colors.text, fontWeight: 'bold' }}>{accountName(account)}</Text>
                                    </View>

                                </View>
                            </View>
                        </View>



                        <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 20 }}>
                            <Text style={styles.inputTitleText}>Activer/Désactiver*</Text>
                            <View style={{ flexDirection: 'row', width: '100%', marginTop:10 }}>
                                <Switch
                                    value={isSwitchOn}
                                    onValueChange={onToggleSwitch}
                                    color={isSwitchOn ? Colors.primary : '#9e9e9e'}
                                    style={styles.switch}
                                />
                            </View>
                        </View>


                    </Pressable>

                    <LoadingModal setModalVisible={setModalVisible} modalVisible={modalVisible} />
                </KeyboardAvoidingView>


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

    emptycard: {
        marginTop: 20,
        backgroundColor: '#e6e4e0',
        padding: 20,
        borderRadius: 10,
        height: 160,
        width: '100%',
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

    inputTitleText: {
        flex: 1,
        textAlign: 'left',
        color: Colors.text,
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 16
    },

    account: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: Colors.text,
        height: 70,
        padding: 0,
        marginVertical: 10,
        borderRadius: 5,
        justifyContent: "space-between",
        flexWrap: 'nowrap'
    },

    currency: {
        height: 40,
        width: 40,
        overflow: 'hidden',
        borderWidth: 1,
        borderRadius: 20,
    },

    switch: {
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }], // Custom scale for size
    },

});


export default ActivationCarteScreen;
