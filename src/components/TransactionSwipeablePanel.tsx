/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { ListItem } from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList } from 'react-native';
import Colors from '../themes/Colors';

export default function TransactionSwipeablePanel({ isPanelActive, setIsPanelActive }: { isPanelActive: boolean, setIsPanelActive: any }) {

    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: true,
        showCloseButton: true,
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
    });


    const menu = [

        {
            id: '0',
            titre: 'Recharge',
        },

        {
            id: '1',
            titre: 'Virement interne',
        },

        {
            id: '2',
            titre: 'Virement externe',
        },


        {
            id: '3',
            titre: 'Virement entre compte',
        },


        {
            id: '4',
            titre: 'Transfert',
        },

        {
            id: '5',
            titre: 'Paiement chez le marchand',
        },

    ];

    const closePanel = () => {
        setIsPanelActive(false);
    };

    const renderRow = ({ item }) => {
        return (
            <ListItem bottomDivider  onPress={() => alert()} >

                <View style={{ width: 30 }}>

                    {
                        (item.id === '0') &&
                        <MaterialCommunityIcons name="cash-plus" size={28} color={Colors.primary} />
                    }


                    {
                        (item.id === '1') &&
                        <MaterialCommunityIcons name="swap-vertical-circle-outline" size={28} color={Colors.primary} />
                    }


                    {
                        (item.id === '2') &&
                        <MaterialCommunityIcons name="swap-horizontal" size={28} color={Colors.primary} />
                    }


                    {
                        (item.id === '3') &&
                        <MaterialCommunityIcons name="swap-horizontal-circle-outline" size={28} color={Colors.primary} />

                    }

                    {
                        (item.id === '4') &&
                        <MaterialCommunityIcons name="send-circle-outline" size={28} color={Colors.primary} />
                    }

                    {
                        (item.id === '5') &&
                        <MaterialCommunityIcons name="qrcode" size={28} color={Colors.primary} />
                    }

                </View>

                <ListItem.Content>
                    <ListItem.Title style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 5 }}>{item.titre}</ListItem.Title>
                </ListItem.Content>

                <ListItem.Chevron />
            </ListItem>
        );
    };

    return (
        <SwipeablePanel {...panelProps} isActive={isPanelActive} style={{ height: 410, padding: 0 }}>
            <View style={{marginTop:20}}>
                <FlatList
                    data={menu}
                    renderItem={renderRow}
                    keyExtractor={item => item.id}
                />
            </View>
        </SwipeablePanel>
    );
}

