import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";

const TabComponent = () => {
  const [selectedTab, setSelectedTab] = useState(1);

  const handleTabPress = (tabNumber) => {
    setSelectedTab(tabNumber);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 1 && styles.selectedTabButton,
          ]}
          onPress={() => handleTabPress(1)}
        >
          <Text
            style={[
              styles.tabButtonText,
              selectedTab === 1 && styles.selectedTabButtonText,
            ]}
          >
            탭 1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 2 && styles.selectedTabButton,
          ]}
          onPress={() => handleTabPress(2)}
        >
          <Text
            style={[
              styles.tabButtonText,
              selectedTab === 2 && styles.selectedTabButtonText,
            ]}
          >
            탭 2
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 3 && styles.selectedTabButton,
          ]}
          onPress={() => handleTabPress(3)}
        >
          <Text
            style={[
              styles.tabButtonText,
              selectedTab === 3 && styles.selectedTabButtonText,
            ]}
          >
            탭 3
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabContent}>
        {selectedTab === 1 && <Text>탭 1 선택됨</Text>}
        {selectedTab === 2 && <Text>탭 2 선택됨</Text>}
        {selectedTab === 3 && <Text>탭 3 선택됨</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background_gray,
    padding: 10,
    height:100
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    paddingBottom: 10,
    marginBottom: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  selectedTabButton: {
    backgroundColor: Colors.blue,
    borderColor: Colors.blue,
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.gray,
  },
  selectedTabButtonText: {
    color: "white",
  },
  tabContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabComponent;
