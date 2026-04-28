import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OrganisationsStackNav from './OrganisationsStackNav';
import ContactsScreen from '../screens/ContactsScreen';
import StagesStackNav from './StagesStackNav';

const Tab = createBottomTabNavigator();

export default function MainTabNav () {
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
          component={StagesStackNav}
          options={{
            tabBarLabel: 'Stages',
            headerShown: false,
            headerStyle: { backgroundColor: '#3b5bdb' },
            headerTintColor: '#fff',
            headerTitle: 'Stages',
          }}
        />
      </Tab.Navigator>
)};