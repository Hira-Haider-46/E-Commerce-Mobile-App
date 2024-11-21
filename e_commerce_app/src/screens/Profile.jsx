import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../store/slices/userSlice';
import profile from '../../assets/shopping.PNG';
import commonStyles from '../../style.js';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const { name, email, isLoggedIn } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(clearUser());
    navigation.replace('GetStarted');
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  if (!isLoggedIn) {
    navigation.replace('GetStarted');
    return null;
  }

  return (
    <View style={commonStyles.container}>
      <Image source={profile} style={styles.profileImage} />
      <Text style={styles.username}>{name}</Text>
      <Text style={styles.email}>{email}</Text>

      <TouchableOpacity style={commonStyles.button} onPress={handleEditProfile}>
        <Text style={commonStyles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[commonStyles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={commonStyles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#AAAAAA',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#d9534f',
    marginTop: 10,
  },
});