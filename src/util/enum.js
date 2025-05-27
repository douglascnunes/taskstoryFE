export const PROCRASTINATION_TYPE = [
  'NOTDEFINED',
  'SUPERPROCRASTINATOR',
  'PERFECTIONIST',
  'DISORGANIZED',
  'ANTIPROCRASTINATOR',
];

export const STATUS = [
  'ACTIVE',  // Some models have this first value as default = [0]
  'PAUSED',
  'DELETED',
  'TRASH',
];

// Label_text, Tag_Color, Label_Color, Card_Color
export const CONDICTION = {
  REFERENCE: ['Referência', '#cccccc', '#4d4d4d', '#d9d9d9'],
  INCUBATION: ['Incubação', '#d9cabf', '#8f6e56'],
  TODO: ['A Fazer', '#f5e0a3', '#635836', '#f4ebbe'],
  TODO_LATE: ['A fazer (Atrasado)', '#f5b8a3', '#cf4517', '#eccfc6'],
  WAITING: ['Esperando', '#bbbbbb', '#888888'],
  WAITING_LATE: ['Esperando (Atrasado)', '#bbbbbb', '#75b6d7'],
  DOING: ['Fazendo', '#a3daf5', '#365463', '#bee2f4'],
  DOING_LATE: ['Fazendo (Atrasado)', '#a3b1f5', '#363e63', '#a3b1f5'],
  DONE: ['Concluído', '#a3f5b1', '#36633e', '#bef4c7'],
  DONE_LATE: ['Concluído (Atrasado)', '#bbbbbb', '#888888', '#75bd81'],
  PAUSED: ['Pausado', '#bbbbbb', '#888888'],
  PAUSED_LATE: ['Pausado (Atrasado)', '#bbbbbb', '#888888'],
  DELETED: ['Deletado', '#bbbbbb', '#888888'],
  TRASH: ['Excluído', '#bbbbbb', '#888888', '#808080'],
};



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

// Label, MinRange, MaxRange, divColor, labelColor
export const PRIORITY = {
  MINIMAL: ['Mínima', 1, 1.5, "#b34db3", "#ffccff"],
  LOW: ['Baixa', 1.5, 2, "#5c85d6", "#142952"],
  MEDIUM: ['Média', 2, 2.5, "#5cd685", "#145229"],
  HIGH: ['Alta', 2.5, 3, "#d6c25c", "#524714"],
  MAXIMUM: ['Máxima', 3, 3.5, "#d65c5c", "#521414"],
  URGENT: ['Urgente', 999, 999, "#1a1a1a", "#cccccc"],
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