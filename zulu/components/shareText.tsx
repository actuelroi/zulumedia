import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, ScrollView, TextInput } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';



interface Comment {
  id: string;
  text: string;
  author: string;
  image?: string
}


interface PostProps {
  name: string;
  image_url: string;
  content: string;
  location: string;
  verified?: boolean;
  initialComments?: Comment[];
}


const ShareText: React.FC<PostProps> = ({ name, image_url, content, location, verified, initialComments = [] }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [following, setFollowing] = useState<boolean>(false);


  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(initialComments)

  
  return (
    <View style={{ marginBottom: 15 }}>
      <View style={styles.postContainer}>
        {/* User Info and Follow Button */}
        <View style={styles.header}>
          <Image source={typeof image_url === 'string' ? { uri: image_url } : image_url} style={styles.avatar} />
          <View style={styles.userInfo}>
            <View style={styles.nameContainer}>
              <Text style={styles.username}>{name}</Text>
              {verified && (
                <Ionicons
                  name="checkmark-circle"
                  size={16}
                  color="#a110ef"
                  style={styles.verificationBadge}
                />
              )}
            </View>
            <Text style={styles.locat}>📍{location}</Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity
              style={[styles.followButton, following && styles.following]}
              onPress={() => setFollowing(!following)}
            >
              <Text style={[styles.followText, following && styles.followingText]}>
                {following ? 'Following' : 'Follow'}
              </Text>
              
            </TouchableOpacity>
             <Feather name="more-vertical" style={{ color: 'black', fontSize: 25 }} />
          </View>
        </View>

        {/* Post Content */}
        <Text style={styles.content}>{content}</Text>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="message-circle" size={20} color="gray" />
            <Text style={styles.actionText} onPress={() => setShowComments(true)}>Comment</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setLiked(!liked)}
          >
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={20}
              color={liked ? 'red' : 'gray'}
            />
            <Text style={[styles.actionText, liked && { color: '#000' }]}>
              {liked ? 'Liked' : 'Like'}
            </Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => setSaved(!saved)} style={styles.actionButton}>
            <Ionicons
              name={saved ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color={saved ? 'red' : 'gray'}
            />
            <Text style={[styles.actionText, saved && { color: 'red' }]}>
              {saved ? 'Saved' : 'Save'}
            </Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="share-outline" size={20} color="gray" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>




        {/* Comments Modal */}
        <Modal
          visible={showComments}
          animationType="slide"
          onRequestClose={() => setShowComments(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Comments</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowComments(false)}
              >
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.commentsContainer}>
              {comments.map(comment => (
                <View key={comment.id} style={styles.comment}>
                  <View style={{flexDirection: 'column', gap: 4}}>
                  <Image source={{uri: comment.image}} style={styles.avatar}/>
                  <Text style={styles.commentAuthor}>{comment.author}</Text>
                  </View>
                  
                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Write a comment..."
                value={newComment}
                onChangeText={setNewComment}
                onSubmitEditing={()=>{}}
              />
              <TouchableOpacity
                style={styles.commentButton}
                onPress={()=>{}}
              >
                <Feather name="send" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>


      </View>
      {/* <View style={styles.InputContainer}>
        <Image source={img} style={styles.commentUserImage} />
        <TextInput placeholder="Add a comment" style={styles.Input} />
      </View>*/}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 10,
  },

   locat:{
      fontWeight:'medium'
   },

  userInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  verificationBadge: {
    marginLeft: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },



  followButton: {
    backgroundColor: '#a110ef',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  followText: {
    color: '#fff',
    fontSize: 14,
  },
  following: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#a110ef',
  },
  followingText: {
    color: '#a110ef',
  },
  content: {
    fontSize: 15,
    color: '#444',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 5,
    color: 'gray',
    fontSize: 14,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  commentsContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  comment: {
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  commentAuthor: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commentText: {
    color: '#333',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  commentButton: {
    backgroundColor: '#a110ef',
    borderRadius: 25,
    padding: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },


  InputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,

    paddingTop: 2,
    paddingBottom: 17

  },
  commentUserImage: {
    width: 25,
    height: 25,
    borderRadius: 100,
    marginRight: 10,
  },
  Input: {
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

export default ShareText;
