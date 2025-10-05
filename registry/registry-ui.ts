import type { Registry } from "shadcn/registry";

export const ui: Registry["items"] = [
      {
      "name": "image-input",
      "type": "registry:component",
      "title": "Image Input",
      "description": "Image Input component with preview and clear functionality.",
      "dependencies": ["sonner", "react", "lucide-react"],
      "registryDependencies": ["input", "button"],
      "files": [
        {
          "path": "/default/starter-kit-ui/image-input.tsx",
          "type": "registry:component"
        }
      ]
    }
]