import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OrganisationsStackNav from './OrganisationsStackNav';
import ContactsScreen from '../screens/ContactsScreen';
import StagesScreen from '../screens/StagesScreen';
import { useAuth } from '../context/AuthProvider';
import ConnexionScreen from '../screens/ConnexionScreen';
import { TouchableOpacity, Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function MainTabNav() {
  const { logout } = useAuth();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#3b5bdb',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: { paddingBottom: 4 },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="OrganisationsTab"
        component={OrganisationsStackNav}
        options={{
          tabBarLabel: 'Organisations',
        }}
      />
      <Tab.Screen
        name="ContactsTab"
        component={ContactsScreen}
        options={{
          tabBarLabel: 'Contacts',
          headerShown: true,
          headerStyle: { backgroundColor: '#3b5bdb' },
          headerTintColor: '#fff',
          headerTitle: 'Contacts',
        }}
      />
      <Tab.Screen
        name="StagesTab"
        component={StagesScreen}
        options={{
          tabBarLabel: 'Stages',
          headerShown: true,
          headerStyle: { backgroundColor: '#3b5bdb' },
          headerTintColor: '#fff',
          headerTitle: 'Stages',
        }}
      />
      <Tab.Screen
        name="LogoutTab"
        component={ConnexionScreen}
        options={{
          tabBarLabel: 'Logout',
          headerShown: false,
          tabBarButton: () => (
            <TouchableOpacity
              onPress={logout}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
              <Text style={{ color: '#e03131', fontSize: 12 }}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  )
};