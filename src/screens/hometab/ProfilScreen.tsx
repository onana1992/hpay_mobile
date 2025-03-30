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
    ScrollView,
    Platform,
    PermissionsAndroid,
    Rationale,
    Alert
} from 'react-native';
import { signOut } from '../../store/profilSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from  'react-native-vector-icons/AntDesign';
import MaterialIcons from  'react-native-vector-icons/MaterialIcons';
import FontAwesome from  'react-native-vector-icons/FontAwesome';
import { ListItem } from '@rneui/themed';
import { Colors } from '../../themes';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePickerModal from '../../components/ImagePickerModal';
import { useSelector, useDispatch } from 'react-redux';
import { signIn} from '../../store/profilSlice';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import LangageModal from '../../components/LangageModal';


function ProfilScreen({ navigation }: { navigation: any }) {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [visible, setVisible] = React.useState(false);
    const [langageModalvisible, setLangageModalvisible] = React.useState(false);
    const [fileName, setFileName] = React.useState(null);
    const [filePath, setFilePath] = React.useState<string>('');
    const BASE_URL = 'http://10.0.0.133:5000/api';

    const user = useSelector((state: any) => state.profil.user);
    //console.log(user);

   // console.log(user.client.photoClient);

   React.useEffect(() => {
       setFilePath(user.client.photoClient);
   }, []);


    const logout = () => {
        Alert.alert('', 'Voulez-vous vraiment vous deconnectez', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => confirmLogout() },
        ]);
    };


    const confirmLogout = () => {
        dispatch(signOut(null));
    };


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

                //  alert();
                // console.warn(err);
                return false;
            }
        } else return true;
    };



    const captureImage = async (type: string) => {

        let options = {
            mediaType: 'photo',
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
                //setVisible(false);
                sendpicture(response.assets[0].uri);

            });
        }
    }



    const chooseFile = (/*type*/) => {

        let options = {
            mediaType: 'image',
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
           // setVisible(false);
            sendpicture(response.assets[0].uri);

            //console.log(response.assets[0].uri);

        });

    }


    const sendpicture = async (path:string) => {

        let form_data = new FormData();
        let filename = path?.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : 'image';

        //console.log(path)
       // console.log(filename)
        //console.log(type)

        form_data.append('photo',
            {
                uri: filePath,
                name: filename,
                type: type
            }
        );

       // setModalVisible(true);

       // console.log(`${BASE_URL}/auth/upload-photo/${user.idLoginClient}`);

        axios.post(`${BASE_URL}/auth/upload-photo/${user.idLoginClient}`, form_data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {

           // console.log('success')
           // console.log(response.data.response.data.client.photoClient);
            dispatch(signIn(response.data.response.data));
            
            //setModalVisible(false);
           // navigation.navigate('ParrainageScreen', { phone: phone, idclient: idclient })

        }).catch(function (error) {
            // setModalVisible(false);
            console.log('error')
            console.log(error.response)

        });


    };



    const Header = () => {
        return (
            <View style={{
                backgroundColor: '#ffff', marginTop: 20, marginHorizontal: 10, borderRadius: 20,paddingBottom: 15,
                height: 180,  alignItems: 'center', paddingTop: 10,  borderBottomLeftRadius: 30, marginBottom:50,
                borderBottomRightRadius: 30 }}>
                <View style={styles.avatar}>
                    {filePath ?
                        <Image
                            source={filePath ? { uri: filePath } : require('../../assets/avatar.jpg')}
                            style={styles.avatarImage}
                        />
                        :
                        <View>
                            <Text style={{ color: Colors.text, fontWeight: 'bold', fontSize:26 }}>JJ</Text>
                        </View>

                    }

                    <TouchableOpacity style={styles.addButton} onPress={() => setVisible(true)} >
                        <Ionicons name="camera" size={30} color={Colors.text} />
                    </TouchableOpacity>

                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ color: Colors.text, textAlign:'center', paddingTop: 10, fontSize: 26, fontWeight: 'bold' }}> {user.client.prenoms}{' '}{user.client.nom} </Text>
                    <Text style={{ color: Colors.text, paddingTop: 0 ,marginTop:3,fontSize: 16 }}> {user.login}</Text>
                </View >
            </View>
        );
    };



    return (
        <View style={styles.main}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingVertical: 10 }} >
                <TouchableOpacity style={{
                    justifyContent: 'center',
                    backgroundColor: '#e6e4e0',
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    borderRadius: 20,
                }} onPress={() => { navigation.goBack(); }} >
                    <View>
                        <Ionicons name="chevron-back" color={Colors.text} size={24} />
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView>
                <Header />
                <View style={{ backgroundColor: '#ffff', marginHorizontal: 10, borderRadius: 20, paddingTop: 15, paddingBottom: 15 }}>

                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ color: Colors.text, fontSize: 22, fontWeight: 'bold', paddingVertical: 10 }}>{t('profil.myaccount')}</Text>
                    </View>


                    <ListItem bottomDivider onPress={() => navigation.navigate('MyInfoPersoScreen')} >
                        <AntDesign name="user" size={22} color={Colors.text} />
                        <ListItem.Content>
                            <ListItem.Title style={{ fontSize: 16 }}>{t('profil.mypersonalInfo')}</ListItem.Title>
                        </ListItem.Content>

                        <ListItem.Chevron />
                    </ListItem>

                    <ListItem bottomDivider onPress={() => navigation.navigate('kyc')} >
                        <FontAwesome name="balance-scale" size={20} color={Colors.text} />
                        <ListItem.Content>
                            <ListItem.Title style={{ fontSize: 14, }}>{t('profil.kyccompliance')}</ListItem.Title>
                        </ListItem.Content>

                        <ListItem.Chevron />
                    </ListItem>

                    <ListItem bottomDivider onPress={() => navigation.navigate('MyHistoriesScreen')} >
                        <MaterialIcons name="history" size={24} color={Colors.text} />
                        <ListItem.Content>
                            <ListItem.Title style={{ fontSize: 14 }}>{t('profil.myhistory')}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>


                    <ListItem bottomDivider onPress={() => navigation.navigate('Beneficiaries')} >
                        <AntDesign name="adduser" size={22} color={Colors.text} />
                        <ListItem.Content>
                            <ListItem.Title style={{ fontSize: 14 }}>{t('profil.mybeneficiaries')}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>


                    <ListItem bottomDivider onPress={() => navigation.navigate('MyMessageScreen')} >
                        <AntDesign name="message1" size={22} color={Colors.text} />
                        <ListItem.Content>
                            <ListItem.Title style={{ fontSize: 14 }}>{t('profil.mymessages')}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>

                </View>


                <View style={{ backgroundColor: '#ffff', marginHorizontal: 10, borderRadius: 20, paddingTop: 15, paddingBottom: 15 }}>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ color: Colors.text, fontSize: 22, fontWeight: 'bold', paddingVertical: 10 }}>{t('profil.securityandconfidentiality')}</Text>
                    </View>

                    <ListItem bottomDivider onPress={() => navigation.navigate('ChangePasswordScreen')} >
                        <AntDesign name="lock" size={22} color={Colors.text} />
                        <ListItem.Content>
                            <ListItem.Title style={{ fontSize: 14, }}>{t('profil.changepassword')}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>

                    <ListItem bottomDivider onPress={() => alert()} >
                        <AntDesign name="key" size={22} color={Colors.text} />
                        <ListItem.Content>
                            <ListItem.Title style={{ fontSize: 14, }}>{t('profil.2faAuthentication')}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>

                </View>



                <View style={{ backgroundColor: '#ffff', marginHorizontal: 10, borderRadius: 20, paddingTop: 15, paddingBottom: 15 }}>

                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ color: Colors.text, fontSize: 22, fontWeight: 'bold', paddingVertical: 10 }}>{t('profil.parameters')}</Text>
                    </View>

                    <ListItem bottomDivider onPress={() => setLangageModalvisible(true)} >
                        <Ionicons name="language-outline" size={22} color={Colors.text} />
                        <ListItem.Content>
                            <ListItem.Title style={{ fontSize: 14 }}>{t('profil.language')}</ListItem.Title>
                        </ListItem.Content>

                        <ListItem.Chevron />
                    </ListItem>

                    <ListItem bottomDivider onPress={() => alert()} >
                        <AntDesign name="bells" size={22} color={Colors.text} />
                        <ListItem.Content>
                            <ListItem.Title style={{ fontSize: 14 }}>{t('profil.notificationparameters')}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>

                    <ListItem onPress={() => logout()} >
                        <AntDesign name="logout" size={22} color={Colors.text} />
                        <ListItem.Content>
                            <ListItem.Title style={{ fontSize: 14 }}>{t('profil.logout')}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>

                </View>



                <ImagePickerModal
                    title={t('addprofilpicture')}
                    isVisible={visible}
                    onClose={() => setVisible(false)}
                    captureImage={captureImage}
                    chooseFile={chooseFile}
                />

                

                <LangageModal
                    isVisible={langageModalvisible}
                    onClose={() => setLangageModalvisible(false)}
                />

            </ScrollView>



        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#ffffff',
    },

    header: {
        height: 150,
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        padding: 30,
    },

    profif: {
        marginLeft: 0,
    },

    avatar: {
        width: 100,
        height:100,
       // borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6e4e0',
    },

    avatarImage: {
        height: 100,
        width: 100,
        overflow: 'hidden',
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 50,
    },

    addButton: {
        height: 40,
        width: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        position: 'absolute',
        right: -5,
        bottom: -5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    addButtonIcon: {
        height: 30,
        width: 30,
    },

    usernameText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#ffffff',
        marginTop: 12,
    },
});


export default ProfilScreen;
