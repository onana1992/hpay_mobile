/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from '../themes';
import { useTranslation } from 'react-i18next';



export default function StepCompnent(props: any) {

    const { t } = useTranslation();

    return (

        <View style={{}}>
            <Text style={{
                color: Colors.text,
                fontSize: 22,
                fontWeight: 600,
                textAlign: 'center',
                paddingVertical: 7,
                //fontStyle: 'italic' 
                //fontFamily:'Arial',
            }}>{t('signupscreen.title')} <Text style={{ fontSize: 20 } }>({props.step}/7)</Text></Text>
            <View style={styles.step}>
                {
                    [1, 2, 3, 4, 5, 6, 7].map((item, index) =>

                        <View
                            key={index.toString()}
                            style={{
                                borderColor: index < props.step ? Colors.primary : Colors.text,
                                borderWidth: 0.5,
                                flex: 1,
                                height: 7,
                                margin: 2,
                                backgroundColor: index < props.step ? Colors.primary : 'white',
                                borderRadius: 5,
                            }}

                        >
                            <Text>{' '}</Text>
                        </View>
                    )
                }

            </View>
        </View>
    );
}


const styles = StyleSheet.create({

    step: {
        flexDirection: 'row',
        height: 20,
        width: '100%',
    },

});
