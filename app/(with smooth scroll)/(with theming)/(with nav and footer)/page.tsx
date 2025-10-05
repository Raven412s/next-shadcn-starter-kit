"use client";

import { GSAPIcon, LucideIcon, MotionIcon, NextJsIcon, ShadcnIcon, SkiperUIIcon, TailwindCSSIcon, TypescriptIcon } from "@/components/svg-icons";
import { Badge } from "@/components/ui/badge";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import SectionWrapper from "@/components/wrappers/SectionWrapper";
import CopyComponent from "@/registry/default/starter-kit-ui/copy-component";
import Link from "next/link";


const DUMMY_COMPONENT = {
  name: "SectionWrapper",
  description: "A versatile wrapper component for sections, offering customizable padding, max-width, background styles, and navbar spacing options to ensure consistent layout and design across the application.",
  props: {
    children: "React.ReactNode",
    className: "",
    padding: "md",
    maxWidth: "7xl",
    background: "default",
    navbarSpacing: "default",
  }
};

// Generate the code string from DUMMY_COMPONENT
const generateComponentCode = () => {
  return `import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type SectionWrapperProps = PropsWithChildren & {
  className?: string;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  maxWidth?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "4xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl"
    | "10xl"
    | "full";
  background?: "default" | "muted" | "gradient" | "transparent";
  navbarSpacing?: "none" | "breathe" | "default" | "compact" | "loose";
};

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  className = "",
  padding = "md",
  maxWidth = "7xl",
  background = "default",
  navbarSpacing = "default",
}) => {
  // Enhanced padding system with consistent navbar spacing
  const getPaddingClasses = () => {
    const navbarHeights = {
      none: "",
      breathe: "pt-6",
      compact: "pt-16", // 4rem - for compact navbar
      default: "pt-20", // 5rem - standard navbar height
      loose: "pt-24", // 6rem - for pages with larger navbar
    };

    const paddingMap = {
      none: \`p-0 \${navbarHeights[navbarSpacing]}\`,
      sm: \`px-4 sm:px-6 \${navbarHeights[navbarSpacing]} pb-4 sm:pb-6\`,
      md: \`px-6 sm:px-8 \${navbarHeights[navbarSpacing]} pb-8 sm:pb-10\`,
      lg: \`px-8 sm:px-12 \${navbarHeights[navbarSpacing]} pb-12 sm:pb-16\`,
      xl: \`px-10 sm:px-16 \${navbarHeights[navbarSpacing]} pb-16 sm:pb-20\`,
    };

    return paddingMap[padding];
  };

  // Max width classes
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    "8xl": "max-w-8xl",
    "9xl": "max-w-9xl",
    "10xl": "max-w-10xl",
    full: "max-w-full",
  };

  // Background variations
  const backgroundClasses = {
    default: "bg-background",
    muted: "bg-muted/30",
    gradient: "bg-gradient-to-br from-background via-background to-muted/20",
    transparent: "bg-transparent",
  };

  return (
    <main
      className={cn(
        "w-full text-foreground pointer-events-none",
        "transition-all duration-300 ease-in-out",
        backgroundClasses[background],
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto w-full",
          maxWidthClasses[maxWidth],
          getPaddingClasses(),
          // Add smooth transitions for layout changes
          "transition-all duration-300 ease-in-out",
        )}
      >
        <div className="relative">{children}</div>
      </div>
    </main>
  );
};

export default SectionWrapper;`;
};

export default function Home() {
  const componentCode = generateComponentCode();

  const handleRefresh = () => {
    // You can add logic here to regenerate or reset the code
    console.log('Refresh clicked');
  };

  return (
    <SectionWrapper
      maxWidth="full"
      background="transparent"
      navbarSpacing="compact"
      padding="none"
      className="flex flex-col items-center justify-Start min-h-screen w-full p-10"
    >
      <section className="w-full h-full flex flex-col items-center justify-center gap-8 ">
        <Badge className="mx-auto w-fit rounded-full bg-primary/20 border-primary border-2 text-foreground">Presenting</Badge>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full px-20 h-full mx-auto gap-8">
          <div className="flex flex-col items-start justify-center gap-4 h-full">
            <h1 id="title" className="text-8xl font-bold font-mono">Starter Kit</h1>
            <p id="subtitle" className="text-xl font-medium font-sans text-gray-600 max-w-2xl">This is a starter kit feveloped by <Badge className="text-base">Raven412s</Badge> for Next.Js 15+, using Shadcn
              UI, Motion, Skiper UI, Tailwind CSS, GSAP, Lenis, Typescript, and other useful libraries </p>
            <div id="techstack" className="flex flex-wrap items-center gap-2 my-4">
              <span className="text-base font-semibold flex flex-col items-center justify-center gap-4"><NextJsIcon className="size-12 dark:fill-white" /> Next.Js 15+</span>
              <span className="text-base font-semibold flex flex-col items-center justify-center gap-4"><ShadcnIcon className="size-12 dark:fill-white" /> Shadcn UI</span>
              <span className="text-base font-semibold flex flex-col items-center justify-center gap-4"><TailwindCSSIcon className="size-12 fill-blue-400" /> Tailwind CSS</span>
              <span className="text-base font-semibold flex flex-col items-center justify-center gap-4"><TypescriptIcon className="size-12 fill-blue-700" /> Typescript</span>
              <span className="text-base font-semibold flex flex-col items-center justify-center gap-4"><MotionIcon className="size-12 dark:fill-yellow-400" /> Framer Motion</span>
              <span className="text-base font-semibold flex flex-col items-center justify-center gap-4"><SkiperUIIcon className="size-12 dark:fill-white" /> Skiper UI</span>
              <span className="text-base font-semibold flex flex-col items-center justify-center gap-4"><GSAPIcon className="size-12  fill-green-400" /> GSAP</span>
              <span className="text-base font-semibold flex flex-col items-center justify-center gap-4"><LucideIcon className="size-12 dark:fill-white" /> Lucide Icons</span>
            </div>
            <div id="actions" className="flex items-center gap-4 pointer-events-auto">
              <Link href="/docs/getting-started" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition">Get Started</Link>
              <Link href="/docs/components" className="px-6 py-3 bg-secondary-foreground text-white rounded-lg hover:bg-secondary-foreground/80 transition">See Components</Link>
              <Link href={"https://github.com/Raven412s/next-shadcn-starter-kit"} className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/20 transition">Contribute</Link>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-10 gap-4 h-full">
            {/* Using the reusable CopyComponent */}
            <CopyComponent
              code={componentCode}
              fileName={DUMMY_COMPONENT.name}
              language="typescript"
              height="max-h-[200px]"
              showRefreshButton={true}
              showCopyButton={true}
              showExpandButton={true}
              defaultExpanded={false}
              onRefresh={handleRefresh}
              className="w-full pointer-events-auto"
            />
            <Separator className="w-full" />
            <div className="text-xl font-medium text-green-900/70 flex flex-wrap items-center gap-1.5 max-w-xl w-full mx-auto">
              <span className="max-w-max">Not just a UI Library you can always use</span>{" "}

              <ShadcnIcon className="size-4" />
              Shadcn

              <span className="max-w-max">for it. It is actually an amazing set of helpful functional components that you can just{" "}
                <KbdGroup className="">
                  <Kbd>Ctrl</Kbd>
                  <span>+</span>
                  <Kbd>C</Kbd>
                </KbdGroup>
                {", "}
                <KbdGroup>
                  <Kbd>Ctrl</Kbd>
                  <span>+</span>
                  <Kbd>V</Kbd>
                </KbdGroup>{" "}
                and use.</span>
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
