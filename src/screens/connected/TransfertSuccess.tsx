/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
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
    Text,
    ScrollView,
    Alert,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import AmountCurrencyInput from '../../components/transaction/AmountCurrencyInput';
import { saveBenef} from '../../store/profilSlice';
import { useSelector} from 'react-redux';
import ChangeRate from '../../components/transaction/ChangeRate';
import TransactionFee from '../../components/transaction/TransactionFee';
import TotalToPay from '../../components/transaction/TotalToPay';
import { currencyRateRequest, sendTransfertRequest } from '../../services/request';
import { NetworkInfo } from 'react-native-network-info';
import UserAgent from 'react-native-user-agent';


function TransfertScreen({ navigation }: { navigation: any }) {



    return (
        <View style={styles.main}>

        </View>
    );
}


const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },

});


export default TransfertScreen;



