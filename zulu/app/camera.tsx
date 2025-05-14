

import Ionicons from '@expo/vector-icons/Ionicons';
import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { useVideoPlayer, VideoView } from 'expo-video';
import { isLoaded } from 'expo-font';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

import Spinner from 'react-native-loading-spinner-overlay';




export default function CameraPost() {

    
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [recording, setRecording] = useState(false);
    const [isRecording, setIsRecording] = useState(false)

    const cameraRef = useRef<CameraView>(null);
    const [videoUri, setVideoUri] = useState<string | null>(null)
    

    const [loading, setLoading] = useState(false);

    


    const [postText, setPostText] = useState('');


    const router = useRouter();

    const videoRef = useRef(null);
    const [status, setStatus] = useState({ isLoaded: false, isPlaying: false });

    const player = useVideoPlayer(videoUri, player => {
        player.loop = true;
        player.play();
    });

    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
            const { status: audioStatus } = await Camera.requestMicrophonePermissionsAsync();
    
            if (cameraStatus !== 'granted' || audioStatus !== 'granted') {
                Alert.alert('Permissions requises', 'Veuillez autoriser l\'accès à la caméra et au micro.');
            }
        })();
    }, []);
    


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





    const pickVideo = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.4,
        });

        if (!result.canceled) {
            setVideoUri(result.assets[0].uri);
        }
    };


    const handleRecord = async () => {
        if (!cameraRef.current) return;
    
        if (recording) {
            // Stop current recording properly
            try {
                await cameraRef.current.stopRecording();
            } catch (e) {
                console.error("Erreur lors de l'arrêt de l'enregistrement :", e);
            }
            setRecording(false);
        } else {
            try {
                setRecording(true);
                const video = await cameraRef.current.recordAsync();
                setVideoUri(video.uri);
                console.log('video', video);
            } catch (error) {
                console.error("Erreur lors de l'enregistrement de la vidéo :", error);
                setRecording(false); // Reset en cas d'erreur
            }
        }
    };
    
    





    const saveVideo = async (uri: string) => {
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








    const handleVideoPost = async () => {
        
    };


   








    return (
        <View style={styles.container}>
            <Spinner visible={loading} />
            {videoUri ? (
                <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: '#fff', gap: 10, }}>


                {/* Close Button */}
                <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-end', marginBottom: 16 }}>
                    <Ionicons name="close-outline" size={35} color="black" />
                </TouchableOpacity>

                <View style={{ backgroundColor: '#fff', padding: 10, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 }}>
                    {/* User Info and Follow Button */}
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => status.isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync()}>

                            <TouchableOpacity style={styles.button} onPress={handleVideoPost}>
                                <Ionicons name="checkmark-circle" size={70} color="black" />
                            </TouchableOpacity>


                            <VideoView
                                style={styles.video}
                                ref={videoRef}
                                player={player}

                                allowsFullscreen={false}
                                contentFit='cover'

                            // onPlaybackStatusUpdate={status => setStatus(() => status)}
                            />
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ backgroundColor: '#a110ef', padding: 12, borderRadius: 20, alignItems: 'center', width: '50%' }} onPress={handleVideoPost}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Post</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            ) : (
                <CameraView mode='video' ref={cameraRef} style={styles.camera} facing={facing}>
                    <TouchableOpacity onPress={() => { router.back() }} style={{ margin: 5 }}>
                        <Ionicons name="arrow-back" size={30} color="white" />
                    </TouchableOpacity>
                    <View style={styles.buttonContainer}>


                        <TouchableOpacity style={styles.button} onPress={pickVideo}>
                        <MaterialIcons name="video-collection" size={40} color="white" />
                        </TouchableOpacity>

                        {videoUri ? (

                            <TouchableOpacity style={styles.button} onPress={handleVideoPost}>
                                <Ionicons name="checkmark-circle" size={50} color="white" />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.button} onPress={handleRecord}>
                                {!recording ? <Ionicons name="radio-button-on" size={50} color="white" /> : (<Ionicons name="pause-circle" size={50} color="red" />)}
                            </TouchableOpacity>
                        )}

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
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',

    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    video: {
        alignSelf: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,

    },
});
