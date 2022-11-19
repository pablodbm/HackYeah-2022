import React, { useEffect, useState } from "react";
import { StyleSheet, Image, Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Map from "./Map";
import List from "./List";
import Create from "./Create";
import My from "./My";
import Account from "./Account";
import Details from "./Details";
import MapIcon from "../assets/icons/map.png";
import ListIcon from "../assets/icons/listt.png";
import AddIcon from "../assets/icons/add2.png";
import UserIcon from "../assets/icons/user.png";
import MyIcon from "../assets/icons/mine.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainMenu = ({ route }) => {
  const Tab = createBottomTabNavigator();

  const { token, userData } = route.params;
  const MapScreen = () => <Map token={token} />;
  const ListScreen = () =><List token={token}/>
  const [accessToken, setAccessToken] = useState();
  const [user, setUser] = useState(userData);

  useEffect(() => {
    async function getToken() {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token != undefined) setAccessToken(token);
      } catch (e) {
        navigation.navigate("HomeScreen");
      }
    }
    getToken();
  }, []);
  return (
    <Tab.Navigator
      initialRouteName="Map"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "gold",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          color: "white",
          backgroundColor: "#3D550C",
        },
      }}>
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: () => (
            <Image
              tintColor="rgb(255,255,255)"
              source={MapIcon}
              style={styles.image}
            />
          ),
        }}
      />
      <Tab.Screen
        name="List"
        component={ListScreen}
        options={{
          tabBarIcon: () => (
            <Image
              tintColor="rgb(255,255,255)"
              source={ListIcon}
              style={styles.image}
            />
          ),

          headerStyle: {
            backgroundColor: "#9932CC",
          },
          headerTintColor: "#ffffff",
        }}
      />
      <Tab.Screen
        name="Add"
        component={Create}
        options={{
          title: "",
          tabBarIcon: () => (
            <Image
              tintColor="rgb(255,255,255)"
              source={AddIcon}
              style={styles.imageBig}
            />
          ),
        }}
      />
      <Tab.Screen
        name="My"
        component={My}
        options={{
          tabBarIcon: () => (
            <Image
              tintColor="rgb(255,255,255)"
              source={MyIcon}
              style={styles.image}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={Details}
        options={{ tabBarItemStyle: { display: 'none', }, }}
      />

      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: () => (
            <Image
              tintColor="rgb(255,255,255)"
              source={UserIcon}
              style={styles.image}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
  },
  imageBig: {
    marginTop: 10,
    width: 45,
    height: 45,
  },
});

export default MainMenu;
