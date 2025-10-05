import { SidebarProvider } from "@/components/ui/sidebar"
import DocsSidebar from "../(with nav and footer)/docs/_components/DocsSidebar"



const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DocsSidebar/>
      <main className="w-full min-h-screen">{children}</main>
    </SidebarProvider>
  )
}

export default SidebarLayout
