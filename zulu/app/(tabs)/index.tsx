
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,

  Image
} from 'react-native';
import { FriendsProfileData } from '../libs/Database';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const Friends = () => {
  const router = useRouter();
  const [followStates, setFollowStates] = useState(
    FriendsProfileData.map((d) => d.follow)
  );
  const [suggestionCloses, setSuggestionCloses] = useState(
    FriendsProfileData.map(() => false)
  );

  const toggleFollow = (index: number) => {
    const newFollowStates = [...followStates];
    newFollowStates[index] = !newFollowStates[index];
    setFollowStates(newFollowStates);
  };

  const closeSuggestion = (index: number) => {
    const newCloses = [...suggestionCloses];
    newCloses[index] = true;
    setSuggestionCloses(newCloses);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView style={{ margin: 10 }} showsVerticalScrollIndicator={false}>
        <View style={{justifyContent: 'space-between', alignContent:'space-between', flexDirection:'row'}}>
        <Text style={{ fontWeight: 'bold' }}>This Week</Text>
        <TouchableOpacity onPress={() => { router.push('search') }} >
                        <Ionicons name="search-circle-sharp" size={24} color="black" />
                    </TouchableOpacity>
        </View>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexDirection: 'row', paddingVertical: 10 }}
        >
          {FriendsProfileData.slice(0, 6).map((data, index) => (
            <TouchableOpacity
              key={index}
              style={{ alignItems: 'center', marginRight: 15 }}
              onPress={() =>
                router.push({
                  pathname: '/friendProfile',
                  params: { ...data },
                })
              }
            >
              <Text style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 5 }}>
                {data.name}
              </Text>
              <Image
                source={data.profileImage}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={{ fontWeight: 'bold', paddingVertical: 10 }}>Don't be shy connect !</Text>

        {FriendsProfileData.slice(6, 12).map((data, index) => (
          <View key={index} style={{ paddingVertical: 15, width: '100%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: '/friendProfile',
                    params: { ...data },
                  })
                }
                style={{  marginRight: 15 }}
              >
                
                <Image
                  source={data.profileImage}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 100,
                  }}
                />
                <Text style={{  fontSize: 10, marginBottom: 5,color: '#555' }}>
                  {data.name}
                </Text>
              </TouchableOpacity>

              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{data.name}</Text>
                <Text style={{ fontSize: 13, color: '#555', marginVertical: 4 }}>
                  Passionné de sauce et de tomate, foot
                </Text>

                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <TouchableOpacity
                    onPress={() => toggleFollow(index + 6)}
                    style={{ width: 100 }}
                  >
                    <View
                      style={{
                        height: 30,
                        borderRadius: 5,
                        backgroundColor: followStates[index + 6] ? undefined : '#a110ef',
                        borderWidth: followStates[index + 6] ? 1 : 0,
                        borderColor: '#DEDEDE',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{ color: followStates[index + 6] ? 'black' : 'white' }}>
                        {followStates[index + 6] ? 'Following' : 'Follow me'}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ width: 100 }}>
                    <View
                      style={{
                        height: 30,
                        borderRadius: 5,
                        backgroundColor: '#a110ef',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{ color: 'white' }}>Let connect</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}

        <Text style={{ fontWeight: 'bold', paddingVertical: 10 }}>
          Public personality
        </Text>

        {FriendsProfileData.slice(12, 18).map((data, index) => {
          const i = index + 12;
          if (suggestionCloses[i]) return null;

          return (
            <View key={i} style={{ paddingVertical: 10, width: '100%' }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: '/friendProfile',
                      params: { ...data },
                    })
                  }
                  style={{ flexDirection: 'row', alignItems: 'center', maxWidth: '64%' }}
                >
                  <Image
                    source={data.profileImage}
                    style={{
                      width: 65,
                      height: 65,
                      borderRadius: 100,
                      marginRight: 10,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{data.name}</Text>
                    <Text style={{ fontSize: 12, opacity: 0.5 }}>{data.accountName}</Text>
                    <Text style={{ fontSize: 12, opacity: 0.5 }}>Suggested for you</Text>
                  </View>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={() => toggleFollow(i)}
                    style={{ width: followStates[i] ? 90 : 68 }}
                  >
                    <View
                      style={{
                        height: 30,
                        borderRadius: 5,
                        backgroundColor: followStates[i] ? undefined : '#a110ef',
                        borderWidth: followStates[i] ? 1 : 0,
                        borderColor: '#DEDEDE',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{ color: followStates[i] ? 'black' : 'white' }}>
                        {followStates[i] ? 'following' : 'follow'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => closeSuggestion(i)} style={{ paddingHorizontal: 10 }}>
                    <AntDesign name="close" style={{ fontSize: 14, color: 'black', opacity: 0.8 }} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}

        <View style={{ padding: 20 }}>
          <Text style={{ color: '#a110ef' }}>See  Suggestions</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Friends;
