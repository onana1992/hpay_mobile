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
    ScrollView, Platform
} from 'react-native';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { Colors } from '../../themes';
import { useTranslation } from 'react-i18next';
import NoConnectedHeader from '../../components/NoConnectedHeader';
import LoadingModal from '../../components/LoadingModal';
import StepCompnent from '../../components/StepCompnent';
import { TextInput as Input} from 'react-native-paper';
import SponsorSearchModal from '../../components/signUp/SponsorSearchModal';
import EndSignUpModal from '../../components/signUp/EndSignUpModal'
import { searchClientBySponsorShipCodeRequest } from '../../services/request';
import Toast from 'react-native-toast-message';
import { useRoute } from '@react-navigation/native';



function ParrainageScreen({ navigation}: {navigation:any}) {

    const route = useRoute<any>();
    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [endModalVisible, setEndModalVisible] = React.useState(false);
    const [telephone, setTelephone] = React.useState({ value: '', error: '' });
    const [code, setCode] = React.useState({ value: '', error: '' });
    const [client, setClient] = React.useState(null);
    const { phone, idclient } = route.params;
    const [sponsorModalVisible, setSponsorModalVisible] = React.useState<boolean>(false);
    

     // console.log(route.params);
     //const idclient = 43;
     //const phone = '14388833743';

   const closeEndSignUp = () =>{
       setEndModalVisible(false)
       navigation.popToTop();
   }
    

    const pass = () => {
        //navigation.popToTop();
        setEndModalVisible(true);
    }


    const indicator = ()=>{
        return 'HPAY_';
    }


    const lauchSponsorSearch = () => {


        const codeError = code.value !== '' ? '' : 'requiredValue';
        

        if (codeError) {
            setCode({ ...telephone, error: t(`${codeError}`) })
            return;
        }

       
        setModalVisible(true);
        searchClientBySponsorShipCodeRequest('HPAY_' + code.value).then((response: any) => {

            //console.log(response.data.response.data.prenoms);
            setModalVisible(false);
            setClient(response.data.response.data);
            setSponsorModalVisible(true);

        }).catch((_error: any) => {

            //console.log(_error);

            setModalVisible(false);

            if (_error.response.status === 404) {
/*
                Toast.show({
                    type : 'error',
                    text1 : t('sponsorship.failure'),
                    text2 : t('sponsorship.clientnotfound'),
                    position : 'top'
                });*/

                Toast.show({
                    type: 'errorMessage',
                    props: { text: t('sponsorship.clientnotfound') }
                });

            } else {


            }


        })


    }

     
    return (
   
        <KeyboardAvoidingView
            enabled={true}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.main}
        >
            <NoConnectedHeader navigation={navigation} />
            <ScrollView >

                <View style={{ alignItems:'flex-start' }}>
                           
                   <StepCompnent step={7} />

                   <View style={styles.pageheader}>
                        <Text style={styles.title}>{t('sponsorship.title')}</Text>
                        <Text style={styles.subtitle}>
                            {t('sponsorship.titlemsg')}
                        </Text>


                   </View>


                    <View style={{ alignContent: 'flex-end', justifyContent: 'flex-end', marginTop: 20 }}>
                        <Text style={styles.inputTitleText}>{t('sponsorship.code')}*</Text>
                        <View style={{ flexDirection: 'row', width: '100%', }}>
                            <TextInput
                                label={t('sponsorship.entrersponsorcode')}
                                returnKeyType="done"
                                value={code.value}
                                //inputMode="numeric"
                                error={!!code.error}
                                errorText={code.error}
                                onChangeText={(text: string) => setCode({ value: text, error: '' })}
                                description={undefined}
                                left={<Input.Affix textStyle={{ color: Colors.text }} text={indicator()} />}

                            />


                        </View>
                    </View>

                </View>



            </ScrollView>
            <View style={{ marginTop: 10, width: '100%', justifyContent:'flex-end' }}>
                <Button
                    mode="contained"
                    onPress={() => { lauchSponsorSearch()   }}>
                    {t('sponsorship.addassponsor')}
                </Button>

                <Button
                    mode="outlined"
                    onPress={() => { pass() }}>
                    {t('emailscreen.pass')}
                </Button>
            </View>
            <LoadingModal setModalVisible={setModalVisible} modalVisible={modalVisible} />

            <SponsorSearchModal
                isVisible={sponsorModalVisible}
                onClose={() => setSponsorModalVisible(false)}
                client={client}
                phone={phone}
                setEndModalVisible= {setEndModalVisible}
            />

            <EndSignUpModal
                endModalVisible = {endModalVisible} 
                closeEndSignUp = {closeEndSignUp}
            />

        </KeyboardAvoidingView> 
    );
}

const styles = StyleSheet.create({

    main: {
        backgroundColor: '#ffff',
        flex: 1,
        padding: 20,
    },

    content: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
    },

    forgotPassword: {
        
        alignItems: 'flex-end',
        marginBottom: 24,
    },

    row: {
        flexDirection: 'row',
        marginTop: 4,
    },

    forgot: {
        fontSize: 13,
        color: Colors.text,
    },

    link: {
        fontWeight: 'bold',
        color: Colors.primary,
    },
    
    inputTitleText: {
        textAlign: 'left',
        color: Colors.text,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    pageheader: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItem: 'flex-start',
        marginBottom: 30,
        marginTop: 30
    },

    step: {
        flexDirection: 'row',
        height: 20,
        width: '100%'
    },

    title: {
        color: Colors.text,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingVertical: 5,
        marginTop: 0,
    },

    subtitle: {
        fontSize: 14,
        color: Colors.text,
        marginTop: 0,
    },

    placeholderStyle: {
        fontSize: 16,
        color: 'gray',
    },


    selectedTextStyle: {
        fontSize: 16,
        color: 'black',
    },


    iconStyle: {
        width: 20,
        height: 20,
    },


    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: 'black',
    },

     iconImage: {
        height: 120,
        width: 120,
        overflow: 'hidden',
        marginBottom: 10,
    },

    dropdown: {
        width: '100%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginTop: 10,
    },

    error: {
        fontSize: 13,
        color: '#BA001A',
        paddingTop: 4,
    },

});

export default ParrainageScreen;


