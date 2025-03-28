import React, { createContext } from 'react';
import { ChatTurn } from './utils';

export const MessagesContext = createContext<[ChatTurn[], React.Dispatch<React.SetStateAction<ChatTurn[]>>]|null>(null);
export const ModelContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]|null>(null);
export const LoadingContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]|null>(null);
