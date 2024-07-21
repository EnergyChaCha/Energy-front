import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import IconButton from "@/components/IconButton";

const TermsOfService = () => {
  const [agreement, setAgreement] = useState({
    terms: false,
    privacy: false,
    location: false,
  });

  const handleChange = (name: string, value: boolean) => {
    setAgreement({ ...agreement, [name]: value });
  };

  const navigation = useNavigation();

  const handleSignUp = () => {
    (navigation as any).navigate("auth/signUpAccount");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>이용약관 동의</Text>
      <ScrollView style={styles.scroll}>
        <View style={styles.agreementItem}>
          <Text style={styles.allAgree}>
            이용약관, 개인정보 수집 및 이용{"\n"}위치정보 이용약관에 모두
            동의합니다.
          </Text>
          <IconButton
            checked={agreement.terms && agreement.privacy && agreement.location}
            size={35}
            icon="check-circle"
            onPress={() => {
              const newValue = !(
                agreement.terms &&
                agreement.privacy &&
                agreement.location
              );
              setAgreement({
                terms: newValue,
                privacy: newValue,
                location: newValue,
              });
            }}
          />
        </View>
        <View style={styles.separator} />

        <View style={styles.agreementItem}>
          <Text style={styles.agreementText}>
            이용약관에 동의 &nbsp;
            <Text style={styles.required}>(필수)</Text>
          </Text>
          <IconButton
            checked={agreement.terms}
            size={24}
            icon="check-circle"
            onPress={() => handleChange("terms", !agreement.terms)}
          />
        </View>
        <View style={styles.scrollDetail}>
          <ScrollView>
            <Text style={styles.agreementDetail}>
              제1조(목적) 본 약관은~~~~ (이하 "당 사이트")가 제공하는 모든
              서비스(이하 "서비스")의 이용조건 및 절차, 이용자와 당 사이트의
              권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로
              합니다. 제2조(용어의 정의) 제1조(목적) 본 약관은~~~~ (이하 "당
              사이트")가 제공하는 모든 서비스(이하 "서비스")의 이용조건 및 절차,
              이용자와 당 사이트의 권리, 의무, 책임사항과 기타 필요한 사항을
              규정함을 목적으로 합니다. 제2조(용어의 정의) 제1조(목적) 본
            </Text>
          </ScrollView>
        </View>

        <View style={styles.agreementItem}>
          <Text style={styles.agreementText}>
            개인정보 수집 및 이용에 대한 안내 &nbsp;
            <Text style={styles.required}>(필수)</Text>
          </Text>
          <IconButton
            checked={agreement.privacy}
            size={24}
            icon="check-circle"
            onPress={() => handleChange("privacy", !agreement.privacy)}
          />
        </View>
        <View style={styles.scrollDetail}>
          <ScrollView>
            <Text style={styles.agreementDetail}>
              제1조(목적) 본 약관은~~~~ (이하 "당 사이트")가 제공하는 모든
              서비스(이하 "서비스")의 이용조건 및 절차, 이용자와 당 사이트의
              권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로
              합니다. 제2조(용어의 정의) 제1조(목적) 본 약관은~~~~ (이하 "당
              사이트")가 제공하는 모든 서비스(이하 "서비스")의 이용조건 및 절차,
              이용자와 당 사이트의 권리, 의무, 책임사항과 기타 필요한 사항을
              규정함을 목적으로 합니다. 제2조(용어의 정의) 제1조(목적) 본
            </Text>
          </ScrollView>
        </View>

        <View style={styles.agreementItem}>
          <Text style={styles.agreementText}>
            위치 정보 수집에 대한 안내 &nbsp;
            <Text style={styles.required}>(필수)</Text>
          </Text>
          <IconButton
            checked={agreement.location}
            size={24}
            icon="check-circle"
            onPress={() => handleChange("location", !agreement.location)}
          />
        </View>
        <View style={styles.scrollDetail}>
          <ScrollView>
            <Text style={styles.agreementDetail}>
              제1조(목적) 본 약관은~~~~ (이하 "당 사이트")가 제공하는 모든
              서비스(이하 "서비스")의 이용조건 및 절차, 이용자와 당 사이트의
              권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로
              합니다. 제2조(용어의 정의) 제1조(목적) 본 약관은~~~~ (이하 "당
              사이트")가 제공하는 모든 서비스(이하 "서비스")의 이용조건 및 절차,
              이용자와 당 사이트의 권리, 의무, 책임사항과 기타 필요한 사항을
              규정함을 목적으로 합니다. 제2조(용어의 정의) 제1조(목적) 본
            </Text>
          </ScrollView>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 40,
    backgroundColor: "white",
  },
  title: {
    fontFamily: "notoSans8",
    fontSize: 28,
    color: Colors.navy,
  },
  scroll: {
    height: "80%",
  },
  scrollDetail: {
    height: 80,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    padding: 10,
    backgroundColor: Colors.background_gray,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.blue,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    lineHeight: 20,
    fontFamily: "notoSans5",
  },
  agreementItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  agreementText: {
    color: Colors.navy,
    fontSize: 16,
    fontFamily: "notoSans5",
  },
  agreementDetail: {
    fontSize: 12,
    color: Colors.gray,
    fontFamily: "notoSans4",
    lineHeight: 16,
    borderColor: Colors.background_gray,
  },
  required: {
    color: Colors.blue,
  },
  allAgree: {
    color: Colors.navy,
    fontSize: 16,
    fontFamily: "notoSans5",
  },
  separator: {
    marginVertical: 10,
    height: 1,
    backgroundColor: "#e5e5e9",
  },
});

export default TermsOfService;
