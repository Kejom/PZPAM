import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalColors } from "../../constants/colors";

export default function Button({children, onPress, mode, style}){
    return <View style={style}>
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
            <View style={[styles.button, mode === 'flat' && styles.flat]}>
                <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
            </View>
        </Pressable>
    </View>
}


const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalColors.primaryDark
    },
    flat: {
        backgroundColor: 'transparent'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    flatText: {
        color: GlobalColors.primary
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalColors.primaryLight,
        borderRadius: 4
    }
})