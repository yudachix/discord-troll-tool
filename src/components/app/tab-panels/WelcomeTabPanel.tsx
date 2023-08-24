import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function WelcomeTabPanel() {
  return (
    <Stack spacing={1}>
      <Typography component='h2' variant='h5'>ようこそ</Typography>
      <Alert severity='error'>
        <Stack spacing={1}>
          <Typography component='h2' variant='h5'>注意点</Typography>
          <Typography>
            このツールは現在バージョン4のアルファ版（v4.0.0-alpha.1）であり、動作の保証は全くありません。
          </Typography>
          <Typography>
            また、ウェブブラウザの仕組み上、ページ側で匿名化はできません。<br />
            お使いの端末やウェブブラウザ側でVPNなどを設定することをおすすめします。
          </Typography>
        </Stack>
      </Alert>
    </Stack >
  );
}
