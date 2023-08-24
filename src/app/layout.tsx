import type { LayoutProps } from '.next/types/app/layout';

import AppLayout from '@/components/app/layout/Layout';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME;

export const metadata = {
  title: {
    default: SITE_NAME,
    template: `%s - ${SITE_NAME}`
  },
  icons: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/discord-troll-tool/favicons/apple-touch-icon.png?v=1686251459682'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/discord-troll-tool/favicons/favicon-32x32.png?v=1686251459682'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '194x194',
      url: '/discord-troll-tool/favicons/favicon-194x194.png?v=1686251459682'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      url: '/discord-troll-tool/favicons/android-chrome-192x192.png?v=1686251459682'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/discord-troll-tool/favicons/favicon-16x16.png?v=1686251459682'
    },
    {
      rel: 'shortcut icon',
      url: '/discord-troll-tool/favicons/favicon.ico?v=1686251459682'
    }
  ],
  manifest: '/discord-troll-tool/favicons/site.webmanifest?v=1686251459682',
  themeColor: '#ffffff',
  other: {
    'msapplication-TileColor': '#da532c',
    'msapplication-TileImage': '/discord-troll-tool/favicons/mstile-144x144.png?v=1686251459682',
    'msapplication-config': '/discord-troll-tool/favicons/browserconfig.xml?v=1686251459682'
  }
};

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang='ja'>
      <body>
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
