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
    Pressable,
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
import { addCardRequest, searchClientByPhoneRequest } from '../../services/request';
import Toast from 'react-native-toast-message';
import LoadingModal from '../../components/LoadingModal';
import { saveAccount, signIn } from '../../store/profilSlice';
import { NetworkInfo } from 'react-native-network-info';
import { useTranslation } from 'react-i18next';
import { TextInputMask } from 'react-native-masked-text';



function numeroValidator(numero:string) {
    if (!numero) return "signupscreen.requiredvalue";
    if (numero.length < 19) return "account.numerolessthan16";
    if (numero.slice(0, 2) != "57") return "account.mustStartwith57";
    return '';
}


function pinValidator(pin: string) {
    if (!pin) return "signupscreen.requiredvalue";
    if (pin.length < 4) return "account.pinlessthan4";
    return '';
}


function AddCardScreen({ navigation }: { navigation: any }) {

    const route = useRoute<any>();
    const accounts = useSelector((state: any) => state.profil.accounts);
    const [numero, setNumero] = React.useState({ value: '', error: '' });
    const [pin, setPin] = React.useState({ value: '', error: '' });
    const [pinShow, setPinShow] = React.useState(false);
    const { account } = route.params;
    const user = useSelector((state: any) => state.profil.user);
    const [modalVisible, setModalVisible] = React.useState(false);
    const dispatch = useDispatch();
    const [ipAdress, setIpAddress] = React.useState<string | null>("");
    const { t } = useTranslation();


    React.useEffect(() => {
        NetworkInfo.getIPAddress()
            .then(ip => setIpAddress(ip))
            .catch(error => console.error(error));
    }, []);


    const cancel = () => {
        navigation.goBack();
    };


    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Get month and pad it with leading zero if necessary
        const day = String(today.getDate()).padStart(2, '0'); // Get day and pad it with leading zero if necessary
        return `${year}-${month}-${day}`;
    }


    function getDatePlusTwoYears() {
        const today = new Date();
        today.setFullYear(today.getFullYear() + 2); // Add 2 years
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Get month and pad it with leading zero if necessary
        const day = String(today.getDate()).padStart(2, '0'); // Get day and pad it with leading zero if necessary
        return `${year}-${month}-${day}`;
    }



    const onSubmitPressed = () => {

        const numeroError = numeroValidator(numero.value);
        const pinError = pinValidator(pin.value);


        if (numeroError || pinError) {
            setNumero({ ...numero, error: numeroError });
            setPin({ ...pin, error: pinError });
            return;
        }

        /*if (numero.value.length != 19) {
            return;
        } else if (numero.value.slice(0, 2) != "57") {
            return;
        }*/

        else {

            saveCard();

        }

    };



    const saveCard = () => {

        let formatNumber = numero.value.replace(/\s+/g, '');

        setModalVisible(true);
        addCardRequest(
            account.compte.idCompte,
            user.idLoginClient,
            formatNumber, getCurrentDate(),
            getDatePlusTwoYears(),
            pin.value,
            user.client.id,
            ipAdress
        ).then((response: any) => {

            /*Toast.show({
                type: 'success',
                text1: t('success'),
                text2: t('account.cardaddedsucceffuly'),
                position: 'top',
            });*/

            Toast.show({
                type: 'succesMessage',
                props: { text: t('account.cardaddedsucceffuly') },
            });

            getClient();


        }).catch((error: any) => {


           //console.log(error.response.data);

            if (error.response.data.message == "Card Dejà utilisé") {

                /*Toast.show({
                    type: 'error',
                    text1: t('Error'),
                    text2: t('account.CardAlreadyUsed') ,
                    position: 'top',
                });*/

                Toast.show({
                    type: 'errorMessage',
                    props: { text: t('account.CardAlreadyUsed') },
                });

            }


            if (error.response.data.message == "Card not found") {
                /*Toast.show({
                    type: 'error',
                    text1: t('Error'),
                    text2: t('account.CardAlreadyUsed'),
                    position: 'top',
                });*/

                Toast.show({
                    type: 'errorMessage',
                    props: { text: t('account.CardAlreadyUsed') },
                });

            }


            if (error.response.data.message == "not valid code pin") {
                /*Toast.show({
                    type: 'error',
                    text1: t('Error'),
                    text2: t('account.invalidcodepin'),
                    position: 'top',
                });*/

                Toast.show({
                    type: 'errorMessage',
                    props: { text: t('account.invalidcodepin') },
                });

            }

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
                }} onPress={() => { cancel(); }} >
                    <View>
                        <Ionicons name="close" color={Colors.text} size={24} />
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView>

                <View style={{}}>
                    <Text style={styles.title}>{t('account.Addthecardtoyouraccount')} </Text>
                </View>

                <Pressable onPress={Keyboard.dismiss} style={{marginTop:20} }>

                    <Text style={[styles.inputTitleText, { marginBottom: 0 }]}>{t('account.account')}</Text>


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

                    <View style={styles.account} >
                            <View style={{ flex: 1, flexDirection: 'row',  alignItems: 'flex-start' }}>

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

                    <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start' }}>
                        <Text style={styles.inputTitleText}>{t('account.Cardnumber')}*</Text>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            {/*<TextInput
                                label={t('account.Enterthecardnumber')}
                                //returnKeyType="next"
                                value={numero.value}
                                inputMode="numeric"
                                onChangeText={(text: string) => setNumero({ value: text, error: '' })}
                                error={!!numero.error}
                                errorText={numero.error}
                                autoCapitalize="none"
                                maxLength={16}
                                description={undefined}
                            />*/}

                            <TextInput
                                label={t('account.Enterthecardnumber')}
                                value={numero.value}
                                inputMode="numeric"
                                onChangeText={(text: string) => setNumero({ value: text, error: '' })}
                                error={!!numero.error}
                                errorText={numero.error}
                                autoCapitalize="none"
                                //maxLength={16}
                                description={undefined}
                                render={props =>
                                    <TextInputMask
                                        {...props}
                                        type={'credit-card'}
                                    />
                                }
                            />

                        </View>
                    </View>


                    <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop:20 }}>
                    <Text style={styles.inputTitleText}>{t('account.pincode')}*</Text>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
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
                        onPress={() => { onSubmitPressed(); }}
                        >
                        {t('account.save')}
                        </Button>
                    </View>

                    <LoadingModal setModalVisible={setModalVisible} modalVisible={modalVisible} />

                </Pressable>


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
        fontSize:16
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
        alignItems:'center',
    },

    currency: {
        height: 40,
        width: 40,
        overflow: 'hidden',
        borderWidth: 1,
        borderRadius: 20,
    },

    maskedInput: {
        borderWidth: 0.5,
        borderRadius: 5,
        width: '100%',
        padding: 10,
        color: 'black',
        fontSize: 18,
        marginBottom: 0,
    },


});


export default AddCardScreen;
