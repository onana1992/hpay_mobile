/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, Text, Pressable, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import { Colors } from '../themes'
//import I18n from 'react-native-i18n';


type PropType = {
    title:String,
    isVisible: boolean,
    onClose: () => void,
    captureImage: (photo: string) => {},
    chooseFile: () => void
}

export default function ImagePickerModal({title, isVisible, onClose, captureImage, chooseFile }: PropType) {
    return (
        <Modal
            isVisible={isVisible}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            onSwipeComplete={onClose} // Handle swipe to close
            swipeDirection={['down']}
            animationIn="slideInUp" // Optional: animation for modal entry
            animationOut="slideOutDown" // Optional: animation for modal exit
            style={styles.modal}>
            <SafeAreaView style={styles.content}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom:20 }}>
                    <View style={{ height: 5, width: 40, borderRadius:5, backgroundColor: Colors.background }}>
                    </View>
                </View>

                <View style={{}}>
                    <Text style={{ color: Colors.text, fontSize: 26, fontWeight: 'bold', paddingVertical: 10 }}>{title}</Text>
                </View>

                <Pressable style={styles.item} onPress={() => { captureImage('photo'); }} >

                    <View style={{
                        flex: 1,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}>
                        <View style={{
                            borderColor: Colors.background,
                            borderWidth: 1,
                            height: 50,
                            width:50,
                            borderRadius: 25,
                            alignItems:'center',
                            justifyContent: 'center',
                        } }>
                            <Feather name="camera" size={18} color={Colors.text} />
                        </View>

                    </View>

                    <View style={{
                        flex: 3,
                        alignItems: 'flex-start',
                        justifyContent: 'center' }}>
                        <Text style={styles.buttonText}>Prendre une photo</Text>
                    </View>

                    <View style={{
                        flex:1,
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                    }}>
                        <Ionicons name="chevron-forward-outline" size={16} color={Colors.text} />
                    </View>

               </Pressable>

               <Pressable style={styles.item}  onPress={() => { chooseFile('photo'); }}>

                    <View style={{
                        flex: 1,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}>
                        <View style={{
                            borderColor: Colors.background,
                            borderWidth: 1,
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Feather name="image" size={18} color={Colors.text} />
                        </View>

                    </View>

                    <View style={{
                        flex: 3,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}>
                        <Text style={styles.buttonText}>
                        Selectioner une photo dans la galerie d'images </Text>
                    </View>

                    <View style={{
                        flex: 1,
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                    }}>
                        <Ionicons name="chevron-forward-outline" size={16} color={Colors.text} />
                    </View>
                </Pressable>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({

    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },

    content: {
        backgroundColor: '#ffffff',
        padding: 20,
        height: 300,
    },

    item: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
    },



    buttons: {
        backgroundColor: 'white',
        flexDirection: 'row',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },

    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        fontSize: 16,
        color: Colors.text,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight:'bold',
    },


});