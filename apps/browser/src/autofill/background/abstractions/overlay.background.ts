import { CipherRepromptType } from "@bitwarden/common/vault/enums/cipher-reprompt-type";
import { CipherType } from "@bitwarden/common/vault/enums/cipher-type";

import AutofillPageDetails from "../../models/autofill-page-details";

type WebsiteIconData = {
  imageEnabled: boolean;
  image: string;
  fallbackImage: string;
  icon: string;
};

type OverlayAddNewItemMessage = {
  login?: {
    uri?: string;
    hostname: string;
    username: string;
    password: string;
  };
};

type OverlayBackgroundExtensionMessage = {
  [key: string]: any;
  command: string;
  tab?: chrome.tabs.Tab;
  sender?: string;
  details?: AutofillPageDetails;
  overlayElement?: string;
  display?: string;
  data?: {
    commandToRetry?: {
      msg?: {
        command?: string;
      };
    };
  };
} & OverlayAddNewItemMessage;

type OverlayPortMessage = {
  [key: string]: any;
  command: string;
  direction?: string;
  overlayCipherId?: string;
};

type FocusedFieldData = {
  focusedFieldStyles: Partial<CSSStyleDeclaration>;
  focusedFieldRects: Partial<DOMRect>;
};

type OverlayCipherData = {
  id: string;
  name: string;
  type: CipherType;
  reprompt: CipherRepromptType;
  favorite: boolean;
  icon: { imageEnabled: boolean; image: string; fallbackImage: string; icon: string };
  login?: { username: string };
  card?: string;
};

type BackgroundMessageParam = {
  message: OverlayBackgroundExtensionMessage;
};
type BackgroundSenderParam = {
  sender: chrome.runtime.MessageSender;
};
type BackgroundOnMessageHandlerParams = BackgroundMessageParam & BackgroundSenderParam;

type OverlayBackgroundExtensionMessageHandlers = {
  [key: string]: CallableFunction;
  openAutofillOverlay: () => void;
  autofillOverlayElementClosed: ({ message }: BackgroundMessageParam) => void;
  autofillOverlayAddNewVaultItem: ({ message, sender }: BackgroundOnMessageHandlerParams) => void;
  getAutofillOverlayVisibility: () => void;
  checkAutofillOverlayFocused: () => void;
  focusAutofillOverlayList: () => void;
  updateAutofillOverlayPosition: ({ message }: BackgroundMessageParam) => void;
  updateAutofillOverlayHidden: ({ message }: BackgroundMessageParam) => void;
  updateFocusedFieldData: ({ message }: BackgroundMessageParam) => void;
  collectPageDetailsResponse: ({ message, sender }: BackgroundOnMessageHandlerParams) => void;
  unlockCompleted: ({ message }: BackgroundMessageParam) => void;
  addEditCipherSubmitted: () => void;
  deletedCipher: () => void;
};

type PortMessageParam = {
  message: OverlayPortMessage;
};
type PortConnectionParam = {
  port: chrome.runtime.Port;
};
type PortOnMessageHandlerParams = PortMessageParam & PortConnectionParam;

type OverlayButtonPortMessageHandlers = {
  [key: string]: CallableFunction;
  overlayButtonClicked: ({ port }: PortConnectionParam) => void;
  closeAutofillOverlay: ({ port }: PortConnectionParam) => void;
  overlayPageBlurred: () => void;
  redirectOverlayFocusOut: ({ message, port }: PortOnMessageHandlerParams) => void;
};

type OverlayListPortMessageHandlers = {
  [key: string]: CallableFunction;
  checkAutofillOverlayButtonFocused: () => void;
  overlayPageBlurred: () => void;
  unlockVault: ({ port }: PortConnectionParam) => void;
  fillSelectedListItem: ({ message, port }: PortOnMessageHandlerParams) => void;
  addNewVaultItem: ({ port }: PortConnectionParam) => void;
  viewSelectedCipher: ({ message, port }: PortOnMessageHandlerParams) => void;
  redirectOverlayFocusOut: ({ message, port }: PortOnMessageHandlerParams) => void;
};

interface OverlayBackground {
  init(): Promise<void>;
  removePageDetails(tabId: number): void;
  updateOverlayCiphers(): void;
}

export {
  WebsiteIconData,
  OverlayBackgroundExtensionMessage,
  OverlayPortMessage,
  FocusedFieldData,
  OverlayCipherData,
  OverlayAddNewItemMessage,
  OverlayBackgroundExtensionMessageHandlers,
  OverlayButtonPortMessageHandlers,
  OverlayListPortMessageHandlers,
  OverlayBackground,
};
