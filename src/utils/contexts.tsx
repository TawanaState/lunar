import { createContext } from 'react';
import { ChatTurn } from './utils';

export const MessagesContext = createContext<[ChatTurn[], React.Dispatch<React.SetStateAction<ChatTurn[]>>]|null>(null);
