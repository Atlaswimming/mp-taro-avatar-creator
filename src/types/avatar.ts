export type ShapeType = "square" | "circle" | "rounded";

export interface GradientColors {
  color1: string;
  color2: string;
}

export interface AvatarFeature {
  id: string;
  type: "eyes" | "nose" | "mouth" | "hair" | "accessories";
  svg: string;
  isPremium?: boolean;
}

export interface AvatarState {
  backgroundColor: string;
  skinColor: string;
  selectedFeatures: {
    eyes?: AvatarFeature;
    nose?: AvatarFeature;
    mouth?: AvatarFeature;
    hair?: AvatarFeature;
    accessories?: AvatarFeature;
  };
  history: Array<{
    backgroundColor: string;
    skinColor: string;
    selectedFeatures: {
      eyes?: AvatarFeature;
      nose?: AvatarFeature;
      mouth?: AvatarFeature;
      hair?: AvatarFeature;
      accessories?: AvatarFeature;
    };
  }>;
  currentStep: number;
  isFlipped: boolean;
  borderWidth: number;
  borderColor: string;
  shapeType: ShapeType;
  featureColors: Record<string, string>;
  isPremium: boolean;
  backgroundGradient?: GradientColors;
  borderGradient?: GradientColors;
}

export interface AvatarStore extends AvatarState {
  setFeature: (
    type: keyof AvatarState["selectedFeatures"],
    feature: AvatarFeature
  ) => void;
  setBackgroundColor: (color: string) => void;
  setSkinColor: (color: string) => void;
  undo: () => void;
  redo: () => void;
  randomize: () => void;
  saveToHistory: () => void;
  toggleFlip: () => void;
  setBorderWidth: (width: number) => void;
  setBorderColor: (color: string) => void;
  setShapeType: (type: ShapeType) => void;
  setFeatureColor: (feature: string, color: string) => void;
  setBackgroundGradient: (gradient: GradientColors) => void;
  setBorderGradient: (gradient: GradientColors) => void;
}
