import React, { createContext, ReactNode, useContext, useRef, useState } from 'react';
import { SharedValue, useSharedValue, withTiming } from 'react-native-reanimated';

interface GuruAssistantContextType {
    labelVisible: boolean;
    setLabelVisible: (visible: boolean) => void;
    hintText: string;
    setHintText: (text: string) => void;
    labelAnimatedValue: SharedValue<number>;
    handleScroll: (offset: number) => void;
}

const GuruAssistantContext = createContext<GuruAssistantContextType | undefined>(undefined);

export function GuruAssistantProvider({ children }: { children: ReactNode }) {
    const [labelVisible, _setLabelVisible] = useState(true);
    const [hintText, setHintText] = useState('Ask GuruJi');
    const labelAnimatedValue = useSharedValue(1);
    const lastOffset = useRef(0);
    const timeoutRef = useRef<any>(null);

    const setLabelVisible = (visible: boolean) => {
        const target = visible ? 1 : 0;
        if (labelAnimatedValue.value === target) return;

        _setLabelVisible(visible);
        labelAnimatedValue.value = withTiming(target, { duration: 500 });
    };

    const handleScroll = (offset: number) => {
        // Show label when at top (offset < 10) or scrolling up near the top
        if (offset < 10) {
            if (labelAnimatedValue.value < 1) {
                setLabelVisible(true);
            }
        } else if (offset > 50) {
            // Hide only after moderate scrolling down
            if (labelAnimatedValue.value > 0) {
                setLabelVisible(false);
            }
        }
    };

    return (
        <GuruAssistantContext.Provider value={{
            labelVisible,
            setLabelVisible,
            hintText,
            setHintText,
            labelAnimatedValue,
            handleScroll
        }}>
            {children}
        </GuruAssistantContext.Provider>
    );
}

export function useGuruAssistant() {
    const context = useContext(GuruAssistantContext);
    if (context === undefined) {
        throw new Error('useGuruAssistant must be used within a GuruAssistantProvider');
    }
    return context;
}
