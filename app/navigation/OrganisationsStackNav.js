import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrganisationsScreen from "../screens/OrganisationsScreen";
import OrganisationDetailScreen from "../screens/OrganisationDetailScreen";
import HeaderSubTitle from '../components/headerTitle';
import { useAuth } from '../context/AuthProvider';


const Stack = createNativeStackNavigator();
// Stack pour la navigation Accueil → Profil
export default function OrganisationsStack() {
  const { user } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
        headerStyle: { backgroundColor: '#3b5bdb' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 15 },
        headerTitle: () => <HeaderSubTitle routeName={route.name} user={user} />,
      })}
    >
      <Stack.Screen name="Organisations" component={OrganisationsScreen} />
      <Stack.Screen name="OrganisationDetail" component={OrganisationDetailScreen} />
    </Stack.Navigator>
  );
}