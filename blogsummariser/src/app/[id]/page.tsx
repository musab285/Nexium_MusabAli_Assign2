"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
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
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"

async function fetchData(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  try {
    const response = await fetch(`${baseUrl}/api/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
      console.error("Error fetching scraped data:", error);
      return null;
    }
}


interface SummaryData {
    id: number, 
    title : string, 
    content: string, 
    original: string
}

export default function SummaryPage() {
    const [data, setData] = useState<SummaryData | null>(null);
    const [loading, setLoading] = useState(true);
    const id = useParams()?.id as string;
    
    console.log('ID from search params:', id);
    useEffect(() => {
      if (id) {
        fetchData(id).then(fetchedData => setData(fetchedData.data));
      }
    }, [id])
    useEffect(() => {
        if (data) {
            setLoading(false);
        }
    }, [data]);

    const router = useRouter();
    return (
      <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="max-h-screen">
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb className="">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-shadow-sm/10">
                    Summarisation Using AI 
                  </BreadcrumbPage> 
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* <div className="ml-auto px-3">
            <NavActions />
          </div> */}
        </header>
      <div className="mt-2 flex flex-col">
        <main className="flex-1 flex items-center justify-center p-6 mt-0 ">
          <div className="w-full max-w-6xl space-y-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-center lg:text-left">Original Content</h2>
                <div className="rounded-lg border bg-muted/50 p-6 min-h-[500px] max-h-[500px] overflow-y-auto">
                  {loading && <p className="text-muted-foreground text-center">Loading...</p>}
                  {data && !loading && <p className="text-sm leading-relaxed">{data.original}</p>}
                  {!data && !loading && (
                    <p className="text-muted-foreground text-center">No content to display.</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-center lg:text-left">Summarised Content</h2>
                <div className="rounded-lg border bg-muted/50 p-6 min-h-[500px] max-h-[500px] overflow-y-auto">
                  {loading && <p className="text-muted-foreground text-center">Loading...</p>}
                  {data && !loading && <p className="text-sm leading-relaxed">{data.content}</p>}
                  {!data && !loading && (
                    <p className="text-muted-foreground text-center">No content to display.</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end ">
            <Button 
              onClick={() => {router.push('/')}
              }
              className="h-10"
              size="lg"
              >
                Back to Search
            </Button>
            </div>
          </div>
        </main>
      </div>
      </SidebarInset>
    </SidebarProvider>
    )
  }