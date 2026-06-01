import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import { useProgress } from "@/context/ProgressContext";
import { categories } from "@/constants/questions";

const TOTAL_QUESTIONS = 101;

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { getDiscussedCount, totalDiscussed } = useProgress();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const overallProgress = totalDiscussed / TOTAL_QUESTIONS;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: topPad + 24, paddingBottom: bottomPad + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            OMG She Said YES
          </Text>
          <Text style={[styles.title, { color: colors.foreground }]}>
            Conversation{"\n"}Questions
          </Text>
          <View style={styles.overallProgressContainer}>
            <View style={styles.overallProgressRow}>
              <Text style={[styles.progressLabel, { color: colors.mutedForeground }]}>
                {totalDiscussed} of {TOTAL_QUESTIONS} discussed
              </Text>
              <Text style={[styles.progressPct, { color: colors.primary }]}>
                {Math.round(overallProgress * 100)}%
              </Text>
            </View>
            <View style={[styles.progressTrack, { backgroundColor: colors.muted }]}>
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: colors.primary,
                    width: `${overallProgress * 100}%` as any,
                  },
                ]}
              />
            </View>
          </View>
        </View>

        <View style={styles.categories}>
          {categories.map((cat) => {
            const catQuestionIds = cat.questions.map((_, i) => `${cat.id}-${i}`);
            const discussed = getDiscussedCount(catQuestionIds);
            const total = cat.questions.length;
            const pct = discussed / total;
            const catColor = isDark ? cat.darkColor : cat.color;

            return (
              <Pressable
                key={cat.id}
                style={({ pressed }) => [
                  styles.categoryCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    opacity: pressed ? 0.85 : 1,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  },
                ]}
                onPress={() => router.push(`/category/${cat.id}`)}
                testID={`category-${cat.id}`}
              >
                <View style={styles.categoryTop}>
                  <View
                    style={[styles.categoryDot, { backgroundColor: catColor }]}
                  />
                  <View style={styles.categoryTextGroup}>
                    <Text
                      style={[styles.categoryName, { color: colors.foreground }]}
                    >
                      {cat.name}
                    </Text>
                    <Text
                      style={[
                        styles.categoryCount,
                        { color: colors.mutedForeground },
                      ]}
                    >
                      {discussed}/{total} discussed
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={colors.mutedForeground}
                  />
                </View>
                <View
                  style={[styles.catTrack, { backgroundColor: colors.muted }]}
                >
                  <View
                    style={[
                      styles.catFill,
                      {
                        backgroundColor: catColor,
                        width: `${pct * 100}%` as any,
                      },
                    ]}
                  />
                </View>
              </Pressable>
            );
          })}
        </View>

        <Text style={[styles.footer, { color: colors.mutedForeground }]}>
          Pass the phone and take turns answering
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 28,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    fontSize: 38,
    fontFamily: "Inter_700Bold",
    lineHeight: 44,
    marginBottom: 20,
  },
  overallProgressContainer: {
    gap: 8,
  },
  overallProgressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressLabel: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  progressPct: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  progressTrack: {
    height: 5,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  categories: {
    gap: 12,
    marginBottom: 32,
  },
  categoryCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  categoryTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  categoryTextGroup: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  catTrack: {
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  catFill: {
    height: "100%",
    borderRadius: 2,
  },
  footer: {
    textAlign: "center",
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    fontStyle: "italic",
  },
});
