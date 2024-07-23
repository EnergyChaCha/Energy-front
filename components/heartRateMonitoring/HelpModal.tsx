import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HeartRateCard from "./HeartRateCard";
import { Ionicons } from "@expo/vector-icons";

interface HelpModalProps {
  modalClose: () => void;
}

function HelpModal({ modalClose }: HelpModalProps) {
  const handleClose = () => {
    modalClose();
  };

  const item = {
    id: 1,
    name: "이름",
    phone: "전화번호",
    loginId: "아이디",
    minBpm: 85,
    maxBpm: 110,
    avgBpm: 97,
    minThreshold: 70,
    maxThreshold: 130,
    heartrateStatus: 0,
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Ionicons name="help-circle-outline" size={30} color={Colors.navy} />
        <Text style={styles.titleText}>도움말</Text>
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <MaterialCommunityIcons name="close" size={24} color={Colors.gray} />
      </TouchableOpacity>
      <HeartRateCard data={item} />
      <View style={styles.textContainer}>
        <Text style={styles.textWrapper}>
          <Text style={styles.bold}>임계치</Text> : 심박수가 이 한계값을
          넘어가면 건강에 위험이 있을 수 있어 주의 경고를 보내는 기준입니다.
        </Text>
        <Text style={styles.textWrapper}>
          <Text style={styles.bold}>빨간색 박스</Text> : 최소 임계치 - 최대
          임계치
        </Text>
        <Text style={styles.textWrapper}>
          <Text style={styles.bold}>점선</Text> : 근로자의 최소 심박수 / 최대
          심박수
        </Text>
        <Text style={styles.textWrapper}>
          <Text style={styles.bold}>실선</Text> : 근로자의 평균 심박수
        </Text>
        <Text></Text>

        <Text style={styles.bold}>심박수 등급</Text>
        <Text style={styles.textWrapper}>
          <Text style={[styles.bold, { color: Colors.navy }]}>안정</Text>: 3개월
          이내에 심박수가 임계치를 넘은 적이 없는 근로자
        </Text>
        <Text style={styles.textWrapper}>
          <Text style={[styles.bold, { color: Colors.orange }]}>주의</Text> :
          3개월 이내에 심박수가 임계치를 넘은 적이 있는 근로자
        </Text>
        <Text style={styles.textWrapper}>
          <Text style={[styles.bold, { color: Colors.red }]}>위급</Text> : 현재
          심박수가 임계치를 넘은 근로자
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "72%",
    width: "90%",
    padding: 5,
    paddingHorizontal:15,
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
  },
  title:{
    flexDirection:"row",
    alignItems: "center"
  },
  titleText:{
    fontFamily:"notoSans8",
    fontSize:23,
    color: Colors.navy,
    marginLeft:5
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 1,
  },
  textContainer:{
    marginTop: 10
  },
  textWrapper: {
    fontFamily: "notoSans4",
    fontSize: 13,
    lineHeight: 20,
  },
  bold: {
    fontFamily: "notoSans7",
    fontSize: 15,
    lineHeight: 23,
  },
});

export default HelpModal;
