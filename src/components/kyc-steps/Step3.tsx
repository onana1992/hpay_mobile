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
    PermissionsAndroid,
    Pressable,
    Platform,
    Keyboard,
    ScrollView,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import TextInput from '../../components/TextInput';
import { RadioButton } from 'react-native-paper';
import { Colors } from '../../themes';
import Button from '../../components/Button';
import { useTranslation } from 'react-i18next';
import DropdownInput from '../../components/DropdownInput';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePickerModal from '../../components/ImagePickerModal';
import DateInput from '../../components/DateInput';
import axios from 'axios';
import {
    DocumentNumberValidator,
    DateExpValidator
} from '../../helpers/kycValidators';
import Ionicons from 'react-native-vector-icons/Ionicons';




const Step3 = ({ data, setData, step, setStep }: { data: any, setData: any, step: any, setStep: any }) => {


    const { t } = useTranslation();
    const [countryData, setCountryData] = React.useState<any>([]);
    const [doc, setDoc] = React.useState<number>(1);
    const [title, setTitle] = React.useState<string>(`${t('kyc.addthefrontofyouridentitycard')}`);


    //const BASE_URL = 'http://10.0.0.133:80/api/';
    const BASE_URL = 'https://backend.clanlantene.com/joe92/api/';
    const [file, setFile] = React.useState(null);
    const [visible, setVisible] = React.useState(false);
    const [typeId, setTypeId] = React.useState({ value:null , error: '' });
    const [documentNumber, setDocumentNumber] = React.useState({ value: '', error: '' });
    const [date_exp, setDate_exp] = React.useState<{ value: Date | undefined, error: string }>({ value: undefined, error: '' });
    const [documentFrontUri, setDocumentFrontUri] = React.useState<string | null | undefined>(null);
    const [documentBackUri, setDocumentBackUri] = React.useState < string | null | undefined>(null);


    const identityTypes = [
        { label: t('kyc.idcard'), value: 2 },
        { label: t('kyc.passport'), value: 1 },
        { label: t('kyc.drivenlicence'), value: 3 },
        { label: t('kyc.consularcard'), value: 4 }
    ];


    const onBack = () => {
        setStep((PrevStep: number) => {
            return PrevStep - 1;
        })
    };


    function formatDate(val: any) {
        if (Number(val) > 9) {
            return val
        } else {
            return '0' + val;
        }
    }



    const onValid = () => {


        const documentNumberError = DocumentNumberValidator(documentNumber.value);
        const dateExpError = DateExpValidator(date_exp.value);
        const typeIdError = typeId.value == null ? 'requiredValue' : '';
        const versoError = documentFrontUri == null;
        

        if (documentNumberError || dateExpError || typeIdError || versoError) {
            setDocumentNumber({ ...documentNumber, error: t(`${documentNumberError}`) });
            setDate_exp({ ...date_exp, error: t(`${documentNumberError}`) });
            setTypeId({ ...typeId, error: t(`${typeIdError}`) });
            return;
        }
       

        const dataExpString = date_exp.value?.getFullYear() + '-' + formatDate(date_exp.value?.getMonth() + 1) + '-' + formatDate(date_exp.value?.getDate());

        setData(
            {
                ...data,
                idtype_piece: typeId.value,
                num_piece: documentNumber.value,
                expire_piece: dataExpString, 
            }
        );

        setStep(4);
    }


    const requestCameraPermission = async () => {

        if (Platform.OS === 'android') {


            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    } as Rationale
                );

                // If CAMERA Permission is granted

                return granted === PermissionsAndroid.RESULTS.GRANTED;

            } catch (err) {

                return false;
            }
        }
        else {
            return true;
        } 
    };



    const openPicker = (val: number) => {

        if (val === 1) {
            setTitle(`${t('kyc.addthefrontofyouridentitycard')}`)
        } else {

            setTitle(`${t('kyc.addthebackofyouridentitycard')}`)
        }

        setDoc(val)
        setVisible(true);
    }



    const captureImage = async () => {

        let options = {
            mediaType: 'photo',
            maxWidth: 1200,
            maxHeight: 1200,
            quality: 1,
            allowsEditing: true,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: true,
        };

        let isCameraPermitted = await requestCameraPermission();


        if (isCameraPermitted) {

            launchCamera(options, (response) => {

                console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled camera picker');
                    return;
                } else if (response.errorCode === 'camera_unavailable') {
                    /*Toast.show({
                        type: 'message',
                        props: { message: I18n.t('cameranotavailableondevice') },
                        position: 'bottom'
                    });*/
                    console.log('camera_unavailable');
                    return;
                } else if (response.errorCode == 'permission') {
                    /*Toast.show({
                        type: 'message',
                        props: { message: I18n.t('permissionnotsatisfied') },
                        position: 'bottom'
                    });*/
                    console.log('permission');
                    return;
                } else if (response.errorCode == 'others') {
                    /*Toast.show({
                        type: 'message',
                        props: { message: I18n.t('contactaddwithsuccess') },
                        position: 'bottom'
                    });*/
                    return;
                }

               

               /* setFilePath(response.assets[0].uri);
                setFileName(response.assets[0].uri);
                setFile(response.assets[0]);*/

                //sendpicture(response.assets[0].uri, response.assets[0].uri);
                if (doc === 1) {
                    setDocumentFrontUri(response.assets[0].uri);
                    setData(
                        {
                            ...data,
                            photo_piece_recto: response.assets[0],
                        }
                    );
                } else {
                    setData(
                        {
                            ...data,
                            photo_piece_verso: response.assets[0].uri,
                        }
                    );
                    setDocumentBackUri(response.assets[0].uri);
                }
               
                setVisible(false);
                

            });
        }
    }



    const chooseFile = () => {

        let options = {
            mediaType: 'photo',
            maxWidth: 1200,
            maxHeight: 1200,
            quality: 1,
            allowsEditing: true,
        };


        launchImageLibrary(options, (response) => {

            if (response.didCancel) {
                //alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                /*Toast.show({
                    type: 'message',
                    props: { message: I18n.t('cameranotavailableondevice') },
                    position: 'bottom'
                });*/
                return;
            } else if (response.errorCode == 'permission') {
                /*Toast.show({
                    type: 'message',
                    props: { message: I18n.t('permissionnotsatisfied') },
                    position: 'bottom'
                });*/
                return;
            } else if (response.errorCode == 'others') {
                /*Toast.show({
                    type: 'message',
                    props: { message: I18n.t('permissionnotsatisfied') },
                    position: 'bottom'
                });*/
                //alert(response.errorMessage);
                return;
            }

            //setFile(response?.assets[0]);
            /*setFilePath(response.assets[0].uri);
            setFileName(response.assets[0].fileName);*/

            if (doc === 1) {
                console.log(response.assets[0])
                setDocumentFrontUri(response.assets[0].uri);
                setData(
                    {
                        ...data,
                        photo_piece_recto: response.assets[0],
                    }
                );
            } else {
                setData(
                    {
                        ...data,
                        photo_piece_verso: response.assets[0],
                    }
                );
                setDocumentBackUri(response.assets[0].uri);
            }
            setVisible(false);

            /*setTimeout(() => {

                sendpicture(response.assets[0].fileName, response.assets[0].uri);

            }, 1000)*/
            
        });

    }




    


    return (
        <ScrollView style={styles.main}>
            <KeyboardAvoidingView
                enabled={true}
                //behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            >

                <View style={{
                    width: '100%',
                    backgroundColor: '#e6e4e0',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderRadius: 10,
                    height: 50,
                    paddingHorizontal: 10
                }}>

                    <View style={{ justifyContent:'center'}}>
                        <Text style={{ fontSize: 16, color: Colors.text, fontWeight: 'bold' }}>3. {t('kyc.Identityproof')} </Text>
                    </View>

                    <View style={{ justifyContent:'center'}}>
                       <Ionicons name="checkmark-done-outline" size={20} color={step > 3 ? Colors.primary : 'gray'}/>
                    </View>

                </View>

                {
                    step === 3
                    &&
                    <View style={{ justifyContent: 'center', padding: 10 }}>

                        <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 10}}>
                            <View style={styles.inputTitle}>
                                <Text style={styles.inputTitleText}>{t('kyc.typeidentitydocument')}*</Text>
                            </View>

                            <DropdownInput
                                placeholder={t('kyc.chooseadocumenttype')}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                data={identityTypes}
                                value={typeId.value}
                                onChange={(item: any) => setTypeId(item)}
                                search={false}
                                error={!!typeId.error}
                                errorText={typeId.error}
                            />
                        </View>

                        
                        <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 10}}>

                            <View style={styles.inputTitle}>
                                    <Text style={styles.inputTitleText}>{t('kyc.numberofthedocument')}*</Text>
                            </View>

                            <TextInput
                                label={t('kyc.numberofthechoosedocument')}
                                returnKeyType="next"
                                value={documentNumber.value}
                                onChangeText={(text: string) => setDocumentNumber({ value: text, error: '' })}
                                error={!!documentNumber.error}
                                errorText={documentNumber.error}
                                autoCapitalize="none"
                                description={undefined}
                            />
                        </View>

                        <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 10}}>
                            <View style={styles.inputTitle}>
                                <Text style={styles.inputTitleText}>{t('kyc.expirationdate')}*</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginVertical: 1, }}>
                                <DateInput
                                        label={t('kyc.expirationdate')}
                                    value={date_exp.value}
                                    onChange={(d: Date | undefined) => setDate_exp({ value: d, error: '' })}
                                    hasError={!!date_exp.error}
                                    errorText={date_exp.error}
                                />
                            </View>
                        </View>



                        <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 10}}>
                            <View style={styles.inputTitle}>
                                <Text style={styles.inputTitleText}>{t('kyc.front')}*</Text>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <TouchableOpacity disabled={false} style={styles.idcard} onPress={() => { openPicker(1) }}>
                                        {
                                            data.photo_piece_recto == null ?
                                                <ImageBackground source={require('../../assets/placeholderimg.png')} resizeMode="contain" style={styles.image}>
                                                    <Text style={{ color: Colors.text, padding: 10 }}>{t('kyc.clicktoaddthefront')}</Text>
                                                </ImageBackground>
                                                :
                                                <ImageBackground source={{ uri: data.photo_piece_recto.uri }}  resizeMode="cover" style={styles.image}>
                                                    <Text style={{ color: Colors.text, padding: 10 }}>{t('kyc.clicktoaddthefront')}</Text>
                                                </ImageBackground>

                                        }
                                
                                </TouchableOpacity>
                                </View>
                                {documentFrontUri === null ? <Text style={styles.error}>{t('requiredDocument')}</Text> : null}
                                
                        </View>

                        {/*source={idFrontImgPath ? { uri: idFrontImgPath } : images.placeholder}*/}


                        <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 10}}>
                            <View style={styles.inputTitle}>
                                <Text style={styles.inputTitleText}>{t('kyc.back')}</Text>
                            </View>

                            <View style={{ marginTop: 10, marginBottom: 30 }}>
                                <TouchableOpacity disabled={false} style={styles.idcard} onPress={() => { openPicker(2) }}>
                                        {
                                            data.photo_piece_verso == null ?
                                                <ImageBackground source={require('../../assets/placeholderimg.png')} resizeMode="contain" style={styles.image}>
                                                    <Text style={{ color: Colors.text, padding: 10 }}>{t('kyc.clicktoaddtheback')}</Text>
                                                </ImageBackground>
                                                :
                                                <ImageBackground source={{ uri: data.photo_piece_verso.uri }} resizeMode="cover" style={styles.image}>
                                                    <Text style={{ color: Colors.text, padding: 10 }}>{t('kyc.clicktoaddtheback')}</Text>
                                                </ImageBackground>

                                        }
                                </TouchableOpacity>
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
                                    onPress={() => { onValid() }}>
                                    {t('kyc.next')}
                                </Button>
                            </View>

                        </View>


                    </View>
                }

                
            </KeyboardAvoidingView>
            <ImagePickerModal
                title={title}
                isVisible={visible}
                onClose={() => setVisible(false)}
                captureImage={captureImage}
                chooseFile={chooseFile}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    main: {
        backgroundColor: '#ffff',
        flex: 1,
        marginTop: 20,
        borderRadius: 5,
        marginBottom: 0,
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
        fontWeight: 'bold',
         marginBottom: 15,
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
        color: Colors.text,
    },

    selectedTextStyle: {
        fontSize: 16,
        color: Colors.text,
    },

    iconStyle: {
        width: 20,
        height: 20,
    },

    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: Colors.text
    },

    idcard: {
        flex: 1,
        alignItems: 'center',
        height: 140,
        width: '100%',
        overflow: 'hidden',
        borderColor: 'grey',
        borderWidth: 0.5,
        borderRadius: 5
    },


    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    

     iconImage: {
        height: 70,
        width: 70,
        overflow: 'hidden',
        marginBottom: 10,
    },

    error: {
        fontSize: 13,
        color: '#BA001A',
        paddingTop: 4,
    },

    

});


export default Step3;

