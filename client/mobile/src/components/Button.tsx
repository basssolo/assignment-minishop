import React, { useMemo } from 'react';
import {
  Pressable,
  StyleProp,
  Text,
  View,
  type ViewStyle,
  type TextStyle,
  StyleSheet,
} from 'react-native';
import { colors } from 'app';

type Props = {
  title: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
};

const Button = ({
  title,
  disabled = false,
  style = {},
  textStyle = {},
  onPress,
}: Props) => {
  const viewStyles = useMemo(() => [styles.view, style], [style]);
  const textStyles = useMemo(() => [styles.text, textStyle], [textStyle]);
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => ({
        opacity: pressed || disabled ? 0.4 : 1,
      })}
      onPress={onPress}>
      <View style={viewStyles}>
        <Text style={textStyles}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  view: {
    padding: 8,
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.buttonText,
  },
});

export default React.memo(Button);
