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
    Alert,
    KeyboardAvoidingView,
    Pressable,
    Platform,
    Keyboard,
    ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { TextInput as Input } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';


function numeroValidator(numero: string) {
    if (numero) return "signupscreen.requiredvalue"
    /*if (tel.length < 5) return 'Le numero de telephone doit avoir au moins 5 caracteres'*/
    return ''
}


function pinValidator(pin: string) {
    if (pin) return "signupscreen.requiredvalue"
    /*if (tel.length < 5) return 'Le numero de telephone doit avoir au moins 5 caracteres'*/
    return ''
}


function ModifierCardScreen({ navigation }: { navigation: any }) {

    const route = useRoute<any>();
    const [numero, setNumero] = React.useState({ value: '', error: '' });
    const [pin, setPin] = React.useState({ value: '', error: '' });
    const [pinShow, setPinShow] = React.useState(false);
    const { account } = route.params;


    const cancel = () => {
        navigation.goBack();
    };



    const onSubmitPressed = () => {
        const numeroError = numeroValidator(numero.value);
        const pinError = pinValidator(pin.value);

        if (numeroError || pinError) {
            setNumero({ ...numero, error: numeroError });
            setPin({ ...pin, error: pinError });
            return
        }
    }

    const accountName = (account: any) => {

        if (account.compte.devise == "CAD") {
            return "Dollard Canadien"
        }


        else if (account.compte.devise == "USD") {
            return "Dollard Americain"
        }

        else if (account.compte.devise == 'EUR') {
            return "Euro"
        }

        else if (account.compte.devise == 'GBP') {
            return "Livre Sterling"
        }

    }



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
                    <Text style={styles.title}>Modifier la carte associée votre compte</Text>
                </View>


                <KeyboardAvoidingView
                    enabled={true}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ marginTop: 20 }}
                >
                    <Pressable onPress={Keyboard.dismiss}>

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


                        <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start' }}>
                            <Text style={styles.inputTitleText}>Numéro de la carte*</Text>
                            <View style={{ flexDirection: 'row', width: '100%', }}>
                                <TextInput
                                    label={'Entrez le numéro de la carte'}
                                    //returnKeyType="next"
                                    value={numero.value}
                                    inputMode="numeric"
                                    onChangeText={(text: string) => setNumero({ value: text, error: '' })}
                                    error={!!numero.error}
                                    errorText={numero.error}
                                    autoCapitalize="none"
                                    description={undefined}
                                />
                            </View>
                        </View>

                        <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 20 }}>
                            <Text style={styles.inputTitleText}>Code pin*</Text>
                            <View style={{ flexDirection: 'row', width: '100%', }}>
                                <TextInput
                                    label={'entrez le code pin'}
                                    //returnKeyType="done"
                                    inputMode="numeric"
                                    value={pin.value}
                                    onChangeText={(text: string) => setPin({ value: text, error: '' })}
                                    error={!!pin.error}
                                    errorText={pin.error}
                                    secureTextEntry={!pinShow}
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
                                Enregistrer
                            </Button>
                        </View>

                    </Pressable>


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

});


export default ModifierCardScreen;
