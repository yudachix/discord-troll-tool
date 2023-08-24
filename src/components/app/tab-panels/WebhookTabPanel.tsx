import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import DelayInput from '@/components/common/DelayInput';
import { useLogger } from '@/hooks/useLogger';
import { useLoggingFetch } from '@/hooks/useLoggingFetch';

export default function WebhookTabPanel() {
  const [delay, setDelay] = useState(0.5);
  const logger = useLogger();
  const fetch = useLoggingFetch();

  return (
    <Stack alignItems='flex-start' spacing={2}>
      <DelayInput
        onChange={setDelay}
        value={delay}
      />
      <FormControlLabel control={<Checkbox defaultChecked />} label='テキスト読み上げ（TTS）' />
      <Divider flexItem />
      <Typography component='h2' variant='h6'>ウェブフックの削除</Typography>
      <Stack direction='row' spacing={1} width='100%'>
        <Button
          onClick={() => {
            logger.info('Clicked');
            fetch('/notfound');
          }}
          startIcon={<DeleteIcon />}
          variant='contained'
        >
          削除
        </Button>
        <TextField fullWidth label='ウェブフックURL' size='small' sx={{ flex: 1 }} />
      </Stack>
    </Stack>
  );
}
