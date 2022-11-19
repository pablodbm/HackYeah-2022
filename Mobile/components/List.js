import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, StyleSheet, Button } from "react-native";
import CategoriesProfile from "./CategoriesProfile";
import ListPosition from "./ListPosition";

let data;
const List = (props) => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState(props.token);

  useEffect(() => {
    // Update the document title using the browser APIhttps://markow.pl/API/public

    const getAllAnnouncements = async () => {
      const url =
        "https://markow.pl/API/public/api/announcements";
      await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
        },
      })
        .then((res) => res.json())
        .then((res) => setData(res.announcements));
    };

    console.log(data);

    getAllAnnouncements();
  }, []);

  const [chosenCat, setChosenCat] = useState([]);
  const [bread, setBread] = useState(false);
  const [dairy, setDairy] = useState(false);
  const [grains, setGrains] = useState(false);
  const [meat, setMeat] = useState(false);
  const [oils, setOils] = useState(false);
  const [fruits, setFruits] = useState(false);
  const [sweets, setSweets] = useState(false);
  const [drinkables, setDrinkables] = useState(false);

  //bread
  //dairt - mleczne
  //drinkables
  //fruits
  //grains
  //manyCat
  //meat
  //oils -> oleje oliwy orzechy
  //sweats

  function controlBread(e) {
 
    setBread(!e);
  
  }

  function controlDairy(e) {
    
    setDairy(!e);
    
  }

  function controlMeat(e) {
    setMeat(!e);
  }

  function controlGrains(e) {
    setGrains(!e);
  }

  function controlOils(e) {
    setOils(!e);
  }
  function controlDrinkables(e) {
    setDrinkables(!e);
  }

  function controlFruits(e) {
    setFruits(!e);
  }

  function controlSweets(e) {
    setSweets(!e);
  }

  useEffect(() => {
    let choseCatTemp = [];
    if (bread) {
      choseCatTemp.push("bread");
    } else if (dairy) {
      choseCatTemp.push("dairy");
    } else if (grains) {
      choseCatTemp.push("grains");
    } else if (meat) {
      choseCatTemp.push("meat");
    } else if (oils) {
      choseCatTemp.push("oils");
    } else if (fruits) {
      choseCatTemp.push("fruits");
    } else if (sweets) {
      choseCatTemp.push("sweets");
    } else if (drinkables) {
      choseCatTemp.push("drinkables");
    }

    console.log(choseCatTemp);
    setChosenCat(choseCatTemp);
  }, [bread, dairy, grains, meat, oils, fruits, sweets, drinkables]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.text}>Categories:</Text>
        <ScrollView horizontal={true}>
          <CategoriesProfile onClick={controlBread} name={"Bread"} len={chosenCat.length}/>
          <CategoriesProfile onClick={controlDairy} name={"Dairy"} />
          <CategoriesProfile onClick={controlGrains} name={"Grains"} />
          <CategoriesProfile onClick={controlMeat} name={"Meat"} />
          <CategoriesProfile onClick={controlOils} name={"Oils"} />
          <CategoriesProfile onClick={controlDrinkables} name={"Drinkables"} />
          <CategoriesProfile onClick={controlFruits} name={"Fruits"} />
          <CategoriesProfile onClick={controlSweets} name={"Sweets"} />
        </ScrollView>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>List:</Text>
        <ScrollView>
          {chosenCat.length >= 1
            ? data.map((item) =>
                chosenCat.includes(item.categories) ? (
                  <View style={styles.position} key={item.id}>
                    <ListPosition
                      item={item}
                      token={token}
                      //to do: more props
                      //to do calculate distance
                    />
                  </View>
                ) : null
              )
            : data.map((item) => (
                <View style={styles.position} key={item.id}>
                  <ListPosition item={item} token={token} />
                </View>
              ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
  },
  imageBig: {
    marginTop: 10,
    width: 35,
    height: 35,
  },
  header: {
    marginTop: 40,
    flex: 1.2,
  },
  container: {
    flex: 5,
  },
  text: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  categories: {
    margin: 10,
  },
  position: {
    padding: 10,
  },
});

export default List;
