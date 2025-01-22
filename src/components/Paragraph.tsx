/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Colors } from '../themes'

//import { Text } from 'react-native-paper'

export default function Paragraph(props:any) {
    return <Text style={styles.text} {...props} />
}

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        lineHeight: 18,
        textAlign: 'center',
        marginBottom: 12,
        padding: 20,
        paddingVertical: 0,
        //color: Colors.text,
        color: 'gray',
    },
})
