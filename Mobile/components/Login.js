import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Icon,
  ActivityIndicator
} from "react-native";
import Bg from "../assets/backgroundStart.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";
 
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fetchOngoing, setFetchOngoing] = useState(false)
  const [inCorrectEmail, setInCorrectEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [validationOn, setValidationOn] = useState(false);
 
  useEffect(() => {
    if (validationOn) {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      setInCorrectEmail(reg.test(email) ? false : true)
    }
  }, [email, validationOn])
 
  useEffect(() => {
    if (validationOn) {
      setEmptyPassword(password.length > 0 ? false : true)
    }
  }, [password, validationOn])
 
  const validateResponse = async (res) => {
    if ("access_token" in res) {
 
      const token = res.access_token
      console.log(token)
      try {
        await AsyncStorage.setItem("access_token", token)
        navigation.navigate("MainMenu", { token: res.access_token, userData: res.user })
      } catch (e) {
        Alert.alert("Cannot store token")
      }
    } else {
      Alert.alert("Invalid e-mail or password")
    }
  }
 
 
  const canLogin = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(email) && password.length > 0 ? true : false
  }
 
  const LoginUser = async () => {
    setValidationOn(true)
    if (canLogin()) {
      setFetchOngoing(true)
      const data = {
        email: email,
        password: password
      }
      const url = "https://gibapp-pickapp-api.herokuapp.com/public/api/login"
      await fetch(url, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => validateResponse(res))
      setFetchOngoing(false)
    }
  };
 
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ImageBackground source={Bg} style={{ width: "100%", height: "100%" }}>
        {fetchOngoing === false ? (
          <>
            <View style={{ flex: 2, padding: 15, fontWeight: "bold" }}>
              <Text style={{ color: "white", fontSize: 48, fontWeight: "bold" }}>
                PickApp
              </Text>
            </View>
            <View style={{ flex: 8, padding: 10, justifyContent: "flex-end" }}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="Email"
                maxLength={60}
                placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
              />
              <Text style={{ color: "red" }}>
                {inCorrectEmail ? "Incorrect email" : ""}</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholder="Password"
                maxLength={40}
                placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                secureTextEntry={true}
              />
              <Text style={{ color: "red" }}>
                {emptyPassword ? "This value cannot be empty" : ""}
              </Text>
            </View>
            <View style={{ flex: 3 }}>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 9,
                  height: 60,
                  padding: 10,
                  margin: 5,
                }}
                onPress={LoginUser}
              >
                <Text
                  style={{ fontSize: 20, color: "#59981A", fontWeight: "bold" }}
                >
                  Log in
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  borderWidth: 3,
                  borderColor: "white",
                  borderRadius: 9,
                  height: 60,
                  padding: 10,
                  margin: 5,
                }}
                onPress={() => {
                  navigation.navigate("Home");
                }}
              >
                <Text
                  style={{ fontSize: 20, color: "#FFFFFF", fontWeight: "bold" }}
                >
                  Back
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator color="#3d550c" size="large" />
          </View>
 
        )}
      </ImageBackground>
 
    </View>
  );
};
 
const styles = StyleSheet.create({
  input: {
    marginTop: 16,
    paddingVertical: 6,
    borderBottomWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 2,
    color: "#FFFFFF",
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
    width: "100%"
  },
});
 
export default Login;