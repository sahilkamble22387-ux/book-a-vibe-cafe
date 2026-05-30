"use client"

import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      style={
        {
          "--normal-bg": "#FFF8F0",
          "--normal-text": "#3C2415",
          "--normal-border": "#E2CDB0",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
