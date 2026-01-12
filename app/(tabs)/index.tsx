import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import CompoundPicker from '@/components/ui/compoundPicker';
import CommonInputs from '@/components/ui/inputs/commonInputs';
import Compound1Input from '@/components/ui/inputs/uniqueInputs/compound1';
import Compound2Input from '@/components/ui/inputs/uniqueInputs/compound2';
import Compound3Input from '@/components/ui/inputs/uniqueInputs/compound3';

import formSchema from '@/assets/data/formSchema.json';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [compoundId, setCompoundId] = useState<string | null>(null);

  const [unit, setUnit] = useState('');
  const [houseType, setHouseType] = useState<string | null>(null);

  const [villaNo, setVillaNo] = useState('');
  const [moveInDate, setMoveInDate] = useState<Date | null>(null);

  const [aptNo, setAptNo] = useState('');
  const [passportNo, setPassportNo] = useState('');

  const compoundData = compoundId
    ? formSchema.compounds[compoundId as keyof typeof formSchema.compounds]
    : null;

  const [consent, setConsent] = useState(false);
  const isCommonValid = name.trim() && email.trim() && phone.trim();
  const isCompoundValid =
    (compoundId === 'c1' && unit.trim() && houseType) ||
    (compoundId === 'c2' && villaNo.trim() && moveInDate) ||
    (compoundId === 'c3' && unit.trim() && email.trim());
  const isFormValid = isCommonValid && isCompoundValid && consent;

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleSubmit = () => {
    const baseData = {
      name,
      email,
      phone,
      compoundId,
      consent,
      submittedAt: new Date().toISOString(),
    };

    let compoundSpecificData = {};

    if (compoundId === 'c1') {
      compoundSpecificData = { unit, houseType };
    } else if (compoundId === 'c2') {
      compoundSpecificData = { villaNo, moveInDate };
    } else if (compoundId === 'c3') {
      compoundSpecificData = { apartmentNumber: aptNo, passportNumber: passportNo };
    }

    const data = { ...baseData, ...compoundSpecificData };
    setSubmitting(true);
    setSubmittedData(data);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 3000);
  };

  if (submitted && submittedData) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <MaterialIcons name="check-circle" size={64} color="#00AEFF" />
        <ThemedText style={{ fontSize: 20, marginTop: 12, marginBottom: 20 }}>
          Thank you for registering!
        </ThemedText>

        <ThemedView style={{ width: '100%', gap: 8 }}>
          {Object.entries(submittedData).map(([key, value]) => (
            <ThemedText key={key} style={{ fontSize: 14, color: '#414141' }}>
              {key}: {value?.toString()}
            </ThemedText>
          ))}
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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

        {!compoundId ? (
            <ThemedView style={{width: '100%', alignItems: 'center',}}>
              <ThemedText style={{ width: '80%', color: '#7d7d7d' }}>
                Please select a compound to proceed with the registration...
              </ThemedText>
            </ThemedView>
          ) : (
          <>
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

              {compoundId === 'c1' && (
                <Compound1Input
                  value={unit}
                  onChangeText={setUnit}
                  onSelect={setHouseType}
                  placeholder='Unit number'
                />
              )}

              {compoundId === 'c2' && (
                <Compound2Input
                  villaNo={villaNo}
                  setVillaNo={setVillaNo}
                  moveInDate={moveInDate}
                  setMoveInDate={setMoveInDate}
                />
              )}

              {compoundId === 'c3' && (
                <Compound3Input
                  aptNo={aptNo}
                  setAptNo={setAptNo}
                  passportNo={passportNo}
                  setPassportNo={setPassportNo}
                />
              )}
            </ThemedView>

            <ThemedView
              style={{
                width: '80%',
                marginTop: 30,
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: 10,
              }}
            >
              <Pressable onPress={() => setConsent(!consent)}>
                <MaterialIcons
                  name={consent ? 'check-box' : 'check-box-outline-blank'}
                  size={24}
                  color="#414141d0"
                  
                />
              </Pressable>

              <ThemedText style={{ flex: 1, fontSize: 12, lineHeight: 15, color: '#B0B0B0'  }}>
                I confirm that I have read and agree to the Terms and Conditions and Privacy Policy, and I consent to the processing of my personal data for account registration and use of the application.
              </ThemedText>
            </ThemedView>

            <Pressable
              disabled={!isFormValid || submitting}
              onPress={handleSubmit}
              style={{
                width: '80%',
                alignSelf: 'center',
                marginTop: 20,
                paddingVertical: 14,
                borderRadius: 20,
                backgroundColor: isFormValid ? '#00AEFF' : '#7d7d7d',
                alignItems: 'center',
              }}
            >
              <ThemedText style={{ color: 'white', fontWeight: '600' }}>
                {submitting ? 'Submitting...' : 'Submit'}
              </ThemedText>
            </Pressable>
          </>)}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  }
});
