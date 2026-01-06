import { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { ThemedView } from "../../../themed-view";
import { ThemedText } from "../../../themed-text";
import formSchema from "../../../../assets/data/formSchema.json";

type Compound1InputProps = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSelect?: (type: string | null) => void;
};

export default function Compound1Input({
  label = "Residential unit",
  value,
  onChangeText,
  placeholder,
  onSelect,
}: Compound1InputProps) {
    const [open, setOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const houseTypes = formSchema.compounds.c1.fields.find(
        field => field.id === "houseType"
    )?.options as string[] | undefined;

    const validateText = (text: string) => {
        onChangeText(text);
        if (text.length === 0) {
            setError(null);
            return;
        }

        const num = Number(text);
        if (!/^\d+$/.test(text) || num < 1 || num > 350) {
            setError("Invalid entry - must be a number between 1 and 350");
        } else {
            setError(null);
        }
    };


  return (
    <ThemedView style={styles.wrapper}>
      <ThemedText style={styles.label}>{label}</ThemedText>

      <ThemedView style={styles.row}>
        {/* Picker wrapper */}
        <ThemedView style={styles.pickerWrapper}>
          <DropDownPicker
            open={open}
            value={selectedType}
            items={houseTypes?.map(t => ({ label: t, value: t })) ?? []}
            setOpen={setOpen}
            setValue={cb => {
              const val = typeof cb === "function" ? cb(selectedType) : cb;
              setSelectedType(val);
              onSelect?.(val);
            }}
            placeholder="Type"
            style={styles.picker}
            textStyle={styles.pickerText}
            placeholderStyle={styles.pickerText}
            dropDownContainerStyle={styles.dropdown}
            listMode="SCROLLVIEW"
            zIndex={1000}
            zIndexInverse={3000}
          />
        </ThemedView>

        {/* TextInput wrapper */}
        <ThemedView style={styles.inputWrapper}>
          <TextInput
            value={value}
            onChangeText={validateText}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            style={[styles.input, error && styles.inputError]}
          />
          {error && <ThemedText style={styles.error}>{error}</ThemedText>}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "80%",
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 8,
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  pickerWrapper: {
    width: "40%",
  },
  picker: {
    width: "100%",
    height: 60,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderColor: "#d1d1d1ff",
    backgroundColor: "#fff",
  },
  pickerText: {
    fontSize: 15,
    color: "#000",
  },
  dropdown: {
    borderColor: "#d1d1d1ff",
    borderRadius: 15,
  },
  inputWrapper: {
    width: "60%",
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: "#d1d1d1ff",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 14,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#EF4444",
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    color: "#EF4444",
  },
});
