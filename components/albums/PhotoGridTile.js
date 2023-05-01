import { Text, Pressable, View, StyleSheet, Image } from "react-native";
import { GlobalColors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

export default function PhotoGridTile({id, title, thumbnailUrl}){
    const navigation = useNavigation();

    return (
        <View style={styles.gridItem}>
        <Pressable
            android_ripple={{ color: '#ccc' }}
            style={styles.button}
            onPress={() => navigation.navigate('PhotoDetails', {id: id})}
        >
            <View style={styles.innerContainer}>
                <Image source={{uri: thumbnailUrl}} style={styles.image}/>
                <Text style={styles.title}>{title}</Text>
            </View>
        </Pressable>
    </View>
    )

}

const styles = StyleSheet.create({
    gridItem: {
        width: '42%',
        margin: 16,
        borderRadius: 8,
        elevation: 4,
        overflow: 'hidden',
        backgroundColor: GlobalColors.lemon,
        borderWidth: 1,
        borderColor: GlobalColors.greyDark
    },
    button: {
        flex: 1
    },
    innerContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 150,
        height: 150
    },
    title: {
        marginTop: 8,
        fontSize: 10
    }
})