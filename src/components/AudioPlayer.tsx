import React, { useEffect, useRef } from 'react';

interface AudioPlayerProps {
  trackId: string;
  isPlaying: boolean;
  onTogglePlay?: (play: boolean) => void;
}

export interface SoundTrackDef {
  id: string;
  name: string;
  type: 'mp3';
  url: string;
  desc: string;
}

// Single high-quality romantic/indie folk birthday song requested by user
export const SOUNDS: SoundTrackDef[] = [
  {
    id: "monk-turner-birthday",
    name: "🎉 It's Your Birthday - Monk Turner",
    type: "mp3",
    url: "https://raw.githubusercontent.com/hunnuramitsing-source/24bday/0e46d11db05386cc6bd0935701cb0111d333b9a3/Bairan%20-%20djworld.mp3",
    desc: "Bright indie folk acoustic celebration"
  }
];

export default function AudioPlayer({ isPlaying }: AudioPlayerProps) {
  const currentTrack = SOUNDS[0];
  const audioElRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Beautiful default volume set to 0.7 for bright acoustic audio presence
    const volumeLevel = 0.7;

    if (isPlaying) {
      if (!audioElRef.current) {
        audioElRef.current = new Audio(currentTrack.url);
        audioElRef.current.loop = true;
        audioElRef.current.crossOrigin = 'anonymous';
      }

      audioElRef.current.volume = volumeLevel;
      audioElRef.current.play().catch((err) => {
        console.warn('Silent tap auto-playback blocked or failed', err);
      });
    } else {
      if (audioElRef.current) {
        audioElRef.current.pause();
      }
    }

    return () => {
      if (audioElRef.current) {
        audioElRef.current.pause();
      }
    };
  }, [isPlaying, currentTrack]);

  // Completely hidden container with no graphic controls on-screen as requested
  return null;
}
