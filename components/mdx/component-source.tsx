// @ts-nocheck
/** biome-ignore-all lint/suspicious/noArrayIndexKey: explanation */


import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock"
import type React from "react"
import { Index } from "@/__registry__"

interface ComponentSourceProps {
  name: string
  fileIndex?: number // Specific file show karne ke liye
  showAllFiles?: boolean // Saari files show karne ke liye
}

export const ComponentSource: React.FC<ComponentSourceProps> = ({ 
  name, 
  fileIndex = 0,
  showAllFiles = false 
}) => {
  const component = Index[name]
  
  if (!component || !component.files || component.files.length === 0) {
    return null
  }

  if (showAllFiles) {
    // Saari files show karein
    return (
      <div className="space-y-6" >
        {component.files.map((file, index) => (
          <div key={index}>
            <div className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              {file.path.split('/').pop()}
            </div>
            <DynamicCodeBlock 
              lang={getLanguageFromPath(file.path)}
              code={file.content}
            />
          </div>
        ))}
      </div>
    )
  }

  // Specific file show karein
  const file = component.files[fileIndex]
  if (!file) return null

  return (
    <DynamicCodeBlock 
      lang={getLanguageFromPath(file.path)}
      code={file.content}
      data-lenis-prevent
    />
  )
}

// File path se language detect karein
function getLanguageFromPath(filePath: string): string {
  if (filePath.endsWith('.tsx')) return 'tsx'
  if (filePath.endsWith('.ts')) return 'ts'
  if (filePath.endsWith('.jsx')) return 'jsx'
  if (filePath.endsWith('.js')) return 'js'
  if (filePath.endsWith('.css')) return 'css'
  if (filePath.endsWith('.json')) return 'json'
  return 'tsx'
}