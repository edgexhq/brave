"use client"
import React, { useState } from 'react'
import SearchSection from '@/components/content/SearchSection'
import TemplateListSection from '@/components/content/TemplateListSection'

function Dashboard() {
  const [userSearchInput,setUserSearchInput]=useState<string>()
  return (
    <div>
        {/* Search Section  */}
        <SearchSection onSearchInput={(value:string)=>setUserSearchInput(value)} />

        {/* Template List Section  */}
        <TemplateListSection userSearchInput={userSearchInput} />
    </div>
  )
}

export default Dashboard