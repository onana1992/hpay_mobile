/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { Colors } from '../themes';
import { useTranslation } from 'react-i18next';



export default function TextInput(props: any) {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <Input
                style={styles.input}
                underlineColor="transparent"
                cursorColor="gray"
                mode="outlined"
                placeholderTextColor="gray"
                activeOutlineColor={Colors.text}
                textColor={Colors.text}
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
        marginVertical: 2,
    },

    input: {
        backgroundColor: '#ffff',
        marginTop: 0,
        color: 'red',

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
