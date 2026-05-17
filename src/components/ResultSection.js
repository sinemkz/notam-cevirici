import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ResultCard from './ResultCard';
import SeverityBadge from './SeverityBadge';
import { SEVERITY_META } from '../constants/severity';
import { theme } from '../constants/theme';

export default function ResultSection({ result }) {
  if (!result) return null;

  const severityMeta = SEVERITY_META[result.severity];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>ANALİZ SONUCU</Text>

      <ResultCard
        title="Plain English"
        titleIcon="☁️"
        titleColor={theme.plainEnglish.title}
        backgroundColor={theme.plainEnglish.bg}
        borderColor={theme.plainEnglish.border}
      >
        {result.plainEnglish}
      </ResultCard>

      <ResultCard
        title="Türkçe Çeviri"
        titleIcon="🇹🇷"
        titleColor={theme.turkish.title}
        backgroundColor={theme.turkish.bg}
        borderColor={theme.turkish.border}
      >
        {result.turkish}
      </ResultCard>

      <ResultCard
        title="Önem Derecesi"
        titleIcon="🛡️"
        titleColor={severityMeta.headerTitle}
        backgroundColor={severityMeta.cardBg}
        borderColor={severityMeta.cardBorder}
      >
        <View style={styles.severityInner}>
          <SeverityBadge severity={result.severity} />
          <Text style={[styles.severityDescription, { color: severityMeta.descColor }]}>
            {severityMeta.description}
          </Text>
        </View>
      </ResultCard>

      <ResultCard
        title="Pilot İçin Özet"
        titleIcon="🧑‍✈️"
        titleColor={theme.pilot.title}
        backgroundColor={theme.pilot.bg}
        borderColor={theme.pilot.border}
      >
        {result.pilotSummary}
      </ResultCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: 1,
    marginBottom: theme.sectionTitleGap,
    fontFamily: theme.fontFamily,
  },
  severityInner: {
    gap: 12,
  },
  severityDescription: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    fontFamily: theme.fontFamily,
  },
});
