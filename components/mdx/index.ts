import DefaultMDXComponents from "fumadocs-ui/mdx"
import {Tabs,Tab} from "fumadocs-ui/components/tabs"
import {Steps,Step} from "fumadocs-ui/components/steps"
import type { MDXComponents } from "mdx/types"
import { ComponentSource } from "./component-source"
import { ComponentsGrid } from "./component-grid"
import { ImageInput } from "@/registry/default/starter-kit-ui/image-input"
import  ImageUploadMultiple  from "@/registry/default/starter-kit-ui/image-upload-multiple"
import  ImageUploadSingle  from "@/registry/default/starter-kit-ui/image-upload-single"
import  MapsEmbedder  from "@/registry/default/starter-kit-ui/maps-embedder"


export function getMDXComponents(components?: MDXComponents): MDXComponents {
    return { 
        ...DefaultMDXComponents,
        ComponentSource,
        ImageInput,
        MapsEmbedder,
        ImageUploadSingle,
        ImageUploadMultiple,
        ComponentsGrid,
        Tabs,
        Tab,
        Steps,
        Step, 
        ...components 
    }
}