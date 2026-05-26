export interface LogEntry {
  kind: LogKind;
  icon: string;
  text: string;
  time: Date;
}

export type LogKind = 'system' | 'player' | 'enemy' | 'heal' | 'info';
