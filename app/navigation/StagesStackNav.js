import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StagesScreen from "../screens/StagesScreen";
import StageDetailScreen from "../screens/StageDetailScreen";
import { useAuth } from '../context/AuthProvider';
import HeaderSubTitle from '../components/headerTitle';

const Stack = createNativeStackNavigator();
// Stack pour la navigation Accueil → Profil
export default function StagesStack() {
    const { user } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#3b5bdb' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitle: () => <HeaderSubTitle routeName="Stages" user={user} />,

      }}
    >
      <Stack.Screen name="Stages" component={StagesScreen} />
      <Stack.Screen name="StageDetail" component={StageDetailScreen} options={({ route }) => ({
        headerTitle: () => <HeaderSubTitle routeName={route.params?.stage?.organisation?.nom ?? 'Détail du stage'} user={user} />,
      })} />
    </Stack.Navigator>
  );
}