import { NOTAM_DICTIONARY } from '../constants/dictionary';
import { ENGLISH_TO_TURKISH_PHRASES } from '../constants/englishToTurkish';
import {
  SEVERITY,
  HIGH_KEYWORDS,
  MEDIUM_KEYWORDS,
} from '../constants/severity';

/**
 * NOTAM metnini Plain English / Türkçe çeviriye dönüştüren mock AI servisi.
 *
 * Strateji:
 *   1. Önce sık görülen NOTAM kalıpları (RWY CLSD, AD CLSD, ILS U/S, vs.)
 *      doğal cümlelerle eşleştirilir.
 *   2. Kalan tokenlar kısaltma sözlüğünden kelime kelime çevrilir.
 *   3. Türkçe çıktı için ek olarak yaygın İngilizce NOTAM cümleleri
 *      (inşaat, kenar ışıkları, takip aracı vb.) ayrı bir katmanda çevrilir.
 *
 * Tam cümle çevirisi için gerçek bir çeviri motoru / LLM API gerekir;
 * mock modda İngilizce paragraflar sözlükteki kalıplarla yaklaşık Türkçeleştirilir.
 *
 * Gerçek bir LLM / AI servisi (OpenAI, Anthropic, vb.) bağlamak için
 * sadece `translateNotam` fonksiyonunun gövdesi değiştirilmelidir.
 * Public API (input -> Promise<TranslationResult>) korunmalıdır.
 *
 * @typedef {Object} TranslationResult
 * @property {string} plainEnglish
 * @property {string} turkish
 * @property {'LOW'|'MEDIUM'|'HIGH'} severity
 * @property {string} pilotSummary
 */

const TIME_RANGE_REGEX = /\b(\d{2})(\d{2})-(\d{2})(\d{2})Z\b/;
const RWY_DESIGNATOR = '\\d{2}[LRC]?(?:\\/\\d{2}[LRC]?)?';

const PHRASE_PATTERNS = [
  // TRIGGER NOTAM-PERM AIRAC AIP AMDT XX/YY WEF DD MMM YYYY CHANGES OF
  {
    re: /\bTRIGGER\s+NOTAM[-\s]+PERM\s+AIRAC\s+AIP\s+AMDT\s+(\d{2}\/\d{2})\s+WEF\s+(\d{1,2})\s+([A-Z]{3})\s+(\d{4})\s+CHANGES\s+OF\s+([A-Z]{4})\b/gi,
    en: (_, amdt, d, m, y, icao) =>
      `Trigger NOTAM (permanent) for AIRAC AIP amendment ${amdt}, effective ${d} ${m} ${y}, regarding changes at ${icao}`,
    tr: (_, amdt, d, m, y, icao) =>
      `${amdt} numaralı AIRAC AIP değişikliği için tetikleyici NOTAM (kalıcı), ${d} ${m} ${y} tarihinden itibaren geçerli, ${icao} meydanındaki değişikliklerle ilgili`,
  },
  // AIRAC AIP AMDT XX/YY WEF DD MMM YYYY
  {
    re: /\bAIRAC\s+AIP\s+AMDT\s+(\d{2}\/\d{2})\s+WEF\s+(\d{1,2})\s+([A-Z]{3})\s+(\d{4})\b/gi,
    en: (_, amdt, d, m, y) =>
      `AIRAC AIP amendment ${amdt}, effective ${d} ${m} ${y}`,
    tr: (_, amdt, d, m, y) =>
      `${amdt} numaralı AIRAC AIP değişikliği, ${d} ${m} ${y} tarihinden itibaren geçerli`,
  },
  // WEF DD MMM YYYY (standalone)
  {
    re: /\bWEF\s+(\d{1,2})\s+([A-Z]{3})\s+(\d{4})\b/gi,
    en: (_, d, m, y) => `effective ${d} ${m} ${y}`,
    tr: (_, d, m, y) => `${d} ${m} ${y} tarihinden itibaren geçerli`,
  },
  {
    re: new RegExp(
      `\\bRWY\\s+(${RWY_DESIGNATOR})\\s+(?:CLSD|CLOSED)\\s+BTN\\s+(\\d{2})(\\d{2})-(\\d{2})(\\d{2})Z\\b`,
      'gi'
    ),
    en: (_, rwy, h1, m1, h2, m2) =>
      `Runway ${rwy} is closed between ${h1}:${m1} and ${h2}:${m2} UTC`,
    tr: (_, rwy, h1, m1, h2, m2) =>
      `${rwy} pisti ${h1}:${m1}-${h2}:${m2} UTC arasında kapalıdır`,
  },
  {
    re: new RegExp(
      `\\bRWY\\s+(${RWY_DESIGNATOR})\\s+(?:CLSD|CLOSED)\\b`,
      'gi'
    ),
    en: (_, rwy) => `Runway ${rwy} is closed`,
    tr: (_, rwy) => `${rwy} pisti kapalıdır`,
  },
  // TWY L BTN TWY A AND TWY B CLSD
  {
    re: /\bTWY\s+([A-Z0-9]+)\s+BTN\s+TWY\s+([A-Z0-9]+)\s+AND\s+TWY\s+([A-Z0-9]+)\s+(?:CLSD|CLOSED)\b/gi,
    en: (_, t1, t2, t3) =>
      `Taxiway ${t1} between taxiway ${t2} and taxiway ${t3} is closed`,
    tr: (_, t1, t2, t3) =>
      `${t1} taksiyolunun ${t2} ve ${t3} taksiyolları arasındaki kısmı kapalıdır`,
  },
  {
    re: /\bTWY\s+([A-Z0-9]+)\s+(?:CLSD|CLOSED)\b/gi,
    en: (_, twy) => `Taxiway ${twy} is closed`,
    tr: (_, twy) => `${twy} taksiyolu kapalıdır`,
  },
  {
    re: /\bTWY\s+([A-Z0-9]+)\s+WIP\b/gi,
    en: (_, twy) => `Taxiway ${twy} has work in progress`,
    tr: (_, twy) => `${twy} taksiyolunda çalışma devam ediyor`,
  },
  {
    re: /\bAD\s+(?:CLSD|CLOSED)\b/gi,
    en: () => 'Aerodrome is closed',
    tr: () => 'meydan kapalıdır',
  },
  {
    re: new RegExp(`\\bILS\\s+RWY\\s+(${RWY_DESIGNATOR})\\s+U\\/S\\b`, 'gi'),
    en: (_, rwy) => `ILS for runway ${rwy} is unserviceable`,
    tr: (_, rwy) => `${rwy} pisti için ILS hizmet dışı`,
  },
  {
    re: /\bILS\s+U\/S\b/gi,
    en: () => 'ILS is unserviceable',
    tr: () => 'ILS hizmet dışı',
  },
  {
    re: /\bFUEL\s+NOT\s+AVBL\b/gi,
    en: () => 'fuel is not available',
    tr: () => 'yakıt mevcut değil',
  },
  {
    re: /\b(?:BTN\s+)?(\d{2})(\d{2})-(\d{2})(\d{2})Z\b/g,
    en: (_, h1, m1, h2, m2) => `between ${h1}:${m1} and ${h2}:${m2} UTC`,
    tr: (_, h1, m1, h2, m2) => `${h1}:${m1}-${h2}:${m2} UTC arasında`,
  },
];

/** Uzun İngilizce kalıplar önce işlensin */
const SORTED_EN_TR = [...ENGLISH_TO_TURKISH_PHRASES].sort(
  (a, b) => b.en.length - a.en.length
);

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Serbest metindeki yaygın İngilizce NOTAM ifadelerini Türkçeye çevirir.
 * Tek kelimelerde yanlış eşleşmeyi azaltmak için kelime sınırı kullanılır.
 */
function replaceEnglishProseToTurkish(text) {
  let out = text;
  for (const { en, tr } of SORTED_EN_TR) {
    const esc = escapeRegExp(en);
    let re;
    if (/\s/.test(en)) {
      re = new RegExp(esc, 'gi');
    } else if (en.startsWith('(') || en.startsWith('[')) {
      re = new RegExp(esc, 'gi');
    } else {
      re = new RegExp(`\\b${esc}\\b`, 'gi');
    }
    out = out.replace(re, tr);
  }
  return out;
}

function buildAbbrRegex(abbr) {
  if (abbr.endsWith(':')) {
    const base = escapeRegExp(abbr.slice(0, -1));
    return `\\b${base}\\s*:`;
  }
  if (abbr.includes(' ')) {
    const parts = abbr.trim().split(/\s+/).map(escapeRegExp);
    return `\\b${parts.join('\\s+')}\\b`;
  }
  return `\\b${escapeRegExp(abbr)}\\b`;
}

function replaceAbbreviations(text, lang) {
  const multiWord = NOTAM_DICTIONARY.filter(
    (e) => e.abbr.includes(' ') && !e.abbr.endsWith(':')
  );
  const colonLabels = NOTAM_DICTIONARY.filter((e) => e.abbr.endsWith(':'));
  const singleWord = NOTAM_DICTIONARY.filter(
    (e) => !e.abbr.includes(' ') && !e.abbr.endsWith(':')
  );

  multiWord.sort((a, b) => b.abbr.length - a.abbr.length);

  let output = text;
  const run = (entries) => {
    for (const entry of entries) {
      const pattern = new RegExp(buildAbbrRegex(entry.abbr), 'gi');
      output = output.replace(
        pattern,
        lang === 'en' ? entry.en : entry.tr
      );
    }
  };

  run(multiWord);
  run(colonLabels);
  run(singleWord);
  return output;
}

/**
 * NOTAM'larda sık görülür: rakam ile birimin bitişik yazılması (1NM, 500FT).
 * \b kelime sınırı N ile M arasında oluşmadığı için NM/FT hiç eşleşmezdi.
 */
function preprocessAttachedUnits(text) {
  return text
    .replace(/(\d)(NM)\b/gi, '$1 $2')
    .replace(/(\d)(FT)\b/gi, '$1 $2');
}

/** Bazı kaynaklarda saat ile C) bölümü bitişik yapışır: 04:40C) */
function preprocessGluedSections(text) {
  return text.replace(/(\d{2}:\d{2})C\s*\)/gi, '$1 C)');
}

/** Q/E satırlarına kısa Türkçe açıklama (kodlar aynı kalır). */
function preprocessLineTags(text) {
  return text
    .replace(/\bQ\s*\)\s*/gi, 'Q (etki alanı / FIR-konu kodu): ')
    .replace(/\bE\s*\)\s*/gi, 'E (açıklama metni): ');
}

function preprocessNotamText(text) {
  let t = preprocessAttachedUnits(text);
  t = preprocessGluedSections(t);
  t = preprocessLineTags(t);
  return t;
}

function finalize(text) {
  let out = text.replace(/\s+/g, ' ').trim();
  out = out.replace(/\s+([.,;:!?])/g, '$1');
  if (out.length === 0) return out;
  if (!/[.!?]$/.test(out)) out += '.';
  return out.charAt(0).toUpperCase() + out.slice(1);
}

function translateTo(notam, lang) {
  let text = preprocessNotamText(notam.trim());
  for (const pat of PHRASE_PATTERNS) {
    text = text.replace(pat.re, pat[lang]);
  }
  text = replaceAbbreviations(text, lang);
  if (lang === 'tr') {
    text = replaceEnglishProseToTurkish(text);
  }
  return finalize(text);
}

function detectSeverity(notam) {
  const upper = notam.toUpperCase();
  if (HIGH_KEYWORDS.some((kw) => upper.includes(kw))) return SEVERITY.HIGH;
  if (MEDIUM_KEYWORDS.some((kw) => upper.includes(kw))) return SEVERITY.MEDIUM;
  return SEVERITY.LOW;
}

function buildPilotSummary(notam, severity) {
  const upper = notam.toUpperCase();

  if (upper.includes('AD CLSD')) {
    return 'Meydan kapalı. Alternatif meydan ve yakıt planlaması zorunludur.';
  }
  if (upper.includes('FUEL NOT AVBL')) {
    return 'Bu meydanda yakıt mevcut değil. Yakıt planlaması ve alternatif meydan kontrol edilmelidir.';
  }
  if (upper.includes('ILS U/S') || /ILS.*U\/S/.test(upper)) {
    return 'ILS hizmet dışı. Yaklaşma briefing tekrar gözden geçirilmeli, alternatif yaklaşma prosedürü hazırlanmalıdır.';
  }
  if (
    upper.includes('RWY') &&
    (upper.includes('CLSD') || upper.includes('CLOSED'))
  ) {
    const rwyMatch = upper.match(/RWY\s*([0-9]{2}[LRC]?(\/[0-9]{2}[LRC]?)?)/);
    const rwy = rwyMatch ? rwyMatch[1] : 'ilgili pist';
    const timeMatch = notam.match(TIME_RANGE_REGEX);
    if (timeMatch) {
      const [, h1, m1, h2, m2] = timeMatch;
      return `${h1}:${m1}-${h2}:${m2} UTC saatleri arasında ${rwy} pisti kullanılamaz. Alternatif pist veya meydan operasyonu kontrol edilmelidir.`;
    }
    return `${rwy} pisti kullanılamaz. Alternatif pist veya meydan operasyonu kontrol edilmelidir.`;
  }
  if (
    upper.includes('TWY') &&
    (upper.includes('CLSD') || upper.includes('CLOSED'))
  ) {
    return 'İlgili taksiyolu kapalı. Yer rotası ATC ile teyit edilmelidir.';
  }
  if (
    upper.includes('WIP') ||
    upper.includes('CRANE') ||
    upper.includes('OBST')
  ) {
    return 'Meydan civarında çalışma/engel mevcut. Yaklaşma ve kalkış sırasında dikkatli olunmalı, NOTAM koordinatları briefing’e dahil edilmelidir.';
  }
  if (upper.includes('LIGHTS')) {
    return 'İlgili ışık sistemi etkilenmiştir. Gece operasyonu ve minimum görüş şartları yeniden değerlendirilmelidir.';
  }
  if (upper.includes('KITE')) {
    return 'Bölgede uçurtma faaliyeti bildirilmiştir. Alçak irtifada ek çarpışma riski olabilir; görsel tarama ve ATC bilgilendirmesi dikkate alınmalıdır.';
  }

  if (severity === SEVERITY.HIGH) {
    return 'Yüksek öncelikli NOTAM. Operasyonel planlama gözden geçirilmelidir.';
  }
  if (severity === SEVERITY.MEDIUM) {
    return 'Planlamayı etkileyebilecek bilgi. Briefing sırasında dikkate alınmalıdır.';
  }
  return 'Bilgilendirme amaçlı NOTAM. Doğrudan aksiyon gerektirmez.';
}

/**
 * Verilen NOTAM metnini analiz eder ve çeviri sonucu döner.
 *
 * Şu an mock olarak çalışıyor (~400ms gecikme ile).
 * Gerçek AI API entegrasyonu için bu fonksiyonun içeriği değiştirilebilir;
 * dönen şekil (TranslationResult) korunmalıdır.
 *
 * @param {string} notam
 * @returns {Promise<TranslationResult>}
 */
export async function translateNotam(notam) {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const plainEnglish = translateTo(notam, 'en');
  const turkish = translateTo(notam, 'tr');
  const severity = detectSeverity(notam);
  const pilotSummary = buildPilotSummary(notam, severity);

  return {
    plainEnglish,
    turkish,
    severity,
    pilotSummary,
  };
}
