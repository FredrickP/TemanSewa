import React, {createContext, useContext, useMemo, useState} from 'react';

type MatchStatus = 'Chatting' | 'Agreement Draft' | 'Agreement Created';

export type MatchProgress = {
  roommateId: string;
  status: MatchStatus;
  lastMessage: string;
};

type MatchContextValue = {
  progresses: MatchProgress[];
  bookmarkedRoommateIds: string[];
  deletedChatRoommateIds: string[];
  startChat: (roommateId: string, lastMessage?: string) => void;
  updateLastMessage: (roommateId: string, lastMessage: string) => void;
  setAgreementDraft: (roommateId: string) => void;
  setAgreementCreated: (roommateId: string) => void;
  deleteChat: (roommateId: string) => void;
  toggleBookmark: (roommateId: string) => void;
  isBookmarked: (roommateId: string) => boolean;
};

const MatchContext = createContext<MatchContextValue | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export function MatchProvider({children}: Props): React.JSX.Element {
  const [progresses, setProgresses] = useState<MatchProgress[]>([]);
  const [bookmarkedRoommateIds, setBookmarkedRoommateIds] = useState<string[]>(
    [],
  );
  const [deletedChatRoommateIds, setDeletedChatRoommateIds] = useState<
    string[]
  >([]);

  const startChat = (roommateId: string, lastMessage = 'Chat dimulai') => {
    setDeletedChatRoommateIds(prev => prev.filter(id => id !== roommateId));

    setProgresses(prev => {
      const exists = prev.find(item => item.roommateId === roommateId);

      if (exists) {
        return prev.map(item =>
          item.roommateId === roommateId
            ? {
                ...item,
                status: 'Chatting',
                lastMessage,
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          roommateId,
          status: 'Chatting',
          lastMessage,
        },
      ];
    });
  };

  const updateLastMessage = (roommateId: string, lastMessage: string) => {
    setDeletedChatRoommateIds(prev => prev.filter(id => id !== roommateId));

    setProgresses(prev =>
      prev.map(item =>
        item.roommateId === roommateId
          ? {
              ...item,
              lastMessage,
            }
          : item,
      ),
    );
  };

  const setAgreementDraft = (roommateId: string) => {
    setProgresses(prev =>
      prev.map(item =>
        item.roommateId === roommateId
          ? {
              ...item,
              status: 'Agreement Draft',
              lastMessage: 'Agreement draft sedang dibuat',
            }
          : item,
      ),
    );
  };

  const setAgreementCreated = (roommateId: string) => {
    setProgresses(prev =>
      prev.map(item =>
        item.roommateId === roommateId
          ? {
              ...item,
              status: 'Agreement Created',
              lastMessage: 'Agreement berhasil dibuat',
            }
          : item,
      ),
    );
  };

  const deleteChat = (roommateId: string) => {
    setDeletedChatRoommateIds(prev => {
      if (prev.includes(roommateId)) {
        return prev;
      }

      return [...prev, roommateId];
    });
  };

  const toggleBookmark = (roommateId: string) => {
    setBookmarkedRoommateIds(prev => {
      if (prev.includes(roommateId)) {
        return prev.filter(item => item !== roommateId);
      }

      return [...prev, roommateId];
    });
  };

  const isBookmarked = (roommateId: string) => {
    return bookmarkedRoommateIds.includes(roommateId);
  };

  const value = useMemo(
    () => ({
      progresses,
      bookmarkedRoommateIds,
      deletedChatRoommateIds,
      startChat,
      updateLastMessage,
      setAgreementDraft,
      setAgreementCreated,
      deleteChat,
      toggleBookmark,
      isBookmarked,
    }),
    [progresses, bookmarkedRoommateIds, deletedChatRoommateIds],
  );

  return (
    <MatchContext.Provider value={value}>{children}</MatchContext.Provider>
  );
}

export function useMatchContext(): MatchContextValue {
  const context = useContext(MatchContext);

  if (!context) {
    throw new Error('useMatchContext must be used inside MatchProvider');
  }

  return context;
}