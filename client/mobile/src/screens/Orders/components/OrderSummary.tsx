import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  timestamp: string;
  totalSum: number;
};

const OrderSummary = ({ timestamp, totalSum }: Props) => {
  return (
    <View style={styles.item}>
      <Text style={styles.orderTime}>
        {new Date(timestamp).toLocaleString()}
      </Text>
      <Text style={styles.totalSum}>{totalSum.toFixed(2)} €</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  orderTime: {
    fontSize: 16,
  },
  totalSum: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingRight: 8,
  },
});

export default React.memo(OrderSummary);
