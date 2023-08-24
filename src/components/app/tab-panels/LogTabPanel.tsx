import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { pipe } from 'fp-ts/function';
import { map, reverse, arrayFrom, filter } from 'iter-tools';
import { useEffect, useState } from 'react';

import type { Log } from '@/stores/logs';

import { LogLevel } from '@/enums/LogLevel';
import { toCreatedAtString } from '@/libs/toCreatedAtString';
import { useLogsStore } from '@/stores/logs';

export default function LogTabPanel() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { logs, setLogs } = useLogsStore();
  const [displayLogs, setDisplayLogs] = useState<Log[]>([]);
  const [logFilter, setLogFilter] = useState<string>('');
  const [logLevels, setLogLevels] = useState<LogLevel[]>([
    LogLevel.Info,
    LogLevel.Warn,
    LogLevel.Error
  ]);

  useEffect(() => {
    let filteredLogs = logs.slice();

    filteredLogs = filteredLogs.filter(v => logLevels.includes(v.level));

    if (logFilter) {
      filteredLogs = filteredLogs.filter(v => v.description.toLowerCase().includes(logFilter));
    }

    setDisplayLogs(filteredLogs);
  }, [logLevels, logFilter, logs]);

  return (
    <Stack height='100%' spacing={1}>
      <Stack direction={isSmallScreen ? 'column' : 'row'} spacing={1}>
        <Stack direction='row' spacing={1}>
          <FormControl sx={{ width: '7.5rem' }}>
            <InputLabel>ログレベル</InputLabel>
            <Select
              displayEmpty
              fullWidth
              label='ログレベル'
              multiple
              onChange={({ target: { value } }) => {
                const set = (logLevels: LogLevel[]): void => {
                  setLogLevels(logLevels.length ? logLevels : [LogLevel.None]);
                };

                const logLevels = (
                  typeof value === 'string'
                    ? pipe(
                      value.split(','),
                      map(Number),
                      filter(LogLevel.isLogLevel),
                      arrayFrom
                    )
                    : pipe(
                      value.slice(),
                      filter(v => v !== LogLevel.None),
                      arrayFrom
                    )
                );

                set(logLevels);
              }}
              renderValue={selected => {
                switch (selected.length) {
                  case 0: return <em>なし</em>;
                  case 1: return LogLevel.toLabel(selected[0]);
                  case 4: return 'すべて';
                  default: return 'カスタム';
                }
              }}
              size='small'
              value={logLevels}
            >
              {pipe(
                LogLevel.iterLogLevels(),
                map(v => (
                  <MenuItem
                    disabled={v === LogLevel.None}
                    key={v}
                    sx={v === LogLevel.None ? { display: 'none' } : undefined}
                    value={v}
                  >
                    <Checkbox checked={logLevels.includes(v)} />
                    <ListItemText>{LogLevel.toLabel(v)}</ListItemText>
                  </MenuItem>
                )),
                arrayFrom
              )}
            </Select>
          </FormControl>
          <TextField
            label='フィルタ'
            onChange={({ target: { value } }) => setLogFilter(value)}
            size='small'
            sx={{ flex: 1 }}
            value={logFilter}
          />
        </Stack>
        {displayLogs.length > 0 && (
          <Button
            onClick={() => {
              const set = new Set(map(v => v.id, displayLogs));

              setLogs(logs.filter(v => !set.has(v.id)));
            }}
            variant='outlined'
          >
            ログを消去
          </Button>
        )}
      </Stack>
      <Paper
        sx={{
          height: '100%',
          position: 'relative',
          maxHeight: '100%',
          overflow: 'auto'
        }}
      >
        <Stack padding='1rem' position='absolute'>
          {displayLogs.length < 1 && <Typography>ログはありません</Typography>}
          {displayLogs.length > 0 && (
            <div>
              {pipe(
                displayLogs,
                reverse,
                map(v => (
                  <Stack
                    direction='row'
                    key={v.id}
                    spacing={1}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    <Typography color='purple'>[{toCreatedAtString(v.createdAt)}]</Typography>
                    <Typography color={LogLevel.toMuiColor(v.level)}>{LogLevel.toLogLabel(v.level)}</Typography>
                    <Typography color='text.secondary'>{v.location}</Typography>
                    <Typography>-</Typography>
                    <Typography>{v.description}</Typography>
                  </Stack>
                )),
                arrayFrom
              )}
            </div>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
}
