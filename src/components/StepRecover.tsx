/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from '../themes';
import { useTranslation } from 'react-i18next';



export default function StepRecover(props: any) {

    const { t } = useTranslation();

    return (

        <View style={{}}>
            <Text style={{
                color: Colors.text,
                fontSize: 22,
                fontWeight: 500,
                textAlign: 'center',
                paddingVertical: 7,
            }}>{t('passwordRecover.passwordrecover')} <Text style={{ fontSize: 20 }}>({props.step}/3)</Text></Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                </View>
                <View style={styles.step}>
                    {
                        [1, 2, 3].map((item, index) =>

                            <View
                                key={index.toString()}
                                style={{
                                    borderColor: index < props.step ? Colors.primary : Colors.text,
                                    borderWidth: 0.5,
                                    flex: 1,
                                    height: 6,
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
                <View style={{ flex: 1 }}>
                </View>
            </View>
            
        </View>
    );
}


const styles = StyleSheet.create({

    step: {
        flexDirection: 'row',
        height: 20,
        width: '100%',
        flex:2
    },

});
