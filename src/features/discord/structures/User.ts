import { ChannelManager } from '@/features/discord/managers/ChannelManager';

export class User {
  readonly #token: string;
  readonly channels = new ChannelManager();

  constructor(token: string) {
    this.#token = token;
  }

  async checkAlive(): Promise<boolean> {
    return false;
  }
}
