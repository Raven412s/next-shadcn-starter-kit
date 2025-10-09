// registry/registry-api.ts
import type { Registry } from "shadcn/registry";

export const api: Registry["items"] = [
  {
    "name": "upload-api",
    "type": "registry:lib",
    "title": "Upload API",
    "description": "Cloudinary upload API routes",
    "dependencies": ["cloudinary"],
    "files": [
      {
        "path": ".././app/api/upload/route.ts",
        "type": "registry:lib"
      },
    ]
  },
  {
    "name": "images-api",
    "type": "registry:lib",
    "title": "Images API",
    "description": "Cloudinary images API routes",
    "dependencies": ["cloudinary"],
    "files": [
      {
        "path": ".././app/api/images/route.ts",
        "type": "registry:lib"
      },
    ]
  },
]