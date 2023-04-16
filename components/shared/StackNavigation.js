import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalColors } from "../../constants/colors";

const Stack = createNativeStackNavigator();

export default function StackNavigation({screens}){  
    return(
        <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor: GlobalColors.primaryDark},
            headerTintColor: GlobalColors.greyLight,
            headerTitleAlign: 'center',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right'
        }}>
            {screens.map(screen => <Stack.Screen key={screen.name} {...screen}/>)}
        </Stack.Navigator>
    )
}