import DefaultMDXComponents from "fumadocs-ui/mdx"
import {Tabs,Tab} from "fumadocs-ui/components/tabs"
import {Steps,Step} from "fumadocs-ui/components/steps"
import type { MDXComponents } from "mdx/types"
import { ComponentSource } from "./component-source"
import { ComponentsGrid } from "./component-grid"
import { ImageInput } from "@/registry/default/starter-kit-ui/image-input"

import  MapsEmbedder  from "@/registry/default/starter-kit-ui/maps-embedder"
import ComponentPreview from "./component-preview"
import MultiSelect from "@/registry/default/starter-kit-ui/multi-select"


export function getMDXComponents(components?: MDXComponents): MDXComponents {
    return { 
        ...DefaultMDXComponents,
        ComponentSource,
        ComponentPreview,
        ImageInput,
        MapsEmbedder,
        MultiSelect,
        ComponentsGrid,
        Tabs,
        Tab,
        Steps,
        Step, 
        ...components 
    }
}