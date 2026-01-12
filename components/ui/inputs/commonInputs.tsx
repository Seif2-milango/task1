import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

type CommonInputsProps = {
  name: string;
  setName: (text: string) => void;

  email: string;
  setEmail: (text: string) => void;

  phone: string;
  setPhone: (text: string) => void;
};

export default function CommonInputs({ name, setName, email, setEmail, phone, setPhone }: CommonInputsProps) {

  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const validateName = (text: string) => {
    setName(text);
    const textRegex = /^[A-Za-z\s]+$/;
    if (!text) return setNameError(null);
    setNameError(!textRegex.test(text) || text.length < 3 ? 'Invalid entry - only letters and spaces are allowed' : null);
  };

  const validateEmail = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!text) return setEmailError(null);
    setEmailError(!emailRegex.test(text) ? 'Invalid email - must include: At least 6 characters, one "@" symbol, a valid domain (such as .com) and no spaces' : null);
  };

  const validatePhone = (text: string) => {
    setPhone(text);
    const phoneRegex = /^01[0-9]{9}$/;
    if (!text) return setPhoneError(null);
    setPhoneError(!phoneRegex.test(text) ? 'Invalid Egyptian phone number' : null);
  };

  return (
    <ThemedView style={{ width: '100%', alignItems: 'center', gap: 15 }}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.label}>Full name</ThemedText>
        <TextInput
          value={name}
          onChangeText={validateName}
          placeholder="Enter your name"
          placeholderTextColor="#9CA3AF"
          style={[styles.input, nameError ? styles.inputError : null]}
        />
        {nameError && <ThemedText style={styles.errorText}>{nameError}</ThemedText>}
      </ThemedView>

      <ThemedView style={styles.container}>
        <ThemedText style={styles.label}>Email</ThemedText>
        <TextInput
          value={email}
          onChangeText={validateEmail}
          placeholder="your@email.com"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={[styles.input, emailError ? styles.inputError : null]}
        />
        {emailError && <ThemedText style={styles.errorText}>{emailError}</ThemedText>}
      </ThemedView>

      <ThemedView style={styles.container}>
        <ThemedText style={styles.label}>Phone number</ThemedText>
        <TextInput
          value={phone}
          onChangeText={validatePhone}
          placeholder="01012345678"
          placeholderTextColor="#9CA3AF"
          keyboardType="number-pad"
          maxLength={11}
          style={[styles.input, phoneError ? styles.inputError : null]}
        />
        {phoneError && <ThemedText style={styles.errorText}>{phoneError}</ThemedText>}
      </ThemedView>
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
