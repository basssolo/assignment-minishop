import React, { PropsWithChildren, ReactNode, useMemo } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from 'app';

type Props = PropsWithChildren<{
  left?: ReactNode;
  right?: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}>;

const ListRow = ({ children, left, right, style = {}, onPress }: Props) => {
  const rowStyles = useMemo(() => [styles.row, style], [style]);

  return (
    <Pressable disabled={!onPress} onPress={onPress}>
      <View style={rowStyles}>
        {left}
        <View style={styles.children}>{children}</View>
        {right}
        {onPress && (
          <View>
            <Text style={styles.forwardIcon}>➔</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomColor: colors.border,
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
  },
  children: {
    flexGrow: 1,
  },
  forwardIcon: {
    fontSize: 20,
  },
});

export default React.memo(ListRow);
