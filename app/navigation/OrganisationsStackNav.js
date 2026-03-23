import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrganisationsScreen from "../screens/OrganisationsScreen";
import OrganisationDetailScreen from "../screens/OrganisationDetailScreen";

const Stack = createNativeStackNavigator();
// Stack pour la navigation Accueil → Profil
export default function OrganisationsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#3b5bdb' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Organisations" component={OrganisationsScreen} />
      <Stack.Screen name="OrganisationDetail" component={OrganisationDetailScreen} />
    </Stack.Navigator>
  );
}