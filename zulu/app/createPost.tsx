import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Dimensions, SafeAreaView, Alert, } from 'react-native';


import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router';

import Spinner from 'react-native-loading-spinner-overlay';





const CreatePostScreen = () => {

 

  const [postText, setPostText] = useState('');// Shared state for both inputs
  const [loading, setLoading] = useState(false);

  const router = useRouter()// State to toggle full-screen mode

  const handleSaveSharePost = async () => {
    
  };
  

  
  
  

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: '#fff', gap: 10, }}>

      <Spinner visible={loading} />
      {/* Close Button */}
      <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-end', marginBottom: 16 }}>
        <Ionicons name="close-outline" size={35} color="black" />
      </TouchableOpacity>

      <View style={{ backgroundColor: '#fff', padding: 10, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 }}>
        {/* User Info and Follow Button */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 5 }}>
          <Image source={{ uri: user?.profilePic }} style={{ width: 50, height: 50, borderRadius: 100 }} />
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>''</Text>
              <Ionicons
                name="checkmark-circle"
                size={16}
                color="#a110ef"
                style={{ marginLeft: 4 }}
              />
            </View>
            <Text style={{ fontWeight: 'medium' }}>Los-Angeles</Text>
          </View>
        </View>

        <TextInput
          style={{ fontSize: 15, color: '#444', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, height: 100, textAlignVertical: 'top' }}
          multiline
          placeholder="Write your post here..."
          value={postText}
          onChangeText={(e) => setPostText(e)}
        />

        {/* Multiline TextInput (textarea equivalent) */}

      </View>


      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={{ backgroundColor: '#a110ef', padding: 12, borderRadius: 20, alignItems: 'center', width: '50%' }} onPress={handleSaveSharePost}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Post</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreatePostScreen;