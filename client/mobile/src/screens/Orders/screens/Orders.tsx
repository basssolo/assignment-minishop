import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { GetOrdersQuery } from 'generated/graphql';
import {
  type BottomTabsParamList,
  type StackParamList,
  CUSTOMER_ID,
  colors,
} from 'app';
import { Button, ListRow } from 'components';
import { Screen } from 'screens';

import { OrderSummary } from '../components';

const ordersQuery = gql(`
  query getOrders($customerId: ID!) {
    orders(customerId: $customerId) {
      orderId
      customerId
      timestamp
      products {
        product {
          ean
        }
        amount
      }
      totalSum
    }
  }`);

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParamList, 'Orders'>,
  NativeStackScreenProps<StackParamList>
>;

const Orders = ({ navigation }: Props) => {
  const { loading, data } = useQuery<GetOrdersQuery>(ordersQuery, {
    variables: { customerId: CUSTOMER_ID },
  });

  return (
    <Screen style={styles.scrollView}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : data?.orders.length === 0 ? (
        <>
          <Text>No orders yet</Text>
          <Button
            title="Start shopping!"
            style={styles.startShoppingButton}
            onPress={() => navigation.navigate('Products')}
          />
        </>
      ) : (
        <FlatList
          data={data?.orders}
          renderItem={({ item }) => (
            <ListRow
              key={item.orderId}
              onPress={() =>
                navigation.navigate('OrderDetails', {
                  orderId: item.orderId,
                })
              }>
              <OrderSummary
                timestamp={item.timestamp}
                totalSum={item.totalSum}
              />
            </ListRow>
          )}
          keyExtractor={item => item.orderId}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 16,
    backgroundColor: colors.background,
  },
  startShoppingButton: {
    alignSelf: 'center',
    marginTop: 16,
  },
});

export default Orders;
