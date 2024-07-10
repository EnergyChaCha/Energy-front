import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import Colors from "@/constants/Colors";

interface CustomTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad";
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = "default",
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    width: "100%",
  },
  label: {
    fontSize: 16,
    color: Colors.navy,
    fontFamily: "notoSans6",
    marginBottom: 5,
  },
  input: {
    fontSize: 14,
    paddingVertical: 5,
    paddingHorizontal: 0,
    fontFamily: "notoSans4",
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
});

export default CustomTextInput;
