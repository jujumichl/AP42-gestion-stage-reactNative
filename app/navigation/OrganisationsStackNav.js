import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrganisationsScreen from "../screens/OrganisationsScreen";
import OrganisationDetailScreen from "../screens/OrganisationDetailScreen";
import { useAuth } from '../context/AuthProvider';
import { View, Text } from "react-native";

const Stack = createNativeStackNavigator();
// Stack pour la navigation Accueil → Profil
export default function OrganisationsStack() {
  const { user } = useAuth();

  return (
    <Stack.Navigator
      screenOptions= {({ route }) => ({ 
        headerStyle: { backgroundColor: '#3b5bdb' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 15 },
        headerTitle: () => {{
          <View>
            <Text style="font-size: 18px; color: #FFFFFF;">{route.name}</Text>
            <Text style="font-size: 10px; color: #FFFFFF;">{user.email}</Text>
          </View>
        }}
    })}
    >
      <Stack.Screen name="Organisations" component={OrganisationsScreen} />
      <Stack.Screen name="OrganisationDetail" component={OrganisationDetailScreen} />
    </Stack.Navigator>
  );
}