import React from 'react';
import {Pressable, StyleSheet, Text, ViewStyle} from 'react-native';

import {colors, spacing} from '../theme';

type SelectChipProps = {
  label: string;
  selected?: boolean;
  onPress: () => void;
  style?: ViewStyle;
};

export function SelectChip({
  label,
  selected = false,
  onPress,
  style,
}: SelectChipProps): React.JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, selected && styles.containerActive, style]}>
      <Text style={[styles.text, selected && styles.textActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  containerActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  text: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textSecondary,
  },
  textActive: {
    color: '#FFFFFF',
  },
});