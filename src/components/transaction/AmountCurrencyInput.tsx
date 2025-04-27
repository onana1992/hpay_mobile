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


interface MyComponentProps {
    amount: string;
    setAmount: (val:string) => void;
    account: any;
    setAccount: (val: any) => void;
    accounts: any[],
    title:string
}



const AmountCurrencyInput: React.FC<MyComponentProps> = ({ amount, setAmount, account, setAccount, accounts,title }) => {

    const [visible, setVisible] = React.useState<boolean>(false);
    const [borderColor, setBorderColor] = React.useState(Colors.primary);
    const [borderWidth, setBorderWidth] = React.useState(1);

    const handleFocus = () => {
        setBorderColor(Colors.primary);
        setBorderWidth (2);
    };

    const handleBlur = () => {
        setBorderColor(Colors.text);
        formatAmount(amount);
        setBorderWidth(1);
    };


    const formatAmount = () => {
        const val = Number(amount).toFixed(2).toString();
        setAmount(val);
    }

    const formatAmount1 = (val: string) => {
        const amount = Number(val).toFixed(2).toString();
        return amount;
    }

    const selectAccount = (account:any) => {
        setAccount(account);
        setVisible(false);
    }

    const accountName = (account:any) => {

        if (account.compte.devise== "CAD") {
           // eslint-disable-next-line quotes
           return "Dollard Canadien"
        }


        else if (account.compte.devise == "USD") {
            return "Dollard Americain"   
        }

        else if (account.compte.devise == 'EUR') {
            return "Euro"
        }

        else if (account.compte.devise == 'GBP') {
            return "Livre Sterling"
        }

    }


    const onClose = () => {
        setVisible(false);
    }

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => { selectAccount(item) } }>
            <Image source={item.icon} style={styles.currency} />
            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', height: 40, padding: 5 }}>
                <Text style={{ color: Colors.text, fontWeight: 'bold' }}>{item.compte.devise}</Text>
                <Text style={{ color: Colors.text, fontWeight: 'bold' }}>{accountName(item)}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', height: 40, padding: 5 }}>
                {/*<Text style={{ color: Colors.text, fontSize: 12 }}>{formatAmount1(item.compte.solde)} {item.compte.devise}</Text>*/}
                <Feather name="chevron-right" size={18} color={Colors.gray} />
            </View>
        </TouchableOpacity>
    );


    return (
        <View style={[styles.main,{borderColor:borderColor, borderWidth:borderWidth}]}>

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
                    />

                </View>
            </View>



            <TouchableOpacity style={styles.inputButton} onPress={() => { setVisible(true) } }>
                <View style={{ flex: 1, flexDirection: 'row', height: 40, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={account?.icon}
                        style={styles.currency}
                    />

                    <Text style={{ marginLeft: 5, fontWeight: 'bold', fontSize: 17, color: Colors.text }}>
                        {account?.compte?.devise}
                    </Text>

                    <Feather name="chevron-down" size={24} color={Colors.gray} />

                </View>
            </TouchableOpacity>

            <Modal
                isVisible={visible}
                onBackButtonPress={onClose}
                onBackdropPress={onClose}
                onSwipeComplete={onClose} 
                swipeDirection={['down']}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                style={styles.modal}
            >

                <View style={styles.content}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <FlatList
                        data={accounts}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>

            </Modal>


        </View>

    );
};

export default AmountCurrencyInput;

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
        color:Colors.text,
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
        height: 430,
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