export const PROCRASTINATION_TYPE = [
  'NOTDEFINED',
  'SUPERPROCRASTINATOR',
  'PERFECTIONIST',
  'DISORGANIZED',
  'ANTIPROCRASTINATOR',
];

export const STATUS = [
  'REFERENCE',
  'INCUBATION',
  'TODO',
  'TODO_LATE',
  'WAITING',
  'WAITING_LATE',
  'DOING',
  'DOING_LATE',
  'COMPLETED',
  'COMPLETED_LATE',
  'PAUSED',
  'PAUSED_LATE',
  'DELETED',
  'TRASH',
];

// Label, DivColor, PColor
export const STATUS_NAME = [
  ['Referência', '#cccccc', '#4d4d4d'],
  ['Incubação',],
  ['A Fazer', '#f5e0a3', '#635836'],
  ['A fazer (Atrasado)', '#f5b8a3', '$6f3b2a'],
  ['Esperando', '#bbbbbb', '#888888'],
  ['Esperando (Atrasado)', '#bbbbbb', '#888888'],
  ['Fazendo', '#bbbbbb', '#888888'],
  ['Fazendo (Atrasado)', '#bbbbbb', '#888888'],
  ['Concluído', '#bbbbbb', '#888888'],
  ['Concluído (Atrasado)', '#bbbbbb', '#888888'],
  ['Pausado', '#bbbbbb', '#888888'],
  ['Pausado (Atrasado)', '#bbbbbb', '#888888'],
  ['Deletado', '#bbbbbb', '#888888'],
  ['Excluído', '#bbbbbb', '#888888'],
];



export const SECTION_NAMES = [
  'ATRASADOS',
  'PRIORIDADE MAX/URG',
  'HOJE',
  'PROXIMOS 7 DIAS',
];

export const ACTIVITY_TYPE = [
  'ACTIVITY',
  'TASK',
  'PROJECT',
  'HABIT',
  'GOAL',
  'PLANNING',
];

export const ACITIVITIES_MENU = [
  ["Activity", "activity"],
  ["Task", "task"],
];

export const IMPORTANCE_VALUES = {
  LOW: ['Baixa', 1],
  MEDIUM: ['Média', 2],
  HIGH: ['Alta', 3],
};

export const DIFFICULTY_VALUES = {
  LOW: ['Fácil', 1],
  MEDIUM: ['Média', 2],
  HIGH: ['Difícil', 3],
};

export const PRIORITY_VALUES = {
  MINIMAL: ['Mínima', 1, 1.5],
  LOW: ['Baixa', 1.5, 2],
  MEDIUM: ['Média', 2, 2.5],
  HIGH: ['Alta', 2.5, 3],
  MAXIMUM: ['Máxima', 3, 3.5],
  URGENT: ['Urgente', 999, 999],
};

export const MONTHS_NAME = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];


export const DAYS_OF_WEEK = [
  { label: "Dom", value: 0 },
  { label: "Seg", value: 1 },
  { label: "Ter", value: 2 },
  { label: "Qua", value: 3 },
  { label: "Qui", value: 4 },
  { label: "Sex", value: 5 },
  { label: "Sáb", value: 6 },
];