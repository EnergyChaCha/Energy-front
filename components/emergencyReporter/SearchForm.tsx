import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import CustomTextInput from "../CustomTextInput";
import { AntDesign } from "@expo/vector-icons";

interface CheckButtonProps {
  checked: boolean;
  size: number;
  onPress: () => void;
}

// function SearchForm({ checked, size, onPress }: CheckButtonProps) {
function SearchForm() {
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("");
  const searchOptions = [
    // { label: "선택", value: "" },
    { label: "환자", value: "patient" },
    { label: "접수자", value: "reporter" },
  ];

  const searchBtnClick = () => {};

  return (
    <View style={styles.view}>
      <View style={styles.searchType}>
        <CustomTextInput
          inputType="dropdown"
          label=""
          value={searchType}
          options={searchOptions}
          onChangeText={setSearchType}
        />
      </View>

      <TextInput
        style={styles.input}
        value={searchInput}
        onChangeText={setSearchInput}
        placeholder="아이디로 검색"
      />
      <TouchableOpacity style={styles.searchButton} onPress={searchBtnClick}>
        <AntDesign name="search1" size={30} color={Colors.navy} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
    height: 50,
    shadowColor: "#6c6c6c",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 5,
  },
  searchType: {
    width: "35%",
  },
  searchButton: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "50%",
  },
});

export default SearchForm;
