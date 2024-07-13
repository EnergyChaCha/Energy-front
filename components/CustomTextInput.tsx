import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Colors from "@/constants/Colors";

interface CustomTextInputProps {
  label: string;
  value: string | undefined;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad";
  required?: boolean;
  inputType: "input" | "label" | "dropdown" | "number";
  bottomLine?: boolean;
  options?: { label: string; value: string }[];
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = "default",
  required = false,
  inputType,
  bottomLine = true,
  options = [],
}) => {
  const handleNumberChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    onChangeText!(numericValue);
  };

  const renderInput = () => {
    switch (inputType) {
      case "input":
        return (
          <TextInput
            style={[styles.input, bottomLine ? styles.bottomBorder : null]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={Colors.placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
          />
        );
      case "number":
        return (
          <TextInput
            style={[styles.input, bottomLine ? styles.bottomBorder : null]}
            value={value}
            onChangeText={handleNumberChange}
            placeholder={placeholder}
            placeholderTextColor={Colors.placeholder}
            keyboardType="number-pad"
          />
        );
      case "label":
        return (
          <Text
            style={[styles.labelValue, bottomLine ? styles.bottomBorder : null]}
          >
            {value}
          </Text>
        );
      case "dropdown":
        return (
          <View style={bottomLine ? styles.bottomBorder : null}>
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChangeText!(itemValue)}
              style={styles.picker}
            >
              {options.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {label != "" && (
        <Text style={styles.label}>
          {label} &nbsp;
          {required && <Text style={styles.requiredStar}>*</Text>}
        </Text>
      )}
      {renderInput()}
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
    lineHeight: 30,
    color: Colors.navy,
    fontFamily: "notoSans6",
    marginBottom: 10,
  },
  requiredStar: {
    color: Colors.red,
    marginLeft: 4,
    fontSize: 16,
  },
  input: {
    fontSize: 14,
    lineHeight: 30,
    paddingHorizontal: 0,
    fontFamily: "notoSans4",
    color: Colors.navy,
  },
  labelValue: {
    fontSize: 14,
    lineHeight: 30,
    paddingHorizontal: 0,
    fontFamily: "notoSans4",
    color: Colors.navy,
  },
  picker: {
    width: "100%",
    color: Colors.navy,
    fontFamily: "notoSans6",
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
});

export default CustomTextInput;
