import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Product } from 'generated/graphql';

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  if (!product) {
    return null;
  }

  return (
    <View style={styles.item}>
      <Image
        source={{ uri: product.imageUrl }}
        style={styles.image}
        resizeMode="contain"
      />
      <View>
        <Text style={styles.name}>{product.name}</Text>
        {/* <Text>{product.ean}</Text> */}
        <Text>{product.price.toFixed(2)} €</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  image: {
    width: 48,
    height: 48,
    marginRight: 8,
  },
});

export default React.memo(ProductCard);
