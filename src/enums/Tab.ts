import ArticleIcon from '@mui/icons-material/Article';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import HandshakeIcon from '@mui/icons-material/Handshake';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import WebhookIcon from '@mui/icons-material/Webhook';
import { arrayFrom } from 'iter-tools';

import type SvgIcon from '@mui/material/SvgIcon';

export type Tab = Tab.AliveCheck | Tab.DirectMessage | Tab.FriendRequest | Tab.Log | Tab.Message | Tab.Settings | Tab.Token | Tab.Webhook | Tab.Welcome;

export namespace Tab {
  export const Welcome = 0;
  export const Token = 1;
  export const AliveCheck = 2;
  export const Message = 3;
  export const DirectMessage = 4;
  export const FriendRequest = 5;
  export const Webhook = 6;
  export const Log = 7;
  export const Settings = 8;
  export type Welcome = typeof Tab.Welcome;
  export type Token = typeof Tab.Token;
  export type AliveCheck = typeof Tab.AliveCheck;
  export type Message = typeof Tab.Message;
  export type DirectMessage = typeof Tab.DirectMessage;
  export type FriendRequest = typeof Tab.FriendRequest;
  export type Webhook = typeof Tab.Webhook;
  export type Log = typeof Tab.Log;
  export type Settings = typeof Tab.Settings;

  export const getDefault = (): Tab => Tab.Welcome;

  export const toString = (value: Tab): string => {
    switch (value) {
      case Tab.Welcome: return 'welcome';
      case Tab.Token: return 'token';
      case Tab.AliveCheck: return 'aliveCheck';
      case Tab.Message: return 'message';
      case Tab.DirectMessage: return 'directMessage';
      case Tab.FriendRequest: return 'friendRequest';
      case Tab.Webhook: return 'webhook';
      case Tab.Log: return 'log';
      case Tab.Settings: return 'settings';
    }
  };

  export const isTab = (value: unknown): value is Tab => (
    value === Tab.Welcome ||
    value === Tab.Token ||
    value === Tab.AliveCheck ||
    value === Tab.Message ||
    value === Tab.DirectMessage ||
    value === Tab.FriendRequest ||
    value === Tab.Webhook ||
    value === Tab.Log ||
    value === Tab.Settings
  );

  export const toLabel = (value: Tab): string => {
    switch (value) {
      case Tab.Welcome: return 'ようこそ';
      case Tab.Token: return 'トークン';
      case Tab.AliveCheck: return '生存確認';
      case Tab.Message: return 'メッセージ';
      case Tab.DirectMessage: return 'DM';
      case Tab.FriendRequest: return 'フレンド申請';
      case Tab.Webhook: return 'ウェブフック';
      case Tab.Log: return 'ログ';
      case Tab.Settings: return '設定';
    }
  };

  export const toIcon = (value: Tab): typeof SvgIcon => {
    switch (value) {
      case Tab.Welcome: return WavingHandIcon;
      case Tab.Token: return GroupsRoundedIcon;
      case Tab.AliveCheck: return FavoriteIcon;
      case Tab.Message: return MessageIcon;
      case Tab.DirectMessage: return EmailIcon;
      case Tab.FriendRequest: return HandshakeIcon;
      case Tab.Webhook: return WebhookIcon;
      case Tab.Log: return ArticleIcon;
      case Tab.Settings: return SettingsIcon;
    }
  };

  export const iterTabs = function* (): IterableIterator<Tab> {
    yield Tab.Welcome;
    yield Tab.Token;
    yield Tab.AliveCheck;
    yield Tab.Message;
    yield Tab.DirectMessage;
    yield Tab.FriendRequest;
    yield Tab.Webhook;
    yield Tab.Log;
    yield Tab.Settings;
  };

  let len: number | undefined;

  export const getLen = (): number => {
    if (typeof len === 'undefined') {
      len = arrayFrom(iterTabs()).length;
    }

    return len;
  };

  export const toNextTab = (value: Tab): Tab => (value + 1) % Tab.getLen() as Tab;

  export const toPrevTab = (value: Tab): Tab => {
    const prev = value - 1;

    return (prev < 0 ? Tab.getLen() - 1 : prev) as Tab;
  };
}
