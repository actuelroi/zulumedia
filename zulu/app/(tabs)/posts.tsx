import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { postInfo } from '../libs/Database';
import SharePost from '@/components/sharePost';
import Header from '@/components/Header';


const PostList = () => {
  
  

  

 
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <Header video picture />
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <FlatList
          data={postInfo }
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => (
            <SharePost
              postTitle={ item.postTitle }
              postPersonImage={ item.postPersonImage }
              postImage={  item.postImage }
              likes={item.likes || 0}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => (
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
              <Ionicons name="reload-circle-sharp" style={{ fontSize: 60, opacity: 0.2 }} />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default PostList;
