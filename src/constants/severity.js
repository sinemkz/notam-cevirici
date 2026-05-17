export const SEVERITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
};

export const SEVERITY_META = {
  [SEVERITY.LOW]: {
    label: 'Düşük',
    labelEn: 'Low',
    color: '#5B8C66',
    bg: '#E5F0E2',
    border: '#C5DEC1',
    description: 'Bilgilendirme amaçlı, operasyonu doğrudan etkilemez.',
  },
  [SEVERITY.MEDIUM]: {
    label: 'Orta',
    labelEn: 'Medium',
    color: '#B0823A',
    bg: '#FBEFD6',
    border: '#F0D9A8',
    description: 'Planlamayı etkileyebilir, dikkate alınmalıdır.',
  },
  [SEVERITY.HIGH]: {
    label: 'Yüksek',
    labelEn: 'High',
    color: '#B45A5A',
    bg: '#F6DCDC',
    border: '#E8B8B8',
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
  'U/S',
  'PROHIB',
  'INOP',
  'PAPI',
  'VASI',
];

export const MEDIUM_KEYWORDS = ['WIP', 'CRANE', 'TWY', 'LIGHTS', 'OBST'];
