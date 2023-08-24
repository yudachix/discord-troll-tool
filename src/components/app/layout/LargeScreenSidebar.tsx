import Stack from '@mui/material/Stack';
import MuiTab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { paramCase } from 'change-case';
import { pipe } from 'fp-ts/function';
import { map, arrayFrom } from 'iter-tools';
import { useRouter } from 'next/navigation';

import EasterEgg from '@/components/app/layout/EasterEgg';
import GitHubLink from '@/components/app/layout/GitHubLink';
import { Tab } from '@/enums/Tab';
import { useHydratedStore } from '@/hooks/useHydratedStore';
import { initialTabStore, useTabStore } from '@/stores/tab';

export default function LargeScreenSidebar() {
  const router = useRouter();
  const { tab, setTab } = useHydratedStore(useTabStore, initialTabStore);

  return (
    <Stack
      alignItems='flex-start'
      justifyContent='space-between'
      sx={{ borderRight: theme => `1px solid ${theme.palette.divider}` }}
    >
      <Tabs
        onChange={(_ev, value) => {
          setTab(value);
          router.replace(`/?tab=${paramCase(Tab.toString(value))}`);
        }}
        orientation='vertical'
        value={tab}
      >
        {pipe(
          Tab.iterTabs(),
          map(tab => [tab, Tab.toIcon(tab)] as const),
          map(([tab, Icon]) => (
            <MuiTab
              key={tab}
              label={(
                <Stack
                  direction='row'
                  spacing={1}
                  width='100%'
                >
                  <Icon />
                  <Typography>{Tab.toLabel(tab)}</Typography>
                </Stack>
              )}
              value={tab}
            />
          )),
          arrayFrom
        )}
      </Tabs>
      <Stack
        direction='row'
        width='100%'
      >
        <EasterEgg />
        <Stack
          alignItems='center'
          flex={1}
          justifyContent='center'
        >
          <GitHubLink variant='chip' />
        </Stack>
      </Stack>
    </Stack>
  );
}
