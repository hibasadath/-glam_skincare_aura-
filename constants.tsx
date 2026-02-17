
import React from 'react';
import { Sparkles, Droplets, Sun, Moon, ShieldCheck, Heart } from 'lucide-react';
import { SkinType } from './types';

export const SKIN_TYPE_DETAILS = {
  [SkinType.OILY]: {
    description: "Your skin produces excess sebum, often leading to a shiny appearance and enlarged pores.",
    ingredients: [
      { name: "Salicylic Acid", benefit: "Unclogs pores and controls oil.", frequency: "3x weekly" },
      { name: "Niacinamide", benefit: "Regulates sebum and improves texture.", frequency: "Daily" },
      { name: "Clay", benefit: "Absorbs excess surface oil.", frequency: "1x weekly" }
    ],
    color: "bg-emerald-50 text-emerald-700",
    icon: <Droplets className="w-6 h-6" />
  },
  [SkinType.DRY]: {
    description: "Your skin lacks natural oils, which can cause tightness, flakiness, or a dull complexion.",
    ingredients: [
      { name: "Hyaluronic Acid", benefit: "Draws moisture into the skin.", frequency: "Daily" },
      { name: "Ceramides", benefit: "Restores the skin's natural barrier.", frequency: "Daily" },
      { name: "Squalane", benefit: "Provides lightweight hydration.", frequency: "Nightly" }
    ],
    color: "bg-blue-50 text-blue-700",
    icon: <Sparkles className="w-6 h-6" />
  },
  [SkinType.COMBINATION]: {
    description: "You have an oily T-zone (forehead, nose, chin) and drier cheeks.",
    ingredients: [
      { name: "Vitamin C", benefit: "Brightens and protects overall.", frequency: "Morningly" },
      { name: "Glycolic Acid", benefit: "Exfoliates dead skin cells.", frequency: "2x weekly" },
      { name: "Lightweight Lotion", benefit: "Hydrates without clogging.", frequency: "Daily" }
    ],
    color: "bg-purple-50 text-purple-700",
    icon: <Sun className="w-6 h-6" />
  },
  [SkinType.SENSITIVE]: {
    description: "Your skin is prone to redness, irritation, and reacts easily to external factors.",
    ingredients: [
      { name: "Centella Asiatica", benefit: "Calms inflammation and redness.", frequency: "Daily" },
      { name: "Colloidal Oatmeal", benefit: "Soothes irritated skin.", frequency: "As needed" },
      { name: "Panthenol", benefit: "Promotes skin healing.", frequency: "Daily" }
    ],
    color: "bg-rose-50 text-rose-700",
    icon: <Heart className="w-6 h-6" />
  },
  [SkinType.NORMAL]: {
    description: "Well-balanced skin that is neither too oily nor too dry.",
    ingredients: [
      { name: "Antioxidants", benefit: "General protection from pollution.", frequency: "Daily" },
      { name: "Peptides", benefit: "Maintain skin elasticity.", frequency: "Daily" }
    ],
    color: "bg-amber-50 text-amber-700",
    icon: <ShieldCheck className="w-6 h-6" />
  }
};

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    text: "How does your skin feel midday?",
    options: [
      { text: "Shiny and greasy all over", type: SkinType.OILY },
      { text: "Tight, dry, or flaky", type: SkinType.DRY },
      { text: "Shiny only in the T-zone", type: SkinType.COMBINATION },
      { text: "Comfortable and balanced", type: SkinType.NORMAL }
    ]
  },
  {
    id: 2,
    text: "How often do you experience breakouts?",
    options: [
      { text: "Frequently, mostly deep or large", type: SkinType.OILY },
      { text: "Rarely, usually just dryness", type: SkinType.DRY },
      { text: "Occasionally, mainly in specific areas", type: SkinType.COMBINATION },
      { text: "Very rarely", type: SkinType.NORMAL }
    ]
  },
  {
    id: 3,
    text: "How does your skin react to new products?",
    options: [
      { text: "Often gets red or itchy", type: SkinType.SENSITIVE },
      { text: "Rarely has issues", type: SkinType.NORMAL },
      { text: "Can handle most active ingredients", type: SkinType.OILY },
      { text: "Sometimes stings if too dry", type: SkinType.DRY }
    ]
  }
];
