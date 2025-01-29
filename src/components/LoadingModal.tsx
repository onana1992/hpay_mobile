/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */

import React from 'react';
import { StyleSheet, Dimensions, View, ActivityIndicator, Text } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../themes';
import { useTranslation } from 'react-i18next';




const LoadingModal = ({ modalVisible, setModalVisible }: { modalVisible: boolean, setModalVisible: (val: boolean) => void }) => {

	const { t } = useTranslation();


	return (
		<Modal
			backdropOpacity={0.7}
			isVisible={modalVisible}
			onRequestClose={() => {
				 setModalVisible(!modalVisible);
			}}
		>
			<View style={styles.modal}>
				<View style={{flex:1, justifyContent: 'center', alignItems: 'center' }}>
					<ActivityIndicator size="small" color={Colors.primary} />
					<Text style={{ marginTop: 10, fontSize: 12, color:'black' }}> {t('loading')} </Text>
				</View>
			</View>


		</Modal>
	);
};

const styles = StyleSheet.create({
	modal: {
		width: Dimensions.get('window').width / 2,
		height:150,
		backgroundColor: 'white',
		alignSelf: 'center',
		marginVertical: 60,
		marginHorizontal: 20,
		borderColor: 'transparent',
		borderWidth: 0.5,
		borderRadius:10,
	},

});


export default LoadingModal;
