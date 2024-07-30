import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext'; // Adjust path as needed
import TextInputField from './TextInputField';

const ProfileEditScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    name: '',
    bankId: '',
    ifsc: '',
    district: '',
    profileImage: '',
  });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || '',
        bankId: user.bank_acc_no || '',
        ifsc: user.ifsc_code || '',
        district: user.district || '',
        profileImage: user.profileImage || '',
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setUserData(prevData => ({ ...prevData, [field]: value }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUserData(prevData => ({
        ...prevData,
        profileImage: result.assets[0].uri,
      }));
      setModalVisible(false);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUserData(prevData => ({
        ...prevData,
        profileImage: result.assets[0].uri,
      }));
      setModalVisible(false);
    }
  };

  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append('profileImage', {
      uri,
      type: 'image/jpeg', // or the correct MIME type
      name: 'profileImage.jpg', // or the correct file name
    });
  
    try {
      const response = await fetch('http://localhost:3306/upload', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        return data.imageUrl;
      } else {
        console.error('Failed to upload image:', data.error);
        return null;
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
      return null;
    }
  };

  const saveProfileChanges = async () => {
    let imageUrl = userData.profileImage;

    // Upload image if needed
    if (imageUrl.startsWith('file://')) {
      imageUrl = await uploadImage(imageUrl);
    }
  
    try {
      const response = await fetch(`http://localhost:3306/profile/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          bankId: userData.bankId,
          ifsc: userData.ifsc,
          district: userData.district,
          profileImage: imageUrl,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Profile updated successfully');
        navigation.goBack();
      } else {
        console.error('Failed to update profile:', data.error);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: userData.profileImage || 'https://example.com/default-profile.jpg' }}
            style={styles.profileImage}
          />
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="camera" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <TextInputField
        style={styles.input}
        value={userData.name}
        onChangeText={(text) => handleInputChange('name', text)}
        placeholder="Name"
        placeholderTextColor="#ccc"
      />
      <TextInputField
        style={styles.input}
        value={userData.bankId}
        onChangeText={(text) => handleInputChange('bankId', text)}
        placeholder="Bank ID"
        placeholderTextColor="#ccc"
      />
      <TextInputField
        style={styles.input}
        value={userData.ifsc}
        onChangeText={(text) => handleInputChange('ifsc', text)}
        placeholder="IFSC"
        placeholderTextColor="#ccc"
      />
      <TextInputField
        style={styles.input}
        value={userData.district}
        onChangeText={(text) => handleInputChange('district', text)}
        placeholder="District"
        placeholderTextColor="#ccc"
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveProfileChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>

      {/* Modal for selecting image options */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
              <Text style={styles.modalButtonText}>Pick Image from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={takePhoto}>
              <Text style={styles.modalButtonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D5D9EF',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#007BFF',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
});

export default ProfileEditScreen;
