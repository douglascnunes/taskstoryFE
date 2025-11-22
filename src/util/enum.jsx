export const PROCRASTINATION_TYPE = {
  NOTDEFINED: ['Não Definido'],
  SUPERPROCRASTINATOR: ['Superprocrastinador'],
  PERFECTIONIST: ['Perfeccionista'],
  DISORGANIZED: ['Desorganizado'],
  ANTIPROCRASTINATOR: ['Antiprocrastinador'],
}

export const STATUS = [
  'ACTIVE',  // Some models have this first value as default = [0]
  'PAUSED',
  'DELETED',
  'TRASH',
];

// LabelText, TagColor, LabelColor, CardColor, OrderValue
export const CONDICTION = {
  REFERENCE:
    ['Referência', '#cccccc', '#4d4d4d', '#d9d9d9', 0],
  INCUBATION:
    ['Incubação', '#d9cabf', '#8f6e56', '#d9cabf', 0],
  TODO:
    ['A Fazer', '#f5e0a3', '#635836', '#f4ebbe', 3],
  TODO_LATE:
    ['A fazer com atraso', '#f5b8a3', '#cf4517', '#eccfc6', 6],
  WAITING:
    ['Esperando', '#bbbbbb', '#888888', '#d0d0d0', 0],
  WAITING_LATE:
    ['Esperando com atraso', '#bbbbbb', '#75b6d7', '#d0d0d0', 0],
  DOING:
    ['Fazendo', '#a3daf5', '#365463', '#bee2f4', 5],
  DOING_LATE:
    ['Fazendo com atraso', '#8c9df2', '#363e63', '#bac4f7', 7],
  DONE:
    ['Concluído', '#a3f5b1', '#36633e', '#99e6a6', 1],
  DONE_LATE:
    ['Concluído com atraso', '#b3ccb7', '#36633e', '#94b89a', 2],
  PAUSED:
    ['Pausado', '#bbbbbb', '#888888', '#d0d0d0', 0],
  PAUSED_LATE:
    ['Pausado com atraso', '#bbbbbb', '#888888', '#d0d0d0', 0],
  DELETED:
    ['Deletado', '#bbbbbb', '#888888', '#d0d0d0', 0],
  TRASH:
    ['Excluído', '#bbbbbb', '#888888', '#808080', 0],
};



export const SECTION_NAMES = [
  'ATRASADOS',
  'PRIORIDADE MAX/URG',
  'HOJE',
  'PROXIMOS 7 DIAS',
];


export const ACTIVITY_TYPE = {
  ACTIVITY: {
    label: 'Atividade',
    icon: (<p>A</p>),
  },
  TASK: {
    label: 'Tarefa',
    icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
    </svg>),
  },
  PROJECT: {
    label: 'Projeto',
    icon: (<p>P</p>),
  },
  HABIY: {
    label: 'Hábito',
    icon: (<p>H</p>),
  },
  GOAL: {
    label: 'Meta',
    icon: (<p>M</p>),
  },
  PLANNING: {
    label: 'Planejamento',
    icon: (<p>PL</p>),
  },
};


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

// Label, MinRange, MaxRange, divColor, labelColor, OrderValue
export const PRIORITY = {
  MINIMAL: ['Mínima', 1, 1.5, "#b34db3", "#ffccff", 1],
  LOW: ['Baixa', 1.5, 2, "#5c85d6", "#142952", 2],
  MEDIUM: ['Média', 2, 2.5, "#5cd685", "#145229", 3],
  HIGH: ['Alta', 2.5, 3, "#d6c25c", "#524714", 4],
  MAXIMUM: ['Máxima', 3, 3.5, "#d65c5c", "#521414", 5],
  URGENT: ['Urgente', 999, 999, "#1a1a1a", "#cccccc", 6],
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


// [ Perfil_300x300 ]
export const AVATAR = {
  WARRIOR: ['warrior.png'],
  WIZARD: ['wizard.png'],
  ARCHER: ['archer.png'],
  THIEF: ['thief.png'],
  PIRATE: ['pirate.png'],
  BLUE_SNAIL: ['blue_snail.png'],
  ORANGE_MUSHROOM: ['orange_mushroom.png'],
  SLIME: ['slime.png'],
  PIG: ['pig.png'],
}

export const IMAGEM_PERFIL_DEFAULT = ['default.png'];

export const DEPENDENCY = [
  'TODAY',
  'ACTIVITY',
  'DESCRIPTION',
];
