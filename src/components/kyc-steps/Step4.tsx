/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */

import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Pressable,
    Platform,
    Keyboard,
    ScrollView,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
/*import { Colors } from 'react-native/Libraries/NewAppScreen';*/
import { useTranslation } from 'react-i18next';
import TextInput from '../../components/TextInput';
import { RadioButton } from 'react-native-paper';
import { Colors } from '../../themes';
import Button from '../../components/Button';
import DropdownInput from '../../components/DropdownInput';
import { postKycRequest } from '../../services/request';
import { Checkbox } from 'react-native-paper';
import LoadingModal from '../../components/LoadingModal';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';



const Step4 = ({ data, setData, step, setStep }: { data: any, setData: any, step: any, setStep: any }) => {


    const { t } = useTranslation();
    const [checked, setChecked] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const navigation = useNavigation();
    const onBack = () => {
        setStep((PrevStep: number) => {
            return PrevStep - 1;
        })
    }


    const onSubmit = () => {

        if (checked) {

            setModalVisible(true);
            console.log(data)
            postKycRequest(data).then((response: any) => {

                console.log(response.data);

                if (response.data.success === true) {

                    setModalVisible(false);
                    navigation.goBack();
                    Toast.show({
                        type: 'success',
                        text1: t('kyc.success'),
                        text2: t('kyc.successmsg'),
                        position: 'top'
                    });

                } else {

                    setModalVisible(false);

                }


            }).catch((error: any) => {

                console.log(error);
                // setModalVisible(false);
            })

        }

    }



    return (
        <ScrollView style={styles.main}>
            <KeyboardAvoidingView
                enabled={true}
                behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            >

                <View style={{
                    width: '100%',
                    justifyContent: 'center',
                    backgroundColor: 'black',
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5,
                    height: 50,
                    alignItems: 'flex-start',
                    paddingLeft: 10
                }}>

                    <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>4. {t('kyc.declaration')}</Text>

                </View>

                {
                    step === 4
                    &&
                    <View style={{ justifyContent: 'center', padding: 10 }}>

                        <View style={{padding:10}}>
                            <Text style={{ paddingBottom: 10, color: 'black', textAlign: 'justify' }}>{t('kyc.declationtext')}</Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: "center" }}>

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: "center" }}>
                                <Checkbox
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                    color={Colors.primary}
                                />
                                    <Text style={styles.forgot}>{t('kyc.readandapproved')} </Text>
                               
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', flex: 1 }}>

                            <View style={{ flex: 1, padding: 5 }}>
                                <Button
                                    mode="outlined"
                                    onPress={() => { onBack() }}>
                                    {t('kyc.previous')}
                                </Button>
                            </View>

                            <View style={{ flex: 1, padding: 5 }}>
                                <Button
                                    mode="contained"
                                        onPress={() => { onSubmit() }}>
                                    {t('kyc.submit')}
                                </Button>
                            </View>

                        </View>
                    </View>
                }

            </KeyboardAvoidingView>
            <LoadingModal setModalVisible={setModalVisible} modalVisible={modalVisible} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    main: {
        backgroundColor: '#ffff',
        flex: 1,
        marginTop: 20,
        borderRadius: 5,
        marginBottom: 20,
    },


    inputTitle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginVertical: -10,
        marginTop: 10
    },


    inputTitleText: {
        flex: 1,
        textAlign: 'left',
        color: Colors.text,
        fontWeight: 'bold'
    },


    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginTop: 20
    },

    icon: {
        marginRight: 5,
    },

    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },

    idcard: {
        flex: 1,
        alignItems: 'center',
        height: 140,
        width: '100%',
        overflow: 'hidden',
        borderColor: 'grey',
        borderWidth: 0.5,
    },


    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    forgot: {
        fontWeight: 'bold',
        color: Colors.text,
    },


});


export default Step4;

