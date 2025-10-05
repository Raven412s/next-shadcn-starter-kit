/** biome-ignore-all lint/a11y/noSvgWithoutTitle: explanation */

import { 
  IconCursorOff, 
  IconForms, 
  IconLayout, 
  IconMap, 
  IconMoon,
  IconPlayerPlay, 
  IconUpload, 
  
} from "@tabler/icons-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { sections } from "@/data/sections"

const ComponentsPage = () => {
  // Get only the components section
  const componentsSection = sections.find(section => section.label === "Components")
  
  // Icon mapping for components
  const iconMap = {
    "Image Uploader": <IconUpload className="w-6 h-6" />,
    "Maps Embedder": <IconMap className="w-6 h-6" />,
    "Youtube Card": <IconPlayerPlay className="w-6 h-6" />,
    "Form Builder": <IconForms className="w-6 h-6" />,
    "Section Wrapper": <IconLayout className="w-6 h-6" />,
    "Theme Toggler": <IconMoon className="w-6 h-6" />,
    "Fluid Cursor": <IconCursorOff className="w-6 h-6" />
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4 text-sm font-semibold">
          Component Library
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Beautiful, Accessible Components
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Explore the various reusable components available in this project. Each component 
          is designed to be flexible, accessible, and easy to integrate into your applications.
        </p>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {componentsSection?.items.map((item) => (
          <Link href={item.url} key={item.title} className="group">
            <Card className="h-full group-hover:shadow-lg group-hover:border-primary/20 transition-all duration-300 transform group-hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    {iconMap[item.title as keyof typeof iconMap]}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {getComponentDescription(item.title)}
                </CardDescription>
                <div className="mt-4 flex items-center text-sm text-primary font-medium group-hover:underline">
                  View documentation
                  <svg 
                    className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-primary">7+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Components</div>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-primary">100%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Accessible</div>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-primary">TypeScript</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Fully Typed</div>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-primary">Dark Mode</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Supported</div>
        </div>
      </div>
    </div>
  )
}

// Helper function to get component descriptions
function getComponentDescription(componentName: string): string {
  const descriptions: { [key: string]: string } = {
    "Image Uploader": "Drag & drop image uploader with preview, cropping, and multiple file support.",
    "Maps Embedder": "Embed Google Maps with custom markers, directions, and interactive features.",
    "Youtube Card": "Beautiful YouTube video cards with thumbnails, metadata, and responsive design.",
    "Form Builder": "Dynamic form builder with validation, multi-step forms, and custom fields.",
    "Section Wrapper": "Flexible layout wrapper with consistent spacing and responsive breakpoints.",
    "Theme Toggler": "Smooth theme switcher with system preference detection and persistence.",
    "Fluid Cursor": "Custom cursor with smooth animations and interactive hover effects."
  }
  
  return descriptions[componentName] || "A reusable component with modern design and accessibility features."
}

export default ComponentsPage