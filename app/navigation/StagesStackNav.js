import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StagesScreen from "../screens/StagesScreen";
import StageDetailScreen from "../screens/StageDetailScreen";

const Stack = createNativeStackNavigator();
// Stack pour la navigation Accueil → Profil
export default function StagesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#3b5bdb' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Stages" component={StagesScreen} />
      <Stack.Screen name="StageDetail" component={StageDetailScreen} options={({ route }) => ({
        title: route.params?.stage?.organisation?.nom ?? 'Détail du stage',
      })} />
    </Stack.Navigator>
  );
}