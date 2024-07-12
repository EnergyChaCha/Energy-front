import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface CheckButtonProps {
  checked: boolean;
  size: number;
  onPress: () => void;
}

function CheckButton({ checked, size, onPress }: CheckButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesome5
        name="check-circle"
        size={size}
        color={checked ? Colors.blue : Colors.gray}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});

export default CheckButton;
