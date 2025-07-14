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

import axios from 'axios';
import * as cheerio from 'cheerio';

async function scrapeContent(url: string) : Promise<string | null> {
  try{
    const response = await fetch(`/api/scraper?url=${encodeURIComponent(url)}`);
    const content = await response.text();
    console.log("Scraped content:", content);
    return content;
  } catch (error) {
    console.error("Error scraping content:", error);
    return null;
  }
}

export default function Page() {
  const [url, setUrl] = useState("")
  const [ translate, setTranslate ] = useState(false);
  const [ summarise, setSummarise ] = useState(false);
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSummarise = () => {
    console.log("Summarising URL:", url);
    setSummarise(true);
    // scrapeContent(url).then((result) => {
    //   if (result.content) {
    //     return (
    //     <div>
    //       {result.content}</div>);
    //     // Add summarisation logic here
    //   }
    //   else {
    //     console.error("Failed to scrape content from the URL.");
    //   }
    // });
    return (<div>{scrapeContent(url)}</div>);
  };

  const handleTranslate = () => {
    setTranslate(true);
    console.log("Translating URL:", url);
    // Add translation logic here
  };

  if (!summarise && !translate) {
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
                <Button onClick={handleSummarise} className="flex-1 bg-gray-600 hover:bg-gray-800">
                Summarise
                </Button>
                <Button onClick={handleTranslate} className="flex-1 bg-gray-600 hover:bg-gray-800">
                Translate
                </Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
  }
  // else if (summarise) {
  //   return (
  //     <div className="flex flex-col items-center justify-center h-screen">
  //       <h1 className="text-2xl font-bold mb-4">Summarised Content</h1>
  //       <p>Here will be the summarised content for the URL: {url}</p>
  //       <Button onClick={() => {setSummarise(false), setUrl("")}} className="mt-4 bg-gray-600 hover:bg-gray-800">
  //         Back to Search
  //       </Button>
  //     </div>
  //   )
  // }
  // else if (translate) {
  //   return (
  //     <div className="flex flex-col items-center justify-center h-screen">
  //       <h1 className="text-2xl font-bold mb-4">Translated Content</h1>
  //       <p>Here will be the translated content for the URL: {url}</p>
  //       <p></p>
  //       <Button onClick={() => {setTranslate(false), setUrl("")}} className="mt-4 bg-gray-600 hover:bg-gray-800">
  //         Back to Search
  //       </Button>
  //     </div>
  //   )
  // }
}
