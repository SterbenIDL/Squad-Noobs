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
  Radio
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

export const CHARACTERS: CharacterDef[] = [
  {
    id: 'ivan',
    name: 'איבן (Ivan)',
    hebrewName: 'איבן - חשמל ורוח',
    title: 'מאסטר הסערה והחשמל',
    element: 'חשמל ורוח',
    element1: 'רוח',
    element2: 'חשמל',
    themeColor: '#38bdf8',
    secondaryColor: '#60a5fa',
    imageSrc: '/assets/aistudio/_____70edfa9b.jpeg',
    icon: Zap,
    description: 'שולט בברקים חיים ורוחות טורנדו הרסניות. מכות רוח מהירות ומכות ברק שמימיות.',
    lightAttack1: {
      name: 'להב רוח חותך (Wind Blade)',
      hebrewName: 'להב רוח חותך',
      element: 'רוח',
      desc: 'חרמש רוח טורקיז מהיר שמחלק סלאש חד'
    },
    lightAttack2: {
      name: 'אגרוף ברק מחושמל (Thunder Jab)',
      hebrewName: 'אגרוף ברק מחושמל',
      element: 'חשמל',
      desc: 'אגרוף חשמלי כחול-לבן עם ניצוצות שמשתק לרגע'
    },
    heavyAttack1: {
      name: 'סופת הוריקן הודפת (Gale Blast)',
      hebrewName: 'סופת הוריקן הודפת',
      element: 'רוח',
      desc: 'משב רוח טורנדו דוחף ומעיף את היריב אחורה'
    },
    heavyAttack2: {
      name: 'מכת ברק שמיים (Sky Lightning Crash)',
      hebrewName: 'מכת ברק שמיים',
      element: 'חשמל',
      desc: 'ברק שמיים עבה שנוחת ומחשמל את הזירה'
    },
    ultimate: {
      name: 'טורנדו ברקים אימתני (Thunderstorm Tornado)',
      hebrewName: 'טורנדו ברקים אימתני',
      element: 'חשמל ורוח',
      desc: 'יורד טורנדו ענקי עם מכות ברק שמימיות שמושך וממלא את המסך'
    },
    lightAttackName: 'רוח: להב חותך | חשמל: אגרוף ברק',
    heavyAttackName: 'רוח: הוריקן הדף | חשמל: ברק שמיים',
    ultimateName: 'טורנדו ברקים אימתני (Thunderstorm Tornado)',
    projectileType: 'lightning',
    stats: { power: 8, speed: 10, defense: 7 }
  },
  {
    id: 'idan',
    name: 'עידן (Idan)',
    hebrewName: 'עידן - אש ואפלה',
    title: 'אגרוף התופת האפלה',
    element: 'אש ואפלה',
    element1: 'אש',
    element2: 'אפלה',
    themeColor: '#f97316',
    secondaryColor: '#ef4444',
    imageSrc: '/assets/aistudio/_____b3da8735.jpeg',
    icon: Flame,
    description: 'לוחם רחוב בעל כוח אש אפלה ולהבות שחורות. אגרופים עוצמתיים ונזק הרסני.',
    lightAttack1: {
      name: 'אגרוף ניצוץ אש (Fire Spark Jab)',
      hebrewName: 'אגרוף ניצוץ אש',
      element: 'אש',
      desc: 'מהלומת להבה כתומה מהירה עם גיצי אש'
    },
    lightAttack2: {
      name: 'טופר אפלה מהיר (Dark Shadow Claw)',
      hebrewName: 'טופר אפלה מהיר',
      element: 'אפלה',
      desc: 'מכת טופר חושך עם הילה סגולה-שחורה'
    },
    heavyAttack1: {
      name: 'כדור אש תופת מתפוצץ (Hellfire Blast)',
      hebrewName: 'כדור אש תופת מתפוצץ',
      element: 'אש',
      desc: 'כדור אש ענק מתפרץ קדימה ומתפוצץ בלשונות להבה'
    },
    heavyAttack2: {
      name: 'בור כבידה וגל אפל (Abyssal Void Slam)',
      hebrewName: 'בור כבידה וגל אפל',
      element: 'אפלה',
      desc: 'גל הדף שחור-סגול מעוות כבידה שמועך את היריב'
    },
    ultimate: {
      name: 'כדור חושך ואש מפוצץ כל (Nether Dark Void Nova)',
      hebrewName: 'כדור חושך ואש מפוצץ כל',
      element: 'אש ואפלה',
      desc: 'משחרר כדור חושך שמסביבו אש ומפוצץ הכל בעוצמה מחרישת אוזניים'
    },
    lightAttackName: 'אש: ניצוץ אש | אפלה: טופר צללים',
    heavyAttackName: 'אש: כדור תופת | אפלה: בור כבידה',
    ultimateName: 'כדור חושך ואש מפוצץ כל (Nether Dark Void Nova)',
    projectileType: 'fireball',
    stats: { power: 10, speed: 7, defense: 8 }
  },
  {
    id: 'philip',
    name: 'פיליפ (Philip)',
    hebrewName: 'פיליפ - אור ואדמה',
    title: 'טיטאן הקריסטל והשמש',
    element: 'אור ואדמה',
    element1: 'אור',
    element2: 'אדמה',
    themeColor: '#eab308',
    secondaryColor: '#f59e0b',
    imageSrc: '/assets/aistudio/______9c89476b.jpeg',
    icon: Mountain,
    description: 'משלב כוחות קריסטל אבן עתיקים והקרנת אור שמש סולארי. הגנה איתנה ומכות מחץ.',
    lightAttack1: {
      name: 'הבזק אור סולארי (Solar Flash Strike)',
      hebrewName: 'הבזק אור סולארי',
      element: 'אור',
      desc: 'אגרוף אור בוהק בזהב ולבן שמעוור את היריב'
    },
    lightAttack2: {
      name: 'בעיטת קריסטל אבן (Crystal Stone Kick)',
      hebrewName: 'בעיטת קריסטל אבן',
      element: 'אדמה',
      desc: 'מכת אדמה מוצקה שיוצרת רסיסי קריסטל חדים'
    },
    heavyAttack1: {
      name: 'עמוד אור שמש קורן (Radiant Light Pillar)',
      hebrewName: 'עמוד אור שמש קורן',
      element: 'אור',
      desc: 'עמוד אור שמש בוהק שנוחת מלמעלה ומאדה את המטרה'
    },
    heavyAttack2: {
      name: 'גייזר קוצי אדמה (Earth Crystal Geyser)',
      hebrewName: 'גייזר קוצי אדמה',
      element: 'אדמה',
      desc: 'חניתות אדמה וקריסטלים שבוקעים מהרצפה ומשגרים רסיס אבן'
    },
    ultimate: {
      name: 'קרן אור סולארית ענקית (Hyper Solar Beam)',
      hebrewName: 'קרן אור סולארית ענקית',
      element: 'אור ואדמה',
      desc: 'יורה קרן אור גדולה וחזקה שחוצה את כל המסך ומאירה הכל בצהוב-לבן מסנוור'
    },
    lightAttackName: 'אור: הבזק סולארי | אדמה: בעיטת קריסטל',
    heavyAttackName: 'אור: עמוד אור שמש | אדמה: גייזר קוצים',
    ultimateName: 'קרן אור סולארית ענקית (Hyper Solar Beam)',
    projectileType: 'crystal',
    stats: { power: 9, speed: 6, defense: 10 }
  },
  {
    id: 'roni',
    name: 'רוני (Roni)',
    hebrewName: 'רוני - מים ודם',
    title: 'אדון המים והדם',
    element: 'מים ודם',
    element1: 'מים',
    element2: 'דם',
    themeColor: '#06b6d4',
    secondaryColor: '#e11d48',
    imageSrc: '/assets/aistudio/_____d5c8a85b.jpeg',
    icon: Droplets,
    description: 'מניפולטור של זרמי מים חיים וקרישי דם עוצמתיים. סגנון לחימה זורם וקטלני.',
    lightAttack1: {
      name: 'שוט סילון מים (Aqua Jet Whip)',
      hebrewName: 'שוט סילון מים',
      element: 'מים',
      desc: 'שוט מים מהיר בצבע טורקיז עמוק'
    },
    lightAttack2: {
      name: 'דקירת קוץ דם (Blood Needle Pierce)',
      hebrewName: 'דקירת קוץ דם',
      element: 'דם',
      desc: 'דקירת דם ארגמנית מהירה שחודרת הגנות'
    },
    heavyAttack1: {
      name: 'גל צונאמי מתנפץ (Tsunami Wave Crash)',
      hebrewName: 'גל צונאמי מתנפץ',
      element: 'מים',
      desc: 'גל מים שוצף ומחץ שמתגלגל קדימה ושוטף את הזירה'
    },
    heavyAttack2: {
      name: 'מגל דם רותח (Crimson Blood Scythe)',
      hebrewName: 'מגל דם רותח',
      element: 'דם',
      desc: 'מגל דם ענקי שמסובב להב דם רותח ומשסף את היריב'
    },
    ultimate: {
      name: 'חץ מים ודם קטלני (Blood Hydro Piercing Arrow)',
      hebrewName: 'חץ מים ודם קטלני',
      element: 'מים ודם',
      desc: 'יורה חץ מים שמסביבו דם - חץ מים ענקי שסביבו ספירלות דם מסתחררות שמשפדות את היריב'
    },
    lightAttackName: 'מים: שוט סילון | דם: קוץ דם חודר',
    heavyAttackName: 'מים: גל צונאמי | דם: מגל דם רותח',
    ultimateName: 'חץ מים ודם קטלני (Blood Hydro Piercing Arrow)',
    projectileType: 'water',
    stats: { power: 9, speed: 8, defense: 8 }
  }
];

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
    hebrewName: 'סמטת ניאו-טוקיו',
    description: 'זירת רחוב אורבנית עם שלטי ניאון זוהרים, גשם דק ואספלט רטוב.',
    bgUrl: streetBgUrl,
    themeColor: '#38bdf8'
  },
  {
    id: 'volcano_dojo',
    name: 'Infernal Lava Temple',
    hebrewName: 'מקדש הלבה והתופת',
    description: 'דוג׳ו עתיק מוקף בלבה רותחת, גיצי אש ועמודי אבן שחורים.',
    bgUrl: volcanoBgUrl,
    themeColor: '#f97316'
  },
  {
    id: 'thunder_rooftop',
    name: 'Storm Rooftop Helipad',
    hebrewName: 'מנחת הסערה והרעמים',
    description: 'גג גורד שחקים בסופת ברקים אימתנית, ענני סערה ורוחות עזות.',
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
    animeName: 'וואן פיס (One Piece)',
    artistDesc: 'הפתיח האגדי בביצוע Hiroshi Kitadani',
    srcUrls: [
      'https://archive.org/download/tvtunes_20333/One%20Piece%20-%20We%20Are%20-%20Full.mp3',
      'https://v.animethemes.moe/OnePiece-OP1.webm'
    ]
  },
  {
    id: 'one_piece_overtaken',
    title: 'One Piece: Overtaken (Walk to Arlong Park Theme)',
    animeName: 'וואן פיס (One Piece)',
    artistDesc: 'שיר הקרב המפורסם ביותר (מצעד התופים והחצוצרות האפי)',
    srcUrls: [
      'https://archive.org/download/youtube-daFi4MScfl8/daFi4MScfl8.mp4',
      'https://archive.org/download/Overtaken/Overtaken.mp3'
    ]
  },
  {
    id: 'fairy_tail_main',
    title: 'Fairy Tail: Main Battle Theme (Yasuharu Takanashi)',
    animeName: 'פיירי טייל (Fairy Tail)',
    artistDesc: 'שיר הנושא הרשמי והאיקוני (Fairy Tail Main Theme)',
    srcUrls: [
      'https://archive.org/download/fairytailmainthememetalver./FAIRY%20TAIL%20Main%20Theme%20-METAL%20ver.-.mp3',
      'https://v.animethemes.moe/FairyTail-OP1.webm'
    ]
  },
  {
    id: 'demon_slayer',
    title: 'Demon Slayer: Gurenge (LiSA)',
    animeName: 'דיימון סלייר (קוטל השדים)',
    artistDesc: 'פתיח האנימה הרשמי בביצוע LiSA',
    srcUrls: [
      'https://v.animethemes.moe/KimetsuNoYaiba-OP1.webm',
      'https://v.animethemes.moe/KimetsuNoYaiba-OP1-NCBD1080.webm'
    ]
  },
  {
    id: 'attack_on_titan',
    title: 'Attack on Titan: Guren no Yumiya (Linked Horizon)',
    animeName: 'מתקפת הטיטאנים (Shingeki no Kyojin)',
    artistDesc: 'שיר הנושא האפי והסוחף של הטיטאנים',
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
    } catch {}
  }
}

const audio = new ArcadeAudioEngine();

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

export const ATTACK_FRAME_DATA: { [key: string]: AttackFrameData } = {
  LIGHT_1: {
    startup: 4,
    active: 3,
    recovery: 7,
    damage: 9,
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
    damage: 12,
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
    damage: 22,
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
    damage: 26,
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
    damage: 50,
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

  speed: number = 6.8;
  jumpForce: number = -18;
  isGrounded: boolean = false;

  health: number = 100;
  maxHealth: number = 100;
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
  }

  loadImage() {
    const img = new Image();
    img.src = this.character.imageSrc;
    this.image = img;
  }

  setCharacter(char: CharacterDef) {
    this.character = char;
    this.loadImage();
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

  drawProceduralFighter(ctx: CanvasRenderingContext2D, w: number, h: number, _idleBob: number) {
    const char = this.character;
    const cid = char.id; // 'idan' | 'ivan' | 'philip' | 'roni'
    const theme = char.themeColor;
    const secColor = char.secondaryColor;

    // Kinematics and Cycle timers
    const runCycle = Math.sin(this.animFrame * 0.35);
    const breathe = Math.sin(this.animFrame * 0.12) * 2.5;
    const clothWave = Math.sin(this.animFrame * 0.25) * 8;
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

    // Character palettes
    let skinColor = '#f5cb9f';
    let skinShade = '#d09968';
    let hairBase = '#18181b';
    let hairHighlight = theme;
    let outfitBase = '#0f172a';
    let outfitAccent = theme;
    let pantsColor = '#1e293b';
    let bootColor = '#090d16';

    if (cid === 'idan') {
      skinColor = '#e2a76f';
      skinShade = '#b87333';
      hairBase = '#18181b';
      hairHighlight = '#f97316';
      outfitBase = '#1c1917';
      outfitAccent = '#f97316';
      pantsColor = '#292524';
      bootColor = '#0c0a09';
    } else if (cid === 'ivan') {
      skinColor = '#f7d3ad';
      skinShade = '#d99f74';
      hairBase = '#0284c7';
      hairHighlight = '#38bdf8';
      outfitBase = '#0f172a';
      outfitAccent = '#38bdf8';
      pantsColor = '#1e293b';
      bootColor = '#0284c7';
    } else if (cid === 'philip') {
      skinColor = '#f7d0a1';
      skinShade = '#cf9a60';
      hairBase = '#ca8a04';
      hairHighlight = '#facc15';
      outfitBase = '#78350f';
      outfitAccent = '#eab308';
      pantsColor = '#451a03';
      bootColor = '#b45309';
    } else if (cid === 'roni') {
      skinColor = '#fce7db';
      skinShade = '#d8a994';
      hairBase = '#881337';
      hairHighlight = '#e11d48';
      outfitBase = '#082f49';
      outfitAccent = '#06b6d4';
      pantsColor = '#0f172a';
      bootColor = '#9f1239';
    }

    ctx.save();

    // Stance tilt
    let tiltRad = 0;
    if (isRunning) tiltRad = 0.12;
    else if (isDashing) tiltRad = 0.32;
    else if (isHitstun) tiltRad = -0.22;
    else if (isBlocking) tiltRad = 0.08;

    if (tiltRad !== 0) {
      ctx.translate(w * 0.45, h * 0.6);
      ctx.rotate(tiltRad);
      ctx.translate(-w * 0.45, -h * 0.6);
    }

    // Elemental Ambient Body Aura
    ctx.save();
    const auraPulse = Math.sin(this.animFrame * 0.15) * 8 + (isUlt ? 28 : 12);
    ctx.shadowColor = isUlt ? secColor : theme;
    ctx.shadowBlur = auraPulse;
    ctx.strokeStyle = `rgba(${cid === 'idan' ? '249, 115, 22' : cid === 'ivan' ? '56, 189, 248' : cid === 'philip' ? '234, 179, 8' : '6, 182, 212'}, ${isUlt ? 0.75 : 0.28})`;
    ctx.lineWidth = isUlt ? 4.5 : 2;
    ctx.beginPath();
    ctx.ellipse(w * 0.45, h * 0.52, w * 0.36 + (isUlt ? 14 : 0), h * 0.46 + (isUlt ? 14 : 0), 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 1. Back Arm (behind torso)
    ctx.save();
    let bShoulderX = 26;
    let bShoulderY = 54;
    let bElbowX = 18;
    let bElbowY = 72;
    let bFistX = 30;
    let bFistY = 66;

    if (isRunning) {
      bElbowX = 26 - runCycle * 16;
      bElbowY = 68;
      bFistX = 26 - runCycle * 28;
      bFistY = 64 - runCycle * 12;
    } else if (isBlocking) {
      bElbowX = 42;
      bElbowY = 68;
      bFistX = 64;
      bFistY = 50;
    } else if (isUlt) {
      bElbowX = 14;
      bElbowY = 26;
      bFistX = 22;
      bFistY = 4;
    } else if (isHeavy1 && this.attackPhase === 'STARTUP') {
      bElbowX = 8;
      bElbowY = 62;
      bFistX = -4;
      bFistY = 56;
    } else if (isHeavy2 && this.attackPhase === 'ACTIVE') {
      bElbowX = 68;
      bElbowY = 40;
      bFistX = w + 24;
      bFistY = 74;
    } else if (isHitstun) {
      bElbowX = 6;
      bElbowY = 58;
      bFistX = -12;
      bFistY = 50;
    }

    ctx.strokeStyle = outfitBase;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(bShoulderX, bShoulderY);
    ctx.lineTo(bElbowX, bElbowY);
    ctx.lineTo(bFistX, bFistY);
    ctx.stroke();

    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.arc(bFistX, bFistY, 7.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = outfitAccent;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.restore();

    // 2. Back Leg (thigh -> knee -> boot)
    ctx.save();
    let bHipX = 32;
    let bHipY = 98;
    let bKneeX = 24;
    let bKneeY = 130;
    let bFootX = 18;
    let bFootY = 162;

    if (isRunning) {
      bKneeX = 32 - runCycle * 22;
      bKneeY = 128;
      bFootX = 32 - runCycle * 32;
      bFootY = 162 - Math.max(0, runCycle * 16);
    } else if (isJumping) {
      bKneeX = 16;
      bKneeY = 118;
      bFootX = 22;
      bFootY = 138;
    } else if (isDashing) {
      bKneeX = 4;
      bKneeY = 132;
      bFootX = -12;
      bFootY = 162;
    } else if (isBlocking) {
      bKneeX = 14;
      bKneeY = 132;
      bFootX = 8;
      bFootY = 162;
    } else if (isHitstun) {
      bKneeX = 12;
      bKneeY = 132;
      bFootX = 6;
      bFootY = 162;
    }

    ctx.strokeStyle = pantsColor;
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(bHipX, bHipY);
    ctx.lineTo(bKneeX, bKneeY);
    ctx.lineTo(bFootX, bFootY);
    ctx.stroke();

    ctx.fillStyle = bootColor;
    ctx.beginPath();
    ctx.ellipse(bFootX + 3, bFootY, 12, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = outfitAccent;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // 3. Torso & Clothing
    ctx.save();
    ctx.fillStyle = pantsColor;
    ctx.beginPath();
    ctx.roundRect(24, 90, 34, 20, 6);
    ctx.fill();

    // Fluttering Sash / Belt Ribbon
    ctx.fillStyle = outfitAccent;
    ctx.beginPath();
    ctx.moveTo(26, 96);
    ctx.quadraticCurveTo(14 + clothWave, 114, 8 + clothWave * 1.5, 134);
    ctx.lineTo(14 + clothWave * 1.5, 136);
    ctx.quadraticCurveTo(20 + clothWave, 116, 32, 98);
    ctx.closePath();
    ctx.fill();

    // Torso Chest Jacket / Gi
    const torsoGrad = ctx.createLinearGradient(20, 48, 60, 94);
    torsoGrad.addColorStop(0, outfitBase);
    torsoGrad.addColorStop(1, '#090d16');
    ctx.fillStyle = torsoGrad;
    ctx.beginPath();
    ctx.moveTo(22, 54);
    ctx.lineTo(58, 54);
    ctx.lineTo(54, 94);
    ctx.lineTo(24, 94);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = outfitAccent;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Lapel / Chest V-Neck
    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.moveTo(34, 54);
    ctx.lineTo(46, 54);
    ctx.lineTo(40, 72);
    ctx.closePath();
    ctx.fill();

    // Character Chest Sigil / Emblem
    ctx.save();
    ctx.fillStyle = theme;
    ctx.shadowColor = theme;
    ctx.shadowBlur = 10;
    if (cid === 'idan') {
      ctx.beginPath();
      ctx.arc(40, 74, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = secColor;
      ctx.beginPath();
      ctx.arc(40, 74, 2.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (cid === 'ivan') {
      ctx.beginPath();
      ctx.moveTo(42, 68);
      ctx.lineTo(37, 75);
      ctx.lineTo(41, 75);
      ctx.lineTo(38, 82);
      ctx.lineTo(44, 73);
      ctx.lineTo(40, 73);
      ctx.closePath();
      ctx.fill();
    } else if (cid === 'philip') {
      ctx.beginPath();
      ctx.moveTo(40, 68);
      ctx.lineTo(46, 75);
      ctx.lineTo(40, 82);
      ctx.lineTo(34, 75);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(40, 68);
      ctx.quadraticCurveTo(46, 77, 40, 81);
      ctx.quadraticCurveTo(34, 77, 40, 68);
      ctx.fill();
    }
    ctx.restore();

    // Martial Sash / Belt
    ctx.fillStyle = outfitAccent;
    ctx.fillRect(23, 91, 35, 7);
    ctx.fillStyle = secColor;
    ctx.fillRect(36, 90, 8, 9);
    ctx.restore();

    // 4. Front Leg (over torso)
    ctx.save();
    let fHipX = 46;
    let fHipY = 98;
    let fKneeX = 56;
    let fKneeY = 130;
    let fFootX = 64;
    let fFootY = 162;

    if (isRunning) {
      fKneeX = 46 + runCycle * 22;
      fKneeY = 128;
      fFootX = 46 + runCycle * 32;
      fFootY = 162 - Math.max(0, -runCycle * 16);
    } else if (isJumping) {
      fKneeX = 62;
      fKneeY = 114;
      fFootX = 56;
      fFootY = 138;
    } else if (isDashing) {
      fKneeX = 72;
      fKneeY = 134;
      fFootX = 84;
      fFootY = 162;
    } else if (isBlocking) {
      fKneeX = 62;
      fKneeY = 132;
      fFootX = 68;
      fFootY = 162;
    } else if (isLight2 && this.attackPhase === 'ACTIVE') {
      fKneeX = 74;
      fKneeY = 88;
      fFootX = w + 30;
      fFootY = 70;
    } else if (isHitstun) {
      fKneeX = 38;
      fKneeY = 132;
      fFootX = 32;
      fFootY = 162;
    }

    ctx.strokeStyle = pantsColor;
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(fHipX, fHipY);
    ctx.lineTo(fKneeX, fKneeY);
    ctx.lineTo(fFootX, fFootY);
    ctx.stroke();

    ctx.strokeStyle = outfitAccent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(fKneeX, fKneeY + 4);
    ctx.lineTo(fFootX - 2, fFootY - 6);
    ctx.stroke();

    ctx.fillStyle = bootColor;
    ctx.beginPath();
    ctx.ellipse(fFootX + 4, fFootY, 13, 6.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = theme;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.restore();

    // 5. Head & Styled Anime Face & Hair
    ctx.save();
    const headX = 40;
    const headY = 26 + breathe * 0.5;

    // Neck
    ctx.fillStyle = skinShade;
    ctx.fillRect(35, headY + 12, 10, 14);

    // Head Base
    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.ellipse(headX, headY, 14, 16, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ears
    ctx.fillStyle = skinShade;
    ctx.beginPath();
    ctx.arc(headX - 13, headY + 2, 3.5, 0, Math.PI * 2);
    ctx.arc(headX + 13, headY + 2, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Headband / Circlet
    ctx.fillStyle = cid === 'philip' ? '#eab308' : (cid === 'ivan' ? '#0284c7' : (cid === 'idan' ? '#dc2626' : '#9f1239'));
    ctx.fillRect(headX - 14, headY - 8, 28, 6);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(headX - 2, headY - 7, 4, 4);

    // Anime Eyes
    ctx.save();
    if (isHitstun) {
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(headX + 2, headY);
      ctx.lineTo(headX + 9, headY + 3);
      ctx.lineTo(headX + 2, headY + 6);
      ctx.stroke();
    } else {
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(headX + 2, headY - 1);
      ctx.lineTo(headX + 10, headY);
      ctx.stroke();

      ctx.fillStyle = isUlt ? '#ffffff' : theme;
      ctx.shadowColor = theme;
      ctx.shadowBlur = isUlt ? 16 : 8;
      ctx.beginPath();
      ctx.ellipse(headX + 6, headY + 2, isUlt ? 4 : 3, isUlt ? 4 : 2.5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(headX + 7, headY + 1, 1, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Mouth
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    if (isUlt || (this.attackPhase === 'ACTIVE' && (isHeavy1 || isHeavy2))) {
      ctx.fillStyle = '#991b1b';
      ctx.ellipse(headX + 6, headY + 9, 4, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else if (isBlocking || isHitstun) {
      ctx.moveTo(headX + 3, headY + 9);
      ctx.lineTo(headX + 8, headY + 9);
      ctx.stroke();
    } else {
      ctx.moveTo(headX + 3, headY + 8);
      ctx.quadraticCurveTo(headX + 7, headY + 10, headX + 9, headY + 8);
      ctx.stroke();
    }

    // Hair Styles
    ctx.save();
    ctx.fillStyle = hairBase;
    ctx.shadowColor = hairHighlight;
    ctx.shadowBlur = isUlt ? 20 : 6;

    if (cid === 'idan') {
      ctx.beginPath();
      ctx.moveTo(headX - 14, headY - 6);
      ctx.lineTo(headX - 22, headY - 18);
      ctx.lineTo(headX - 12, headY - 16);
      ctx.lineTo(headX - 16, headY - 30);
      ctx.lineTo(headX - 4, headY - 22);
      ctx.lineTo(headX + 2, headY - 34);
      ctx.lineTo(headX + 10, headY - 22);
      ctx.lineTo(headX + 22, headY - 28);
      ctx.lineTo(headX + 16, headY - 14);
      ctx.lineTo(headX + 24, headY - 8);
      ctx.lineTo(headX + 14, headY - 2);
      ctx.lineTo(headX + 12, headY + 6);
      ctx.lineTo(headX - 8, headY + 4);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = hairHighlight;
      ctx.beginPath();
      ctx.moveTo(headX + 2, headY - 34);
      ctx.lineTo(headX + 8, headY - 24);
      ctx.lineTo(headX + 1, headY - 24);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(headX + 22, headY - 28);
      ctx.lineTo(headX + 18, headY - 18);
      ctx.lineTo(headX + 12, headY - 20);
      ctx.closePath();
      ctx.fill();
    } else if (cid === 'ivan') {
      ctx.beginPath();
      ctx.moveTo(headX - 14, headY - 6);
      ctx.lineTo(headX - 24, headY - 14);
      ctx.lineTo(headX - 14, headY - 18);
      ctx.lineTo(headX - 20, headY - 28);
      ctx.lineTo(headX - 6, headY - 20);
      ctx.lineTo(headX, headY - 36);
      ctx.lineTo(headX + 8, headY - 22);
      ctx.lineTo(headX + 20, headY - 32);
      ctx.lineTo(headX + 16, headY - 16);
      ctx.lineTo(headX + 26, headY - 10);
      ctx.lineTo(headX + 12, headY - 2);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(headX, headY - 36);
      ctx.lineTo(headX + 4, headY - 26);
      ctx.lineTo(headX - 2, headY - 26);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = hairHighlight;
      ctx.beginPath();
      ctx.moveTo(headX - 10, headY + 12);
      ctx.quadraticCurveTo(headX - 28 + clothWave, headY + 18, headX - 44 + clothWave * 1.5, headY + 28);
      ctx.lineTo(headX - 42 + clothWave * 1.5, headY + 36);
      ctx.quadraticCurveTo(headX - 24 + clothWave, headY + 24, headX - 6, headY + 18);
      ctx.closePath();
      ctx.fill();
    } else if (cid === 'philip') {
      ctx.fillStyle = hairHighlight;
      ctx.beginPath();
      ctx.moveTo(headX - 14, headY - 4);
      ctx.quadraticCurveTo(headX - 26, headY - 20, headX - 16, headY - 28);
      ctx.quadraticCurveTo(headX, headY - 34, headX + 16, headY - 28);
      ctx.lineTo(headX + 24, headY - 16);
      ctx.lineTo(headX + 14, headY - 4);
      ctx.quadraticCurveTo(headX + 8, headY - 18, headX - 4, headY - 16);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.moveTo(headX - 2, headY - 8);
      ctx.lineTo(headX + 8, headY - 2);
      ctx.lineTo(headX + 4, headY - 8);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(headX - 12, headY - 4);
      ctx.quadraticCurveTo(headX - 18, headY - 22, headX + 4, headY - 24);
      ctx.quadraticCurveTo(headX + 18, headY - 22, headX + 14, headY - 4);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = hairHighlight;
      ctx.beginPath();
      ctx.moveTo(headX - 8, headY - 20);
      ctx.quadraticCurveTo(headX - 32 + clothWave, headY - 12, headX - 42 + clothWave * 1.8, headY + 24);
      ctx.lineTo(headX - 34 + clothWave * 1.8, headY + 28);
      ctx.quadraticCurveTo(headX - 22 + clothWave, headY - 6, headX - 2, headY - 18);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.moveTo(headX - 6, headY - 20);
      ctx.quadraticCurveTo(headX - 24 + clothWave, headY - 8, headX - 32 + clothWave * 1.8, headY + 18);
      ctx.lineTo(headX - 28 + clothWave * 1.8, headY + 20);
      ctx.quadraticCurveTo(headX - 18 + clothWave, headY - 4, headX - 2, headY - 18);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
    ctx.restore();

    // 6. Front Arm & Fist (in front of torso)
    ctx.save();
    let fShoulderX = 52;
    let fShoulderY = 54;
    let fElbowX = 66;
    let fElbowY = 72;
    let fFistX = 68;
    let fFistY = 58;

    if (isRunning) {
      fElbowX = 52 + runCycle * 16;
      fElbowY = 68;
      fFistX = 52 + runCycle * 28;
      fFistY = 64 + runCycle * 12;
    } else if (isBlocking) {
      fElbowX = 68;
      fElbowY = 68;
      fFistX = 44;
      fFistY = 48;
    } else if (isLight1 && this.attackPhase === 'ACTIVE') {
      fElbowX = 82;
      fElbowY = 52;
      fFistX = w + 35;
      fFistY = 54;
    } else if (isLight2 && this.attackPhase === 'ACTIVE') {
      fElbowX = 72;
      fElbowY = 44;
      fFistX = w + 24;
      fFistY = 38;
    } else if (isHeavy1 && this.attackPhase === 'ACTIVE') {
      fElbowX = 88;
      fElbowY = 54;
      fFistX = w + 54;
      fFistY = 56;
    } else if (isHeavy2 && this.attackPhase === 'ACTIVE') {
      fElbowX = 78;
      fElbowY = 48;
      fFistX = w + 38;
      fFistY = 82;
    } else if (isUlt) {
      fElbowX = 68;
      fElbowY = 24;
      fFistX = 74;
      fFistY = -2;
    } else if (isHitstun) {
      fElbowX = 66;
      fElbowY = 74;
      fFistX = 76;
      fFistY = 82;
    }

    ctx.strokeStyle = outfitBase;
    ctx.lineWidth = 11;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(fShoulderX, fShoulderY);
    ctx.lineTo(fElbowX, fElbowY);
    ctx.lineTo(fFistX, fFistY);
    ctx.stroke();

    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.arc(fFistX, fFistY, 8.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = outfitAccent;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Orbiting Elemental Energy Sparks on Front Fist
    ctx.save();
    ctx.fillStyle = theme;
    ctx.shadowColor = theme;
    ctx.shadowBlur = 12;
    for (let sp = 0; sp < 4; sp++) {
      const spAng = this.animFrame * 0.2 + (sp * Math.PI) / 2;
      const spR = 12 + Math.sin(this.animFrame * 0.3 + sp) * 3;
      const spX = fFistX + Math.cos(spAng) * spR;
      const spY = fFistY + Math.sin(spAng) * spR;
      ctx.beginPath();
      ctx.arc(spX, spY, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    ctx.restore();

    // Impact / Flash Overlays
    if (isHitstun) {
      ctx.save();
      ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.beginPath();
      ctx.ellipse(w * 0.45, h * 0.5, w * 0.4, h * 0.46, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    } else if (this.isInvulnerable) {
      ctx.save();
      ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.beginPath();
      ctx.ellipse(w * 0.45, h * 0.5, w * 0.4, h * 0.46, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    ctx.restore();
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

    // Render Procedural Articulated 2D Animated Brawler
    this.drawProceduralFighter(ctx, w, h, idleBob);

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

  // Character selection
  const [p1SelectedIdx, setP1SelectedIdx] = useState<number>(0);
  const [p2SelectedIdx, setP2SelectedIdx] = useState<number>(1);
  const [p1Locked, setP1Locked] = useState<boolean>(false);
  const [p2Locked, setP2Locked] = useState<boolean>(false);

  // Stage selection
  const [selectedStageIdx, setSelectedStageIdx] = useState<number>(0);

  // Real Anime OST Audio Player
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [musicEnabled, setMusicEnabled] = useState<boolean>(true);
  const [musicTrackIdx, setMusicTrackIdx] = useState<number>(0);
  const [musicVolume, setMusicVolume] = useState<number>(0.65);
  const [customMusicUrl, setCustomMusicUrl] = useState<string>('');
  const [musicStatusText, setMusicStatusText] = useState<string>('מתנגן');

  const bgmAudioRef = useRef<HTMLAudioElement | null>(null);

  // Match HUD stats
  const [p1Health, setP1Health] = useState<number>(100);
  const [p1DamageLag, setP1DamageLag] = useState<number>(100);
  const [p1Ult, setP1Ult] = useState<number>(0);

  const [p2Health, setP2Health] = useState<number>(100);
  const [p2DamageLag, setP2DamageLag] = useState<number>(100);
  const [p2Ult, setP2Ult] = useState<number>(0);

  const [timer, setTimer] = useState<number>(120);
  const [winner, setWinner] = useState<string>('');
  const [p1Combo, setP1Combo] = useState<number>(0);
  const [p2Combo, setP2Combo] = useState<number>(0);

  // Mortal Kombat style announcements
  const [finishHimTriggered, setFinishHimTriggered] = useState<boolean>(false);
  const [activeUltBanner, setActiveUltBanner] = useState<{ name: string; title: string; color: string } | null>(null);

  // Engine refs & Hitstop Freeze
  const fighter1Ref = useRef<CanvasFighter | null>(null);
  const fighter2Ref = useRef<CanvasFighter | null>(null);
  const projectilesRef = useRef<Projectile[]>([]);
  const particlesRef = useRef<SparkParticle[]>([]);
  const shockwavesRef = useRef<ShockwaveRing[]>([]);
  const ultFieldEffectsRef = useRef<UltimateFieldEffect[]>([]);
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
    setMusicStatusText('טוען שיר...');

    audioEl
      .play()
      .then(() => {
        setMusicStatusText('מתנגן');
      })
      .catch((_err) => {
        if (currentTrackDef.srcUrls[1] && !customMusicUrl) {
          audioEl.src = currentTrackDef.srcUrls[1];
          audioEl
            .play()
            .then(() => setMusicStatusText('מתנגן'))
            .catch(() => setMusicStatusText('לחץ להפעלה'));
        } else {
          setMusicStatusText('לחץ להפעלה');
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

  // Random Character selector
  const selectRandomP1 = () => {
    audio.playDiceRoll();
    let rollCount = 0;
    const interval = setInterval(() => {
      setP1SelectedIdx(Math.floor(Math.random() * CHARACTERS.length));
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
      setP2SelectedIdx(Math.floor(Math.random() * CHARACTERS.length));
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
    let pDamage = isUlt ? 48 : (attackKey === 'HEAVY_2' ? 26 : 22);

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
        pType = 'fireball'; // אש: כדור אש תופת
        pColor = '#f97316';
        pSecColor = '#ef4444';
        pSize = 30;
      } else if (char.id === 'philip') {
        pType = 'solar_beam'; // אור: עמוד אור שמש
        pColor = '#facc15';
        pSecColor = '#ffffff';
        pSize = 30;
      } else if (char.id === 'ivan') {
        pType = 'wind'; // רוח: סופת הוריקן
        pColor = '#38bdf8';
        pSecColor = '#7dd3fc';
        pSize = 32;
      } else if (char.id === 'roni') {
        pType = 'water'; // מים: גל צונאמי
        pColor = '#06b6d4';
        pSecColor = '#38bdf8';
        pSize = 32;
      }
    } else {
      // Element 2 Heavy Attack (HEAVY_2)
      if (char.id === 'idan') {
        pType = 'darkness'; // אפלה: בור כבידה וגל אפל
        pColor = '#7c3aed';
        pSecColor = '#000000';
        pSize = 34;
      } else if (char.id === 'philip') {
        pType = 'crystal'; // אדמה: גייזר קוצי אדמה וקריסטל
        pColor = '#eab308';
        pSecColor = '#ca8a04';
        pSize = 32;
      } else if (char.id === 'ivan') {
        pType = 'lightning'; // חשמל: ברק שמיים
        pColor = '#60a5fa';
        pSecColor = '#ffffff';
        pSize = 32;
      } else if (char.id === 'roni') {
        pType = 'blood'; // דם: מגל דם רותח
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

  // Training Mode Actions
  const resetTraining = () => {
    const f1 = fighter1Ref.current;
    const f2 = fighter2Ref.current;
    if (f1) {
      f1.position = { x: 140, y: 100 };
      f1.velocity = { x: 0, y: 0 };
      f1.health = 100;
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
      f2.health = 100;
      f2.isDead = false;
      f2.action = 'IDLE';
      f2.attackPhase = 'NONE';
      f2.currentAttackKey = null;
      f2.hitStunDuration = 0;
      f2.blockStunDuration = 0;
      f2.isBlocking = false;
      f2.facing = 'left';
    }
    setP1Health(100);
    setP1DamageLag(100);
    setP2Health(100);
    setP2DamageLag(100);
    projectilesRef.current = [];
    particlesRef.current = [];
    shockwavesRef.current = [];
    ultFieldEffectsRef.current = [];
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
        setUltNotice(`⚠️ מד אולטימייט עדיין לא מלא (${Math.round(f1.ultimateMeter)}% / 100%) - פגע ביריב כדי לטעון`);
        setTimeout(() => setUltNotice(null), 2000);
      }
    }
  };

  // Start / Reset Round
  const setupRound = (isNewMatch: boolean = false) => {
    if (isNewMatch) {
      setP1RoundsWon(0);
      setP2RoundsWon(0);
      setTrainingTotalDamage(0);
    }

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
    hitStopFramesRef.current = 0;

    if (fighter1Ref.current) {
      fighter1Ref.current.position = { x: 140, y: 100 };
      fighter1Ref.current.velocity = { x: 0, y: 0 };
      fighter1Ref.current.health = 100;
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
      fighter2Ref.current.health = 100;
      fighter2Ref.current.isDead = false;
      fighter2Ref.current.action = 'IDLE';
      fighter2Ref.current.attackPhase = 'NONE';
      fighter2Ref.current.currentAttackKey = null;
      fighter2Ref.current.hitStunDuration = 0;
      fighter2Ref.current.blockStunDuration = 0;
      fighter2Ref.current.isBlocking = false;
      fighter2Ref.current.facing = 'left';
    }

    setP1Health(100);
    setP1DamageLag(100);
    setP2Health(100);
    setP2DamageLag(100);
  };

  const startMatch = (char1: CharacterDef, char2: CharacterDef) => {
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
      name: gameMode === 'TRAINING' ? 'בובת אימון' : (gameMode === 'VS_AI' ? 'בוט AI' : 'Player 2'),
      facing: 'left',
      character: char2
    });

    setupRound(true);
    setScreen('BATTLE');
  };

  const triggerVSAndBattle = (char1: CharacterDef, char2: CharacterDef) => {
    audio.playLockIn();
    setScreen('VS_SCREEN');
    setTimeout(() => {
      startMatch(char1, char2);
    }, 1800);
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
      let winText = nextP1Rounds >= roundsToWin ? `ניצחון לשחקן 1! (${f1.character.name})` : `ניצחון לשחקן 2! (${f2.character.name})`;
      if (reason === 'TIME OVER') winText += ' - הזמן תם';
      setWinner(winText);
      setScreen('GAME_OVER');
    } else {
      const roundWinBanner = roundWinner === 1 ? `ראונד לשחקן 1! (${f1.character.name})` : `ראונד לשחקן 2! (${f2.character.name})`;
      setRoundNotification(roundWinBanner);

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

      // In Battle
      if (screen === 'BATTLE') {
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

        // Q = DASH LEFT strictly, E = DASH RIGHT strictly
        if (e.code === 'KeyQ' && f1) {
          f1.bufferInput('DASH_L');
          if (f1.attackPhase === 'NONE') f1.dash('left');
        }
        if (e.code === 'KeyE' && f1) {
          f1.bufferInput('DASH_R');
          if (f1.attackPhase === 'NONE') f1.dash('right');
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

        // Ultimate Attack: Y or U (also supports O and T)
        if ((e.code === 'KeyY' || e.code === 'KeyU' || e.code === 'KeyO' || e.code === 'KeyT') && f1) {
          f1.bufferInput('ULTIMATE');
          const fired = f1.startUltimateAttack(spawnProjectile, triggerFieldEffect, gameMode === 'TRAINING');
          setP1Ult(f1.ultimateMeter);
          if (!fired && f1.ultimateMeter < 100) {
            setUltNotice(`⚠️ מד אולטימייט עדיין לא מלא (${Math.round(f1.ultimateMeter)}% / 100%) - פגע ביריב כדי לטעון`);
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

          // P2 Light 1 (Element 1): Shift or Numpad1
          if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.code === 'Numpad1') && f2) {
            f2.bufferInput('LIGHT_1');
            if (f2.attackPhase === 'NONE' || f2.cancelWindowActive) f2.startLightAttack(1);
          }

          // P2 Light 2 (Element 2): Slash or Numpad2
          if ((e.code === 'Slash' || e.code === 'Backslash' || e.code === 'Numpad2') && f2) {
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

          // P2 Ultimate: Enter, P, or Numpad0
          if ((e.code === 'Enter' || e.code === 'KeyP' || e.code === 'Numpad0' || e.code === 'Numpad3') && f2) {
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

      if (f2.health < 25) {
        f2.health = 100;
        setP2Health(100);
        setP2DamageLag(100);
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

      if (gameMode !== 'TRAINING' && !finishHimTriggered && (f1.health <= 15 || f2.health <= 15)) {
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
            }
          }
        );

        setP1Ult(f1.ultimateMeter);
        setP2Health(f2.health);
        setTimeout(() => setP2DamageLag(f2.health), 220);
        if (f2.health <= 0 && !isGameOverRef.current && gameMode !== 'TRAINING') handleRoundEnd('K.O.');
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
            if (!isBlocked) setP2Combo((c) => c + 1);
          }
        );

        setP2Ult(f2.ultimateMeter);
        setP1Health(f1.health);
        setTimeout(() => setP1DamageLag(f1.health), 220);
        if (f1.health <= 0 && !isGameOverRef.current && gameMode !== 'TRAINING') handleRoundEnd('K.O.');
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
          // עידן: משחרר כדור חושך שמסביבו אש ומפוצץ הכל
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

          // Central Pitch-Black Void Core (כדור חושך)
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
          // פיליפ: יורה קרן אור גדולה וחזקה (Hyper Solar Beam)
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
          // איבן: יורד טורנדו עם ברקים
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
          // רוני: יורה חץ מים שמסביבו דם
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
            if (f2.health <= 0 && !isGameOverRef.current && gameMode !== 'TRAINING') handleRoundEnd('K.O.');
          } else {
            setP1Health(f1.health);
            setTimeout(() => setP1DamageLag(f1.health), 220);
            if (f1.health <= 0 && !isGameOverRef.current && gameMode !== 'TRAINING') handleRoundEnd('K.O.');
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
          // עידן ULTIMATE: כדור חושך שמסביבו אש
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
          // פיליפ ULTIMATE & HEAVY 1: קרן אור שמש
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
          // איבן ULTIMATE: טורנדו ברקים
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
          // רוני ULTIMATE: חץ מים שמסביבו דם
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
          // עידן HEAVY 2: בור כבידה וגל אפל
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
          // איבן HEAVY 1: סופת הוריקן וגל רוח
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
          // רוני HEAVY 2: מגל דם רותח
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
          // עידן HEAVY 1: כדור אש תופת
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
          // פיליפ HEAVY 2: גייזר קוצי אדמה וקריסטל
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
          // רוני HEAVY 1: גל צונאמי
          ctx.fillStyle = '#06b6d4';
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.size * 1.3, p.size * 0.75, 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#bae6fd';
          ctx.lineWidth = 3;
          ctx.stroke();
        } else {
          // איבן HEAVY 2: מכת ברק שמיים
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

      f1.draw(ctx, GROUND_Y);
      f2.draw(ctx, GROUND_Y);

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

  const p1Char = CHARACTERS[p1SelectedIdx];
  const p2Char = CHARACTERS[p2SelectedIdx];
  const stage = STAGES[selectedStageIdx];
  const currentBgm = ANIME_OST_TRACKS[musicTrackIdx] || ANIME_OST_TRACKS[0];

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-2 sm:p-4 select-none font-sans overflow-x-hidden">
      {/* Top Universal Sound, Track & Fullscreen Bar */}
      <div className="w-full max-w-[1550px] flex items-center justify-between text-xs px-4 py-2 mb-3 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                audio.init();
                setMusicEnabled((m) => !m);
              }}
              className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
              title="הפעל/השתק מוזיקה"
            >
              <Music className={`w-4 h-4 ${musicEnabled ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`} />
            </button>
            <span className="text-slate-400 font-mono hidden md:inline">שיר קרב:</span>
            <span className="font-bold text-amber-300 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {currentBgm.title}
            </span>
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">({musicStatusText})</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={prevTrack}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              title="שיר קודם"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={nextTrack}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              title="שיר הבא"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              audio.init();
              setSoundEnabled((s) => !s);
            }}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 transition cursor-pointer flex items-center gap-1.5"
            title="אפקטים קוליים"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-sky-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            <span className="hidden sm:inline font-mono text-[11px]">{soundEnabled ? 'SFX פעיל' : 'SFX מושתק'}</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer flex items-center gap-1.5 border border-slate-700"
            title="מסך מלא"
          >
            {isFullscreen ? <Minimize className="w-4 h-4 text-amber-400" /> : <Maximize className="w-4 h-4 text-amber-400" />}
            <span className="font-bold text-[11px]">{isFullscreen ? 'צא ממסך מלא' : 'מסך מלא (🖥️)'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SCREEN 1: ARCADE MAIN MENU (CENTERED, EXPANDED & 6 BUTTONS) */}
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
              טורניר לוחמי הרחוב האולטימטיבי
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-black italic tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-red-600 drop-shadow-[0_5px_15px_rgba(239,68,68,0.7)]"
              style={{ fontFamily: "'Press Start 2P', monospace, sans-serif" }}
            >
              SQUAD NOOBS
            </h1>
            <div className="text-base sm:text-xl md:text-2xl font-black tracking-widest text-sky-400 mt-1 font-mono drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]">
              2D FIGHTING CHAMPIONSHIP
            </div>

            {/* Exact 6 Arcade Menu Buttons requested by user */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-3xl mt-6">
              {/* Button 1: שחקן נגד שחקן */}
              <button
                onClick={() => {
                  audio.playCoin();
                  setGameMode('PVP');
                  setScreen('CHARACTER_SELECT');
                }}
                className="p-3.5 bg-gradient-to-r from-blue-900/80 to-indigo-900/80 hover:from-blue-600 hover:to-indigo-600 border-2 border-blue-400/60 rounded-xl flex items-center gap-3 text-right font-bold transition-all shadow-lg hover:scale-102 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-500 transition">
                  <User className="w-5 h-5 text-blue-300 group-hover:text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-black uppercase tracking-wide">1. לשחק שחקן נגד שחקן</span>
                  <span className="text-[10px] text-blue-200/80">קרב 2 שחקנים באותה מקלדת</span>
                </div>
              </button>

              {/* Button 2: שחקן נגד מחשב */}
              <button
                onClick={() => {
                  audio.playCoin();
                  setGameMode('VS_AI');
                  setScreen('CHARACTER_SELECT');
                }}
                className="p-3.5 bg-gradient-to-r from-purple-900/80 to-pink-900/80 hover:from-purple-600 hover:to-pink-600 border-2 border-purple-400/60 rounded-xl flex items-center gap-3 text-right font-bold transition-all shadow-lg hover:scale-102 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-400 flex items-center justify-center shrink-0 group-hover:bg-purple-500 transition">
                  <Bot className="w-5 h-5 text-purple-300 group-hover:text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-black uppercase tracking-wide">2. שחקן נגד מחשב</span>
                  <span className="text-[10px] text-purple-200/80">קרב תחרותי נגד בוט AI</span>
                </div>
              </button>

              {/* Button 3: אימונים */}
              <button
                onClick={() => {
                  audio.playCoin();
                  setGameMode('TRAINING');
                  setScreen('CHARACTER_SELECT');
                }}
                className="p-3.5 bg-gradient-to-r from-amber-900/80 to-yellow-900/80 hover:from-amber-600 hover:to-yellow-600 border-2 border-amber-400/60 rounded-xl flex items-center gap-3 text-right font-bold transition-all shadow-lg hover:scale-102 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition">
                  <Target className="w-5 h-5 text-amber-300 group-hover:text-slate-950" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-black uppercase tracking-wide">3. אימונים</span>
                  <span className="text-[10px] text-amber-200/80">בובת אימון ואולטימייט חופשי</span>
                </div>
              </button>

              {/* Button 4: הגדרות */}
              <button
                onClick={() => {
                  audio.playSelect();
                  setShowSettingsModal(true);
                }}
                className="p-3.5 bg-slate-900/80 hover:bg-slate-800 border-2 border-slate-700 hover:border-slate-500 rounded-xl flex items-center gap-3 text-right font-bold transition-all shadow-lg hover:scale-102 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-600 flex items-center justify-center shrink-0 group-hover:bg-slate-700 transition">
                  <Settings className="w-5 h-5 text-slate-300 group-hover:text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-black uppercase tracking-wide">4. הגדרות</span>
                  <span className="text-[10px] text-slate-400">מוזיקה, ווליום, טיימר וראונדים</span>
                </div>
              </button>

              {/* Button 5: קרדיטים לIDL */}
              <button
                onClick={() => {
                  audio.playSelect();
                  setShowCreditsModal(true);
                }}
                className="p-3.5 bg-slate-900/80 hover:bg-slate-800 border-2 border-amber-500/40 hover:border-amber-400 rounded-xl flex items-center gap-3 text-right font-bold transition-all shadow-lg hover:scale-102 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition">
                  <Award className="w-5 h-5 text-amber-300 group-hover:text-slate-950" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-black uppercase tracking-wide">5. קרדיטים ל-IDL</span>
                  <span className="text-[10px] text-amber-200/80">יוצרים, מנוע המשחק והשראה</span>
                </div>
              </button>

              {/* Button 6: יציאה מהמשחק */}
              <button
                onClick={() => {
                  audio.playSelect();
                  setShowExitModal(true);
                }}
                className="p-3.5 bg-red-950/60 hover:bg-red-900 border-2 border-red-700/60 hover:border-red-500 rounded-xl flex items-center gap-3 text-right font-bold transition-all shadow-lg hover:scale-102 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-red-500/20 border border-red-400 flex items-center justify-center shrink-0 group-hover:bg-red-500 transition">
                  <LogOut className="w-5 h-5 text-red-300 group-hover:text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-black uppercase tracking-wide">6. יציאה מהמשחק</span>
                  <span className="text-[10px] text-red-300/80">סיום הפעלה ומסך פרידה</span>
                </div>
              </button>
            </div>
          </div>

          {/* Exact footer requested by user */}
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
                הגדרות משחק (Game Settings)
              </h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Match Duration (120s included!) */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-400" />
                זמן קרב ברירת מחדל:
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
                    {sec} שניות
                  </button>
                ))}
              </div>
            </div>

            {/* Rounds to Win */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                כמות ראונדים לניצחון (Target Wins):
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
                    {r} {r === 1 ? 'ראונד' : 'ראונדים'}
                  </button>
                ))}
              </div>
            </div>

            {/* Volume Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>עוצמת מוזיקה (BGM):</span>
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
                  <span>עוצמת אפקטים (SFX):</span>
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
                בחר שיר OST רשמי:
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {ANIME_OST_TRACKS.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setMusicTrackIdx(idx);
                      setCustomMusicUrl('');
                    }}
                    className={`p-2 rounded-lg text-xs font-bold text-right flex items-center justify-between transition cursor-pointer border ${
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
              שמור והמשך (Save & Close)
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
                <h3 className="text-lg font-black uppercase text-amber-400">קרדיטים רשמיים - IDL ENGINE</h3>
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

            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2 leading-relaxed text-right">
              <p>
                👑 <strong>הפקה, חזון ובימוי:</strong> IDL Studio & Creative Team.
              </p>
              <p>
                ⚔️ <strong>לוחמי העל:</strong>
                <br />
                • איבן (סערת החשמל והרוח)
                <br />
                • עידן (אגרוף התופת והאש השחורה)
                <br />
                • פיליפ (טיטאן הקריסטל והשמש)
                <br />
                • רוני (אדון המים והדם)
              </p>
              <p>
                🎵 <strong>פס-קול אנימה אגדי:</strong> השראה משירי הקרב של One Piece, Demon Slayer, Attack on Titan ו-Fairy Tail.
              </p>
              <p>
                🕹️ <strong>מחווה למשחקי ארקייד קלאסיים:</strong> שילוב בין הדינמיות של Tekken, האנרגיה של Street Fighter והאגרסיביות של Mortal Kombat.
              </p>
            </div>

            <button
              onClick={() => setShowCreditsModal(false)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase rounded-xl transition cursor-pointer"
            >
              סגור קרדיטים
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 6: EXIT CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      {showExitModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border-2 border-red-500 rounded-2xl max-w-sm w-full p-6 shadow-2xl flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center shadow-[0_0_25px_rgba(239,68,68,0.5)]">
              <LogOut className="w-8 h-8 text-red-400" />
            </div>

            <h3 className="text-xl font-black uppercase text-red-400 tracking-wider">
              יציאה מהמשחק?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              תודה ששיחקתם ב-<strong>SQUAD NOOBS</strong>!
              <br />
              האם ברצונכם לסיים את המשחק?
            </p>

            <div className="flex flex-col gap-2 w-full mt-2">
              <button
                onClick={() => {
                  setShowExitModal(false);
                  audio.playKO();
                }}
                className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase rounded-xl transition cursor-pointer shadow-lg"
              >
                כן, יציאה (THANKS FOR PLAYING)
              </button>
              <button
                onClick={() => setShowExitModal(false)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase rounded-xl transition cursor-pointer"
              >
                המשך לשחק (חזור)
              </button>
            </div>
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
                SELECT YOUR FIGHTER
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                מצב משחק:{' '}
                <span className="text-amber-300 font-bold">
                  {gameMode === 'TRAINING'
                    ? '🎯 מצב אימון (בחר לוחם ובובת אימון)'
                    : gameMode === 'VS_AI'
                    ? '🤖 שחקן נגד מחשב (Player vs CPU)'
                    : '🥊 שחקן נגד שחקן (2 Players)'}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={selectRandomP1}
                className="px-3 py-1.5 bg-blue-900/60 hover:bg-blue-800 border border-blue-500/50 rounded-lg text-xs font-bold text-blue-200 cursor-pointer flex items-center gap-1.5"
              >
                <Dices className="w-3.5 h-3.5" />
                P1 אקראי
              </button>
              {gameMode === 'PVP' && (
                <button
                  onClick={selectRandomP2}
                  className="px-3 py-1.5 bg-rose-900/60 hover:bg-rose-800 border border-rose-500/50 rounded-lg text-xs font-bold text-rose-200 cursor-pointer flex items-center gap-1.5"
                >
                  <Dices className="w-3.5 h-3.5" />
                  P2 אקראי
                </button>
              )}
              <button
                onClick={() => setScreen('TITLE_MENU')}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-slate-300 cursor-pointer"
              >
                חזור
              </button>
            </div>
          </div>

          {/* 4 Fighters + Random Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {CHARACTERS.map((char, idx) => {
              const isP1 = p1SelectedIdx === idx;
              const isP2 = p2SelectedIdx === idx;
              const IconComp = char.icon;

              return (
                <div
                  key={char.id}
                  className={`rounded-2xl border-2 p-2.5 bg-slate-900/90 flex flex-col justify-between gap-2.5 relative transition-all duration-200 shadow-xl ${
                    isP1 && isP2
                      ? 'border-purple-500 ring-4 ring-purple-500/50 shadow-purple-500/30'
                      : isP1
                      ? 'border-blue-500 ring-4 ring-blue-500/50 shadow-blue-500/30 scale-102'
                      : isP2
                      ? 'border-rose-500 ring-4 ring-rose-500/50 shadow-rose-500/30 scale-102'
                      : 'border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <IconComp className="w-3.5 h-3.5" />
                      {char.element}
                    </span>
                    <div className="flex items-center gap-1">
                      {isP1 && <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white font-mono text-[9px] font-bold">P1</span>}
                      {isP2 && (
                        <span className="px-1.5 py-0.5 rounded bg-rose-600 text-white font-mono text-[9px] font-bold">
                          {gameMode === 'TRAINING' ? 'בובה' : gameMode === 'VS_AI' ? 'CPU' : 'P2'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="aspect-[3/4] w-full rounded-xl overflow-hidden border border-slate-700/60 relative group">
                    <img src={char.imageSrc} alt={char.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent flex flex-col justify-end p-2 gap-1 text-[9px]">
                      <div className="flex items-center gap-1 font-bold">
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/90 text-slate-950 font-black">2 קלות + 2 כבדות</span>
                        <span className="px-1.5 py-0.5 rounded bg-purple-600/90 text-white font-bold">אולטימייט</span>
                      </div>
                      <span className="text-amber-300 font-bold truncate">⚡ {char.ultimate.hebrewName}</span>
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

                  <div className="grid grid-cols-2 gap-1 pt-1">
                    <button
                      onClick={() => {
                        audio.playSelect();
                        setP1SelectedIdx(idx);
                      }}
                      disabled={p1Locked}
                      className={`py-1 rounded text-[11px] font-bold border transition cursor-pointer ${
                        isP1 ? 'bg-blue-600 text-white border-blue-400' : 'bg-slate-950 text-slate-300 border-slate-800'
                      }`}
                    >
                      P1
                    </button>
                    <button
                      onClick={() => {
                        audio.playSelect();
                        setP2SelectedIdx(idx);
                      }}
                      className={`py-1 rounded text-[11px] font-bold border transition cursor-pointer ${
                        isP2 ? 'bg-rose-600 text-white border-rose-400' : 'bg-slate-950 text-slate-300 border-slate-800'
                      }`}
                    >
                      {gameMode === 'TRAINING' ? 'בובה' : gameMode === 'VS_AI' ? 'בוט AI' : 'P2'}
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Random Card */}
            <div className="rounded-2xl border-2 border-dashed border-amber-500/60 p-3 bg-gradient-to-b from-amber-950/20 to-slate-950 flex flex-col justify-between items-center text-center shadow-xl">
              <div className="w-full flex justify-center mt-4">
                <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center animate-bounce shadow-[0_0_20px_rgba(251,191,36,0.5)]">
                  <Dices className="w-10 h-10 text-amber-300" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black uppercase text-amber-400 tracking-wider">RANDOM ?</h3>
                <p className="text-[11px] text-slate-400 mt-1">בחירה אקראית של לוחם</p>
              </div>

              <div className="w-full flex flex-col gap-1.5">
                <button
                  onClick={selectRandomP1}
                  className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition cursor-pointer shadow"
                >
                  🎲 אקראי ל-P1
                </button>
                {gameMode === 'PVP' && (
                  <button
                    onClick={selectRandomP2}
                    className="w-full py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition cursor-pointer shadow"
                  >
                    🎲 אקראי ל-P2
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Match Settings Bar (Rounds & Timer: Added 120s!) */}
          {gameMode !== 'TRAINING' ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-slate-300">כמות ראונדים לניצחון:</span>
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
                  (הראשון שמגיע ל-{roundsToWin} ניצחונות זוכה בקרב)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400" />
                <span className="font-bold text-slate-300">זמן קרב:</span>
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
                <span>מצב אימון פעיל: זמן בלתי מוגבל (∞), מד אולטימייט נטען וניתן לשימוש מיידי, וחיים מתחדשים אוטומטית.</span>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-3">
            <div className="text-xs text-slate-400">
              שחקן 1 בחר ב-<span className="text-blue-400 font-bold">{p1Char.name}</span> |{' '}
              {gameMode === 'TRAINING' ? 'בובת אימון: ' : gameMode === 'VS_AI' ? 'בוט AI: ' : 'שחקן 2: '}
              <span className="text-rose-400 font-bold">{p2Char.name}</span>
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
              <span>המשך לבחירת מפה (STAGE)</span>
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
                בחרו זירה מועדפת או בחרו באפשרות RANDOM
              </p>
            </div>

            <button
              onClick={() => setScreen('CHARACTER_SELECT')}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-slate-300 cursor-pointer"
            >
              חזור לדמויות
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
                      <span>{st.hebrewName}</span>
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
                <p className="text-[11px] text-slate-400 mt-1">רולטת זירות אקראית</p>
              </div>
              <button className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition shadow">
                🎲 בחר זירה אקראית
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-800 pt-4">
            <div className="text-sm font-bold text-slate-300">
              זירה נבחרת: <span className="text-amber-400">{stage.hebrewName}</span>
              {gameMode !== 'TRAINING' && (
                <>
                  {' '}| יעד: <span className="text-amber-300">{roundsToWin} ראונדים</span>
                </>
              )}
            </div>

            <button
              onClick={() => triggerVSAndBattle(p1Char, p2Char)}
              className="px-10 py-3.5 bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 hover:from-red-500 hover:to-yellow-400 text-slate-950 font-black text-base uppercase tracking-widest rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.7)] hover:scale-105 active:scale-95 transition cursor-pointer flex items-center gap-3 animate-pulse"
            >
              <span>{gameMode === 'TRAINING' ? 'היכנס לאימון (START)' : 'התחל את הקרב! (FIGHT)'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 4: VS SCREEN */}
      {/* ========================================================================= */}
      {screen === 'VS_SCREEN' && (
        <div className="w-full max-w-6xl aspect-[16/9] bg-slate-950 rounded-3xl border-4 border-slate-700 shadow-2xl relative overflow-hidden flex items-center justify-between mx-auto my-auto">
          <div className="w-1/2 h-full relative overflow-hidden flex flex-col justify-end p-8 bg-gradient-to-r from-blue-950/80 to-transparent">
            <img src={p1Char.imageSrc} alt={p1Char.name} className="absolute inset-0 w-full h-full object-cover opacity-70 -scale-x-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="relative z-10">
              <span className="text-sm font-bold text-blue-400 uppercase tracking-widest font-mono">PLAYER 1</span>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic">{p1Char.name}</h2>
              <p className="text-sm text-sky-300 font-bold">{p1Char.element}</p>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="flex flex-col items-center">
              <div
                className="text-7xl md:text-9xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-red-600 drop-shadow-[0_0_30px_rgba(239,68,68,0.8)] animate-bounce"
                style={{ fontFamily: "'Press Start 2P', monospace, sans-serif" }}
              >
                VS
              </div>
              <span className="px-4 py-1 rounded bg-black/80 border border-amber-400 text-amber-300 text-xs font-mono font-bold uppercase mt-2">
                {stage.hebrewName}
              </span>
            </div>
          </div>

          <div className="w-1/2 h-full relative overflow-hidden flex flex-col justify-end p-8 items-end text-right bg-gradient-to-l from-rose-950/80 to-transparent">
            <img src={p2Char.imageSrc} alt={p2Char.name} className="absolute inset-0 w-full h-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="relative z-10">
              <span className="text-sm font-bold text-rose-400 uppercase tracking-widest font-mono">
                {gameMode === 'TRAINING' ? 'TRAINING DUMMY' : gameMode === 'VS_AI' ? 'CPU BOT' : 'PLAYER 2'}
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic">{p2Char.name}</h2>
              <p className="text-sm text-rose-300 font-bold">{p2Char.element}</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 5: BATTLE ARENA (EXPANDED TO FULL GLORY & PERFECTLY CENTERED) */}
      {/* ========================================================================= */}
      {(screen === 'BATTLE' || screen === 'GAME_OVER') && (
        <div className="w-full max-w-[1550px] flex flex-col gap-2.5 mx-auto my-auto items-center justify-center">
          {/* Main Battlefield Canvas Container - EXPANDED, CENTERED & SMOOTH */}
          <div className="w-full aspect-[16/9] max-h-[82vh] bg-slate-950 rounded-3xl border-4 border-slate-800 shadow-[0_0_60px_rgba(0,0,0,0.85)] relative overflow-hidden flex items-center justify-center">
            <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className="w-full h-full block object-contain" />

            {/* In-Game Heads-Up Display (HUD) */}
            <div className="absolute top-0 inset-x-0 p-3 md:p-5 flex items-start justify-between pointer-events-none z-20">
              {/* Player 1 HUD */}
              <div className="w-[38%] flex flex-col gap-1.5">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-11 h-11 md:w-13 md:h-13 rounded-2xl overflow-hidden border-2 shadow-lg flex items-center justify-center relative bg-slate-900"
                    style={{ borderColor: p1Char.themeColor }}
                  >
                    <img src={p1Char.imageSrc} alt={p1Char.name} className="w-full h-full object-cover -scale-x-100" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm md:text-base font-black uppercase tracking-wider drop-shadow-md text-sky-400">
                        {p1Char.name}
                      </span>
                      {/* Round Win Counters (Synchronized with roundsToWin) */}
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
                    <span className="text-[10px] md:text-xs text-slate-300 font-medium">{p1Char.element}</span>
                  </div>
                </div>

                {/* Health Bar */}
                <div className="relative w-full h-6 md:h-8 bg-slate-950/85 rounded-lg border-2 border-slate-600 overflow-hidden shadow-inner backdrop-blur-sm">
                  <div
                    className="absolute top-0 bottom-0 right-0 bg-amber-400 transition-all duration-400 ease-out rounded"
                    style={{ width: `${p1DamageLag}%` }}
                  />
                  <div
                    className="absolute top-0 bottom-0 right-0 bg-gradient-to-l from-blue-600 via-sky-400 to-cyan-300 transition-all duration-120 ease-out shadow-lg shadow-sky-500/50 rounded"
                    style={{ width: `${p1Health}%` }}
                  />
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] md:text-xs font-black text-white drop-shadow font-mono">
                    {p1Health} HP
                  </span>
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

                {/* Interactive Clickable Ultimate Button */}
                <div className="flex items-center gap-1.5 pointer-events-auto">
                  <button
                    onClick={triggerP1Ultimate}
                    className={`flex-1 py-1 px-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 border shadow ${
                      p1Ult >= 100 || gameMode === 'TRAINING'
                        ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 border-white shadow-[0_0_15px_#fbbf24] animate-pulse hover:scale-102'
                        : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {p1Ult >= 100 || gameMode === 'TRAINING' ? '⚡ שחרר מכת אולטימייט! (Y / U)' : `אולטימייט: ${Math.round(p1Ult)}%`}
                    </span>
                  </button>

                  {gameMode === 'TRAINING' && (
                    <button
                      onClick={maxP1Ultimate}
                      title="מלא מד אולטימייט ל-100% מיידית"
                      className="px-2.5 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold border border-purple-400 transition cursor-pointer shadow whitespace-nowrap"
                    >
                      ⚡ טען 100%
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
                    <span className="text-amber-400 font-bold">אימון חופשי</span>
                  ) : (
                    `ראונד ${p1RoundsWon + p2RoundsWon + 1} מתוך ${roundsToWin}`
                  )}
                </span>
                <button
                  onClick={() => setIsPaused(true)}
                  className="pointer-events-auto mt-1.5 px-3 py-1 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Pause className="w-3.5 h-3.5" />
                  עצור (P)
                </button>
              </div>

              {/* Player 2 HUD */}
              <div className="w-[38%] flex flex-col gap-1.5 items-end">
                <div className="flex items-center gap-2.5 flex-row-reverse">
                  <div
                    className="w-11 h-11 md:w-13 md:h-13 rounded-2xl overflow-hidden border-2 shadow-lg flex items-center justify-center relative bg-slate-900"
                    style={{ borderColor: p2Char.themeColor }}
                  >
                    <img src={p2Char.imageSrc} alt={p2Char.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 flex-row-reverse">
                      <span className="text-sm md:text-base font-black uppercase tracking-wider drop-shadow-md text-rose-400">
                        {p2Char.name}
                      </span>
                      {/* Round Win Counters (Synchronized with roundsToWin) */}
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
                      {gameMode === 'TRAINING' ? '🎯 בובת אימון' : gameMode === 'VS_AI' ? '🤖 בוט AI' : p2Char.element}
                    </span>
                  </div>
                </div>

                {/* Health Bar */}
                <div className="relative w-full h-6 md:h-8 bg-slate-950/85 rounded-lg border-2 border-slate-600 overflow-hidden shadow-inner backdrop-blur-sm">
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-amber-400 transition-all duration-400 ease-out rounded"
                    style={{ width: `${p2DamageLag}%` }}
                  />
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 transition-all duration-120 ease-out shadow-lg shadow-rose-500/50 rounded"
                    style={{ width: `${p2Health}%` }}
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] md:text-xs font-black text-white drop-shadow font-mono">
                    {p2Health} HP
                  </span>
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

                <div className="text-[10px] md:text-xs font-mono text-slate-400">
                  {p2Ult >= 100 ? '⚡ אולטימייט מוכן' : `אולטימייט: ${Math.round(p2Ult)}%`}
                </div>

                {p2Combo > 1 && (
                  <div className="text-rose-400 font-black text-base italic tracking-widest animate-bounce">
                    {p2Combo} HITS COMBO!
                  </div>
                )}
              </div>
            </div>

            {/* FINISH HIM! Banner */}
            {finishHimTriggered && screen === 'BATTLE' && gameMode !== 'TRAINING' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div className="bg-red-950/80 border-y-4 border-red-600 px-8 py-3 transform -skew-x-12 animate-pulse shadow-[0_0_40px_rgba(220,38,38,0.8)]">
                  <span
                    className="text-4xl md:text-6xl font-black italic tracking-widest text-red-400 drop-shadow-[0_0_20px_#ef4444]"
                    style={{ fontFamily: "'Press Start 2P', monospace, sans-serif", fontSize: '24px' }}
                  >
                    FINISH HIM!
                  </span>
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
                    מתכוננים לראונד הבא...
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

            {/* PAUSE MENU OVERLAY */}
            {isPaused && (
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center z-40 animate-in fade-in zoom-in-95 duration-150">
                <div className="bg-slate-900 border-2 border-slate-700 p-6 rounded-2xl max-w-sm w-full flex flex-col items-center text-center shadow-2xl gap-4">
                  <h3
                    className="text-2xl font-black uppercase text-amber-400 tracking-wider"
                    style={{ fontFamily: "'Press Start 2P', monospace, sans-serif", fontSize: '18px' }}
                  >
                    GAME PAUSED
                  </h3>
                  <p className="text-xs text-slate-400">המשחק נעצר זמנית</p>

                  <div className="flex flex-col gap-2.5 w-full mt-2">
                    <button
                      onClick={() => setIsPaused(false)}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm uppercase tracking-wider rounded-xl transition cursor-pointer shadow-lg"
                    >
                      המשך קרב (Resume)
                    </button>
                    <button
                      onClick={() => {
                        setupRound(true);
                      }}
                      className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
                    >
                      התחל קרב מחדש
                    </button>
                    <button
                      onClick={() => {
                        setIsPaused(false);
                        setScreen('CHARACTER_SELECT');
                      }}
                      className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
                    >
                      בחר דמויות מחדש
                    </button>
                    <button
                      onClick={() => {
                        setIsPaused(false);
                        setScreen('TITLE_MENU');
                      }}
                      className="w-full py-2.5 bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
                    >
                      יציאה לתפריט ראשי
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
                      קרב חוזר (Rematch)
                    </button>
                    <button
                      onClick={() => setScreen('STAGE_SELECT')}
                      className="px-5 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:scale-105 active:scale-95 transition cursor-pointer"
                    >
                      החלף מפה
                    </button>
                    <button
                      onClick={() => {
                        setP1Locked(false);
                        setP2Locked(false);
                        setScreen('CHARACTER_SELECT');
                      }}
                      className="px-5 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:scale-105 active:scale-95 transition cursor-pointer"
                    >
                      החלף דמויות
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* TRAINING MODE TOOLBAR */}
          {gameMode === 'TRAINING' && (
            <div className="w-full bg-amber-950/40 border border-amber-500/50 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs shadow-lg">
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-amber-400" />
                  הגדרות בובת אימון (Dummy):
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
                      {mode === 'STAND' && 'עומד במקום'}
                      {mode === 'BLOCK' && 'חוסם (Block)'}
                      {mode === 'JUMP' && 'קופץ (Jump)'}
                      {mode === 'ATTACK' && 'מתקיף קל (Attack)'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                  נזק שנצבר: <strong className="text-amber-400">{trainingTotalDamage}</strong>
                </span>

                <button
                  onClick={resetTraining}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold flex items-center gap-1 cursor-pointer transition shadow"
                  title="אפס מיקומי שחקנים"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  איפוס עמדות
                </button>

                <button
                  onClick={maxP1Ultimate}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold flex items-center gap-1 cursor-pointer transition shadow"
                  title="טען אולטימייט ל-100%"
                >
                  <Zap className="w-3.5 h-3.5" />
                  טען אולטימייט
                </button>

                <button
                  onClick={triggerP1Ultimate}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg font-black flex items-center gap-1 cursor-pointer transition shadow"
                  title="הפעל אולטימייט כעת"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  הפעל אולטימייט
                </button>
              </div>
            </div>
          )}

          {/* Complete 5-Move Combat Arsenal & Controls Dock */}
          <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 flex flex-col gap-3 text-xs shadow-md">
            {/* Player 1 Moveset Deck */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span className="font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                  ארסנל מתקפות שחקן 1 - {p1Char.name} ({p1Char.element}):
                </span>
                <span className="text-[11px] text-slate-400">
                  תנועה: <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-bold text-slate-200">A / D</kbd> | קפיצה: <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-bold text-slate-200">W</kbd> | הגנה: <kbd className="px-1.5 py-0.5 bg-indigo-950 border border-indigo-500/40 rounded font-bold text-indigo-300">S</kbd> | דאש: <kbd className="px-1.5 py-0.5 bg-cyan-950 border border-cyan-500/40 rounded font-bold text-cyan-300">Q / E</kbd>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {/* Light 1 (Element 1) */}
                <button
                  onClick={() => triggerP1Light(1)}
                  className="p-2 bg-slate-950/80 hover:bg-slate-800/80 border border-sky-500/40 hover:border-sky-400 rounded-xl flex flex-col items-start gap-1 text-right transition cursor-pointer group"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800 font-mono">
                      Space / J
                    </span>
                    <span className="text-[9px] font-bold text-sky-400">קלה 1: {p1Char.element1}</span>
                  </div>
                  <span className="text-white text-[11px] font-bold group-hover:text-sky-300 transition truncate w-full">
                    {p1Char.lightAttack1.hebrewName}
                  </span>
                  <span className="text-[9px] text-slate-400 truncate w-full">{p1Char.lightAttack1.desc}</span>
                </button>

                {/* Light 2 (Element 2) */}
                <button
                  onClick={() => triggerP1Light(2)}
                  className="p-2 bg-slate-950/80 hover:bg-slate-800/80 border border-blue-500/40 hover:border-blue-400 rounded-xl flex flex-col items-start gap-1 text-right transition cursor-pointer group"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-mono">
                      C / K
                    </span>
                    <span className="text-[9px] font-bold text-blue-400">קלה 2: {p1Char.element2}</span>
                  </div>
                  <span className="text-white text-[11px] font-bold group-hover:text-blue-300 transition truncate w-full">
                    {p1Char.lightAttack2.hebrewName}
                  </span>
                  <span className="text-[9px] text-slate-400 truncate w-full">{p1Char.lightAttack2.desc}</span>
                </button>

                {/* Heavy 1 (Element 1) */}
                <button
                  onClick={() => triggerP1Heavy(1)}
                  className="p-2 bg-slate-950/80 hover:bg-slate-800/80 border border-amber-500/40 hover:border-amber-400 rounded-xl flex flex-col items-start gap-1 text-right transition cursor-pointer group"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono">
                      F / H
                    </span>
                    <span className="text-[9px] font-bold text-amber-400">כבדה 1: {p1Char.element1}</span>
                  </div>
                  <span className="text-white text-[11px] font-bold group-hover:text-amber-300 transition truncate w-full">
                    {p1Char.heavyAttack1.hebrewName}
                  </span>
                  <span className="text-[9px] text-slate-400 truncate w-full">{p1Char.heavyAttack1.desc}</span>
                </button>

                {/* Heavy 2 (Element 2) */}
                <button
                  onClick={() => triggerP1Heavy(2)}
                  className="p-2 bg-slate-950/80 hover:bg-slate-800/80 border border-rose-500/40 hover:border-rose-400 rounded-xl flex flex-col items-start gap-1 text-right transition cursor-pointer group"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono">
                      G / I
                    </span>
                    <span className="text-[9px] font-bold text-rose-400">כבדה 2: {p1Char.element2}</span>
                  </div>
                  <span className="text-white text-[11px] font-bold group-hover:text-rose-300 transition truncate w-full">
                    {p1Char.heavyAttack2.hebrewName}
                  </span>
                  <span className="text-[9px] text-slate-400 truncate w-full">{p1Char.heavyAttack2.desc}</span>
                </button>

                {/* Ultimate */}
                <button
                  onClick={triggerP1Ultimate}
                  className={`p-2 rounded-xl flex flex-col items-start gap-1 text-right transition cursor-pointer border ${
                    p1Ult >= 100 || gameMode === 'TRAINING'
                      ? 'bg-gradient-to-br from-amber-600/50 via-purple-900/60 to-slate-950 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)] animate-pulse'
                      : 'bg-slate-950/80 border-purple-500/40 hover:border-purple-400'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-mono">
                      Y / U
                    </span>
                    <span className="text-[9px] font-bold text-purple-400">אולטימייט</span>
                  </div>
                  <span className="text-amber-300 text-[11px] font-black truncate w-full">
                    {p1Char.ultimate.hebrewName}
                  </span>
                  <span className="text-[9px] text-slate-400 truncate w-full">{p1Char.ultimate.desc}</span>
                </button>
              </div>
            </div>

            {/* Player 2 or AI/Training Info */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-800">
              <span className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                {gameMode === 'TRAINING' ? '🎯 בובת אימון (סרגל פעולות למעלה)' : gameMode === 'VS_AI' ? '🤖 בוט AI (נלחם עם כל 5 המהלכים):' : `שחקן 2 - ${p2Char.name} (${p2Char.element}):`}
              </span>
              {gameMode === 'PVP' ? (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px]">
                  <div className="p-1.5 bg-slate-950/60 border border-slate-800 rounded-lg">
                    <div className="text-slate-400 font-mono font-bold">Shift / 1 (קלה 1)</div>
                    <div className="text-rose-300 font-bold truncate">{p2Char.lightAttack1.hebrewName}</div>
                  </div>
                  <div className="p-1.5 bg-slate-950/60 border border-slate-800 rounded-lg">
                    <div className="text-slate-400 font-mono font-bold">/ או 2 (קלה 2)</div>
                    <div className="text-rose-300 font-bold truncate">{p2Char.lightAttack2.hebrewName}</div>
                  </div>
                  <div className="p-1.5 bg-slate-950/60 border border-slate-800 rounded-lg">
                    <div className="text-slate-400 font-mono font-bold">. או 4 (כבדה 1)</div>
                    <div className="text-amber-300 font-bold truncate">{p2Char.heavyAttack1.hebrewName}</div>
                  </div>
                  <div className="p-1.5 bg-slate-950/60 border border-slate-800 rounded-lg">
                    <div className="text-slate-400 font-mono font-bold">; או 5 (כבדה 2)</div>
                    <div className="text-amber-300 font-bold truncate">{p2Char.heavyAttack2.hebrewName}</div>
                  </div>
                  <div className="p-1.5 bg-slate-950/60 border border-slate-800 rounded-lg">
                    <div className="text-slate-400 font-mono font-bold">Enter / 0 (אולטימייט)</div>
                    <div className="text-purple-300 font-bold truncate">{p2Char.ultimate.hebrewName}</div>
                  </div>
                </div>
              ) : (
                <div className="text-slate-400 text-[11px] leading-relaxed">
                  {gameMode === 'TRAINING'
                    ? 'ניתן לבחון את כל 4 המכות והאולטימייט ישירות על הבובה. השתמש במקשים או לחץ על הכרטיסיות שלמעלה להפעלה מיידית.'
                    : 'בוט ה-AI משתמש בכל 4 המתקפות (אש/אפלה, אור/אדמה, חשמל/רוח, מים/דם) לפי מרחק הקרב ומשחרר אולטימייט הרסני כשהמד שלו מתמלא.'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
