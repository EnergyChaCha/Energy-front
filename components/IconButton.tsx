import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface IconButtonProps {
  checked: boolean;
  size: number;
  icon: string;
  // iconTag: string;
  onPress: () => void;
}
const IconButton: React.FC<IconButtonProps> = ({
  checked,
  size,
  icon,
  // iconTag,
  onPress,
}) => {
  // const renderIcon = () => {
  //   switch (iconTag) {
  //     case "FontAwesome5":
  //       return (
  //         <FontAwesome5
  //           name={icon}
  //           size={size}
  //           color={checked ? Colors.blue : Colors.gray}
  //         />
  //       );
  //   }
  // };

  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesome5
        name={icon}
        size={size}
        color={checked ? Colors.blue : Colors.gray}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default IconButton;
