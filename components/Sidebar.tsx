'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { ChevronDown, ChevronRight } from 'lucide-react'

type Role = 'student' | 'teacher' | 'admin'

const Sidebar = () => {
  const pathname = usePathname()
  const { user } = useUser()

  // Grab role from Clerk publicMetadata
  const role = (user?.publicMetadata?.role as Role) || 'student'

  //State to track open Submenus
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})
  
  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev, [label]: !prev[label],
    }))
  }

  return (
    <aside className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-[#131143] 
    p-6 pt-28 text-white max-sm:hidden lg:w-[270px]'>
      <div className='flex flex-1 flex-col gap-4'>
        {sidebarLinks.map((section) => {
          const isActiveSection =
            pathname === section.href || pathname.startsWith(`${section.href}/` || '')

          const Icon = section.icon

          // Top-level route without children
          if (!section.children) {
            return (
              <Link
                href={section.href}
                key={section.label}
                className={`${isActiveSection ? "bg-blue-500": ""} flex items-center gap-4 p-3 rounded-lg hover:bg-blue-600 transition`}
              >
                <Icon className="h-5 w-5" />
                <span>{section.label}</span>
              </Link>
            )
          }

          // Collapsible parent section
          const isOpen = openMenus[section.label] ?? pathname.startsWith(section.href || '')

          return (
            <div key={section.label} className='flex flex-col'>
              <button
                onClick={() => toggleMenu(section.label)}
                className={cn(
                  'flex items-center justify-between gap-2 p-3 rounded-lg hover:bg-blue-600 transition',
                  { 'bg-blue-500': isActiveSection }
                )}
              >
                <div className='flex items-center gap-2'>
                  <Icon className="h-5 w-5" />
                  <span>{section.label}</span>
                </div>
                {isOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {isOpen && (
                <div className='ml-6 mt-1 flex flex-col gap-1 transition-all'>
                  {section.children.filter((child) => !child.role || child.role === role)
                  .map((child) => {
                    const isActive = pathname === child.href || pathname.startsWith(child.href)

                    return (
                      <Link href={child.href} key={child.label}
                       className={cn('text-sm p-2 pl-3 rounded bg-blue-900 hover:bg-blue-600 transition',
                        {'bg-blue-500': isActive}
                       )}
                      >
                        {child.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </aside>
  )
}

export default Sidebar
