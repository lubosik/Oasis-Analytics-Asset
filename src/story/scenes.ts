import { type ComponentType } from "react";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";
import { Scene6 } from "./scenes/Scene6";
import { Scene7 } from "./scenes/Scene7";
import { Scene8 } from "./scenes/Scene8";
import { Scene9 } from "./scenes/Scene9";
import { Scene10 } from "./scenes/Scene10";

export interface Scene {
  id: string;
  title: string;
  headline: string;
  supportLine?: string;
  component: ComponentType;
}

// Placeholder scene components - will be implemented in later phases










export const SCENES: Scene[] = [
  {
    id: "scene-1",
    title: "Opening",
    headline: "Archived leads → real conversations → real buyers",
    supportLine: "All from re-engaging leads that were 12+ months old",
    component: Scene1,
  },
  {
    id: "scene-2",
    title: "Context",
    headline: "These weren't fresh inbound leads",
    component: Scene2,
  },
  {
    id: "scene-3",
    title: "Funnel",
    headline: "When they answered… 61% showed interest",
    component: Scene3,
  },
  {
    id: "scene-4",
    title: "BANT Evidence",
    headline: "804 calls had BANT evidence inside them",
    component: Scene4,
  },
  {
    id: "scene-5",
    title: "Callbacks",
    headline: "1,144 people literally asked to be called back",
    component: Scene5,
  },
  {
    id: "scene-6",
    title: "Buyer Intent",
    headline: "Callback conversations weren't all the same",
    component: Scene6,
  },
  {
    id: "scene-7",
    title: "Retries",
    headline: "Retries weren't spam. They created extra answers",
    component: Scene7,
  },
  {
    id: "scene-8",
    title: "Attempts",
    headline: "Most answers happen early, but later attempts still pay",
    component: Scene8,
  },
  {
    id: "scene-9",
    title: "Operational",
    headline: "Your sales team wakes up to a prioritized list",
    component: Scene9,
  },
  {
    id: "scene-10",
    title: "CTA",
    headline: "Want to see if this would work for your pipeline?",
    component: Scene10,
  },
];

export const TOTAL_SCENES = SCENES.length;

