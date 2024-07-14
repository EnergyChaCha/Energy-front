import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import CustomTextInput from "./CustomTextInput";
import { AntDesign } from "@expo/vector-icons";

interface SearchFormProps {
  searchClick: (text: string, type?: string) => void;
  searchOptions?: { label: string; value: string }[];
}

function SearchForm({ searchClick, searchOptions }: SearchFormProps) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("");

  useEffect(() => {
    if (searchOptions && searchOptions.length > 0) {
      setSearchType(searchOptions[0].value);
    }
  }, [searchOptions]);

  const searchBtnClick = () => {
    if (searchInput.trim()) {
      searchClick(searchInput, searchType);
    }
  };

  return (
    <View style={styles.view}>
      {searchOptions && (
        <View style={styles.searchType}>
          <CustomTextInput
            inputType="dropdown"
            label=""
            bottomLine={false}
            value={searchType}
            options={searchOptions}
            onChangeText={setSearchType}
          />
        </View>
      )}

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
    flex: 1,
    paddingHorizontal:10
  },
});

export default SearchForm;
