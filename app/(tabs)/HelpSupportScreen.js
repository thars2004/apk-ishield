import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useFonts, Lora_400Regular, Lora_700Bold } from '@expo-google-fonts/lora';
import AppLoading from 'expo-app-loading';

const faqs = [
  {
    id: '1',
    question: 'How do I reset my password?',
    answer: 'To reset your password, go to the Account Settings screen and select "Change Password". Follow the instructions provided.'
  },
  {
    id: '2',
    question: 'How do I contact support?',
    answer: 'You can contact support by emailing us at harin@gmail.com or calling us at +1 234 567 890.'
  },
  {
    id: '3',
    question: 'Where can I find the privacy policy?',
    answer: 'The privacy policy is available on our website under the "Privacy Policy" section.'
  },
  {
    id: '4',
    question: 'How do I update my profile?',
    answer: 'To update your profile, go to the Account Settings screen and update your personal information. Save the changes once you are done.'
  },
  {
    id: '5',
    question: 'How do I delete my account?',
    answer: 'To delete your account, please contact our support team through email or phone. They will assist you with the process.'
  },
  {
    id: '6',
    question: 'How do I change my email address?',
    answer: 'To change your email address, go to the Account Settings screen and update your email information. Save the changes once you are done.'
  },
];

const HelpSupportScreen = () => {
  const [expanded, setExpanded] = useState(null);

  let [fontsLoaded] = useFonts({
    Lora_400Regular,
    Lora_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleExpand(item.id)}>
      <View style={styles.faqItem}>
        <Text style={styles.question}>{item.question}</Text>
        {expanded === item.id && <Text style={styles.answer}>{item.answer}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help & Support</Text>

      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
      <FlatList
        data={faqs}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.faqList}
      />

      <Text style={styles.sectionTitle}>Contact Us</Text>
      <Text style={styles.contactInfo}>Email: harin@1234example.com</Text>
      <Text style={styles.contactInfo}>Phone: +1 234 567 890</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Lora_700Bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'Lora_700Bold',
  },
  faqList: {
    paddingBottom: 20,
  },
  faqItem: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Lora_700Bold',
  },
  answer: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'Lora_400Regular',
    marginTop: 10,
  },
  contactInfo: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Lora_400Regular',
  },
});

export default HelpSupportScreen;
