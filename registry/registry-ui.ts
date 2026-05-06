// registry/registry-ui.ts

import type { Registry } from "shadcn/registry";

export const ui: Registry["items"] = [
  {
    name: "image-upload",
    type: "registry:component",
    title: "Image Upload",
    description:
      "Unified image upload component supporting single-file (with preview) and multi-file (with drag-drop queue) modes.",
    dependencies: ["sonner", "react", "lucide-react", "cloudinary"],
    registryDependencies: ["input", "button"],
    files: [
      {
        path: "/default/starter-kit-ui/image-upload.tsx",
        type: "registry:component",
      },
      {
        path: ".././app/api/upload/route.ts",
        type: "registry:component",
      },
      {
        path: ".././app/api/images/route.ts",
        type: "registry:component",
      },
    ],
  },
  {
    name: "maps-embedder",
    type: "registry:component",
    title: "Map Embedder",
    description: "Embed Google Maps using an iframe on React.",
    dependencies: ["react"],
    registryDependencies: ["card"],
    files: [
      {
        path: "/default/starter-kit-ui/maps-embedder.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "multi-select",
    type: "registry:component",
    title: "Multi Select",
    description: "A customizable multi-select dropdown component.",
    dependencies: ["react", "lucide-react", "@/lib/utils"],
    registryDependencies: ["button", "input", "dropdown-menu", "badge"],
    files: [
      {
        path: "/default/starter-kit-ui/multi-select.tsx",
        type: "registry:component",
      },
    ],
  },
];
