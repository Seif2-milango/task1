import { ThemedView } from "../themed-view";
import { ThemedText } from "../themed-text";

export default function CompoundPicker() {
    return (
        <ThemedView
        style={{
            // width: '100%',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#00AEFF',
            paddingHorizontal: 10,
            borderRadius: 15,
            marginBottom: 8,
        }}>
            <ThemedText style={{ fontSize: 12, color: 'white', fontWeight: '700', }}>
                COMPOUND NAME
            </ThemedText>
        </ThemedView>
    )
}