/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { Colors } from '../../themes';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


interface MyComponentProps {

    value: string;
}



const ChangeRate1: React.FC<MyComponentProps> = ({value}) => {

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
                            <FontAwesome5 name="percent" color={Colors.text} size={22} />
                        </View>
                    </View>
                    <View>
                        <Text style={{ color: Colors.text, fontWeight: 'bold' }}>Taux de change</Text>
 
                    </View>
                </View>
            </View>

            <View>
                <Text style={{ color: Colors.text, fontWeight: 'bold' }}>{value}</Text>
            </View>

        </View>


    );
};

export default ChangeRate1;

const styles = StyleSheet.create({

    main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

});