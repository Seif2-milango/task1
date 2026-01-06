import { ThemedView } from "../themed-view";
import { ThemedText } from "../themed-text";
import formSchema from "../../assets/data/formSchema.json";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

type CompoundPickerProps = {
  onSelect?: (compoundId: string | null) => void;
};

export default function CompoundPicker({ onSelect }: CompoundPickerProps) {
  const [selectedCompound, setSelectedCompound] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const compounds = Object.entries(formSchema.compounds).map(([key, value]) => ({
    label: value.label,
    value: key,
  }));

  const handleValueChange = (value: string) => {
    setSelectedCompound(value);
    if (onSelect) onSelect(value);
  };

  return (
    <ThemedView
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#00AEFF",
        paddingHorizontal: 10,
        borderRadius: 30,
        marginBottom: 8,
        height: 30,
      }}
    >
      <DropDownPicker
        open={open}
        value={selectedCompound}
        items={compounds}
        setOpen={setOpen}
        // setValue={handleValueChange}
        setValue={(callback) => {
            const newValue = typeof callback === 'function' ? callback(selectedCompound) : callback;
            handleValueChange(newValue);
        }}
        placeholder="Select Compound"
        style={{
          height: 20,               
          backgroundColor: "transparent",
          borderColor: "transparent",
          borderRadius: 30,
        }}
        textStyle={{
          fontSize: 13,
          color: "white",
          fontWeight: '700'
        }}
        placeholderStyle={{
          color: "white",
          fontSize: 12,
        }}
        arrowIconStyle={{ tintColor: "white" } as any}
        dropDownContainerStyle={{
          backgroundColor: "#00AEFF",
          borderColor: "transparent",
          borderRadius: 10,
        }}
        tickIconStyle={{ tintColor: "white" } as any}
        listMode="SCROLLVIEW"
      />
    </ThemedView>
  );
}
