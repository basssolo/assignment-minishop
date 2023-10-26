import React, { useMemo, type PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Edges, SafeAreaView } from 'react-native-safe-area-context';

import { colors } from 'app';

type Props = {
  edges?: Edges;
  style?: StyleProp<ViewStyle>;
};

export const Screen = ({
  children,
  edges = ['left', 'right'],
  style = {},
}: PropsWithChildren<Props>) => {
  const safeAreaStyles = useMemo(() => [styles.safeArea, style], [style]);
  return (
    <SafeAreaView edges={edges} style={safeAreaStyles}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
});

export default Screen;
