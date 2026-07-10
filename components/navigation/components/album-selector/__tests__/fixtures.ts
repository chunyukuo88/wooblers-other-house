// @ts-nocheck
export const setUpWindowLocation = async (href: string): Promise<void> => {
  delete global.window.location;
  global.window = Object.create(window);
  global.window.location = { href };
};
export const setUpNavigatorShare = async (): Promise<void> => {
  delete global.navigator;
  global.navigator = {
    share: jest.fn(),
  };
};
export const setUpNavigatorClipboardWriteText = async (): Promise<void> => {
  const mockWriteText = jest.fn();
  delete global.navigator.clipboard;
  global.navigator = Object.create(navigator);
  global.navigator.share = undefined;
  global.navigator.clipboard = {
    writeText: mockWriteText,
    read: jest.fn(),
    readText: jest.fn(),
    write: jest.fn(),
    addEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
    removeEventListener: jest.fn(),
  };
};
