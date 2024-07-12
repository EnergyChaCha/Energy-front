import { StyleSheet } from 'react-native';

import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function TabOneScreen() {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title} onPress={() => navigation.navigate("auth/login")}>Tab One</Text>
      <View style={styles.separator}/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
