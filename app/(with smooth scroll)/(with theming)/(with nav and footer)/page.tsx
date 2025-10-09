// app/(with smooth scroll)/(with theming)/(with nav and footer)/page.tsx
/** biome-ignore-all lint/suspicious/noArrayIndexKey: explanation */
/** biome-ignore-all lint/a11y/noSvgWithoutTitle: explanation */
import Link from "next/link";
import { ComponentsGrid } from "@/components/mdx/component-grid";
import { GSAPIcon, LucideIcon, MotionIcon, NextJsIcon, ShadcnIcon, SkiperUIIcon, TailwindCSSIcon, TypescriptIcon } from "@/components/svg-icons";
import { Badge } from "@/components/ui/badge";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import SectionWrapper from "@/components/wrappers/SectionWrapper";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <SectionWrapper
      maxWidth="full"
      background="transparent"
      navbarSpacing="loose"
      padding="lg"
      className="flex flex-col items-center justify-start min-h-screen w-full "
    >
      <section className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center gap-12 lg:gap-16 pointer-events-auto">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <Badge
            variant="outline"
            className="mx-auto w-fit rounded-full bg-primary/10 border-primary/30 text-primary px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
          >
            🚀 Presenting
          </Badge>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold font-mono bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Starter Kit
          </h1>
        </div>

        <div className="grid grid-cols-1  w-full gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex  items-start justify-center gap-6 lg:gap-8 ">
            <div className="flex flex-col items-start justify-center gap-6 lg:gap-8 ">
              <p className="text-lg lg:text-xl font-medium text-muted-foreground leading-relaxed max-w-2xl">
              A comprehensive starter kit developed by{" "}
              <Badge variant="secondary" className="text-sm font-semibold">Raven412s</Badge>{" "}
              for Next.js 15+, featuring the best modern tools and libraries for building exceptional web applications.
            </p>
     {/* Tech Stack */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Powered By
                </h3>
                <div className="flex flex-wrap gap-3 lg:gap-4">
                  {[
                    { icon: NextJsIcon, name: "Next.js 15+", className: "dark:fill-white" },
                    { icon: ShadcnIcon, name: "Shadcn UI", className: "dark:fill-white" },
                    { icon: TailwindCSSIcon, name: "Tailwind CSS", className: "fill-blue-400" },
                    { icon: TypescriptIcon, name: "TypeScript", className: "fill-blue-700" },
                    { icon: MotionIcon, name: "Framer Motion", className: "dark:fill-yellow-400" },
                    { icon: SkiperUIIcon, name: "Skiper UI", className: "dark:fill-white" },
                    { icon: GSAPIcon, name: "GSAP", className: "fill-green-400" },
                    { icon: LucideIcon, name: "Lucide Icons", className: "dark:fill-white" },
                  ].map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 bg-background border rounded-lg hover:border-primary/50 transition-colors duration-200 group"
                    >
                      <tech.icon className={cn("size-5 lg:size-6 transition-transform group-hover:scale-110", tech.className)} />
                      <span className="text-sm font-medium hidden sm:block">{tech.name}</span>
                    </div>
                  ))}
                </div>
                </div>
            </div>
            <div className="flex flex-col gap-6 lg:gap-8 w-full">
         
         <div className="text-base lg:text-lg font-medium text-muted-foreground leading-relaxed max-w-xl">
              <p className="flex flex-wrap items-center gap-1.5">
                <span>Not just a UI library—you can always use</span>
                <ShadcnIcon className="size-4 lg:size-5 mx-1" />
                <span className="font-semibold text-foreground">Shadcn</span>
                <span>for that. This is an amazing collection of functional components that you can simply</span>
              </p>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <KbdGroup className="scale-90 lg:scale-100">
                  <Kbd>Ctrl</Kbd>
                  <span className="text-muted-foreground">+</span>
                  <Kbd>C</Kbd>
                </KbdGroup>
                <span className="text-muted-foreground">,</span>
                <KbdGroup className="scale-90 lg:scale-100">
                  <Kbd>Ctrl</Kbd>
                  <span className="text-muted-foreground">+</span>
                  <Kbd>V</Kbd>
                </KbdGroup>
                <span>and use immediately.</span>
              </div>
            </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 w-full sm:w-auto">
                <Link
                  href="/docs/getting-started"
                  className="px-6 lg:px-8 py-3 lg:py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                >
                  Get Started
                </Link>
                <Link
                  href="/docs/components"
                  className="px-6 lg:px-8 py-3 lg:py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-all duration-200 transform hover:scale-105 border text-center"
                >
                  Explore Components
                </Link>
                <Link
                  href="https://github.com/Raven412s/next-shadcn-starter-kit"
                  className="px-6 lg:px-8 py-3 lg:py-4 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all duration-200 transform hover:scale-105 text-center"
                >
                  Contribute
                </Link>
              </div>
            </div>
          </div>

          {/* Right Content - Components Grid */}
          <div className="flex flex-col items-start justify-start gap-6 lg:gap-8 order-1 lg:order-2">
            <div className="w-full">
              <ComponentsGrid />
            </div>

            <Separator className="w-full" />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-4 mt-8 lg:mt-12">
          <p className="text-sm text-muted-foreground uppercase tracking-wide font-semibold">
            Ready to Build Something Amazing?
          </p>
          <Link
            href="/docs/getting-started"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl font-bold hover:from-primary/90 hover:to-primary/70 transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            🚀 Start Building Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </SectionWrapper>
  );
}