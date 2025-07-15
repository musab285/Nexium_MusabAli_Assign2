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
import { set } from "react-hook-form"
// import { scrapeContent } from "@/lib/scrape"


export default function Page() {
  const [url, setUrl] = useState("")
  const [ translate, setTranslate ] = useState(false);
  const [ summarise, setSummarise ] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ogcontent, setogContent] = useState("");
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
 const [scrapedData, setScrapedData] = useState<{ content: string } | null>(null);


  const handleSummarise = async () => {
    // console.log("Summarising URL:", url);
    setSummarise(true);
    setTranslate(false);
    setLoading(true);
    setScrapedData(null);
    setogContent("");
    try{
      const response = await fetch("/api/summarise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      // console.log("Scraped Data:", data.output);

      if (!response.ok) {
        alert(data.error || "Something went wrong");
      } else {
        setScrapedData({ content : data.output });
        setogContent(data.content);
        setLoading(false);
      }
    }
    catch (error) {
      console.error("Error summarising content:", error);
      setScrapedData({ content: "Error fetching content. Please check the URL." });
    }
  };

  const handleTranslate = async () => {
    setSummarise(false);
    setTranslate(true);
    setLoading(true);
    setScrapedData(null);
    setogContent("");
    try{
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      console.log("Scraped Data:", data.translatedText);

      if (!response.ok) {
        alert(data.error || "Something went wrong");
      } else {
        setScrapedData({ content : data.translatedText });
        setogContent(data.content);
        setLoading(false);
      }
    }
    
    catch (error) {
      console.error("Error Translating content:", error);
      setScrapedData({ content: "Error fetching content. Please check the URL." });
    }
    // console.log("Translating URL:", url);
    
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
                    Generate Summary or Translation
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* <div className="ml-auto px-3">
            <NavActions />
          </div> */}
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
  else if (summarise) {
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
                    Summary
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* <div className="ml-auto px-3">
            <NavActions />
          </div> */}
        </header>
      <div className="flex flex-col items-center justify-center">
        <div className="mx-auto flex flex-col items-center justify-center w-full max-w-6xl rounded-xl">
          <div className="flex flex-col">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-4">Original Content</h1>
              {scrapedData && (<p className="text-sm">{ogcontent}</p>)}
              {loading && <p className="text-sm">Loading...</p>}
              {!scrapedData && !loading && <p className="text-lg">No content to display.</p>}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-4">Summarised Content</h1>
              {scrapedData && (<p className="text-sm">{scrapedData.content}</p>)}
              {loading && <p className="text-lg">Loading...</p>}
              {!scrapedData && !loading && <p className="text-lg">No content to display.</p>}
            </div>
          </div>
        <div className="flex flex-row gap-2 w-full">
          <Button onClick={() => {setSummarise(false), setUrl("")}} className="flex-1 mt-4 w-full bg-gray-600 hover:bg-gray-800">
            Back to Search
          </Button>
          <Button onClick={() => {setSummarise(false) , handleTranslate}} className="flex-1 mt-4 w-full bg-gray-600 hover:bg-gray-800">
            Translate
          </Button>
        </div>
        </div>
      </div>
      </SidebarInset>
    </SidebarProvider>
    )}
    else if (translate) {
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
                      Summary
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            {/* <div className="ml-auto px-3">
              <NavActions />
            </div> */}
          </header>
        <div className="flex flex-col items-center justify-center">
          <div className="mx-auto flex flex-col items-center justify-center w-full max-w-6xl rounded-xl">
            <div className="flex flex-col">
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-4">Original Content</h1>
                {scrapedData && (<p className="text-sm">{ogcontent}</p>)}
                {loading && <p className="text-sm">Loading...</p>}
                {!scrapedData && !loading && <p className="text-lg">No content to display.</p>}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-4">Translated Content</h1>
                {scrapedData && (<p className="text-sm">{scrapedData.content}</p>)}
                {loading && <p className="text-lg">Loading...</p>}
                {!scrapedData && !loading && <p className="text-lg">No content to display.</p>}
              </div>
            </div>
          <div className="flex flex-row gap-2 w-full">
            <Button onClick={() => {setTranslate(false), setUrl("")}} className="flex-1 mt-4 w-full bg-gray-600 hover:bg-gray-800">
              Back to Search
            </Button>
            <Button onClick={() => {setTranslate(false) , handleSummarise}} className="flex-1 mt-4 w-full bg-gray-600 hover:bg-gray-800">
              Summarise
            </Button>
          </div>
          </div>
        </div>
        </SidebarInset>
      </SidebarProvider>
      )}
}
