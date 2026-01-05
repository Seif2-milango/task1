import { TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export function EmailInput({
  label = 'Email',
  value,
  onChangeText,
  placeholder = 'Enter your email',
}: {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}) {
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (text: string) => {
    onChangeText(text);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (text.length === 0) {
      setError(null);
      return;
    }

    if (!emailRegex.test(text)) {
      setError('Invalid email address');
    } else {
      setError(null);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.label}>{label}</ThemedText>

      <TextInput
        value={value}
        onChangeText={validateEmail}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={[
          styles.input,
          error ? styles.inputError : null,
        ]}
      />

      {error && (
        <ThemedView>
          <ThemedText style={styles.errorText}>{error}</ThemedText>

          <ThemedView style={{ flexDirection: 'column', backgroundColor: '#F7F7F7', borderRadius: 15, padding: 10, paddingVertical: 15, marginTop: 4, width: '100%' }}>
            <ThemedText style={styles.errorHint}>
              ⚠️ Must include:{"\n"}
              • At least 6 characters{"\n"}
              • One "@" symbol{"\n"}
              • A valid domain (e.g. example.com){"\n"}
              • No spaces
            </ThemedText>
          </ThemedView>
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
  errorHint: {
    marginTop: 2,
    fontSize: 13,
    color: '#000000ff',
    paddingHorizontal: 15,
    lineHeight:18,
  },
});
