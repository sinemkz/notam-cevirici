import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ResultCard from './ResultCard';
import SeverityBadge from './SeverityBadge';
import { SEVERITY_META } from '../constants/severity';

export default function ResultSection({ result }) {
  if (!result) return null;

  const severityMeta = SEVERITY_META[result.severity];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Analiz Sonucu</Text>

      <ResultCard
        title="Plain English"
        accentColor="#6B95B0"
        backgroundColor="#E8F0F5"
        borderColor="#CFDEE7"
      >
        {result.plainEnglish}
      </ResultCard>

      <ResultCard
        title="Türkçe Çeviri"
        accentColor="#8A7AB8"
        backgroundColor="#EDE7F4"
        borderColor="#D8CCE8"
      >
        {result.turkish}
      </ResultCard>

      <ResultCard
        title="Önem Derecesi"
        accentColor={severityMeta.color}
        backgroundColor={severityMeta.bg}
        borderColor={severityMeta.border}
      >
        <View style={{ gap: 8 }}>
          <SeverityBadge severity={result.severity} />
          <Text style={[styles.severityDescription, { color: severityMeta.color }]}>
            {severityMeta.description}
          </Text>
        </View>
      </ResultCard>

      <ResultCard
        title="Pilot İçin Özet"
        accentColor="#8A6E3A"
        backgroundColor="#F5EBD7"
        borderColor="#E5D5B0"
      >
        {result.pilotSummary}
      </ResultCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B5E47',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  severityDescription: {
    fontSize: 13.5,
    fontWeight: '500',
    lineHeight: 19,
  },
});
