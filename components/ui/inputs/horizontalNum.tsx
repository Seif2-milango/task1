import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { ThemedText } from "../../themed-text";
import { ThemedView } from "../../themed-view";

type NumberInputProps = {
  label: string;
  value: string;
  setValue: (text: string) => void;
  placeholder?: string;
  regex: RegExp;
  errorMessage: string;
  maxLength?: number;
  size?: "small" | "medium" | "large";
};

export default function NumberInput({
    label,
    value,
    setValue,
    placeholder,
    regex,
    errorMessage,
    maxLength = 11,
    size = "medium",
}: NumberInputProps) {
  const [error, setError] = useState<string | null>(null);

  const validate = (text: string) => {
    setValue(text);
    if (!text) return setError(null);
    setError(!regex.test(text) ? errorMessage : null);
  };

  const isLarge = size === "large";
  const inputWidth =
    size === "small" ? "30%" :
    size === "medium" ? "50%" :
    "100%";

  return (
    <ThemedView style={[styles.container, isLarge && styles.containerLarge,]}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <ThemedView style={{ width: inputWidth }}>
        <TextInput
          value={value}
          onChangeText={validate}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          keyboardType="number-pad"
          maxLength={maxLength}
          style={[styles.input, error ? styles.inputError : null, isLarge && styles.largeInput]}
        />
        {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    containerLarge: {
        flexDirection: "column",
        marginTop: 0,
    },
    label: {
        fontSize: 15,
        marginBottom: 6,
        fontWeight: "500",
        paddingHorizontal: 15,
    },
    input: {
        height: 60,
        borderWidth: 1,
        borderColor: "#d1d1d1ff",
        borderRadius: 15,
        paddingHorizontal: 14,
        fontSize: 16,
        backgroundColor: "#FFFFFF",
        width: "100%",
        textAlign: "center",
    },
    largeInput: {
        height: 60,
        borderWidth: 1,
        borderColor: "#d1d1d1ff",
        borderRadius: 15,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: "#FFFFFF",
        width: "100%",
        textAlign: "left",

    },
    inputError: {
        borderColor: "#EF4444",
    },
    errorText: {
        marginTop: 6,
        fontSize: 13,
        color: "#EF4444",
    },
});
