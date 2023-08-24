'use client';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { camelCase } from 'change-case';
import { useEffect } from 'react';

import LargeScreenSidebar from '@/components/app/layout/LargeScreenSidebar';
import SmallScreenSidebar from '@/components/app/layout/SmallScreenSidebar';
import AliveCheckTabPanel from '@/components/app/tab-panels/AliveCheckTabPanel';
import DirectMessageTabPanel from '@/components/app/tab-panels/DirectMessageTabPanel';
import FriendRequestTabPanel from '@/components/app/tab-panels/FriendRequestTabPanel';
import LogTabPanel from '@/components/app/tab-panels/LogTabPanel';
import MessageTabPanel from '@/components/app/tab-panels/MessageTabPanel';
import SettingsTabPanel from '@/components/app/tab-panels/SettingsTabPanel';
import TokenTabPanel from '@/components/app/tab-panels/TokenTabPanel';
import WebhookTabPanel from '@/components/app/tab-panels/WebhookTabPanel';
import WelcomeTabPanel from '@/components/app/tab-panels/WelcomeTabPanel';
import { Tab } from '@/enums/Tab';
import { useHydratedStore } from '@/hooks/useHydratedStore';
import { initialTabStore, useTabStore } from '@/stores/tab';

const toTabPanel = (value: Tab) => {
  switch (value) {
    case Tab.Welcome: return WelcomeTabPanel;
    case Tab.Token: return TokenTabPanel;
    case Tab.AliveCheck: return AliveCheckTabPanel;
    case Tab.Message: return MessageTabPanel;
    case Tab.DirectMessage: return DirectMessageTabPanel;
    case Tab.FriendRequest: return FriendRequestTabPanel;
    case Tab.Webhook: return WebhookTabPanel;
    case Tab.Log: return LogTabPanel;
    case Tab.Settings: return SettingsTabPanel;
  }
};

export default function Page() {
  const { tab, setTab } = useHydratedStore(useTabStore, initialTabStore);
  const TabPanel = toTabPanel(tab);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const { searchParams } = new URL(location.href);
    const tabParam = searchParams.get('tab');

    if (!tabParam) {
      return;
    }

    const tab = camelCase(tabParam);

    if (!Tab.isTab(tab)) {
      return;
    }

    setTab(tab);
  }, []);

  return (
    <>
      <noscript>
        <Alert severity='error'>JavaScriptを有効にしてください</Alert>
      </noscript>
      <Stack
        direction={isSmallScreen ? 'column' : 'row'}
        flex={1}
        height='100%'
      >
        {!isSmallScreen && <LargeScreenSidebar />}
        {isSmallScreen && <SmallScreenSidebar />}
        <Box
          flex={1}
          height={isSmallScreen ? '0%' : '100%'}
          padding={2}
        >
          <TabPanel />
        </Box>
      </Stack>
    </>
  );
}
