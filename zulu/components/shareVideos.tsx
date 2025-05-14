import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, SafeAreaView } from 'react-native';

import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';

import { useVideoPlayer, VideoView } from 'expo-video';



interface ReelItem {
  video: any;
  videoUrl:any,
  postProfile: any;
  title: string;
  description: string;
  isLike: boolean;
  likes: number;
  User: any
}

interface SingleReelProps {
  item: ReelItem;
  index: number;
  currentIndex: number;
}

const ShareVideos: React.FC<SingleReelProps> = (({ item, index, currentIndex }) => {
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
  const videoRef = useRef<VideoView>(null);
  const [mute, setMute] = useState(false);
  const [like, setLike] = useState(item.isLike);
  const [follow, setFollow] = useState(false);

  const toggleMute = useCallback(() => setMute((prev) => !prev), []);
  const toggleLike = useCallback(() => setLike((prev) => !prev), []);
  const toggleFollow = useCallback(() => setFollow((prev) => !prev), []);

//   const onPlaybackStatusUpdate = useCallback((status:any) => {
//     if (status.isLoaded && status.didJustFinish) {
//       videoRef.current?.render;
//     }
//   }, []);


//   useEffect(() => {
//     if (currentIndex) {
//         videoRef.current?.play()
//     } else {
//         videoRef.current?.
//     }
// }, [currentIndex])


  const player = useVideoPlayer(item.videoUrl || item.video, player => {
    player.loop = true;
  });


  useEffect(() => {
    if (currentIndex === index) {
        player.play()
    } else {
       player.pause()
    }
}, [currentIndex])

  return (
    <SafeAreaView style={{ width: windowWidth, height: windowHeight, position: 'relative' }}>
      <TouchableOpacity activeOpacity={0.9} onPress={toggleMute} style={{ flex: 1 }}>
        <VideoView
          ref={videoRef}
          player={player}
          allowsFullscreen ={false}
          style={{ flex: 1 }}
          contentFit='cover'
          
        />
      </TouchableOpacity>
      <Ionicons
        name="volume-mute"
        style={{
          fontSize: mute ? 20 : 1,
          color: 'white',
          position: 'absolute',
          backgroundColor: 'rgba(52,52,52,0.6)',
          borderRadius: 100,
          padding: mute ? 20 : 0,
        }}
      />
      <View style={{ position: 'absolute', width: windowWidth, zIndex: 1, bottom: 30, padding: 10 }}>
        <View>
          <TouchableOpacity style={{ width: 150 }}>
            <View style={{ width: 100, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 32, height: 32, borderRadius: 100, backgroundColor: 'white', margin: 10 }}>
                <Image source={ item.User?.profilePic? {uri:item.User?.profilePic} : item.postProfile} style={{ width: '100%', height: '100%', borderRadius: 100 }} />
              </View>
              <Text style={{ color: 'white', fontSize: 16 }}>{item.User?.username || item.title }</Text>
              <TouchableOpacity onPress={toggleFollow} style={{ width: follow ? 60 : 56 }}>
                <View
                  style={{
                    width: '100%',
                    height: 25,
                    borderRadius: 5,
                    backgroundColor: follow ? undefined : '#a110ef',
                    borderWidth: follow ? 1 : 0,
                    borderColor: follow ? '#DEDEDE' : undefined,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 5,
                  }}
                >
                  <Text style={{ color: follow ? 'black' : 'white', fontWeight: '500', fontSize: 10 }}>
                    {follow ? 'Following' : 'Follow'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 14, marginHorizontal: 10 }}>{item.description || ''}</Text>
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <Ionicons name="musical-note" style={{ color: 'white', fontSize: 16 }} />
            <Text style={{ color: 'white' }}>Original Audio</Text>
          </View>
        </View>
      </View>
      <View style={{ position: 'absolute', bottom: 30, right: 0 }}>
        <TouchableOpacity onPress={toggleLike} style={{ padding: 10 }}>
          <AntDesign name={like ? 'heart' : 'hearto'} style={{ color: like ? 'red' : 'white', fontSize: 25 }} />
          <Text style={{ color: 'white' }}>{item.likes || ''}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <Ionicons name="chatbubble-outline" style={{ color: 'white', fontSize: 25 }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <Ionicons name="paper-plane-outline" style={{ color: 'white', fontSize: 25 }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <Feather name="more-vertical" style={{ color: 'white', fontSize: 25 }} />
        </TouchableOpacity>
        <View style={{ width: 30, height: 30, borderRadius: 10, borderWidth: 2, borderColor: 'white', margin: 10 }}>

          <Image source={ item.User?.profilePic? {uri:item.User?.profilePic} : item.postProfile} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
        </View>
      </View>
    </SafeAreaView>
  );
});

export default ShareVideos;