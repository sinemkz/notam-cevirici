export const SEVERITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
};

export const SEVERITY_META = {
  [SEVERITY.LOW]: {
    label: 'Düşük',
    labelEn: 'Low',
    color: '#16A34A',
    bg: '#DCFCE7',
    border: '#86EFAC',
    description: 'Bilgilendirme amaçlı, operasyonu doğrudan etkilemez.',
  },
  [SEVERITY.MEDIUM]: {
    label: 'Orta',
    labelEn: 'Medium',
    color: '#D97706',
    bg: '#FEF3C7',
    border: '#FCD34D',
    description: 'Planlamayı etkileyebilir, dikkate alınmalıdır.',
  },
  [SEVERITY.HIGH]: {
    label: 'Yüksek',
    labelEn: 'High',
    color: '#DC2626',
    bg: '#FEE2E2',
    border: '#FCA5A5',
    description: 'Uçuş emniyetini doğrudan etkileyebilir.',
  },
};

export const HIGH_KEYWORDS = [
  'CLSD',
  'CLOSED',
  'RWY',
  'ILS U/S',
  'AD CLSD',
  'FUEL NOT AVBL',
];

export const MEDIUM_KEYWORDS = ['WIP', 'CRANE', 'TWY', 'LIGHTS', 'OBST'];
