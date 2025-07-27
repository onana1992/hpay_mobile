/* eslint-disable curly */
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
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Image,
    PermissionsAndroid,
    Rationale,
    Text
} from 'react-native';

import Button from '../../components/Button';
import { useTranslation } from 'react-i18next';
import NoConnectedHeader from '../../components/NoConnectedHeader';
import { useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePickerModal from '../../components/ImagePickerModal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { signIn, } from '../../store/profilSlice';
import { Colors } from '../../themes';
import axios from 'axios';
import LoadingModal from '../../components/LoadingModal';
import StepCompnent from '../../components/StepCompnent';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { saveProfilImage } from '../../services/request';


function PhotoProfilScreen({ navigation }: { navigation: any }) {

    const route = useRoute<any>();
    const { t } = useTranslation();
    const [fileName, setFileName] = React.useState<string>('');
    const [filePath, setFilePath] = React.useState<string>('');
    const [visible, setVisible] = React.useState(false);
    const { phone, idclient } = route.params;


    //{ phone: '4388833759', idclient: "107" };

    const [modalVisible, setModalVisible] = React.useState(false);
   

    const requestCameraPermission = async () => {

        if (Platform.OS === 'android') {


            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission' ,
                        message: 'App needs camera permission',
                    } as Rationale
                );

                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {

                //  alert();
                // console.warn(err);
                return false;
            }
        } else return true;
    };



    const captureImage = async (type: string) => {

        let options = {
            mediaType: 'image',
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            allowsEditing: true,
            saveToPhotos: true,
        };
       
        let isCameraPermitted = await requestCameraPermission();


        if (isCameraPermitted) {
            launchCamera(options, (response) => {

                console.log('Response = ', response);

                if (response.didCancel) {
                    //console.log('User cancelled camera picker');
                    return;
                } else if (response.errorCode === 'camera_unavailable') {
                    /*Toast.show({
                        type: 'message',
                        props: { message: I18n.t('cameranotavailableondevice') },
                        position: 'bottom'
                    });*/
                    console.log('camera_unavailable');
                    return;
                } else if (response.errorCode === 'permission') {
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
                /*console.log('base64 -> ', response.base64);
                console.log('uri -> ', response.uri);
                console.log('width -> ', response.width);
                console.log('height -> ', response.height);
                console.log('fileSize -> ', response.fileSize);
                console.log('type -> ', response.type);
                console.log('fileName -> ', response.fileName);*/
                //console.log('fileName -> ', response.assets[0].uri)

                setFilePath(response.assets[0].uri);
                setFileName(response.assets[0].fileName);
                setVisible(false);

            });
        }
    }



    const chooseFile = (/*type*/) => {

        let options = {
            mediaType:'image',
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

            /*console.log('base64 -> ', response.assets[0].base64);
            console.log('uri -> ', response.assets[0].uri);
            console.log('width -> ', response.assets[0].width);
            console.log('height -> ', response.assets[0].height);
            console.log('fileSize -> ', response.assets[0].fileSize);
            console.log('type -> ', response.assets[0].type);
            console.log('fileName -> ', response.assets[0].fileName);*/

           // setFile(response?.assets[0]);
            setFilePath(response.assets[0].uri);
            setFileName(response.assets[0].fileName);
            setVisible(false);

            //console.log(response.assets[0].uri);

        });

    }



    const sendpicture = async () => {

        let form_data = new FormData();
        let filename = filePath?.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : 'image';


        form_data.append('photo',
            {
                uri: filePath,
                name: filename,
                type: type
            }
        );

        setModalVisible(true);

        saveProfilImage(form_data, idclient).then((response) => {

           //console.log("success");
            setModalVisible(false);
            navigation.navigate('ParrainageScreen', { phone: phone, idclient: idclient })

        }).catch((error) => {

            setModalVisible(false);
            console.log(error.response.data)

            /*Toast.show({
                type: 'error',
                text1: t('error'),
                text2: t('signupscreen.photonotsave'),
                position: 'top'
            });*/

            Toast.show({
                type: 'errorMessage',
                props: { text: t('signupscreen.photonotsave') }
            });

        })
    
    };


    return (
        
        <KeyboardAvoidingView
            style={styles.main}
            enabled={true}
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        >

                <NoConnectedHeader navigation={navigation} />

                <View style={styles.content}>

                    <StepCompnent step={6} />
                    

                    <View style={{ flex: 4, marginTop:50 }}>

                        <View style={styles.avatar}>
                            <Image
                            source={filePath!='' ? { uri: filePath } : require('../../assets/avatar.jpg')}
                                style={styles.avatarImage}
                            />
                            <TouchableOpacity style={styles.addButton} onPress={() => setVisible(true)} >
                                <Ionicons name="camera" size={30} color={Colors.primary} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginBottom: 20 }}>

                        </View>

                        <Text
                            style={styles.title}>
                            {t('photoProfilScreen.title')}
                        </Text>

                        <Text
                            style={styles.subtitle}>
                                {t('photoProfilScreen.titlemsg')}
                            </Text>

                    </View>

                    <View style={{ flex:2,  width: '100%', justifyContent:'flex-end' }}>

                        <Button
                            mode="contained"
                            disabled={filePath === ''}
                            onPress={() => { sendpicture() }}>
                                {t('photoProfilScreen.submit')}     
                        </Button>

                        <Button
                            mode="outlined"
                            onPress={() => { navigation.navigate('ParrainageScreen', { phone: phone, idclient: idclient }) }}>
                            {t('emailscreen.pass')}
                        </Button>

                    </View>


                </View>


            <ImagePickerModal
                title={t('addprofilpicture')}
                isVisible={visible}
                onClose={() => setVisible(false)}
                captureImage={captureImage}
                chooseFile={chooseFile}
            />

            <LoadingModal setModalVisible={setModalVisible} modalVisible={modalVisible} />

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
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent:'center'
    },

    forgotPassword: {
        width: '100%',
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

    avatar: {
        alignItems: 'center',
    },


    avatarImage: {
        height: 140,
        width: 140,
        overflow: 'hidden',
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 70,
    },


    addButton: {
        height: 50,
        width: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        borderColor: 'gray',
        borderWidth:1,
        position: 'absolute',
        right:85,
        bottom: -5,
        alignItems: 'center',
        justifyContent: 'center'
    },

     pageheader: {
        justifyContent: 'flex-start',
        alignItem: 'flex-start',
        marginBottom: 30,
        marginTop:30
    },

    step: {
        flexDirection:'row',
        height: 20,
        width:'100%'
    },

    title: {
        color: Colors.text,
        fontSize: 24,
        fontWeight: "bold",
        textAlign: 'center',
        paddingVertical: 0
    },

    subtitle: {
        color: Colors.text,
        textAlign: 'center',
        fontSize: 14,
        marginTop:0
    },


  


});


export default PhotoProfilScreen;
