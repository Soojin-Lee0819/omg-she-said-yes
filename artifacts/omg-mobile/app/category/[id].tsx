import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import { useProgress } from "@/context/ProgressContext";
import { categories } from "@/constants/questions";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { isDiscussed, toggleDiscussed } = useProgress();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const category = categories.find((c) => c.id === id);
  const questions = category?.questions ?? [];
  const questionIds = questions.map((_, i) => `${id}-${i}`);
  const catColor = category
    ? isDark
      ? category.darkColor
      : category.color
    : colors.primary;

  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const cardOpacity = useRef(new Animated.Value(1)).current;
  const isAnimating = useRef(false);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const goToQuestion = useCallback(
    (nextIndex: number, direction: 1 | -1) => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -direction * SCREEN_WIDTH,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(cardOpacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start(() => {
        translateX.setValue(direction * SCREEN_WIDTH * 0.5);
        setCurrentIndex(nextIndex);
        Animated.parallel([
          Animated.spring(translateX, {
            toValue: 0,
            tension: 100,
            friction: 10,
            useNativeDriver: true,
          }),
          Animated.timing(cardOpacity, {
            toValue: 1,
            duration: 180,
            useNativeDriver: true,
          }),
        ]).start(() => {
          isAnimating.current = false;
        });
      });
    },
    [translateX, cardOpacity]
  );

  const goNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      goToQuestion(currentIndex + 1, 1);
    }
  }, [currentIndex, questions.length, goToQuestion]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      goToQuestion(currentIndex - 1, -1);
    }
  }, [currentIndex, goToQuestion]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 8 && Math.abs(gestureState.dy) < 60,
      onPanResponderGrant: () => {
        if (isAnimating.current) return;
        translateX.stopAnimation();
      },
      onPanResponderMove: (_, gestureState) => {
        if (isAnimating.current) return;
        translateX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (isAnimating.current) return;
        if (gestureState.dx < -SWIPE_THRESHOLD) {
          goNext();
        } else if (gestureState.dx > SWIPE_THRESHOLD) {
          goPrev();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            tension: 120,
            friction: 10,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const handleToggle = useCallback(() => {
    const qId = questionIds[currentIndex];
    toggleDiscussed(qId);
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [currentIndex, questionIds, toggleDiscussed]);

  if (!category) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.foreground, textAlign: "center" }}>
          Category not found
        </Text>
      </View>
    );
  }

  const currentId = questionIds[currentIndex];
  const discussed = isDiscussed(currentId);
  const discussedCount = questionIds.filter(isDiscussed).length;

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View
        style={[
          styles.header,
          { paddingTop: topPad + 12, borderBottomColor: colors.border },
        ]}
      >
        <Pressable
          onPress={() => router.back()}
          style={styles.backBtn}
          hitSlop={12}
          testID="back-button"
        >
          <Text style={[styles.backIcon, { color: catColor }]}>‹</Text>
        </Pressable>

        <View style={styles.headerCenter}>
          <Text
            style={[styles.categoryTitle, { color: colors.foreground }]}
            numberOfLines={1}
          >
            {category.name}
          </Text>
          <Text style={[styles.progressText, { color: colors.mutedForeground }]}>
            {discussedCount}/{questions.length} discussed
          </Text>
        </View>

        <View style={styles.counterBadge}>
          <Text style={[styles.counterText, { color: catColor }]}>
            {currentIndex + 1}/{questions.length}
          </Text>
        </View>
      </View>

      <View style={styles.dotsRow}>
        {questions.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor:
                  questionIds[i] && isDiscussed(questionIds[i])
                    ? catColor
                    : i === currentIndex
                    ? colors.foreground
                    : colors.border,
                width: i === currentIndex ? 16 : 6,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.cardArea} {...panResponder.panHandlers}>
        <Animated.View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: discussed
                ? catColor
                : colors.border,
              borderWidth: discussed ? 2 : 1,
              transform: [{ translateX }],
              opacity: cardOpacity,
            },
          ]}
        >
          {discussed && (
            <View
              style={[styles.discussedBanner, { backgroundColor: catColor + "20" }]}
            >
              <Text style={[styles.discussedText, { color: catColor }]}>
                ✓ Discussed
              </Text>
            </View>
          )}
          <Text style={[styles.question, { color: colors.foreground }]}>
            {questions[currentIndex]}
          </Text>
          <Text
            style={[styles.swipeHint, { color: colors.mutedForeground }]}
          >
            Swipe to navigate
          </Text>
        </Animated.View>
      </View>

      <View
        style={[
          styles.footer,
          { paddingBottom: bottomPad + 16, borderTopColor: colors.border },
        ]}
      >
        <Pressable
          onPress={goPrev}
          disabled={currentIndex === 0}
          style={({ pressed }) => [
            styles.navBtn,
            {
              backgroundColor: colors.muted,
              opacity: currentIndex === 0 ? 0.35 : pressed ? 0.7 : 1,
            },
          ]}
          testID="prev-button"
        >
          <Text style={[styles.navBtnText, { color: colors.foreground }]}>
            ‹
          </Text>
        </Pressable>

        <Pressable
          onPress={handleToggle}
          style={({ pressed }) => [
            styles.markBtn,
            {
              backgroundColor: discussed ? catColor : colors.primary,
              opacity: pressed ? 0.85 : 1,
              transform: [{ scale: pressed ? 0.96 : 1 }],
            },
          ]}
          testID="mark-discussed-button"
        >
          <Text style={[styles.markBtnText, { color: "#FFFFFF" }]}>
            {discussed ? "Mark Undiscussed" : "Mark Discussed"}
          </Text>
        </Pressable>

        <Pressable
          onPress={goNext}
          disabled={currentIndex === questions.length - 1}
          style={({ pressed }) => [
            styles.navBtn,
            {
              backgroundColor: colors.muted,
              opacity:
                currentIndex === questions.length - 1 ? 0.35 : pressed ? 0.7 : 1,
            },
          ]}
          testID="next-button"
        >
          <Text style={[styles.navBtnText, { color: colors.foreground }]}>
            ›
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 8,
  },
  backBtn: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 32,
    lineHeight: 36,
    fontFamily: "Inter_400Regular",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
  progressText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  counterBadge: {
    width: 40,
    alignItems: "center",
  },
  counterText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexWrap: "wrap",
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  cardArea: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  card: {
    borderRadius: 20,
    padding: 28,
    ...Platform.select({
      web: { boxShadow: "0 4px 12px rgba(0,0,0,0.08)" },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
      },
    }),
    minHeight: 280,
    justifyContent: "center",
    gap: 16,
  },
  discussedBanner: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-start",
  },
  discussedText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  question: {
    fontSize: 20,
    fontFamily: "Inter_500Medium",
    lineHeight: 30,
    textAlign: "center",
  },
  swipeHint: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    marginTop: 8,
    opacity: 0.7,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 10,
  },
  navBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  navBtnText: {
    fontSize: 28,
    lineHeight: 32,
  },
  markBtn: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  markBtnText: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
});
