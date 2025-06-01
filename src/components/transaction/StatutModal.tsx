/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */

import React from 'react';
import { StyleSheet, Dimensions, View,  Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes';
import { useTranslation } from 'react-i18next';
import Feather from 'react-native-vector-icons/Feather';


type PropType = {
    completeModalOpen: boolean,
    closeModal: (val: boolean) => void,
    success: boolean,
    title:string
    message:string
}


const StatutModal = ({ completeModalOpen, closeModal, success, title, message } : PropType ) => {

	const { t } = useTranslation();


	return (
		<Modal
			backdropOpacity={0.8}
			isVisible={completeModalOpen}
			onRequestClose={() => {
				    closeModal();
			}}
		 >

			    <View style={styles.modal}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                        <TouchableOpacity style={{
                            justifyContent: 'center',
                            backgroundColor: '#e6e4e0',
                            height: 40,
                            width: 40,
                            alignItems: 'center',
                            borderRadius: 20,
                        }} onPress={() => { closeModal(); }} >
                            <View>
                                <Ionicons name="close" color={Colors.text} size={24} />
                            </View>
                        </TouchableOpacity>
                    </View>

                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <View>
                            {
                            success ?
                            <Feather name="check-circle" color="green" size={80} />
                            :
                            <Ionicons name="warning-outline" color="red" size={80}/>
                            }
                    </View>
                    <View style={{paddingVertical: 20}}>
                        <Text style={{color:Colors.text,  textAlign:'center',  fontWeight:'bold', fontSize: 24}}> {t(`${title}`)} </Text>
                        <Text style={{color:Colors.text, textAlign:'center', fontSize: 14}}> {t(`${message}`)} </Text>
                    </View>
                </View>

                <View style={{flex:1, justifyContent:'flex-end'}}>
                    { success &&
                        <View style={{paddingVertical: 10}}>
                            <TouchableOpacity disabled={true} style={styles.addbutton} onPress={() => { }}>
                            <Text style={styles.addbuttonText}>{t('transaction.print')}</Text>
                         </TouchableOpacity>
                        </View>
                    }

                    <View style={{paddingVertical: 10}}>
                        <TouchableOpacity style={styles.closebutton} onPress={() => { closeModal(); }}>
                        <Text style={styles.closebuttonText}>{t('transaction.close')}</Text>
                        </TouchableOpacity>
                    </View>

                  </View>

			    </View>


		   </Modal>
	);
};

const styles = StyleSheet.create({
	 modal: {
		width: Dimensions.get('window').width - 0 ,
		height:Dimensions.get('window').height - 0,
		backgroundColor: 'white',
		alignSelf: 'center',
        padding:20,
        borderRadius: 10,
	},

     addbutton: {
        height: 50,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    closebutton: {
        height: 50,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderColor: Colors.primary,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    addbuttonDisabled: {
        height: 50,
        backgroundColor: Colors.primary1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },


    cancelbuttonText: {
        color: Colors.text,
        fontWeight: 'bold',
        fontSize: 16,
    },

    addbuttonText: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 16,
    },

    closebuttonText : {
        fontWeight: 'bold',
        color: Colors.text,
        fontSize: 16,
    },

    title: {
        color: Colors.text,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingVertical: 5,
        marginTop: 0
    },

});


export default StatutModal;
