import {
  SidebarProvider
} from "@/components/ui/sidebar"
import SectionWrapper from "@/components/wrappers/SectionWrapper"
import DocsSidebar from "./_components/DocsSidebar"


const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DocsSidebar />
      <SectionWrapper
        background="transparent"
        maxWidth="4xl"
        padding="md"
        navbarSpacing="loose"
        className="min-h-screen"
      >
        <main className="pointer-events-auto" >{children}</main>
      </SectionWrapper>
    </SidebarProvider>
  )
}

export default SidebarLayout
