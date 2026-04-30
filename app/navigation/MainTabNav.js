import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text } from 'react-native';

import OrganisationsStackNav from './OrganisationsStackNav';

import ContactsScreen from '../screens/ContactsScreen';
import StagesStackNav from './StagesStackNav';
import StagesScreen from '../screens/StagesScreen';
import ConnexionScreen from '../screens/ConnexionScreen';

import { useAuth } from '../context/AuthProvider';
import HeaderSubTitle from '../components/headerTitle';


const Tab = createBottomTabNavigator();

export default function MainTabNav() {
  const { logout, user } = useAuth();

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
          headerTitle: () => <HeaderSubTitle routeName="Contacts" user={user} />,
        }}
      />
      <Tab.Screen
        name="StagesTab"
        component={StagesStackNav}
        options={{
          tabBarLabel: 'Stages',
          headerShown: true,
          headerStyle: { backgroundColor: '#3b5bdb' },
          headerTintColor: '#fff',
          headerTitle: () => <HeaderSubTitle routeName="Stages" user={user} />,
        }}
      />
      <Tab.Screen
        name="LogoutTab"
        component={ConnexionScreen}
        options={{
          tabBarLabel: 'Logout',
          headerShown: false,
          tabBarButton: () => ( // Permet d'intercepter le clique sur le boutton
            <TouchableOpacity // On remplace par une zone cliquable
              onPress={logout} // effectuer la déconnection (cf AuthProvider.js)
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} // Style
            >
              <Text style={{ color: '#e03131', fontSize: 12 }}>Logout</Text> 
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  )
};