import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, Image, TextInput, Alert
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';

import Spinner from 'react-native-loading-spinner-overlay';

const EditProfile = () => {
  const { name, profileImage, accountName } = useLocalSearchParams();
  const router = useRouter();
 

  const [fileExtension, setFileExtension] = useState('jpeg');
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | undefined>(undefined);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const fileName = uri.split('/').pop();
      const extension = fileName?.split('.').pop() || 'jpeg';
      setFileExtension(extension);
      setProfilePicture(uri);
    }
  };




  const saveProfilePic = async (uri: string) => {
    const fileName = uri.split('/').pop();
    const extension = fileName?.split('.').pop() || 'jpeg';
    const formData = new FormData();

    formData.append('file', {
      uri,
      type: `image/${extension}`,
      name: `avatar.${extension}`,
    } as any);

    
  };

  const handleSaveProfilePic = async () => {
    if (!profilePicture) {
      Alert.alert('No Image Selected', 'Please select a profile picture before saving.');
      return;
    }

    setLoading(true);
    try {
      const extension = await saveProfilePic(profilePicture);
      //const imageUrl = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatar/${user?.id}/avatar.${extension}`;


      

      Alert.alert('Success', 'Profile updated successfully.');
      router.back();
    } catch (error: any) {
      Alert.alert('Saving Failed', error.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Spinner visible={loading} />

      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10,
      }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close-outline" style={{ fontSize: 35 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSaveProfilePic}>
          <Ionicons name="checkmark" style={{ fontSize: 35, color: '#a110ef' }} />
        </TouchableOpacity>
      </View>

      <View style={{ padding: 20, alignItems: 'center' }}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: profilePicture }}
              style={{ width: 80, height: 80, borderRadius: 100 }} />
          
          <Text style={{ color: '#a110ef' }}>Change profile photo</Text>
        </TouchableOpacity>
      </View>

      <View style={{ padding: 10 }}>
        <View>
          <Text style={{ opacity: 0.5 }}>Name</Text>
          <TextInput
            placeholder="name"
          
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: '#CDCDCD',
            }}
          />
        </View>

        <View style={{ paddingVertical: 10 }}>
          <Text style={{ opacity: 0.5 }}>Username</Text>
          <TextInput
            placeholder="accountname"
            
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: '#CDCDCD',
            }}
          />
        </View>

        <View style={{ paddingVertical: 10 }}>
          <TextInput
            placeholder="Website"
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: '#CDCDCD',
            }}
          />
        </View>

        <View style={{ paddingVertical: 10 }}>
          <TextInput
            placeholder="Bio"
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: '#CDCDCD',
            }}
          />
        </View>
      </View>

      <View>
        <Text style={{
          marginVertical: 10,
          padding: 10,
          color: '#a110ef',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: '#EFEFEF',
        }}>
          Switch to Professional account
        </Text>
        <Text style={{
          marginVertical: 10,
          padding: 10,
          color: '#a110ef',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: '#EFEFEF',
        }}>
          Personal information setting
        </Text>
      </View>
    </View>
  );
};

export default EditProfile;
