import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HeartRateCard from "./HeartRateCard";

interface HelpModalProps {
  modalClose: () => void;
}

function HelpModal({ modalClose }: HelpModalProps) {
  const handleClose = () => {
    modalClose();
  };

  const item = {
    id: "worker_uuid_2",
    name: "이름",
    phone: "전화번호",
    loginId: "아이디",
    minBpm: 85,
    maxBpm: 110,
    averageBpm: 97,
    minThreshold: 70,
    maxThreshold: 130,
    heartrateStatus: "help",
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <MaterialCommunityIcons name="close" size={24} color={Colors.gray} />
      </TouchableOpacity>
      <HeartRateCard data={item} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "50%",
    width: "90%",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    paddingTop: 50
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 1,
  },
});

export default HelpModal;
