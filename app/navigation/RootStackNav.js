import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from '../AuthProvider';
import ConnexionScreen from '../screens/ConnexionScreen';
import MainTabNav from './MainTabNav';

const Stack = createNativeStackNavigator();

export default function RootStackNav() {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user === null ? (
        <Stack.Screen name="Login" component={ConnexionScreen} options={{ title: 'Se connecter' }}/>
      ) : (
        <Stack.Screen name="Main" component={MainTabNav} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}