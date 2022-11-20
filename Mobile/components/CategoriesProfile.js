import React, { useState } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
const CategoriesProfile = (props) => {
  let a;

  let arr = props.name.toLowerCase();

  if (arr == "drinkables") {
    a = require(`../assets/icons/drinkables.png`);
  } else if (arr == "bread") {
    a = require(`../assets/icons/bread.png`);
  } else if (arr == "dairy") {
    a = require(`../assets/icons/dairy.png`);
  } else if (arr == "grains") {
    a = require(`../assets/icons/grains.png`);
  } else if (arr == "meat") {
    a = require(`../assets/icons/meat.png`);
  } else if (arr == "oils") {
    a = require(`../assets/icons/oils.png`);
  } else if (arr == "fruits") {
    a = require(`../assets/icons/fruits.png`);
  } else if (arr == "sweets") {
    a = require(`../assets/icons/sweets.png`);
  } else if (arr == "drinkables") {
    a = require(`../assets/icons/drinkables.png`);
  } else if (arr == "others") {
    a = require(`../assets/icons/otherCat.png`)
  } else if (arr == "many") {
    a = require(`../assets/icons/manyCat.png`)
  }
  const [pressed, setPressed] = useState(false);

  return (
    <View
      style={[
        { borderColor: pressed ? "black" : "transparent" },
        styles.containter,
      ]}
    >
      <View style={{ padding: 10 }}>
        <TouchableOpacity
          onPress={() => {
            setPressed(true)
            if(props.cat == arr){
              return true
            }
            if(props.cat !== arr){
              setPressed(false)
              props.onClick(arr);
            }
            // setPressed(true)
            // toggleCount
            // console.log(props.count)
            // props.onClick()
            // if (arr !== props.cat && props.cat !== "all") {
            //   console.log("arr = " + arr)
            //   console.log("props = " + props.cat)
            //   // props.toggleCount(-1)
            //   // console.log("chuj")
            //   setPressed(false)
            // }else{
            //   props.toggleCount(!pressed ? 1 : -1)
            //   setPressed(true)
            // }
            // props.onClick(arr);
            // console.log(pressed)

          }}
        >
          <Image source={a} style={styles.image} />
          <Text style={styles.text}>{props.name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 64,
    height: 64,
  },
  text: {
    textAlign: "center",
  },
  containter: {
    margin: 5,
    borderWidth: 1,
  },
});
export default CategoriesProfile;
