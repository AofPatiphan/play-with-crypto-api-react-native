import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    SafeAreaView,
    ScrollView,
    StatusBar,
} from 'react-native';
import Coin from './components/Coin';

export default function App() {
    const [text, setText] = useState('');
    const [coinList, setCoinList] = useState([]);

    const fetchCoinList = async () => {
        try {
            const res = await axios.get(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
            );
            setCoinList(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCoinList();
        let timer = setInterval(() => {
            fetchCoinList();
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const filteredCoins = coinList.filter((coin) =>
        coin.name.toLowerCase().includes(text.toLocaleLowerCase())
    );

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Text style={styles.header}>Search a currency</Text>
                    <TextInput
                        placeholderTextColor="#fff"
                        style={styles.input}
                        value={text}
                        onChangeText={setText}
                        placeholder="Search"
                        keyboardType="text"
                    />
                    {filteredCoins.map((coin) => {
                        return (
                            <Coin
                                key={coin.id}
                                name={coin.name}
                                image={coin.image}
                                symbol={coin.symbol}
                                volume={coin.total_volume}
                                price={coin.current_price}
                                priceChange={coin.price_change_percentage_24h}
                                marketCap={coin.market_cap}
                            />
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: '#000000',
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        flex: 2,
        backgroundColor: '#000000',
        marginHorizontal: 20,
    },
    container: {
        alignItems: 'center',
    },
    header: {
        fontSize: 30,
        color: 'lightgreen',
    },
    input: {
        width: 200,
        height: 40,
        marginTop: 30,
        borderWidth: 1,
        borderColor: '#ffffff',
        color: '#ffffff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 30,
    },
});
