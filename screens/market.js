import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { DataTable } from 'react-native-paper';
import { fetchCoins } from '../contexts/coinContext';

export default function Market({ navigation }) {
  const [cryptos, setCoins] = useState([]);

  //fetches API from fetchCoins function
  useEffect(() => {
    const fetchAPI = async () => {
      setCoins(await fetchCoins());
    };

    fetchAPI();
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(1500).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <DataTable>
        {/*datatable header previous bg color:  #eef2f5 */}
        <DataTable.Header style={{ backgroundColor: '#eef2f5', height: 45 }}>
          <DataTable.Title>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'normal',
                color: 'black',
                fontFamily: 'futura-pt-medium',
              }}>
              {' '}
              Coin{' '}
            </Text>
          </DataTable.Title>
          <DataTable.Title numeric>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'normal',
                color: 'black',
                fontFamily: 'futura-pt-medium',
              }}>
              {' '}
              1h{' '}
            </Text>
          </DataTable.Title>
          <DataTable.Title numeric>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'normal',
                color: 'black',
                fontFamily: 'futura-pt-medium',
              }}>
              {' '}
              Price{' '}
            </Text>
          </DataTable.Title>
        </DataTable.Header>

        {cryptos &&
          cryptos.map((coin) => {
            {
              /* addCoin(coin.id) */
            }
            const color =
              coin.price_change_percentage_1h_in_currency > 0 ? 'green' : 'red';
            return (
              <TouchableOpacity
                key={coin.id}
                onPress={() => {
                  navigation.navigate('CoinPg', coin);
                }}>
                <DataTable.Row style={{ backgroundColor: 'white', height: 70 }}>
                  {/* , marginTop: 10, marginRight: 15 */}
                  <DataTable.Cell>
                    {' '}
                    <Image
                      source={{ uri: coin.image }}
                      style={{ height: 20, width: 20, marginRight: 15 }}
                      alt="img"
                    />{' '}
                    <Text
                      style={{
                        fontWeight: 'normal',
                        fontSize: 17,
                        textTransform: 'capitalize',
                        fontFamily: 'future-pt-book',
                      }}>
                      {coin.id}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <Text
                      style={{
                        color: color,
                        fontWeight: 'normal',
                        fontSize: 17,
                        fontFamily: 'future-pt-book',
                      }}>
                      {coin.price_change_percentage_1h_in_currency
                        ? coin.price_change_percentage_1h_in_currency.toFixed(2)
                        : 0.0}
                      %
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <Text
                      style={{
                        fontWeight: 'normal',
                        fontSize: 17,
                        fontFamily: 'future-pt-book',
                      }}>
                      ${coin.current_price.toFixed(2)}
                    </Text>
                  </DataTable.Cell>
                </DataTable.Row>
              </TouchableOpacity>
            );
          })}
      </DataTable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 500,
  },
});
