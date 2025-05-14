import React, { useEffect, useState } from 'react';
import {  SafeAreaView, FlatList, StyleSheet, View, StatusBar, Text, Image, TouchableOpacity } from 'react-native';

import { users } from '../libs/Database'
import { Ionicons} from '@expo/vector-icons';

import ShareText from '@/components/shareText';
import Header from '@/components/Header';




export default function PostScreen() {

  

  

 

  

  

  

  return (
      <SafeAreaView style={styles.container}>
        <Header/>
        <FlatList
          data={users}
          renderItem={({ item, index }) => (
            <ShareText
            key={index}
            name={ item.name} 
            image_url={ item.profileImage}
            content={ item.description}
            location={item.location || 'Paris'}
            verified={item.Verified || false}

            />


          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.contentContainer}

          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}

          ListFooterComponent={ // Icône de rechargement à la fin de la liste
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
              <Ionicons name="reload-circle-sharp" style={{ fontSize:         60, opacity: 0.2 }} />
            </View>
          }
        />


      </SafeAreaView>

   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure SafeAreaView takes up full screen height
  },
  contentContainer: {
    flexGrow: 1, // Allow content to grow and enable scrolling
  },
});