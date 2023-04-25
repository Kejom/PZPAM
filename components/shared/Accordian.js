import { Pressable, StyleSheet, Text, View, LayoutAnimation, Platform, UIManager } from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import { useState } from "react";
import { GlobalColors } from "../../constants/colors";

export default function Accordian({children, title, style}){
    const [expanded, setExpanded] = useState(false);

    if(Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental)
        UIManager.setLayoutAnimationEnabledExperimental(true);

    function toggleExpanded(){
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(state => !state);
    }
    return (
        <View style={style}>
            <Pressable onPress={toggleExpanded}>
                <View style={styles.row}>
                    <Text style={styles.title}>{title}</Text>
                    <MaterialIcons name={expanded ? 'keyboard-arrow-up': 'keyboard-arrow-down'} size={30} color="white"/>
                </View>
            </Pressable>
            {expanded && <View style={styles.childContainer}>{children}</View>}
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 56,
        paddingLeft: 25,
        paddingRight: 18,
        alignItems: 'center',
        backgroundColor: GlobalColors.primaryDark,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    childContainer: {
        backgroundColor: GlobalColors.primary,
        borderWidth: 1,
        borderColor: GlobalColors.greyDark
    }
})