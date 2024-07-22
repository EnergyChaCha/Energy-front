import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from "@react-navigation/native";
import Colors from "@/constants/Colors";
import CustomTextInput from "@/components/CustomTextInput";
import { RootStackParamList } from "./signupType";
import { signUp } from "@/api/authApi";

const SignUpWork = () => {
  const [form, setForm] = useState({
    department: "",
    workArea: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  type SignUpWorkRouteProp = RouteProp<RootStackParamList, "auth/signUpWork">;
  type SignUpWorkNavigationProp = NavigationProp<RootStackParamList>;

  const navigation = useNavigation<SignUpWorkNavigationProp>();
  const route = useRoute<SignUpWorkRouteProp>();
  const { signUpData, personalData } = route.params;

  const handleSignUp = async () => {

    navigation.navigate("auth/signUpHealth", {
      signUpData,
      personalData,
      workData:{
        department: form.workArea,
        workArea: form.department,
      }
    });    
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <ScrollView style={styles.scroll}>
        <CustomTextInput
          label="근무지"
          value={form.workArea}
          onChangeText={(value) => handleChange("workArea", value)}
          placeholder="근무지"
          inputType="input"
        />
        <CustomTextInput
          label="직무"
          value={form.department}
          onChangeText={(value) => handleChange("department", value)}
          placeholder="직무"
          inputType="input"
        />
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
    fontWeight: "bold",
  },
});

export default SignUpWork;
