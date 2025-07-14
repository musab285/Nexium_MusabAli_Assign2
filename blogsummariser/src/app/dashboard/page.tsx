"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { NavActions } from "@/components/nav-actions"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function Page() {
  const [url, setUrl] = useState("")
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  // console.log("Current URL:", url);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    Project Management & Task Tracking
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 px-4 py-10">
          {/* <div className="bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl" /> */}
          <div className="mx-auto h-[calc(100vh-35vh)] flex flex-col items-center justify-center w-full max-w-6xl rounded-xl">
            <Label className="m-4 text-2xl">Search Box</Label>
            <Input type="text" className="max-w-3xl" onChange={handleUrlChange} placeholder="Enter URL..."/>
            <div className="mt-4 flex gap-2 w-3xl">
                <Button className="flex-1 bg-gray-600 hover:bg-gray-800">
                Summarise
                </Button>
                <Button className="flex-1 bg-gray-600 hover:bg-gray-800">
                Translate
                </Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
