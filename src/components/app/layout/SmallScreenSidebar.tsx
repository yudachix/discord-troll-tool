import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { pipe } from 'fp-ts/function';
import { map, arrayFrom } from 'iter-tools';

import { Tab } from '@/enums/Tab';
import { useHydratedStore } from '@/hooks/useHydratedStore';
import { initialTabStore, useTabStore } from '@/stores/tab';

export default function SmallScreenSidebar() {
  const { tab, setTab } = useHydratedStore(useTabStore, initialTabStore);

  return (
    <Stack
      direction='row'
      padding={1}
      spacing={1}
    >
      <Select
        onChange={({ target }) => setTab(target.value as Tab)}
        size='small'
        sx={{
          minWidth: '13rem'
        }}
        value={tab}
      >
        {pipe(
          Tab.iterTabs(),
          map(tab => [tab, Tab.toIcon(tab)] as const),
          map(([tab, Icon]) => (
            <MenuItem key={tab} value={tab}>
              <Stack
                direction='row'
                spacing={1}
                width='100%'
              >
                <Icon />
                <Typography>{Tab.toLabel(tab)}</Typography>
              </Stack>
            </MenuItem>
          )),
          arrayFrom
        )}
      </Select>
      <Tooltip title='前のタブへ'>
        <IconButton onClick={() => setTab(Tab.toPrevTab(tab))}>
          <KeyboardArrowLeftIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='次のタブへ'>
        <IconButton onClick={() => setTab(Tab.toNextTab(tab))}>
          <KeyboardArrowRightIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
