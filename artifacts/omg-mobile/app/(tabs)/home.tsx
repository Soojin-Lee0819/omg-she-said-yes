import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import { useProgress } from "@/context/ProgressContext";
import { categories } from "@/constants/questions";

const TOTAL_QUESTIONS = 101;
const WEDDING_PHOTO = require("@/assets/images/wedding.jpg");

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
          { paddingBottom: bottomPad + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero photo section */}
        <ImageBackground
          source={WEDDING_PHOTO}
          style={[styles.hero, { paddingTop: topPad + 16 }]}
          imageStyle={styles.heroImage}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(8,4,1,0.10)", "rgba(8,4,1,0.30)", "rgba(8,4,1,0.88)", "rgba(8,4,1,0.98)"]}
            locations={[0, 0.35, 0.72, 1]}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroEyebrow}>A journey for two</Text>
            <Text style={styles.heroTitle}>OMG She Said{"\n"}YES</Text>
            <Text style={styles.heroSub}>
              101 questions to ask each other{"\n"}before you say{" "}
              <Text style={styles.heroSubEm}>"I do."</Text>
            </Text>
          </View>
        </ImageBackground>

        {/* Progress + category list */}
        <View style={[styles.body, { paddingHorizontal: 20 }]}>
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
                    <View style={[styles.categoryDot, { backgroundColor: catColor }]} />
                    <View style={styles.categoryTextGroup}>
                      <Text style={[styles.categoryName, { color: colors.foreground }]}>
                        {cat.name}
                      </Text>
                      <Text style={[styles.categoryCount, { color: colors.mutedForeground }]}>
                        {discussed}/{total} discussed
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} />
                  </View>
                  <View style={[styles.catTrack, { backgroundColor: colors.muted }]}>
                    <View
                      style={[
                        styles.catFill,
                        { backgroundColor: catColor, width: `${pct * 100}%` as any },
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
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1 },

  /* Hero */
  hero: {
    minHeight: 320,
    justifyContent: "flex-end",
  },
  heroImage: {
    resizeMode: "cover",
    /* focal point — keep couple visible */
    top: "-10%",
  },
  heroContent: {
    paddingHorizontal: 24,
    paddingBottom: 28,
    gap: 8,
  },
  heroEyebrow: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "rgba(210,170,110,0.75)",
  },
  heroTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 38,
    lineHeight: 44,
    color: "rgba(245,232,210,0.97)",
    textShadowColor: "rgba(4,2,0,0.6)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 16,
  },
  heroSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 21,
    color: "rgba(205,180,145,0.80)",
  },
  heroSubEm: {
    fontFamily: "Inter_400Regular",
    fontStyle: "italic",
    color: "rgba(225,200,160,0.90)",
  },

  /* Body */
  body: { paddingTop: 24 },
  overallProgressContainer: { gap: 8, marginBottom: 24 },
  overallProgressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressLabel: { fontSize: 13, fontFamily: "Inter_400Regular" },
  progressPct: { fontSize: 13, fontFamily: "Inter_600SemiBold" },
  progressTrack: { height: 5, borderRadius: 3, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 3 },

  categories: { gap: 12, marginBottom: 32 },
  categoryCard: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 12 },
  categoryTop: { flexDirection: "row", alignItems: "center", gap: 12 },
  categoryDot: { width: 12, height: 12, borderRadius: 6 },
  categoryTextGroup: { flex: 1 },
  categoryName: { fontSize: 16, fontFamily: "Inter_600SemiBold", marginBottom: 2 },
  categoryCount: { fontSize: 13, fontFamily: "Inter_400Regular" },
  catTrack: { height: 4, borderRadius: 2, overflow: "hidden" },
  catFill: { height: "100%", borderRadius: 2 },

  footer: {
    textAlign: "center",
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    fontStyle: "italic",
    marginBottom: 8,
  },
});
