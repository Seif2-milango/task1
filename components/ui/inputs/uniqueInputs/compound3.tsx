import { ThemedText } from "@/components/themed-text";
import { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { ThemedView } from "../../../themed-view";
import NumberInput from "../horizontalNum";

type Compound3InputProps = {
  aptNo: string;
  setAptNo: (text: string) => void;
  passportNo: string;
  setPassportNo: (text: string) => void;
};

export default function Compound3Input({aptNo, setAptNo, passportNo, setPassportNo}: Compound3InputProps) {
    const [aptNoError, setAptNoError] = useState<string | null>(null);
    const aptNoRegex = /^(?:[1-9]\d?|1\d\d|1000)$/;

    const validateAptNo = (text: string) => {
        setAptNo(text);
        if (!text) return setAptNoError(null);
        setAptNoError(!aptNoRegex.test(text) ? 'Invalid apartment number: 1-1000' : null);
    }

    return (
        <ThemedView style={styles.container}>
            <NumberInput
                label="Apartment number"
                value={aptNo}
                setValue={setAptNo}
                regex={aptNoRegex}
                errorMessage="Invalid apartment number: 1-1000"
            />

            <ThemedView style={styles.passportContainer}>
                <ThemedText style={styles.label}>Passport number</ThemedText>
                <Image
                    source={require("../../../../assets/images/passport.png")}
                    style={styles.image}
                    resizeMode="contain"
                />

                
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