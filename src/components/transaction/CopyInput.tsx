

import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Clipboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../themes';
import Modal from 'react-native-modal';



interface MyComponentProps {
    value: string;

}



const CopyInput: React.FC<MyComponentProps> = ({ value}) => {

    const [visible, setVisible] = React.useState<boolean>(false);

    const handleCopy = () => {
        Clipboard.setString(value); // Copy the text to clipboard
    };


    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 55,
            borderRadius: 5,
            paddingHorizontal: 10,
            borderEndColor: Colors.text,
            borderWidth: 1,
            marginTop:10
        }}>

            <View>
                <Text style={{ color: Colors.text, fontSize: 16 }}>{value}</Text>
            </View>

            <TouchableOpacity onPress={() => { handleCopy(); }}>
                <Ionicons name="copy-outline" size={22} color={Colors.text} />
            </TouchableOpacity>

        </View>


    );
};

export default CopyInput;

const styles = StyleSheet.create({

    main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 55,
        borderRadius: 5,
        paddingHorizontal: 10,
        borderEndColor: Colors.text,
        borderWidth: 1
    },

   


});