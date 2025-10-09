// registry/index.ts

import type {Registry} from "shadcn/registry"
import { api } from "./registry-api";
import { ui } from "./registry-ui";

export const registry: Registry = {
  name: "starter-kit",
  homepage: "https://starter-kit-nu-two.vercel.app",
  items: [...ui, ...api],
} satisfies Registry;