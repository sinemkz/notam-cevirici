import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import Header from './src/components/Header';
import NotamInput from './src/components/NotamInput';
import ResultSection from './src/components/ResultSection';
import Disclaimer from './src/components/Disclaimer';
import { translateNotam } from './src/services/notamTranslator';

export default function App() {
  const [notam, setNotam] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    const trimmed = notam.trim();
    if (trimmed.length === 0) {
      Alert.alert('Uyarı', 'Lütfen önce bir NOTAM metni girin.');
      return;
    }

    try {
      setLoading(true);
      const translation = await translateNotam(trimmed);
      setResult(translation);
    } catch (err) {
      Alert.alert('Hata', 'NOTAM çevirisi sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setNotam('');
    setResult(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F1E8" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Header />

          <NotamInput
            value={notam}
            onChangeText={setNotam}
            onSubmit={handleTranslate}
            onClear={handleClear}
            loading={loading}
          />

          <ResultSection result={result} />

          {result && (
            <View style={styles.disclaimerWrapper}>
              <Disclaimer />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F1E8',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  disclaimerWrapper: {
    paddingHorizontal: 20,
    marginTop: 4,
  },
});
