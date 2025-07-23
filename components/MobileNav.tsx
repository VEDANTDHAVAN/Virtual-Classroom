"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ChevronRight } from 'lucide-react'
import { usePathname } from "next/navigation"
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

type Role = 'student' | 'teacher' | 'admin'

const MobileNav = () => {
  const pathname = usePathname();
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
    <section className='w-full max-w-[264px]'>
    <Sheet>
    <SheetTrigger asChild>
      <Image src="/icons/hamburger.svg" width={36} height={36} alt="hamburger" className="cursor-pointer sm:hidden" />
    </SheetTrigger>
    <SheetContent side="left" className="border-none bg-[#131143]">
     <Link href="/" className='flex items-center gap-1'>
      <Image src="/icons/logo.png" width={40} height={40} alt='SmartSpace' className='rounded-lg max-sm:size-10' />
      <p className='text-[26px] font-extrabold text-white pl-1 max-sm:hidden'>SmartSpace</p>
     </Link>
     <div className="flex h-[calc(100vh - 72px)] flex-col justify-between overflow-y-auto">
      <SheetClose asChild>
       <section className="flex h-full flex-col pt-16 gap-6 text-white">
        {sidebarLinks.map((section) => {
          const isActiveSection =
            pathname === section.href

          const Icon = section.icon

          // Top-level route without children
          if (!section.children) {
            return (
              <SheetClose asChild key={section.label}>
                <Link
                href={section.href}
                key={section.label}
                className={`${isActiveSection ? "bg-blue-500" : ""} flex items-center gap-4 p-3 m-3 rounded-lg hover:bg-blue-600 transition`}
              >
                <Icon className="h-5 w-5" />
                <span>{section.label}</span>
              </Link>
              </SheetClose>
            )
          }

          // Collapsible parent section
          const isOpen = openMenus[section.label] ?? pathname.startsWith(section.href!)
          const staysOpen = pathname.startsWith(section.href!)

          return (
            <div key={section.label} className='flex flex-col overflow-y-hidden pr-3 pl-3 cursor-pointer'>
              <button
                onClick={() => toggleMenu(section.label)}
                className={cn(
                  'flex items-center justify-between gap-2 p-3 rounded-lg hover:bg-blue-600 transition overflow-y-hidden',
                  { "bg-blue-500" : isOpen || staysOpen }
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
                <div className='ml-6 mt-0.5 flex flex-col gap-1 transition-all pr-5 cursor-pointer'>
                  {section.children.filter((child) => !child.role || child.role === role)
                  .map((child) => {
                    const isActive = pathname === child.href || pathname.startsWith(child.href)

                    return (
                      <SheetClose asChild key={child.href}>
                       <Link href={child.href} key={child.label}
                        className={cn('text-sm p-2 pl-3 rounded bg-blue-900 hover:bg-blue-600 transition overflow-y-auto',
                        {'bg-blue-500': isActive}
                        )}
                       >
                       {child.label}
                       </Link>
                      </SheetClose>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
       </section>
      </SheetClose>
     </div> 
    </SheetContent>
    </Sheet>
    </section>
  )
}

export default MobileNav