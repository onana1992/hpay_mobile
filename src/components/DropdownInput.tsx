/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { Colors } from '../themes';
import { Dropdown } from 'react-native-element-dropdown';
import { useTranslation } from 'react-i18next';

export default function DropdownInput(props: any) {

    const [isFocus, setIsFocus] = React.useState(false);
    const { t } = useTranslation();
    
    return (
        <View style={styles.container}>

            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'gray' }, props.error && { borderColor: "#BA001A" } ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                maxHeight={300}
                labelField="label"
                valueField="value"
                searchPlaceholder="Search..."
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                {...props}
            />

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
      //  width: '100%',
        marginVertical: 12,
    },

    input: {
        backgroundColor: '#ffff',
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



    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginTop: 10,
    },

    icon: {
        marginRight: 5,
    },

    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },

    placeholderStyle: {
        fontSize: 16,
    },

    selectedTextStyle: {
        fontSize: 16,
    },

    iconStyle: {
        width: 20,
        height: 20,
    },

    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

