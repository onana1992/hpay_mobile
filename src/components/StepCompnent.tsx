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

       
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}/>
                <View style={styles.step}>
                    {
                        [1, 2, 3, 4, 6, 7].map((item, index) =>

                            <View
                                key={index.toString()}
                                style={{
                                    borderColor: index < props.step ? Colors.primary : Colors.text,
                                    borderWidth: 0.5,
                                    height: 6,
                                    width: 6,
                                    borderRadius: 3,
                                    margin: 2,
                                    backgroundColor: index < props.step ? Colors.primary : 'white',
                                    marginHorizontal: 5,

                                }}
                            >
                                <Text>{''}</Text>
                            </View>
                        )
                    }

                </View>
                <View style={{ flex: 1 }}/>
            </View>

       
    );
}


const styles = StyleSheet.create({

    step: {
        flexDirection: 'row',
        height: 20,
        width: '100%',
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },

});
