import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export default function TokenTabPanel() {
  return (
    <Stack alignItems='flex-start' spacing={2}>
      <TextField
        fullWidth
        maxRows={10}
        minRows={4}
        multiline
      />
      <Stack direction='row' spacing={1}>
        <Button
          startIcon={<FileDownloadIcon />}
          variant='outlined'
        >
          インポート
        </Button>
        <Button
          startIcon={<FileUploadIcon />}
          variant='outlined'
        >
          エクスポート
        </Button>
      </Stack>
    </Stack>
  );
}
