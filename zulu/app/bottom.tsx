import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import Ionicons from '@expo/vector-icons/Ionicons';

import {  MaterialCommunityIcons } from '@expo/vector-icons';

import { useVideoPlayer, VideoView } from 'expo-video';

const BottomTabView = () => {

  

  



  const Tab = createMaterialTopTabNavigator();

  let squares = [];
  let numberOfSquare = 7;

  for (let index = 0; index < numberOfSquare; index++) {
    squares.push(
      <View key={index}>
        <View
          style={styles.container}></View>
      </View>,
    );
  }

  const Posts = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', height: '100%' }}
      >
        <View style={styles.container}>
         
            <Text>You haven't post yet ! </Text>
        
        </View>
      </ScrollView>
    );
  };





  const Video = () => {
    
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', height: '100%' }}
      >
        <View style={styles.container}>
         
            <Text>You haven't post yet !</Text>
          
        </View>
      </ScrollView>
    );
  };
  






  const Tags = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', height: '100%' }}
      >
        <View style={styles.container}>
          
            <Text>You haven't post yet ! </Text>
        
        </View>
      </ScrollView>
    );
  };



  const Chats = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View
          style={styles.container}>
          {squares}
        </View>
      </ScrollView>
    );
  };



  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: 'black',
          height: 1.5,
        },
        tabBarIcon: ({ focused, color }) => {


          if (route.name === 'Tags') {
            return <MaterialCommunityIcons name="image-filter-center-focus-strong" size={22} color={focused ? 'black' : 'gray'} />
          }
          let iconName: 'apps-sharp' | 'caret-forward-circle' | 'caret-forward-circle-outline' | 'navigate-circle' | 'navigate-circle' | 'people' | 'people-outline' = "apps-sharp";

          if (route.name === 'Video') {
            iconName = focused ? 'caret-forward-circle' : 'caret-forward-circle-outline';

          } else if (route.name === 'Posts') {
            iconName = focused ? 'navigate-circle' : 'navigate-circle';

          }

          else if (route.name === 'Chats') {
            iconName = focused ? 'people' : 'people-outline';

          }
          color = focused ? 'black' : 'gray';

          return <Ionicons name={iconName} color={color} size={22} />;

        },
      })}>

      <Tab.Screen name="Video" component={Video} />
      <Tab.Screen name="Posts" component={Posts} />

      <Tab.Screen name="Tags" component={Tags} />
      <Tab.Screen name="Chats" component={Chats} />
    </Tab.Navigator>
  );
};

export default BottomTabView;



const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  square: {
    width: 130,
    height: 150,
    marginVertical: 0.5,
    backgroundColor: 'black',
    opacity: 0.1,
  },

})