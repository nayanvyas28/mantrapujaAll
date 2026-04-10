import { View, type ViewProps } from 'react-native';

// Type-safe alias for React 19/Expo 54 compatibility
const RNView = View as any;

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <RNView style={[{ backgroundColor }, style]} {...otherProps} />;
}
