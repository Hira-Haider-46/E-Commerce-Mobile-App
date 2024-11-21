import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import ShoppingGirl from "../../assets/shopping.PNG";
import commonStyles from '../../style.js';

export default function GetStartedScreen() {
  const navigation = useNavigation(); 

  const handleGetStarted = () => {
    navigation.navigate('Login'); 
  };

  return (
    <View style={commonStyles.container}>
      <Image
        source={ShoppingGirl}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          We provide high quality products just for you
        </Text>
        <TouchableOpacity style={commonStyles.button} onPress={handleGetStarted}>
          <Text style={commonStyles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 400,
    marginBottom: 40,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});