﻿/* eslint-disable curly */
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
    Rationale, Alert } from 'react-native';
import { signOut } from '../store/profilSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from  'react-native-vector-icons/AntDesign';
import MaterialIcons from  'react-native-vector-icons/MaterialIcons';
import FontAwesome from  'react-native-vector-icons/FontAwesome';
import { ListItem } from '@rneui/themed';
import { Colors } from '../themes';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePickerModal from '../components/ImagePickerModal';
import { useSelector, useDispatch } from 'react-redux';
import { signIn} from '../store/profilSlice';
import axios from 'axios';


function ProfilScreen({ navigation }: { navigation: any }) {

    const dispatch = useDispatch();
    const [visible, setVisible] = React.useState(false);
    const [filePath, setFilePath] = React.useState(null);
    const [fileName, setFileName] = React.useState(null);

    //const BASE_URL = 'http://10.0.0.133:80/api/';
    // const BASE_URL = 'http://192.168.2.38:80/api/';
    //const BASE_URL = 'http://10.110.96.97:80/api/';
    const BASE_URL = 'https://backend.clanlantene.com/joe92/api/';

    const user = useSelector((state: any) => state.profil.user);
    console.log(user);

  ///  console.log(user.idclients);

   React.useEffect(() => {
       setFilePath(() => user.photo_client);
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

                //console.log('Response = ', response);

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

                setFilePath(response?.assets[0].uri);
                setFileName(response?.assets[0].fileName);
                setVisible(false);
                sendpicture();

            });
        }
    };


    const chooseFile = (/*type*/) => {

        let options = {
            // mediaType: type,
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
                return;
            }

            setFilePath(response.assets[0].uri);
            setFileName(response.assets[0].fileName);
            setVisible(false);
            sendpicture();
        });

    };


    const sendpicture = async () => {

        let form_data = new FormData();
        let filename = fileName?.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : 'image';


        form_data.append('img', { uri: filePath, name: fileName, type: type });
        form_data.append('idclient', user.idclients);


        axios.post(`${BASE_URL}upload_profil_image`, form_data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {

            console.log(response.data);

            if (response.data.success == true) {
                //setFilePath(response.data.user[0].photo_client);
                //dispatch(signIn({ ...user, photo_client: response.data.url }));
                dispatch(signIn(response.data.user[0]));
                /*console.log(response.data.user[0].photo_client);
                console.log(response.data.url);*/
            }
            else {

            }
        }).catch(function (error) {
            console.log(error);
            // setIsloading(false);
        });

    };

    const Header = () => {
        return (
            <View style={{
                backgroundColor: '#ffff', marginTop: 20, marginHorizontal: 10, borderRadius: 20,paddingBottom: 15,
                height: 200,  alignItems: 'center', paddingTop: 10,  borderBottomLeftRadius: 30, marginBottom:50,
                borderBottomRightRadius: 30 }}>
                <View style={styles.avatar}>
                    <Image
                        source={filePath ? { uri: filePath } : require('../assets/avatar.jpg')}
                        style={styles.avatarImage}
                    />

                    <TouchableOpacity style={styles.addButton} onPress={() => setVisible(true)} >
                        <Ionicons name="camera" size={30} color={Colors.text} />
                    </TouchableOpacity>

                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ color: Colors.text, paddingTop: 10, fontSize: 20, fontWeight: 'bold' }}> {user.client.prenoms}{''}{user.client.nom} </Text>
                    <Text style={{ color: Colors.text, paddingTop: 0 ,marginTop:3,fontSize: 14 }}> {user.login}</Text>
                </View >
            </View>
        );
    };



    return (
        <ScrollView style={styles.main}>

           <Header />

            <View style={{ minHeight: 200, backgroundColor: '#ffff', marginTop: -40, marginHorizontal: 10, borderRadius: 20, paddingTop: 20, paddingBottom: 20 }}>
                <ListItem bottomDivider onPress={() => alert()} >
                     <AntDesign name="user" size={22} color={Colors.text} />
                    <ListItem.Content>
                        <ListItem.Title style={{ fontSize: 16  }}>Mes informations personelles</ListItem.Title>
                    </ListItem.Content>

                    <ListItem.Chevron />
                </ListItem>

                <ListItem bottomDivider onPress={() => alert()} >
                    <MaterialIcons name="history" size={24} color={Colors.text} />
                    <ListItem.Content>
                        <ListItem.Title style={{ fontSize: 14}}>Mes Historiques</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>

                <ListItem bottomDivider onPress={() => alert()} >
                    <AntDesign name="adduser" size={22} color={Colors.text} />
                    <ListItem.Content>
                        <ListItem.Title style={{ fontSize: 14 }}>Mes beneficiaires</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>

                <ListItem bottomDivider onPress={() => alert()} >
                    <AntDesign name="message1" size={22} color={Colors.text} />
                    <ListItem.Content>
                        <ListItem.Title style={{ fontSize: 14}}>Mes messages</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>

                <ListItem bottomDivider onPress={() => alert()} >
                    <AntDesign name="creditcard" size={22} color={Colors.text} />
                    <ListItem.Content>
                        <ListItem.Title style={{ fontSize: 14 }}>Mes cartes</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </View>

            <View style={{ backgroundColor: '#ffff', marginTop: 20, marginHorizontal: 10, borderRadius: 20, paddingTop: 15, paddingBottom: 15 }}>
                <ListItem bottomDivider onPress={() => navigation.navigate('kyc')} >
                     <FontAwesome name="balance-scale" size={20} color={Colors.text} />
                    <ListItem.Content>
                        <ListItem.Title style={{ fontSize: 14, }}>Conformite KYC</ListItem.Title>
                    </ListItem.Content>

                    <ListItem.Chevron />
                </ListItem>

                <ListItem bottomDivider onPress={() => alert()} >
                    <AntDesign name="key" size={22} color={Colors.text} />
                    <ListItem.Content>
                        <ListItem.Title style={{ fontSize: 14, }}>Authentification 2FA</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>

            </View>

            <View style={{  backgroundColor: '#ffff', marginTop: 20, marginHorizontal: 10, borderRadius: 20, paddingTop: 15, paddingBottom: 15 }}>
                <ListItem bottomDivider onPress={() => alert()} >
                     <Ionicons name="language-outline" size={22} color={Colors.text} />
                    <ListItem.Content>
                        <ListItem.Title style={{ fontSize: 14}}>Langue</ListItem.Title>
                    </ListItem.Content>

                    <ListItem.Chevron />
                </ListItem>

                <ListItem bottomDivider onPress={() => alert()} >
                    <AntDesign name="bells" size={22} color={Colors.text} />
                    <ListItem.Content>
                        <ListItem.Title style={{ fontSize: 14 }}>Parametres de notifications</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>

            </View>

            <View style={{ backgroundColor: '#ffff', marginTop: 20, marginBottom: 30, marginHorizontal: 10, borderRadius: 20, paddingTop: 15, paddingBottom: 15 }}>
                <ListItem onPress={() => logout()} >
                    <AntDesign name="logout" size={22} color={Colors.text} />
                    <ListItem.Content>
                        <ListItem.Title style={{ fontSize: 14}}>Déconnexion</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </View>

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
        flex: 1,
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
        alignItems: 'center',
    },

    avatarImage: {
        height: 100,
        width: 100,
        overflow: 'hidden',
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 30,
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
