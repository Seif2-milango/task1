import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { ThemedText } from "../../../themed-text";
import { ThemedView } from "../../../themed-view";

type Compound2InputProps = {
  villaNo: string;
  setVillaNo: (text: string) => void;
  moveInDate: string;
  setMoveInDate: (text: string) => void;
};

export default function Compound2Input({villaNo, setVillaNo, moveInDate, setMoveInDate}: Compound2InputProps) {
    const [villaNoError, setVillaNoError] = useState<string | null>(null);

    const validateVillaNo = (text: string) => {
        setVillaNo(text);
        const villaNoRegex = /^(?:[1-9]\d?|1\d\d|200)$/;
        if (!text) return setVillaNoError(null);
        setVillaNoError(!villaNoRegex.test(text) ? 'Invalid villa number: 1-200' : null);
    };
    
    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.label}>Villa number</ThemedText>
            <ThemedView style={{ width: '60%' }}>
                <TextInput
                    value={villaNo}
                    onChangeText={validateVillaNo}
                    placeholder="Enter here"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="number-pad"
                    maxLength={11}
                    style={[styles.input, villaNoError ? styles.inputError : null]}
                />
                {villaNoError && <ThemedText style={styles.errorText}>{villaNoError}</ThemedText>}
            </ThemedView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: 15,
        marginBottom: 6,
        fontWeight: '500',
        paddingHorizontal: 15,
        textAlign: 'center',
        height: 'auto',
    },
    input: {
        height: 60,
        borderWidth: 1,
        borderColor: '#d1d1d1ff',
        borderRadius: 15,
        paddingHorizontal: 14,
        fontSize: 16,
        backgroundColor: '#FFFFFF',
        width: '100%',
        textAlign: 'center',
    },
    inputError: {
        borderColor: '#EF4444',
    },
    errorText: {
        position: 'absolute',
        bottom: -30,
        marginTop: 6,
        fontSize: 13,
        color: '#EF4444',
    },
})