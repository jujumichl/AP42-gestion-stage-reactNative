import { NavigationContainer } from '@react-navigation/native';
import RootStackNav from './navigation/RootStackNav';
import { AuthProvider } from './context/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootStackNav />
      </NavigationContainer>
    </AuthProvider>
  );
}