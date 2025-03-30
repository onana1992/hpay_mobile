import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import { Colors } from '../../themes';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


interface MyComponentProps {
    amount: string;
    currency: string;
}



const TotalToPay: React.FC<MyComponentProps> = ({ amount, currency }) => {

    return (
        <View style={styles.main}>

            <View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginRight: 10 }}>
                        <View style={{
                            backgroundColor: Colors.background,
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <FontAwesome5 name="coins" color={Colors.text} size={22} />
                        </View>
                    </View>
                    <View>
                        <Text style={{ color: Colors.text, fontWeight: 'bold' }}>Total Débité</Text>
                        <Text style={{ color: Colors.text, fontWeight: 'bold' }}>En {currency}</Text>
                    </View>
                </View>
            </View>

            <View>
                <Text style={{ color: Colors.text, fontWeight: 'bold' }}>{amount} {currency}</Text>
            </View>

        </View>


    );
};

export default TotalToPay;

const styles = StyleSheet.create({

    main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});