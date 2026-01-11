import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ThemedText } from "../../../themed-text";
import { ThemedView } from "../../../themed-view";
import NumberInput from "../horizontalNum";

type Compound2InputProps = {
  villaNo: string;
  setVillaNo: (text: string) => void;
  moveInDate: Date | null;
  setMoveInDate: (date: Date) => void;
};

export default function Compound2Input({villaNo, setVillaNo, moveInDate, setMoveInDate}: Compound2InputProps) {
    const [villaNoError, setVillaNoError] = useState<string | null>(null);
    const villaNoRegex = /^(?:[1-9]\d?|1\d\d|200)$/;

    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [moveInDateError, setMoveInDateError] = useState<string | null>(null);

    const validateVillaNo = (text: string) => {
        setVillaNo(text);
        const villaNoRegex = /^(?:[1-9]\d?|1\d\d|200)$/;
        if (!text) return setVillaNoError(null);
        setVillaNoError(!villaNoRegex.test(text) ? 'Invalid villa number: 1-200' : null);
    };

    const showDatePicker = () => setDatePickerVisible(true);
    const hideDatePicker = () => setDatePickerVisible(false);

    const handleConfirm = (date: Date) => {
        const mindDate = new Date('2014-01-01');
        const maxdDate = new Date();

        if (date < mindDate || date > maxdDate) {
            setMoveInDateError('Date must be between 01/01/2014 and today');
            return;
        }
        setMoveInDate(date);
        setMoveInDateError(null);
        hideDatePicker();
    };
    
    return (
        <ThemedView style={styles.external}>
            <ThemedView style={styles.container1}>
                <NumberInput
                    label="Villa number"
                    value={villaNo}
                    setValue={setVillaNo}
                    regex={villaNoRegex}
                    errorMessage="Invalid villa number: 1-200"
                />
                {/* <ThemedText style={styles.label}>Villa number</ThemedText>
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
                </ThemedView> */}
            </ThemedView>

            <ThemedView style={styles.container2}>
                <ThemedText style={styles.label}>Move-in Date</ThemedText>
                <TouchableOpacity onPress={showDatePicker} style={styles.dateInput}>
                    <ThemedText style={styles.dateText}> 
                        {moveInDate ? moveInDate.toLocaleDateString('en-GB') : "Click here to select date"}
                    </ThemedText>
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    date={moveInDate || new Date()}
                />
                {moveInDateError && <ThemedText style={styles.errorText}>{moveInDateError}</ThemedText>}
            </ThemedView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    external: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container1: {
        width: '80%',
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    container2: {
        width: '80%',
    },
    label: {
        fontSize: 15,
        marginBottom: 6,
        fontWeight: '500',
        paddingHorizontal: 15,
        // textAlign: 'center',
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
        marginTop: 6,
        fontSize: 13,
        color: '#EF4444',
    },
    dateInput: {
        height: 60,
        borderWidth: 1,
        borderColor: '#d1d1d1ff',
        borderRadius: 15,
        paddingHorizontal: 14,
        backgroundColor: '#FFFFFF',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        },
    dateText: {
        fontSize: 16,
        textAlign: 'center',
    },
})