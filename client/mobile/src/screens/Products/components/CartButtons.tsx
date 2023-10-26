import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from 'app';
import { Button } from 'components';

type Props = {
  amount: number;
  onAdd: () => void;
  onRemove: () => void;
};

const CartButtons = ({ amount, onAdd, onRemove }: Props) => {
  return (
    <View style={styles.container}>
      {(amount || 0) > 0 && (
        <>
          <Button title="-" style={styles.button} onPress={onRemove} />
          <Text style={styles.text}>
            {amount} {amount === 1 ? 'pc' : 'pcs'}
          </Text>
        </>
      )}
      <Button title="+" style={styles.button} onPress={onAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 4,
  },
  button: {
    minWidth: 32,
  },
  text: {
    minWidth: 48,
    textAlign: 'center',
    paddingHorizontal: 2,
  },
});

export default React.memo(CartButtons);
