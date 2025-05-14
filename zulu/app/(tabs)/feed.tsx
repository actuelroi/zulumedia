import React, { useEffect, useState } from 'react';
import { View, Dimensions, Image, Text, SafeAreaView } from 'react-native';

 import {SwiperFlatList } from 'react-native-swiper-flatlist'
import ShareVideos from '@/components/shareVideos';
import { videoData } from '../libs/Database';
import Header from '@/components/Header';
//import { useAuth } from '../providers/AuthProvider';


const Feed = () => {
    const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
    const [currentIndex, setCurrentIndex] = useState(0);

    //const{userVideoPost} =useAuth()

    const handleChangeIndexValue = ({ index }: any) => {
        setCurrentIndex(index);
    };


   
   
     //const combinedPosts = [...userVideoPost, ...videoData];




    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <Header video />
            <View style={{ width: windowWidth, height: windowHeight, backgroundColor: 'black' }}>

                <SwiperFlatList
                    vertical={true}
                    onChangeIndex={handleChangeIndexValue}
                    data={videoData}
                    renderItem={({ item, index }) => (
                        <ShareVideos item={item} index={index} currentIndex={currentIndex} />
                    )}
                    keyExtractor={(item, index) => String(index)}
                />
            </View>
        </SafeAreaView>
    );
};

export default Feed;