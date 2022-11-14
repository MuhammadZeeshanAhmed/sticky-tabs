import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import CollapsibleTabView from './src/CollapsibleTabView';
import HeaderScrollableTabView from './src/HeaderScrollableTabView';
import PullRefreshTabView from './src/PullRefreshTabView';

const App = () => {
  const [mode, setMode] = useState('collapsible');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CollapsibleTabView />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 16,
  },
  button: {
    flex: 1,
    height: 48,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    paddingHorizontal: 16,
  },
});

export default App;
