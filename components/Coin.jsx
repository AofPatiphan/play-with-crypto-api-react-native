import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

function Coin({ name, image, symbol, price, volume, priceChange, marketCap }) {
    return (
        <View style={stylesCoin.container}>
            <View style={stylesCoin.avatar}>
                <Image source={{ uri: image }} style={stylesCoin.image} />
                <View style={{ paddingLeft: 10 }}>
                    <Text style={stylesCoin.name}>{name}</Text>
                    <Text style={stylesCoin.name}>{symbol}</Text>
                </View>
            </View>
            <Text style={stylesCoin.price}>${price}</Text>
            {/* <Text style={stylesCoin.price}>${volume.toLocaleString()}</Text> */}
            {priceChange < 0 ? (
                <Text style={stylesCoin.red}>{priceChange.toFixed(2)}</Text>
            ) : (
                <Text style={stylesCoin.green}>+{priceChange.toFixed(2)}</Text>
            )}
        </View>
    );
}

const stylesCoin = StyleSheet.create({
    container: {
        margin: 10,
        padding: 20,
        backgroundColor: 'grey',
        alignItems: 'center',
        width: 300,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 40,
        height: 40,
    },
    name: {
        margin: 5,
        fontSize: 15,
        fontWeight: 'bold',
    },
    // symbol: {
    //     margin: 5,
    //     fontSize: 20,
    // },
    price: {
        margin: 5,
        fontSize: 15,
    },
    volume: {
        fontSize: 15,
        margin: 5,
    },
    detail: {
        margin: 5,
    },
    red: {
        color: '#f00606',
    },
    green: {
        color: '#11d811',
    },
});

export default Coin;
