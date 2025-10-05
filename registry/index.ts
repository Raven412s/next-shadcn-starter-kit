import type {Registry} from "shadcn/registry"
import { ui } from "./registry-ui"

export const registry = {
    name: "starter-kit-ui",
    homepage: "https://starter-kit-nu-two.vercel.app",
    items: [...ui]
} satisfies Registry