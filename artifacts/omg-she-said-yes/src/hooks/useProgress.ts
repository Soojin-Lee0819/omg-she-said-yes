import { useState, useEffect } from "react";
import { allQuestions } from "../data/questions";

type ProgressState = {
  discussedCards: string[];
  activeCategory: string;
  currentIndex: number;
};

const defaultState: ProgressState = {
  discussedCards: [],
  activeCategory: "all",
  currentIndex: 0,
};

export function useProgress() {
  const [state, setState] = useState<ProgressState>(() => {
    try {
      const stored = localStorage.getItem("omg-she-said-yes-progress");
      if (stored) {
        return JSON.parse(stored) as ProgressState;
      }
    } catch (e) {
      console.error("Failed to load progress from localStorage", e);
    }
    return defaultState;
  });

  useEffect(() => {
    try {
      localStorage.setItem("omg-she-said-yes-progress", JSON.stringify(state));
    } catch (e) {
      console.error("Failed to save progress to localStorage", e);
    }
  }, [state]);

  const toggleDiscussed = (cardId: string) => {
    setState((prev) => {
      const set = new Set(prev.discussedCards);
      if (set.has(cardId)) {
        set.delete(cardId);
      } else {
        set.add(cardId);
      }
      return { ...prev, discussedCards: Array.from(set) };
    });
  };

  const setActiveCategory = (category: string) => {
    setState((prev) => ({ ...prev, activeCategory: category, currentIndex: 0 }));
  };

  const setCurrentIndex = (index: number) => {
    setState((prev) => ({ ...prev, currentIndex: index }));
  };

  return {
    state,
    toggleDiscussed,
    setActiveCategory,
    setCurrentIndex,
  };
}
