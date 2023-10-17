import { View, Text, StyleSheet, Dimensions, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import TrackPlayer ,{ Event, Track, useTrackPlayerEvents } from 'react-native-track-player'
import { playListData } from '../Constants'
import Songinfo from '../components/Songinfo'
import SongSlider from '../components/SongSlider'
import ControCenter from '../components/ControCenter'



const {width} = Dimensions.get('window')



const MusicPlayer = () => {
    const [track, setTrack] = useState<Track | null>()

    useTrackPlayerEvents([Event.PlaybackTrackChanged]  , async evetn =>{
        switch(evetn.type){
            case Event.PlaybackTrackChanged:
                const playingTrack = await TrackPlayer.getTrack(evetn.nextTrack)
                setTrack(playingTrack)
                break
            }
    })

    const renderArtWork =()=>{
        return(
            <View style={styles.listArtWrapper}>
                    <View style={styles.albumContainer}>
                        {track?.artwork && (
                            <Image
                            style={styles.albumArtImg}
                            source={{uri: track?.artwork?.toString()}}
                            />
                        )}
                    </View>
            </View>
        )
    }
  return (
    <View style={styles.container}>
        <FlatList
        horizontal
        data={playListData}
        renderItem={renderArtWork}
        keyExtractor={song => song.id.toString()}
        />

        <Songinfo track={track}/>
        <SongSlider/>
        <ControCenter/>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#001d23',
    },
    listArtWrapper: {
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
    },
    albumContainer: {
      width: 300,
      height: 300,
    },
    albumArtImg: {
      height: '100%',
      borderRadius: 4,
    },
  });

export default MusicPlayer