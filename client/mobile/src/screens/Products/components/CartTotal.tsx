import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { colors } from 'app';
import { Button } from 'components';

type Props = {
  totalSum?: number | undefined;
  onCheckout: () => void;
  onClearCart: () => void;
};

const CartTotal = ({ totalSum = 0.0, onCheckout, onClearCart }: Props) => {
  const showClearConfirmDialog = () => {
    return Alert.alert(
      'Are you sure?',
      'This will remove all product selections',
      [{ text: 'Cancel' }, { text: 'Clear', onPress: onClearCart }],
    );
  };

  const showOrderConfirmDialog = () => {
    return Alert.alert(
      'Go ahead and order?',
      `Total sum is ${totalSum.toFixed(2)} €`,
      [{ text: 'Cancel' }, { text: 'Order', onPress: onCheckout }],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.totalSum}>Total: {totalSum.toFixed(2)} €</Text>
      <View style={styles.buttons}>
        {totalSum > 0 && (
          <Button
            title="Clear"
            style={styles.clearButton}
            textStyle={styles.clearButtonText}
            onPress={showClearConfirmDialog}
          />
        )}
        <Button
          title="Checkout"
          disabled={totalSum === 0}
          style={styles.checkoutButton}
          onPress={showOrderConfirmDialog}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  totalSum: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
  },
  checkoutButton: {
    borderColor: colors.primary,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  clearButton: {
    backgroundColor: colors.background,
    borderColor: colors.danger,
    borderStyle: 'solid',
    borderWidth: 1,
    marginRight: 8,
  },
  clearButtonText: {
    color: colors.danger,
  },
});

export default React.memo(CartTotal);
