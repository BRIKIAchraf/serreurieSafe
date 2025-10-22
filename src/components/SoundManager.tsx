import React, { createContext, useContext, useCallback } from 'react';

interface SoundContextType {
  playKeySound: () => void;
  playGearSound: () => void;
  playClickSound: () => void;
  playUnlockSound: () => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export const useSounds = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSounds must be used within a SoundProvider');
  }
  return context;
};

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Création des sons avec Web Audio API
  const createSound = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.log('Audio not supported');
    }
  }, []);

  const playKeySound = useCallback(() => {
    // Son de clé métallique
    createSound(800, 0.1, 'square');
    setTimeout(() => createSound(600, 0.1, 'square'), 50);
  }, [createSound]);

  const playGearSound = useCallback(() => {
    // Son d'engrenage mécanique
    createSound(200, 0.3, 'sawtooth');
    setTimeout(() => createSound(250, 0.2, 'sawtooth'), 100);
  }, [createSound]);

  const playClickSound = useCallback(() => {
    // Son de clic métallique
    createSound(1000, 0.05, 'square');
  }, [createSound]);

  const playUnlockSound = useCallback(() => {
    // Son de déverrouillage
    createSound(400, 0.1, 'sine');
    setTimeout(() => createSound(600, 0.1, 'sine'), 100);
    setTimeout(() => createSound(800, 0.1, 'sine'), 200);
  }, [createSound]);

  return (
    <SoundContext.Provider value={{
      playKeySound,
      playGearSound,
      playClickSound,
      playUnlockSound,
    }}>
      {children}
    </SoundContext.Provider>
  );
};