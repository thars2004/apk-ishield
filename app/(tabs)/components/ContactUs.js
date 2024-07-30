import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const ContactUs = () => {
  const handlePhoneCall = () => {
    Linking.openURL('tel:+1234567890'); // Replace with your phone number
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@example.com'); // Replace with your email address
  };

  const handleInstagram = () => {
    Linking.openURL('https://www.instagram.com/example'); // Replace with your Instagram URL
  };

  const handleFacebook = () => {
    Linking.openURL('https://www.facebook.com/example'); // Replace with your Facebook URL
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/1234567890'); // Replace with your WhatsApp number
  };

  const handleTelegram = () => {
    Linking.openURL('https://t.me/example'); // Replace with your Telegram URL
  };

  const handleTwitter = () => {
    Linking.openURL('https://twitter.com/example'); // Replace with your Twitter URL
  };

  const handleLinkedIn = () => {
    Linking.openURL('https://www.linkedin.com/in/example'); // Replace with your LinkedIn URL
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Contact Us</Text>

      {/* Horizontal container for "Call Us" and "Email Us" */}
      <View style={styles.horizontalContainer}>
        <TouchableOpacity style={styles.horizontalOption} onPress={handlePhoneCall}>
          <FontAwesome5 name="phone" size={24} color="#333" />
          <Text style={styles.optionText}>Call Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.horizontalOption} onPress={handleEmail}>
          <FontAwesome5 name="envelope" size={24} color="#333" />
          <Text style={styles.optionText}>Email Us</Text>
        </TouchableOpacity>
      </View>

      {/* Social media options */}
      <View style={styles.socialMediaContainer}>
        <TouchableOpacity style={styles.socialMediaOption} onPress={handleInstagram}>
          <FontAwesome5 name="instagram" size={24} color="#E1306C" />
          <Text style={styles.optionText}>Instagram</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialMediaOption} onPress={handleFacebook}>
          <FontAwesome5 name="facebook" size={24} color="#3b5998" />
          <Text style={styles.optionText}>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialMediaOption} onPress={handleWhatsApp}>
          <FontAwesome5 name="whatsapp" size={24} color="#25D366" />
          <Text style={styles.optionText}>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialMediaOption} onPress={handleTelegram}>
          <FontAwesome5 name="telegram" size={24} color="#0088cc" />
          <Text style={styles.optionText}>Telegram</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialMediaOption} onPress={handleTwitter}>
          <FontAwesome5 name="twitter" size={24} color="#1DA1F2" />
          <Text style={styles.optionText}>Twitter</Text>
        </TouchableOpacity>

       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#D5D9EF',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  horizontalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  socialMediaContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 20,
  },
  socialMediaOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 15,
    color: '#333',
  },
});

export default ContactUs;
