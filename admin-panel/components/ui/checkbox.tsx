import * as React from "react"
import { cn } from "@/utils/cn"

const Checkbox = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
    return (
        <input
            type="checkbox"
            ref={ref}
            className={cn(
                "peer h-4 w-4 shrink-0 rounded-sm border border-purple-500/50 bg-transparent ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 accent-purple-600",
                className
            )}
            {...props}
        />
    )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }
