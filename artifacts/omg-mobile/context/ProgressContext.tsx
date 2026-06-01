import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "omg_progress_v1";

type ProgressMap = Record<string, boolean>;

type ProgressContextValue = {
  progress: ProgressMap;
  isDiscussed: (id: string) => boolean;
  markDiscussed: (id: string) => void;
  unmarkDiscussed: (id: string) => void;
  toggleDiscussed: (id: string) => void;
  getDiscussedCount: (questionIds: string[]) => number;
  resetCategory: (questionIds: string[]) => void;
  totalDiscussed: number;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          setProgress(JSON.parse(raw));
        } catch {
          setProgress({});
        }
      }
      setLoaded(true);
    });
  }, []);

  const persist = useCallback((map: ProgressMap) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  }, []);

  const markDiscussed = useCallback(
    (id: string) => {
      setProgress((prev) => {
        const next = { ...prev, [id]: true };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const unmarkDiscussed = useCallback(
    (id: string) => {
      setProgress((prev) => {
        const next = { ...prev };
        delete next[id];
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const toggleDiscussed = useCallback(
    (id: string) => {
      setProgress((prev) => {
        const next = { ...prev };
        if (next[id]) {
          delete next[id];
        } else {
          next[id] = true;
        }
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const isDiscussed = useCallback(
    (id: string) => !!progress[id],
    [progress]
  );

  const getDiscussedCount = useCallback(
    (questionIds: string[]) => questionIds.filter((id) => progress[id]).length,
    [progress]
  );

  const resetCategory = useCallback(
    (questionIds: string[]) => {
      setProgress((prev) => {
        const next = { ...prev };
        questionIds.forEach((id) => delete next[id]);
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const totalDiscussed = Object.values(progress).filter(Boolean).length;

  if (!loaded) return null;

  return (
    <ProgressContext.Provider
      value={{
        progress,
        isDiscussed,
        markDiscussed,
        unmarkDiscussed,
        toggleDiscussed,
        getDiscussedCount,
        resetCategory,
        totalDiscussed,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
