import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
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
    if (agreement.location && agreement.privacy && agreement.terms) {
      (navigation as any).navigate("auth/signUpAccount");
    } else {
      Alert.alert("이용약관에 모두 동의해주세요.");
    }
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
              {`이용약관 동의 및 위치 정보 수집에 대한 안내

1. 이용약관 동의
Gang Han Nal 서비스를 이용해 주셔서 감사합니다. Gang Han Nal의 모든 서비스를 이용하기 위해서는 아래 이용약관에 대한 동의가 필요합니다.

제1조 (목적)
본 약관은 Gang Han Nal(이하 "회사"라 함)이 제공하는 서비스의 이용 조건 및 절차에 관한 사항과 기타 필요한 사항을 규정함을 목적으로 합니다.

제2조 (이용약관의 효력 및 변경)
본 약관은 서비스를 이용하고자 하는 모든 회원에 대하여 그 효력을 발생합니다.
회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있습니다. 변경된 약관은 공지사항을 통해 공지되며, 공지 후 7일 이내에 이의를 제기하지 않으면 변경된 약관에 동의한 것으로 간주됩니다.
제3조 (이용계약의 성립)
이용계약은 회원의 이용신청에 대하여 회사가 승낙함으로써 성립합니다.
이용계약은 서비스 이용 신청자의 본 약관에 대한 동의와 이용 신청에 대한 회사의 승낙으로 성립됩니다.
제4조 (회원정보의 변경)
회원은 개인정보 관리 화면을 통해 언제든지 본인의 개인정보를 열람하고 수정할 수 있습니다. 단, 서비스 관리를 위해 필요한 아이디 등은 수정이 불가능합니다.

제5조 (회원의 의무)
회원은 본 약관 및 관계 법령에서 규정한 사항을 준수하여야 합니다.
회원은 타인의 명의를 도용하거나 허위 정보를 등록해서는 안됩니다.
제6조 (서비스 제공의 중단)
회사는 다음 각 호에 해당하는 경우 서비스 제공을 중단할 수 있습니다:

설비의 보수 등 회사의 필요에 의한 경우
기타 불가항력적인 사유가 발생한 경우
제7조 (면책조항)
회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중단, 제3자의 불법적인 행위 등으로 인한 서비스 중단에 대하여 책임을 지지 않습니다.
회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.
제8조 (기타)
본 약관에서 정하지 아니한 사항과 본 약관의 해석에 관하여는 관계 법령 및 상관례에 따릅니다.`}
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
              {`개인정보 수집 및 이용에 대한 안내

1. 개인정보 수집 항목
Gang Han Nal은 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.
필수 항목: 이름, 연락처(전화번호 또는 이메일 주소), 로그인 ID
선택 항목: 생년월일, 성별, 주소, 건강 정보(예: 혈압, 알레르기 정보 등)

2. 개인정보 수집 목적
Gang Han Nal은 수집한 개인정보를 다음의 목적을 위해 활용합니다:
회원 관리: 회원제 서비스 이용 및 본인 확인, 개인 식별
서비스 제공: 맞춤형 서비스 제공, 고객 상담 및 문의 응대
마케팅 및 광고: 신규 서비스(제품) 개발 및 특화, 이벤트 정보 및 참여 기회 제공
통계 분석: 서비스 이용 통계 및 분석, 서비스 개선 및 연구

3. 개인정보 보유 및 이용 기간
Gang Han Nal은 법령에 따른 개인정보 보유 및 이용 기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유 및 이용 기간 내에서 개인정보를 처리 및 보유합니다:
회원 탈퇴 시 즉시 삭제
관계 법령에 따라 보관해야 하는 경우 해당 법령에서 정한 기간 동안 보관

4. 개인정보 제3자 제공
Gang Han Nal은 원칙적으로 정보주체의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다:
정보주체의 사전 동의를 얻은 경우
법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우

5. 개인정보 처리 위탁
Gang Han Nal은 원활한 개인정보 업무 처리를 위해 다음과 같이 개인정보 처리 업무를 위탁하고 있습니다:
위탁 받는 자(수탁자): [수탁자명]
위탁하는 업무의 내용: [위탁 업무 내용]

6. 정보주체의 권리, 의무 및 행사 방법
정보주체는 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:
개인정보 열람 요구
오류 등이 있을 경우 정정 요구
삭제 요구
처리 정지 요구

7. 개인정보의 안전성 확보 조치
Gang Han Nal은 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:

개인정보의 암호화
해킹 등에 대비한 기술적 대책
개인정보 취급 직원의 최소화 및 교육

8. 개인정보 보호 책임자 및 담당자 연락처
Gang Han Nal은 개인정보 보호에 최선을 다하고 있습니다. 개인정보 보호와 관련된 문의, 불만 처리, 피해 구제 등을 위해 아래와 같이 개인정보 보호 책임자 및 담당자를 지정하고 있습니다:
개인정보 보호 책임자: [성명]
연락처: [전화번호], [이메일]

9. 개인정보 처리방침 변경
이 개인정보 처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경 내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.

시행일: [시행일자]
Gang Han Nal은 회원님의 개인정보를 소중하게 생각하며, 안전하게 처리하고 있습니다. 감사합니다.
`}
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
              {`위치 정보 수집에 대한 안내
              
Gang Han Nal은 보다 나은 서비스를 제공하기 위해 위치 정보를 수집하고 있습니다. 위치 정보 수집에 대한 상세한 내용은 다음과 같습니다:

제1조 (위치 정보의 수집 및 이용 목적)
Gang Han Nal은 다음과 같은 목적을 위해 위치 정보를 수집 및 이용합니다:

긴급 상황 발생 시 회원의 위치 파악 및 신속한 대응
회원 맞춤형 서비스 제공
서비스 개선을 위한 통계 분석
제2조 (수집하는 위치 정보의 항목)
Gang Han Nal은 서비스 이용 시 다음과 같은 위치 정보를 수집합니다:

GPS를 통한 정확한 위치 정보
네트워크를 통한 대략적인 위치 정보
제3조 (위치 정보의 제공)
Gang Han Nal은 법령에 특별한 규정이 있는 경우를 제외하고는 회원의 동의 없이 위치 정보를 제3자에게 제공하지 않습니다.

제4조 (위치 정보의 보유 및 이용 기간)
Gang Han Nal은 수집된 위치 정보를 서비스 제공 기간 동안 보유 및 이용하며, 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.

제5조 (위치 정보 수집에 대한 동의 철회)
회원은 언제든지 위치 정보 수집에 대한 동의를 철회할 수 있으며, 동의 철회는 설정에서 위치 정보 사용을 비활성화함으로써 가능합니다.

제6조 (위치 정보의 안전성 확보 조치)
Gang Han Nal은 수집된 위치 정보를 안전하게 관리하기 위해 다음과 같은 조치를 취하고 있습니다:

위치 정보는 암호화되어 전송 및 저장됩니다.
위치 정보 접근 권한을 최소화하고 있습니다.
위치 정보의 안전한 관리를 위해 정기적인 점검을 실시합니다.
Gang Han Nal은 회원님의 위치 정보를 소중하게 다루며, 안전하게 처리하고 있습니다. 위치 정보 수집 및 이용과 관련하여 궁금한 사항이 있으시면 언제든지 고객센터로 문의해 주시기 바랍니다. 감사합니다.`}
            </Text>
          </ScrollView>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.button,
          agreement.location &&
            agreement.privacy &&
            agreement.terms && { backgroundColor: Colors.blue },
        ]}
        onPress={handleSignUp}
      >
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
    backgroundColor: "#a7a7a7",
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
