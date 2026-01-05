import { TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export function PhoneInput({
  label = 'Phone number',
  value,
  onChangeText,
  placeholder = 'e.g. 01012345678',
}: {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}) {
  const [error, setError] = useState<string | null>(null);

  const egyptPhoneRegex = /^01[0-9]{9}$/;

  const validatePhone = (text: string) => {
    onChangeText(text);

    if (text.length === 0) {
      setError(null);
      return;
    }

    if (!egyptPhoneRegex.test(text)) {
      setError('Invalid Egyptian phone number');
    } else {
      setError(null);
    }
  };

  return (
    <ThemedView style={styles.container}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}

      <TextInput
        value={value}
        onChangeText={validatePhone}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        keyboardType="number-pad"
        style={[styles.input, error ? styles.inputError : null]}
        maxLength={11}
      />

      {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    marginBottom: 6,
    fontWeight: '500',
    paddingHorizontal: 15,
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: '#d1d1d1ff',
    borderRadius: 15,
    paddingHorizontal: 14,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    marginTop: 6,
    fontSize: 13,
    color: '#EF4444',
    paddingHorizontal: 15,
  },
});
