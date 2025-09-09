/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */


import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    TextInput,
    FlatList,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../themes';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';



interface MyComponentProps {
    amount: string;
    setAmount: (val: string) => void;
    disabled: boolean,
    currency: string
}



const AmountCurrencyInput3: React.FC<MyComponentProps> = ({ amount, setAmount, currency,  disabled }) => {

    const [borderColor, setBorderColor] = React.useState(Colors.gray);
    const [borderWidth, setBorderWidth] = React.useState(1);
    const { t } = useTranslation();

 

    const handleFocus = () => {
        //setBorderColor(Colors.primary);
        setBorderWidth(2);
    };

    const handleBlur = () => {
        // setBorderColor(Colors.text);
        formatAmount();
        //setBorderWidth(1);
    };


    const formatAmount = () => {
        const val = Number(amount).toFixed(2).toString();
        setAmount(val);
    }





    return (
        <View style={[styles.main, { borderColor: borderColor, borderWidth: borderWidth }]}>

            <View style={{ width: '60%', padding: 5 }} >
                <View style={{ flex: 1, flexDirection: 'row', height: 40, alignItems: 'center', justifyContent: 'flex-start' }}>
                    <TextInput
                        style={styles.input}
                        inputMode="decimal"
                        keyboardType="decimal-pad"
                        onChangeText={(val: string) => { setAmount(val) }}
                        value={amount}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        editable={!disabled}
                    />
                </View>
            </View>



            <View style={styles.inputButton} >
                <View style={{ flex: 1, flexDirection: 'row', height: 40, minWidth:50, alignItems: 'center', justifyContent: 'center' }}>

                    <Text style={{ marginLeft: 5, fontWeight: 'bold', fontSize: 17, color: Colors.text }}>
                        {currency}
                    </Text>

                </View>
            </View>

        </View>

    );
};

export default AmountCurrencyInput3;

const styles = StyleSheet.create({

    main: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.text,
        height: 70,
        padding: 0,
        marginVertical: 10,
        borderRadius: 5,
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        width: '100%',
    },

    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },

    input: {
        height: '100%',
        width: '100%',
        padding: 0,
        fontSize: 26,
        fontWeight: 'bold',
        color: Colors.text,
    },

    inputButton: {
        borderLeftWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 0,
    },

    currency: {
        height: 40,
        width: 40,
        overflow: 'hidden',
        borderWidth: 1,
        borderRadius: 20,
    },


    content: {
        backgroundColor: '#ffffff',
        padding: 20,
        height: 480,
    },

    modalTitle: {
        color: Colors.text,
        fontSize: 26,
        fontWeight: 'bold',
        paddingVertical: 10,
    },

    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        padding: 10,
        paddingLeft: 0,
        borderRadius: 5,
    },


    textContainer: {
        flex: 1,
    },

    amount: {
        fontSize: 14,
        color: '#555',
    },

});