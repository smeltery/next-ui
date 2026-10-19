"use client"

import React, { type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface InfiniteCarouselProps {
  className?: string
  children: ReactNode
  reverseDirection?: boolean
  duration?: number // Duration in seconds
  gap?: number // Gap in pixels
  pauseOnHover?: boolean // Enable/Disable pause on hover
}

export const InfiniteCarousel = ({
  className,
  children,
  reverseDirection = false,
  duration = 20,
  gap = 16,
  pauseOnHover = false
}: InfiniteCarouselProps) => {
  return (
    <>
      <div
        className={cn(
          "w-full overflow-hidden whitespace-nowrap relative",
          pauseOnHover && "group",
          className
        )}
      >
        <div
          className={cn(
            "flex items-center animate-scroll",
            pauseOnHover && "group-hover:pause-scroll"
          )}
          style={{
            animationDuration: `${duration}s`,
            animationDirection: reverseDirection ? "reverse" : "normal",
            gap: `${gap}px`
          }}
        >
          {React.Children.map(children, (child, index) => (
            <span
              className="inline-block"
              style={{ marginRight: `${gap}px` }}
              key={index}
            >
              {child}
            </span>
          ))}
          {/* Duplicate the children for seamless looping */}
          {React.Children.map(children, (child, index) => (
            <span
              className="inline-block"
              style={{ marginRight: `${gap}px` }}
              key={`duplicate-${index}`}
            >
              {child}
            </span>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-scroll {
          animation-name: scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-play-state: running;
        }

        /* Pause animation on hover */
        .group:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>
    </>
  )
}
