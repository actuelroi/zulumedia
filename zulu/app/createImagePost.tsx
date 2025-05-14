

import Ionicons from '@expo/vector-icons/Ionicons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, Button, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { useVideoPlayer, VideoView } from 'expo-video';
import { isLoaded } from 'expo-font';
import { Entypo } from '@expo/vector-icons';
import { Image } from 'expo-image';


import Spinner from 'react-native-loading-spinner-overlay';



export default function createImagePost() {

   

    const [loading, setLoading] = useState(false);

    const [postText, setPostText] = useState('');


    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    let cameraRef = useRef<CameraView>(null);

    const router = useRouter();
    const [imageUri, setImageUri] = useState<string | null>(null);



    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }
    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }
    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.4,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            console.log('image', result.assets[0].uri)
        }
    };


    let takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };
        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setImageUri(newPhoto?.uri ?? null)
        console.log('New photo', imageUri)
    };



    const saveProfilePic = async (uri: string) => {
        const fileName = uri.split('/').pop();
        const extension = fileName?.split('.').pop() || 'jpeg';
        const formData = new FormData();

        formData.append('file', {
            uri,
            type: `image/${extension}`,
            name: `imagePost.${extension}`,
        } as any);

        
        return extension;
    };

    const handleImagePost = async () => {
        if (!imageUri) {
            Alert.alert('No Image Selected', 'Please select a profile picture before saving.');
            return;
        }

        setLoading(true);
        try {
            const extension = await saveProfilePic(imageUri);
            const imageUrl = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/image/${user?.id}/imagePost.${extension}`;


            
            
            

           

            Alert.alert('Success', 'Image posted successfully.');
            router.back();
        } catch (error: any) {
            Alert.alert('Saving Failed', error.message);
        } finally {
            setLoading(false);
        }
    };













    //   if (imageUri) {
    //     let sharePic = () => {
    //       shareAsync(photo.uri).then(() => {
    //         setImageUri(null);
    //       });
    //     };
    //   }




    


    return (
        <View style={styles.container}>

          <Spinner visible={loading} />

            {imageUri ? (
                <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: '#fff', gap: 10, }}>


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
                            style={{ fontSize: 15, color: '#444', padding: 6, height: 50, textAlignVertical: 'top' }}
                            multiline
                            placeholder="Say anything..."
                            value={postText}
                            onChangeText={(e) => setPostText(e)}
                        />

                        <Image source={{ uri: imageUri }} style={styles.image} contentFit='contain' />

                    </View>


                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ backgroundColor: '#a110ef', padding: 12, borderRadius: 20, alignItems: 'center', width: '50%' }} onPress={handleImagePost}>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            ) : (
                <CameraView mode='picture' ref={cameraRef} style={styles.camera} facing={facing}>
                    <TouchableOpacity onPress={() => { router.back() }} style={{ margin: 5 }}>
                        <Ionicons name="arrow-back" size={30} color="white" />
                    </TouchableOpacity>
                    <View style={styles.buttonContainer}>


                        <TouchableOpacity style={styles.button} onPress={pickImage}>
                            <Entypo name="images" size={40} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={takePic}>
                            <Ionicons name="aperture" size={50} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                            <Ionicons name="camera-reverse" size={40} color="white" />
                        </TouchableOpacity>
                    </View>
                </CameraView>

            )
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },

    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        margin: 40,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',

    },

    image: {
        alignSelf: 'center',
        width: 300,
        height: 300,

    },
});







