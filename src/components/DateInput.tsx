/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from '../themes';
import { useTranslation } from 'react-i18next';
import { DatePickerInput } from 'react-native-paper-dates';



export default function DateInput(props: any) {

    const { t } = useTranslation();
    return (
        <View style={styles.container}>

            <DatePickerInput
                locale="fr"
                underlineColor="transparent"
                inputMode="start"
                mode="outlined"
                activeOutlineColor={Colors.text}
                style={styles.input}
                {...props}
            />

            {props.description && !props.errorText ? (
                <Text style={styles.description}>{props.description}</Text>
            ) : null}
            {props.errorText ? <Text style={styles.error}>{t(`${props.errorText}`)}</Text> : null}
        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        width: '100%',
        marginVertical: 12,
    },

    input: {
        backgroundColor: '#ffff',
       // borderWidth:1
    },

    description: {
        fontSize: 13,
        paddingTop: 8,
    },

    error: {
        fontSize: 13,
        color: '#BA001A',
        paddingTop: 4,
    },
});
