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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { TextInput as Input } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { modifyPinRequest } from '../../services/request';
import { searchClientByPhoneRequest } from '../../services/request';
import Toast from 'react-native-toast-message';
import LoadingModal from '../../components/LoadingModal';
import { saveAccount, signIn } from '../../store/profilSlice';
import { NetworkInfo } from 'react-native-network-info';
import { useTranslation } from 'react-i18next';


function pinValidator(pin: string) {
    if (!pin) return "signupscreen.requiredvalue";
    if (pin.length < 4) return "account.pinlessthan4";
    return '';
}


function ModifyCardPinScreen({ navigation }: { navigation: any }) {


    const route = useRoute<any>();
    const { account } = route.params;
    const accounts = useSelector((state: any) => state.profil.accounts);
    const [numero, setNumero] = React.useState({ value: account.compte.carteClientQr.numCarte, error: '' });
    const [pin, setPin] = React.useState({ value: account.compte.carteClientQr.pin, error: '' });
    const [pinShow, setPinShow] = React.useState(false);
    const user = useSelector((state: any) => state.profil.user);
    const [modalVisible, setModalVisible] = React.useState(false);
    const dispatch = useDispatch();
    const [ipAdress, setIpAddress] = React.useState<string|null>("");
    var newAccount: any = null;
    const { t } = useTranslation();



    React.useEffect(() => {
        NetworkInfo.getIPAddress()
            .then(ip => setIpAddress(ip))
            .catch(error => console.error(error));
    }, []);


    const cancel = () => {
        navigation.goBack();
    };



    const onSubmitPressed = () => {

        const pinError = pinValidator(pin.value);

        if ( pinError) {
            setPin({ ...pin, error: pinError });
            return;
        }

        else {

            modifyPin();

        }

    };


    const modifyPin = () => {

        setModalVisible(true);
        modifyPinRequest(
            account.compte.idCompte,
            user.idLoginClient,
            pin.value,
            ipAdress
        ).then((response: any) => {

            getClient();

        }).catch((error: any) => {

            Toast.show({
                type: 'error',
                text1: 'EChec',
                text2: "Card non enregistrée",
                position: 'top',
            });
            setModalVisible(false);
            //console.log(error);
        });

    };



    const getClient = () => {

        searchClientByPhoneRequest(user.login).then((response: any) => {
            dispatch(signIn(response.data.response.data));
            fetchAccount(response.data.response.data);
            Toast.show({
                type: 'success',
                text1: 'Succès',
                text2: "Code pin modifié",
                position: 'top',
            });
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





    return (
        <View style={styles.main}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <TouchableOpacity style={{
                    justifyContent: 'center',
                    backgroundColor: '#e6e4e0',
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    borderRadius: 20,
                }} onPress={() => { cancel(); }} >
                    <View>
                        <Ionicons name="close" color={Colors.text} size={24} />
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView>

                <View style={{}}>
                    <Text style={styles.title}>{t('account.changeyourcardcode')}</Text>
                </View>


                <KeyboardAvoidingView
                    enabled={true}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ marginTop: 20 }}
                >
                    <Pressable onPress={Keyboard.dismiss}>

                        <Text style={[styles.inputTitleText, { marginBottom: 0 }]}>{t('account.account')}</Text>
                        <View style={styles.account} >
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }}>

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

                                <Text style={{ marginTop: 10, marginLeft: 5, fontWeight: 'bold', fontSize: 17, color: Colors.text }}>
                                    {account?.compte.devise}
                                </Text>

                            </View>
                        </View>

                        {/*<View style={styles.account} >
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
                        </View>*/}


                        <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 20 }}>
                            <Text style={styles.inputTitleText}>{t('account.pincode')}*</Text>
                            <View style={{ flexDirection: 'row', width: '100%', }}>
                                <TextInput
                                    label={t('account.enterthepincode')}
                                    //returnKeyType="done"
                                    inputMode="numeric"
                                    value={pin.value}
                                    onChangeText={(text: string) => setPin({ value: text, error: '' })}
                                    error={!!pin.error}
                                    errorText={pin.error}
                                    secureTextEntry={!pinShow}
                                    maxLength={4}
                                    right={<Input.Icon icon={!pinShow ? 'eye-off' : 'eye'} onPress={() => { setPinShow(!pinShow) }} />}
                                    description={undefined}
                                />
                            </View>
                        </View>



                        <View style={{ width: '100%', marginTop: 20 }}>
                            <Button
                                mode="contained"
                                onPress={() => { onSubmitPressed() }}
                            >
                                {t('account.save')}
                            </Button>
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
        fontSize: 16,
    },

    account: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: Colors.text,
        height: 50,
        padding: 0,
        marginVertical: 10,
        borderRadius: 5,
        justifyContent: "center",
        flexWrap: 'nowrap',
        alignItems: 'center',
    },

    currency: {
        height: 40,
        width: 40,
        overflow: 'hidden',
        borderWidth: 1,
        borderRadius: 20,
    },

});


export default ModifyCardPinScreen;
