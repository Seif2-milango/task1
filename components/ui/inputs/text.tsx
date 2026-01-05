import { TextInput, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useState } from 'react';

export function CleanInput({
  label,
  value,
  onChangeText,
  placeholder,
}: {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}) {
    const [error, setError] = useState<string | null>(null);
    
      const validateText = (text: string) => {
        onChangeText(text);
    
        const textRegex = /^[A-Za-z\s]+$/;
    
        if (text.length === 0) {
          setError(null);
          return;
        }

        if (!textRegex.test(text) || text.length < 3) {
          setError('Invalid entry - only letters and spaces are allowed');
        } else {
          setError(null);
        }
      };
    
  return (
    <ThemedView style={styles.container}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      <TextInput
        value={value}
        onChangeText={validateText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        style={[
          styles.input,
          error ? styles.inputError : null,
        ]}
    />

    {error && (
        <ThemedView>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
        </ThemedView>
    )}
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
