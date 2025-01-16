import { AvatarFeature } from "../types/avatar";

export const mockFeatures: AvatarFeature[] = [
  {
    id: "eyes1",
    type: "eyes",
    svg: `<svg viewBox="0 0 300 300">
      <circle cx="110" cy="140" r="10" fill="currentColor"/>
      <circle cx="190" cy="140" r="10" fill="currentColor"/>
    </svg>`,
  },
  {
    id: "eyes2",
    type: "eyes",
    svg: `<svg viewBox="0 0 300 300">
      <path d="M100,140 Q110,130 120,140 Q110,150 100,140" fill="currentColor"/>
      <path d="M180,140 Q190,130 200,140 Q190,150 180,140" fill="currentColor"/>
    </svg>`,
  },
  {
    id: "nose1",
    type: "nose",
    svg: `<svg viewBox="0 0 300 300">
      <path d="M140,150 Q150,170 160,150" stroke="currentColor" stroke-width="4" fill="none"/>
    </svg>`,
  },
  {
    id: "nose2",
    type: "nose",
    svg: `<svg viewBox="0 0 300 300">
      <circle cx="150" cy="160" r="8" fill="currentColor"/>
    </svg>`,
  },
  {
    id: "mouth1",
    type: "mouth",
    svg: `<svg viewBox="0 0 300 300">
      <path d="M120,180 Q150,200 180,180" stroke="currentColor" stroke-width="4" fill="none"/>
    </svg>`,
  },
  {
    id: "mouth2",
    type: "mouth",
    svg: `<svg viewBox="0 0 300 300">
      <path d="M120,180 Q150,160 180,180 Q150,200 120,180" fill="currentColor"/>
    </svg>`,
  },
  {
    id: "hair1",
    type: "hair",
    svg: `<svg viewBox="0 0 300 300">
      <path d="M70,150 Q150,50 230,150 L230,100 Q150,20 70,100" fill="currentColor"/>
    </svg>`,
  },
  {
    id: "hair2",
    type: "hair",
    svg: `<svg viewBox="0 0 300 300">
      <path d="M80,180 Q150,30 220,180 Q150,120 80,180" fill="currentColor"/>
    </svg>`,
  },
  {
    id: "accessories1",
    type: "accessories",
    svg: `<svg viewBox="0 0 300 300">
      <rect x="95" y="120" width="110" height="10" rx="5" fill="currentColor"/>
    </svg>`,
    isPremium: true,
  },
  {
    id: "accessories2",
    type: "accessories",
    svg: `<svg viewBox="0 0 300 300">
      <circle cx="110" cy="140" r="20" stroke="currentColor" stroke-width="4" fill="none"/>
      <circle cx="190" cy="140" r="20" stroke="currentColor" stroke-width="4" fill="none"/>
    </svg>`,
    isPremium: true,
  },
];
