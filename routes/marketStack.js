import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Market from '../screens/market';
import CoinPg from '../screens/coinPg';

const MarketNavigator = ({ navigation }) => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator initialRouteName="Market">
      <Screen
        name="Market"
        component={Market}
        options={{
          headerStyle: {
            height: 90,
            backgroundColor: '#ffde6a',
            // #414e54 - its shade of black #577fec - its blue
            // #ffde6a - its gold from economics explained
          },
          headerTitle: 'CoinSimulator',
          headerTitleStyle: {
            fontFamily: 'futura-pt-medium',
            color: 'black',
            fontSize: 20,
          },
          // title: 'MARKET - Top 100 Coins'
        }}
      />
      <Screen
        name="CoinPg"
        component={CoinPg}
        options={{ title: `Coin Details` }}
      />
    </Navigator>
  );
};

export default MarketNavigator;
