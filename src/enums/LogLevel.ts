export type LogLevel = LogLevel.Debug | LogLevel.Error | LogLevel.Info | LogLevel.None | LogLevel.Warn;

export namespace LogLevel {
  export const None = 0;
  export const Debug = 1;
  export const Info = 2;
  export const Warn = 3;
  export const Error = 4;
  export type None = typeof LogLevel.None;
  export type Debug = typeof LogLevel.Debug;
  export type Info = typeof LogLevel.Info;
  export type Warn = typeof LogLevel.Warn;
  export type Error = typeof LogLevel.Error;

  export const isLogLevel = (value: unknown): value is LogLevel => {
    switch (value) {
      case LogLevel.None:
      case LogLevel.Debug:
      case LogLevel.Info:
      case LogLevel.Warn:
      case LogLevel.Error: return true;
      default: return false;
    }
  };

  export const iterLogLevels = function* () {
    yield LogLevel.None;
    yield LogLevel.Debug;
    yield LogLevel.Info;
    yield LogLevel.Warn;
    yield LogLevel.Error;
  };

  export const toLabel = (value: LogLevel): string => {
    switch (value) {
      case LogLevel.None: return 'なし';
      case LogLevel.Debug: return '詳細';
      case LogLevel.Info: return '情報';
      case LogLevel.Warn: return '警告';
      case LogLevel.Error: return 'エラー';
    }
  };

  export const toMuiColor = (value: LogLevel): string => {
    switch (value) {
      case LogLevel.None:
      case LogLevel.Debug: return 'text.secondary';
      case LogLevel.Info: return 'info.main';
      case LogLevel.Warn: return 'warning.main';
      case LogLevel.Error: return 'error';
    }
  };

  export const toLogLabel = (value: LogLevel): string => {
    switch (value) {
      case LogLevel.None: return 'NONE';
      case LogLevel.Debug: return 'DEBUG';
      case LogLevel.Info: return 'INFO';
      case LogLevel.Warn: return 'WARN';
      case LogLevel.Error: return 'ERROR';
    }
  };
}
