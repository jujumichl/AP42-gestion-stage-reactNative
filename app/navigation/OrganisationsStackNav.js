import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrganisationsScreen from "../screens/OrganisationsScreen";
import OrganisationDetailScreen from "../screens/OrganisationDetailScreen";
import { useAuth } from '../context/AuthProvider';

const Stack = createNativeStackNavigator();
// Stack pour la navigation Accueil → Profil
export default function OrganisationsStack() {
  const { user } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#3b5bdb' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 15 },
      }}
    >
      <Stack.Screen name={"Organisations - " + user.email} component={OrganisationsScreen} initialParams={user.email} />
      <Stack.Screen name="OrganisationDetail" component={OrganisationDetailScreen} />
    </Stack.Navigator>
  );
}