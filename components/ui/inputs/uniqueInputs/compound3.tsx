import { ThemedText } from "@/components/themed-text";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "../../../themed-view";
import NumberInput from "../number";

type Compound3InputProps = {
  aptNo: string;
  setAptNo: (text: string) => void;
  passportNo: string;
  setPassportNo: (text: string) => void;
};

export default function Compound3Input({aptNo, setAptNo, passportNo, setPassportNo}: Compound3InputProps) {
    const [aptNoError, setAptNoError] = useState<string | null>(null);
    const aptNoRegex = /^(1000|[1-9]\d{0,2})$/;

    const [passportNoError, setPassportNoError] = useState<string | null>(null);
    const passportRegex = /^[A-Z0-9]{9}$/;
    const [hidePassport, setHidePassport] = useState(true);

    const validateAptNo = (text: string) => {
        setAptNo(text);
        if (!text) return setAptNoError(null);
        setAptNoError(!aptNoRegex.test(text) ? 'Invalid apartment number: 1-1000' : null);
    }

    const validatePassportNo = (text: string) => {
        const normalized = text.toUpperCase();
        setPassportNo(normalized);

        if (!normalized) {
            setPassportNoError("");
            return;
        }

        setPassportNoError(
            !passportRegex.test(normalized)
            ? ""
            : null
        );
    };

    return (
        <ThemedView style={styles.container}>
            <NumberInput
                label="Apartment number"
                value={aptNo}
                setValue={validateAptNo}
                regex={aptNoRegex}
                errorMessage="Invalid apartment number: 1-1000"
                size="medium"
                placeholder="Enter here"
            />

            <ThemedView style={styles.passportContainer}>
                <ThemedText style={styles.label}>Passport number</ThemedText>
                <Image
                source={require("../../../../assets/images/passport.png")}
                style={styles.image}
                resizeMode="contain"
                />

                <ThemedView style={{ position: "relative" }}>
                <NumberInput
                    label=""
                    value={hidePassport ? "Hidden" : passportNo}
                    setValue={(text: string) => {
                    validatePassportNo(text);
                    }}
                    regex={passportRegex}
                    errorMessage="Passport number must be 9 characters, A-Z and 0-9 only"
                    maxLength={9}
                    size="large"
                    placeholder="A89141501"
                    editable={!hidePassport}
                />

                <TouchableOpacity
                    onPress={() => setHidePassport(!hidePassport)}
                    style={{ position: "absolute", right: 15, top: 45 }}
                >
                    <Feather
                    name={hidePassport ? "eye-off" : "eye"}
                    size={20}
                    color="#9CA3AF"
                    />
                </TouchableOpacity>
                </ThemedView>

                {passportNoError && <ThemedText style={{ color: "#EF4444", marginTop: 6 }}>{passportNoError}</ThemedText>}
            </ThemedView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "80%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: '100%',
        height: 300,
        marginBottom: -20,
    },
    label: {
        fontSize: 15,
        fontWeight: '500',
        paddingHorizontal: 15,
        height: 'auto',
    },
    passportContainer: {
        width: '100%',
        marginTop: 30,
    },
}) 