"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export function NavHistory({
  history,
}: {
  history: {
    id: number, 
    title : string, 
    content: string, 
    original: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const router = useRouter()
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Previosly Summarised Content</SidebarGroupLabel>
      <SidebarMenu>
        {history.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild>
              <Button variant="ghost" className="justify-start w-full hover:bg-gray-200 font-normal" onClick={()=>{router.push(`/${item.id}`)}}> 
                <span>{item.title}</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
