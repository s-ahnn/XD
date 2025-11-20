import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from '/Users/ghkdrudals/Desktop/programming/app/XDapp/XD/src/pages/SIgnin.jsx';

const stack = createNativeStackNavigator();
export default function Rootnavigator() {
  return (
    <stack.Navigator>
      <stack.Screen name="Signin" component={Signin} />
    </stack.Navigator>
  );
}
