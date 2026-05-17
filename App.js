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
import { theme } from './src/constants/theme';

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

  const handleRefresh = () => {
    if (notam.trim().length === 0) {
      Alert.alert('Uyarı', 'Önce NOTAM metni girin.');
      return;
    }
    handleTranslate();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.screenBg} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.contentShell,
              theme.fontFamily ? { fontFamily: theme.fontFamily } : null,
            ]}
          >
            <Header onRefresh={handleRefresh} loading={loading} />

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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.screenBg,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 48,
  },
  contentShell: {
    width: '100%',
    maxWidth: theme.contentMaxWidth,
    paddingHorizontal: theme.pagePadding,
    paddingTop: Platform.OS === 'web' ? 16 : 8,
  },
  disclaimerWrapper: {
    marginTop: 4,
  },
});
