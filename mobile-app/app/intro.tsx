import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        title: 'Sanatan Wisdom',
        description: 'Find peace with daily spiritual guidance and teachings.',
        image: require('../assets/images/intro_wisdom.jpg'),
    },
    {
        id: '2',
        title: 'Easy Puja Booking',
        description: 'Book authentic pujas performed by experienced pandits.',
        image: require('../assets/images/intro_puja.jpg'),
    },
];

export default function IntroScreen() {
    const router = useRouter();
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const completeIntro = async () => {
        try {
            await AsyncStorage.setItem('hasSeenIntro', 'true');
            router.replace('/login');
        } catch (e) {
            console.error(e);
            router.replace('/login');
        }
    };

    const handleNext = () => {
        if (currentIndex < SLIDES.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
        } else {
            completeIntro();
        }
    };

    const onMomentumScrollEnd = (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
    };

    const renderItem = ({ item }: { item: typeof SLIDES[0] }) => (
        <View style={styles.slide}>
            <Image source={item.image} style={styles.imageBackground} contentFit="cover" />

            {/* Overlay to ensure text readability */}
            <View style={styles.overlay} />

            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.skipButton} onPress={completeIntro}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <FlatList
                ref={flatListRef}
                data={SLIDES}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onMomentumScrollEnd={onMomentumScrollEnd}
                keyExtractor={(item) => item.id}
            />

            {/* Pagination & Next Button Container */}
            <View style={styles.bottomContainer}>
                <View style={styles.pagination}>
                    {SLIDES.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index && styles.activeDot,
                            ]}
                        />
                    ))}
                </View>

                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextButtonText}>
                        {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    slide: {
        width,
        height,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 150,
    },
    imageBackground: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(15, 23, 42, 0.4)', // Cosmic Navy overlay
    },
    textContainer: {
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: '#fed7aa', // Light orange tint
        textAlign: 'center',
        lineHeight: 24,
    },
    skipButton: {
        position: 'absolute',
        top: 60,
        right: 20,
        zIndex: 10,
        padding: 10,
    },
    skipText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        paddingHorizontal: 30,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#f59e0b', // Gold
        width: 24,
    },
    nextButton: {
        backgroundColor: '#f97316', // Saffron
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#f97316',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 8,
    },
    nextButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
