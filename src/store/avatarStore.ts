import { create } from "zustand";
import { colorsPalette1 } from "src/constants/colorPalettes";
import { mockFeatures } from "../data/mockFeatures";
import {
  shapes,
  borders,
  faces,
  eyes,
  eyebrows,
  mouths,
  noses,
  beards,
} from "src/constants/features";

type offset = {
  x: number;
  y: number;
  zoom: number;
};
type Features = {
  shape_key?: (typeof shapes)[number];
  shape_color?: string;
  border_type?: string;
  border_color?: string;
  face_shape?: string;
  eye_shape?: string;
  eyebrow_shape?: string;
  mouth_shape?: string;
  nose_shape?: string;
  beard_shape?: string;
};
type State = {
  history: Array<{ features: Features }>;
  currentStep: number;
  isFlipped: boolean;
  isPremium: boolean;
  features: Features;
  featuresOffset: {
    face_shape: offset;
    eye_shape: offset;
    eyebrow_shape: offset;
    mouth_shape: offset;
    nose_shape: offset;
    beard_shape: offset;
  };
  currentFeature?: string;
  currentFeatureType?: string;
};

type StateActions = {
  saveToHistory: () => void;
  undo: () => void;
  redo: () => void;
  randomize: () => void;
  reset: () => void;
  setFeature: (type: string, feature: {}) => void;
  setFeatureOffset: (
    direction: "up" | "down" | "left" | "right" | "reset"
  ) => void;
  setFeatureZoom: (type: "in" | "out" | "reset") => void;
  setCurrentFeature: (key: string | undefined) => void;
};

const defaultFeatureOffset = {
  x: 0,
  y: 0,
  zoom: 1,
};

const initialFeatures: Features = {
  shape_key: "rounded",
  shape_color: "rgba(255, 255, 255, 1)",
  border_type: "none",
  border_color: "rgba(255, 255, 255, 1)",
  face_shape: faces[0].name,
  eye_shape: eyes[0].name,
  eyebrow_shape: eyebrows[0].name,
  mouth_shape: mouths[0].name,
  nose_shape: noses[0].name,
  beard_shape: "none",
};

const initialFeaturesOffset = {
  face_shape: defaultFeatureOffset,
  eye_shape: defaultFeatureOffset,
  eyebrow_shape: defaultFeatureOffset,
  mouth_shape: defaultFeatureOffset,
  nose_shape: defaultFeatureOffset,
  beard_shape: defaultFeatureOffset,
};

const initialState: State = {
  history: [{ features: initialFeatures }],
  currentStep: 0,
  isFlipped: false,
  isPremium: false,
  features: initialFeatures,
  featuresOffset: initialFeaturesOffset,
  currentFeature: initialFeatures.eye_shape,
  currentFeatureType: "eye_shape",
};

export const useAvatarStore = create<State & StateActions>((set, get) => ({
  ...initialState,

  saveToHistory: () => {
    const { history, currentStep, features } = get();
    const newHistory = history.slice(0, currentStep + 1);
    if (newHistory.length > 3) {
      newHistory.shift();
    }
    set({
      history: [...newHistory, { features: { ...features } }],
      currentStep: newHistory.length,
    });
  },

  setFeature: (type, feature) => {
    const current = get();
    const { features } = current;
    set({
      features: {
        ...features,
        [type]: feature,
      },
      currentFeatureType: type,
    });
    current.saveToHistory();
  },

  toggleFlip: () => {
    set((state) => ({ isFlipped: !state.isFlipped }));
  },

  reset: () => {
    const current = get();
    current.saveToHistory();
    set({ ...initialState });
  },

  undo: () => {
    const { currentStep, history } = get();
    if (currentStep > 0) {
      const previousState = history[currentStep - 1];
      const { features } = previousState;
      set({
        features: { ...features },
        currentStep: currentStep - 1,
      });
    }
  },

  redo: () => {
    const { currentStep, history } = get();
    if (currentStep < history.length - 1) {
      const nextState = history[currentStep + 1];
      const { features } = nextState;
      set({
        features: { ...features },
        currentStep: currentStep + 1,
      });
    }
  },

  randomize: () => {
    const current = get();

    set({
      features: {
        shape_key: shapes[Math.floor(Math.random() * shapes.length)],
        shape_color:
          colorsPalette1[Math.floor(Math.random() * colorsPalette1.length)],
        border_type: borders[Math.floor(Math.random() * borders.length)],
        border_color:
          colorsPalette1[Math.floor(Math.random() * colorsPalette1.length)],
        face_shape: faces[Math.floor(Math.random() * faces.length)].name,
        eye_shape: eyes[Math.floor(Math.random() * (eyes.length - 1))].name,
        eyebrow_shape:
          eyebrows[Math.floor(Math.random() * eyebrows.length)].name,
        mouth_shape:
          mouths[Math.floor(Math.random() * (mouths.length - 1))].name,
        nose_shape: noses[Math.floor(Math.random() * noses.length)].name,
        // beard_shape: beards[Math.floor(Math.random() * beards.length)].name,
        beard_shape: "none",
      },
      featuresOffset: initialFeaturesOffset,
    });
    current.saveToHistory();
  },
  setFeatureOffset: (direction) => {
    const current = get();
    const { currentFeature, featuresOffset, currentFeatureType } = current;
    if (!currentFeature || !currentFeatureType) return;
    if (direction === "up") {
      set({
        featuresOffset: {
          ...featuresOffset,
          [currentFeatureType]: {
            ...featuresOffset[currentFeatureType],
            y: featuresOffset[currentFeatureType].y - 1,
          },
        },
      });
    } else if (direction === "down") {
      set({
        featuresOffset: {
          ...featuresOffset,
          [currentFeatureType]: {
            ...featuresOffset[currentFeatureType],
            y: featuresOffset[currentFeatureType].y + 1,
          },
        },
      });
    } else if (direction === "left") {
      set({
        featuresOffset: {
          ...featuresOffset,
          [currentFeatureType]: {
            ...featuresOffset[currentFeatureType],
            x: featuresOffset[currentFeatureType].x - 1,
          },
        },
      });
    } else if (direction === "right") {
      set({
        featuresOffset: {
          ...featuresOffset,
          [currentFeatureType]: {
            ...featuresOffset[currentFeatureType],
            x: featuresOffset[currentFeatureType].x + 1,
          },
        },
      });
    } else {
      set({
        featuresOffset: {
          ...featuresOffset,
          [currentFeatureType]: {
            ...featuresOffset[currentFeatureType],
            y: featuresOffset[currentFeatureType].y + 1,
          },
        },
      });
    }
  },
  setFeatureZoom: (type) => {
    const current = get();
    const { currentFeature, featuresOffset, currentFeatureType } = current;
    if (!currentFeature || !currentFeatureType) return;
    if (type === "in") {
      set({
        featuresOffset: {
          ...featuresOffset,
          [currentFeatureType]: {
            ...featuresOffset[currentFeatureType],
            zoom: featuresOffset[currentFeatureType].zoom * 1.05,
          },
        },
      });
    } else if (type === "out") {
      set({
        featuresOffset: {
          ...featuresOffset,
          [currentFeatureType]: {
            ...featuresOffset[currentFeatureType],
            zoom: featuresOffset[currentFeatureType].zoom / 1.05,
          },
        },
      });
    } else {
      set({
        featuresOffset: {
          ...featuresOffset,
          [currentFeatureType]: {
            ...featuresOffset[currentFeatureType],
            zoom: 1,
          },
        },
      });
    }
  },
  setCurrentFeature: (key) => {
    set({ currentFeature: key });
  },
}));
