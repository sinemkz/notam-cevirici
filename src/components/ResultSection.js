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

      <ResultCard title="Plain English" accentColor="#0EA5E9">
        {result.plainEnglish}
      </ResultCard>

      <ResultCard title="Türkçe Çeviri" accentColor="#6366F1">
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

      <ResultCard title="Pilot İçin Özet" accentColor="#0F172A">
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
    color: '#475569',
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
