import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  CreateOrderInput,
  GetProductsForMobileQuery,
  OrderedProductInput,
} from 'generated/graphql';
import {
  type BottomTabsParamList,
  type StackParamList,
  CUSTOMER_ID,
  colors,
} from 'app';
import { ListRow } from 'components';
import { Screen } from 'screens';
import { CartButtons, CartTotal, ProductCard } from '../components';

const getProductsQuery = gql(`
  query getProductsForMobile {
    products {
      ean
      name
      price
      imageUrl
    }
  }
`);

const createOrderMutation = gql(`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      orderId
    }
  }
`);

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParamList, 'Products'>,
  NativeStackScreenProps<StackParamList>
>;

const Products = ({ navigation }: Props) => {
  const client = useApolloClient();
  const { loading, data } =
    useQuery<GetProductsForMobileQuery>(getProductsQuery);
  const [createOrder] = useMutation(createOrderMutation, {
    update: () => {
      client.resetStore();
    },
  });
  const [cartProducts, setCartProducts] = useState<OrderedProductInput[]>([]);

  const dataToDisplay = useMemo(
    () =>
      data?.products.map(product => {
        const cartProduct = cartProducts?.find(p => p.ean === product.ean);
        return {
          ...product,
          amount: cartProduct?.amount || 0,
        };
      }) || [],
    [data?.products, cartProducts],
  );

  const totalSum = useMemo(() => {
    return dataToDisplay.reduce((sum, p) => sum + p.price * p.amount, 0.0);
  }, [dataToDisplay]);

  const handleChangeAmount = useCallback(
    (ean: string, changeAmount: number) => {
      const productToChange = cartProducts?.find(p => p.ean === ean) || {
        ean,
        amount: 0,
      };
      productToChange.amount = productToChange.amount + changeAmount;

      if (productToChange.amount >= 0) {
        setCartProducts(old =>
          old?.filter(p => p.ean !== ean).concat(productToChange),
        );
      }
    },
    [cartProducts],
  );

  const handleCreateOrder = useCallback(async () => {
    // Create input parameters and call mutation
    const input: CreateOrderInput = {
      customerId: CUSTOMER_ID,
      products: cartProducts.filter(p => p.amount !== 0),
    };
    const output = await createOrder({
      variables: {
        input,
      },
    });

    // Clear cart
    handleClearCart();

    // Navigate to order details to see confirmation
    navigation.navigate('OrderDetails', {
      orderId: output.data.createOrder.orderId,
    });
  }, [cartProducts, createOrder, navigation]);

  const handleClearCart = () => setCartProducts([]);

  return (
    <Screen>
      <View style={styles.scrollArea}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <FlatList
            data={dataToDisplay}
            renderItem={({ item }) => (
              <ListRow
                key={`row-${item.ean}`}
                right={
                  <CartButtons
                    amount={item.amount}
                    onAdd={() => handleChangeAmount(item.ean, 1)}
                    onRemove={() => handleChangeAmount(item.ean, -1)}
                  />
                }>
                <ProductCard product={item} />
              </ListRow>
            )}
            keyExtractor={item => item.ean}
          />
        )}
      </View>
      <CartTotal
        totalSum={totalSum}
        onCheckout={handleCreateOrder}
        onClearCart={handleClearCart}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollArea: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.background,
  },
});

export default Products;
