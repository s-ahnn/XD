import Home from "./src/pages/Home"
import Detail from "./src/pages/Detail"
import MyPage from "./src/pages/MyPage"
import Post from "./src/pages/Post"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Detail" component={Detail}/>
        <Stack.Screen name="MyPage" component={MyPage}/>
        <Stack.Screen name="Post" component={Post}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
