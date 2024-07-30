import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const YouTube = ({ route }) => {
  const { url } = route.params;

  return (
    <View style={styles.container}>
      <WebView source={{ uri: url }} style={styles.webview} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default YouTube;
