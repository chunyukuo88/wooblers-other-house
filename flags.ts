import { flag } from 'flags/next';

export const howzitFlag = flag({
  key: 'example-flag',
  decide() {
    return false;
    // return true;
  },
});