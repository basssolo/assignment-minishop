import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { gql, useQuery } from '@apollo/client';

import { GetOrderDetailsQuery } from 'generated/graphql';
import { CUSTOMER_ID, type StackParamList, colors } from 'app';
import { ListRow } from 'components';
import { Screen } from 'screens';

import { ProductCard } from '../../Products';

const orderQuery = gql(`
  query getOrderDetails($customerId: ID!, $orderId: ID!) {
    order(customerId: $customerId, orderId: $orderId) {
      orderId
      customerId
      timestamp
      products {
        product {
          ean
          name
          price
          imageUrl
        }
        amount
      }
      totalSum
    }
  }`);

type Props = NativeStackScreenProps<StackParamList, 'OrderDetails'>;

const OrderDetails = ({ route }: Props) => {
  const orderId = route.params?.orderId;

  const { loading, data } = useQuery<GetOrderDetailsQuery>(orderQuery, {
    variables: {
      customerId: CUSTOMER_ID,
      orderId,
    },
  });

  const order = useMemo(() => {
    return data?.order;
  }, [data?.order]);

  return (
    <Screen edges={['left', 'right', 'bottom']} style={styles.screen}>
      <View style={styles.header}>
        {loading || !order ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <>
            <View style={styles.success}>
              <Text style={styles.successText}>
                This order was successfully placed on{' '}
                <Text style={styles.bold}>
                  {new Date(order?.timestamp).toLocaleString()}
                </Text>{' '}
              </Text>
            </View>
          </>
        )}
      </View>
      <View style={styles.scrollArea}>
        <FlatList
          data={order?.products}
          renderItem={({ item }) => (
            <ListRow
              key={`row-${item.product.ean}`}
              right={
                <View style={styles.rowRight}>
                  <Text style={styles.rowPrice}>
                    {(item.amount * item.product.price).toFixed(2)} €
                  </Text>
                  <Text style={styles.rowAmount}>
                    {item.amount} {item.amount === 1 ? 'pc' : 'pcs'}
                  </Text>
                </View>
              }>
              <ProductCard product={item.product} />
            </ListRow>
          )}
          keyExtractor={item => item.product.ean}
        />
      </View>
      <Text style={styles.totalSum}>Total: {order?.totalSum.toFixed(2)} €</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'space-between',
  },
  header: {
    padding: 16,
  },
  scrollArea: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  success: {
    backgroundColor: colors.primary,
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  successText: {
    color: colors.buttonText,
    textAlign: 'center',
  },
  rowRight: {
    alignItems: 'flex-end',
  },
  rowPrice: {
    fontSize: 18,
  },
  rowAmount: {
    fontSize: 12,
  },
  totalSum: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default OrderDetails;
