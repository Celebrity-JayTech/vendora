"use client";

// React, Next.js
import { createContext, useContext, useEffect, useState } from "react";

// Prisma models
import { User } from "@prisma/client";

interface ModalProviderProps {
  children: React.ReactNode;
}

export type ModalData = {
  user?: User;
};

type ModalContextType = {
  data: ModalData;
  isOpen: boolean;
  // setOpen is async so return Promise<void>, and modal can be null
  setOpen: (
    modal: React.ReactNode | null,
    fetchData?: () => Promise<Partial<ModalData> | null | undefined>,
  ) => Promise<void>;
  setClose: () => void;
};

export const ModalContext = createContext<ModalContextType>({
  data: {},
  isOpen: false,
  // default implementations
  setOpen: async () => {},
  setClose: () => {},
});

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<ModalData>({});
  // allow null explicitly
  const [showingModal, setShowingModal] = useState<React.ReactNode | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const setOpen = async (
    modal: React.ReactNode | null,
    fetchData?: () => Promise<Partial<ModalData> | null | undefined>,
  ): Promise<void> => {
    // now this check is meaningful because modal can be null
    if (modal) {
      if (fetchData) {
        try {
          const fetched = await fetchData();
          // use functional update to avoid stale 'data' and guard against null/undefined
          setData((prev) => ({ ...prev, ...(fetched ?? {}) }));
        } catch (err) {
          console.error("fetchData failed in ModalProvider.setOpen:", err);
        }
      }
      setShowingModal(modal);
      setIsOpen(true);
    }
  };

  const setClose = () => {
    setIsOpen(false);
    setData({});
    setShowingModal(null);
  };

  if (!isMounted) return null;

  return (
    <ModalContext.Provider value={{ data, setOpen, setClose, isOpen }}>
      {children}
      {showingModal}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within the ModalProvider");
  }
  return context;
};

export default ModalProvider;
