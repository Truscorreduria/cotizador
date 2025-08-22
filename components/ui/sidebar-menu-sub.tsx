"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export const SidebarMenuSub = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("grid gap-1.5 p-1", className)} ref={ref} {...props} />
  },
)
SidebarMenuSub.displayName = "SidebarMenuSub"

export const SidebarMenuSubItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md", className)}
        ref={ref}
        {...props}
      />
    )
  },
)
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

export const SidebarMenuSubButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isActive?: boolean
  }
>(({ className, isActive, ...props }, ref) => {
  return (
    <button
      className={cn(
        "px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md",
        isActive && "bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"
