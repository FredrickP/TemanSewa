import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {PrimaryButton} from '../../../components/PrimaryButton';
import type {RootStackParamList} from '../../../navigation/RootStackParamList';
import {colors, spacing} from '../../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

type OnboardingItem = {
  id: string;
  title: string;
  description: string;
  emoji: string;
};

const {width} = Dimensions.get('window');

const onboardingItems: OnboardingItem[] = [
  {
    id: 'match',
    emoji: '🏠',
    title: 'Temukan roommate yang cocok',
    description:
      'Cari teman tinggal berdasarkan lokasi, budget, rutinitas, dan gaya hidup yang paling sesuai dengan kamu.',
  },
  {
    id: 'trust',
    emoji: '🛡️',
    title: 'Lebih aman sebelum tinggal bareng',
    description:
      'Kenali calon roommate lewat profil, preferensi, dan kecocokan sebelum lanjut ngobrol lebih jauh.',
  },
  {
    id: 'deal',
    emoji: '🤝',
    title: 'Buat kesepakatan tinggal bersama',
    description:
      'Bantu atur aturan dasar seperti biaya, kebersihan, tamu, dan kebiasaan harian agar tinggal bareng lebih nyaman.',
  },
];

export function OnboardingScreen({navigation}: Props): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<OnboardingItem>>(null);

  const isLastPage = currentIndex === onboardingItems.length - 1;

  const handleNext = () => {
    if (isLastPage) {
      navigation.replace('AuthLanding');
      return;
    }

    flatListRef.current?.scrollToIndex({
      index: currentIndex + 1,
      animated: true,
    });
  };

  const handleScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({item}: {item: OnboardingItem}) => {
    return (
      <View style={styles.slide}>
        <View style={styles.illustrationContainer}>
          <Text style={styles.emoji}>{item.emoji}</Text>
        </View>

        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brand}>TemanSewa</Text>

        <Text
          style={styles.skip}
          onPress={() => navigation.replace('AuthLanding')}>
          Lewati
        </Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={onboardingItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
      />

      <View style={styles.footer}>
        <View style={styles.dotsContainer}>
          {onboardingItems.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.dot,
                index === currentIndex && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <PrimaryButton
          title={isLastPage ? 'Mulai Sekarang' : 'Lanjut'}
          onPress={handleNext}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  skip: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  slide: {
    width,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
  },
  illustrationContainer: {
    width: 180,
    height: 180,
    borderRadius: 52,
    backgroundColor: colors.muted,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxxl,
  },
  emoji: {
    fontSize: 76,
  },
  title: {
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  description: {
    marginTop: spacing.lg,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.primary,
  },
});