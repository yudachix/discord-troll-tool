import AppBar from '@mui/material/AppBar';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import NextLink from 'next/link';
import { forwardRef } from 'react';

import GitHubLink from '@/components/app/layout/GitHubLink';
import ThemeSelect from '@/components/app/layout/ThemeSelect';

export default forwardRef<HTMLDivElement>(function Header(_props, ref) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      elevation={0}
      position='static'
      ref={ref}
      sx={{
        bgcolor: theme.palette.background.default
      }}
      variant='outlined'
    >
      <Toolbar
        disableGutters
        sx={{ padding: 1 }}
        variant='dense'
      >
        <Stack alignItems='center' direction='row' spacing={1}>
          <MuiLink
            color='text.primary'
            component={NextLink}
            href='/'
            underline='none'
          >
            <Typography
              component='h1'
              variant='h6'
            >
              Discord Troll Tool
            </Typography>
          </MuiLink>
          <ThemeSelect />
          {isSmallScreen && <GitHubLink variant='icon' />}
        </Stack>
      </Toolbar>
    </AppBar >
  );
});
