import StackNavigation from "../../components/shared/StackNavigation";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

const screens = [
    {
        name: 'Login',
        component: LoginScreen,
        options: {
            title: "Zaloguj Się"
        }
    },
    {
        name: 'Register',
        component: RegisterScreen,
        options: {
            title: 'Załóż Nowe Konto'
        }
    }
]
export default function UnauthorizedScreen(){
    return <StackNavigation screens={screens}/>
}