import React from 'react';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';


export default function Profile({ navigation }) {
  const github_username = navigation.getParam('github_username');

  return (
    <WebView
      style={{ flex: 1 }}
      renderLoading={() => <ActivityIndicator color="#7159c1" size="large" />}
      source={{ uri: `https://github.com/${github_username}` }}
    />
  );
}
