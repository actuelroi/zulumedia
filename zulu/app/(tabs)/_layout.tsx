import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function TabLayout() {


  return (
    <Tabs
      screenOptions={{
        headerShown: false,

      }}>

<Tabs.Screen
        name="index"
        options={{
          tabBarLabelPosition: 'below-icon',
          title: 'Friends',
          tabBarIcon: ({ focused }) => <Ionicons name={focused ? 'heart-circle' : 'heart-circle-outline'} size={24} color={focused ? '#a110ef' : 'black'} />,
        }}
      /> 


      <Tabs.Screen
        name="send"
        options={{
          tabBarLabelPosition: 'below-icon',
          title: 'Send',
          tabBarIcon: ({ focused }) => <Ionicons name={focused ? 'navigate-circle' : 'navigate-circle-outline'} size={24} color={focused ? '#a110ef' : 'black'} />,
        }}
      />
      <Tabs.Screen
        name="posts"
        options={{
          tabBarLabelPosition: 'below-icon',
          title: 'Share',
          tabBarIcon: ({ focused }) => <MaterialCommunityIcons name="image-filter-center-focus-strong" size={24} color={focused ? '#a110ef' : 'black'} />,
        }}
      />

      

      <Tabs.Screen
        name="feed"

        options={{
          tabBarLabelPosition: 'below-icon',
          title: 'Feed',
          tabBarIcon: ({ focused }) => <Ionicons name={focused ? 'caret-forward-circle' : 'caret-forward-circle-outline'} size={24} color={focused ? '#a110ef' : 'black'} />,
        }}
      />



      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabelPosition: 'below-icon',
          title: 'Profile',
          tabBarIcon: ({ focused }) => <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={24} color={focused ? '#a110ef' : 'black'} />,
        }}
      />
    </Tabs>
  )}