/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import streetBgUrl from './assets/images/battle_arena_street_1792947360218.jpg';
import volcanoBgUrl from './assets/images/arena_volcanic_temple_1792948162772.jpg';
import rooftopBgUrl from './assets/images/arena_rooftop_storm_1792948193530.jpg';
import {
  Swords,
  RotateCcw,
  Volume2,
  VolumeX,
  Play,
  Flame,
  Zap,
  Mountain,
  Droplets,
  Shield,
  Pause,
  ArrowRight,
  Sparkles,
  MapPin,
  Music,
  Dices,
  Skull,
  Bot,
  User,
  Clock,
  Trophy,
  ChevronRight,
  ChevronLeft,
  Target,
  RefreshCw,
  HeartPulse,
  Activity,
  Maximize,
  Minimize,
  Settings,
  Award,
  LogOut,
  Sliders,
  Check,
  X,
  Radio,
  Gamepad2,
  Repeat,
  Users,
  Box
} from 'lucide-react';

// Character Definitions
export interface CharacterMove {
  name: string;
  hebrewName: string;
  element: string;
  desc: string;
}

export interface CharacterDef {
  id: string;
  name: string;
  hebrewName: string;
  title: string;
  element: string;
  element1: string;
  element2: string;
  themeColor: string;
  secondaryColor: string;
  imageSrc: string;
  spriteSrc: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  // 2 Light Attacks (1 per element)
  lightAttack1: CharacterMove;
  lightAttack2: CharacterMove;
  // 2 Heavy Attacks (1 per element)
  heavyAttack1: CharacterMove;
  heavyAttack2: CharacterMove;
  // 1 Signature Ultimate
  ultimate: CharacterMove;
  // Legacy labels
  lightAttackName: string;
  heavyAttackName: string;
  ultimateName: string;
  projectileType: 'lightning' | 'fireball' | 'crystal' | 'water';
  stats: {
    power: number;
    speed: number;
    defense: number;
  };
}

/* =========================================================================================
 * 🎨 CUSTOM CHARACTER SPRITE SHEETS & ANIMATION FRAMES CONFIGURATION
 * -----------------------------------------------------------------------------------------
 * PASTE YOUR CUSTOM SPRITE SHEET OR FRAME IMAGE URLs/PATHS HERE!
 * You can provide an image URL string or an array of image URL strings for each state:
 * - idle: Resting stance animation frames
 * - walk: Walking / running frames
 * - attack: Light attack frames (punches / kicks)
 * - heavy: Heavy elemental attack frames
 * - hurt: Hitstun / damage taken frames
 * - block: Shield / blocking frames
 * - ultimate: Ultimate attack frames
 *
 * Defaults now use authentic, transparent 2D fighting game character sprites of the 4 friends!
 * ========================================================================================= */
export interface SpriteActionFrames {
  idle?: string | string[];
  walk?: string | string[];
  attack?: string | string[];
  heavy?: string | string[];
  hurt?: string | string[];
  block?: string | string[];
  ultimate?: string | string[];
}

export const CUSTOM_SPRITE_SHEETS: Record<string, SpriteActionFrames> = {
  // Ivan - Lightning & Wind
  ivan: {
    idle: '/assets/sprites/ivan_sprite.png',
  },
  // Idan - Fire & Darkness
  idan: {
    idle: '/assets/sprites/idan_sprite.png',
  },
  // Philip - Light & Earth
  philip: {
    idle: '/assets/sprites/philip_sprite.png',
  },
  // Roni - Water & Blood
  roni: {
    idle: '/assets/sprites/roni_sprite.png',
  },
};

export const CHARACTERS: CharacterDef[] = [
  {
    id: 'ivan',
    name: 'Ivan',
    hebrewName: 'Ivan',
    title: 'The Tempest Sovereign',
    element: 'Thunder & Gale',
    element1: 'Gale',
    element2: 'Thunder',
    themeColor: '#38bdf8',
    secondaryColor: '#60a5fa',
    imageSrc: '/assets/aistudio/_____70edfa9b.jpeg',
    spriteSrc: '/assets/sprites/ivan_sprite.png',
    icon: Zap,
    description: 'Controls living thunderbolts and devastating gale whirlwinds with lightning-fast agility.',
    lightAttack1: {
      name: 'Wind Blade Slash',
      hebrewName: 'Wind Blade',
      element: 'Gale',
      desc: 'Swift turquoise razor wind slash.'
    },
    lightAttack2: {
      name: 'Thunder Jab',
      hebrewName: 'Thunder Jab',
      element: 'Thunder',
      desc: 'Electrified rapid straight punch with stunning sparks.'
    },
    heavyAttack1: {
      name: 'Gale Hurricane Blast',
      hebrewName: 'Gale Blast',
      element: 'Gale',
      desc: 'Violent tempest gust pushing and knocking the opponent backward.'
    },
    heavyAttack2: {
      name: 'Sky Lightning Crash',
      hebrewName: 'Sky Lightning',
      element: 'Thunder',
      desc: 'Massive bolt of thunder descending from the heavens.'
    },
    ultimate: {
      name: 'Thunderstorm Tornado',
      hebrewName: 'Thunderstorm Tornado',
      element: 'Thunder & Gale',
      desc: 'Summons a colossal cyclone charged with catastrophic lightning strikes.'
    },
    lightAttackName: 'Gale: Wind Blade | Thunder: Thunder Jab',
    heavyAttackName: 'Gale: Hurricane Blast | Thunder: Sky Lightning',
    ultimateName: 'Thunderstorm Tornado',
    projectileType: 'lightning',
    stats: { power: 8, speed: 10, defense: 7 }
  },
  {
    id: 'idan',
    name: 'Idan',
    hebrewName: 'Idan',
    title: 'Fist of the Abyssal Flame',
    element: 'Hellfire & Nether Void',
    element1: 'Hellfire',
    element2: 'Nether Void',
    themeColor: '#f97316',
    secondaryColor: '#ef4444',
    imageSrc: '/assets/aistudio/_____b3da8735.jpeg',
    spriteSrc: '/assets/sprites/idan_sprite.png',
    icon: Flame,
    description: 'Fierce brawler wielding Nether hellfire and dark gravitational void energy.',
    lightAttack1: {
      name: 'Fire Spark Jab',
      hebrewName: 'Fire Spark',
      element: 'Hellfire',
      desc: 'Rapid flaming strike releasing blazing orange embers.'
    },
    lightAttack2: {
      name: 'Dark Shadow Claw',
      hebrewName: 'Dark Claw',
      element: 'Nether Void',
      desc: 'Dark void claw slash enveloped in a shadowy purple aura.'
    },
    heavyAttack1: {
      name: 'Hellfire Blast',
      hebrewName: 'Hellfire Blast',
      element: 'Hellfire',
      desc: 'Erupting inferno fireball detonating in roaring flames.'
    },
    heavyAttack2: {
      name: 'Abyssal Void Slam',
      hebrewName: 'Void Slam',
      element: 'Nether Void',
      desc: 'Gravitational shockwave crushing the opponent to the ground.'
    },
    ultimate: {
      name: 'Nether Dark Void Nova',
      hebrewName: 'Dark Void Nova',
      element: 'Hellfire & Nether Void',
      desc: 'Unleashes a dark void sphere encased in roaring hellfire that obliterates everything.'
    },
    lightAttackName: 'Hellfire: Spark Jab | Void: Shadow Claw',
    heavyAttackName: 'Hellfire: Inferno Blast | Void: Abyssal Slam',
    ultimateName: 'Nether Dark Void Nova',
    projectileType: 'fireball',
    stats: { power: 10, speed: 7, defense: 8 }
  },
  {
    id: 'philip',
    name: 'Philip',
    hebrewName: 'Philip',
    title: 'Titan of Sun and Crystal',
    element: 'Solar Light & Earth Crystal',
    element1: 'Solar Light',
    element2: 'Earth Crystal',
    themeColor: '#eab308',
    secondaryColor: '#f59e0b',
    imageSrc: '/assets/aistudio/______9c89476b.jpeg',
    spriteSrc: '/assets/sprites/philip_sprite.png',
    icon: Mountain,
    description: 'Combines ancient geo-crystal resilience and blazing solar radiation with impenetrable defense.',
    lightAttack1: {
      name: 'Solar Flash Strike',
      hebrewName: 'Solar Flash',
      element: 'Solar Light',
      desc: 'Blinding golden light punch with dazzling solar rays.'
    },
    lightAttack2: {
      name: 'Crystal Stone Kick',
      hebrewName: 'Crystal Kick',
      element: 'Earth Crystal',
      desc: 'Heavy geo-kick scattering sharp crystal shards.'
    },
    heavyAttack1: {
      name: 'Radiant Light Pillar',
      hebrewName: 'Light Pillar',
      element: 'Solar Light',
      desc: 'Blazing pillar of solar energy striking from the heavens.'
    },
    heavyAttack2: {
      name: 'Earth Crystal Geyser',
      hebrewName: 'Crystal Geyser',
      element: 'Earth Crystal',
      desc: 'Sharp crystal stalagmites erupting from the arena floor.'
    },
    ultimate: {
      name: 'Hyper Solar Beam',
      hebrewName: 'Hyper Solar Beam',
      element: 'Solar Light & Earth Crystal',
      desc: 'Fires a colossal focused beam of pure sunlight piercing across the entire battlefield.'
    },
    lightAttackName: 'Solar: Flash Strike | Crystal: Stone Kick',
    heavyAttackName: 'Solar: Light Pillar | Crystal: Earth Geyser',
    ultimateName: 'Hyper Solar Beam',
    projectileType: 'crystal',
    stats: { power: 9, speed: 6, defense: 10 }
  },
  {
    id: 'roni',
    name: 'Roni',
    hebrewName: 'Roni',
    title: 'Lord of Torrent and Blood',
    element: 'Water & Crimson Blood',
    element1: 'Water',
    element2: 'Crimson Blood',
    themeColor: '#06b6d4',
    secondaryColor: '#e11d48',
    imageSrc: '/assets/aistudio/_____d5c8a85b.jpeg',
    spriteSrc: '/assets/sprites/roni_sprite.png',
    icon: Droplets,
    description: 'Master of fluid oceanic torrents and lethal piercing crimson blood blades.',
    lightAttack1: {
      name: 'Aqua Jet Whip',
      hebrewName: 'Aqua Whip',
      element: 'Water',
      desc: 'High-pressure cyan water whip strike.'
    },
    lightAttack2: {
      name: 'Blood Needle Pierce',
      hebrewName: 'Blood Needle',
      element: 'Crimson Blood',
      desc: 'Swift crimson needle piercing through enemy defenses.'
    },
    heavyAttack1: {
      name: 'Tsunami Wave Crash',
      hebrewName: 'Tsunami Wave',
      element: 'Water',
      desc: 'Crushing tidal wave rolling across the battlefield.'
    },
    heavyAttack2: {
      name: 'Crimson Blood Scythe',
      hebrewName: 'Blood Scythe',
      element: 'Crimson Blood',
      desc: 'Spinning scythe of boiling crimson blood slicing the opponent.'
    },
    ultimate: {
      name: 'Blood Hydro Piercing Arrow',
      hebrewName: 'Hydro Blood Arrow',
      element: 'Water & Crimson Blood',
      desc: 'Fires a giant piercing water arrow surrounded by double-helix blood spirals.'
    },
    lightAttackName: 'Water: Aqua Whip | Blood: Needle Pierce',
    heavyAttackName: 'Water: Tsunami Wave | Blood: Blood Scythe',
    ultimateName: 'Blood Hydro Piercing Arrow',
    projectileType: 'water',
    stats: { power: 9, speed: 8, defense: 8 }
  }
];

// Pre-cached Fighter Image & Sprite Asset Cache for Instant Tag Switching
export interface FighterCachedAssets {
  image: HTMLImageElement;
  sprite: HTMLImageElement;
  customSprites: {
    idle: HTMLImageElement[];
    walk: HTMLImageElement[];
    attack: HTMLImageElement[];
    heavy: HTMLImageElement[];
    hurt: HTMLImageElement[];
    block: HTMLImageElement[];
    ultimate: HTMLImageElement[];
  };
}

export const FIGHTER_ASSET_CACHE: Record<string, FighterCachedAssets> = {};

export function preloadAllFighterAssets() {
  if (typeof window === 'undefined') return;

  const loadList = (items?: string | string[]): HTMLImageElement[] => {
    if (!items) return [];
    const arr = Array.isArray(items) ? items : [items];
    return arr
      .filter((src) => typeof src === 'string' && src.trim().length > 0)
      .map((src) => {
        const img = new Image();
        img.src = src;
        return img;
      });
  };

  CHARACTERS.forEach((char) => {
    if (!FIGHTER_ASSET_CACHE[char.id]) {
      const img = new Image();
      img.src = char.imageSrc;

      const spr = new Image();
      spr.src = char.spriteSrc;

      const config = CUSTOM_SPRITE_SHEETS[char.id] || {};
      const customSprites = {
        idle: loadList(config.idle),
        walk: loadList(config.walk),
        attack: loadList(config.attack),
        heavy: loadList(config.heavy),
        hurt: loadList(config.hurt),
        block: loadList(config.block),
        ultimate: loadList(config.ultimate),
      };

      FIGHTER_ASSET_CACHE[char.id] = {
        image: img,
        sprite: spr,
        customSprites,
      };
    }
  });
}

if (typeof window !== 'undefined') {
  preloadAllFighterAssets();
}

// Arena Stages
export interface StageDef {
  id: string;
  name: string;
  hebrewName: string;
  description: string;
  bgUrl: string;
  themeColor: string;
}

export const STAGES: StageDef[] = [
  {
    id: 'neo_tokyo',
    name: 'Neo-Tokyo Alley',
    hebrewName: 'Neo-Tokyo Alley',
    description: 'Urban street alley with glowing neon signs, light rain, and wet asphalt.',
    bgUrl: streetBgUrl,
    themeColor: '#38bdf8'
  },
  {
    id: 'volcano_dojo',
    name: 'Infernal Lava Temple',
    hebrewName: 'Infernal Lava Temple',
    description: 'Ancient stone sanctuary surrounded by bubbling magma, embers, and dark obsidian pillars.',
    bgUrl: volcanoBgUrl,
    themeColor: '#f97316'
  },
  {
    id: 'thunder_rooftop',
    name: 'Storm Rooftop Helipad',
    hebrewName: 'Storm Rooftop Helipad',
    description: 'Skyscraper helipad caught in a catastrophic thunderstorm with howling winds and thunder.',
    bgUrl: rooftopBgUrl,
    themeColor: '#eab308'
  }
];

// Anime OST Tracks Definition (Real Audio Tracks)
export interface AnimeOSTTrack {
  id: string;
  title: string;
  animeName: string;
  artistDesc: string;
  srcUrls: string[];
}

export const ANIME_OST_TRACKS: AnimeOSTTrack[] = [
  {
    id: 'one_piece_we_are',
    title: 'One Piece: We Are! (Opening 1)',
    animeName: 'One Piece',
    artistDesc: 'Legendary Opening performed by Hiroshi Kitadani',
    srcUrls: [
      'https://archive.org/download/tvtunes_20333/One%20Piece%20-%20We%20Are%20-%20Full.mp3',
      'https://v.animethemes.moe/OnePiece-OP1.webm'
    ]
  },
  {
    id: 'one_piece_overtaken',
    title: 'One Piece: Overtaken (Walk to Arlong Park Theme)',
    animeName: 'One Piece',
    artistDesc: 'Iconic battle march theme with epic horns and drums',
    srcUrls: [
      'https://archive.org/download/youtube-daFi4MScfl8/daFi4MScfl8.mp4',
      'https://archive.org/download/Overtaken/Overtaken.mp3'
    ]
  },
  {
    id: 'fairy_tail_main',
    title: 'Fairy Tail: Main Battle Theme (Yasuharu Takanashi)',
    animeName: 'Fairy Tail',
    artistDesc: 'Official epic battle theme composed by Yasuharu Takanashi',
    srcUrls: [
      'https://archive.org/download/fairytailmainthememetalver./FAIRY%20TAIL%20Main%20Theme%20-METAL%20ver.-.mp3',
      'https://v.animethemes.moe/FairyTail-OP1.webm'
    ]
  },
  {
    id: 'demon_slayer',
    title: 'Demon Slayer: Gurenge (LiSA)',
    animeName: 'Demon Slayer: Kimetsu no Yaiba',
    artistDesc: 'Official high-energy anime theme performed by LiSA',
    srcUrls: [
      'https://v.animethemes.moe/KimetsuNoYaiba-OP1.webm',
      'https://v.animethemes.moe/KimetsuNoYaiba-OP1-NCBD1080.webm'
    ]
  },
  {
    id: 'attack_on_titan',
    title: 'Attack on Titan: Guren no Yumiya (Linked Horizon)',
    animeName: 'Attack on Titan (Shingeki no Kyojin)',
    artistDesc: 'Epic orchestral battle anthem by Linked Horizon',
    srcUrls: [
      'https://archive.org/download/attack-on-titan-march-to-freedom/01%20Guren%20no%20Yumiya.mp3',
      'https://v.animethemes.moe/ShingekiNoKyojin-OP1.webm'
    ]
  }
];

// Synth Audio Engine for SFX
class ArcadeAudioEngine {
  private ctx: AudioContext | null = null;
  public soundEnabled: boolean = true;
  public sfxVolume: number = 0.8;

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, type: OscillatorType, duration: number, vol: number = 0.1) {
    if (!this.ctx || !this.soundEnabled) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol * this.sfxVolume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {}
  }

  playSelect() {
    this.playTone(660, 'sine', 0.08, 0.15);
  }

  playLockIn() {
    this.playTone(440, 'triangle', 0.08, 0.2);
    setTimeout(() => this.playTone(880, 'triangle', 0.2, 0.25), 80);
  }

  playDiceRoll() {
    this.playTone(400 + Math.random() * 400, 'sine', 0.05, 0.12);
  }

  playCoin() {
    this.playTone(987, 'sine', 0.08, 0.18);
    setTimeout(() => this.playTone(1318, 'sine', 0.28, 0.22), 80);
  }

  playLightAttack(step: number = 1) {
    if (!this.soundEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      const baseFreq = step === 2 ? 420 : 320;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.12);
      gain.gain.setValueAtTime(0.24 * this.sfxVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch {}
  }

  playHeavyAttack() {
    if (!this.soundEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(700, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.28);
      gain.gain.setValueAtTime(0.35 * this.sfxVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.28);
    } catch {}
  }

  playUltimate() {
    if (!this.soundEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc1.type = 'sawtooth';
      osc2.type = 'square';
      osc1.frequency.setValueAtTime(120, now);
      osc1.frequency.exponentialRampToValueAtTime(900, now + 0.3);
      osc1.frequency.exponentialRampToValueAtTime(50, now + 1.2);
      osc2.frequency.setValueAtTime(240, now);
      osc2.frequency.linearRampToValueAtTime(1000, now + 0.3);
      osc2.frequency.exponentialRampToValueAtTime(35, now + 1.2);
      gain.gain.setValueAtTime(0.5 * this.sfxVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 1.2);
      osc2.start(now);
      osc2.stop(now + 1.2);
    } catch {}
  }

  playHit(isHeavy: boolean = false) {
    if (!this.soundEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(isHeavy ? 180 : 300, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + (isHeavy ? 0.28 : 0.18));
      gain.gain.setValueAtTime((isHeavy ? 0.45 : 0.32) * this.sfxVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + (isHeavy ? 0.28 : 0.18));
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + (isHeavy ? 0.28 : 0.18));
    } catch {}
  }

  playHeavyHit() {
    this.playHit(true);
  }

  playBlock() {
    if (!this.soundEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc1.type = 'square';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(950, now);
      osc1.frequency.exponentialRampToValueAtTime(1700, now + 0.1);
      osc2.frequency.setValueAtTime(480, now);
      osc2.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
      gain.gain.setValueAtTime(0.3 * this.sfxVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.12);
      osc2.start(now);
      osc2.stop(now + 0.12);
    } catch {}
  }

  playDash() {
    if (!this.soundEnabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(340, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(640, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.18 * this.sfxVolume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {}
  }

  speakAnnouncer(text: string, pitch: number = 0.82, rate: number = 0.88) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !this.soundEnabled) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = rate;
      u.pitch = pitch;
      u.volume = 1.0;
      const voices = window.speechSynthesis.getVoices();
      const enVoice = voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Male') || v.name.includes('Google') || v.name.includes('David') || v.name.includes('Natural')));
      if (enVoice) u.voice = enVoice;
      window.speechSynthesis.speak(u);
    } catch {}
  }

  playFightIntro() {
    if (!this.soundEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Resonant Taiko Gong
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(140, now);
      osc1.frequency.exponentialRampToValueAtTime(32, now + 1.2);
      gain1.gain.setValueAtTime(0.7 * this.sfxVolume, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 1.2);

      // Sharp metallic clang
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(880, now);
      osc2.frequency.exponentialRampToValueAtTime(220, now + 0.5);
      gain2.gain.setValueAtTime(0.4 * this.sfxVolume, now);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now);
      osc2.stop(now + 0.5);

      this.speakAnnouncer('ROUND ONE. FIGHT!', 0.85, 0.88);
    } catch {}
  }

  playHeartbeat() {
    if (!this.soundEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(65, now);
      osc1.frequency.exponentialRampToValueAtTime(28, now + 0.16);
      gain1.gain.setValueAtTime(0.55 * this.sfxVolume, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.16);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.16);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(55, now + 0.18);
      osc2.frequency.exponentialRampToValueAtTime(25, now + 0.36);
      gain2.gain.setValueAtTime(0.45 * this.sfxVolume, now + 0.18);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.36);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.18);
      osc2.stop(now + 0.36);
    } catch {}
  }

  playFinishHim() {
    this.playHeartbeat();
    this.speakAnnouncer('FINISH HIM!', 0.75, 0.82);
  }

  playFatality() {
    if (!this.soundEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(1400, now);
      osc1.frequency.exponentialRampToValueAtTime(120, now + 0.25);
      gain1.gain.setValueAtTime(0.6 * this.sfxVolume, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.25);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(95, now + 0.2);
      osc2.frequency.exponentialRampToValueAtTime(25, now + 1.8);
      gain2.gain.setValueAtTime(0.7 * this.sfxVolume, now + 0.2);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 1.8);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.2);
      osc2.stop(now + 1.8);

      setTimeout(() => {
        this.speakAnnouncer('FATALITY!', 0.72, 0.8);
      }, 350);
    } catch {}
  }

  playBrutality() {
    if (!this.soundEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      for (let i = 0; i < 5; i++) {
        const t = now + i * 0.07;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = i % 2 === 0 ? 'sawtooth' : 'square';
        osc.frequency.setValueAtTime(320 - i * 35, t);
        osc.frequency.exponentialRampToValueAtTime(45, t + 0.09);
        gain.gain.setValueAtTime(0.45 * this.sfxVolume, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.09);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.09);
      }

      const blastOsc = this.ctx.createOscillator();
      const blastGain = this.ctx.createGain();
      blastOsc.type = 'sawtooth';
      blastOsc.frequency.setValueAtTime(180, now + 0.38);
      blastOsc.frequency.exponentialRampToValueAtTime(28, now + 1.5);
      blastGain.gain.setValueAtTime(0.65 * this.sfxVolume, now + 0.38);
      blastGain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
      blastOsc.connect(blastGain);
      blastGain.connect(this.ctx.destination);
      blastOsc.start(now + 0.38);
      blastOsc.stop(now + 1.5);

      setTimeout(() => {
        this.speakAnnouncer('BRUTALITY!', 0.76, 0.85);
      }, 400);
    } catch {}
  }

  playFlawlessVictory(name: string) {
    setTimeout(() => {
      this.speakAnnouncer(`${name.toUpperCase()} WINS! FLAWLESS VICTORY!`, 0.8, 0.85);
    }, 1200);
  }

  speakCharacter(charId: string, text: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !this.soundEnabled) return;
    try {
      const u = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const enVoices = voices.filter((v) => v.lang.startsWith('en'));

      if (charId === 'idan') {
        u.pitch = 0.68;
        u.rate = 0.95;
        const v = enVoices.find((v) => v.name.includes('Male') || v.name.includes('David') || v.name.includes('James'));
        if (v) u.voice = v;
      } else if (charId === 'philip') {
        u.pitch = 0.88;
        u.rate = 0.92;
        const v = enVoices.find((v) => v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Alex'));
        if (v) u.voice = v;
      } else if (charId === 'ivan') {
        u.pitch = 1.12;
        u.rate = 1.05;
        const v = enVoices.find((v) => v.name.includes('George') || v.name.includes('Guy') || v.name.includes('Male'));
        if (v) u.voice = v;
      } else if (charId === 'roni') {
        u.pitch = 0.78;
        u.rate = 0.92;
        const v = enVoices.find((v) => v.name.includes('Mark') || v.name.includes('Daniel') || v.name.includes('Male'));
        if (v) u.voice = v;
      }
      u.volume = 1.0;
      window.speechSynthesis.speak(u);
    } catch {}
  }

  playTagSwitch() {
    this.playTone(520, 'sine', 0.1, 0.25);
    setTimeout(() => this.playTone(840, 'triangle', 0.18, 0.3), 70);
  }

  playAssistCall() {
    this.playTone(400, 'sawtooth', 0.08, 0.3);
    setTimeout(() => this.playTone(720, 'square', 0.15, 0.25), 60);
  }

  playPropThrow() {
    this.playTone(320, 'sawtooth', 0.12, 0.35);
  }

  playPropSmash() {
    if (!this.soundEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(260, now);
      osc1.frequency.exponentialRampToValueAtTime(30, now + 0.35);
      gain1.gain.setValueAtTime(0.7 * this.sfxVolume, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.35);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(950, now);
      osc2.frequency.exponentialRampToValueAtTime(140, now + 0.2);
      gain2.gain.setValueAtTime(0.4 * this.sfxVolume, now);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now);
      osc2.stop(now + 0.2);
    } catch {}
  }

  playKO() {
    if (!this.soundEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(40, now + 1.1);
      gain.gain.setValueAtTime(0.5 * this.sfxVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 1.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 1.1);
      this.speakAnnouncer('K.O.!', 0.85, 0.9);
    } catch {}
  }
}

const audio = new ArcadeAudioEngine();

export interface PreFightDialogue {
  p1Line: string;
  p2Line: string;
}

export const CHARACTER_DIALOGUES: { [p1Id: string]: { [p2Id: string]: PreFightDialogue } } = {
  idan: {
    philip: {
      p1Line: 'Your solar glow will drown inside my Nether Void, Philip!',
      p2Line: 'My blazing sun and sacred crystal will purge every shadow you cast, Idan!'
    },
    ivan: {
      p1Line: 'My nether hellfire only burns hotter from your gale winds, Ivan!',
      p2Line: 'My lightning bolts and cyclones will tear your flames to cinders, Idan!'
    },
    roni: {
      p1Line: 'Hellfire will boil your oceans and sear your blood to vapor, Roni!',
      p2Line: 'The crimson tide is rising, and tidal waters will quench your flame forever!'
    },
    idan: {
      p1Line: 'There is only room for one Nether sovereign in Squad Noobs!',
      p2Line: "Let's witness whose Dark Void Nova commands true supremacy!"
    }
  },
  philip: {
    idan: {
      p1Line: 'My blazing sun and sacred crystal will purge every shadow you cast, Idan!',
      p2Line: 'Your solar glow will drown inside my Nether Void, Philip!'
    },
    ivan: {
      p1Line: 'Crystal geysers will ground every stray thunderbolt you throw, Ivan!',
      p2Line: "Let's see if your earth can withstand a heavenly storm cyclone!"
    },
    roni: {
      p1Line: 'Solar radiance will evaporate water, and crystal shields shatter blood spears!',
      p2Line: 'My crimson water arrow will pierce right through your crystal armor!'
    },
    philip: {
      p1Line: 'Only one true Solar Titan shall reign over this arena!',
      p2Line: 'My crystal is refined and unbreakable. Prepare yourself!'
    }
  },
  ivan: {
    idan: {
      p1Line: 'My lightning bolts and cyclones will tear your flames to cinders, Idan!',
      p2Line: 'My nether hellfire only burns hotter from your gale winds, Ivan!'
    },
    philip: {
      p1Line: "Let's see if your earth can withstand a heavenly storm cyclone, Philip!",
      p2Line: 'Crystal geysers will ground every stray thunderbolt you throw, Ivan!'
    },
    roni: {
      p1Line: 'Lightning in water unleashes lethal shockwaves! You empower my thunder!',
      p2Line: 'My ocean depths will swallow your storm and drag you to the abyss!'
    },
    ivan: {
      p1Line: 'True heavenly thunder only strikes once — and that is me!',
      p2Line: 'My gale winds will disperse your storm into thin mist!'
    }
  },
  roni: {
    idan: {
      p1Line: 'The crimson tide is rising, and tidal waters will quench your flame forever!',
      p2Line: 'Hellfire will boil your oceans and sear your blood to vapor, Roni!'
    },
    philip: {
      p1Line: 'My crimson water arrow will pierce right through your crystal armor, Philip!',
      p2Line: 'Solar radiance will evaporate water, and crystal shields shatter blood spears!'
    },
    ivan: {
      p1Line: 'My ocean depths will swallow your storm and drag you to the abyss, Ivan!',
      p2Line: 'Lightning in water unleashes lethal shockwaves! You empower my thunder!'
    },
    roni: {
      p1Line: 'My blood runs faster and hotter than anything you have ever faced!',
      p2Line: 'Let us see whose torrent strikes the lethal blow first!'
    }
  }
};

// Interactive Stage Props System
export interface StageProp {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'generator' | 'dumpster' | 'magma_urn' | 'pillar' | 'radar_console' | 'fuel_crate';
  color: string;
  glowColor: string;
  isBroken: boolean;
  isFlying: boolean;
  vx: number;
  vy: number;
  thrownBy: 'p1' | 'p2' | null;
}

export const generateStageProps = (stageId: string, groundY: number): StageProp[] => {
  if (stageId === 'neo_tokyo') {
    return [
      {
        id: 'prop_gen',
        name: 'Neon Generator',
        x: 230,
        y: groundY - 65,
        width: 55,
        height: 65,
        type: 'generator',
        color: '#0284c7',
        glowColor: '#38bdf8',
        isBroken: false,
        isFlying: false,
        vx: 0,
        vy: 0,
        thrownBy: null
      },
      {
        id: 'prop_dump',
        name: 'Steel Dumpster',
        x: 740,
        y: groundY - 70,
        width: 65,
        height: 70,
        type: 'dumpster',
        color: '#334155',
        glowColor: '#64748b',
        isBroken: false,
        isFlying: false,
        vx: 0,
        vy: 0,
        thrownBy: null
      }
    ];
  } else if (stageId === 'volcano_dojo') {
    return [
      {
        id: 'prop_urn',
        name: 'Magma Fire Urn',
        x: 220,
        y: groundY - 60,
        width: 50,
        height: 60,
        type: 'magma_urn',
        color: '#b91c1c',
        glowColor: '#f97316',
        isBroken: false,
        isFlying: false,
        vx: 0,
        vy: 0,
        thrownBy: null
      },
      {
        id: 'prop_pillar',
        name: 'Obsidian Spire',
        x: 760,
        y: groundY - 95,
        width: 50,
        height: 95,
        type: 'pillar',
        color: '#1e1b4b',
        glowColor: '#7c3aed',
        isBroken: false,
        isFlying: false,
        vx: 0,
        vy: 0,
        thrownBy: null
      }
    ];
  } else {
    return [
      {
        id: 'prop_radar',
        name: 'Radar Terminal',
        x: 240,
        y: groundY - 75,
        width: 55,
        height: 75,
        type: 'radar_console',
        color: '#0369a1',
        glowColor: '#38bdf8',
        isBroken: false,
        isFlying: false,
        vx: 0,
        vy: 0,
        thrownBy: null
      },
      {
        id: 'prop_fuel',
        name: 'Hazard Fuel Crate',
        x: 750,
        y: groundY - 60,
        width: 60,
        height: 60,
        type: 'fuel_crate',
        color: '#ca8a04',
        glowColor: '#facc15',
        isBroken: false,
        isFlying: false,
        vx: 0,
        vy: 0,
        thrownBy: null
      }
    ];
  }
};

// Persistent Blood Decal on Ground
export interface BloodDecal {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  alpha: number;
  splatters: { dx: number; dy: number; r: number }[];
}

// Active Assist Partner Fighter
export interface ActiveAssistFighter {
  id: number;
  ownerId: 'p1' | 'p2';
  character: CharacterDef;
  x: number;
  y: number;
  vx: number;
  facing: 'left' | 'right';
  phase: 'ENTER' | 'ATTACK' | 'EXIT';
  timer: number;
  hasHit: boolean;
  elementColor: string;
}

// Projectile Definition
interface Projectile {
  id: number;
  x: number;
  y: number;
  vx: number;
  ownerId: 'p1' | 'p2';
  color: string;
  secondaryColor?: string;
  type:
    | 'lightning'
    | 'fireball'
    | 'crystal'
    | 'water'
    | 'darkness'
    | 'earth'
    | 'wind'
    | 'blood'
    | 'solar_beam'
    | 'void_nova'
    | 'tornado'
    | 'blood_arrow';
  attackKey: 'HEAVY_1' | 'HEAVY_2' | 'ULTIMATE';
  characterId: string;
  size: number;
  damage: number;
  isUltimate?: boolean;
  life: number;
  trail: { x: number; y: number }[];
}

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  decay: number;
  isBlood?: boolean;
}

interface ShockwaveRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  alpha: number;
}

interface GhostTrail {
  x: number;
  y: number;
  facing: 'left' | 'right';
  character: CharacterDef;
  alpha: number;
}

interface UltimateFieldEffect {
  ownerId: 'p1' | 'p2';
  character: CharacterDef;
  duration: number;
  maxDuration: number;
  x: number;
  y: number;
}

// ADVANCED COMBAT ENGINE TYPES: State Machine & Frame Data
export type AttackPhase = 'STARTUP' | 'ACTIVE' | 'RECOVERY' | 'NONE';

export interface AttackFrameData {
  startup: number;
  active: number;
  recovery: number;
  damage: number;
  hitStun: number;
  blockStun: number;
  knockbackX: number;
  knockbackY: number;
  hitStop: number;
  screenShake: number;
  chipPercent: number;
}

export const MAX_FIGHTER_HEALTH = 200;

export const ATTACK_FRAME_DATA: { [key: string]: AttackFrameData } = {
  LIGHT_1: {
    startup: 4,
    active: 3,
    recovery: 7,
    damage: 5,
    hitStun: 16,
    blockStun: 7,
    knockbackX: 3.5,
    knockbackY: 0,
    hitStop: 3,
    screenShake: 6,
    chipPercent: 0.15
  },
  LIGHT_2: {
    startup: 4,
    active: 3,
    recovery: 8,
    damage: 5,
    hitStun: 18,
    blockStun: 8,
    knockbackX: 5.0,
    knockbackY: -2.0,
    hitStop: 4,
    screenShake: 8,
    chipPercent: 0.15
  },
  HEAVY_1: {
    startup: 8,
    active: 5,
    recovery: 16,
    damage: 10,
    hitStun: 24,
    blockStun: 12,
    knockbackX: 8.5,
    knockbackY: -5.0,
    hitStop: 6,
    screenShake: 12,
    chipPercent: 0.18
  },
  HEAVY_2: {
    startup: 9,
    active: 6,
    recovery: 18,
    damage: 10,
    hitStun: 28,
    blockStun: 13,
    knockbackX: 10.5,
    knockbackY: -6.5,
    hitStop: 8,
    screenShake: 15,
    chipPercent: 0.20
  },
  ULTIMATE: {
    startup: 12,
    active: 14,
    recovery: 22,
    damage: 30,
    hitStun: 45,
    blockStun: 18,
    knockbackX: 16.0,
    knockbackY: -8.0,
    hitStop: 14,
    screenShake: 28,
    chipPercent: 0.25
  }
};

export type FighterAction =
  | 'IDLE'
  | 'RUN'
  | 'JUMP'
  | 'LIGHT_ATTACK_1'
  | 'LIGHT_ATTACK_2'
  | 'HEAVY_ATTACK_1'
  | 'HEAVY_ATTACK_2'
  | 'ULTIMATE'
  | 'HITSTUN'
  | 'BLOCKSTUN'
  | 'BLOCK'
  | 'DASH';

// Fighter Engine Class with Full Frame Data, Input Buffer, and Dynamic Hitboxes
class CanvasFighter {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  width: number = 85;
  height: number = 165;
  name: string;
  facing: 'left' | 'right';
  character: CharacterDef;
  image: HTMLImageElement | null = null;
  spriteImage: HTMLImageElement | null = null;

  speed: number = 6.8;
  jumpForce: number = -18;
  isGrounded: boolean = false;

  health: number = MAX_FIGHTER_HEALTH;
  maxHealth: number = MAX_FIGHTER_HEALTH;
  isDead: boolean = false;

  ultimateMeter: number = 0;

  action: FighterAction = 'IDLE';
  animFrame: number = 0;

  // Frame Data & Attack State Machine
  attackPhase: AttackPhase = 'NONE';
  phaseTimer: number = 0;
  currentAttackKey: 'LIGHT_1' | 'LIGHT_2' | 'HEAVY_1' | 'HEAVY_2' | 'ULTIMATE' | null = null;
  hasHitConnected: boolean = false;
  comboStep: number = 0;
  cancelWindowActive: boolean = false;

  // Hitstun & Blockstun
  hitStunDuration: number = 0;
  blockStunDuration: number = 0;
  isBlocking: boolean = false;

  // Dash & Movement
  isDashing: boolean = false;
  dashDuration: number = 0;
  dashCooldown: number = 0;
  isInvulnerable: boolean = false;

  // Dynamic Hitbox (Only active in ACTIVE frames)
  dynamicHitbox: {
    x: number;
    y: number;
    width: number;
    height: number;
    active: boolean;
  } = { x: 0, y: 0, width: 0, height: 0, active: false };

  // Input Buffer (Buffered commands execute as soon as fighter is free)
  inputBuffer: {
    command: 'LIGHT_1' | 'LIGHT_2' | 'HEAVY_1' | 'HEAVY_2' | 'ULTIMATE' | 'DASH_L' | 'DASH_R';
    ttl: number;
  }[] = [];

  heavyCooldown: number = 0;
  ghosts: GhostTrail[] = [];

  constructor({
    position,
    velocity,
    name,
    facing,
    character
  }: {
    position: { x: number; y: number };
    velocity: { x: number; y: number };
    name: string;
    facing: 'left' | 'right';
    character: CharacterDef;
  }) {
    this.position = { ...position };
    this.velocity = { ...velocity };
    this.name = name;
    this.facing = facing;
    this.character = character;
    this.loadImage();
    this.loadCustomSprites();
  }

  customSpriteImages: {
    idle: HTMLImageElement[];
    walk: HTMLImageElement[];
    attack: HTMLImageElement[];
    heavy: HTMLImageElement[];
    hurt: HTMLImageElement[];
    block: HTMLImageElement[];
    ultimate: HTMLImageElement[];
  } = {
    idle: [],
    walk: [],
    attack: [],
    heavy: [],
    hurt: [],
    block: [],
    ultimate: [],
  };

  loadCustomSprites() {
    const cached = FIGHTER_ASSET_CACHE[this.character.id];
    if (cached) {
      this.customSpriteImages = cached.customSprites;
      return;
    }

    const config = CUSTOM_SPRITE_SHEETS[this.character.id];
    if (!config) return;

    const loadList = (items?: string | string[]): HTMLImageElement[] => {
      if (!items) return [];
      const arr = Array.isArray(items) ? items : [items];
      return arr
        .filter((src) => typeof src === 'string' && src.trim().length > 0)
        .map((src) => {
          const img = new Image();
          img.src = src;
          return img;
        });
    };

    this.customSpriteImages = {
      idle: loadList(config.idle),
      walk: loadList(config.walk),
      attack: loadList(config.attack),
      heavy: loadList(config.heavy),
      hurt: loadList(config.hurt),
      block: loadList(config.block),
      ultimate: loadList(config.ultimate),
    };
  }

  loadImage() {
    const cached = FIGHTER_ASSET_CACHE[this.character.id];
    if (cached) {
      this.image = cached.image;
      this.spriteImage = cached.sprite;
      return;
    }

    const img = new Image();
    img.src = this.character.imageSrc;
    this.image = img;

    const spr = new Image();
    spr.src = this.character.spriteSrc;
    this.spriteImage = spr;
  }

  setCharacter(char: CharacterDef) {
    this.character = char;
    this.loadImage();
    this.loadCustomSprites();
  }

  addUltimate(amount: number) {
    this.ultimateMeter = Math.min(100, this.ultimateMeter + amount);
  }

  // Buffer an input command for fluid execution
  bufferInput(command: 'LIGHT_1' | 'LIGHT_2' | 'HEAVY_1' | 'HEAVY_2' | 'ULTIMATE' | 'DASH_L' | 'DASH_R') {
    this.inputBuffer.push({ command, ttl: 12 }); // 12-frame window
  }

  // Attack Initiators with Frame-Data State Machine
  startLightAttack(subType: 1 | 2 = 1) {
    if (this.isDead || this.hitStunDuration > 0 || this.blockStunDuration > 0 || this.isDashing) return;

    // Combo Chain logic: if already hit with Light 1, chaining goes to Light 2
    const attackKey: 'LIGHT_1' | 'LIGHT_2' =
      subType === 2 || (this.comboStep === 1 && this.cancelWindowActive) ? 'LIGHT_2' : 'LIGHT_1';
    const data = ATTACK_FRAME_DATA[attackKey];

    this.currentAttackKey = attackKey;
    this.action = attackKey === 'LIGHT_2' ? 'LIGHT_ATTACK_2' : 'LIGHT_ATTACK_1';
    this.attackPhase = 'STARTUP';
    this.phaseTimer = data.startup;
    this.hasHitConnected = false;
    this.cancelWindowActive = false;
    this.comboStep = attackKey === 'LIGHT_1' ? 1 : 2;

    audio.playLightAttack(attackKey === 'LIGHT_2' ? 2 : 1);
  }

  startHeavyAttack(
    subType: 1 | 2 = 1,
    spawnProjectile: (f: CanvasFighter, attackKey: 'HEAVY_1' | 'HEAVY_2' | 'ULTIMATE') => void
  ) {
    if (this.isDead || this.hitStunDuration > 0 || this.blockStunDuration > 0 || this.isDashing || this.heavyCooldown > 0) return;

    const attackKey: 'HEAVY_1' | 'HEAVY_2' = subType === 2 ? 'HEAVY_2' : 'HEAVY_1';
    const data = ATTACK_FRAME_DATA[attackKey];
    this.currentAttackKey = attackKey;
    this.action = attackKey === 'HEAVY_2' ? 'HEAVY_ATTACK_2' : 'HEAVY_ATTACK_1';
    this.attackPhase = 'STARTUP';
    this.phaseTimer = data.startup;
    this.hasHitConnected = false;
    this.cancelWindowActive = false;
    this.comboStep = 0; // Finisher
    this.heavyCooldown = 38;

    audio.playHeavyAttack();
    spawnProjectile(this, attackKey);
  }

  startUltimateAttack(
    spawnProjectile: (f: CanvasFighter, attackKey: 'HEAVY_1' | 'HEAVY_2' | 'ULTIMATE') => void,
    triggerFieldEffect: (f: CanvasFighter) => void,
    force: boolean = false
  ): boolean {
    if ((!force && this.ultimateMeter < 100) || this.isDead || this.hitStunDuration > 0 || this.blockStunDuration > 0 || this.isDashing) {
      return false;
    }

    const data = ATTACK_FRAME_DATA.ULTIMATE;
    this.ultimateMeter = 0;
    this.currentAttackKey = 'ULTIMATE';
    this.action = 'ULTIMATE';
    this.attackPhase = 'STARTUP';
    this.phaseTimer = data.startup;
    this.hasHitConnected = false;
    this.cancelWindowActive = false;
    this.comboStep = 0;

    audio.playUltimate();
    spawnProjectile(this, 'ULTIMATE');
    triggerFieldEffect(this);
    return true;
  }

  block(active: boolean) {
    if (this.isDead || this.isDashing || this.hitStunDuration > 0) {
      this.isBlocking = false;
      return;
    }
    this.isBlocking = active;
    if (active && this.attackPhase === 'NONE' && this.blockStunDuration <= 0) {
      this.action = 'BLOCK';
    }
  }

  dash(direction: 'left' | 'right') {
    if (this.dashCooldown > 0 || this.isDead || this.hitStunDuration > 0 || this.blockStunDuration > 0 || this.isBlocking) return;
    this.isDashing = true;
    this.action = 'DASH';
    this.dashDuration = 12;
    this.dashCooldown = 26;
    this.isInvulnerable = true;
    this.attackPhase = 'NONE';
    this.currentAttackKey = null;

    const dir = direction === 'right' ? 1 : -1;
    this.velocity.x = dir * 18;
    audio.playDash();
  }

  takeHit(
    damage: number,
    hitStun: number,
    blockStun: number,
    knockbackX: number,
    knockbackY: number,
    attackerX: number,
    onHitCallback: (x: number, y: number, isBlocked: boolean) => void
  ) {
    if (this.isDead || this.isInvulnerable) return;

    const knockDir = this.position.x < attackerX ? -1 : 1;

    if (this.isBlocking) {
      // BLOCKSTUN & CHIP DAMAGE
      const chipDamage = Math.max(1, Math.round(damage * 0.15));
      this.health = Math.max(0, this.health - chipDamage);
      this.blockStunDuration = blockStun;
      this.action = 'BLOCKSTUN';
      this.attackPhase = 'NONE';
      this.currentAttackKey = null;

      this.velocity.x = knockDir * 3.0;
      audio.playBlock();
      onHitCallback(this.position.x + this.width / 2, this.position.y + 45, true);
      return;
    }

    // UNBLOCKED HIT: Full HITSTUN & Knockback
    this.health = Math.max(0, this.health - damage);
    this.hitStunDuration = hitStun;
    this.action = 'HITSTUN';
    this.attackPhase = 'NONE';
    this.currentAttackKey = null;
    this.comboStep = 0;

    this.velocity.x = knockDir * knockbackX;
    this.velocity.y = knockbackY;

    audio.playHit(damage > 15);
    onHitCallback(this.position.x + this.width / 2, this.position.y + 45, false);

    if (this.health <= 0) {
      this.isDead = true;
      audio.playKO();
    }
  }

  update(
    groundY: number,
    canvasWidth: number,
    gravity: number,
    spawnProjectile: (f: CanvasFighter, attackKey: 'HEAVY_1' | 'HEAVY_2' | 'ULTIMATE') => void,
    triggerFieldEffect: (f: CanvasFighter) => void
  ) {
    this.animFrame++;

    // 1. Process Input Buffer
    for (let i = this.inputBuffer.length - 1; i >= 0; i--) {
      this.inputBuffer[i].ttl--;
      if (this.inputBuffer[i].ttl <= 0) {
        this.inputBuffer.splice(i, 1);
        continue;
      }

      // Check if fighter is ready or in cancellable recovery window
      const canAct =
        this.hitStunDuration <= 0 &&
        this.blockStunDuration <= 0 &&
        !this.isDashing &&
        (this.attackPhase === 'NONE' || this.cancelWindowActive);

      if (canAct) {
        const cmd = this.inputBuffer.splice(i, 1)[0].command;
        if (cmd === 'LIGHT_1') this.startLightAttack(1);
        else if (cmd === 'LIGHT_2') this.startLightAttack(2);
        else if (cmd === 'HEAVY_1') this.startHeavyAttack(1, spawnProjectile);
        else if (cmd === 'HEAVY_2') this.startHeavyAttack(2, spawnProjectile);
        else if (cmd === 'ULTIMATE') this.startUltimateAttack(spawnProjectile, triggerFieldEffect);
        else if (cmd === 'DASH_L') this.dash('left');
        else if (cmd === 'DASH_R') this.dash('right');
        break;
      }
    }

    // 2. Dash Update
    if (this.isDashing) {
      this.dashDuration--;
      if (this.animFrame % 2 === 0) {
        this.ghosts.push({
          x: this.position.x,
          y: this.position.y,
          facing: this.facing,
          character: this.character,
          alpha: 0.65
        });
      }
      if (this.dashDuration <= 0) {
        this.isDashing = false;
        this.isInvulnerable = false;
        this.velocity.x = 0;
      }
    }

    if (this.dashCooldown > 0) this.dashCooldown--;
    if (this.heavyCooldown > 0) this.heavyCooldown--;

    // 3. Hitstun & Blockstun Timers
    if (this.hitStunDuration > 0) {
      this.hitStunDuration--;
      if (this.hitStunDuration <= 0) {
        this.action = 'IDLE';
      }
    }

    if (this.blockStunDuration > 0) {
      this.blockStunDuration--;
      if (this.blockStunDuration <= 0) {
        this.action = this.isBlocking ? 'BLOCK' : 'IDLE';
      }
    }

    // 4. Attack State Machine Phase Progression (STARTUP -> ACTIVE -> RECOVERY)
    if (this.currentAttackKey) {
      const data = ATTACK_FRAME_DATA[this.currentAttackKey];
      this.phaseTimer--;

      if (this.attackPhase === 'STARTUP' && this.phaseTimer <= 0) {
        // Transition to ACTIVE
        this.attackPhase = 'ACTIVE';
        this.phaseTimer = data.active;
        this.dynamicHitbox.active = true;
      } else if (this.attackPhase === 'ACTIVE') {
        // Dynamic Hitbox tracking fighter
        const reach =
          this.currentAttackKey === 'ULTIMATE'
            ? 160
            : this.currentAttackKey === 'HEAVY_2'
            ? 130
            : this.currentAttackKey === 'HEAVY_1'
            ? 115
            : this.currentAttackKey === 'LIGHT_2'
            ? 95
            : 85;

        this.dynamicHitbox = {
          x: this.facing === 'right' ? this.position.x + this.width * 0.4 : this.position.x - reach + this.width * 0.6,
          y: this.position.y + 40,
          width: reach,
          height: 60,
          active: true
        };

        if (this.phaseTimer <= 0) {
          // Transition to RECOVERY
          this.attackPhase = 'RECOVERY';
          this.phaseTimer = data.recovery;
          this.dynamicHitbox.active = false;
          // Open combo cancel window on hit
          if (this.hasHitConnected) {
            this.cancelWindowActive = true;
          }
        }
      } else if (this.attackPhase === 'RECOVERY') {
        this.dynamicHitbox.active = false;
        if (this.phaseTimer <= 0) {
          // Return to IDLE
          this.attackPhase = 'NONE';
          this.currentAttackKey = null;
          this.cancelWindowActive = false;
          this.comboStep = 0;
          this.action = 'IDLE';
        }
      }
    } else {
      this.dynamicHitbox.active = false;
    }

    // 5. Ghost Afterimages Decay
    for (let i = this.ghosts.length - 1; i >= 0; i--) {
      this.ghosts[i].alpha -= 0.08;
      if (this.ghosts[i].alpha <= 0) {
        this.ghosts.splice(i, 1);
      }
    }

    // 6. Physics & Ground Collision
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= groundY) {
      this.velocity.y = 0;
      this.position.y = groundY - this.height;
      this.isGrounded = true;
    } else {
      this.velocity.y += gravity;
      this.isGrounded = false;
    }

    // Friction on horizontal velocity
    this.velocity.x *= 0.88;

    // Screen Bounds
    if (this.position.x < 15) this.position.x = 15;
    if (this.position.x + this.width > canvasWidth - 15) {
      this.position.x = canvasWidth - 15 - this.width;
    }

    // Set Baseline Action State
    if (this.isDead) {
      this.action = 'HITSTUN';
    } else if (this.hitStunDuration > 0) {
      this.action = 'HITSTUN';
    } else if (this.blockStunDuration > 0) {
      this.action = 'BLOCKSTUN';
    } else if (this.isDashing) {
      this.action = 'DASH';
    } else if (this.isBlocking) {
      this.action = 'BLOCK';
    } else if (this.currentAttackKey) {
      if (this.currentAttackKey === 'LIGHT_1') this.action = 'LIGHT_ATTACK_1';
      else if (this.currentAttackKey === 'LIGHT_2') this.action = 'LIGHT_ATTACK_2';
      else if (this.currentAttackKey === 'HEAVY_1') this.action = 'HEAVY_ATTACK_1';
      else if (this.currentAttackKey === 'HEAVY_2') this.action = 'HEAVY_ATTACK_2';
      else if (this.currentAttackKey === 'ULTIMATE') this.action = 'ULTIMATE';
    } else if (!this.isGrounded) {
      this.action = 'JUMP';
    } else if (Math.abs(this.velocity.x) > 0.4) {
      this.action = 'RUN';
    } else {
      this.action = 'IDLE';
    }
  }

  drawRealFighter(ctx: CanvasRenderingContext2D, w: number, h: number, _idleBob: number) {
    const char = this.character;
    const cid = char.id;
    const theme = char.themeColor;
    const secColor = char.secondaryColor;

    const isRunning = this.action === 'RUN';
    const isJumping = this.action === 'JUMP';
    const isBlocking = this.action === 'BLOCK' || this.action === 'BLOCKSTUN';
    const isDashing = this.action === 'DASH';
    const isHitstun = this.action === 'HITSTUN';
    const isUlt = this.action === 'ULTIMATE';
    const isLight1 = this.action === 'LIGHT_ATTACK_1';
    const isLight2 = this.action === 'LIGHT_ATTACK_2';
    const isHeavy1 = this.action === 'HEAVY_ATTACK_1';
    const isHeavy2 = this.action === 'HEAVY_ATTACK_2';

    // Real fighter transparent arcade sprite
    const sprite = this.spriteImage || this.image;
    const isReady = sprite && sprite.complete && sprite.naturalWidth > 0;

    // Sprite sizing: matches natural aspect ratio and stands firmly on the ground
    const spriteH = 175;
    const aspect = isReady && sprite ? sprite.naturalWidth / sprite.naturalHeight : 0.65;
    const spriteW = Math.round(spriteH * aspect);
    const spriteX = Math.round((w - spriteW) / 2);
    const spriteY = h - spriteH; // feet planted at floor line

    ctx.save();

    // Central transformation pivot
    const pivotX = w / 2;
    const pivotY = h * 0.62;

    // Kinematic Action Transforms
    if (isRunning) {
      const runCycle = Math.sin(this.animFrame * 0.35);
      ctx.translate(pivotX, pivotY);
      ctx.rotate(0.1);
      ctx.translate(-pivotX, -pivotY + Math.abs(runCycle) * -4);
    } else if (isJumping) {
      ctx.translate(pivotX, pivotY);
      ctx.scale(0.96, 1.04);
      ctx.translate(-pivotX, -pivotY);
    } else if (isDashing) {
      ctx.translate(pivotX, pivotY);
      ctx.rotate(0.24);
      ctx.translate(-pivotX + 10, -pivotY);
    } else if (isBlocking) {
      ctx.translate(pivotX, pivotY);
      ctx.rotate(-0.07);
      ctx.translate(-pivotX - 6, -pivotY);
    } else if (isHitstun) {
      ctx.translate(pivotX, pivotY);
      ctx.rotate(-0.25);
      ctx.translate(-pivotX - 14, -pivotY);
    } else if (isLight1) {
      if (this.attackPhase === 'STARTUP') {
        ctx.translate(-6, 0);
      } else if (this.attackPhase === 'ACTIVE') {
        ctx.translate(18, -2);
        ctx.rotate(0.04);
      } else {
        ctx.translate(6, 0);
      }
    } else if (isLight2) {
      if (this.attackPhase === 'STARTUP') {
        ctx.translate(-4, 0);
      } else if (this.attackPhase === 'ACTIVE') {
        ctx.translate(22, 2);
        ctx.rotate(0.12);
      } else {
        ctx.translate(8, 0);
      }
    } else if (isHeavy1) {
      if (this.attackPhase === 'STARTUP') {
        ctx.translate(-10, 4);
      } else if (this.attackPhase === 'ACTIVE') {
        ctx.translate(28, -2);
      } else {
        ctx.translate(10, 0);
      }
    } else if (isHeavy2) {
      if (this.attackPhase === 'STARTUP') {
        ctx.translate(-12, 6);
      } else if (this.attackPhase === 'ACTIVE') {
        ctx.translate(24, -8);
        ctx.rotate(-0.06);
      } else {
        ctx.translate(8, 0);
      }
    } else if (isUlt) {
      const floatBob = Math.sin(this.animFrame * 0.2) * 5;
      ctx.translate(0, -14 + floatBob);
    } else {
      // Idle breathing subtle scale
      const breathe = Math.sin(this.animFrame * 0.12) * 2;
      ctx.translate(pivotX, h);
      ctx.scale(1, 1 + breathe * 0.007);
      ctx.translate(-pivotX, -h);
    }

    // Elemental Ambient Body Aura
    ctx.save();
    const auraPulse = Math.sin(this.animFrame * 0.15) * 8 + (isUlt ? 30 : 12);
    ctx.shadowColor = isUlt ? secColor : theme;
    ctx.shadowBlur = auraPulse;
    ctx.strokeStyle = `rgba(${cid === 'idan' ? '249, 115, 22' : cid === 'ivan' ? '56, 189, 248' : cid === 'philip' ? '234, 179, 8' : '6, 182, 212'}, ${isUlt ? 0.75 : 0.28})`;
    ctx.lineWidth = isUlt ? 4.5 : 2;
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.52, w * 0.45 + (isUlt ? 14 : 0), h * 0.48 + (isUlt ? 14 : 0), 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // RENDER THE AUTHENTIC HUMAN FIGHTER SPRITE
    if (isReady && sprite) {
      ctx.drawImage(sprite, spriteX, spriteY, spriteW, spriteH);

      // Hitstun damage flash
      if (isHitstun) {
        ctx.save();
        ctx.globalCompositeOperation = 'source-atop';
        ctx.fillStyle = 'rgba(239, 68, 68, 0.65)';
        ctx.fillRect(spriteX, spriteY, spriteW, spriteH);
        ctx.restore();
      } else if (this.isInvulnerable) {
        ctx.save();
        ctx.globalCompositeOperation = 'source-atop';
        ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.fillRect(spriteX, spriteY, spriteW, spriteH);
        ctx.restore();
      } else if (isUlt) {
        ctx.save();
        ctx.globalCompositeOperation = 'source-atop';
        ctx.fillStyle = 'rgba(251, 191, 36, 0.22)';
        ctx.fillRect(spriteX, spriteY, spriteW, spriteH);
        ctx.restore();
      }
    } else {
      // Crisp fallback silhouette while asset finishes loading
      ctx.fillStyle = theme;
      ctx.beginPath();
      ctx.roundRect(spriteX, spriteY, spriteW, spriteH, 12);
      ctx.fill();
    }

    // Dynamic Strike VFX Overlays
    if (isLight1 && this.attackPhase === 'ACTIVE') {
      ctx.save();
      const fx = spriteX + spriteW * 0.85;
      const fy = spriteY + spriteH * 0.42;
      ctx.shadowColor = theme;
      ctx.shadowBlur = 18;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(fx, fy, 16, -0.8, 0.8);
      ctx.stroke();

      ctx.fillStyle = theme;
      ctx.beginPath();
      ctx.arc(fx + 6, fy, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    } else if (isLight2 && this.attackPhase === 'ACTIVE') {
      ctx.save();
      const fx = spriteX + spriteW * 0.9;
      const fy = spriteY + spriteH * 0.58;
      ctx.shadowColor = secColor;
      ctx.shadowBlur = 22;
      ctx.strokeStyle = secColor;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(fx - 15, fy, 32, -Math.PI * 0.35, Math.PI * 0.35);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(fx - 15, fy, 30, -Math.PI * 0.28, Math.PI * 0.28);
      ctx.stroke();
      ctx.restore();
    } else if ((isHeavy1 || isHeavy2) && this.attackPhase === 'STARTUP') {
      ctx.save();
      const cx = spriteX + spriteW * 0.7;
      const cy = spriteY + spriteH * 0.45;
      ctx.fillStyle = isHeavy2 ? secColor : theme;
      ctx.shadowColor = isHeavy2 ? secColor : theme;
      ctx.shadowBlur = 25;
      for (let i = 0; i < 6; i++) {
        const ang = this.animFrame * 0.3 + (i * Math.PI) / 3;
        const dist = 18 + Math.sin(this.animFrame * 0.4 + i) * 6;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(ang) * dist, cy + Math.sin(ang) * dist, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    } else if (isUlt) {
      ctx.save();
      const eyeX = spriteX + spriteW * 0.52;
      const eyeY = spriteY + spriteH * 0.17;
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 20;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(eyeX - 5, eyeY, 3, 0, Math.PI * 2);
      ctx.arc(eyeX + 5, eyeY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    ctx.restore(); // restore transform
  }

  draw(ctx: CanvasRenderingContext2D, groundY: number) {
    // 1. Dash Afterimage Ghosts
    for (const g of this.ghosts) {
      ctx.save();
      ctx.globalAlpha = g.alpha * 0.5;
      ctx.fillStyle = g.character.themeColor;
      ctx.shadowColor = g.character.themeColor;
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.ellipse(g.x + this.width / 2, g.y + this.height * 0.5, this.width * 0.42, this.height * 0.48, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 2. Realistic Ground Shadow
    ctx.save();
    const shadowDist = groundY - (this.position.y + this.height);
    const shadowScale = Math.max(0.4, 1 - shadowDist / 260);
    const shadowAlpha = Math.max(0.15, 0.45 - shadowDist / 350);
    ctx.fillStyle = `rgba(0, 0, 0, ${shadowAlpha})`;
    ctx.beginPath();
    ctx.ellipse(
      this.position.x + this.width / 2,
      groundY + 4,
      (this.width / 1.5) * shadowScale,
      12 * shadowScale,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.restore();

    // 3. Fighter Sprite Body
    ctx.save();
    let renderX = this.position.x;
    let renderY = this.position.y;
    const w = this.width;
    const h = this.height;

    const idleBob = this.action === 'IDLE' ? Math.sin(this.animFrame * 0.12) * 3 : 0;
    renderY += idleBob;

    if (this.facing === 'left') {
      ctx.translate(renderX + w, renderY);
      ctx.scale(-1, 1);
    } else {
      ctx.translate(renderX, renderY);
    }

    const theme = this.character.themeColor;
    const secColor = this.character.secondaryColor;

    // Charging Aura for Heavy & Ultimate
    if (this.action === 'ULTIMATE' || this.action === 'HEAVY_ATTACK_1' || this.action === 'HEAVY_ATTACK_2') {
      ctx.save();
      ctx.shadowColor = this.action === 'HEAVY_ATTACK_2' ? secColor : theme;
      ctx.shadowBlur = 35;
      ctx.strokeStyle = this.action === 'HEAVY_ATTACK_2' ? secColor : theme;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.ellipse(w * 0.45, h * 0.5, w * 0.55, h * 0.52, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // Check if custom sprite frames are configured for the current fighter action
    let customList: HTMLImageElement[] | undefined;
    if (this.action === 'IDLE') customList = this.customSpriteImages.idle;
    else if (this.action === 'RUN' || this.action === 'DASH') customList = this.customSpriteImages.walk;
    else if (this.action === 'LIGHT_ATTACK_1' || this.action === 'LIGHT_ATTACK_2') customList = this.customSpriteImages.attack;
    else if (this.action === 'HEAVY_ATTACK_1' || this.action === 'HEAVY_ATTACK_2') customList = this.customSpriteImages.heavy;
    else if (this.action === 'ULTIMATE') customList = this.customSpriteImages.ultimate;
    else if (this.action === 'HITSTUN') customList = this.customSpriteImages.hurt;
    else if (this.action === 'BLOCK' || this.action === 'BLOCKSTUN') customList = this.customSpriteImages.block;

    const validCustomFrames = (customList || []).filter((im) => im.complete && im.naturalWidth > 0);

    if (validCustomFrames.length > 0) {
      const frameIdx = Math.floor(this.animFrame / 6) % validCustomFrames.length;
      const currentFrame = validCustomFrames[frameIdx];
      ctx.drawImage(currentFrame, 0, 0, w, h);
    } else {
      // Primary rendering: Authentic human fighter transparent sprite with full 2D kinematics
      this.drawRealFighter(ctx, w, h, idleBob);
    }

    // 4. Curved Plasma Buckler Defense (Active during BLOCK and BLOCKSTUN)
    if (this.action === 'BLOCK' || this.action === 'BLOCKSTUN') {
      ctx.save();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(w * 0.45, h * 0.3);
      ctx.lineTo(w * 0.85, h * 0.55);
      ctx.moveTo(w * 0.85, h * 0.3);
      ctx.lineTo(w * 0.45, h * 0.55);
      ctx.stroke();

      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 24;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(w * 0.7, h * 0.45, 65, -Math.PI * 0.38, Math.PI * 0.38, false);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(w * 0.7, h * 0.45, 60, -Math.PI * 0.32, Math.PI * 0.32, false);
      ctx.stroke();

      for (let s = -2; s <= 2; s++) {
        const ang = s * 0.18;
        const sx = w * 0.7 + Math.cos(ang) * 63;
        const sy = h * 0.45 + Math.sin(ang) * 63;
        ctx.fillStyle = '#bae6fd';
        ctx.beginPath();
        ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // 5. Dynamic Attack Energy & Hitbox Visuals (Active ONLY in Active Frames!)
    if (this.attackPhase === 'ACTIVE') {
      if (this.action === 'LIGHT_ATTACK_1') {
        // Element 1 Light Attack Visual
        ctx.save();
        ctx.strokeStyle = theme;
        ctx.shadowColor = theme;
        ctx.shadowBlur = 24;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(w + 15, h * 0.42 - idleBob, 38, -Math.PI * 0.4, Math.PI * 0.4, false);
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(w + 35, h * 0.42 - idleBob, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (this.action === 'LIGHT_ATTACK_2') {
        // Element 2 Light Attack Visual
        ctx.save();
        ctx.strokeStyle = secColor;
        ctx.shadowColor = secColor;
        ctx.shadowBlur = 28;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(w + 22, h * 0.55 - idleBob, 46, -Math.PI * 0.3, Math.PI * 0.5, false);
        ctx.stroke();
        ctx.fillStyle = secColor;
        ctx.beginPath();
        ctx.arc(w + 40, h * 0.55 - idleBob, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (this.action === 'HEAVY_ATTACK_1') {
        // Element 1 Heavy Attack Charge
        ctx.save();
        ctx.fillStyle = theme;
        ctx.shadowColor = theme;
        ctx.shadowBlur = 35;
        ctx.beginPath();
        ctx.arc(w + 28, h * 0.42 - idleBob, 32, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(w + 28, h * 0.42 - idleBob, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (this.action === 'HEAVY_ATTACK_2') {
        // Element 2 Heavy Attack Charge
        ctx.save();
        ctx.fillStyle = secColor;
        ctx.shadowColor = secColor;
        ctx.shadowBlur = 38;
        ctx.beginPath();
        ctx.arc(w + 32, h * 0.5 - idleBob, 34, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(w + 32, h * 0.5 - idleBob, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.restore();
      } else if (this.action === 'ULTIMATE') {
        // Signature Ultimate Aura & Sphere
        ctx.save();
        ctx.shadowColor = theme;
        ctx.shadowBlur = 45;
        const auraPulse = Math.sin(this.animFrame * 0.25) * 16 + 32;
        ctx.strokeStyle = theme;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(w / 2, h * 0.45, h * 0.55 + auraPulse, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = theme;
        ctx.beginPath();
        ctx.ellipse(w + 38, h * 0.45 - idleBob, 50, 28, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(w + 38, h * 0.45 - idleBob, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    ctx.restore();
  }
}

type GameMode = 'PVP' | 'VS_AI' | 'TRAINING';
type GameScreen = 'TITLE_MENU' | 'CHARACTER_SELECT' | 'STAGE_SELECT' | 'VS_SCREEN' | 'BATTLE' | 'GAME_OVER';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [screen, setScreen] = useState<GameScreen>('TITLE_MENU');
  const [gameMode, setGameMode] = useState<GameMode>('PVP');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Modals from Main Menu
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showCreditsModal, setShowCreditsModal] = useState<boolean>(false);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);

  // Match Options (Rounds & Timer: Added 120s option)
  const [roundsToWin, setRoundsToWin] = useState<number>(2); // 1 to 5 rounds
  const [matchDuration, setMatchDuration] = useState<number>(120); // 120, 180, 240, 300
  const [p1RoundsWon, setP1RoundsWon] = useState<number>(0);
  const [p2RoundsWon, setP2RoundsWon] = useState<number>(0);
  const [roundNotification, setRoundNotification] = useState<string | null>(null);

  // Training Mode Options
  const [dummyBehavior, setDummyBehavior] = useState<'STAND' | 'BLOCK' | 'JUMP' | 'ATTACK'>('STAND');
  const [trainingTotalDamage, setTrainingTotalDamage] = useState<number>(0);
  const [ultNotice, setUltNotice] = useState<string | null>(null);

  // Character & Assist selection (Guaranteed distinct fighters)
  const [p1SelectedIdx, setP1SelectedIdx] = useState<number>(0); // Ivan
  const [p1AssistIdx, setP1AssistIdx] = useState<number>(1); // Idan
  const [p2SelectedIdx, setP2SelectedIdx] = useState<number>(2); // Philip
  const [p2AssistIdx, setP2AssistIdx] = useState<number>(3); // Roni
  const [p1Locked, setP1Locked] = useState<boolean>(false);
  const [p2Locked, setP2Locked] = useState<boolean>(false);

  // Synchronized Refs to avoid stale closures in event listeners & game loops
  const p1SelectedIdxRef = useRef<number>(0);
  const p1AssistIdxRef = useRef<number>(1);
  const p2SelectedIdxRef = useRef<number>(2);
  const p2AssistIdxRef = useRef<number>(3);

  useEffect(() => {
    p1SelectedIdxRef.current = p1SelectedIdx;
  }, [p1SelectedIdx]);
  useEffect(() => {
    p1AssistIdxRef.current = p1AssistIdx;
  }, [p1AssistIdx]);
  useEffect(() => {
    p2SelectedIdxRef.current = p2SelectedIdx;
  }, [p2SelectedIdx]);
  useEffect(() => {
    p2AssistIdxRef.current = p2AssistIdx;
  }, [p2AssistIdx]);

  // On-screen banner notification for tag switches
  const [tagNotice, setTagNotice] = useState<{ text: string; color: string } | null>(null);

  // Tag & Assist Cooldown states (in seconds for HUD display)
  const [p1TagCd, setP1TagCd] = useState<number>(0);
  const [p1AssistCd, setP1AssistCd] = useState<number>(0);
  const [p2TagCd, setP2TagCd] = useState<number>(0);
  const [p2AssistCd, setP2AssistCd] = useState<number>(0);
  const p1TagCdRef = useRef<number>(0);
  const p1AssistCdRef = useRef<number>(0);
  const p2TagCdRef = useRef<number>(0);
  const p2AssistCdRef = useRef<number>(0);

  // Stage selection
  const [selectedStageIdx, setSelectedStageIdx] = useState<number>(0);

  // Real Anime OST Audio Player
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [musicEnabled, setMusicEnabled] = useState<boolean>(true);
  const [musicTrackIdx, setMusicTrackIdx] = useState<number>(0);
  const [musicVolume, setMusicVolume] = useState<number>(0.65);
  const [customMusicUrl, setCustomMusicUrl] = useState<string>('');
  const [musicStatusText, setMusicStatusText] = useState<string>('Playing');

  const bgmAudioRef = useRef<HTMLAudioElement | null>(null);

  // Match HUD stats
  const [p1Health, setP1Health] = useState<number>(MAX_FIGHTER_HEALTH);
  const [p1DamageLag, setP1DamageLag] = useState<number>(MAX_FIGHTER_HEALTH);
  const [p1Ult, setP1Ult] = useState<number>(0);

  const [p2Health, setP2Health] = useState<number>(MAX_FIGHTER_HEALTH);
  const [p2DamageLag, setP2DamageLag] = useState<number>(MAX_FIGHTER_HEALTH);
  const [p2Ult, setP2Ult] = useState<number>(0);

  const [timer, setTimer] = useState<number>(120);
  const [winner, setWinner] = useState<string>('');
  const [p1Combo, setP1Combo] = useState<number>(0);
  const [p2Combo, setP2Combo] = useState<number>(0);

  // Mortal Kombat style announcements & Finishers (Fatality vs Brutality)
  const [finishHimTriggered, setFinishHimTriggered] = useState<boolean>(false);
  const [finisherState, setFinisherState] = useState<'NONE' | 'FINISH_HIM_WAIT' | 'FATALITY' | 'BRUTALITY' | 'STANDARD_KO'>('NONE');
  const [finisherWinnerId, setFinisherWinnerId] = useState<'p1' | 'p2' | null>(null);
  const [finishHimSecondsLeft, setFinishHimSecondsLeft] = useState<number>(5);
  const [activeFinisherBanner, setActiveFinisherBanner] = useState<{
    type: 'FATALITY' | 'BRUTALITY';
    winnerName: string;
    loserName: string;
    comboCount?: number;
    subText: string;
  } | null>(null);

  // Match Intro & Pre-fight dialogue
  const [fightIntroBanner, setFightIntroBanner] = useState<string | null>(null);
  const [clashDialogue, setClashDialogue] = useState<PreFightDialogue | null>(null);
  const vsScreenTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const finishHimIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [activeUltBanner, setActiveUltBanner] = useState<{ name: string; title: string; color: string } | null>(null);
  const [showTouchControls, setShowTouchControls] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  });

  // Engine refs & Hitstop Freeze
  const fighter1Ref = useRef<CanvasFighter | null>(null);
  const fighter2Ref = useRef<CanvasFighter | null>(null);
  const projectilesRef = useRef<Projectile[]>([]);
  const particlesRef = useRef<SparkParticle[]>([]);
  const shockwavesRef = useRef<ShockwaveRing[]>([]);
  const ultFieldEffectsRef = useRef<UltimateFieldEffect[]>([]);
  const stagePropsRef = useRef<StageProp[]>([]);
  const bloodDecalsRef = useRef<BloodDecal[]>([]);
  const activeAssistsRef = useRef<ActiveAssistFighter[]>([]);
  const screenShakeRef = useRef<number>(0);
  const hitStopFramesRef = useRef<number>(0); // Hit Stop (Game feel freeze)
  const isGameOverRef = useRef<boolean>(false);
  const timerRef = useRef<number>(120);
  const stageImagesRef = useRef<{ [key: string]: HTMLImageElement }>({});
  const aiDecisionTimerRef = useRef<number>(0);

  const CANVAS_WIDTH = 1024;
  const CANVAS_HEIGHT = 576;
  const FLOOR_OFFSET = 90;
  const GROUND_Y = CANVAS_HEIGHT - FLOOR_OFFSET;
  const GRAVITY = 0.78;

  // Key tracking
  const keysRef = useRef<{
    a: boolean;
    d: boolean;
    w: boolean;
    s: boolean;
    ArrowLeft: boolean;
    ArrowRight: boolean;
    ArrowUp: boolean;
    ArrowDown: boolean;
  }>({
    a: false,
    d: false,
    w: false,
    s: false,
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false
  });

  // Preload stage images
  useEffect(() => {
    STAGES.forEach((st) => {
      const img = new Image();
      img.src = st.bgUrl;
      stageImagesRef.current[st.id] = img;
    });
  }, []);

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Real Anime OST Playback Engine
  useEffect(() => {
    audio.soundEnabled = soundEnabled;
  }, [soundEnabled]);

  const playAnimeBGM = (trackIdx: number) => {
    if (!musicEnabled) {
      if (bgmAudioRef.current) bgmAudioRef.current.pause();
      return;
    }

    if (!bgmAudioRef.current) {
      bgmAudioRef.current = new Audio();
    }

    const audioEl = bgmAudioRef.current;
    audioEl.loop = false;
    audioEl.onended = () => {
      setMusicTrackIdx((prev) => (prev + 1) % ANIME_OST_TRACKS.length);
    };
    audioEl.volume = musicVolume;

    const currentTrackDef = ANIME_OST_TRACKS[trackIdx] || ANIME_OST_TRACKS[0];
    const targetUrl = customMusicUrl.trim() || currentTrackDef.srcUrls[0];

    audioEl.src = targetUrl;
    setMusicStatusText('Loading track...');

    audioEl
      .play()
      .then(() => {
        setMusicStatusText('Playing');
      })
      .catch((_err) => {
        if (currentTrackDef.srcUrls[1] && !customMusicUrl) {
          audioEl.src = currentTrackDef.srcUrls[1];
          audioEl
            .play()
            .then(() => setMusicStatusText('Playing'))
            .catch(() => setMusicStatusText('Click to Play'));
        } else {
          setMusicStatusText('Click to Play');
        }
      });
  };

  useEffect(() => {
    if (musicEnabled) {
      playAnimeBGM(musicTrackIdx);
    } else {
      if (bgmAudioRef.current) bgmAudioRef.current.pause();
    }
  }, [musicEnabled, musicTrackIdx, customMusicUrl]);

  useEffect(() => {
    if (bgmAudioRef.current) {
      bgmAudioRef.current.volume = musicVolume;
    }
  }, [musicVolume]);

  const nextTrack = () => {
    audio.playSelect();
    setMusicTrackIdx((prev) => (prev + 1) % ANIME_OST_TRACKS.length);
  };

  const prevTrack = () => {
    audio.playSelect();
    setMusicTrackIdx((prev) => (prev - 1 + ANIME_OST_TRACKS.length) % ANIME_OST_TRACKS.length);
  };

  // Random Character selector (Guarantees two distinct fighters for point & assist)
  const selectRandomP1 = () => {
    audio.playDiceRoll();
    let rollCount = 0;
    const interval = setInterval(() => {
      const pt = Math.floor(Math.random() * CHARACTERS.length);
      const asst = (pt + 1 + Math.floor(Math.random() * (CHARACTERS.length - 1))) % CHARACTERS.length;
      setP1SelectedIdx(pt);
      setP1AssistIdx(asst);
      rollCount++;
      if (rollCount >= 7) {
        clearInterval(interval);
        audio.playLockIn();
        setP1Locked(true);
        if (p2Locked || gameMode !== 'PVP') setScreen('STAGE_SELECT');
      }
    }, 80);
  };

  const selectRandomP2 = () => {
    audio.playDiceRoll();
    let rollCount = 0;
    const interval = setInterval(() => {
      const pt = Math.floor(Math.random() * CHARACTERS.length);
      const asst = (pt + 1 + Math.floor(Math.random() * (CHARACTERS.length - 1))) % CHARACTERS.length;
      setP2SelectedIdx(pt);
      setP2AssistIdx(asst);
      rollCount++;
      if (rollCount >= 7) {
        clearInterval(interval);
        audio.playLockIn();
        setP2Locked(true);
        if (p1Locked) setScreen('STAGE_SELECT');
      }
    }, 80);
  };

  // Random Stage selector
  const selectRandomStage = () => {
    audio.playDiceRoll();
    let rollCount = 0;
    const interval = setInterval(() => {
      setSelectedStageIdx(Math.floor(Math.random() * STAGES.length));
      rollCount++;
      if (rollCount >= 6) {
        clearInterval(interval);
        triggerVSAndBattle(CHARACTERS[p1SelectedIdx], CHARACTERS[p2SelectedIdx]);
      }
    }, 90);
  };

  // Element-aware Projectile Spawner for 2 Heavy Attacks & 1 Ultimate
  const spawnProjectile = (fighter: CanvasFighter, attackKey: 'HEAVY_1' | 'HEAVY_2' | 'ULTIMATE') => {
    const isP1 = fighter.name === 'Player 1';
    const char = fighter.character;
    const isUlt = attackKey === 'ULTIMATE';
    const projX = fighter.facing === 'right' ? fighter.position.x + fighter.width + 10 : fighter.position.x - 20;
    const projY = fighter.position.y + 65;
    const vx = fighter.facing === 'right' ? (isUlt ? 20 : 13) : (isUlt ? -20 : -13);

    let pType: Projectile['type'] = 'lightning';
    let pColor = char.themeColor;
    let pSecColor = char.secondaryColor;
    let pSize = isUlt ? 70 : 26;
    let pDamage = isUlt ? 30 : 10;

    if (isUlt) {
      if (char.id === 'idan') {
        pType = 'void_nova'; // Dark sphere surrounded by fire!
        pColor = '#ef4444';
        pSecColor = '#000000';
        pSize = 75;
      } else if (char.id === 'philip') {
        pType = 'solar_beam'; // Giant light beam!
        pColor = '#facc15';
        pSecColor = '#ffffff';
        pSize = 85;
      } else if (char.id === 'ivan') {
        pType = 'tornado'; // Tornado with lightning!
        pColor = '#38bdf8';
        pSecColor = '#ffffff';
        pSize = 80;
      } else if (char.id === 'roni') {
        pType = 'blood_arrow'; // Water arrow surrounded by blood!
        pColor = '#06b6d4';
        pSecColor = '#e11d48';
        pSize = 72;
      }
    } else if (attackKey === 'HEAVY_1') {
      // Element 1 Heavy Attack
      if (char.id === 'idan') {
        pType = 'fireball'; // Fire: Hellfire Orb
        pColor = '#f97316';
        pSecColor = '#ef4444';
        pSize = 30;
      } else if (char.id === 'philip') {
        pType = 'solar_beam'; // Light: Solar Ray
        pColor = '#facc15';
        pSecColor = '#ffffff';
        pSize = 30;
      } else if (char.id === 'ivan') {
        pType = 'wind'; // Wind: Hurricane Vortex
        pColor = '#38bdf8';
        pSecColor = '#7dd3fc';
        pSize = 32;
      } else if (char.id === 'roni') {
        pType = 'water'; // Water: Tidal Wave
        pColor = '#06b6d4';
        pSecColor = '#38bdf8';
        pSize = 32;
      }
    } else {
      // Element 2 Heavy Attack (HEAVY_2)
      if (char.id === 'idan') {
        pType = 'darkness'; // Darkness: Void Graviton
        pColor = '#7c3aed';
        pSecColor = '#000000';
        pSize = 34;
      } else if (char.id === 'philip') {
        pType = 'crystal'; // Earth: Crystal Geyser
        pColor = '#eab308';
        pSecColor = '#ca8a04';
        pSize = 32;
      } else if (char.id === 'ivan') {
        pType = 'lightning'; // Lightning: Sky Thunder
        pColor = '#60a5fa';
        pSecColor = '#ffffff';
        pSize = 32;
      } else if (char.id === 'roni') {
        pType = 'blood'; // Blood: Crimson Sickle
        pColor = '#e11d48';
        pSecColor = '#881337';
        pSize = 34;
      }
    }

    projectilesRef.current.push({
      id: Date.now() + Math.random(),
      x: projX,
      y: projY,
      vx,
      ownerId: isP1 ? 'p1' : 'p2',
      color: pColor,
      secondaryColor: pSecColor,
      type: pType,
      attackKey,
      characterId: char.id,
      size: pSize,
      damage: pDamage,
      isUltimate: isUlt,
      life: isUlt ? 100 : 85,
      trail: []
    });

    screenShakeRef.current = isUlt ? 26 : (attackKey === 'HEAVY_2' ? 14 : 11);
  };

  // Trigger Ultimate Field Animation & Cinematic Banner
  const triggerFieldEffect = (fighter: CanvasFighter) => {
    const isP1 = fighter.name === 'Player 1';
    ultFieldEffectsRef.current.push({
      ownerId: isP1 ? 'p1' : 'p2',
      character: fighter.character,
      duration: 90,
      maxDuration: 90,
      x: fighter.position.x,
      y: fighter.position.y
    });

    setActiveUltBanner({
      name: fighter.character.name,
      title: fighter.character.ultimateName,
      color: fighter.character.themeColor
    });
    setTimeout(() => setActiveUltBanner(null), 1600);
  };

  // Voice quotes for Tag, Assist, and Victory announcements
  const TAG_QUOTES: { [key: string]: string } = {
    idan: "Tagging in! I'll incinerate them!",
    philip: "My crystal armor will shatter you!",
    ivan: "Lightning takes the lead!",
    roni: "Blood and water answer my call!"
  };

  const ASSIST_QUOTES: { [key: string]: string } = {
    idan: "Infernal burst strike!",
    philip: "Solar prism shock!",
    ivan: "Thunderstorm crash!",
    roni: "Tidal blood surge!"
  };

  const VICTORY_QUOTES: { [key: string]: string } = {
    idan: "You couldn't even survive my sparks.",
    philip: "Absolute precision. Crystalline perfection.",
    ivan: "Thunder always strikes first and fastest!",
    roni: "Your strength was but a droplet in the sea."
  };

  // Helper to spawn persistent floor blood decals
  const spawnBloodDecal = (hitX: number) => {
    const clampedX = Math.max(30, Math.min(CANVAS_WIDTH - 30, hitX + (Math.random() - 0.5) * 30));
    const splatters: { dx: number; dy: number; r: number }[] = [];
    for (let s = 0; s < 5; s++) {
      splatters.push({
        dx: (Math.random() - 0.5) * 36,
        dy: (Math.random() - 0.5) * 8,
        r: Math.random() * 3.5 + 1.5
      });
    }
    bloodDecalsRef.current.push({
      x: clampedX,
      y: GROUND_Y + 14 + Math.random() * 8,
      width: Math.random() * 16 + 12,
      height: Math.random() * 6 + 3,
      color: Math.random() < 0.5 ? '#881337' : '#991b1b',
      alpha: 0.85,
      splatters
    });
    if (bloodDecalsRef.current.length > 35) bloodDecalsRef.current.shift();
  };

  // Training Mode Actions
  const resetTraining = () => {
    const f1 = fighter1Ref.current;
    const f2 = fighter2Ref.current;
    if (f1) {
      f1.position = { x: 140, y: 100 };
      f1.velocity = { x: 0, y: 0 };
      f1.health = MAX_FIGHTER_HEALTH;
      f1.isDead = false;
      f1.action = 'IDLE';
      f1.attackPhase = 'NONE';
      f1.currentAttackKey = null;
      f1.hitStunDuration = 0;
      f1.blockStunDuration = 0;
      f1.isBlocking = false;
      f1.facing = 'right';
    }
    if (f2) {
      f2.position = { x: CANVAS_WIDTH - 225, y: 100 };
      f2.velocity = { x: 0, y: 0 };
      f2.health = MAX_FIGHTER_HEALTH;
      f2.isDead = false;
      f2.action = 'IDLE';
      f2.attackPhase = 'NONE';
      f2.currentAttackKey = null;
      f2.hitStunDuration = 0;
      f2.blockStunDuration = 0;
      f2.isBlocking = false;
      f2.facing = 'left';
    }
    setP1Health(MAX_FIGHTER_HEALTH);
    setP1DamageLag(MAX_FIGHTER_HEALTH);
    setP2Health(MAX_FIGHTER_HEALTH);
    setP2DamageLag(MAX_FIGHTER_HEALTH);
    projectilesRef.current = [];
    particlesRef.current = [];
    shockwavesRef.current = [];
    ultFieldEffectsRef.current = [];
    activeAssistsRef.current = [];
    stagePropsRef.current = generateStageProps(STAGES[selectedStageIdx].id, GROUND_Y);
    setP1Combo(0);
    setP2Combo(0);
    audio.playSelect();
  };

  const maxP1Ultimate = () => {
    const f1 = fighter1Ref.current;
    if (f1) {
      f1.ultimateMeter = 100;
      setP1Ult(100);
      audio.playSelect();
    }
  };

  const triggerP1Light = (subType: 1 | 2) => {
    const f1 = fighter1Ref.current;
    if (f1) {
      f1.bufferInput(subType === 1 ? 'LIGHT_1' : 'LIGHT_2');
      if (f1.attackPhase === 'NONE' || f1.cancelWindowActive) {
        f1.startLightAttack(subType);
      }
    }
  };

  const triggerP1Heavy = (subType: 1 | 2) => {
    const f1 = fighter1Ref.current;
    if (f1) {
      f1.bufferInput(subType === 1 ? 'HEAVY_1' : 'HEAVY_2');
      if (f1.attackPhase === 'NONE' || f1.cancelWindowActive) {
        f1.startHeavyAttack(subType, spawnProjectile);
      }
    }
  };

  const triggerP1Ultimate = () => {
    const f1 = fighter1Ref.current;
    if (f1) {
      const success = f1.startUltimateAttack(spawnProjectile, triggerFieldEffect, gameMode === 'TRAINING');
      setP1Ult(f1.ultimateMeter);
      if (!success && f1.ultimateMeter < 100) {
        setUltNotice(`⚠️ Ultimate meter not full (${Math.round(f1.ultimateMeter)}% / 100%) - Strike opponent to charge`);
        setTimeout(() => setUltNotice(null), 2000);
      }
    }
  };

  // Tag Team & Assist Mechanics (100% Guaranteed instant switch & mutual sync)
  const handleP1TagSwitch = () => {
    const f1 = fighter1Ref.current;
    if (!f1 || f1.isDead || f1.hitStunDuration > 10 || p1TagCdRef.current > 0) return;

    const currentIdx = p1SelectedIdxRef.current;
    const assistIdx = p1AssistIdxRef.current;
    if (currentIdx === assistIdx) return; // Prevent self-tagging edge case

    const incomingChar = CHARACTERS[assistIdx];
    if (!incomingChar) return;

    audio.playTagSwitch();
    audio.speakCharacter(incomingChar.id, TAG_QUOTES[incomingChar.id]);

    for (let i = 0; i < 5; i++) {
      f1.ghosts.push({
        x: f1.position.x + (i - 2) * 22,
        y: f1.position.y,
        facing: f1.facing,
        character: f1.character,
        alpha: 0.8
      });
    }

    shockwavesRef.current.push({
      x: f1.position.x + f1.width / 2,
      y: f1.position.y + f1.height / 2,
      radius: 15,
      maxRadius: 90,
      color: incomingChar.themeColor,
      alpha: 1.0
    });

    for (let p = 0; p < 25; p++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      particlesRef.current.push({
        x: f1.position.x + f1.width / 2,
        y: f1.position.y + f1.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 5 + 3,
        color: incomingChar.themeColor,
        life: 0.9,
        decay: 0.04
      });
    }

    // Instantly switch character and reset attack state
    f1.setCharacter(incomingChar);
    f1.action = 'IDLE';
    f1.attackPhase = 'NONE';
    f1.currentAttackKey = null;
    f1.phaseTimer = 0;
    f1.cancelWindowActive = false;
    f1.comboStep = 0;
    f1.inputBuffer = [];

    // Swap indices in refs and state
    p1SelectedIdxRef.current = assistIdx;
    p1AssistIdxRef.current = currentIdx;
    setP1SelectedIdx(assistIdx);
    setP1AssistIdx(currentIdx);

    const cd = gameMode === 'TRAINING' ? 0 : 300; // Instant in training (0s), 5s in matches
    p1TagCdRef.current = cd;
    setP1TagCd(gameMode === 'TRAINING' ? 0 : 5);

    setTagNotice({
      text: `P1 TAG: ${incomingChar.name.toUpperCase()} ENTERED!`,
      color: incomingChar.themeColor
    });
    setTimeout(() => setTagNotice(null), 1800);
  };

  const handleP1CallAssist = () => {
    const f1 = fighter1Ref.current;
    if (!f1 || f1.isDead || p1AssistCdRef.current > 0) return;

    const assistChar = CHARACTERS[p1AssistIdxRef.current];
    if (!assistChar) return;

    audio.playAssistCall();
    audio.speakCharacter(assistChar.id, ASSIST_QUOTES[assistChar.id]);

    const enterFromLeft = f1.facing === 'right';
    const startX = enterFromLeft ? Math.max(15, f1.position.x - 120) : Math.min(CANVAS_WIDTH - 95, f1.position.x + 120);

    activeAssistsRef.current.push({
      id: Date.now() + Math.random(),
      ownerId: 'p1',
      character: assistChar,
      x: startX,
      y: GROUND_Y - 165,
      vx: enterFromLeft ? 11 : -11,
      facing: f1.facing,
      phase: 'ENTER',
      timer: 55,
      hasHit: false,
      elementColor: assistChar.themeColor
    });

    const cd = gameMode === 'TRAINING' ? 0 : 300;
    p1AssistCdRef.current = cd;
    setP1AssistCd(gameMode === 'TRAINING' ? 0 : 5);
  };

  const handleP1InteractProp = () => {
    const f1 = fighter1Ref.current;
    if (!f1 || f1.isDead || f1.hitStunDuration > 0) return;

    const f1CenterX = f1.position.x + f1.width / 2;
    const props = stagePropsRef.current;
    let nearestProp: StageProp | null = null;
    let nearestDist = 110;

    for (const prop of props) {
      if (prop.isBroken || prop.isFlying) continue;
      const propCenterX = prop.x + prop.width / 2;
      const dist = Math.abs(f1CenterX - propCenterX);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearestProp = prop;
      }
    }

    if (nearestProp) {
      audio.playPropThrow();
      nearestProp.isFlying = true;
      nearestProp.thrownBy = 'p1';
      nearestProp.vx = f1.facing === 'right' ? 19 : -19;
      nearestProp.vy = -3;
      screenShakeRef.current = 9;
    }
  };

  const handleP2TagSwitch = () => {
    const f2 = fighter2Ref.current;
    if (!f2 || f2.isDead || f2.hitStunDuration > 10 || p2TagCdRef.current > 0) return;

    const currentIdx = p2SelectedIdxRef.current;
    const assistIdx = p2AssistIdxRef.current;
    if (currentIdx === assistIdx) return;

    const incomingChar = CHARACTERS[assistIdx];
    if (!incomingChar) return;

    audio.playTagSwitch();
    audio.speakCharacter(incomingChar.id, TAG_QUOTES[incomingChar.id]);

    for (let i = 0; i < 5; i++) {
      f2.ghosts.push({
        x: f2.position.x + (i - 2) * 22,
        y: f2.position.y,
        facing: f2.facing,
        character: f2.character,
        alpha: 0.8
      });
    }

    shockwavesRef.current.push({
      x: f2.position.x + f2.width / 2,
      y: f2.position.y + f2.height / 2,
      radius: 15,
      maxRadius: 90,
      color: incomingChar.themeColor,
      alpha: 1.0
    });

    for (let p = 0; p < 25; p++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      particlesRef.current.push({
        x: f2.position.x + f2.width / 2,
        y: f2.position.y + f2.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 5 + 3,
        color: incomingChar.themeColor,
        life: 0.9,
        decay: 0.04
      });
    }

    f2.setCharacter(incomingChar);
    f2.action = 'IDLE';
    f2.attackPhase = 'NONE';
    f2.currentAttackKey = null;
    f2.phaseTimer = 0;
    f2.cancelWindowActive = false;
    f2.comboStep = 0;
    f2.inputBuffer = [];

    p2SelectedIdxRef.current = assistIdx;
    p2AssistIdxRef.current = currentIdx;
    setP2SelectedIdx(assistIdx);
    setP2AssistIdx(currentIdx);

    const cd = gameMode === 'TRAINING' ? 0 : 300;
    p2TagCdRef.current = cd;
    setP2TagCd(gameMode === 'TRAINING' ? 0 : 5);

    setTagNotice({
      text: `${gameMode === 'PVP' ? 'P2' : 'CPU'} TAG: ${incomingChar.name.toUpperCase()} ENTERED!`,
      color: incomingChar.themeColor
    });
    setTimeout(() => setTagNotice(null), 1800);
  };

  const handleP2CallAssist = () => {
    const f2 = fighter2Ref.current;
    if (!f2 || f2.isDead || p2AssistCdRef.current > 0) return;

    const assistChar = CHARACTERS[p2AssistIdxRef.current];
    if (!assistChar) return;

    audio.playAssistCall();
    audio.speakCharacter(assistChar.id, ASSIST_QUOTES[assistChar.id]);
    audio.speakCharacter(assistChar.id, ASSIST_QUOTES[assistChar.id]);

    const enterFromRight = f2.facing === 'left';
    const startX = enterFromRight ? Math.min(CANVAS_WIDTH - 95, f2.position.x + 120) : Math.max(15, f2.position.x - 120);

    activeAssistsRef.current.push({
      id: Date.now() + Math.random(),
      ownerId: 'p2',
      character: assistChar,
      x: startX,
      y: GROUND_Y - 165,
      vx: enterFromRight ? -11 : 11,
      facing: f2.facing,
      phase: 'ENTER',
      timer: 55,
      hasHit: false,
      elementColor: assistChar.themeColor
    });

    p2AssistCdRef.current = 360;
    setP2AssistCd(6);
  };

  const handleP2InteractProp = () => {
    const f2 = fighter2Ref.current;
    if (!f2 || f2.isDead || f2.hitStunDuration > 0) return;

    const f2CenterX = f2.position.x + f2.width / 2;
    const props = stagePropsRef.current;
    let nearestProp: StageProp | null = null;
    let nearestDist = 110;

    for (const prop of props) {
      if (prop.isBroken || prop.isFlying) continue;
      const propCenterX = prop.x + prop.width / 2;
      const dist = Math.abs(f2CenterX - propCenterX);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearestProp = prop;
      }
    }

    if (nearestProp) {
      audio.playPropThrow();
      nearestProp.isFlying = true;
      nearestProp.thrownBy = 'p2';
      nearestProp.vx = f2.facing === 'right' ? 19 : -19;
      nearestProp.vy = -3;
      screenShakeRef.current = 9;
    }
  };

  // Virtual Touch Controller actions (for mobile & touch devices)
  const handleTouchJump = () => {
    const f1 = fighter1Ref.current;
    if (f1 && f1.isGrounded && !f1.isDead && f1.hitStunDuration <= 0 && f1.blockStunDuration <= 0) {
      f1.velocity.y = f1.jumpForce;
      audio.playSelect();
    }
  };

  const handleTouchDash = (dir: 'left' | 'right') => {
    const f1 = fighter1Ref.current;
    if (f1) {
      f1.bufferInput(dir === 'left' ? 'DASH_L' : 'DASH_R');
      if (f1.attackPhase === 'NONE') f1.dash(dir);
    }
  };

  // Start / Reset Round
  const setupRound = (isNewMatch: boolean = false) => {
    if (isNewMatch) {
      setP1RoundsWon(0);
      setP2RoundsWon(0);
      setTrainingTotalDamage(0);
    }

    if (finishHimIntervalRef.current) {
      clearInterval(finishHimIntervalRef.current);
      finishHimIntervalRef.current = null;
    }
    setFinisherState('NONE');
    setFinisherWinnerId(null);
    setActiveFinisherBanner(null);

    isGameOverRef.current = false;
    setIsPaused(false);
    setFinishHimTriggered(false);
    timerRef.current = matchDuration;
    setTimer(matchDuration);
    setP1Combo(0);
    setP2Combo(0);
    projectilesRef.current = [];
    particlesRef.current = [];
    shockwavesRef.current = [];
    ultFieldEffectsRef.current = [];
    activeAssistsRef.current = [];
    bloodDecalsRef.current = [];
    stagePropsRef.current = generateStageProps(STAGES[selectedStageIdx].id, GROUND_Y);
    p1TagCdRef.current = 0;
    p1AssistCdRef.current = 0;
    p2TagCdRef.current = 0;
    p2AssistCdRef.current = 0;
    setP1TagCd(0);
    setP1AssistCd(0);
    setP2TagCd(0);
    setP2AssistCd(0);
    hitStopFramesRef.current = 0;

    if (fighter1Ref.current) {
      fighter1Ref.current.position = { x: 140, y: 100 };
      fighter1Ref.current.velocity = { x: 0, y: 0 };
      fighter1Ref.current.health = MAX_FIGHTER_HEALTH;
      fighter1Ref.current.isDead = false;
      fighter1Ref.current.action = 'IDLE';
      fighter1Ref.current.attackPhase = 'NONE';
      fighter1Ref.current.currentAttackKey = null;
      fighter1Ref.current.hitStunDuration = 0;
      fighter1Ref.current.blockStunDuration = 0;
      fighter1Ref.current.isBlocking = false;
      fighter1Ref.current.facing = 'right';
    }

    if (fighter2Ref.current) {
      fighter2Ref.current.position = { x: CANVAS_WIDTH - 225, y: 100 };
      fighter2Ref.current.velocity = { x: 0, y: 0 };
      fighter2Ref.current.health = MAX_FIGHTER_HEALTH;
      fighter2Ref.current.isDead = false;
      fighter2Ref.current.action = 'IDLE';
      fighter2Ref.current.attackPhase = 'NONE';
      fighter2Ref.current.currentAttackKey = null;
      fighter2Ref.current.hitStunDuration = 0;
      fighter2Ref.current.blockStunDuration = 0;
      fighter2Ref.current.isBlocking = false;
      fighter2Ref.current.facing = 'left';
    }

    setP1Health(MAX_FIGHTER_HEALTH);
    setP1DamageLag(MAX_FIGHTER_HEALTH);
    setP2Health(MAX_FIGHTER_HEALTH);
    setP2DamageLag(MAX_FIGHTER_HEALTH);
  };

  const skipIntroToFight = () => {
    if (vsScreenTimeoutRef.current) {
      clearTimeout(vsScreenTimeoutRef.current);
      vsScreenTimeoutRef.current = null;
    }
    startMatch(CHARACTERS[p1SelectedIdx], CHARACTERS[p2SelectedIdx]);
  };

  const startMatch = (char1: CharacterDef, char2: CharacterDef) => {
    if (vsScreenTimeoutRef.current) {
      clearTimeout(vsScreenTimeoutRef.current);
      vsScreenTimeoutRef.current = null;
    }
    if (finishHimIntervalRef.current) {
      clearInterval(finishHimIntervalRef.current);
      finishHimIntervalRef.current = null;
    }

    fighter1Ref.current = new CanvasFighter({
      position: { x: 140, y: 100 },
      velocity: { x: 0, y: 0 },
      name: 'Player 1',
      facing: 'right',
      character: char1
    });

    fighter2Ref.current = new CanvasFighter({
      position: { x: CANVAS_WIDTH - 225, y: 100 },
      velocity: { x: 0, y: 0 },
      name: gameMode === 'TRAINING' ? 'Training Dummy' : (gameMode === 'VS_AI' ? 'CPU Bot' : 'Player 2'),
      facing: 'left',
      character: char2
    });

    setFinisherState('NONE');
    setFinisherWinnerId(null);
    setActiveFinisherBanner(null);
    setupRound(true);
    setScreen('BATTLE');

    // Announce fight start!
    setFightIntroBanner('ROUND 1... FIGHT!');
    audio.playFightIntro();
    setTimeout(() => {
      setFightIntroBanner(null);
    }, 1800);
  };

  const triggerVSAndBattle = (char1: CharacterDef, char2: CharacterDef) => {
    audio.playLockIn();
    setScreen('VS_SCREEN');

    const dialoguePair =
      CHARACTER_DIALOGUES[char1.id]?.[char2.id] || {
        p1Line: `Prepare yourself for defeat, ${char2.name}!`,
        p2Line: `Let's see what you've got in the arena!`
      };
    setClashDialogue(dialoguePair);

    audio.speakAnnouncer(`${char1.name} VERSUS ${char2.name}!`, 0.85, 0.88);

    // Both characters speak their lines aloud!
    setTimeout(() => {
      audio.speakCharacter(char1.id, dialoguePair.p1Line);
    }, 950);
    setTimeout(() => {
      audio.speakCharacter(char2.id, dialoguePair.p2Line);
    }, 2600);

    if (vsScreenTimeoutRef.current) clearTimeout(vsScreenTimeoutRef.current);
    vsScreenTimeoutRef.current = setTimeout(() => {
      startMatch(char1, char2);
    }, 4500);
  };

  // Check Finisher: Distinction between Fatality and Brutality
  const checkFinisherOrRoundEnd = (winner: CanvasFighter, loser: CanvasFighter, comboCount: number) => {
    if (gameMode === 'TRAINING') return;
    if (isGameOverRef.current || finisherState !== 'NONE') return;

    const winnerIsP1 = winner.name === 'Player 1';
    const nextP1Rounds = winnerIsP1 ? p1RoundsWon + 1 : p1RoundsWon;
    const nextP2Rounds = !winnerIsP1 ? p2RoundsWon + 1 : p2RoundsWon;
    const isMatchDeciding = nextP1Rounds >= roundsToWin || nextP2Rounds >= roundsToWin;

    if (!isMatchDeciding) {
      handleRoundEnd('K.O.');
      return;
    }

    // MATCH DECIDING FINAL BLOW!
    // 1. BRUTALITY: Final blow landed in an active combo (comboCount >= 2). Instant obliteration on impact!
    if (comboCount >= 2) {
      triggerBrutality(winner, loser, comboCount);
    } else {
      // 2. FATALITY: Single blow finisher (comboCount < 2). Loser enters "FINISH HIM!" dazed window.
      triggerFinishHim(winner, loser);
    }
  };

  const triggerBrutality = (winner: CanvasFighter, loser: CanvasFighter, comboCount: number) => {
    isGameOverRef.current = true;
    setFinisherState('BRUTALITY');
    const winnerIsP1 = winner.name === 'Player 1';
    setFinisherWinnerId(winnerIsP1 ? 'p1' : 'p2');
    loser.isDead = true;

    screenShakeRef.current = 42;
    hitStopFramesRef.current = 8;
    audio.playBrutality();

    const victimX = loser.position.x + loser.width / 2;
    const victimY = loser.position.y + loser.height / 2;

    // 140 Kinetic bone, gore, and elemental burst particles
    for (let i = 0; i < 140; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 20 + 5;
      particlesRef.current.push({
        x: victimX,
        y: victimY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 5,
        size: Math.random() * 8 + 3,
        color: i % 4 === 0 ? '#dc2626' : (i % 3 === 0 ? '#991b1b' : (i % 2 === 0 ? winner.character.themeColor : '#ffffff')),
        life: 1.2,
        decay: Math.random() * 0.02 + 0.012,
        isBlood: i % 2 === 0
      });
    }

    shockwavesRef.current.push({
      x: victimX,
      y: victimY,
      radius: 20,
      maxRadius: 180,
      color: '#ef4444',
      alpha: 1.0
    });

    setActiveFinisherBanner({
      type: 'BRUTALITY',
      winnerName: winner.character.name,
      loserName: loser.character.name,
      comboCount,
      subText: `${comboCount} HITS COMBO OBLITERATION!`
    });

    audio.playFlawlessVictory(winner.character.name);

    setTimeout(() => {
      if (winnerIsP1) setP1RoundsWon((r) => r + 1);
      else setP2RoundsWon((r) => r + 1);
      setWinner(`BRUTALITY! Decisive Victory for ${winner.character.name}! (${comboCount}-Hit Flawless Combo)`);
      setScreen('GAME_OVER');
    }, 4200);
  };

  const triggerFinishHim = (winner: CanvasFighter, loser: CanvasFighter) => {
    setFinisherState('FINISH_HIM_WAIT');
    const winnerIsP1 = winner.name === 'Player 1';
    setFinisherWinnerId(winnerIsP1 ? 'p1' : 'p2');
    setFinishHimSecondsLeft(5);

    loser.action = 'HITSTUN';
    loser.velocity.x = 0;
    loser.velocity.y = 0;
    loser.hitStunDuration = 9999;

    audio.playFinishHim();

    let count = 5;
    if (finishHimIntervalRef.current) clearInterval(finishHimIntervalRef.current);
    finishHimIntervalRef.current = setInterval(() => {
      count--;
      setFinishHimSecondsLeft(count);
      audio.playHeartbeat();

      if (count <= 0) {
        if (finishHimIntervalRef.current) clearInterval(finishHimIntervalRef.current);
        loser.isDead = true;
        setFinisherState('STANDARD_KO');
        audio.playKO();
        handleRoundEnd('K.O.');
      }
    }, 1000);
  };

  const executeFatality = () => {
    if (finisherState !== 'FINISH_HIM_WAIT') return;
    if (finishHimIntervalRef.current) {
      clearInterval(finishHimIntervalRef.current);
      finishHimIntervalRef.current = null;
    }

    const f1 = fighter1Ref.current;
    const f2 = fighter2Ref.current;
    if (!f1 || !f2) return;

    const winner = finisherWinnerId === 'p1' ? f1 : f2;
    const loser = finisherWinnerId === 'p1' ? f2 : f1;

    setFinisherState('FATALITY');
    loser.isDead = true;
    audio.playFatality();

    const victimX = loser.position.x + loser.width / 2;
    const victimY = loser.position.y + loser.height / 2;

    let fatalityName = 'EXECUTION FATALITY';
    if (winner.character.id === 'idan') {
      fatalityName = 'Nether Void Annihilation';
    } else if (winner.character.id === 'philip') {
      fatalityName = 'Solar Crystal Impalement';
    } else if (winner.character.id === 'ivan') {
      fatalityName = 'Skyfall Thunder Rift';
    } else if (winner.character.id === 'roni') {
      fatalityName = 'Crimson Tide Execution';
    }

    triggerFieldEffect(winner);
    screenShakeRef.current = 45;

    for (let i = 0; i < 160; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 18 + 5;
      particlesRef.current.push({
        x: victimX,
        y: victimY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 6,
        size: Math.random() * 10 + 4,
        color: i % 3 === 0 ? '#e11d48' : (i % 2 === 0 ? winner.character.themeColor : '#ffffff'),
        life: 1.3,
        decay: Math.random() * 0.015 + 0.01,
        isBlood: i % 3 === 0
      });
    }

    shockwavesRef.current.push({
      x: victimX,
      y: victimY,
      radius: 20,
      maxRadius: 240,
      color: winner.character.themeColor,
      alpha: 1.0
    });

    setActiveFinisherBanner({
      type: 'FATALITY',
      winnerName: winner.character.name,
      loserName: loser.character.name,
      subText: fatalityName
    });

    audio.playFlawlessVictory(winner.character.name);

    setTimeout(() => {
      const winnerIsP1 = finisherWinnerId === 'p1';
      if (winnerIsP1) setP1RoundsWon((r) => r + 1);
      else setP2RoundsWon((r) => r + 1);
      setWinner(`FATALITY! Absolute Victory for ${winner.character.name}! (${fatalityName})`);
      setScreen('GAME_OVER');
    }, 4500);
  };

  // Match Timer Loop (Disabled in Training Mode)
  useEffect(() => {
    if (screen !== 'BATTLE' || isPaused || gameMode === 'TRAINING') return;
    const interval = setInterval(() => {
      if (!isGameOverRef.current && timerRef.current > 0) {
        timerRef.current -= 1;
        setTimer(timerRef.current);
        if (timerRef.current === 0) {
          handleRoundEnd('TIME OVER');
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [screen, isPaused, matchDuration, gameMode]);

  // Handle Round End & Multi-Round Logic
  const handleRoundEnd = (reason?: string) => {
    if (gameMode === 'TRAINING') return;

    isGameOverRef.current = true;
    const f1 = fighter1Ref.current;
    const f2 = fighter2Ref.current;
    if (!f1 || !f2) return;

    let roundWinner = 0;
    if (f1.health > f2.health) {
      roundWinner = 1;
    } else if (f2.health > f1.health) {
      roundWinner = 2;
    }

    const nextP1Rounds = roundWinner === 1 ? p1RoundsWon + 1 : p1RoundsWon;
    const nextP2Rounds = roundWinner === 2 ? p2RoundsWon + 1 : p2RoundsWon;

    if (roundWinner === 1) setP1RoundsWon(nextP1Rounds);
    if (roundWinner === 2) setP2RoundsWon(nextP2Rounds);

    if (nextP1Rounds >= roundsToWin || nextP2Rounds >= roundsToWin) {
      const winnerFighter = nextP1Rounds >= roundsToWin ? f1 : f2;
      let winText = `${winnerFighter.character.name} WINS THE MATCH!`;
      if (reason === 'TIME OVER') winText += ' (TIME OVER)';
      setWinner(winText);
      setScreen('GAME_OVER');

      // Winner character speaks victory quote!
      audio.speakAnnouncer(`VICTORY! ${winnerFighter.character.name} WINS!`, 0.88, 0.9);
      setTimeout(() => {
        audio.speakCharacter(winnerFighter.character.id, VICTORY_QUOTES[winnerFighter.character.id]);
      }, 1400);
    } else {
      const winningFighter = roundWinner === 1 ? f1 : f2;
      const roundWinBanner = `ROUND ${p1RoundsWon + p2RoundsWon + 1} TO ${winningFighter.character.name}!`;
      setRoundNotification(roundWinBanner);
      audio.speakAnnouncer(roundWinBanner, 0.9, 0.95);

      setTimeout(() => {
        setRoundNotification(null);
        setupRound(false);
      }, 2200);
    }
  };

  // Keyboard Event Handlers with Input Buffering
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      audio.init();

      if (screen === 'BATTLE') {
        if (e.code === 'Escape' || e.code === 'KeyP') {
          setIsPaused((p) => !p);
          return;
        }
      }

      if (isPaused) return;

      if (screen === 'TITLE_MENU') {
        if (e.code === 'Space' || e.code === 'Enter') {
          audio.playCoin();
          setGameMode('PVP');
          setScreen('CHARACTER_SELECT');
          return;
        }
      }

      if (screen === 'CHARACTER_SELECT') {
        if (!p1Locked) {
          if (e.code === 'KeyA') {
            audio.playSelect();
            setP1SelectedIdx((prev) => (prev > 0 ? prev - 1 : CHARACTERS.length - 1));
          }
          if (e.code === 'KeyD') {
            audio.playSelect();
            setP1SelectedIdx((prev) => (prev < CHARACTERS.length - 1 ? prev + 1 : 0));
          }
          if (e.code === 'KeyR') selectRandomP1();
          if (e.code === 'Space') {
            audio.playLockIn();
            setP1Locked(true);
            if (p2Locked || gameMode !== 'PVP') setScreen('STAGE_SELECT');
          }
        }
        if (!p2Locked && gameMode === 'PVP') {
          if (e.code === 'ArrowLeft') {
            audio.playSelect();
            setP2SelectedIdx((prev) => (prev > 0 ? prev - 1 : CHARACTERS.length - 1));
          }
          if (e.code === 'ArrowRight') {
            audio.playSelect();
            setP2SelectedIdx((prev) => (prev < CHARACTERS.length - 1 ? prev + 1 : 0));
          }
          if (e.code === 'KeyM') selectRandomP2();
          if (e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.code === 'Enter') {
            audio.playLockIn();
            setP2Locked(true);
            if (p1Locked) setScreen('STAGE_SELECT');
          }
        }
        return;
      }

      if (screen === 'STAGE_SELECT') {
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
          audio.playSelect();
          setSelectedStageIdx((prev) => (prev > 0 ? prev - 1 : STAGES.length - 1));
        }
        if (e.code === 'ArrowRight' || e.code === 'KeyD') {
          audio.playSelect();
          setSelectedStageIdx((prev) => (prev < STAGES.length - 1 ? prev + 1 : 0));
        }
        if (e.code === 'KeyR') selectRandomStage();
        if (e.code === 'Space' || e.code === 'Enter') {
          triggerVSAndBattle(CHARACTERS[p1SelectedIdx], CHARACTERS[p2SelectedIdx]);
        }
        return;
      }

      // Skip Entrance Scenes on Space / Enter / Escape
      if (screen === 'VS_SCREEN') {
        if (e.code === 'Space' || e.code === 'Enter' || e.code === 'Escape') {
          skipIntroToFight();
          return;
        }
      }

      // In Battle
      if (screen === 'BATTLE') {
        // Execute Fatality when prompt is active
        if (finisherState === 'FINISH_HIM_WAIT') {
          if (e.code === 'KeyF' || e.code === 'KeyY' || e.code === 'KeyU' || e.code === 'Space' || e.code === 'Enter') {
            executeFatality();
            return;
          }
        }

        if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
          e.preventDefault();
        }

        const f1 = fighter1Ref.current;
        const f2 = fighter2Ref.current;

        // Player 1 Controls (Buffered & Instant)
        if (e.code === 'KeyW' && f1 && f1.isGrounded && !f1.isDead && f1.hitStunDuration <= 0 && f1.blockStunDuration <= 0) {
          f1.velocity.y = f1.jumpForce;
          audio.playSelect();
        }
        if (e.code === 'KeyA') keysRef.current.a = true;
        if (e.code === 'KeyD') keysRef.current.d = true;

        if (e.code === 'KeyS' && f1) {
          keysRef.current.s = true;
          f1.block(true);
        }

        // Q = DASH LEFT strictly, E = INTERACT PROP or DASH RIGHT
        if (e.code === 'KeyQ' && f1) {
          f1.bufferInput('DASH_L');
          if (f1.attackPhase === 'NONE') f1.dash('left');
        }
        if (e.code === 'KeyE' && f1) {
          // Check if near stage prop: throw it! Otherwise dash right
          const f1CenterX = f1.position.x + f1.width / 2;
          const hasNearbyProp = stagePropsRef.current.some(
            (p) => !p.isBroken && !p.isFlying && Math.abs(f1CenterX - (p.x + p.width / 2)) < 110
          );
          if (hasNearbyProp) {
            handleP1InteractProp();
          } else {
            f1.bufferInput('DASH_R');
            if (f1.attackPhase === 'NONE') f1.dash('right');
          }
        }

        // Tag Switch (Key T)
        if (e.code === 'KeyT') {
          handleP1TagSwitch();
        }

        // Call Assist Strike (Key R)
        if (e.code === 'KeyR') {
          handleP1CallAssist();
        }

        // Player 1 Attacks (2 Light, 2 Heavy, 1 Ultimate)
        // Light 1 (Element 1): Space or J
        if ((e.code === 'Space' || e.code === 'KeyJ') && f1) {
          f1.bufferInput('LIGHT_1');
          if (f1.attackPhase === 'NONE' || f1.cancelWindowActive) f1.startLightAttack(1);
        }

        // Light 2 (Element 2): C or K
        if ((e.code === 'KeyC' || e.code === 'KeyK') && f1) {
          f1.bufferInput('LIGHT_2');
          if (f1.attackPhase === 'NONE' || f1.cancelWindowActive) f1.startLightAttack(2);
        }

        // Heavy 1 (Element 1): F or H
        if ((e.code === 'KeyF' || e.code === 'KeyH') && f1) {
          f1.bufferInput('HEAVY_1');
          if (f1.attackPhase === 'NONE' || f1.cancelWindowActive) f1.startHeavyAttack(1, spawnProjectile);
        }

        // Heavy 2 (Element 2): G or I
        if ((e.code === 'KeyG' || e.code === 'KeyI') && f1) {
          f1.bufferInput('HEAVY_2');
          if (f1.attackPhase === 'NONE' || f1.cancelWindowActive) f1.startHeavyAttack(2, spawnProjectile);
        }

        // Ultimate Attack: Y or U (or O)
        if ((e.code === 'KeyY' || e.code === 'KeyU' || e.code === 'KeyO') && f1) {
          f1.bufferInput('ULTIMATE');
          const fired = f1.startUltimateAttack(spawnProjectile, triggerFieldEffect, gameMode === 'TRAINING');
          setP1Ult(f1.ultimateMeter);
          if (!fired && f1.ultimateMeter < 100) {
            setUltNotice(`⚠️ Ultimate meter not full (${Math.round(f1.ultimateMeter)}% / 100%) - Strike opponent to charge`);
            setTimeout(() => setUltNotice(null), 2000);
          }
        }

        // Player 2 Controls (Only if PVP)
        if (gameMode === 'PVP') {
          if (e.code === 'ArrowUp' && f2 && f2.isGrounded && !f2.isDead && f2.hitStunDuration <= 0 && f2.blockStunDuration <= 0) {
            f2.velocity.y = f2.jumpForce;
            audio.playSelect();
          }
          if (e.code === 'ArrowLeft') keysRef.current.ArrowLeft = true;
          if (e.code === 'ArrowRight') keysRef.current.ArrowRight = true;

          if (e.code === 'ArrowDown' && f2) {
            keysRef.current.ArrowDown = true;
            f2.block(true);
          }

          if ((e.code === 'BracketLeft' || e.code === 'Numpad7') && f2) {
            f2.bufferInput('DASH_L');
            if (f2.attackPhase === 'NONE') f2.dash('left');
          }
          if ((e.code === 'BracketRight' || e.code === 'Numpad9') && f2) {
            f2.bufferInput('DASH_R');
            if (f2.attackPhase === 'NONE') f2.dash('right');
          }

          // P2 Tag Switch: Numpad8 or KeyO
          if (e.code === 'Numpad8' || e.code === 'KeyO') {
            handleP2TagSwitch();
          }

          // P2 Call Assist: Numpad6 or Backslash
          if (e.code === 'Numpad6' || e.code === 'Backslash') {
            handleP2CallAssist();
          }

          // P2 Interact Prop: Quote or Numpad3
          if (e.code === 'Quote' || e.code === 'Numpad3') {
            handleP2InteractProp();
          }

          // P2 Light 1 (Element 1): Shift or Numpad1
          if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.code === 'Numpad1') && f2) {
            f2.bufferInput('LIGHT_1');
            if (f2.attackPhase === 'NONE' || f2.cancelWindowActive) f2.startLightAttack(1);
          }

          // P2 Light 2 (Element 2): Slash or Numpad2
          if ((e.code === 'Slash' || e.code === 'Numpad2') && f2) {
            f2.bufferInput('LIGHT_2');
            if (f2.attackPhase === 'NONE' || f2.cancelWindowActive) f2.startLightAttack(2);
          }

          // P2 Heavy 1 (Element 1): Period (.) or Numpad4
          if ((e.code === 'Period' || e.code === 'Numpad4') && f2) {
            f2.bufferInput('HEAVY_1');
            if (f2.attackPhase === 'NONE' || f2.cancelWindowActive) f2.startHeavyAttack(1, spawnProjectile);
          }

          // P2 Heavy 2 (Element 2): Semicolon (;) or L or Numpad5
          if ((e.code === 'Semicolon' || e.code === 'KeyL' || e.code === 'Numpad5') && f2) {
            f2.bufferInput('HEAVY_2');
            if (f2.attackPhase === 'NONE' || f2.cancelWindowActive) f2.startHeavyAttack(2, spawnProjectile);
          }

          // P2 Ultimate: Enter or Numpad0
          if ((e.code === 'Enter' || e.code === 'Numpad0') && f2) {
            f2.bufferInput('ULTIMATE');
            f2.startUltimateAttack(spawnProjectile, triggerFieldEffect);
            setP2Ult(f2.ultimateMeter);
          }
        }
      }

      if (screen === 'GAME_OVER' && e.code === 'KeyR') {
        startMatch(CHARACTERS[p1SelectedIdx], CHARACTERS[p2SelectedIdx]);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const f1 = fighter1Ref.current;
      const f2 = fighter2Ref.current;

      if (e.code === 'KeyA') keysRef.current.a = false;
      if (e.code === 'KeyD') keysRef.current.d = false;
      if (e.code === 'KeyS' && f1) {
        keysRef.current.s = false;
        f1.block(false);
      }

      if (e.code === 'ArrowLeft') keysRef.current.ArrowLeft = false;
      if (e.code === 'ArrowRight') keysRef.current.ArrowRight = false;
      if (e.code === 'ArrowDown' && f2) {
        keysRef.current.ArrowDown = false;
        f2.block(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [screen, isPaused, p1Locked, p2Locked, p1SelectedIdx, p2SelectedIdx, selectedStageIdx, gameMode, roundsToWin, matchDuration, p1RoundsWon, p2RoundsWon]);

  // AI Logic Engine for PVE & Training Modes
  const updateAIController = (f2: CanvasFighter, f1: CanvasFighter) => {
    if (f2.isDead || isGameOverRef.current) return;

    if (gameMode === 'TRAINING') {
      if (dummyBehavior === 'STAND') {
        f2.velocity.x = 0;
        f2.block(false);
      } else if (dummyBehavior === 'BLOCK') {
        f2.velocity.x = 0;
        f2.block(true);
      } else if (dummyBehavior === 'JUMP') {
        f2.block(false);
        if (f2.isGrounded && Math.random() < 0.035) {
          f2.velocity.y = f2.jumpForce;
        }
      } else if (dummyBehavior === 'ATTACK') {
        const dx = f1.position.x - f2.position.x;
        const dist = Math.abs(dx);
        if (dist > 140) {
          f2.velocity.x = dx > 0 ? f2.speed * 0.7 : -f2.speed * 0.7;
        } else {
          f2.velocity.x = 0;
          if (Math.random() < 0.04 && f2.attackPhase === 'NONE') {
            f2.startLightAttack();
          }
        }
      }

      if (f2.health < 40) {
        f2.health = MAX_FIGHTER_HEALTH;
        setP2Health(MAX_FIGHTER_HEALTH);
        setP2DamageLag(MAX_FIGHTER_HEALTH);
      }
      return;
    }

    if (gameMode !== 'VS_AI') return;

    aiDecisionTimerRef.current++;
    const dx = f1.position.x - f2.position.x;
    const distance = Math.abs(dx);

    if (f1.attackPhase === 'ACTIVE' && distance < 130) {
      f2.block(true);
      return;
    } else {
      if (f2.isBlocking && Math.random() < 0.25) f2.block(false);
    }

    if (f2.ultimateMeter >= 100 && aiDecisionTimerRef.current % 30 === 0 && f2.attackPhase === 'NONE') {
      f2.startUltimateAttack(spawnProjectile, triggerFieldEffect);
      setP2Ult(f2.ultimateMeter);
      return;
    }

    if (aiDecisionTimerRef.current % 10 === 0 && f2.attackPhase === 'NONE') {
      if (distance > 220) {
        f2.velocity.x = dx > 0 ? f2.speed : -f2.speed;
        if (Math.random() < 0.35 && f2.heavyCooldown <= 0) {
          f2.startHeavyAttack(Math.random() < 0.5 ? 1 : 2, spawnProjectile);
        } else if (Math.random() < 0.2) {
          f2.dash(dx > 0 ? 'right' : 'left');
        }
      } else {
        f2.velocity.x = 0;
        const roll = Math.random();
        if (roll < 0.45) {
          f2.startLightAttack(Math.random() < 0.5 ? 1 : 2);
        } else if (roll < 0.7 && f2.heavyCooldown <= 0) {
          f2.startHeavyAttack(Math.random() < 0.5 ? 1 : 2, spawnProjectile);
        } else if (roll < 0.85 && f2.isGrounded) {
          f2.velocity.y = f2.jumpForce;
        } else {
          f2.block(true);
        }
      }
    }
  };

  // Main Canvas Render Loop with Hitstop Freeze & Frame Data
  useEffect(() => {
    if (screen !== 'BATTLE' && screen !== 'GAME_OVER') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      animId = requestAnimationFrame(render);

      if (isPaused) {
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.restore();
        return;
      }

      // HIT STOP (Game Feel Freeze Frame on Impact)
      if (hitStopFramesRef.current > 0) {
        hitStopFramesRef.current--;
        return; // Freeze execution for crunchy impact sensation!
      }

      const f1 = fighter1Ref.current;
      const f2 = fighter2Ref.current;
      if (!f1 || !f2) return;

      updateAIController(f2, f1);

      if (gameMode !== 'TRAINING' && !finishHimTriggered && (f1.health <= 28 || f2.health <= 28)) {
        setFinishHimTriggered(true);
      }

      // Screen Shake
      ctx.save();
      if (screenShakeRef.current > 0) {
        const shakeX = (Math.random() - 0.5) * screenShakeRef.current;
        const shakeY = (Math.random() - 0.5) * screenShakeRef.current;
        ctx.translate(shakeX, shakeY);
        screenShakeRef.current *= 0.86;
        if (screenShakeRef.current < 0.4) screenShakeRef.current = 0;
      }

      // Draw Background
      const currentStage = STAGES[selectedStageIdx];
      const stageImg = stageImagesRef.current[currentStage.id];
      if (stageImg && stageImg.complete) {
        ctx.drawImage(stageImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      } else {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      }

      const fogGrad = ctx.createLinearGradient(0, GROUND_Y - 45, 0, GROUND_Y + 30);
      fogGrad.addColorStop(0, 'rgba(15, 23, 42, 0)');
      fogGrad.addColorStop(1, 'rgba(15, 23, 42, 0.55)');
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, GROUND_Y - 45, CANVAS_WIDTH, 75);

      // Update Tag and Assist Cooldowns
      if (p1TagCdRef.current > 0) {
        p1TagCdRef.current--;
        if (p1TagCdRef.current % 30 === 0) setP1TagCd(Math.ceil(p1TagCdRef.current / 60));
      }
      if (p1AssistCdRef.current > 0) {
        p1AssistCdRef.current--;
        if (p1AssistCdRef.current % 30 === 0) setP1AssistCd(Math.ceil(p1AssistCdRef.current / 60));
      }
      if (p2TagCdRef.current > 0) {
        p2TagCdRef.current--;
        if (p2TagCdRef.current % 30 === 0) setP2TagCd(Math.ceil(p2TagCdRef.current / 60));
      }
      if (p2AssistCdRef.current > 0) {
        p2AssistCdRef.current--;
        if (p2AssistCdRef.current % 30 === 0) setP2AssistCd(Math.ceil(p2AssistCdRef.current / 60));
      }

      // Draw Persistent Floor Blood Decals (Environment Stains)
      for (let bi = 0; bi < bloodDecalsRef.current.length; bi++) {
        const decal = bloodDecalsRef.current[bi];
        ctx.save();
        ctx.fillStyle = decal.color;
        ctx.globalAlpha = decal.alpha;
        ctx.beginPath();
        ctx.ellipse(decal.x, decal.y, decal.width, decal.height, 0, 0, Math.PI * 2);
        ctx.fill();
        for (let si = 0; si < decal.splatters.length; si++) {
          const sp = decal.splatters[si];
          ctx.beginPath();
          ctx.arc(decal.x + sp.dx, decal.y + sp.dy, sp.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // Update & Render Stage Props (Interactive stage objects)
      for (let pi = stagePropsRef.current.length - 1; pi >= 0; pi--) {
        const prop = stagePropsRef.current[pi];

        // Flying prop physics & collision
        if (prop.isFlying && !prop.isBroken) {
          prop.x += prop.vx;
          prop.y += prop.vy;
          prop.vy += 0.35;

          const targetFighter = prop.thrownBy === 'p1' ? f2 : f1;
          const hitTarget =
            prop.x + prop.width >= targetFighter.position.x &&
            prop.x <= targetFighter.position.x + targetFighter.width &&
            prop.y + prop.height >= targetFighter.position.y &&
            prop.y <= targetFighter.position.y + targetFighter.height;

          if (hitTarget) {
            prop.isBroken = true;
            prop.isFlying = false;
            audio.playPropSmash();
            screenShakeRef.current = 24;

            targetFighter.takeHit(15, 28, 12, prop.vx > 0 ? 11 : -11, -5, prop.x, (hitX, hitY) => {
              triggerVFX(hitX, hitY, prop.glowColor, false);
              spawnBloodDecal(hitX);
            });

            for (let d = 0; d < 35; d++) {
              const angle = Math.random() * Math.PI * 2;
              const speed = Math.random() * 12 + 3;
              particlesRef.current.push({
                x: prop.x + prop.width / 2,
                y: prop.y + prop.height / 2,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 4,
                size: Math.random() * 6 + 2,
                color: d % 2 === 0 ? prop.glowColor : prop.color,
                life: 1.0,
                decay: Math.random() * 0.04 + 0.02
              });
            }

            if (prop.thrownBy === 'p1') {
              setP2Health(f2.health);
              setTimeout(() => setP2DamageLag(f2.health), 220);
              if (f2.health <= 0 && !isGameOverRef.current && gameMode !== 'TRAINING') {
                checkFinisherOrRoundEnd(f1, f2, p1Combo + 1);
              }
            } else {
              setP1Health(f1.health);
              setTimeout(() => setP1DamageLag(f1.health), 220);
              if (f1.health <= 0 && !isGameOverRef.current && gameMode !== 'TRAINING') {
                checkFinisherOrRoundEnd(f2, f1, p2Combo + 1);
              }
            }
          } else if (prop.x < 10 || prop.x > CANVAS_WIDTH - 10 || prop.y >= GROUND_Y - 15) {
            prop.isBroken = true;
            prop.isFlying = false;
            audio.playPropSmash();
            screenShakeRef.current = 14;
            for (let d = 0; d < 25; d++) {
              const angle = Math.random() * Math.PI * 2;
              const speed = Math.random() * 10 + 2;
              particlesRef.current.push({
                x: prop.x + prop.width / 2,
                y: Math.min(GROUND_Y, prop.y + prop.height),
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 3,
                size: Math.random() * 5 + 2,
                color: prop.glowColor,
                life: 0.9,
                decay: Math.random() * 0.05 + 0.02
              });
            }
          }
        }

        // Knockback into props (wall-splat element)
        if (!prop.isBroken && !prop.isFlying) {
          const fighters: CanvasFighter[] = [f1, f2];
          for (const ftr of fighters) {
            if (ftr.hitStunDuration > 0 && Math.abs(ftr.velocity.x) > 5) {
              const collides =
                ftr.position.x + ftr.width >= prop.x &&
                ftr.position.x <= prop.x + prop.width &&
                ftr.position.y + ftr.height >= prop.y;

              if (collides) {
                prop.isBroken = true;
                audio.playPropSmash();
                screenShakeRef.current = 26;
                hitStopFramesRef.current = 5;

                ftr.takeHit(15, 30, 0, ftr.velocity.x > 0 ? -6 : 6, -4, prop.x, (hx: number, hy: number) => {
                  triggerVFX(hx, hy, prop.glowColor, false);
                  spawnBloodDecal(hx);
                });

                if (ftr === f1) {
                  setP1Health(f1.health);
                  setTimeout(() => setP1DamageLag(f1.health), 220);
                } else {
                  setP2Health(f2.health);
                  setTimeout(() => setP2DamageLag(f2.health), 220);
                }

                for (let d = 0; d < 40; d++) {
                  const angle = Math.random() * Math.PI * 2;
                  const speed = Math.random() * 14 + 4;
                  particlesRef.current.push({
                    x: prop.x + prop.width / 2,
                    y: prop.y + prop.height / 2,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - 5,
                    size: Math.random() * 6 + 2,
                    color: d % 2 === 0 ? prop.glowColor : prop.color,
                    life: 1.1,
                    decay: Math.random() * 0.03 + 0.02
                  });
                }
              }
            }
          }
        }

        // Draw Prop
        ctx.save();
        if (prop.isBroken) {
          ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
          ctx.fillRect(prop.x - 5, GROUND_Y - 12, prop.width + 10, 12);
          ctx.fillStyle = prop.glowColor;
          ctx.globalAlpha = 0.4;
          ctx.fillRect(prop.x + 5, GROUND_Y - 6, prop.width * 0.5, 6);
        } else {
          ctx.shadowColor = prop.glowColor;
          ctx.shadowBlur = prop.isFlying ? 28 : 14;

          ctx.fillStyle = prop.color;
          ctx.beginPath();
          ctx.roundRect(prop.x, prop.y, prop.width, prop.height, [8, 8, 4, 4]);
          ctx.fill();

          ctx.fillStyle = prop.glowColor;
          ctx.fillRect(prop.x + 6, prop.y + 6, prop.width - 12, 5);
          ctx.fillRect(prop.x + 6, prop.y + prop.height / 2, prop.width - 12, 3);

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          const nearP1 = Math.abs(f1.position.x + f1.width / 2 - (prop.x + prop.width / 2)) < 100 && !prop.isFlying;
          if (nearP1) {
            ctx.fillStyle = '#facc15';
            ctx.font = 'bold 11px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('THROW [E]', prop.x + prop.width / 2, prop.y - 10);
          }
        }
        ctx.restore();
      }

      // Update & Render Active Assist Fighters
      for (let ai = activeAssistsRef.current.length - 1; ai >= 0; ai--) {
        const assist = activeAssistsRef.current[ai];
        assist.timer--;

        if (assist.phase === 'ENTER') {
          assist.x += assist.vx;
          if (assist.timer <= 38) {
            assist.phase = 'ATTACK';
          }
        } else if (assist.phase === 'ATTACK') {
          assist.x += assist.vx * 0.35;

          const defender = assist.ownerId === 'p1' ? f2 : f1;
          const collides =
            !assist.hasHit &&
            assist.x + 70 >= defender.position.x &&
            assist.x - 25 <= defender.position.x + defender.width;

          if (collides) {
            assist.hasHit = true;
            audio.playHeavyHit();
            screenShakeRef.current = 20;
            hitStopFramesRef.current = 6;

            defender.takeHit(15, 26, 10, assist.facing === 'right' ? 10 : -10, -5, assist.x, (hx, hy, isBlocked) => {
              triggerVFX(hx, hy, assist.elementColor, isBlocked);
              if (!isBlocked) spawnBloodDecal(hx);
            });

            if (assist.ownerId === 'p1') {
              setP1Combo((c) => c + 1);
              setP2Health(f2.health);
              setTimeout(() => setP2DamageLag(f2.health), 220);
              if (f2.health <= 0 && !isGameOverRef.current && gameMode !== 'TRAINING') {
                checkFinisherOrRoundEnd(f1, f2, p1Combo + 1);
              }
            } else {
              setP2Combo((c) => c + 1);
              setP1Health(f1.health);
              setTimeout(() => setP1DamageLag(f1.health), 220);
              if (f1.health <= 0 && !isGameOverRef.current && gameMode !== 'TRAINING') {
                checkFinisherOrRoundEnd(f2, f1, p2Combo + 1);
              }
            }
          }

          if (assist.timer <= 18) {
            assist.phase = 'EXIT';
            assist.vx = -assist.vx * 1.5;
          }
        } else if (assist.phase === 'EXIT') {
          assist.x += assist.vx;
          assist.y -= 3;
        }

        ctx.save();
        ctx.shadowColor = assist.elementColor;
        ctx.shadowBlur = 24;

        const aGrad = ctx.createRadialGradient(assist.x + 35, assist.y + 70, 10, assist.x + 35, assist.y + 70, 75);
        aGrad.addColorStop(0, `${assist.elementColor}99`);
        aGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = aGrad;
        ctx.beginPath();
        ctx.arc(assist.x + 35, assist.y + 70, 75, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`★ ASSIST: ${assist.character.name.toUpperCase()}!`, assist.x + 35, assist.y - 12);

        ctx.fillStyle = assist.elementColor;
        ctx.beginPath();
        ctx.roundRect(assist.x + 10, assist.y + 15, 50, 145, 12);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.restore();

        if (assist.timer <= 0) {
          activeAssistsRef.current.splice(ai, 1);
        }
      }

      // Player Movement Updates
      if (!f1.isDead && !f1.isBlocking && !f1.isDashing && f1.attackPhase === 'NONE' && f1.hitStunDuration <= 0 && f1.blockStunDuration <= 0) {
        if (keysRef.current.a) f1.velocity.x = -f1.speed;
        else if (keysRef.current.d) f1.velocity.x = f1.speed;
        else f1.velocity.x = 0;
      }

      if (gameMode === 'PVP' && !f2.isDead && !f2.isBlocking && !f2.isDashing && f2.attackPhase === 'NONE' && f2.hitStunDuration <= 0 && f2.blockStunDuration <= 0) {
        if (keysRef.current.ArrowLeft) f2.velocity.x = -f2.speed;
        else if (keysRef.current.ArrowRight) f2.velocity.x = f2.speed;
        else f2.velocity.x = 0;
      }

      if (f1.position.x < f2.position.x) {
        f1.facing = 'right';
        f2.facing = 'left';
      } else {
        f1.facing = 'left';
        f2.facing = 'right';
      }

      f1.update(GROUND_Y, CANVAS_WIDTH, GRAVITY, spawnProjectile, triggerFieldEffect);
      f2.update(GROUND_Y, CANVAS_WIDTH, GRAVITY, spawnProjectile, triggerFieldEffect);

      // VFX Generator
      const triggerVFX = (x: number, y: number, color: string, isBlocked: boolean, isUlt: boolean = false) => {
        screenShakeRef.current = isUlt ? 26 : (isBlocked ? 5 : 14);

        shockwavesRef.current.push({
          x,
          y,
          radius: 10,
          maxRadius: isUlt ? 95 : (isBlocked ? 35 : 55),
          color: isBlocked ? '#38bdf8' : color,
          alpha: 1.0
        });

        const count = isUlt ? 45 : (isBlocked ? 10 : 25);
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 11 + 3;
          particlesRef.current.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 5 + 2,
            color: isBlocked ? '#e0f2fe' : (i % 3 === 0 ? '#dc2626' : (i % 2 === 0 ? color : '#ffffff')),
            life: 1.0,
            decay: Math.random() * 0.05 + 0.03,
            isBlood: i % 3 === 0
          });
        }
      };

      // DYNAMIC HITBOX COLLISION (ACTIVE FRAMES ONLY)
      const checkDynamicHitbox = (attacker: CanvasFighter, defender: CanvasFighter) => {
        if (!attacker.dynamicHitbox.active || attacker.hasHitConnected) return false;

        const hb = attacker.dynamicHitbox;
        return (
          hb.x + hb.width >= defender.position.x &&
          hb.x <= defender.position.x + defender.width &&
          hb.y + hb.height >= defender.position.y &&
          hb.y <= defender.position.y + defender.height
        );
      };

      // Player 1 Hits Player 2
      if (checkDynamicHitbox(f1, f2) && f1.currentAttackKey) {
        const data = ATTACK_FRAME_DATA[f1.currentAttackKey];
        f1.hasHitConnected = true;
        f1.addUltimate(f1.currentAttackKey === 'ULTIMATE' ? 0 : 25);

        // Apply Hit Stop Freeze
        hitStopFramesRef.current = data.hitStop;
        screenShakeRef.current = data.screenShake;

        f2.takeHit(
          data.damage,
          data.hitStun,
          data.blockStun,
          data.knockbackX,
          data.knockbackY,
          f1.position.x,
          (hitX, hitY, isBlocked) => {
            triggerVFX(hitX, hitY, f1.character.themeColor, isBlocked, f1.currentAttackKey === 'ULTIMATE');
            if (!isBlocked) {
              setP1Combo((c) => c + 1);
              setTrainingTotalDamage((d) => d + data.damage);
              spawnBloodDecal(hitX);
            }
          }
        );

        setP1Ult(f1.ultimateMeter);
        setP2Health(f2.health);
        setTimeout(() => setP2DamageLag(f2.health), 220);
        if (f2.health <= 0 && !isGameOverRef.current && gameMode !== 'TRAINING') {
          checkFinisherOrRoundEnd(f1, f2, p1Combo + 1);
        }
      }

      // Player 2 Hits Player 1
      if (checkDynamicHitbox(f2, f1) && f2.currentAttackKey) {
        const data = ATTACK_FRAME_DATA[f2.currentAttackKey];
        f2.hasHitConnected = true;
        f2.addUltimate(f2.currentAttackKey === 'ULTIMATE' ? 0 : 25);

        hitStopFramesRef.current = data.hitStop;
        screenShakeRef.current = data.screenShake;

        f1.takeHit(
          data.damage,
          data.hitStun,
          data.blockStun,
          data.knockbackX,
          data.knockbackY,
          f2.position.x,
          (hitX, hitY, isBlocked) => {
            triggerVFX(hitX, hitY, f2.character.themeColor, isBlocked, f2.currentAttackKey === 'ULTIMATE');
            if (!isBlocked) {
              setP2Combo((c) => c + 1);
              spawnBloodDecal(hitX);
            }
          }
        );

        setP2Ult(f2.ultimateMeter);
        setP1Health(f1.health);
        setTimeout(() => setP1DamageLag(f1.health), 220);
        if (f1.health <= 0 && !isGameOverRef.current && gameMode !== 'TRAINING') {
          checkFinisherOrRoundEnd(f2, f1, p2Combo + 1);
        }
      }

      // Draw Ultimate Field Animations (Customized for each character's signature Ultimate)
      for (let i = ultFieldEffectsRef.current.length - 1; i >= 0; i--) {
        const ufe = ultFieldEffectsRef.current[i];
        ufe.duration--;
        const progress = 1 - ufe.duration / ufe.maxDuration;
        const alpha = Math.sin(progress * Math.PI);

        ctx.save();
        ctx.shadowColor = ufe.character.themeColor;
        ctx.shadowBlur = 40;

        if (ufe.character.id === 'idan') {
          // Idan: Nether Void Annihilation explosion
          // 1. Darken the arena to deep black void
          ctx.fillStyle = `rgba(10, 5, 20, ${0.45 * alpha})`;
          ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

          const centerX = CANVAS_WIDTH / 2;
          const centerY = GROUND_Y * 0.45;
          const voidRadius = (55 + Math.sin(progress * 12) * 12) * (progress < 0.75 ? 1 : (1 + (progress - 0.75) * 6));

          // Expanding Fire Explosion on detonation (progress > 0.65)
          if (progress > 0.65) {
            const expProg = (progress - 0.65) / 0.35;
            const expRadius = expProg * (CANVAS_WIDTH * 0.85);

            // Blinding fire wave
            const expGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, expRadius);
            expGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
            expGrad.addColorStop(0.2, 'rgba(251, 191, 36, 0.9)');
            expGrad.addColorStop(0.5, 'rgba(249, 115, 22, 0.75)');
            expGrad.addColorStop(0.8, 'rgba(239, 68, 68, 0.5)');
            expGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = expGrad;
            ctx.beginPath();
            ctx.arc(centerX, centerY, expRadius, 0, Math.PI * 2);
            ctx.fill();

            // Fire pillars rising from ground
            for (let f = 0; f < 7; f++) {
              const fx = (CANVAS_WIDTH / 7) * f + 50;
              const fH = Math.sin(expProg * Math.PI) * (GROUND_Y - 40);
              ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
              ctx.fillRect(fx - 25, GROUND_Y - fH, 50, fH);
              ctx.fillStyle = '#fef08a';
              ctx.fillRect(fx - 12, GROUND_Y - fH * 0.75, 24, fH * 0.75);
            }
          }

          // Rotating Flame Rings around the central Dark Void
          for (let r = 0; r < 4; r++) {
            const ringRadius = voidRadius + 22 + r * 14;
            const ringAngle = progress * 10 + (r * Math.PI) / 2;

            ctx.strokeStyle = r % 2 === 0 ? '#f97316' : '#ef4444';
            ctx.lineWidth = 4 + r;
            ctx.beginPath();
            ctx.arc(centerX, centerY, ringRadius, ringAngle, ringAngle + Math.PI * 1.35);
            ctx.stroke();

            // Flame particles orbiting
            const orbX = centerX + Math.cos(ringAngle) * ringRadius;
            const orbY = centerY + Math.sin(ringAngle) * ringRadius;
            ctx.fillStyle = '#fef08a';
            ctx.beginPath();
            ctx.arc(orbX, orbY, 6, 0, Math.PI * 2);
            ctx.fill();
          }

          // Central Pitch-Black Void Core
          ctx.fillStyle = '#050208';
          ctx.beginPath();
          ctx.arc(centerX, centerY, voidRadius, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 6;
          ctx.stroke();

          ctx.strokeStyle = '#7c3aed';
          ctx.lineWidth = 3;
          ctx.stroke();
        } else if (ufe.character.id === 'philip') {
          // Philip: Hyper Solar Beam
          ctx.fillStyle = `rgba(254, 240, 138, ${0.18 * alpha})`;
          ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

          const beamY = GROUND_Y * 0.52;
          const beamHeight = 170 * alpha;

          // Huge Full-screen Horizontal Hyper Solar Beam
          const beamGrad = ctx.createLinearGradient(0, beamY - beamHeight / 2, 0, beamY + beamHeight / 2);
          beamGrad.addColorStop(0, 'rgba(250, 204, 21, 0.15)');
          beamGrad.addColorStop(0.2, 'rgba(253, 224, 71, 0.85)');
          beamGrad.addColorStop(0.5, 'rgba(255, 255, 255, 1.0)');
          beamGrad.addColorStop(0.8, 'rgba(253, 224, 71, 0.85)');
          beamGrad.addColorStop(1, 'rgba(250, 204, 21, 0.15)');

          ctx.fillStyle = beamGrad;
          ctx.fillRect(0, beamY - beamHeight / 2, CANVAS_WIDTH, beamHeight);

          // Solar flares and vertical energy spires
          for (let x = 70; x < CANVAS_WIDTH; x += 120) {
            const flareH = Math.sin(progress * 4 + x / 100) * 140;
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3.5;
            ctx.beginPath();
            ctx.moveTo(x, beamY);
            ctx.lineTo(x + (Math.sin(x) * 35), beamY - flareH);
            ctx.stroke();

            // Earth crystal spires rising below
            const spireH = Math.sin((progress * 3 + x / CANVAS_WIDTH) * Math.PI) * 180;
            if (spireH > 15) {
              ctx.fillStyle = '#eab308';
              ctx.beginPath();
              ctx.moveTo(x - 22, GROUND_Y);
              ctx.lineTo(x, GROUND_Y - spireH);
              ctx.lineTo(x + 22, GROUND_Y);
              ctx.closePath();
              ctx.fill();
            }
          }
        } else if (ufe.character.id === 'ivan') {
          // Ivan: Thunder Hurricane Cyclone
          // Dark thunderstorm sky overlay
          ctx.fillStyle = `rgba(15, 23, 42, ${0.45 * alpha})`;
          ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

          // Sweeping Cyclone / Tornado column
          const cycloneX = CANVAS_WIDTH * 0.2 + (CANVAS_WIDTH * 0.6) * progress;
          const topRadius = 140 * alpha + 40;
          const bottomRadius = 45 * alpha + 15;

          // Tornado Funnel Gradient
          const tornGrad = ctx.createLinearGradient(cycloneX - topRadius, 0, cycloneX + topRadius, 0);
          tornGrad.addColorStop(0, 'rgba(56, 189, 248, 0.1)');
          tornGrad.addColorStop(0.3, 'rgba(125, 211, 252, 0.7)');
          tornGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.9)');
          tornGrad.addColorStop(0.7, 'rgba(56, 189, 248, 0.7)');
          tornGrad.addColorStop(1, 'rgba(14, 165, 233, 0.1)');

          ctx.fillStyle = tornGrad;
          ctx.beginPath();
          ctx.moveTo(cycloneX - topRadius, 0);
          ctx.lineTo(cycloneX + topRadius, 0);
          ctx.quadraticCurveTo(cycloneX + topRadius * 0.6, GROUND_Y * 0.5, cycloneX + bottomRadius, GROUND_Y);
          ctx.lineTo(cycloneX - bottomRadius, GROUND_Y);
          ctx.quadraticCurveTo(cycloneX - topRadius * 0.6, GROUND_Y * 0.5, cycloneX - topRadius, 0);
          ctx.closePath();
          ctx.fill();

          // 8 Branching Lightning Bolts crashing from sky through the tornado
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 4;
          for (let b = 0; b < 8; b++) {
            const bx = cycloneX + (Math.sin(b * 15 + progress * 25) * topRadius * 0.85);
            ctx.beginPath();
            ctx.moveTo(bx, 0);
            const midX1 = bx + (Math.sin(b * 4 + progress * 18) * 55);
            const midY1 = GROUND_Y * 0.35;
            const midX2 = bx - (Math.cos(b * 5 + progress * 20) * 45);
            const midY2 = GROUND_Y * 0.7;
            ctx.lineTo(midX1, midY1);
            ctx.lineTo(midX2, midY2);
            ctx.lineTo(bx + (Math.sin(b * 3) * 25), GROUND_Y);
            ctx.stroke();

            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        } else {
          // Roni: Crimson Tide Execution
          ctx.fillStyle = `rgba(6, 182, 212, ${0.18 * alpha})`;
          ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

          const arrowY = GROUND_Y * 0.52;
          const arrowX = CANVAS_WIDTH * progress;
          const arrowLen = 220;

          // Piercing Giant Water Arrow Core
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 14;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(arrowX - arrowLen, arrowY);
          ctx.lineTo(arrowX, arrowY);
          ctx.stroke();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 6;
          ctx.stroke();

          // Arrow Tip
          ctx.fillStyle = '#06b6d4';
          ctx.beginPath();
          ctx.moveTo(arrowX + 35, arrowY);
          ctx.lineTo(arrowX - 25, arrowY - 30);
          ctx.lineTo(arrowX - 10, arrowY);
          ctx.lineTo(arrowX - 25, arrowY + 30);
          ctx.closePath();
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.moveTo(arrowX + 35, arrowY);
          ctx.lineTo(arrowX - 15, arrowY - 14);
          ctx.lineTo(arrowX - 5, arrowY);
          ctx.lineTo(arrowX - 15, arrowY + 14);
          ctx.closePath();
          ctx.fill();

          // Double Helix Crimson Blood Spirals surrounding the water arrow
          for (let s = 0; s < 40; s++) {
            const sx = arrowX - arrowLen + (arrowLen / 40) * s;
            const bloodPhase = progress * 15 + s * 0.45;
            const bY1 = arrowY + Math.sin(bloodPhase) * 38;
            const bY2 = arrowY - Math.sin(bloodPhase) * 38;

            ctx.fillStyle = '#e11d48';
            ctx.beginPath();
            ctx.arc(sx, bY1, 6.5, 0, Math.PI * 2);
            ctx.arc(sx, bY2, 6.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#881337';
            ctx.beginPath();
            ctx.arc(sx, bY1, 3.5, 0, Math.PI * 2);
            ctx.arc(sx, bY2, 3.5, 0, Math.PI * 2);
            ctx.fill();
          }

          // Blood and Water Geysers at the floor
          for (let g = 80; g < CANVAS_WIDTH; g += 140) {
            const gH = Math.sin(progress * 5 + g) * 160;
            if (gH > 20) {
              ctx.fillStyle = 'rgba(6, 182, 212, 0.7)';
              ctx.fillRect(g - 16, GROUND_Y - gH, 32, gH);
              ctx.fillStyle = 'rgba(225, 29, 72, 0.75)';
              ctx.fillRect(g - 8, GROUND_Y - gH * 0.85, 16, gH * 0.85);
            }
          }
        }
        ctx.restore();

        if (ufe.duration <= 0) {
          ultFieldEffectsRef.current.splice(i, 1);
        }
      }

      // Update & Draw Projectiles (Element-Specific Models)
      for (let i = projectilesRef.current.length - 1; i >= 0; i--) {
        const p = projectilesRef.current[i];
        p.x += p.vx;
        p.life--;
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 8) p.trail.shift();

        const target = p.ownerId === 'p1' ? f2 : f1;
        const targetIsHit =
          p.x + p.size >= target.position.x &&
          p.x - p.size <= target.position.x + target.width &&
          p.y + p.size >= target.position.y &&
          p.y - p.size <= target.position.y + target.height;

        if (targetIsHit) {
          target.takeHit(
            p.damage,
            p.isUltimate ? 38 : 20,
            p.isUltimate ? 16 : 8,
            p.isUltimate ? 14 : 7,
            p.isUltimate ? -7 : -3,
            p.x,
            (hitX, hitY, isBlocked) => {
              triggerVFX(hitX, hitY, p.color, isBlocked, p.isUltimate);
              if (!isBlocked) {
                spawnBloodDecal(hitX);
                if (p.ownerId === 'p1') {
                  f1.addUltimate(p.isUltimate ? 0 : 35);
                  setP1Combo((c) => c + (p.isUltimate ? 6 : 2));
                  setTrainingTotalDamage((d) => d + p.damage);
                } else {
                  f2.addUltimate(p.isUltimate ? 0 : 35);
                  setP2Combo((c) => c + (p.isUltimate ? 6 : 2));
                }
              }
            }
          );

          setP1Ult(f1.ultimateMeter);
          setP2Ult(f2.ultimateMeter);

          if (p.ownerId === 'p1') {
            setP2Health(f2.health);
            setTimeout(() => setP2DamageLag(f2.health), 220);
            if (f2.health <= 0 && !isGameOverRef.current && gameMode !== 'TRAINING') {
              checkFinisherOrRoundEnd(f1, f2, p1Combo);
            }
          } else {
            setP1Health(f1.health);
            setTimeout(() => setP1DamageLag(f1.health), 220);
            if (f1.health <= 0 && !isGameOverRef.current && gameMode !== 'TRAINING') {
              checkFinisherOrRoundEnd(f2, f1, p2Combo);
            }
          }

          projectilesRef.current.splice(i, 1);
          continue;
        }

        if (p.x < -70 || p.x > CANVAS_WIDTH + 70 || p.life <= 0) {
          projectilesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.isUltimate ? 45 : 24;

        for (let t = 0; t < p.trail.length; t++) {
          const pt = p.trail[t];
          ctx.fillStyle = p.color;
          ctx.globalAlpha = (t / p.trail.length) * 0.45;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, p.size * (t / p.trail.length) * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = 1.0;

        if (p.type === 'void_nova') {
          // Idan ULTIMATE: Nether Void Orb
          // Outer flame rings
          const rot = Date.now() * 0.008;
          ctx.strokeStyle = '#f97316';
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.15, rot, rot + Math.PI * 1.5);
          ctx.stroke();

          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.95, -rot, -rot + Math.PI * 1.5);
          ctx.stroke();

          // Black Void Core
          ctx.fillStyle = '#05020a';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.75, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 3;
          ctx.stroke();
        } else if (p.type === 'solar_beam') {
          // Philip ULTIMATE & HEAVY 1: Solar Ray Beam
          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.size * 1.8, p.size * 0.7, 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.size * 1.4, p.size * 0.35, 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#eab308';
          ctx.lineWidth = 4;
          ctx.stroke();
        } else if (p.type === 'tornado') {
          // Ivan ULTIMATE: Lightning Tornado
          ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.size * 0.8, p.size * 1.3, 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(p.x - 20, p.y - 35);
          ctx.lineTo(p.x + 10, p.y - 5);
          ctx.lineTo(p.x - 10, p.y + 10);
          ctx.lineTo(p.x + 20, p.y + 35);
          ctx.stroke();
        } else if (p.type === 'blood_arrow') {
          // Roni ULTIMATE: Crimson Tide Water Arrow
          // Water Arrow Shaft & Tip
          ctx.fillStyle = '#06b6d4';
          ctx.beginPath();
          ctx.moveTo(p.x + (p.vx > 0 ? p.size * 1.2 : -p.size * 1.2), p.y);
          ctx.lineTo(p.x - (p.vx > 0 ? p.size * 0.8 : -p.size * 0.8), p.y - p.size * 0.6);
          ctx.lineTo(p.x - (p.vx > 0 ? p.size * 0.4 : -p.size * 0.4), p.y);
          ctx.lineTo(p.x - (p.vx > 0 ? p.size * 0.8 : -p.size * 0.8), p.y + p.size * 0.6);
          ctx.closePath();
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.size * 0.6, p.size * 0.25, 0, 0, Math.PI * 2);
          ctx.fill();

          // Surrounding Blood Orbs
          const bAngle = Date.now() * 0.01;
          for (let b = -2; b <= 2; b++) {
            const bx = p.x + b * 16;
            const by = p.y + Math.sin(bAngle + b) * 22;
            ctx.fillStyle = '#e11d48';
            ctx.beginPath();
            ctx.arc(bx, by, 6, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (p.type === 'darkness') {
          // Idan HEAVY 2: Graviton Void Pulse
          ctx.fillStyle = '#1e1035';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#a855f7';
          ctx.lineWidth = 4;
          ctx.stroke();

          ctx.fillStyle = '#000000';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'wind') {
          // Ivan HEAVY 1: Hurricane Wind Slash
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, -Math.PI * 0.4, Math.PI * 0.4, false);
          ctx.stroke();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(p.x - (p.vx > 0 ? 8 : -8), p.y, p.size * 0.7, -Math.PI * 0.35, Math.PI * 0.35, false);
          ctx.stroke();
        } else if (p.type === 'blood') {
          // Roni HEAVY 2: Crimson Boiling Sickle
          const scytheRot = Date.now() * 0.012;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(scytheRot);
          ctx.strokeStyle = '#e11d48';
          ctx.lineWidth = 7;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 0.8);
          ctx.stroke();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 0.7);
          ctx.stroke();
          ctx.restore();
        } else if (p.type === 'fireball') {
          // Idan HEAVY 1: Hellfire Orb
          ctx.fillStyle = '#f97316';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.65, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(p.x + (p.vx > 0 ? 5 : -5), p.y, p.size * 0.35, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'crystal') {
          // Philip HEAVY 2: Earth Crystal Geyser
          ctx.fillStyle = '#eab308';
          ctx.beginPath();
          ctx.moveTo(p.x + (p.vx > 0 ? p.size : -p.size), p.y);
          ctx.lineTo(p.x - (p.vx > 0 ? p.size * 0.6 : -p.size * 0.6), p.y - p.size * 0.6);
          ctx.lineTo(p.x - (p.vx > 0 ? p.size * 0.6 : -p.size * 0.6), p.y + p.size * 0.6);
          ctx.closePath();
          ctx.fill();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 3;
          ctx.stroke();
        } else if (p.type === 'water') {
          // Roni HEAVY 1: Tidal Tsunami Wave
          ctx.fillStyle = '#06b6d4';
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.size * 1.3, p.size * 0.75, 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#bae6fd';
          ctx.lineWidth = 3;
          ctx.stroke();
        } else {
          // Ivan HEAVY 2: Thunder Bolt Strike
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.85, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(p.x - 15, p.y - 12);
          ctx.lineTo(p.x + 4, p.y);
          ctx.lineTo(p.x - 6, p.y + 4);
          ctx.lineTo(p.x + 18, p.y + 14);
          ctx.stroke();
        }

        ctx.restore();
      }

      // In BRUTALITY: Hide loser fighter while gory explosion happens
      if (!(finisherState === 'BRUTALITY' && finisherWinnerId === 'p2')) {
        f1.draw(ctx, GROUND_Y);
      }
      if (!(finisherState === 'BRUTALITY' && finisherWinnerId === 'p1')) {
        f2.draw(ctx, GROUND_Y);
      }

      // IN FINISH HIM: Draw dark vignette + red spotlight on the dazed loser
      if (finisherState === 'FINISH_HIM_WAIT' && finisherWinnerId) {
        const loser = finisherWinnerId === 'p1' ? f2 : f1;
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        const lx = loser.position.x + loser.width / 2;
        const ly = loser.position.y + loser.height / 2;
        const spotGrad = ctx.createRadialGradient(lx, ly, 15, lx, ly, 150);
        spotGrad.addColorStop(0, 'rgba(239, 68, 68, 0.45)');
        spotGrad.addColorStop(0.6, 'rgba(239, 68, 68, 0.15)');
        spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = spotGrad;
        ctx.beginPath();
        ctx.arc(lx, ly, 150, 0, Math.PI * 2);
        ctx.fill();

        // Draw spinning dizzy stars above loser's head
        const starTime = Date.now() * 0.006;
        for (let s = 0; s < 4; s++) {
          const sAngle = starTime + (s * Math.PI) / 2;
          const sx = lx + Math.cos(sAngle) * 32;
          const sy = loser.position.y - 12 + Math.sin(sAngle) * 9;
          ctx.fillStyle = '#facc15';
          ctx.beginPath();
          ctx.arc(sx, sy, 5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      for (let i = shockwavesRef.current.length - 1; i >= 0; i--) {
        const sw = shockwavesRef.current[i];
        sw.radius += 5;
        sw.alpha -= 0.08;

        ctx.save();
        ctx.strokeStyle = sw.color;
        ctx.lineWidth = 4;
        ctx.globalAlpha = Math.max(0, sw.alpha);
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          shockwavesRef.current.splice(i, 1);
        }
      }

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
        }
      }

      ctx.restore();
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [screen, isPaused, selectedStageIdx, gameMode, dummyBehavior, finishHimTriggered]);

  const p1Char = CHARACTERS[p1SelectedIdx] || CHARACTERS[0];
  const p1AssistChar = CHARACTERS[p1AssistIdx] || CHARACTERS[1];
  const p2Char = CHARACTERS[p2SelectedIdx] || CHARACTERS[1];
  const p2AssistChar = CHARACTERS[p2AssistIdx] || CHARACTERS[2];
  const stage = STAGES[selectedStageIdx] || STAGES[0];
  const currentBgm = ANIME_OST_TRACKS[musicTrackIdx] || ANIME_OST_TRACKS[0];

  return (
    <div className="w-full h-[100dvh] max-h-[100dvh] bg-slate-950 text-slate-100 flex flex-col items-center justify-between p-1.5 sm:p-2 md:p-3 select-none font-sans overflow-hidden touch-none">
      {/* Top Universal Sound, Track & Fullscreen Bar */}
      <div className="w-full max-w-[1550px] flex items-center justify-between text-xs px-3 sm:px-4 py-1.5 sm:py-2 mb-1 sm:mb-2 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                audio.init();
                setMusicEnabled((m) => !m);
              }}
              className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
              title="Toggle Music"
            >
              <Music className={`w-4 h-4 ${musicEnabled ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`} />
            </button>
            <span className="text-slate-400 font-mono hidden md:inline">OST:</span>
            <span className="font-bold text-amber-300 truncate max-w-[150px] sm:max-w-xs md:max-w-md">
              {currentBgm.title}
            </span>
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">({musicStatusText})</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={prevTrack}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              title="Previous Track"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={nextTrack}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              title="Next Track"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Virtual Touch Controller Toggle Button */}
          <button
            onClick={() => setShowTouchControls((prev) => !prev)}
            className={`p-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 border ${
              showTouchControls
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title="Toggle On-Screen Touch Controls"
          >
            <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline font-bold text-[11px]">
              {showTouchControls ? 'TOUCH: ON' : 'TOUCH: OFF'}
            </span>
          </button>

          <button
            onClick={() => {
              audio.init();
              setSoundEnabled((s) => !s);
            }}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 transition cursor-pointer flex items-center gap-1"
            title="Toggle Sound Effects"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-sky-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
            <span className="hidden md:inline font-mono text-[11px]">{soundEnabled ? 'SFX ON' : 'MUTED'}</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer flex items-center gap-1 border border-slate-700"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize className="w-3.5 h-3.5 text-amber-400" /> : <Maximize className="w-3.5 h-3.5 text-amber-400" />}
            <span className="font-bold text-[11px] hidden sm:inline">{isFullscreen ? 'EXIT FULLSCREEN' : 'FULLSCREEN'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SCREEN 1: ARCADE MAIN MENU (CENTERED, CLEAN 5 BUTTONS - NO EXIT BUTTON) */}
      {/* ========================================================================= */}
      {screen === 'TITLE_MENU' && (
        <div className="w-full max-w-5xl aspect-[16/10] md:aspect-[16/9] bg-slate-950 rounded-3xl border-4 border-amber-500/60 shadow-[0_0_80px_rgba(245,158,11,0.25)] flex flex-col items-center justify-between p-6 md:p-8 mx-auto relative overflow-hidden my-auto">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.45)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />

          {/* Arcade Header */}
          <div className="w-full flex items-center justify-between z-20 text-xs font-mono text-amber-400/90 tracking-widest uppercase">
            <span>INSERT COIN</span>
            <span className="animate-pulse">CREDIT 02</span>
            <span>HI-SCORE 99990</span>
          </div>

          {/* Game Title */}
          <div className="flex flex-col items-center text-center z-20 my-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              THE ULTIMATE STREET FIGHTER CHAMPIONSHIP
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-black italic tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-red-600 drop-shadow-[0_5px_15px_rgba(239,68,68,0.7)]"
              style={{ fontFamily: "'Press Start 2P', monospace, sans-serif" }}
            >
              SQUAD NOOBS
            </h1>
            <div className="text-base sm:text-xl md:text-2xl font-black tracking-widest text-sky-400 mt-1 font-mono drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]">
              TAG-TEAM 2D FIGHTING CHAMPIONSHIP
            </div>

            {/* Exactly 5 Arcade Menu Buttons (Button 6 Exit removed) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 w-full max-w-3xl mt-6">
              {/* Button 1: Player vs Player */}
              <button
                onClick={() => {
                  audio.playCoin();
                  setGameMode('PVP');
                  setScreen('CHARACTER_SELECT');
                }}
                className="p-3.5 bg-gradient-to-r from-blue-900/80 to-indigo-900/80 hover:from-blue-600 hover:to-indigo-600 border-2 border-blue-400/60 rounded-xl flex items-center gap-3 text-left font-bold transition-all shadow-lg hover:scale-102 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-500 transition">
                  <User className="w-5 h-5 text-blue-300 group-hover:text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-black uppercase tracking-wide">1. PLAYER VS PLAYER</span>
                  <span className="text-[10px] text-blue-200/80">Local 2-Player Shared Keyboard</span>
                </div>
              </button>

              {/* Button 2: Player vs CPU */}
              <button
                onClick={() => {
                  audio.playCoin();
                  setGameMode('VS_AI');
                  setScreen('CHARACTER_SELECT');
                }}
                className="p-3.5 bg-gradient-to-r from-purple-900/80 to-pink-900/80 hover:from-purple-600 hover:to-pink-600 border-2 border-purple-400/60 rounded-xl flex items-center gap-3 text-left font-bold transition-all shadow-lg hover:scale-102 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-400 flex items-center justify-center shrink-0 group-hover:bg-purple-500 transition">
                  <Bot className="w-5 h-5 text-purple-300 group-hover:text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-black uppercase tracking-wide">2. PLAYER VS CPU</span>
                  <span className="text-[10px] text-purple-200/80">Challenging AI Battle</span>
                </div>
              </button>

              {/* Button 3: Training Dojo */}
              <button
                onClick={() => {
                  audio.playCoin();
                  setGameMode('TRAINING');
                  setScreen('CHARACTER_SELECT');
                }}
                className="p-3.5 bg-gradient-to-r from-amber-900/80 to-yellow-900/80 hover:from-amber-600 hover:to-yellow-600 border-2 border-amber-400/60 rounded-xl flex items-center gap-3 text-left font-bold transition-all shadow-lg hover:scale-102 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition">
                  <Target className="w-5 h-5 text-amber-300 group-hover:text-slate-950" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-black uppercase tracking-wide">3. TRAINING DOJO</span>
                  <span className="text-[10px] text-amber-200/80">Practice Dummy & Free Meter</span>
                </div>
              </button>

              {/* Button 4: Game Settings */}
              <button
                onClick={() => {
                  audio.playSelect();
                  setShowSettingsModal(true);
                }}
                className="p-3.5 bg-slate-900/80 hover:bg-slate-800 border-2 border-slate-700 hover:border-slate-500 rounded-xl flex items-center gap-3 text-left font-bold transition-all shadow-lg hover:scale-102 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-600 flex items-center justify-center shrink-0 group-hover:bg-slate-700 transition">
                  <Settings className="w-5 h-5 text-slate-300 group-hover:text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-black uppercase tracking-wide">4. SETTINGS</span>
                  <span className="text-[10px] text-slate-400">Audio, Timer & Target Rounds</span>
                </div>
              </button>

              {/* Button 5: IDL Credits */}
              <button
                onClick={() => {
                  audio.playSelect();
                  setShowCreditsModal(true);
                }}
                className="p-3.5 bg-slate-900/80 hover:bg-slate-800 border-2 border-amber-500/40 hover:border-amber-400 rounded-xl flex items-center gap-3 text-left font-bold transition-all shadow-lg hover:scale-102 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition">
                  <Award className="w-5 h-5 text-amber-300 group-hover:text-slate-950" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-black uppercase tracking-wide">5. IDL CREDITS</span>
                  <span className="text-[10px] text-amber-200/80">Creators, Engine & Tribute</span>
                </div>
              </button>
            </div>
          </div>

          {/* Arcade Footer */}
          <div className="text-xs text-amber-400/90 font-mono font-bold tracking-widest z-20 mt-4">
            2026 SQUAD NOOBS | IDL ENGINE V1.0
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: SETTINGS MODAL */}
      {/* ========================================================================= */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border-2 border-amber-500/80 rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black uppercase text-amber-400 flex items-center gap-2">
                <Settings className="w-5 h-5 text-amber-400" />
                GAME SETTINGS
              </h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Match Duration */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-400" />
                Default Match Duration:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {[120, 180, 240, 300].map((sec) => (
                  <button
                    key={`set-dur-${sec}`}
                    onClick={() => {
                      setMatchDuration(sec);
                      setTimer(sec);
                    }}
                    className={`py-2 rounded-lg font-bold text-xs transition cursor-pointer border ${
                      matchDuration === sec
                        ? 'bg-sky-500 text-slate-950 border-white shadow'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {sec} Seconds
                  </button>
                ))}
              </div>
            </div>

            {/* Rounds to Win */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                Target Rounds to Win:
              </span>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button
                    key={`set-rd-${r}`}
                    onClick={() => setRoundsToWin(r)}
                    className={`py-2 rounded-lg font-bold text-xs transition cursor-pointer border ${
                      roundsToWin === r
                        ? 'bg-amber-500 text-slate-950 border-white shadow'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {r} {r === 1 ? 'Round' : 'Rounds'}
                  </button>
                ))}
              </div>
            </div>

            {/* Volume Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>Music Volume (BGM):</span>
                  <span className="text-amber-400 font-mono">{Math.round(musicVolume * 100)}%</span>
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={musicVolume}
                  onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                  className="accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>Effects Volume (SFX):</span>
                  <span className="text-sky-400 font-mono">{Math.round(audio.sfxVolume * 100)}%</span>
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={audio.sfxVolume}
                  onChange={(e) => {
                    audio.sfxVolume = parseFloat(e.target.value);
                  }}
                  className="accent-sky-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Anime Track Picker */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-800">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Music className="w-4 h-4 text-purple-400" />
                Select Official Battle OST Track:
              </span>
              <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto">
                {ANIME_OST_TRACKS.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setMusicTrackIdx(idx);
                      setCustomMusicUrl('');
                    }}
                    className={`p-2 rounded-lg text-xs font-bold text-left flex items-center justify-between transition cursor-pointer border ${
                      musicTrackIdx === idx && !customMusicUrl
                        ? 'bg-purple-900/60 border-purple-400 text-purple-200 shadow'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span>{t.title}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{t.artistDesc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowSettingsModal(false)}
              className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm uppercase rounded-xl transition cursor-pointer mt-2"
            >
              SAVE & CLOSE
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: CREDITS MODAL (IDL ENGINE TRIBUTE) */}
      {/* ========================================================================= */}
      {showCreditsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border-2 border-amber-400 rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4 text-center">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-400" />
                <h3 className="text-lg font-black uppercase text-amber-400">OFFICIAL CREDITS - IDL ENGINE</h3>
              </div>
              <button
                onClick={() => setShowCreditsModal(false)}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-2 flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center shadow-[0_0_25px_rgba(251,191,36,0.5)]">
                <Sparkles className="w-8 h-8 text-amber-300 animate-pulse" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-wider font-mono">
                2026 SQUAD NOOBS
              </h2>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                POWERED BY IDL ENGINE V1.0
              </span>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2 leading-relaxed text-left">
              <p>
                👑 <strong>Production & Direction:</strong> IDL Studio & Creative Team.
              </p>
              <p>
                ⚔️ <strong>Champions:</strong>
                <br />
                • Ivan (Lightning & Wind Tempest)
                <br />
                • Idan (Infernal Black Fire & Dark Void)
                <br />
                • Philip (Solar Light & Crystal Titan)
                <br />
                • Roni (Crimson Blood & Tidal Wave)
              </p>
              <p>
                🎵 <strong>Soundtrack:</strong> Inspired by high-octane battle themes from One Piece, Demon Slayer, Attack on Titan, and Fairy Tail.
              </p>
              <p>
                🕹️ <strong>Arcade Legacy:</strong> Inspired by the technical frame data of Tekken, special cancels of Street Fighter, and brutal finishers of Mortal Kombat.
              </p>
            </div>

            <button
              onClick={() => setShowCreditsModal(false)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase rounded-xl transition cursor-pointer"
            >
              CLOSE CREDITS
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 2: CHARACTER SELECTION */}
      {/* ========================================================================= */}
      {screen === 'CHARACTER_SELECT' && (
        <div className="w-full max-w-6xl bg-slate-950 rounded-3xl border-2 border-slate-800 shadow-2xl p-4 md:p-6 flex flex-col gap-4 relative overflow-hidden mx-auto my-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2
                className="text-2xl md:text-3xl font-black uppercase text-amber-400 tracking-wider flex items-center gap-2"
                style={{ fontFamily: "'Press Start 2P', monospace, sans-serif", fontSize: '20px' }}
              >
                SELECT FIGHTER & ASSIST
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                GAME MODE:{' '}
                <span className="text-amber-300 font-bold">
                  {gameMode === 'TRAINING'
                    ? '🎯 TRAINING MODE (Select Fighter & Training Dummy)'
                    : gameMode === 'VS_AI'
                    ? '🤖 PLAYER VS CPU BOT'
                    : '🥊 2 PLAYERS (PVP)'}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={selectRandomP1}
                className="px-3 py-1.5 bg-blue-900/60 hover:bg-blue-800 border border-blue-500/50 rounded-lg text-xs font-bold text-blue-200 cursor-pointer flex items-center gap-1.5"
              >
                <Dices className="w-3.5 h-3.5" />
                RANDOM P1
              </button>
              {gameMode === 'PVP' && (
                <button
                  onClick={selectRandomP2}
                  className="px-3 py-1.5 bg-rose-900/60 hover:bg-rose-800 border border-rose-500/50 rounded-lg text-xs font-bold text-rose-200 cursor-pointer flex items-center gap-1.5"
                >
                  <Dices className="w-3.5 h-3.5" />
                  RANDOM P2
                </button>
              )}
              <button
                onClick={() => setScreen('TITLE_MENU')}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-slate-300 cursor-pointer"
              >
                BACK
              </button>
            </div>
          </div>

          {/* 4 Fighters + Random Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {CHARACTERS.map((char, idx) => {
              const isP1Point = p1SelectedIdx === idx;
              const isP1Assist = p1AssistIdx === idx;
              const isP2Point = p2SelectedIdx === idx;
              const isP2Assist = p2AssistIdx === idx;
              const IconComp = char.icon;

              return (
                <div
                  key={char.id}
                  className={`rounded-2xl border-2 p-2.5 bg-slate-900/90 flex flex-col justify-between gap-2 relative transition-all duration-200 shadow-xl ${
                    isP1Point
                      ? 'border-blue-500 ring-4 ring-blue-500/50 shadow-blue-500/30 scale-102'
                      : isP2Point
                      ? 'border-rose-500 ring-4 ring-rose-500/50 shadow-rose-500/30 scale-102'
                      : isP1Assist
                      ? 'border-cyan-400 ring-2 ring-cyan-400/40'
                      : isP2Assist
                      ? 'border-amber-400 ring-2 ring-amber-400/40'
                      : 'border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <IconComp className="w-3.5 h-3.5" />
                      {char.element}
                    </span>
                    <div className="flex items-center gap-1 flex-wrap justify-end">
                      {isP1Point && <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white font-mono text-[9px] font-bold">P1 POINT</span>}
                      {isP1Assist && <span className="px-1.5 py-0.5 rounded bg-cyan-600 text-white font-mono text-[9px] font-bold">P1 ASSIST</span>}
                      {isP2Point && (
                        <span className="px-1.5 py-0.5 rounded bg-rose-600 text-white font-mono text-[9px] font-bold">
                          {gameMode === 'TRAINING' ? 'DUMMY' : gameMode === 'VS_AI' ? 'CPU' : 'P2 POINT'}
                        </span>
                      )}
                      {isP2Assist && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-600 text-white font-mono text-[9px] font-bold">
                          {gameMode === 'TRAINING' ? 'DUMMY ASST' : gameMode === 'VS_AI' ? 'CPU ASST' : 'P2 ASST'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="aspect-[3/4] w-full rounded-xl overflow-hidden border border-slate-700/60 relative group">
                    <img src={char.imageSrc} alt={char.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent flex flex-col justify-end p-2 gap-1 text-[9px]">
                      <div className="flex items-center gap-1 font-bold">
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/90 text-slate-950 font-black">2 Light + 2 Heavy</span>
                        <span className="px-1.5 py-0.5 rounded bg-purple-600/90 text-white font-bold">Ultimate</span>
                      </div>
                      <span className="text-amber-300 font-bold truncate">⚡ {char.ultimate.name}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-black uppercase text-white truncate">{char.name}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-sky-300 font-bold">
                        {char.element1}
                      </span>
                      <span className="text-[10px] text-slate-500">+</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-amber-300 font-bold">
                        {char.element2}
                      </span>
                    </div>
                  </div>

                  {/* Player 1 Selection Buttons */}
                  <div className="grid grid-cols-2 gap-1 pt-0.5">
                    <button
                      onClick={() => {
                        audio.playSelect();
                        setP1SelectedIdx(idx);
                        if (p1AssistIdx === idx) {
                          setP1AssistIdx((idx + 1) % CHARACTERS.length);
                        }
                      }}
                      className={`py-1 rounded text-[10px] font-bold border transition cursor-pointer ${
                        isP1Point ? 'bg-blue-600 text-white border-blue-400' : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-blue-500/50'
                      }`}
                    >
                      P1 POINT
                    </button>
                    <button
                      onClick={() => {
                        audio.playSelect();
                        setP1AssistIdx(idx);
                        if (p1SelectedIdx === idx) {
                          setP1SelectedIdx((idx + 1) % CHARACTERS.length);
                        }
                      }}
                      className={`py-1 rounded text-[10px] font-bold border transition cursor-pointer ${
                        isP1Assist ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-cyan-500/50'
                      }`}
                    >
                      P1 ASSIST
                    </button>
                  </div>

                  {/* Player 2 / CPU Selection Buttons */}
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      onClick={() => {
                        audio.playSelect();
                        setP2SelectedIdx(idx);
                        if (p2AssistIdx === idx) {
                          setP2AssistIdx((idx + 1) % CHARACTERS.length);
                        }
                      }}
                      className={`py-1 rounded text-[10px] font-bold border transition cursor-pointer ${
                        isP2Point ? 'bg-rose-600 text-white border-rose-400' : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-rose-500/50'
                      }`}
                    >
                      {gameMode === 'TRAINING' ? 'DUMMY' : gameMode === 'VS_AI' ? 'CPU' : 'P2 POINT'}
                    </button>
                    <button
                      onClick={() => {
                        audio.playSelect();
                        setP2AssistIdx(idx);
                        if (p2SelectedIdx === idx) {
                          setP2SelectedIdx((idx + 1) % CHARACTERS.length);
                        }
                      }}
                      className={`py-1 rounded text-[10px] font-bold border transition cursor-pointer ${
                        isP2Assist ? 'bg-amber-600 text-white border-amber-400' : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-amber-500/50'
                      }`}
                    >
                      {gameMode === 'TRAINING' ? 'DUMMY ASST' : gameMode === 'VS_AI' ? 'CPU ASST' : 'P2 ASST'}
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Random Card */}
            <div className="rounded-2xl border-2 border-dashed border-amber-500/60 p-3 bg-gradient-to-b from-amber-950/20 to-slate-950 flex flex-col justify-between items-center text-center shadow-xl">
              <div className="w-full flex justify-center mt-3">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center animate-bounce shadow-[0_0_20px_rgba(251,191,36,0.5)]">
                  <Dices className="w-8 h-8 text-amber-300" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black uppercase text-amber-400 tracking-wider">RANDOM ?</h3>
                <p className="text-[11px] text-slate-400 mt-1">Randomized team selection</p>
              </div>

              <div className="w-full flex flex-col gap-1.5">
                <button
                  onClick={selectRandomP1}
                  className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition cursor-pointer shadow"
                >
                  🎲 Random P1 Team
                </button>
                {gameMode === 'PVP' && (
                  <button
                    onClick={selectRandomP2}
                    className="w-full py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition cursor-pointer shadow"
                  >
                    🎲 Random P2 Team
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Match Settings Bar */}
          {gameMode !== 'TRAINING' ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-slate-300">ROUNDS TO WIN:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button
                      key={`round-${r}`}
                      onClick={() => setRoundsToWin(r)}
                      className={`px-2.5 py-1 rounded font-bold transition cursor-pointer ${
                        roundsToWin === r ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  (First to {roundsToWin} wins the match)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400" />
                <span className="font-bold text-slate-300">MATCH DURATION:</span>
                <div className="flex items-center gap-1">
                  {[120, 180, 240, 300].map((sec) => (
                    <button
                      key={`dur-${sec}`}
                      onClick={() => {
                        setMatchDuration(sec);
                        setTimer(sec);
                      }}
                      className={`px-2.5 py-1 rounded font-bold transition cursor-pointer ${
                        matchDuration === sec ? 'bg-sky-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {sec}s
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-3 flex items-center justify-between text-xs text-amber-300">
              <div className="flex items-center gap-2 font-bold">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Training Mode Active: Infinite time (∞), instant ultimate meter charging, and auto-regenerating health.</span>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-3">
            <div className="text-xs text-slate-400">
              Player 1: <span className="text-blue-400 font-bold">{p1Char.name}</span> (Point) + <span className="text-cyan-400 font-bold">{p1AssistChar.name}</span> (Assist) |{' '}
              {gameMode === 'TRAINING' ? 'Dummy: ' : gameMode === 'VS_AI' ? 'CPU: ' : 'Player 2: '}
              <span className="text-rose-400 font-bold">{p2Char.name}</span> (Point) + <span className="text-amber-400 font-bold">{p2AssistChar.name}</span> (Assist)
            </div>

            <button
              onClick={() => {
                audio.playLockIn();
                setP1Locked(true);
                setP2Locked(true);
                setScreen('STAGE_SELECT');
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition cursor-pointer flex items-center gap-2"
            >
              <span>PROCEED TO STAGE SELECT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 3: STAGE SELECTION */}
      {/* ========================================================================= */}
      {screen === 'STAGE_SELECT' && (
        <div className="w-full max-w-6xl bg-slate-950 rounded-3xl border-2 border-slate-800 shadow-2xl p-4 md:p-6 flex flex-col gap-6 relative overflow-hidden mx-auto my-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2
                className="text-2xl md:text-3xl font-black uppercase text-amber-400 tracking-wider"
                style={{ fontFamily: "'Press Start 2P', monospace, sans-serif", fontSize: '20px' }}
              >
                SELECT BATTLE STAGE
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Choose an interactive arena with props and dynamic environmental physics, or pick Random.
              </p>
            </div>

            <button
              onClick={() => setScreen('CHARACTER_SELECT')}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-slate-300 cursor-pointer"
            >
              BACK TO FIGHTERS
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {STAGES.map((st, idx) => {
              const isSelected = selectedStageIdx === idx;
              return (
                <div
                  key={st.id}
                  onClick={() => {
                    audio.playSelect();
                    setSelectedStageIdx(idx);
                  }}
                  className={`rounded-2xl border-2 overflow-hidden bg-slate-900/90 flex flex-col transition-all cursor-pointer relative group ${
                    isSelected
                      ? 'border-amber-400 ring-4 ring-amber-500/50 shadow-[0_0_30px_rgba(251,191,36,0.4)] scale-102'
                      : 'border-slate-800 hover:border-slate-700 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="aspect-[16/9] w-full overflow-hidden relative">
                    <img src={st.bgUrl} alt={st.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <div className="p-3 flex flex-col gap-1">
                    <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{st.name}</span>
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{st.description}</p>
                  </div>
                </div>
              );
            })}

            <div
              onClick={selectRandomStage}
              className="rounded-2xl border-2 border-dashed border-purple-500/70 p-4 bg-gradient-to-b from-purple-950/30 to-slate-950 flex flex-col justify-between items-center text-center cursor-pointer hover:border-purple-400 transition group shadow-xl"
            >
              <div className="w-16 h-16 rounded-full bg-purple-500/20 border-2 border-purple-400 flex items-center justify-center group-hover:rotate-45 transition duration-300 shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                <Dices className="w-8 h-8 text-purple-300" />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase text-purple-300 tracking-wider">RANDOM STAGE</h3>
                <p className="text-[11px] text-slate-400 mt-1">Roll the arena roulette</p>
              </div>
              <button className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition shadow">
                🎲 Pick Random Stage
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-800 pt-4">
            <div className="text-sm font-bold text-slate-300">
              Selected Arena: <span className="text-amber-400">{stage.name}</span>
              {gameMode !== 'TRAINING' && (
                <>
                  {' '}| Target: <span className="text-amber-300">{roundsToWin} Rounds</span>
                </>
              )}
            </div>

            <button
              onClick={() => triggerVSAndBattle(p1Char, p2Char)}
              className="px-10 py-3.5 bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 hover:from-red-500 hover:to-yellow-400 text-slate-950 font-black text-base uppercase tracking-widest rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.7)] hover:scale-105 active:scale-95 transition cursor-pointer flex items-center gap-3 animate-pulse"
            >
              <span>{gameMode === 'TRAINING' ? 'START TRAINING (TRAIN)' : 'ENTER BATTLE (FIGHT)'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 4: VS SCREEN */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* SCREEN 4: VS SCREEN & CLASH DIALOGUE (WITH SKIP INTRO OPTION) */}
      {/* ========================================================================= */}
      {screen === 'VS_SCREEN' && (
        <div className="w-full max-w-6xl aspect-[16/9] bg-slate-950 rounded-3xl border-4 border-slate-700 shadow-2xl relative overflow-hidden flex flex-col justify-between mx-auto my-auto p-4 md:p-8 select-none">
          {/* Top Bar with Stage & Skip Button */}
          <div className="relative z-30 flex items-center justify-between w-full">
            <span className="px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-400/80 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{stage.name}</span>
            </span>

            {/* Prominent Skip Button */}
            <button
              onClick={skipIntroToFight}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs md:text-sm uppercase tracking-wider rounded-xl shadow-[0_0_25px_rgba(251,191,36,0.8)] hover:scale-105 active:scale-95 transition cursor-pointer flex items-center gap-2 animate-pulse"
            >
              <span>⏭️ SKIP INTRO (Space / Enter)</span>
            </button>
          </div>

          {/* Main Visual Clash Area */}
          <div className="absolute inset-0 flex items-center justify-between">
            {/* Player 1 Side */}
            <div className="w-1/2 h-full relative overflow-hidden flex flex-col justify-end p-6 md:p-10 bg-gradient-to-r from-blue-950/90 via-blue-950/40 to-transparent">
              <img
                src={p1Char.imageSrc}
                alt={p1Char.name}
                className="absolute inset-0 w-full h-full object-cover opacity-60 -scale-x-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="relative z-10 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs md:text-sm font-bold text-sky-400 uppercase tracking-widest font-mono">
                    PLAYER 1 TEAM
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-600/80 text-white text-[10px] font-mono font-bold">
                    Point: {p1Char.name} | Assist: {p1AssistChar.name}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic drop-shadow-md">
                  {p1Char.name}
                </h2>
                <span className="text-xs md:text-sm text-sky-300 font-bold">{p1Char.element}</span>

                {/* Player 1 Clash Dialogue Speech Bubble */}
                {clashDialogue && (
                  <div className="mt-3 p-3.5 bg-slate-900/95 border-2 border-sky-400/80 rounded-2xl rounded-bl-none shadow-xl max-w-sm backdrop-blur-md animate-in slide-in-from-left-4 duration-300">
                    <p className="text-xs md:text-sm font-bold text-white leading-relaxed">
                      💬 "{clashDialogue.p1Line}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Center Animated VS */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div className="flex flex-col items-center">
                <div
                  className="text-6xl md:text-9xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-red-600 drop-shadow-[0_0_40px_rgba(239,68,68,0.9)] animate-bounce"
                  style={{ fontFamily: "'Press Start 2P', monospace, sans-serif" }}
                >
                  VS
                </div>
                <span className="mt-2 text-[11px] font-mono font-black text-amber-400 uppercase tracking-widest bg-black/80 px-3 py-1 rounded-full border border-amber-400/50">
                  {gameMode === 'TRAINING' ? 'FREE TRAINING' : `FIRST TO ${roundsToWin} WINS`}
                </span>
              </div>
            </div>

            {/* Player 2 Side */}
            <div className="w-1/2 h-full relative overflow-hidden flex flex-col justify-end p-6 md:p-10 items-end text-right bg-gradient-to-l from-rose-950/90 via-rose-950/40 to-transparent">
              <img
                src={p2Char.imageSrc}
                alt={p2Char.name}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="relative z-10 flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-rose-600/80 text-white text-[10px] font-mono font-bold">
                    Point: {p2Char.name} | Assist: {p2AssistChar.name}
                  </span>
                  <span className="text-xs md:text-sm font-bold text-rose-400 uppercase tracking-widest font-mono">
                    {gameMode === 'TRAINING' ? 'TRAINING DUMMY' : gameMode === 'VS_AI' ? 'CPU BOT' : 'PLAYER 2 TEAM'}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic drop-shadow-md">
                  {p2Char.name}
                </h2>
                <span className="text-xs md:text-sm text-rose-300 font-bold">{p2Char.element}</span>

                {/* Player 2 Clash Dialogue Speech Bubble */}
                {clashDialogue && (
                  <div className="mt-3 p-3.5 bg-slate-900/95 border-2 border-rose-400/80 rounded-2xl rounded-br-none shadow-xl max-w-sm backdrop-blur-md text-right animate-in slide-in-from-right-4 duration-300">
                    <p className="text-xs md:text-sm font-bold text-white leading-relaxed">
                      "{clashDialogue.p2Line}" 💬
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 5: BATTLE ARENA (EXPANDED TO FULL GLORY & PERFECTLY CENTERED) */}
      {/* ========================================================================= */}
      {(screen === 'BATTLE' || screen === 'GAME_OVER') && (
        <div className="w-full max-w-[1550px] flex flex-col gap-1.5 md:gap-2.5 mx-auto my-auto items-center justify-center flex-1 min-h-0 overflow-hidden">
          {/* Main Battlefield Canvas Container */}
          <div className="w-full aspect-[16/9] max-h-[calc(100dvh-55px)] md:max-h-[78vh] bg-slate-950 rounded-2xl md:rounded-3xl border-2 md:border-4 border-slate-800 shadow-[0_0_60px_rgba(0,0,0,0.85)] relative overflow-hidden flex items-center justify-center">
            <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className="w-full h-full block object-contain" />

            {/* In-Game Heads-Up Display (HUD) */}
            <div className="absolute top-0 inset-x-0 p-3 md:p-5 flex items-start justify-between pointer-events-none z-20">
              {/* Player 1 HUD (Point Fighter + Assist Partner) */}
              <div className="w-[40%] flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  {/* Point Fighter Avatar */}
                  <div
                    className="w-11 h-11 md:w-13 md:h-13 rounded-2xl overflow-hidden border-2 shadow-lg flex items-center justify-center relative bg-slate-900"
                    style={{ borderColor: p1Char.themeColor }}
                    title={`Point Fighter: ${p1Char.name}`}
                  >
                    <img src={p1Char.imageSrc} alt={p1Char.name} className="w-full h-full object-cover -scale-x-100" />
                    <span className="absolute bottom-0 inset-x-0 bg-blue-600/90 text-white font-mono text-[8px] font-bold text-center">
                      POINT
                    </span>
                  </div>

                  {/* Assist Partner Avatar with Cooldown Badge */}
                  <button
                    onClick={handleP1TagSwitch}
                    disabled={p1TagCd > 0}
                    className="pointer-events-auto relative w-8 h-8 md:w-9 md:h-9 rounded-xl overflow-hidden border border-cyan-400/80 shadow bg-slate-900 cursor-pointer hover:scale-105 active:scale-95 transition"
                    title={`Assist Partner: ${p1AssistChar.name} (Click or press T to Tag Switch, R to call Assist)`}
                  >
                    <img src={p1AssistChar.imageSrc} alt={p1AssistChar.name} className="w-full h-full object-cover -scale-x-100" />
                    {p1TagCd > 0 ? (
                      <div className="absolute inset-0 bg-black/75 flex items-center justify-center text-[10px] font-mono font-bold text-amber-300">
                        {Math.ceil(p1TagCd)}s
                      </div>
                    ) : (
                      <span className="absolute bottom-0 inset-x-0 bg-cyan-600/90 text-white font-mono text-[7px] font-bold text-center">
                        ASST
                      </span>
                    )}
                  </button>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm md:text-base font-black uppercase tracking-wider drop-shadow-md text-sky-400">
                        {p1Char.name}
                      </span>
                      {/* Round Win Counters */}
                      {gameMode !== 'TRAINING' && (
                        <div className="flex items-center gap-1">
                          {Array.from({ length: roundsToWin }).map((_, i) => (
                            <div
                              key={`p1-rd-${i}`}
                              className={`w-3.5 h-3.5 rounded-full border border-sky-400 transition-all ${
                                i < p1RoundsWon ? 'bg-sky-400 shadow-[0_0_8px_#38bdf8]' : 'bg-slate-900'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] md:text-xs text-slate-300 font-medium">
                      {p1Char.element} • Asst: {p1AssistChar.name}
                    </span>
                  </div>
                </div>

                {/* Health Bar (Scaled cleanly to 200 HP, no internal percentage text) */}
                <div className="relative w-full h-6 md:h-8 bg-slate-950/85 rounded-lg border-2 border-slate-600 overflow-hidden shadow-inner backdrop-blur-sm">
                  <div
                    className="absolute top-0 bottom-0 right-0 bg-amber-400 transition-all duration-400 ease-out rounded"
                    style={{ width: `${Math.max(0, Math.min(100, (p1DamageLag / MAX_FIGHTER_HEALTH) * 100))}%` }}
                  />
                  <div
                    className="absolute top-0 bottom-0 right-0 bg-gradient-to-l from-blue-600 via-sky-400 to-cyan-300 transition-all duration-120 ease-out shadow-lg shadow-sky-500/50 rounded"
                    style={{ width: `${Math.max(0, Math.min(100, (p1Health / MAX_FIGHTER_HEALTH) * 100))}%` }}
                  />
                </div>

                {/* Ultimate Meter */}
                <div className="relative h-3 md:h-3.5 bg-slate-950 rounded-full border border-slate-700 overflow-hidden">
                  <div
                    className={`absolute top-0 bottom-0 right-0 transition-all duration-150 ${
                      p1Ult >= 100
                        ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 animate-pulse shadow-[0_0_12px_#fbbf24]'
                        : 'bg-gradient-to-l from-sky-500 to-indigo-500'
                    }`}
                    style={{ width: `${p1Ult}%` }}
                  />
                </div>

                {/* Interactive Clickable Tag, Assist & Ultimate HUD Action Bar */}
                <div className="flex items-center gap-1.5 pointer-events-auto flex-wrap">
                  {/* Tag Switch Button */}
                  <button
                    onClick={handleP1TagSwitch}
                    disabled={p1TagCd > 0}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 border shadow ${
                      p1TagCd === 0
                        ? 'bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                        : 'bg-slate-900/80 text-slate-500 border-slate-800 cursor-not-allowed'
                    }`}
                    title="Swap with Assist Partner (Key: T)"
                  >
                    <Repeat className="w-3 h-3" />
                    <span>{p1TagCd > 0 ? `TAG (${Math.ceil(p1TagCd)}s)` : 'TAG (T)'}</span>
                  </button>

                  {/* Assist Call Button */}
                  <button
                    onClick={handleP1CallAssist}
                    disabled={p1AssistCd > 0}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 border shadow ${
                      p1AssistCd === 0
                        ? 'bg-blue-600 hover:bg-blue-500 text-white border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.4)]'
                        : 'bg-slate-900/80 text-slate-500 border-slate-800 cursor-not-allowed'
                    }`}
                    title="Call Assist Partner for a Strike (Key: R)"
                  >
                    <Users className="w-3 h-3" />
                    <span>{p1AssistCd > 0 ? `ASSIST (${Math.ceil(p1AssistCd)}s)` : 'ASSIST (R)'}</span>
                  </button>

                  {/* Interactive Prop Throw Button */}
                  <button
                    onClick={handleP1InteractProp}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 border shadow bg-amber-900/60 hover:bg-amber-800 text-amber-200 border-amber-600/60"
                    title="Interact / Throw Stage Prop (Key: E)"
                  >
                    <Box className="w-3 h-3 text-amber-400" />
                    <span>PROP (E)</span>
                  </button>

                  {/* Ultimate Button */}
                  <button
                    onClick={triggerP1Ultimate}
                    className={`flex-1 py-1 px-2.5 rounded-lg text-[10px] md:text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1 border shadow ${
                      p1Ult >= 100 || gameMode === 'TRAINING'
                        ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 border-white shadow-[0_0_15px_#fbbf24] animate-pulse hover:scale-102'
                        : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>
                      {p1Ult >= 100 || gameMode === 'TRAINING' ? '⚡ ULTIMATE ART! (Y / U)' : `SUPER: ${Math.round(p1Ult)}%`}
                    </span>
                  </button>

                  {gameMode === 'TRAINING' && (
                    <button
                      onClick={maxP1Ultimate}
                      title="Instantly charge Super meter to 100%"
                      className="px-2 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-[10px] font-bold border border-purple-400 transition cursor-pointer shadow whitespace-nowrap"
                    >
                      ⚡ 100%
                    </button>
                  )}
                </div>

                {ultNotice && (
                  <div className="text-amber-400 font-bold text-xs bg-slate-950/90 border border-amber-400/60 rounded px-2.5 py-1 animate-pulse">
                    {ultNotice}
                  </div>
                )}

                {p1Combo > 1 && (
                  <div className="text-amber-400 font-black text-base italic tracking-widest animate-bounce">
                    {p1Combo} HITS COMBO!
                  </div>
                )}
              </div>

              {/* Center Round Timer & Pause */}
              <div className="flex flex-col items-center">
                <div className="w-18 h-14 md:w-22 md:h-16 bg-slate-950/90 border-2 border-amber-400/80 rounded-xl flex items-center justify-center shadow-xl shadow-amber-500/20 backdrop-blur-md">
                  <span className="font-mono text-3xl md:text-4xl font-black text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]">
                    {gameMode === 'TRAINING' ? '∞' : timer}
                  </span>
                </div>
                <span className="text-[11px] tracking-widest text-slate-300 font-bold uppercase mt-1">
                  {gameMode === 'TRAINING' ? (
                    <span className="text-amber-400 font-bold">FREE TRAINING</span>
                  ) : (
                    `ROUND ${p1RoundsWon + p2RoundsWon + 1} | FIRST TO ${roundsToWin} WINS`
                  )}
                </span>
                <button
                  onClick={() => setIsPaused(true)}
                  className="pointer-events-auto mt-1.5 px-3 py-1 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Pause className="w-3.5 h-3.5" />
                  PAUSE (P)
                </button>
              </div>

              {/* Player 2 HUD (Point Fighter + Assist Partner) */}
              <div className="w-[40%] flex flex-col gap-1.5 items-end">
                <div className="flex items-center gap-2 flex-row-reverse">
                  {/* Point Fighter Avatar */}
                  <div
                    className="w-11 h-11 md:w-13 md:h-13 rounded-2xl overflow-hidden border-2 shadow-lg flex items-center justify-center relative bg-slate-900"
                    style={{ borderColor: p2Char.themeColor }}
                    title={`Point Fighter: ${p2Char.name}`}
                  >
                    <img src={p2Char.imageSrc} alt={p2Char.name} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-rose-600/90 text-white font-mono text-[8px] font-bold text-center">
                      POINT
                    </span>
                  </div>

                  {/* Assist Partner Avatar with Cooldown Badge */}
                  <div
                    className="relative w-8 h-8 md:w-9 md:h-9 rounded-xl overflow-hidden border border-amber-400/80 shadow bg-slate-900"
                    title={`Assist Partner: ${p2AssistChar.name}`}
                  >
                    <img src={p2AssistChar.imageSrc} alt={p2AssistChar.name} className="w-full h-full object-cover" />
                    {p2TagCd > 0 ? (
                      <div className="absolute inset-0 bg-black/75 flex items-center justify-center text-[10px] font-mono font-bold text-amber-300">
                        {Math.ceil(p2TagCd)}s
                      </div>
                    ) : (
                      <span className="absolute bottom-0 inset-x-0 bg-amber-600/90 text-white font-mono text-[7px] font-bold text-center">
                        ASST
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 flex-row-reverse">
                      <span className="text-sm md:text-base font-black uppercase tracking-wider drop-shadow-md text-rose-400">
                        {p2Char.name}
                      </span>
                      {/* Round Win Counters */}
                      {gameMode !== 'TRAINING' && (
                        <div className="flex items-center gap-1">
                          {Array.from({ length: roundsToWin }).map((_, i) => (
                            <div
                              key={`p2-rd-${i}`}
                              className={`w-3.5 h-3.5 rounded-full border border-rose-400 transition-all ${
                                i < p2RoundsWon ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]' : 'bg-slate-900'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] md:text-xs text-slate-300 font-medium">
                      {gameMode === 'TRAINING' ? '🎯 Training Dummy' : gameMode === 'VS_AI' ? '🤖 CPU Bot' : `${p2Char.element} • Asst: ${p2AssistChar.name}`}
                    </span>
                  </div>
                </div>

                {/* Health Bar (Scaled cleanly to 200 HP, no internal percentage text) */}
                <div className="relative w-full h-6 md:h-8 bg-slate-950/85 rounded-lg border-2 border-slate-600 overflow-hidden shadow-inner backdrop-blur-sm">
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-amber-400 transition-all duration-400 ease-out rounded"
                    style={{ width: `${Math.max(0, Math.min(100, (p2DamageLag / MAX_FIGHTER_HEALTH) * 100))}%` }}
                  />
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 transition-all duration-120 ease-out shadow-lg shadow-rose-500/50 rounded"
                    style={{ width: `${Math.max(0, Math.min(100, (p2Health / MAX_FIGHTER_HEALTH) * 100))}%` }}
                  />
                </div>

                {/* Ultimate Meter */}
                <div className="relative w-full h-3 md:h-3.5 bg-slate-950 rounded-full border border-slate-700 overflow-hidden">
                  <div
                    className={`absolute top-0 bottom-0 left-0 transition-all duration-150 ${
                      p2Ult >= 100
                        ? 'bg-gradient-to-r from-rose-400 via-yellow-300 to-amber-500 animate-pulse shadow-[0_0_12px_#f43f5e]'
                        : 'bg-gradient-to-r from-rose-600 to-amber-500'
                    }`}
                    style={{ width: `${p2Ult}%` }}
                  />
                </div>

                <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono text-slate-400">
                  <span>Tag: {p2TagCd > 0 ? `${Math.ceil(p2TagCd)}s` : 'Ready'}</span>
                  <span>•</span>
                  <span>Assist: {p2AssistCd > 0 ? `${Math.ceil(p2AssistCd)}s` : 'Ready'}</span>
                  <span>•</span>
                  <span className={p2Ult >= 100 ? 'text-amber-300 font-bold' : ''}>
                    {p2Ult >= 100 ? '⚡ SUPER READY' : `SUPER: ${Math.round(p2Ult)}%`}
                  </span>
                </div>

                {p2Combo > 1 && (
                  <div className="text-rose-400 font-black text-base italic tracking-widest animate-bounce">
                    {p2Combo} HITS COMBO!
                  </div>
                )}
              </div>
            </div>

            {/* ROUND 1... FIGHT! Intro Announcement Banner */}
            {fightIntroBanner && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-35 animate-in zoom-in-75 fade-in duration-200">
                <div className="bg-slate-950/90 border-y-4 border-amber-400 px-8 md:px-14 py-4 md:py-6 transform -skew-x-6 shadow-[0_0_60px_rgba(251,191,36,0.85)] text-center">
                  <h2
                    className="text-3xl md:text-5xl font-black italic tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-red-500 drop-shadow-[0_0_25px_#fbbf24]"
                    style={{ fontFamily: "'Press Start 2P', monospace, sans-serif" }}
                  >
                    {fightIntroBanner}
                  </h2>
                </div>
              </div>
            )}

            {/* FINISH HIM! Dazed Execution Window */}
            {finisherState === 'FINISH_HIM_WAIT' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-35 animate-in fade-in zoom-in duration-200 pointer-events-none">
                <div className="bg-red-950/95 border-y-4 border-red-600 px-8 md:px-14 py-4 transform -skew-x-12 animate-pulse shadow-[0_0_60px_rgba(220,38,38,0.95)] text-center mb-6">
                  <h2
                    className="text-4xl md:text-6xl font-black italic tracking-widest text-red-500 drop-shadow-[0_0_30px_#ef4444]"
                    style={{ fontFamily: "'Press Start 2P', monospace, sans-serif" }}
                  >
                    FINISH HIM!
                  </h2>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                    <span className="text-amber-400 font-mono text-xs md:text-sm font-bold tracking-widest">
                      FATALITY WINDOW: {finishHimSecondsLeft}s
                    </span>
                  </div>
                </div>

                {/* Interactive Clickable Fatality Execution Button */}
                <div className="pointer-events-auto flex flex-col items-center gap-2.5">
                  <button
                    onClick={executeFatality}
                    className="px-8 py-3.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-base md:text-lg uppercase tracking-widest rounded-2xl border-2 border-red-400 shadow-[0_0_40px_rgba(239,68,68,0.95)] animate-bounce cursor-pointer flex items-center gap-3 active:scale-95 transition"
                  >
                    <Skull className="w-6 h-6 text-yellow-300 animate-spin" />
                    <span>💀 EXECUTE FATALITY NOW! (Press F / Click Here)</span>
                  </button>
                  <span className="text-[11px] md:text-xs text-slate-300 font-mono bg-black/80 px-4 py-1.5 rounded-full border border-red-500/50 backdrop-blur-sm">
                    Press F or Y on keyboard, or click the button to trigger a cinematic fatality!
                  </span>
                </div>
              </div>
            )}

            {/* FATALITY & BRUTALITY Cinematic Splash Banners */}
            {activeFinisherBanner && (
              <div className="absolute inset-0 bg-black/85 flex items-center justify-center z-40 pointer-events-none animate-in zoom-in-75 fade-in duration-200">
                <div className="max-w-xl w-full mx-4 p-8 bg-gradient-to-b from-slate-900 to-black border-4 border-red-600 rounded-3xl text-center shadow-[0_0_80px_rgba(239,68,68,0.95)] flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-red-600/30 border-2 border-red-500 flex items-center justify-center shadow-[0_0_35px_#ef4444] animate-pulse">
                    <Skull className="w-12 h-12 text-red-400" />
                  </div>

                  <h1
                    className={`text-5xl md:text-7xl font-black italic tracking-widest uppercase drop-shadow-[0_0_35px_#ef4444] ${
                      activeFinisherBanner.type === 'FATALITY'
                        ? 'text-transparent bg-clip-text bg-gradient-to-b from-red-400 via-rose-600 to-amber-500'
                        : 'text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-orange-500 to-red-600'
                    }`}
                    style={{ fontFamily: "'Press Start 2P', monospace, sans-serif" }}
                  >
                    {activeFinisherBanner.type}!
                  </h1>

                  <div className="text-xl md:text-2xl font-black text-amber-300 tracking-wider">
                    {activeFinisherBanner.winnerName} defeated {activeFinisherBanner.loserName}!
                  </div>

                  <div className="px-6 py-2.5 bg-red-950/90 border border-red-500/70 rounded-xl text-xs md:text-sm text-red-200 font-mono font-bold tracking-wider animate-pulse shadow">
                    {activeFinisherBanner.subText}
                  </div>
                </div>
              </div>
            )}

            {/* Round Notification Banner */}
            {roundNotification && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-30 animate-in fade-in zoom-in duration-200 pointer-events-none">
                <div className="px-8 py-4 bg-slate-900 border-2 border-amber-400 rounded-2xl text-center shadow-2xl">
                  <h3
                    className="text-3xl md:text-4xl font-black uppercase text-amber-400 italic"
                    style={{ fontFamily: "'Press Start 2P', monospace, sans-serif", fontSize: '22px' }}
                  >
                    {roundNotification}
                  </h3>
                  <span className="text-xs text-slate-300 font-mono mt-2 block animate-pulse">
                    Preparing next round...
                  </span>
                </div>
              </div>
            )}

            {/* Ultimate Cut-in Splash Banner */}
            {activeUltBanner && (
              <div className="absolute top-20 left-0 right-0 z-25 pointer-events-none flex justify-center animate-in slide-in-from-top-4 duration-150">
                <div className="mx-4 max-w-2xl w-full bg-slate-950/95 border-y-2 border-amber-400 py-2.5 px-6 rounded-xl shadow-[0_0_35px_rgba(251,191,36,0.6)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg border-2 border-amber-400 overflow-hidden shadow-lg animate-pulse">
                      <img src={CHARACTERS.find((c) => c.name === activeUltBanner.name)?.imageSrc} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase block">
                        ★ SUPER ULTIMATE ART ACTIVATED ★
                      </span>
                      <h3 className="text-lg md:text-xl font-black uppercase italic tracking-wide" style={{ color: activeUltBanner.color }}>
                        {activeUltBanner.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs font-black text-white bg-red-600 px-3 py-1 rounded-full uppercase tracking-wider animate-bounce">
                    MAX POWER!
                  </span>
                </div>
              </div>
            )}

            {/* PAUSE MENU OVERLAY (Zero Exit Button) */}
            {isPaused && (
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center z-40 animate-in fade-in zoom-in-95 duration-150">
                <div className="bg-slate-900 border-2 border-slate-700 p-6 rounded-2xl max-w-sm w-full flex flex-col items-center text-center shadow-2xl gap-4">
                  <h3
                    className="text-2xl font-black uppercase text-amber-400 tracking-wider"
                    style={{ fontFamily: "'Press Start 2P', monospace, sans-serif", fontSize: '18px' }}
                  >
                    GAME PAUSED
                  </h3>
                  <p className="text-xs text-slate-400">Battle is temporarily suspended</p>

                  <div className="flex flex-col gap-2.5 w-full mt-2">
                    <button
                      onClick={() => setIsPaused(false)}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm uppercase tracking-wider rounded-xl transition cursor-pointer shadow-lg"
                    >
                      RESUME BATTLE
                    </button>
                    <button
                      onClick={() => {
                        setupRound(true);
                      }}
                      className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
                    >
                      RESTART ROUND
                    </button>
                    <button
                      onClick={() => {
                        setIsPaused(false);
                        setScreen('CHARACTER_SELECT');
                      }}
                      className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
                    >
                      CHANGE CHARACTERS
                    </button>
                    <button
                      onClick={() => {
                        setIsPaused(false);
                        setScreen('TITLE_MENU');
                      }}
                      className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
                    >
                      RETURN TO MAIN MENU
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* GAME OVER SCREEN */}
            {screen === 'GAME_OVER' && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center z-40 animate-in fade-in zoom-in-95 duration-200">
                <div className="text-center flex flex-col items-center gap-4 max-w-lg p-6">
                  <div className="w-20 h-20 rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                    <Skull className="w-10 h-10 text-red-400" />
                  </div>

                  <h2
                    className="text-4xl md:text-5xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-amber-500 to-red-600 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]"
                    style={{ fontFamily: "'Press Start 2P', monospace, sans-serif", fontSize: '28px' }}
                  >
                    VICTORY!
                  </h2>

                  <p className="text-xl md:text-2xl font-black text-amber-300 drop-shadow">
                    {winner}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => startMatch(p1Char, p2Char)}
                      className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-indigo-500/30 border border-indigo-400/50 hover:scale-105 active:scale-95 transition cursor-pointer flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      REMATCH
                    </button>
                    <button
                      onClick={() => setScreen('STAGE_SELECT')}
                      className="px-5 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:scale-105 active:scale-95 transition cursor-pointer"
                    >
                      CHANGE STAGE
                    </button>
                    <button
                      onClick={() => {
                        setP1Locked(false);
                        setP2Locked(false);
                        setScreen('CHARACTER_SELECT');
                      }}
                      className="px-5 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:scale-105 active:scale-95 transition cursor-pointer"
                    >
                      CHANGE FIGHTERS
                    </button>
                    <button
                      onClick={() => setScreen('TITLE_MENU')}
                      className="px-5 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:scale-105 active:scale-95 transition cursor-pointer"
                    >
                      MAIN MENU
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* VIRTUAL ON-SCREEN TOUCH CONTROLLER WITH TAG, ASSIST & PROP INTEGRATION */}
            {/* ========================================================================= */}
            {showTouchControls && screen === 'BATTLE' && (
              <>
                {/* Left Side: Directional D-Pad, Dash & Team Tag/Assist */}
                <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 z-30 pointer-events-auto flex flex-col items-center gap-1 select-none touch-none">
                  {/* Jump Button (Up) */}
                  <button
                    onTouchStart={(e) => {
                      e.preventDefault();
                      handleTouchJump();
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleTouchJump();
                    }}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-950/50 active:bg-sky-500/50 hover:bg-slate-900/60 border-2 border-white/20 active:border-sky-400 backdrop-blur-md flex flex-col items-center justify-center text-white active:scale-95 transition shadow-lg cursor-pointer"
                    title="Jump (W)"
                  >
                    <span className="text-sm sm:text-base font-black leading-none">▲</span>
                    <span className="text-[7px] font-mono text-slate-300">JUMP</span>
                  </button>

                  {/* Horizontal row: Left, Block, Right */}
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    {/* Move Left */}
                    <button
                      onTouchStart={(e) => {
                        e.preventDefault();
                        keysRef.current.a = true;
                      }}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        keysRef.current.a = false;
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        keysRef.current.a = true;
                      }}
                      onMouseUp={(e) => {
                        e.preventDefault();
                        keysRef.current.a = false;
                      }}
                      onMouseLeave={(e) => {
                        e.preventDefault();
                        keysRef.current.a = false;
                      }}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-950/50 active:bg-sky-500/50 hover:bg-slate-900/60 border-2 border-white/20 active:border-sky-400 backdrop-blur-md flex flex-col items-center justify-center text-white active:scale-95 transition shadow-lg cursor-pointer"
                      title="Move Left (A)"
                    >
                      <span className="text-sm sm:text-base font-black leading-none">◄</span>
                      <span className="text-[7px] font-mono text-slate-300">LEFT</span>
                    </button>

                    {/* Block / Shield */}
                    <button
                      onTouchStart={(e) => {
                        e.preventDefault();
                        keysRef.current.s = true;
                        fighter1Ref.current?.block(true);
                      }}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        keysRef.current.s = false;
                        fighter1Ref.current?.block(false);
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        keysRef.current.s = true;
                        fighter1Ref.current?.block(true);
                      }}
                      onMouseUp={(e) => {
                        e.preventDefault();
                        keysRef.current.s = false;
                        fighter1Ref.current?.block(false);
                      }}
                      onMouseLeave={(e) => {
                        e.preventDefault();
                        keysRef.current.s = false;
                        fighter1Ref.current?.block(false);
                      }}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-950/60 active:bg-indigo-500/60 hover:bg-indigo-900/60 border-2 border-indigo-400/40 active:border-indigo-300 backdrop-blur-md flex flex-col items-center justify-center text-indigo-200 active:scale-95 transition shadow-lg cursor-pointer"
                      title="Block / Guard (S)"
                    >
                      <Shield className="w-3.5 h-3.5 text-indigo-300" />
                      <span className="text-[7px] font-mono text-indigo-200">BLOCK</span>
                    </button>

                    {/* Move Right */}
                    <button
                      onTouchStart={(e) => {
                        e.preventDefault();
                        keysRef.current.d = true;
                      }}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        keysRef.current.d = false;
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        keysRef.current.d = true;
                      }}
                      onMouseUp={(e) => {
                        e.preventDefault();
                        keysRef.current.d = false;
                      }}
                      onMouseLeave={(e) => {
                        e.preventDefault();
                        keysRef.current.d = false;
                      }}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-950/50 active:bg-sky-500/50 hover:bg-slate-900/60 border-2 border-white/20 active:border-sky-400 backdrop-blur-md flex flex-col items-center justify-center text-white active:scale-95 transition shadow-lg cursor-pointer"
                      title="Move Right (D)"
                    >
                      <span className="text-sm sm:text-base font-black leading-none">►</span>
                      <span className="text-[7px] font-mono text-slate-300">RIGHT</span>
                    </button>
                  </div>

                  {/* Dash Buttons */}
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <button
                      onTouchStart={(e) => {
                        e.preventDefault();
                        handleTouchDash('left');
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleTouchDash('left');
                      }}
                      className="px-2 py-0.5 rounded-lg bg-cyan-950/60 active:bg-cyan-500/60 border border-cyan-400/40 backdrop-blur-md text-[8px] font-bold text-cyan-300 active:scale-95 transition flex items-center gap-1 shadow cursor-pointer"
                      title="Dash Left (Q)"
                    >
                      <span>⚡ DASH Q</span>
                    </button>
                    <button
                      onTouchStart={(e) => {
                        e.preventDefault();
                        handleTouchDash('right');
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleTouchDash('right');
                      }}
                      className="px-2 py-0.5 rounded-lg bg-cyan-950/60 active:bg-cyan-500/60 border border-cyan-400/40 backdrop-blur-md text-[8px] font-bold text-cyan-300 active:scale-95 transition flex items-center gap-1 shadow cursor-pointer"
                      title="Dash Right (E)"
                    >
                      <span>DASH E ⚡</span>
                    </button>
                  </div>
                </div>

                {/* Right Side: Combat Actions, Tag/Assist & Ultimate */}
                <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-30 pointer-events-auto flex flex-col items-end gap-1 select-none touch-none">
                  {/* Tag, Assist & Prop Touch Buttons Row */}
                  <div className="flex items-center gap-1 mb-0.5">
                    <button
                      onTouchStart={(e) => {
                        e.preventDefault();
                        handleP1TagSwitch();
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleP1TagSwitch();
                      }}
                      disabled={p1TagCd > 0}
                      className={`px-2 py-1 rounded-lg border text-[8px] font-black uppercase transition active:scale-95 shadow cursor-pointer ${
                        p1TagCd === 0
                          ? 'bg-cyan-900/70 border-cyan-400 text-cyan-200'
                          : 'bg-slate-900/60 border-slate-800 text-slate-500'
                      }`}
                    >
                      {p1TagCd > 0 ? `TAG ${Math.ceil(p1TagCd)}s` : 'TAG (T)'}
                    </button>
                    <button
                      onTouchStart={(e) => {
                        e.preventDefault();
                        handleP1CallAssist();
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleP1CallAssist();
                      }}
                      disabled={p1AssistCd > 0}
                      className={`px-2 py-1 rounded-lg border text-[8px] font-black uppercase transition active:scale-95 shadow cursor-pointer ${
                        p1AssistCd === 0
                          ? 'bg-blue-900/70 border-blue-400 text-blue-200'
                          : 'bg-slate-900/60 border-slate-800 text-slate-500'
                      }`}
                    >
                      {p1AssistCd > 0 ? `ASST ${Math.ceil(p1AssistCd)}s` : 'ASSIST (R)'}
                    </button>
                    <button
                      onTouchStart={(e) => {
                        e.preventDefault();
                        handleP1InteractProp();
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleP1InteractProp();
                      }}
                      className="px-2 py-1 rounded-lg border border-amber-500/50 bg-amber-950/70 text-amber-200 text-[8px] font-black uppercase transition active:scale-95 shadow cursor-pointer"
                    >
                      PROP (E)
                    </button>
                  </div>

                  {/* Action Matrix (Light 1, Light 2, Heavy 1, Heavy 2) */}
                  <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
                    {/* Light 1 (Punch) */}
                    <button
                      onTouchStart={(e) => {
                        e.preventDefault();
                        triggerP1Light(1);
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        triggerP1Light(1);
                      }}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-sky-950/60 active:bg-sky-500/60 hover:bg-sky-900/60 border-2 border-sky-400/40 active:border-sky-300 backdrop-blur-md flex flex-col items-center justify-center text-sky-200 active:scale-95 transition shadow-lg cursor-pointer"
                      title="Light Attack 1 (Space / J)"
                    >
                      <span className="text-[10px] sm:text-[11px] font-black leading-none">👊 LIGHT 1</span>
                      <span className="text-[7px] font-mono text-sky-300 truncate max-w-[40px]">{p1Char.element1}</span>
                    </button>

                    {/* Light 2 (Kick) */}
                    <button
                      onTouchStart={(e) => {
                        e.preventDefault();
                        triggerP1Light(2);
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        triggerP1Light(2);
                      }}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-950/60 active:bg-blue-500/60 hover:bg-blue-900/60 border-2 border-blue-400/40 active:border-blue-300 backdrop-blur-md flex flex-col items-center justify-center text-blue-200 active:scale-95 transition shadow-lg cursor-pointer"
                      title="Light Attack 2 (C / K)"
                    >
                      <span className="text-[10px] sm:text-[11px] font-black leading-none">🦶 LIGHT 2</span>
                      <span className="text-[7px] font-mono text-blue-300 truncate max-w-[40px]">{p1Char.element2}</span>
                    </button>

                    {/* Heavy 1 */}
                    <button
                      onTouchStart={(e) => {
                        e.preventDefault();
                        triggerP1Heavy(1);
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        triggerP1Heavy(1);
                      }}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-950/60 active:bg-amber-500/60 hover:bg-amber-900/60 border-2 border-amber-400/40 active:border-amber-300 backdrop-blur-md flex flex-col items-center justify-center text-amber-200 active:scale-95 transition shadow-lg cursor-pointer"
                      title="Heavy Attack 1 (F / H)"
                    >
                      <span className="text-[10px] sm:text-[11px] font-black leading-none">💥 HEAVY 1</span>
                      <span className="text-[7px] font-mono text-amber-300 truncate max-w-[40px]">{p1Char.element1}</span>
                    </button>

                    {/* Heavy 2 */}
                    <button
                      onTouchStart={(e) => {
                        e.preventDefault();
                        triggerP1Heavy(2);
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        triggerP1Heavy(2);
                      }}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-rose-950/60 active:bg-rose-500/60 hover:bg-rose-900/60 border-2 border-rose-400/40 active:border-rose-300 backdrop-blur-md flex flex-col items-center justify-center text-rose-200 active:scale-95 transition shadow-lg cursor-pointer"
                      title="Heavy Attack 2 (G / I)"
                    >
                      <span className="text-[10px] sm:text-[11px] font-black leading-none">☄️ HEAVY 2</span>
                      <span className="text-[7px] font-mono text-rose-300 truncate max-w-[40px]">{p1Char.element2}</span>
                    </button>
                  </div>

                  {/* Super Ultimate Button */}
                  <button
                    onTouchStart={(e) => {
                      e.preventDefault();
                      triggerP1Ultimate();
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      triggerP1Ultimate();
                    }}
                    className={`w-full py-1 sm:py-1.5 px-2.5 rounded-xl backdrop-blur-md flex items-center justify-center gap-1 active:scale-95 transition shadow-xl border-2 cursor-pointer ${
                      p1Ult >= 100 || gameMode === 'TRAINING'
                        ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 border-white shadow-[0_0_20px_#fbbf24] animate-pulse font-black'
                        : 'bg-purple-950/60 border-purple-400/40 text-purple-200 font-bold'
                    }`}
                    title="Super Ultimate Attack (Y / U)"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                      {p1Ult >= 100 || gameMode === 'TRAINING' ? '⚡ ULTIMATE READY!' : `SUPER (${Math.round(p1Ult)}%)`}
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* TRAINING MODE TOOLBAR */}
          {gameMode === 'TRAINING' && (
            <div className="w-full bg-amber-950/40 border border-amber-500/50 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs shadow-lg">
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-amber-400" />
                  DUMMY BEHAVIOR:
                </span>
                <div className="flex items-center gap-1">
                  {(['STAND', 'BLOCK', 'JUMP', 'ATTACK'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setDummyBehavior(mode)}
                      className={`px-2.5 py-1 rounded font-bold transition cursor-pointer border ${
                        dummyBehavior === mode
                          ? 'bg-amber-500 text-slate-950 border-white shadow'
                          : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      {mode === 'STAND' && 'Standing'}
                      {mode === 'BLOCK' && 'Blocking'}
                      {mode === 'JUMP' && 'Jumping'}
                      {mode === 'ATTACK' && 'Attacking'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                  TOTAL DAMAGE: <strong className="text-amber-400">{trainingTotalDamage}</strong>
                </span>

                <button
                  onClick={resetTraining}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold flex items-center gap-1 cursor-pointer transition shadow"
                  title="Reset fighter positions"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  RESET
                </button>

                <button
                  onClick={maxP1Ultimate}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold flex items-center gap-1 cursor-pointer transition shadow"
                  title="Charge Ultimate to 100%"
                >
                  <Zap className="w-3.5 h-3.5" />
                  CHARGE SUPER
                </button>

                <button
                  onClick={triggerP1Ultimate}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg font-black flex items-center gap-1 cursor-pointer transition shadow"
                  title="Fire Ultimate now"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  FIRE SUPER
                </button>
              </div>
            </div>
          )}

          {/* Complete Combat Arsenal & Keyboard Controls Dock */}
          <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 sm:p-3.5 flex-col gap-2 sm:gap-3 text-xs shadow-md hidden md:flex shrink-0">
            {/* Player 1 Moveset Deck */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span className="font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                  P1 COMBAT ARSENAL - {p1Char.name} ({p1Char.element}) & ASSIST {p1AssistChar.name}:
                </span>
                <span className="text-[11px] text-slate-400">
                  Move: <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-bold text-slate-200">A / D</kbd> | Jump: <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-bold text-slate-200">W</kbd> | Guard: <kbd className="px-1.5 py-0.5 bg-indigo-950 border border-indigo-500/40 rounded font-bold text-indigo-300">S</kbd> | Tag: <kbd className="px-1.5 py-0.5 bg-cyan-950 border border-cyan-500/40 rounded font-bold text-cyan-300">T</kbd> | Assist: <kbd className="px-1.5 py-0.5 bg-blue-950 border border-blue-500/40 rounded font-bold text-blue-300">R</kbd> | Prop/Dash: <kbd className="px-1.5 py-0.5 bg-amber-950 border border-amber-500/40 rounded font-bold text-amber-300">E / Q</kbd>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {/* Light 1 */}
                <button
                  onClick={() => triggerP1Light(1)}
                  className="p-2 bg-slate-950/80 hover:bg-slate-800/80 border border-sky-500/40 hover:border-sky-400 rounded-xl flex flex-col items-start gap-1 text-left transition cursor-pointer group"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800 font-mono">
                      Space / J
                    </span>
                    <span className="text-[9px] font-bold text-sky-400">Light 1 • 5 DMG</span>
                  </div>
                  <span className="text-white text-[11px] font-bold group-hover:text-sky-300 transition truncate w-full">
                    {p1Char.lightAttack1.name}
                  </span>
                  <span className="text-[9px] text-slate-400 truncate w-full">{p1Char.lightAttack1.desc}</span>
                </button>

                {/* Light 2 */}
                <button
                  onClick={() => triggerP1Light(2)}
                  className="p-2 bg-slate-950/80 hover:bg-slate-800/80 border border-blue-500/40 hover:border-blue-400 rounded-xl flex flex-col items-start gap-1 text-left transition cursor-pointer group"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-mono">
                      C / K
                    </span>
                    <span className="text-[9px] font-bold text-blue-400">Light 2 • 5 DMG</span>
                  </div>
                  <span className="text-white text-[11px] font-bold group-hover:text-blue-300 transition truncate w-full">
                    {p1Char.lightAttack2.name}
                  </span>
                  <span className="text-[9px] text-slate-400 truncate w-full">{p1Char.lightAttack2.desc}</span>
                </button>

                {/* Heavy 1 */}
                <button
                  onClick={() => triggerP1Heavy(1)}
                  className="p-2 bg-slate-950/80 hover:bg-slate-800/80 border border-amber-500/40 hover:border-amber-400 rounded-xl flex flex-col items-start gap-1 text-left transition cursor-pointer group"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono">
                      F / H
                    </span>
                    <span className="text-[9px] font-bold text-amber-400">Heavy 1 • 10 DMG</span>
                  </div>
                  <span className="text-white text-[11px] font-bold group-hover:text-amber-300 transition truncate w-full">
                    {p1Char.heavyAttack1.name}
                  </span>
                  <span className="text-[9px] text-slate-400 truncate w-full">{p1Char.heavyAttack1.desc}</span>
                </button>

                {/* Heavy 2 */}
                <button
                  onClick={() => triggerP1Heavy(2)}
                  className="p-2 bg-slate-950/80 hover:bg-slate-800/80 border border-rose-500/40 hover:border-rose-400 rounded-xl flex flex-col items-start gap-1 text-left transition cursor-pointer group"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono">
                      G / I
                    </span>
                    <span className="text-[9px] font-bold text-rose-400">Heavy 2 • 10 DMG</span>
                  </div>
                  <span className="text-white text-[11px] font-bold group-hover:text-rose-300 transition truncate w-full">
                    {p1Char.heavyAttack2.name}
                  </span>
                  <span className="text-[9px] text-slate-400 truncate w-full">{p1Char.heavyAttack2.desc}</span>
                </button>

                {/* Ultimate */}
                <button
                  onClick={triggerP1Ultimate}
                  className={`p-2 rounded-xl flex flex-col items-start gap-1 text-left transition cursor-pointer border ${
                    p1Ult >= 100 || gameMode === 'TRAINING'
                      ? 'bg-gradient-to-br from-amber-600/50 via-purple-900/60 to-slate-950 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)] animate-pulse'
                      : 'bg-slate-950/80 border-purple-500/40 hover:border-purple-400'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-mono">
                      Y / U
                    </span>
                    <span className="text-[9px] font-bold text-purple-400">SUPER • 30 DMG</span>
                  </div>
                  <span className="text-amber-300 text-[11px] font-black truncate w-full">
                    {p1Char.ultimate.name}
                  </span>
                  <span className="text-[9px] text-slate-400 truncate w-full">{p1Char.ultimate.desc}</span>
                </button>
              </div>
            </div>

            {/* Player 2 or AI/Training Info */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-800">
              <span className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                {gameMode === 'TRAINING' ? '🎯 TRAINING DUMMY (Toolbar at top)' : gameMode === 'VS_AI' ? '🤖 CPU BOT (Full moveset, Assists & Ultimate AI):' : `PLAYER 2 TEAM - ${p2Char.name} & ASSIST ${p2AssistChar.name}:`}
              </span>
              {gameMode === 'PVP' ? (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px]">
                  <div className="p-1.5 bg-slate-950/60 border border-slate-800 rounded-lg">
                    <div className="text-slate-400 font-mono font-bold">Shift / 1 (Light 1)</div>
                    <div className="text-rose-300 font-bold truncate">{p2Char.lightAttack1.name}</div>
                  </div>
                  <div className="p-1.5 bg-slate-950/60 border border-slate-800 rounded-lg">
                    <div className="text-slate-400 font-mono font-bold">/ or 2 (Light 2)</div>
                    <div className="text-rose-300 font-bold truncate">{p2Char.lightAttack2.name}</div>
                  </div>
                  <div className="p-1.5 bg-slate-950/60 border border-slate-800 rounded-lg">
                    <div className="text-slate-400 font-mono font-bold">. or 4 (Heavy 1)</div>
                    <div className="text-amber-300 font-bold truncate">{p2Char.heavyAttack1.name}</div>
                  </div>
                  <div className="p-1.5 bg-slate-950/60 border border-slate-800 rounded-lg">
                    <div className="text-slate-400 font-mono font-bold">; or 5 (Heavy 2)</div>
                    <div className="text-amber-300 font-bold truncate">{p2Char.heavyAttack2.name}</div>
                  </div>
                  <div className="p-1.5 bg-slate-950/60 border border-slate-800 rounded-lg">
                    <div className="text-slate-400 font-mono font-bold">Enter / 0 (Super)</div>
                    <div className="text-purple-300 font-bold truncate">{p2Char.ultimate.name}</div>
                  </div>
                </div>
              ) : (
                <div className="text-slate-400 text-[11px] leading-relaxed">
                  {gameMode === 'TRAINING'
                    ? 'Test all light and heavy strikes, assist attacks, tag switches, prop throws, and cinematic finishers directly on the dummy.'
                    : 'The CPU AI dynamically executes light strings, projectiles, defensive blocks, assist strikes, tag switches, and unleashes super arts.'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
