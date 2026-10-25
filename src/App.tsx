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
  lightAttack1: CharacterMove;
  lightAttack2: CharacterMove;
  heavyAttack1: CharacterMove;
  heavyAttack2: CharacterMove;
  ultimate: CharacterMove;
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

// Anime OST Tracks Definition
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

class CanvasFighter {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  width: number = 95;
  height: number = 175;
  name: string;
  facing: 'left' | 'right';
  character: CharacterDef;
  image: HTMLImageElement | null = null;
  imageLoaded: boolean = false;

  speed: number = 6.8;
  jumpForce: number = -18;
  isGrounded: boolean = false;

  health: number = 100;
  maxHealth: number = 100;
  isDead: boolean = false;

  ultimateMeter: number = 0;

  action: FighterAction = 'IDLE';
  animFrame: number = 0;

  attackPhase: AttackPhase = 'NONE';
  phaseTimer: number = 0;
  currentAttackKey: 'LIGHT_1' | 'LIGHT_2' | 'HEAVY_1' | 'HEAVY_2' | 'ULTIMATE' | null = null;
  hasHitConnected: boolean = false;
  comboStep: number = 0;
  cancelWindowActive: boolean = false;

  hitStunDuration: number = 0;
  blockStunDuration: number = 0;
  isBlocking: boolean = false;

  isDashing: boolean = false;
  dashDuration: number = 0;
  dashCooldown: number = 0;
  isInvulnerable: boolean = false;

  dynamicHitbox: {
    x: number;
    y: number;
    width: number;
    height: number;
    active: boolean;
  } = { x: 0, y: 0, width: 0, height: 0, active: false };

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
    img.onload = () => {
      this.imageLoaded = true;
    };
    this.image = img;
  }

  setCharacter(char: CharacterDef) {
    this.character = char;
    this.imageLoaded = false;
    this.loadImage();
  }

  addUltimate(amount: number) {
    this.ultimateMeter = Math.min(100, this.ultimateMeter + amount);
  }

  bufferInput(command: 'LIGHT_1' | 'LIGHT_2' | 'HEAVY_1' | 'HEAVY_2' | 'ULTIMATE' | 'DASH_L' | 'DASH_R') {
    this.inputBuffer.push({ command, ttl: 12 });
  }

  startLightAttack(subType: 1 | 2 = 1) {
    if (this.isDead || this.hitStunDuration > 0 || this.blockStunDuration > 0 || this.isDashing) return;

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
    this.comboStep = 0;
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

    for (let i = this.inputBuffer.length - 1; i >= 0; i--) {
      this.inputBuffer[i].ttl--;
      if (this.inputBuffer[i].ttl <= 0) {
        this.inputBuffer.splice(i, 1);
        continue;
      }

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

    if (this.currentAttackKey) {
      const data = ATTACK_FRAME_DATA[this.currentAttackKey];
      this.phaseTimer--;

      if (this.attackPhase === 'STARTUP' && this.phaseTimer <= 0) {
        this.attackPhase = 'ACTIVE';
        this.phaseTimer = data.active;
        this.dynamicHitbox.active = true;
      } else if (this.attackPhase === 'ACTIVE') {
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
          this.attackPhase = 'RECOVERY';
          this.phaseTimer = data.recovery;
          this.dynamicHitbox.active = false;
          if (this.hasHitConnected) {
            this.cancelWindowActive = true;
          }
        }
      } else if (this.attackPhase === 'RECOVERY') {
        this.dynamicHitbox.active = false;
        if (this.phaseTimer <= 0) {
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

    for (let i = this.ghosts.length - 1; i >= 0; i--) {
      this.ghosts[i].alpha -= 0.08;
      if (this.ghosts[i].alpha <= 0) {
        this.ghosts.splice(i, 1);
      }
    }

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

    this.velocity.x *= 0.88;

    if (this.position.x < 15) this.position.x = 15;
    if (this.position.x + this.width > canvasWidth - 15) {
      this.position.x = canvasWidth - 15 - this.width;
    }

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

  // RENDER REAL CHARACTER IMAGE ON CANVAS WITH GLOW AND EFFECTS
  draw(ctx: CanvasRenderingContext2D, groundY: number) {
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
    const isUlt = this.action === 'ULTIMATE';

    // Aura Effect
    ctx.save();
    ctx.shadowColor = isUlt ? secColor : theme;
    ctx.shadowBlur = isUlt ? 35 : 15;
    ctx.strokeStyle = isUlt ? secColor : theme;
    ctx.lineWidth = isUlt ? 5 : 2.5;
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.5, w * 0.52, h * 0.52, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Draw Character Real Image
    if (this.image && this.imageLoaded) {
      ctx.save();
      ctx.drawImage(this.image, 0, 0, w, h);
      ctx.restore();
    } else {
      // Fallback placeholder box if loading
      ctx.fillStyle = theme;
      ctx.fillRect(0, 0, w, h);
    }

    if (this.action === 'BLOCK' || this.action === 'BLOCKSTUN') {
      ctx.save();
      ctx.strokeStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 24;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.5, 75, -Math.PI * 0.4, Math.PI * 0.4, false);
      ctx.stroke();
      ctx.restore();
    }

    if (this.attackPhase === 'ACTIVE') {
      ctx.save();
      ctx.strokeStyle = theme;
      ctx.shadowColor = theme;
      ctx.shadowBlur = 24;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(w + 15, h * 0.4, 45, -Math.PI * 0.4, Math.PI * 0.4, false);
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();
  }
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [screen, setScreen] = useState<
    'TITLE_MENU' | 'CHARACTER_SELECT' | 'STAGE_SELECT' | 'VS_SCREEN' | 'BATTLE' | 'GAME_OVER'
  >('TITLE_MENU');
  const [gameMode, setGameMode] = useState<'PVP' | 'VS_AI' | 'TRAINING'>('PVP');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showCreditsModal, setShowCreditsModal] = useState<boolean>(false);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);

  const [roundsToWin, setRoundsToWin] = useState<number>(2);
  const [matchDuration, setMatchDuration] = useState<number>(120);
  const [p1RoundsWon, setP1RoundsWon] = useState<number>(0);
  const [p2RoundsWon, setP2RoundsWon] = useState<number>(0);
  const [roundNotification, setRoundNotification] = useState<string | null>(null);

  const [dummyBehavior, setDummyBehavior] = useState<'STAND' | 'BLOCK' | 'JUMP' | 'ATTACK'>('STAND');
  const [trainingTotalDamage, setTrainingTotalDamage] = useState<number>(0);
  const [ultNotice, setUltNotice] = useState<string | null>(null);

  const [p1SelectedIdx, setP1SelectedIdx] = useState<number>(0);
  const [p2SelectedIdx, setP2SelectedIdx] = useState<number>(1);
  const [p1Locked, setP1Locked] = useState<boolean>(false);
  const [p2Locked, setP2Locked] = useState<boolean>(false);

  const [selectedStageIdx, setSelectedStageIdx] = useState<number>(0);

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [musicEnabled, setMusicEnabled] = useState<boolean>(true);
  const [musicTrackIdx, setMusicTrackIdx] = useState<number>(0);
  const [musicVolume, setMusicVolume] = useState<number>(0.65);
  const [customMusicUrl, setCustomMusicUrl] = useState<string>('');
  const [musicStatusText, setMusicStatusText] = useState<string>('מתנגן');

  const bgmAudioRef = useRef<HTMLAudioElement | null>(null);

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

  const [finishHimTriggered, setFinishHimTriggered] = useState<boolean>(false);
  const [activeUltBanner, setActiveUltBanner] = useState<{ name: string; title: string; color: string } | null>(null);

  const fighter1Ref = useRef<CanvasFighter | null>(null);
  const fighter2Ref = useRef<CanvasFighter | null>(null);
  const projectilesRef = useRef<Projectile[]>([]);
  const particlesRef = useRef<SparkParticle[]>([]);
  const shockwavesRef = useRef<ShockwaveRing[]>([]);
  const ultFieldEffectsRef = useRef<UltimateFieldEffect[]>([]);
  const screenShakeRef = useRef<number>(0);
  const hitStopFramesRef = useRef<number>(0);
  const isGameOverRef = useRef<boolean>(false);
  const timerRef = useRef<number>(120);
  const stageImagesRef = useRef<{ [key: string]: HTMLImageElement }>({});
  const aiDecisionTimerRef = useRef<number>(0);

  const CANVAS_WIDTH = 1024;
  const CANVAS_HEIGHT = 576;
  const FLOOR_OFFSET = 90;
  const GROUND_Y = CANVAS_HEIGHT - FLOOR_OFFSET;
  const GRAVITY = 0.78;

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

  useEffect(() => {
    STAGES.forEach((st) => {
      const img = new Image();
      img.src = st.bgUrl;
      stageImagesRef.current[st.id] = img;
    });
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

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
      .catch(() => {
        setMusicStatusText('לחץ להפעלה');
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
        pType = 'void_nova';
        pColor = '#ef4444';
        pSecColor = '#000000';
        pSize = 75;
      } else if (char.id === 'philip') {
        pType = 'solar_beam';
        pColor = '#facc15';
        pSecColor = '#ffffff';
        pSize = 85;
      } else if (char.id === 'ivan') {
        pType = 'tornado';
        pColor = '#38bdf8';
        pSecColor = '#ffffff';
        pSize = 80;
      } else if (char.id === 'roni') {
        pType = 'blood_arrow';
        pColor = '#06b6d4';
        pSecColor = '#e11d48';
        pSize = 72;
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

      if (screen === 'BATTLE') {
        if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
          e.preventDefault();
        }

        const f1 = fighter1Ref.current;
        const f2 = fighter2Ref.current;

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

        if (e.code === 'KeyQ' && f1) {
          f1.bufferInput('DASH_L');
          if (f1.attackPhase === 'NONE') f1.dash('left');
        }
        if (e.code === 'KeyE' && f1) {
          f1.bufferInput('DASH_R');
          if (f1.attackPhase === 'NONE') f1.dash('right');
        }

        if ((e.code === 'Space' || e.code === 'KeyJ') && f1) {
          f1.bufferInput('LIGHT_1');
          if (f1.attackPhase === 'NONE' || f1.cancelWindowActive) f1.startLightAttack(1);
        }

        if ((e.code === 'KeyC' || e.code === 'KeyK') && f1) {
          f1.bufferInput('LIGHT_2');
          if (f1.attackPhase === 'NONE' || f1.cancelWindowActive) f1.startLightAttack(2);
        }

        if ((e.code === 'KeyF' || e.code === 'KeyH') && f1) {
          f1.bufferInput('HEAVY_1');
          if (f1.attackPhase === 'NONE' || f1.cancelWindowActive) f1.startHeavyAttack(1, spawnProjectile);
        }

        if ((e.code === 'KeyG' || e.code === 'KeyI') && f1) {
          f1.bufferInput('HEAVY_2');
          if (f1.attackPhase === 'NONE' || f1.cancelWindowActive) f1.startHeavyAttack(2, spawnProjectile);
        }

        if ((e.code === 'KeyY' || e.code === 'KeyU' || e.code === 'KeyO' || e.code === 'KeyT') && f1) {
          f1.bufferInput('ULTIMATE');
          const fired = f1.startUltimateAttack(spawnProjectile, triggerFieldEffect, gameMode === 'TRAINING');
          setP1Ult(f1.ultimateMeter);
          if (!fired && f1.ultimateMeter < 100) {
            setUltNotice(`⚠️ מד אולטימייט עדיין לא מלא (${Math.round(f1.ultimateMeter)}% / 100%) - פגע ביריב כדי לטעון`);
            setTimeout(() => setUltNotice(null), 2000);
          }
        }

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

          if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.code === 'Numpad1') && f2) {
            f2.bufferInput('LIGHT_1');
            if (f2.attackPhase === 'NONE' || f2.cancelWindowActive) f2.startLightAttack(1);
          }

          if ((e.code === 'Slash' || e.code === 'Backslash' || e.code === 'Numpad2') && f2) {
            f2.bufferInput('LIGHT_2');
            if (f2.attackPhase === 'NONE' || f2.cancelWindowActive) f2.startLightAttack(2);
          }

          if ((e.code === 'Period' || e.code === 'Numpad4') && f2) {
            f2.bufferInput('HEAVY_1');
            if (f2.attackPhase === 'NONE' || f2.cancelWindowActive) f2.startHeavyAttack(1, spawnProjectile);
          }

          if ((e.code === 'Semicolon' || e.code === 'KeyL' || e.code === 'Numpad5') && f2) {
            f2.bufferInput('HEAVY_2');
            if (f2.attackPhase === 'NONE' || f2.cancelWindowActive) f2.startHeavyAttack(2, spawnProjectile);
          }

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

      if (hitStopFramesRef.current > 0) {
        hitStopFramesRef.current--;
        return;
      }

      const f1 = fighter1Ref.current;
      const f2 = fighter2Ref.current;
      if (!f1 || !f2) return;

      updateAIController(f2, f1);

      if (gameMode !== 'TRAINING' && !finishHimTriggered && (f1.health <= 15 || f2.health <= 15)) {
        setFinishHimTriggered(true);
      }

      ctx.save();
      if (screenShakeRef.current > 0) {
        const shakeX = (Math.random() - 0.5) * screenShakeRef.current;
        const shakeY = (Math.random() - 0.5) * screenShakeRef.current;
        ctx.translate(shakeX, shakeY);
        screenShakeRef.current *= 0.86;
        if (screenShakeRef.current < 0.4) screenShakeRef.current = 0;
      }

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

      if (checkDynamicHitbox(f1, f2) && f1.currentAttackKey) {
        const data = ATTACK_FRAME_DATA[f1.currentAttackKey];
        f1.hasHitConnected = true;
        f1.addUltimate(f1.currentAttackKey === 'ULTIMATE' ? 0 : 25);

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

      for (let i = ultFieldEffectsRef.current.length - 1; i >= 0; i--) {
        const ufe = ultFieldEffectsRef.current[i];
        ufe.duration--;
        const progress = 1 - ufe.duration / ufe.maxDuration;
        const alpha = Math.sin(progress * Math.PI);

        ctx.save();
        ctx.shadowColor = ufe.character.themeColor;
        ctx.shadowBlur = 40;

        if (ufe.character.id === 'idan') {
          ctx.fillStyle = `rgba(10, 5, 20, ${0.45 * alpha})`;
          ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        } else if (ufe.character.id === 'philip') {
          ctx.fillStyle = `rgba(254, 240, 138, ${0.18 * alpha})`;
          ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        } else if (ufe.character.id === 'ivan') {
          ctx.fillStyle = `rgba(15, 23, 42, ${0.45 * alpha})`;
          ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        } else {
          ctx.fillStyle = `rgba(6, 182, 212, ${0.18 * alpha})`;
          ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }
        ctx.restore();

        if (ufe.duration <= 0) {
          ultFieldEffectsRef.current.splice(i, 1);
        }
      }

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

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
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
      <div className="w-full max-w-[1550px] flex items-center justify-between text-xs px-4 py-2 mb-3 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                audio.init();
                setMusicEnabled((m) => !m);
              }}
              className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <Music className={`w-4 h-4 ${musicEnabled ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`} />
            </button>
            <span className="text-slate-400 font-mono hidden md:inline">שיר קרב:</span>
            <span className="font-bold text-amber-300 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {currentBgm.title}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button onClick={prevTrack} className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button onClick={nextTrack} className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer">
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
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-sky-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer flex items-center gap-1.5 border border-slate-700"
          >
            {isFullscreen ? <Minimize className="w-4 h-4 text-amber-400" /> : <Maximize className="w-4 h-4 text-amber-400" />}
            <span className="font-bold text-[11px]">{isFullscreen ? 'צא ממסך מלא' : 'מסך מלא (🖥️)'}</span>
          </button>
        </div>
      </div>

      {screen === 'TITLE_MENU' && (
        <div className="w-full max-w-5xl aspect-[16/10] md:aspect-[16/9] bg-slate-950 rounded-3xl border-4 border-amber-500/60 shadow-[0_0_80px_rgba(245,158,11,0.25)] flex flex-col items-center justify-between p-6 md:p-8 mx-auto relative overflow-hidden my-auto">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.45)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />

          <div className="w-full flex items-center justify-between z-20 text-xs font-mono text-amber-400/90 tracking-widest uppercase">
            <span>INSERT COIN</span>
            <span className="animate-pulse">CREDIT 02</span>
            <span>HI-SCORE 99990</span>
          </div>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-3xl mt-6">
              <button
                onClick={() => {
                  audio.playCoin();
                  setGameMode('PVP');
                  setScreen('CHARACTER_SELECT');
                }}
                className="p-3.5 bg-gradient-to-r from-blue-900/80 to-indigo-900/80 hover:from-blue-600 hover:to-indigo-600 border-2 border-blue-400/60 rounded-xl flex items-center gap-3 text-right font-bold transition-all shadow-lg hover:scale-102 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-400 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-blue-300" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-black uppercase">1. לשחק שחקן נגד שחקן</span>
                  <span className="text-[10px] text-blue-200/80">קרב 2 שחקנים באותה מקלדת</span>
                </div>
              </button>

              <button
                onClick={() => {
                  audio.playCoin();
                  setGameMode('VS_AI');
                  setScreen('CHARACTER_SELECT');
                }}
                className="p-3.5 bg-gradient-to-r from-purple-900/80 to-pink-900/80 hover:from-purple-600 hover:to-pink-600 border-2 border-purple-400/60 rounded-xl flex items-center gap-3 text-right font-bold transition-all shadow-lg hover:scale-102 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-400 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-purple-300" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-black uppercase">2. שחקן נגד מחשב</span>
                  <span className="text-[10px] text-purple-200/80">קרב תחרותי נגד בוט AI</span>
                </div>
              </button>

              <button
                onClick={() => {
                  audio.playCoin();
                  setGameMode('TRAINING');
                  setScreen('CHARACTER_SELECT');
                }}
                className="p-3.5 bg-gradient-to-r from-amber-900/80 to-yellow-900/80 hover:from-amber-600 hover:to-yellow-600 border-2 border-amber-400/60 rounded-xl flex items-center gap-3 text-right font-bold transition-all shadow-lg hover:scale-102 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-amber-300" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-black uppercase">3. אימונים</span>
                  <span className="text-[10px] text-amber-200/80">בובת אימון ואולטימייט חופשי</span>
                </div>
              </button>

              <button
                onClick={() => {
                  audio.playSelect();
                  setShowSettingsModal(true);
                }}
                className="p-3.5 bg-slate-900/80 hover:bg-slate-800 border-2 border-slate-700 rounded-xl flex items-center gap-3 text-right font-bold transition-all shadow-lg hover:scale-102 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-600 flex items-center justify-center shrink-0">
                  <Settings className="w-5 h-5 text-slate-300" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-black uppercase">4. הגדרות</span>
                  <span className="text-[10px] text-slate-400">מוזיקה, ווליום, טיימר וראונדים</span>
                </div>
              </button>

              <button
                onClick={() => {
                  audio.playSelect();
                  setShowCreditsModal(true);
                }}
                className="p-3.5 bg-slate-900/80 hover:bg-slate-800 border-2 border-amber-500/40 rounded-xl flex items-center gap-3 text-right font-bold transition-all shadow-lg hover:scale-102 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-amber-300" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-black uppercase">5. קרדיטים ל-IDL</span>
                  <span className="text-[10px] text-amber-200/80">יוצרים, מנוע המשחק והשראה</span>
                </div>
              </button>

              <button
                onClick={() => {
                  audio.playSelect();
                  setShowExitModal(true);
                }}
                className="p-3.5 bg-red-950/60 hover:bg-red-900 border-2 border-red-700/60 rounded-xl flex items-center gap-3 text-right font-bold transition-all shadow-lg hover:scale-102 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-red-500/20 border border-red-400 flex items-center justify-center shrink-0">
                  <LogOut className="w-5 h-5 text-red-300" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-black uppercase">6. יציאה מהמשחק</span>
                  <span className="text-[10px] text-red-300/80">סיום הפעלה ומסך פרידה</span>
                </div>
              </button>
            </div>
          </div>

          <div className="text-xs text-amber-400/90 font-mono font-bold tracking-widest z-20 mt-4">
            2026 SQUAD NOOBS | IDL ENGINE V1.0
          </div>
        </div>
      )}

      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border-2 border-amber-500/80 rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black uppercase text-amber-400 flex items-center gap-2">
                <Settings className="w-5 h-5 text-amber-400" />
                הגדרות משחק (Game Settings)
              </h3>
              <button onClick={() => setShowSettingsModal(false)} className="p-1 rounded hover:bg-slate-800 text-slate-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-slate-300">זמן קרב ברירת מחדל:</span>
              <div className="grid grid-cols-4 gap-2">
                {[120, 180, 240, 300].map((sec) => (
                  <button
                    key={`set-dur-${sec}`}
                    onClick={() => {
                      setMatchDuration(sec);
                      setTimer(sec);
                    }}
                    className={`py-2 rounded-lg font-bold text-xs transition cursor-pointer border ${
                      matchDuration === sec ? 'bg-sky-500 text-slate-950 border-white' : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {sec} שניות
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-slate-300">כמות ראונדים לניצחון:</span>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button
                    key={`set-rd-${r}`}
                    onClick={() => setRoundsToWin(r)}
                    className={`py-2 rounded-lg font-bold text-xs transition cursor-pointer border ${
                      roundsToWin === r ? 'bg-amber-500 text-slate-950 border-white' : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {r} ראונדים
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowSettingsModal(false)}
              className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-sm uppercase rounded-xl transition cursor-pointer mt-2"
            >
              שמור והמשך
            </button>
          </div>
        </div>
      )}

      {showCreditsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border-2 border-amber-400 rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4 text-center">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-lg font-black uppercase text-amber-400">קרדיטים רשמיים - IDL ENGINE</h3>
              <button onClick={() => setShowCreditsModal(false)} className="p-1 rounded hover:bg-slate-800 text-slate-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="my-2 flex flex-col items-center gap-2">
              <h2 className="text-2xl font-black text-white uppercase tracking-wider font-mono">2026 SQUAD NOOBS</h2>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                POWERED BY IDL ENGINE V1.0
              </span>
            </div>
            <button
              onClick={() => setShowCreditsModal(false)}
              className="w-full py-2.5 bg-slate-800 text-white font-bold text-xs uppercase rounded-xl transition cursor-pointer"
            >
              סגור קרדיטים
            </button>
          </div>
        </div>
      )}

      {showExitModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border-2 border-red-500 rounded-2xl max-w-sm w-full p-6 shadow-2xl flex flex-col items-center text-center gap-4">
            <h3 className="text-xl font-black uppercase text-red-400">יציאה מהמשחק?</h3>
            <div className="flex flex-col gap-2 w-full mt-2">
              <button
                onClick={() => setShowExitModal(false)}
                className="w-full py-2.5 bg-red-600 text-white font-black text-xs uppercase rounded-xl transition cursor-pointer"
              >
                כן, יציאה
              </button>
              <button
                onClick={() => setShowExitModal(false)}
                className="w-full py-2.5 bg-slate-800 text-slate-300 font-bold text-xs uppercase rounded-xl transition cursor-pointer"
              >
                המשך לשחק
              </button>
            </div>
          </div>
        </div>
      )}

      {screen === 'CHARACTER_SELECT' && (
        <div className="w-full max-w-6xl bg-slate-950 rounded-3xl border-2 border-slate-800 shadow-2xl p-4 md:p-6 flex flex-col gap-4 relative overflow-hidden mx-auto my-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-2xl md:text-3xl font-black uppercase text-amber-400 tracking-wider">SELECT YOUR FIGHTER</h2>
            <button
              onClick={() => setScreen('TITLE_MENU')}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-slate-300 cursor-pointer"
            >
              חזור
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {CHARACTERS.map((char, idx) => {
              const isP1 = p1SelectedIdx === idx;
              const isP2 = p2SelectedIdx === idx;
              const IconComp = char.icon;

              return (
                <div
                  key={char.id}
                  className={`rounded-2xl border-2 p-2.5 bg-slate-900/90 flex flex-col justify-between gap-2.5 relative transition-all duration-200 shadow-xl ${
                    isP1
                      ? 'border-blue-500 ring-4 ring-blue-500/50'
                      : isP2
                      ? 'border-rose-500 ring-4 ring-rose-500/50'
                      : 'border-slate-800 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <IconComp className="w-3.5 h-3.5" />
                      {char.element}
                    </span>
                  </div>

                  <div className="aspect-[3/4] w-full rounded-xl overflow-hidden border border-slate-700/60 relative group">
                    <img src={char.imageSrc} alt={char.name} className="w-full h-full object-cover" />
                  </div>

                  <div>
                    <h3 className="text-sm font-black uppercase text-white truncate">{char.name}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-1 pt-1">
                    <button
                      onClick={() => {
                        audio.playSelect();
                        setP1SelectedIdx(idx);
                      }}
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
                      P2
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between border-t border-slate-800 pt-3">
            <button
              onClick={() => {
                audio.playLockIn();
                setP1Locked(true);
                setP2Locked(true);
                setScreen('STAGE_SELECT');
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-sm uppercase rounded-xl transition cursor-pointer flex items-center gap-2"
            >
              <span>המשך לבחירת מפה</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {screen === 'STAGE_SELECT' && (
        <div className="w-full max-w-6xl bg-slate-950 rounded-3xl border-2 border-slate-800 shadow-2xl p-4 md:p-6 flex flex-col gap-6 relative overflow-hidden mx-auto my-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-2xl md:text-3xl font-black uppercase text-amber-400">SELECT BATTLE STAGE</h2>
            <button
              onClick={() => setScreen('CHARACTER_SELECT')}
              className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-bold text-slate-300 cursor-pointer"
            >
              חזור
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
                  className={`rounded-2xl border-2 overflow-hidden bg-slate-900/90 flex flex-col transition-all cursor-pointer ${
                    isSelected ? 'border-amber-400 ring-4 ring-amber-500/50' : 'border-slate-800 opacity-75'
                  }`}
                >
                  <div className="aspect-[16/9] w-full overflow-hidden relative">
                    <img src={st.bgUrl} alt={st.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-black text-white">{st.hebrewName}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between border-t border-slate-800 pt-4">
            <button
              onClick={() => triggerVSAndBattle(p1Char, p2Char)}
              className="px-10 py-3.5 bg-gradient-to-r from-red-600 to-amber-500 text-slate-950 font-black text-base uppercase rounded-xl transition cursor-pointer flex items-center gap-3 animate-pulse"
            >
              <span>התחל את הקרב!</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {screen === 'VS_SCREEN' && (
        <div className="w-full max-w-6xl aspect-[16/9] bg-slate-950 rounded-3xl border-4 border-slate-700 shadow-2xl relative overflow-hidden flex items-center justify-between mx-auto my-auto">
          <div className="w-1/2 h-full relative overflow-hidden flex flex-col justify-end p-8 bg-gradient-to-r from-blue-950/80 to-transparent">
            <img src={p1Char.imageSrc} alt={p1Char.name} className="absolute inset-0 w-full h-full object-cover opacity-70 -scale-x-100" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic">{p1Char.name}</h2>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div
              className="text-7xl md:text-9xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-red-600 animate-bounce"
              style={{ fontFamily: "'Press Start 2P', monospace, sans-serif" }}
            >
              VS
            </div>
          </div>

          <div className="w-1/2 h-full relative overflow-hidden flex flex-col justify-end p-8 items-end text-right bg-gradient-to-l from-rose-950/80 to-transparent">
            <img src={p2Char.imageSrc} alt={p2Char.name} className="absolute inset-0 w-full h-full object-cover opacity-70" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic">{p2Char.name}</h2>
            </div>
          </div>
        </div>
      )}

      {(screen === 'BATTLE' || screen === 'GAME_OVER') && (
        <div className="w-full max-w-[1550px] flex flex-col gap-2.5 mx-auto my-auto items-center justify-center">
          <div className="w-full aspect-[16/9] max-h-[82vh] bg-slate-950 rounded-3xl border-4 border-slate-800 shadow-[0_0_60px_rgba(0,0,0,0.85)] relative overflow-hidden flex items-center justify-center">
            <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className="w-full h-full block object-contain" />

            <div className="absolute top-0 inset-x-0 p-3 md:p-5 flex items-start justify-between pointer-events-none z-20">
              <div className="w-[38%] flex flex-col gap-1.5">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-11 h-11 md:w-13 md:h-13 rounded-2xl overflow-hidden border-2 shadow-lg flex items-center justify-center relative bg-slate-900"
                    style={{ borderColor: p1Char.themeColor }}
                  >
                    <img src={p1Char.imageSrc} alt={p1Char.name} className="w-full h-full object-cover -scale-x-100" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm md:text-base font-black uppercase text-sky-400">{p1Char.name}</span>
                  </div>
                </div>

                <div className="relative w-full h-6 md:h-8 bg-slate-950/85 rounded-lg border-2 border-slate-600 overflow-hidden shadow-inner">
                  <div
                    className="absolute top-0 bottom-0 right-0 bg-gradient-to-l from-blue-600 via-sky-400 to-cyan-300 transition-all duration-120 ease-out rounded"
                    style={{ width: `${p1Health}%` }}
                  />
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] md:text-xs font-black text-white font-mono">
                    {p1Health} HP
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-18 h-14 md:w-22 md:h-16 bg-slate-950/90 border-2 border-amber-400/80 rounded-xl flex items-center justify-center shadow-xl">
                  <span className="font-mono text-3xl md:text-4xl font-black text-amber-400">{gameMode === 'TRAINING' ? '∞' : timer}</span>
                </div>
                <button
                  onClick={() => setIsPaused(true)}
                  className="pointer-events-auto mt-1.5 px-3 py-1 bg-slate-900/80 border border-slate-700 text-slate-300 rounded text-xs font-bold cursor-pointer"
                >
                  עצור (P)
                </button>
              </div>

              <div className="w-[38%] flex flex-col gap-1.5 items-end">
                <div className="flex items-center gap-2.5 flex-row-reverse">
                  <div
                    className="w-11 h-11 md:w-13 md:h-13 rounded-2xl overflow-hidden border-2 shadow-lg flex items-center justify-center relative bg-slate-900"
                    style={{ borderColor: p2Char.themeColor }}
                  >
                    <img src={p2Char.imageSrc} alt={p2Char.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm md:text-base font-black uppercase text-rose-400">{p2Char.name}</span>
                  </div>
                </div>

                <div className="relative w-full h-6 md:h-8 bg-slate-950/85 rounded-lg border-2 border-slate-600 overflow-hidden shadow-inner">
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 transition-all duration-120 ease-out rounded"
                    style={{ width: `${p2Health}%` }}
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] md:text-xs font-black text-white font-mono">
                    {p2Health} HP
                  </span>
                </div>
              </div>
            </div>

            {isPaused && (
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center z-40">
                <div className="bg-slate-900 border-2 border-slate-700 p-6 rounded-2xl max-w-sm w-full flex flex-col items-center text-center shadow-2xl gap-4">
                  <h3 className="text-2xl font-black uppercase text-amber-400">GAME PAUSED</h3>
                  <button
                    onClick={() => setIsPaused(false)}
                    className="w-full py-3 bg-blue-600 text-white font-black text-sm uppercase rounded-xl transition cursor-pointer"
                  >
                    המשך קרב
                  </button>
                  <button
                    onClick={() => setScreen('TITLE_MENU')}
                    className="w-full py-2.5 bg-rose-950/60 border border-rose-800 text-rose-300 font-bold text-xs uppercase rounded-xl transition cursor-pointer"
                  >
                    יציאה לתפריט ראשי
                  </button>
                </div>
              </div>
            )}

            {screen === 'GAME_OVER' && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center z-40">
                <div className="text-center flex flex-col items-center gap-4 max-w-lg p-6">
                  <h2 className="text-4xl md:text-5xl font-black uppercase text-amber-400">VICTORY!</h2>
                  <p className="text-xl font-black text-amber-300">{winner}</p>
                  <button
                    onClick={() => startMatch(p1Char, p2Char)}
                    className="px-6 py-3 rounded-xl font-black text-sm uppercase text-white bg-blue-600 transition cursor-pointer"
                  >
                    קרב חוזר
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
