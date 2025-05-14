import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Feather, AntDesign, Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

const SharePost = ({ postTitle, postPersonImage,postImage ,likes}:any) => {
  const [following, setFollowing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [liked, setIsliked] = useState(false);

  

  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <View style={styles.postUserInfo}>

           <Image source={typeof postPersonImage === 'string' ? { uri: postPersonImage } : postPersonImage}  style={styles.postUserImage}  />

          <Text style={styles.postUserName}>{postTitle}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={[styles.followButton, following && styles.following]}
            onPress={() => setFollowing(!following)}
          >
            <Text style={[styles.followText, following && styles.followingText]}>
              {following ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
          <Feather name="more-vertical" style={{ color: 'black', fontSize: 24 }} />
        </View>
      </View>

      <View style={styles.postImageContainer}>

      <Image source={typeof postImage === 'string' ? { uri: postImage } : postImage}  style={styles.postImage} />
      
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={{ color: 'white' }}>{likes}</Text>
            <Feather name="message-circle" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} >
            <Text style={{ color: 'white' }}>23</Text>
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={18}
              color={liked ? 'red' : 'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => setSaved(!saved)}>
            <Text style={{ color: 'white' }}>9</Text>
            <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={18} color={saved ? 'red' : 'white'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={{ color: 'white' }}>800</Text>
            <MaterialCommunityIcons name="share-outline" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.postFooter}>
        <Text style={styles.postCaption}>If enjoy the video! Please like and Subscribe :)</Text>
        <View style={styles.commentInputContainer}>
          
        <Image source={typeof postPersonImage === 'string' ? { uri: postPersonImage } : postPersonImage}  style={styles.commentUserImage} />
         
          <TextInput placeholder="Add a comment" style={styles.commentInput} />
          <View style={styles.emojiContainer}>
            <Entypo name="emoji-happy" style={styles.emoji} />
            <Entypo name="emoji-neutral" style={styles.emoji1} />
            <Entypo name="emoji-sad" style={styles.emoji2} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    paddingBottom: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.1,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  postUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postUserImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  postUserName: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  followButton: {
    backgroundColor: '#a110ef',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  followText: {
    color: '#fff',
    fontSize: 12,
  },
  following: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#a110ef',
  },
  followingText: {
    color: '#a110ef',
  },
  postImageContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postImage: {
    width: '100%',
    height: 420,
  },
  actions: {
    position: 'absolute',
    right: 10,
    bottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 5,
  },
  actionButton: {
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  postFooter: {
    paddingHorizontal: 15,
  },
  postCaption: {
    fontWeight: '600',
    fontSize: 14,
    paddingVertical: 2,
  },
  commentInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentUserImage: {
    width: 25,
    height: 25,
    borderRadius: 100,
    marginRight: 10,
  },
  commentInput: {
    flex: 1,
    opacity: 0.5,
  },
  emojiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji1: {
    fontSize: 15,
    marginRight: 10,
    color: 'lightgreen',
  },
  emoji2: {
    fontSize: 15,
    marginRight: 10,
    color: 'pink',
  },
  emoji: {
    fontSize: 15,
    marginRight: 10,
  },
});

export default SharePost;