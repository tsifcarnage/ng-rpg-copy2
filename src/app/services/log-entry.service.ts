import { Injectable } from '@angular/core';
import { LogEntry, LogKind } from '../models/log-entry.interface';

@Injectable({ providedIn: 'root' })
export class LogEntryService {
  private _logEntries: LogEntry[] = [];

  public get logEntries(): LogEntry[] {
    return this._logEntries;
  }

  public addLog(kind: LogKind, icon: string, text: string): void {
    this._logEntries.push({ kind, icon, text, time: new Date() });
  }

  public reset(): void {
    this._logEntries = [];
  }
}
