//REACT
import React, { useState, useEffect } from "react";

import {
  ScrollView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Avatar } from "react-native-elements";
import { Divider, IconButton } from "react-native-paper"
import { useTheme } from "@react-navigation/native";

import * as MailComposer from 'expo-mail-composer';

//SCREENS
import Header from "../header/Header";

//STYLE
import styles from "./singleUserStyle";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import Configuration from "../configuration/Configuration";
import TabBar from "../../routes/Tab/TabBar";
const { width } = Dimensions.get("window");


const SingleUser = ({ navigation }) => {
  const dispatch = useDispatch();
  const singleUser= useSelector(state=> state.singleUser.user)
  const loginUser= useSelector(state=> state.loggedUser.user)
  //console.log("NAVIGATION", navigation)
  const { colors } = useTheme();

  const handleShare = ()=>{
    MailComposer.composeAsync({subject: `Mentor Me: perfil de ${singleUser.firstName} ${singleUser.lastName}`, isHtml: true, body: `<h1>${singleUser.firstName} ${singleUser.lastName}</h1><h2>${singleUser.description}</h2><h2>${singleUser.role.join(" ")}</h2><h3>Areas</h3><p>${singleUser.areas.map(a=>a.areaName).join(", ")}</p><h3>Tecnologías</h3><p>${singleUser.technologies.map(t=>t.technologyName).join(", ")}</p>`})
  }
 

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header navigation={navigation} />
        <View style={styles.shareContainer}>
            <IconButton
              icon="share-variant"
              color="white"
              size={20}
              onPress={handleShare}
            />
        </View>

        <View style={[styles.body, { backgroundColor: colors.background }]}>
          <View style={{ top: -70, left: width / 3 }}>
            {singleUser.img ? (
              <Avatar
                size="xlarge"
                
                source={{
                  uri: singleUser.img,
                }}
                avatarStyle={{ zIndex: 1, width: "100%", height: "100%" }}
                rounded
                title={singleUser.firstName + singleUser.lastName}
                titleStyle={{
                  color: "white",
                  backgroundColor: "gray",
                  flex: 1,
                  width: "100%",
                  paddingTop: "15%",
                }}
                activeOpacity={0.7}
              />
            ) : (
              <Avatar
                size="xlarge"
             
                rounded
                title={
                    singleUser._id &&
                  `${singleUser.firstName[0]}${singleUser.lastName[0]}`
                }
                titleStyle={{
                  color: "white",
                  backgroundColor: "gray",
                  flex: 1,
                  width: "100%",
                  paddingTop: "15%",
                  zIndex: 1,
                }}
                // onPress={() => console.log("Works!")}
                activeOpacity={0.7}
              />
            )}
          </View>

          <View
            style={{ marginHorizontal: 20, alignItems: "center", bottom: 60 }}
          >
            <Text
              style={{ fontWeight: "bold", color: colors.text }}
            >{`${singleUser.firstName} ${singleUser.lastName}`}</Text>
            <Text style={{ marginTop: 8, color: colors.text }}>
              {singleUser.email}
            </Text>
            <Text
              style={{
                marginTop: 20,
                alignContent: "center",
                color: colors.text,
              }}
              >
              {singleUser.description}
             
            </Text>

 
           
            
            <Text> Location: {singleUser.location && singleUser.location.locationName}</Text>
             
          
            </View>
          

          <Configuration showLogged={false}/>
        </View>
      </View>
      <TabBar navigation={navigation}/>
    </ScrollView>
  );
};

export default SingleUser;
