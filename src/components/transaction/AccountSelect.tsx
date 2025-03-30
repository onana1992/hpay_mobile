

import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    FlatList,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../themes';
import Modal from 'react-native-modal';


interface MyComponentProps {
    account: any;
    setAccount: (val: any) => void;
    accounts: any[],
    title: string
}



const AccountSelect: React.FC<MyComponentProps> = ({ account,setAccount, accounts, title }) => {

    const [visible, setVisible] = React.useState<boolean>(false);

    const selectAccount = (account: any) => {
        setAccount(account);
        setVisible(false);
    }


    const accountName = (account: any) => {

        if (account.compte.devise == "CAD") {
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
        <TouchableOpacity style={styles.itemContainer} onPress={() => { selectAccount(item) }}>
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
        <View >

            <TouchableOpacity style={styles.main} onPress={() => { setVisible(true) }}>
                <View style={{ width: '60%', padding: 5 }} >
                    <View style={{ flex: 1, flexDirection: 'row', height: 40, alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Image
                            source={account?.icon}
                            style={styles.currency}
                        />
                        <View>
                            <Text style={{ marginLeft: 5, fontWeight: 'bold', fontSize: 17, color: Colors.text }}>
                                {account?.compte?.devise}
                            </Text>
                            <Text style={{ marginLeft: 5, color: Colors.text, fontWeight: 'bold' }}>{accountName(account)}</Text>
                        </View>

                    </View>
                </View>
                <View style={styles.inputButton} >
                    <View style={{ flex: 1, flexDirection: 'row', height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <Feather name="chevron-down" size={24} color={Colors.gray} />
                    </View>
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

export default AccountSelect;

const styles = StyleSheet.create({

    main: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: Colors.text,
        height: 70,
        padding: 0,
        marginVertical: 10,
        borderRadius: 5,
        justifyContent: "space-between",
        flexWrap: 'nowrap'
    },

    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },

    input: {
        height: "100%",
        width: '100%',
        padding: 0,
        fontSize: 26,
        fontWeight: 'bold'
    },

    inputButton: {
        
        paddingHorizontal: 5,
        paddingVertical: 0

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
        paddingVertical: 10
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