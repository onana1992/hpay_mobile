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
    FlatList,
    RefreshControl,
    Platform,
    Keyboard,
    ScrollView,
    Dimensions,
    Pressable
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../themes';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Searchbar } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
import { fetchBeficiariesRequest, fetchBeficiariesInMyContactRequest } from '../../services/request';
import { saveBenefs, saveNewClients } from '../../store/profilSlice';
import Contacts from 'react-native-contacts';
import AvartarButton from '../../components/connected/AvartarButton';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { telValidator } from '../../helpers/telValidator';
import { passwordValidator } from '../../helpers/passwordValidator';
import { confirmPasswordValidator } from '../../helpers/confirmPasswordValidator';
import { TextInput as Input } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import NoConnectedHeader from '../../components/NoConnectedHeader';
import PhoneInput from 'react-native-phone-number-input';
import { signUpRequest } from '../../services/request';
import Toast from 'react-native-toast-message';
import LoadingModal from '../../components/LoadingModal';
import { passforgotUpdatePasswordRequest } from "../../services/request";

function ChangePasswordScreen({ navigation }: { navigation: any }) {

    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [password, setPassword] = React.useState({ value: '', error: '' });
    const [confirmPassword, setConfirmPassword] = React.useState({ value: '', error: '' });
    const [passwordShow, setPasswordShow] = React.useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = React.useState(false);
    const user = useSelector((state: any) => state.profil.user);

    console.log(user);

    const onLoginPressed = () => {


        const passwordError = passwordValidator(password.value);
        const passwordConfirmationError = confirmPasswordValidator(password.value, confirmPassword.value);


        if (passwordError || passwordConfirmationError) {

            setPassword({
                ...password,
                error: t(`${passwordError}`),
            });

            setConfirmPassword({
                ...confirmPassword,
                error: t(`${passwordConfirmationError}`),
            });
            return;
        }

        setModalVisible(true);
        passforgotUpdatePasswordRequest(user.login, password.value).then((response: any) => {

            if (response.data.statusCode === 201) {

                setModalVisible(false);
                /*Toast.show({
                    type: 'error',
                    text1: t('passwordRecover.passwordchanged'),
                    text2: t('passwordRecover.passwordchangedmsg'),
                    position: 'top',
                });*/

                Toast.show({
                    type: 'errorMessage',
                    props: { text: t('passwordRecover.passwordchangedmsg') },
                });

                navigation.popToTop();
            }


        }).catch((error: any) => {


            if (error.response.data.statusCode) {

            }

        });


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
                }} onPress={() => { navigation.goBack() }} >
                    <View>
                        <Ionicons name="chevron-back" color={Colors.text} size={24} />
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView>

                <View style={{}}>
                    <Text style={styles.title}>Changer votre mot de passe</Text>
                </View>

                <Pressable onPress={Keyboard.dismiss}>

                    <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 20 }}>
                        <Text style={styles.inputTitleText}>{t('signupscreen.password')}*</Text>
                        <View style={{ flexDirection: 'row', width: '100%', }}>
                            <TextInput
                                label={t('signupscreen.yourpassword')}
                                returnKeyType="done"
                                value={password.value}
                                onChangeText={(text: string) => setPassword({ value: text, error: '' })}
                                error={!!password.error}
                                errorText={password.error}
                                secureTextEntry={!passwordShow}
                                right={<Input.Icon icon={!passwordShow ? 'eye-off' : 'eye'} onPress={() => { setPasswordShow(!passwordShow) }} />}
                                description={undefined}
                            />
                        </View>
                    </View>


                    <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 20 }}>
                        <Text style={styles.inputTitleText}>{t('signupscreen.passwordconfirmation')}*</Text>
                        <View style={{ flexDirection: 'row', width: '100%', }}>
                            <TextInput
                                label={t('signupscreen.confirmyourpassword')}
                                returnKeyType="done"
                                value={confirmPassword.value}
                                onChangeText={(text: string) => setConfirmPassword({ value: text, error: '' })}
                                error={!!confirmPassword.error}
                                errorText={confirmPassword.error}
                                secureTextEntry={!confirmPasswordShow}
                                right={<Input.Icon icon={!confirmPasswordShow ? 'eye-off' : 'eye'} onPress={() => { setConfirmPasswordShow(!confirmPasswordShow) }} />}
                                description={undefined}
                            />
                        </View>
                    </View>



                    <View style={{ marginTop: 20, flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Button
                            mode="contained"
                            //disabled={!checked}
                            onPress={() => { onLoginPressed() }}>
                            {t('signupscreen.submit')}

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

    inputTitleText: {
        textAlign: 'left',
        color: Colors.text,
        fontWeight: 'bold',
        marginBottom: 10,
    },


});


export default ChangePasswordScreen;
