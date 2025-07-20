"use client";

import * as React from "react";

import { NavHistory } from "@/components/nav-favorites";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
async function fetchData() {
  try {
    const response = await fetch(`${baseUrl}/api/history`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log('History fetched:', data);
    return data;
  } catch (error) {
    console.error("Error fetching history:", error);
    return {};
  }
}

type HistoryItem = {
  id: number ;
  title: string;
  content: string;
  original: string;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [history, setHistory] = React.useState<HistoryItem[]>();
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetchData().then(fetchedData => setHistory(fetchedData.data));
  }, []);
  React.useEffect(() => {
    if (history) {
      setLoading(false);
    }
  }, [history]);
  console.log('data', history ? history : 'No data fetched');

  if(!loading) {
  return (
    <Sidebar className="border-r-2 shadow-md/20" variant="sidebar" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-3 font-semibold text-shadow-sm/10 text-xl">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          Content Processor
        </div>
       </SidebarHeader>
      <SidebarContent>
        <NavHistory history={history || []} />
      </SidebarContent>
      <SidebarRail />
      </Sidebar>
    );
  }
  else{
    return (
      <Sidebar className="border-r-0" variant="sidebar" {...props}>
        <SidebarHeader>
          <div className="flex items-center gap-3 font-semibold text-shadow-sm/10 text-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            Content Processor
          </div>
        </SidebarHeader>
        <SidebarContent>
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Loading history...</p>
          </div>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    );
  }

}
