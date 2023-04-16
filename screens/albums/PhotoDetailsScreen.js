import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { GlobalStyles } from "../../constants/style";
import { GlobalColors } from "../../constants/colors";
import { useEffect } from "react";
import { truncate } from "../../util/stringUtil";

export default function PhotoDetailsScreen({route, navigation}){
    const id = route.params.id;
    const photo = useSelector(state => state.photos.data.find(p => p.id === id));

    if(!photo)
        navigation.goBack();
    
    useEffect(() => {
        navigation.setOptions({
            title: truncate(photo.title, 24)
        })
    }, [photo])

    return (
        <View style={GlobalStyles.defaultContainer}>
            <View style={styles.container}>
                <Image source={{uri: photo.url}} style={styles.image} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        margin: 8,
        marginTop: 32,
        padding: 8,
        borderRadius: 8,
        backgroundColor: GlobalColors.lemon,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 360,
        width: 360
    }
})