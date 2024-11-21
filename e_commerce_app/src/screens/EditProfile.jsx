import { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import commonStyles from '../../style.js';

export default function EditProfile({ navigation }) {
  const user = useSelector(state => state.user);
  const { name, email } = user;

  const [newUsername, setNewUsername] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setNewUsername(name);
    setNewEmail(email);
  }, [name, email]);
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSave = () => {
    if (newUsername === '' || newEmail === '') {
      setError('Please fill in both username and email');
      return;
    }
    if (!validateEmail(newEmail)) {
      setError('Invalid email format. Example: example@gmail.com');
      return;
    }
    setError('');
    dispatch(setUser({ name: newUsername, email: newEmail }));
    navigation.goBack();
  };

  return (
    <View style={commonStyles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={newUsername}
        onChangeText={setNewUsername}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={newEmail}
        onChangeText={setNewEmail}
        keyboardType="email-address"
      />

      {error && newEmail && !validateEmail(newEmail) && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      <TouchableOpacity style={commonStyles.button} onPress={handleSave}>
        <Text style={commonStyles.buttonText}>Save</Text>
      </TouchableOpacity>

      {error && !newEmail && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#333333',
    color: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  errorText: {
    color: '#FFFFFF', 
    fontSize: 14,
    marginTop: 5,
  },
});