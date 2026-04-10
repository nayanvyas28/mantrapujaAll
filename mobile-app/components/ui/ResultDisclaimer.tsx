import React from 'react';
import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import { Typography } from './Typography';

// Type-safe alias for React 19/Expo 54 compatibility
const RNView = View as any;

import { useTheme } from '../../context/ThemeContext';
import Config from '../../constants/Config';

interface ResultDisclaimerProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
  centered?: boolean;
}

export const ResultDisclaimer: React.FC<ResultDisclaimerProps> = ({ 
  style, 
  textStyle, 
  centered = true 
}) => {
  const { colors } = useTheme();

  return (
    <RNView style={[styles.container, centered && styles.centered, style]}>
      <Typography 
        variant="label" 
        color={colors.mutedForeground} 
        style={[styles.text, textStyle, centered && { textAlign: 'center' }]}
      >
        {Config.disclaimer}
      </Typography>
    </RNView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    opacity: 0.8,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.3,
  },
});
