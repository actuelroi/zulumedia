import { AntDesign, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';


const Header = ({ back , picture, video}: any) => {
    const router = useRouter();
    return (
        <SafeAreaView>

            <View
                style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                    alignItems: 'center',
                    backgroundColor: 'white'
                }}>
                {back ? (
                    <TouchableOpacity onPress={() => { router.back() }}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => { router.push('search') }}>
                        <Ionicons name="search-circle-sharp" size={24} color="black" />
                    </TouchableOpacity>
                )}


                {/* Create Post Button */}

                {video ? (
                    picture ? (
                        <TouchableOpacity onPress={() => router.push('createImagePost')}>
                            <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                                <Text style={{ color: 'gray', fontSize: 12, fontWeight: '300' }}>create</Text>
                                <AntDesign name="pluscircleo" size={12} color="gray" />
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => router.push('camera')}>
                            <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                                <Text style={{ color: 'gray', fontSize: 12, fontWeight: '300' }}>create</Text>
                                <AntDesign name="pluscircleo" size={12} color="gray" />
                            </View>
                        </TouchableOpacity>
                    )
                ) : (
                    <TouchableOpacity onPress={() => router.push('createPost')}>
                        <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                            <Text style={{ color: 'gray', fontSize: 12, fontWeight: '300' }}>create</Text>
                            <AntDesign name="pluscircleo" size={12} color="gray" />
                        </View>
                    </TouchableOpacity>
                )}
                


                <Image source={require('./../assets/images/sulu.png')} style={{ height: 35, width: 40 }} contentFit='scale-down' />
            </View>
        </SafeAreaView>
    );
};

export default Header;