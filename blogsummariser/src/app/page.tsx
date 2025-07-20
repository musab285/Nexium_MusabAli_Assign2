"use client"
import type React from "react"
import { toast } from "sonner"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { AppSidebar } from "@/components/app-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Page() {
  const [url, setUrl] = useState("")
  const [translate, setTranslate] = useState(false)
  const [summarise, setSummarise] = useState(false)
  const [loading, setLoading] = useState(false)
  const [ogcontent, setogContent] = useState("")
  const [scrapedData, setScrapedData] = useState("")
  // const [toastOn, setToastOn] = useState(false)

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }

  const handleSummarise = async () => {
    setSummarise(true)
    setTranslate(false)
    setLoading(true)
    // setScrapedData(null)
    setogContent("")
    try {
      const response = await fetch("/api/summarise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })
      const data = await response.json()
      if (!response.ok) {
        alert(data.error || "Something went wrong")
      } else {
        setScrapedData(data.output)
        setogContent(data.content)
        setLoading(false)
        toast.success("Content saved to Database!", {
          duration: 2000,
          position: "top-right",})
      }
    } catch (error) {
      console.error("Error summarising content:", error)
      setScrapedData("Error fetching content. Please check the URL.")
    }
  }

  const handleTranslate = async () => {
    setSummarise(false)
    setTranslate(true)
    setLoading(true)
    setScrapedData("")
    setogContent("")
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })
      const data = await response.json()
      if (!response.ok) {
        alert(data.error || "Something went wrong")
      } else {
        setScrapedData(data.output)
        setogContent(data.content)
        setLoading(false)
        toast.success("Content saved to Database!", {
          duration: 2000,
          position: "top-right",
          
        })
      }
    } catch (error) {
      console.error("Error Translating content:", error)
      setScrapedData("Error fetching content. Please check the URL.")
    }
  }

  // Initial search state
  if (!summarise && !translate) {
    // if (toastOn) {
    //   setToastOn(false)
    // }
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.08)_1px,transparent_0)] bg-[length:24px_24px]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,rgba(59,130,246,0.03)_35%,rgba(59,130,246,0.03)_65%,transparent_65%)] bg-[length:20px_20px]"></div>
          </div>

          <header className="relative flex h-14 shrink-0 items-center gap-2 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
            <div className="flex flex-1 items-center gap-2 px-3  ">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
              <Breadcrumb >
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-semibold text-shadow-sm/10">
                      Blog Summarisation and Translation
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            {/* <div className="ml-auto px-3">
            <NavActions />
          </div> */}
          </header>
          <div className="relative max-h-screen flex flex-col">
            <main className="flex-1 flex items-center justify-center p-6 min-h-[calc(100vh-20vh)]">
              <div className="w-full p-8 rounded-lg max-w-2xl space-y-8 bg-white/60 backdrop-blur-sm border border-white/20 shadow-2xl">
                <div className="text-center space-y-3">
                  <h2 className="text-4xl font-bold tracking-tight text-shadow-md/40 text-shadow-gray ">
                    Process Web Content
                  </h2>
                  <p className="text-muted-foreground text-lg">Enter a URL to summarize or translate content</p>
                </div>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="url" className="text-base">
                      URL
                    </Label>
                    <Input
                      id="url"
                      type="url"
                      placeholder="https://example.com"
                      value={url}
                      onChange={handleUrlChange}
                      className="text-base h-12 bg-white/80 backdrop-blur-sm border-white/30"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button onClick={handleSummarise} disabled={!url.trim()} size="lg" className="h-12">
                      Summarise
                    </Button>
                    <Button
                      onClick={handleTranslate}
                      disabled={!url.trim()}
                      variant="outline"
                      size="lg"
                      className="h-12 bg-white/60"
                    >
                      Translate
                    </Button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  // Summary state
  if (summarise) {
    // if (!toastOn && !loading){
    //   toast.success("Content saved to Database!")
    //   setToastOn(true)
    // }
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="relative max-h-screen">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-white to-blue-50/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(34,197,94,0.08)_1px,transparent_0)] bg-[length:24px_24px]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,rgba(34,197,94,0.03)_35%,rgba(34,197,94,0.03)_65%,transparent_65%)] bg-[length:20px_20px]"></div>
          </div>

          <header className="relative flex h-14 shrink-0 items-center gap-2 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-semibold text-shadow-sm/10">Summarisation Using AI</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            {/* <div className="ml-auto px-3">
            <NavActions />
          </div> */}
          </header>
          <div className="relative mt-2 flex flex-col">
            <main className="flex-1 flex items-center justify-center p-6 mt-0 ">
              <div className="w-full max-w-6xl space-y-8">
                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-center lg:text-left">Original Content</h2>
                    <div className="rounded-lg border bg-white/60 backdrop-blur-sm border-white/30 shadow-lg p-6 min-h-[400px] max-h-[500px] overflow-y-auto">
                      {loading && <p className="text-muted-foreground text-center">Loading...</p>}
                      {scrapedData && !loading && <p className="text-sm leading-relaxed">{ogcontent}</p>}
                      {!scrapedData && !loading && (
                        <p className="text-muted-foreground text-center">No content to display.</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-center lg:text-left">Summarised Content</h2>
                    <div className="rounded-lg border bg-white/60 backdrop-blur-sm border-white/30 shadow-lg p-6 min-h-[400px] max-h-[500px] overflow-y-auto">
                      {loading && <p className="text-muted-foreground text-center">Loading...</p>}
                      {scrapedData && !loading && <p className="text-sm leading-relaxed">{scrapedData}</p>}
                      {!scrapedData && !loading && (
                        <p className="text-muted-foreground text-center">No content to display.</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button
                    onClick={() => {
                      setTranslate(false)
                      setUrl("")
                      setSummarise(false)
                    }}
                    variant="outline"
                    className="h-10"
                    size="lg"
                  >
                    Back to Search
                  </Button>
                  <Button
                    onClick={() => {
                      setSummarise(false)
                      handleTranslate()
                    }}
                    className="h-10"
                    size="lg"
                  >
                    Translate Instead
                  </Button>
                </div>
              </div>
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  // Translation state
  if (translate) {
    // if (!toastOn && !loading){
    //   toast.success("Content saved to Database!")
    //   setToastOn(true)
    // }
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-white to-pink-50/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(147,51,234,0.08)_1px,transparent_0)] bg-[length:24px_24px]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,rgba(147,51,234,0.03)_35%,rgba(147,51,234,0.03)_65%,transparent_65%)] bg-[length:20px_20px]"></div>
          </div>

          <header className="relative flex h-14 shrink-0 items-center gap-2 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-semibold text-shadow-sm/10">
                      Translation Using Static Data
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="relative mt-2 flex flex-col">
            <main className="flex-1 flex items-center justify-center p-6 mt-0 ">
              <div className="w-full max-w-6xl space-y-8">
                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-center lg:text-left">Original Content</h2>
                    <div className="rounded-lg border bg-white/60 backdrop-blur-sm border-white/30 shadow-lg p-6 min-h-[400px] max-h-[500px] overflow-y-auto">
                      {loading && <p className="text-muted-foreground text-center">Loading...</p>}
                      {scrapedData && !loading && <p className="text-sm leading-relaxed">{ogcontent}</p>}
                      {!scrapedData && !loading && (
                        <p className="text-muted-foreground text-center">No content to display.</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-center lg:text-left">Translated Content</h2>
                    <div className="rounded-lg border bg-white/60 backdrop-blur-sm border-white/30 shadow-lg p-6 min-h-[400px] max-h-[500px] overflow-y-auto">
                      {loading && <p className="text-muted-foreground text-center">Loading...</p>}
                      {scrapedData && !loading && (
                        <p
                          className="text-sm leading-relaxed whitespace-pre-line"
                          style={{
                            direction: "rtl",
                            fontFamily: "'Noto Nastaliq Urdu', serif",
                          }}
                        >
                          {scrapedData}
                        </p>
                      )}
                      {!scrapedData && !loading && (
                        <p className="text-muted-foreground text-center">No content to display.</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button
                    onClick={() => {
                      setTranslate(false)
                      setUrl("")
                      setSummarise(false)
                    }}
                    variant="outline"
                    className="h-10"
                    size="lg"
                  >
                    Back to Search
                  </Button>
                  <Button
                    onClick={() => {
                      setTranslate(false)
                      handleSummarise()
                    }}
                    className="h-10"
                    size="lg"
                  >
                    Summarise Instead
                  </Button>
                </div>
              </div>
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }
}
