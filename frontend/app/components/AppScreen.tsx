import { forwardRef } from 'react'
import clsx from 'clsx'
import React from 'react'



export function AppScreen({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={clsx('flex flex-col bg-white', className)} {...props}> 
      {children}
    </div>
  )
}



AppScreen.Body = forwardRef<
  React.ElementRef<'div'>,
  { className?: string; children: React.ReactNode }
>(function AppScreenBody({ children, className }, ref) {
  return (
    <div
      ref={ref}
      className={clsx(' flex-auto rounded-t-2xl bg-white', className)}
    >
      {children}
    </div>
  )
})
