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
/*import { Colors } from 'react-native/Libraries/NewAppScreen';*/
import { useTranslation } from 'react-i18next';
import TextInput from '../../components/TextInput';
import { RadioButton } from 'react-native-paper';
import { Colors } from '../../themes';
import Button from '../../components/Button';
import DropdownInput from '../../components/DropdownInput';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePickerModal from '../../components/ImagePickerModal';
import DateInput from '../../components/DateInput';
import axios from 'axios';
import {
    DocumentNumberValidator,
    DateExpValidator
} from '../../helpers/kycValidators';





const Step3 = ({ data, setData, step, setStep }: { data: any, setData: any, step: any, setStep: any }) => {


    const { t } = useTranslation();
 
    const [countryData, setCountryData] = React.useState<any>([]);
    const [doc, setDoc] = React.useState<number>(1);
    const BASE_URL = 'http://10.0.0.133:80/api/';
    const [file, setFile] = React.useState(null);
    const [visible, setVisible] = React.useState(false);
    const [typeId, setTypesId] = React.useState({ value:1 , error: '' });
    const [documentNumber, setDocumentNumber] = React.useState({ value: '', error: '' });
    const [date_exp, setDate_exp] = React.useState<{ value: Date | undefined, error: string }>({ value: undefined, error: '' });

    const data1 = [
        { label: t('kyc.idcard'), value: 1 },
        { label: t('kyc.passport'), value: 2 },
        
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

        if (documentNumberError || dateExpError || data.photo_piece_recto == null ) {
            setDocumentNumber({ ...documentNumber, error: t(`${documentNumberError}`) });
            setDate_exp({ ...date_exp, error: t(`${documentNumberError}`) });
            return;
        }


        const dataExpString = date_exp.value?.getFullYear() + '-' + formatDate(date_exp.value?.getMonth()) + '-' + formatDate(date_exp.value?.getDate());

        console.log(typeId);
 
        setData(
            {
                ...data,
                idtype_piece: typeId.value,
                num_piece: documentNumber.value,
                expire_piece: dataExpString 
            }
        );

        setStep(4);

        setTimeout(() => {

            console.log(data);

        }, 2000);

        

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
        setDoc(val)
        setVisible(true);
    }

    const captureImage = async (type: any) => {

        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
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
                setVisible(false);
                

            });
        }
    }



    const chooseFile = (/*type*/) => {

        let options = {
            //mediaType: type,
            maxWidth: 600,
            maxHeight: 650,
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

            setFile(response?.assets[0]);
            /*setFilePath(response.assets[0].uri);
            setFileName(response.assets[0].fileName);*/
            setVisible(false);

            setTimeout(() => {

                sendpicture(response.assets[0].fileName, response.assets[0].uri);

            }, 1000)
            

            

        });

    }



    const sendpicture = async (fileName:string, filePath:string ) => {

        let form_data = new FormData();
        let filename = fileName?.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : 'image';

        form_data.append('img', { uri: filePath, name: fileName, type: type });
        

        axios.post(`${BASE_URL}upload_image`, form_data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {

            //console.log(response.data.url);

            if (doc === 1) {

                setData({
                    ...data,
                    photo_piece_recto: response.data.url
                })

            } else {

                setData({
                    ...data,
                    photo_piece_verso: response.data.url
                })

            }
            
        }).catch(function (error) {

            console.log(error)
            // setIsloading(false);

        });

    };

    


    return (
        <ScrollView style={styles.main}>
            <KeyboardAvoidingView
                enabled={true}
                //behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
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

                    <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>3. {t('kyc.Identityproof')} </Text>

                </View>

                {
                    step === 3
                    &&
                    <View style={{ justifyContent: 'center', padding: 10 }}>


                        <View style={styles.inputTitle}>
                            <Text style={styles.inputTitleText}>{t('kyc.typeidentitydocument')}*</Text>
                        </View>

                        <DropdownInput
                            placeholder={t('kyc.chooseadocumenttype')}
                            data={data1}
                            value={typeId}
                            onChange={(item:any) => setTypesId({ value: item, error: '' })}
                            search={false}
                            error={!!typeId.error}
                            errorText={typeId.error}
                        />

                        


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

                        <View style={styles.inputTitle}>
                            <Text style={styles.inputTitleText}>{t('kyc.expirationdate')}*</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginVertical: 1, }}>
                            <DateInput
                                label={t('identitycreen.dateofbirth')}
                                value={date_exp.value}
                                onChange={(d: Date | undefined) => setDate_exp({ value: d, error: '' })}
                                hasError={!!date_exp.error}
                                errorText={date_exp.error}
                            />
                        </View>


                        <View style={styles.inputTitle}>
                            <Text style={styles.inputTitleText}>{t('kyc.front')}*</Text>
                        </View>
                        <View style={{ marginTop: 20 }}>
                                <TouchableOpacity disabled={false} style={styles.idcard} onPress={() => { openPicker(1) }}>
                                    {
                                        data.photo_piece_recto == null ?
                                            <ImageBackground source={require('../../assets/imgplaceholder.png')} resizeMode="contain" style={styles.image}>
                                                <Text style={{ color: 'black', padding: 10 }}>{t('kyc.clicktoaddthefront')}</Text>
                                            </ImageBackground>
                                            :
                                            <ImageBackground source={{ uri: data.photo_piece_recto }}  resizeMode="cover" style={styles.image}>
                                                <Text style={{ color: 'black', padding: 10 }}>{t('kyc.clicktoaddthefront')}</Text>
                                            </ImageBackground>

                                    }
                                
                            </TouchableOpacity>
                        </View>

                        {/*source={idFrontImgPath ? { uri: idFrontImgPath } : images.placeholder}*/}



                        <View style={styles.inputTitle}>
                            <Text style={styles.inputTitleText}>{t('kyc.back')}</Text>
                        </View>

                        <View style={{ marginTop: 20, marginBottom: 30 }}>
                            <TouchableOpacity disabled={false} style={styles.idcard} onPress={() => { openPicker(2) }}>
                                    {
                                        data.photo_piece_recto == null ?
                                            <ImageBackground source={require('../../assets/imgplaceholder.png')} resizeMode="contain" style={styles.image}>
                                                <Text style={{ color: 'black', padding: 10 }}>{t('kyc.clicktoaddtheback')}</Text>
                                            </ImageBackground>
                                            :
                                            <ImageBackground source={{ uri: data.photo_piece_verso }} resizeMode="cover" style={styles.image}>
                                                <Text style={{ color: 'black', padding: 10 }}>{t('kyc.clicktoaddtheback')}</Text>
                                            </ImageBackground>

                                    }
                            </TouchableOpacity>
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


});


export default Step3;

