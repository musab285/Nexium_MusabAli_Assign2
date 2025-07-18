"use client"

import type React from "react"
import {toast} from "sonner"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"


export default function Page() {
  const [url, setUrl] = useState("")
  const [translate, setTranslate] = useState(false)
  const [summarise, setSummarise] = useState(false)
  const [loading, setLoading] = useState(false)
  const [ogcontent, setogContent] = useState("")
  const [scrapedData, setScrapedData] = useState("")
  const [toastOn, setToastOn] = useState(false)

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
      }
    } catch (error) {
      console.error("Error summarising content:", error)
      setScrapedData("Error fetching content. Please check the URL.",)
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
      }
    } catch (error) {
      console.error("Error Translating content:", error)
      setScrapedData("Error fetching content. Please check the URL.")
    }
  }

  // Initial search state
  if (!summarise && !translate) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <h1 className="text-lg font-semibold">Content Processor</h1>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-6 min-h-[calc(100vh-3.5rem)]">
          <div className="w-full max-w-2xl space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-bold tracking-tight">Process Web Content</h2>
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
                  className="text-base h-12"
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
                  className="h-12 bg-transparent"
                >
                  Translate
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Summary state
  if (summarise) {
    if (!toastOn && !loading){
      toast.success("Content saved to Database!")
      setToastOn(true)
    }
    return (
      <div className="min-h-screen flex flex-col">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <h1 className="text-lg font-semibold">Summary</h1>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-6 min-h-[calc(100vh-3.5rem)]">
          <div className="w-full max-w-6xl space-y-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-center lg:text-left">Original Content</h2>
                <div className="rounded-lg border bg-muted/50 p-6 min-h-[400px] max-h-[500px] overflow-y-auto">
                  {loading && <p className="text-muted-foreground text-center">Loading...</p>}
                  {scrapedData && !loading && <p className="text-sm leading-relaxed">{ogcontent}</p>}
                  {!scrapedData && !loading && (
                    <p className="text-muted-foreground text-center">No content to display.</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-center lg:text-left">Summarised Content</h2>
                <div className="rounded-lg border bg-muted/50 p-6 min-h-[400px] max-h-[500px] overflow-y-auto">
                  {loading && <p className="text-muted-foreground text-center">Loading...</p>}
                  {scrapedData && !loading && <p className="text-sm leading-relaxed">{scrapedData}</p>}
                  {!scrapedData && !loading && (
                    <p className="text-muted-foreground text-center">No content to display.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => {
                  setSummarise(false)
                  setUrl("")
                }}
                variant="outline"
                size="lg"
              >
                Back to Search
              </Button>
              <Button
                onClick={() => {
                  setSummarise(false)
                  handleTranslate()
                }}
                size="lg"
              >
                Translate Instead
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Translation state
  if (translate && !loading) {
    if (!toastOn){
      toast.success("Content saved to Database!")
      setToastOn(true)
    }
    return (
      
      <div className="min-h-screen flex flex-col">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <h1 className="text-lg font-semibold">Translation</h1>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-6 min-h-[calc(100vh-3.5rem)]">
          <div className="w-full max-w-6xl space-y-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-center lg:text-left">Original Content</h2>
                <div className="rounded-lg border bg-muted/50 p-6 min-h-[400px] max-h-[500px] overflow-y-auto">
                  {loading && <p className="text-muted-foreground text-center">Loading...</p>}
                  {scrapedData && !loading && <p className="text-sm leading-relaxed">{ogcontent}</p>}
                  {!scrapedData && !loading && (
                    <p className="text-muted-foreground text-center">No content to display.</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-center lg:text-left">Translated Content</h2>
                <div className="rounded-lg border bg-muted/50 p-6 min-h-[400px] max-h-[500px] overflow-y-auto">
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

            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => {
                  setTranslate(false)
                  setUrl("")
                }}
                variant="outline"
                size="lg"
              >
                Back to Search
              </Button>
              <Button
                onClick={() => {
                  setTranslate(false)
                  handleSummarise()
                }}
                size="lg"
              >
                Summarise Instead
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }
}
