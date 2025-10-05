"use client";
import { useState, useEffect } from "react";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText } from "@/components/ui/input-group";
import { IconBrandTypescript, IconCopy, IconRefresh, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';

interface CopyComponentProps {
  code: string;
  fileName?: string;
  language?: "typescript" | "javascript" | "html" | "css" | "json";
  height?: string;
  showCopyButton?: boolean;
  showRefreshButton?: boolean;
  showExpandButton?: boolean;
  defaultExpanded?: boolean;
  onRefresh?: () => void;
  className?: string;
}

const CopyComponent: React.FC<CopyComponentProps> = ({
  code,
  fileName = "component.tsx",
  language = "typescript",
  height = "max-h-[200px]",
  showCopyButton = true,
  showRefreshButton = true,
  showExpandButton = true,
  defaultExpanded = false,
  onRefresh,
  className = ""
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [highlightedCode, setHighlightedCode] = useState("");

  useEffect(() => {
    // Highlight code when component mounts or code changes
    const highlighted = Prism.highlight(
      code,
      Prism.languages[language === "typescript" ? "tsx" : language],
      language === "typescript" ? "tsx" : language
    );
    setHighlightedCode(highlighted);
  }, [code, language]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const getLanguageIcon = () => {
    switch (language) {
      case "typescript":
      case "javascript":
        return <IconBrandTypescript className="w-4 h-4" />;
      default:
        return <IconBrandTypescript className="w-4 h-4" />;
    }
  };

  const getFileExtension = () => {
    switch (language) {
      case "typescript": return ".tsx";
      case "javascript": return ".jsx";
      case "html": return ".html";
      case "css": return ".css";
      case "json": return ".json";
      default: return ".tsx";
    }
  };

  const getExpandedHeight = () => {
    return isExpanded ? "max-h-[500px]" : "max-h-[200px]";
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="grid w-full max-w-full gap-4">
        <InputGroup className="rounded-2xl border ">
          <div 
            className={`
              ${getExpandedHeight()} 
              ${height} 
              overflow-auto 
              font-mono text-sm 
              transition-all duration-300 ease-in-out
              no-scrollbar
              px-4 py-3.5
              outline-none
              bg-white
              dark:bg-gray-900
              overscroll-contain   
            `}
            style={{
              backgroundColor: 'transparent',
              scrollbarWidth: 'none',
            }}
            data-lenis-prevent
          >
            <pre className="min-w-0 overflow-x-auto language-tsx">
              <code 
                className="language-tsx"
                dangerouslySetInnerHTML={{ __html: highlightedCode }} 
              />
            </pre>
          </div>
          
          <InputGroupAddon align="block-start" className="border-b ">
            <InputGroupText className="font-mono font-medium ">
              {getLanguageIcon()}
              {fileName.endsWith(getFileExtension()) ? fileName : `${fileName}${getFileExtension()}`}
            </InputGroupText>
            
            <div className="flex items-center gap-1 ml-auto">
              {showExpandButton && (
                <InputGroupButton 
                  variant="ghost"
                  size="icon-xs"
                  onClick={toggleExpanded}
                  title={isExpanded ? "Collapse code" : "Expand code"}
                  className=""
                >
                  {isExpanded ? (
                    <IconChevronUp className="w-4 h-4" />
                  ) : (
                    <IconChevronDown className="w-4 h-4" />
                  )}
                </InputGroupButton>
              )}
              
              {showRefreshButton && (
                <InputGroupButton 
                  variant="ghost"
                  size="icon-xs"
                  onClick={handleRefresh}
                  title="Refresh code"
                  className=""
                >
                  <IconRefresh className="w-4 h-4" />
                </InputGroupButton>
              )}
              
              {showCopyButton && (
                <InputGroupButton 
                  variant="ghost" 
                  size="icon-xs"
                  onClick={handleCopyCode}
                  title="Copy to clipboard"
                  className=""
                >
                  {isCopied ? (
                    <span className="text-green-600 text-xs font-medium">Copied!</span>
                  ) : (
                    <IconCopy className="w-4 h-4" />
                  )}
                </InputGroupButton>
              )}
            </div>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Add Prism CSS */}
      <style jsx global>{`
        code[class*="language-"],
        pre[class*="language-"] {
          color: #24292e;
          background: none;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.875rem;
          text-align: left;
          white-space: pre;
          word-spacing: normal;
          word-break: normal;
          word-wrap: normal;
          line-height: 1.5;
          tab-size: 4;
          hyphens: none;
        }

        /* Token colors matching your example */
        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
          color: #6a737d;
        }

        .token.punctuation {
          color: #24292e;
        }

        .token.property,
        .token.tag,
        .token.boolean,
        .token.number,
        .token.constant,
        .token.symbol,
        .token.deleted {
          color: #005cc5;
        }

        .token.selector,
        .token.attr-name,
        .token.string,
        .token.char,
        .token.builtin,
        .token.inserted {
          color: #032f62;
        }

        .token.operator,
        .token.entity,
        .token.url,
        .language-css .token.string,
        .style .token.string {
          color: #d73a49;
        }

        .token.atrule,
        .token.attr-value,
        .token.keyword {
          color: #d73a49;
        }

        .token.function,
        .token.class-name {
          color: #6f42c1;
        }

        .token.regex,
        .token.important,
        .token.variable {
          color: #e36209;
        }
      `}</style>
    </div>
  );
};

export default CopyComponent;