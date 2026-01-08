import { useCallback, useRef } from 'react';

/**
 * Hook to play pleasant sounds for cart interactions
 * Uses Web Audio API to generate nice sounds
 */
export const useAddToCartSound = () => {
    const audioContextRef = useRef<AudioContext | null>(null);

    const getAudioContext = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        return audioContextRef.current;
    }, []);

    const playSound = useCallback(() => {
        try {
            const audioContext = getAudioContext();
            const currentTime = audioContext.currentTime;

            // chord (G5)
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(783.99, currentTime); // G5

            gainNode.gain.setValueAtTime(0, currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.3);

            oscillator.start(currentTime);
            oscillator.stop(currentTime + 0.3);

        } catch (error) {
            console.warn('Failed to play add to cart sound:', error);
        }
    }, [getAudioContext]);

    const playSuccessSound = useCallback(() => {
        try {
            const audioContext = getAudioContext();
            const currentTime = audioContext.currentTime;

            // Create a success chord with multiple frequencies
            const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5 (C major chord)

            frequencies.forEach((freq, index) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(freq, currentTime);

                const startDelay = index * 0.05;
                const startTime = currentTime + startDelay;

                gainNode.gain.setValueAtTime(0, startTime);
                gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.02);
                gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.6);

                oscillator.start(startTime);
                oscillator.stop(startTime + 0.6);
            });

            const sparkle = audioContext.createOscillator();
            const sparkleGain = audioContext.createGain();

            sparkle.connect(sparkleGain);
            sparkleGain.connect(audioContext.destination);

            sparkle.type = 'sine';
            sparkle.frequency.setValueAtTime(2093, currentTime + 0.1); // C7
            sparkle.frequency.exponentialRampToValueAtTime(3136, currentTime + 0.2); // G7

            sparkleGain.gain.setValueAtTime(0, currentTime + 0.1);
            sparkleGain.gain.linearRampToValueAtTime(0.1, currentTime + 0.12);
            sparkleGain.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.4);

            sparkle.start(currentTime + 0.1);
            sparkle.stop(currentTime + 0.4);

        } catch (error) {
            console.warn('Failed to play success sound:', error);
        }
    }, [getAudioContext]);

    return { playSound, playSuccessSound };
};
