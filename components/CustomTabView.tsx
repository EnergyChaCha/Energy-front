import React from "react";
import {
  StyleSheet,
  useWindowDimensions,
  ViewStyle,
  TextStyle,
} from "react-native";
import { TabView, TabBar, Route } from "react-native-tab-view";
import Colors from "@/constants/Colors";

interface TabViewProps {
  routes: Route[];
  renderScene: (props: { route: Route }) => React.ReactNode;
  containerStyle?: ViewStyle;
}

function CustomTabView({ routes, renderScene, containerStyle }: TabViewProps) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.label}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      // initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
      style={containerStyle}
    />
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    elevation: 0,
  },
  indicator: {
    backgroundColor: Colors.navy,
  },
  label: {
    color: Colors.navy,
    margin: 0,
    fontFamily: "notoSans6",
    fontSize: 15,
    lineHeight: 20,
  },
});

export default CustomTabView;
