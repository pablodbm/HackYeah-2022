import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const Account = (props) => {
    const [token, setToken] = useState(props.token)
    const [name, setName] = useState(props.userData.name)
    const [email, setEmail] = useState(props.userData.email)
    const [phone, setPhone] = useState(props.userData.phone)
    const [id, setId] = useState(props.userData.id)

    const navigation = useNavigation();

    const editUser = async () => {
        const getCircularReplacer = () => {
            const seen = new WeakSet();
            return (key, value) => {
                if (typeof value === "object" && value !== null) {
                    if (seen.has(value)) {
                        return;
                    }
                    seen.add(value);
                }
                return value;
            };
        };
        const data = {
            name: name,
            email: email,
            phone: phone,
            id: id
        };
        const url = "https://markow.pl/API/public/api/user/edit";
        await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization:
                    "Bearer " + token,
            },
            body: JSON.stringify(data, getCircularReplacer())
        })
            .then((res) => res.json())
            .then((res) => console.log(res));
    }

    const logOut = async () => {
        try {
            await AsyncStorage.removeItem("access_token");
            //navigation.navigate('Home')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>Welcome</Text>
                </View>

                <View style={styles.inputBox}>
                    <Text>Email:</Text>
                    <TextInput
                        value={email}
                        onChange={setEmail}
                        style={styles.input}
                    />
                </View>
                <View style={styles.titleBox}>
                    <Text>Name:</Text>
                    <TextInput
                        value={name}
                        onChange={setName}
                        style={styles.input}
                    />
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={editUser}>
                    <Text style={styles.buttonText}>Save changes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Change password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={logOut}>
                    <Text style={styles.buttonLogOutText}>Log out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        flexDirection: "column"
    },
    formContainer: {
        flex: 1,
        flexDirection: "column",
        padding: 15,
    },
    buttonsContainer: {
        flex: 2,
        flexDirection: "column",
        padding: 15,
        justifyContent: "flex-end"
    },
    titleBox: {
        flex: 1,
        justifyContent: "center",
    },
    inputBox: {
        flex: 1,
    },
    input: {
        width: "100%",
        padding: 5,
        backgroundColor: "#f8f8f8",
        height: 40,
        marginTop: 5,
        borderRadius: 9,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 1,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
    },
    title: {
        fontSize: 32,
    },
    button: {
        margin: 5,
        width: "100%",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 9,
        backgroundColor: "#fff",
        borderRadius: 9,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 1,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
    },
    buttonText: {
        color: "#0B132B",
        fontSize: 20,
        fontWeight: "bold",
    },
    buttonLogOutText: {
        color: "#D7263D",
        fontSize: 20,
        fontWeight: "bold",
    }
})

export default Account;