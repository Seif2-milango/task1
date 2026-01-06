import { TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { CleanInput } from '@/components/ui/inputs/text';
import { EmailInput } from '@/components/ui/inputs/email';
import { PhoneInput } from '@/components/ui/inputs/number';
import CompoundPicker from '@/components/ui/compoundPicker';
import CommonInputs from '@/components/ui/inputs/commonInputs';

import formSchema from '@/assets/data/formSchema.json';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [compoundId, setCompoundId] = useState<string | null>(null);

  const compoundData = compoundId
    ? formSchema.compounds[compoundId as keyof typeof formSchema.compounds]
    : null;

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView style={{ width: '100%', height: 180, position: 'relative' }}>
        <ThemedView
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '90%',
            position: 'absolute',
            top: 50,
            left: 20,
            height: 'auto', //was 90
            paddingHorizontal: 20,
            backgroundColor: 'transparent',
          }}
        >
          <ThemedView
          style={{
            width: '100%',
            flexDirection: 'row',            
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            marginBottom: 20,
          }}>
            <ThemedView
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#0040FF',
                paddingHorizontal: 10,
                borderRadius: 15,
                marginBottom: 8,
                height: 30,
              }}
            >
              <MaterialIcons name="house" size={16} color="white" style={{ marginRight: 5 }} />
              <ThemedText style={{ fontSize: 12, color: 'white', fontWeight: '700' }}>
                RESIDENT PORTAL
              </ThemedText>
            </ThemedView>

            <CompoundPicker onSelect={setCompoundId}/>
          </ThemedView>

          <ThemedText
            style={{
              color: '#000',
              fontSize: 24,
              fontWeight: '600',
            }}
          >
            Welcome to the {compoundData?.label || 'Compound'} registration form!
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Caption */}
      <ThemedView style={{ width: '100%', alignItems: 'center', marginBottom: 30 }}>
        <ThemedText type="caption" style={{ width: '90%', textAlign: 'center' }}>
          Please fill in the form below and click submit when done.
        </ThemedText>
      </ThemedView>

      {/* Step 1 */}
      <ThemedView
      style={{
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 15,
      }}>
        {/* <CleanInput
          label="Full name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />

        <EmailInput
          label="Email address"
          value={email}
          onChangeText={setEmail}
          placeholder="your@email.com"
        />

        <PhoneInput
          label="Phone number"
          value={phone}
          onChangeText={setPhone}
        /> */}

        <CommonInputs
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    paddingHorizontal: 20,
  },
});
