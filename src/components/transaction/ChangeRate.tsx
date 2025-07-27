/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import { Colors } from '../../themes';


interface MyComponentProps {
    rate: string;
}



const SendRate: React.FC<MyComponentProps> = ({ rate }) => {

    const [visible, setVisible] = React.useState<boolean>(false);


    return (
        <View style={styles.main}>
            <Text style={{ color: Colors.text, fontWeight: 700 }}>Taux de change </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{
                    height: 14,
                    width: 14,
                    backgroundColor: '#dcffdb',
                    borderRadius: 7,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: 4,
                    marginTop: 2,
                }}>
                    <View style={{
                        height: 6,
                        width: 6,
                        backgroundColor: 'green',
                        borderRadius: 3,
                    }}></View>
                </View>
                <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }} >
                    <Text style={{ color: Colors.gray, fontSize: 12 }}>{rate}</Text>
                </View>
            </View>
        </View>


    );
};

export default SendRate;

const styles = StyleSheet.create({

    main: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: 10
    }


});