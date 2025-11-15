import React, { useState, useEffect, useCallback } from 'react'

// Base64 encoded SVG as fallback (houdt dezelfde)
const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fallbackElement?: React.ReactNode;
  showAltTextOnError?: boolean;
  retryCount?: number;
  retryDelay?: number;
}

export function ImageWithFallback({
  src,
  alt,
  style,
  className,
  fallbackSrc = ERROR_IMG_SRC,
  fallbackElement,
  showAltTextOnError = false,
  retryCount = 0,
  retryDelay = 1000,
  ...rest
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)
  const [currentRetry, setCurrentRetry] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Reset error state when src changes
  useEffect(() => {
    setDidError(false)
    setCurrentRetry(0)
    setIsLoading(true)
  }, [src])

  const handleError = useCallback(() => {
    if (currentRetry < retryCount) {
      // Retry loading the image
      setTimeout(() => {
        setCurrentRetry(prev => prev + 1)
        setDidError(false)
        setIsLoading(true)
      }, retryDelay)
    } else {
      setDidError(true)
      setIsLoading(false)
    }
  }, [currentRetry, retryCount, retryDelay])

  const handleLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

  // If we're in error state and not retrying
  if (didError) {
    // Custom fallback element
    if (fallbackElement) {
      return (
        <div 
          className={`inline-block bg-gray-100 text-center align-middle ${className || ''}`}
          style={style}
          data-fallback="true"
          data-original-src={src}
        >
          {fallbackElement}
        </div>
      )
    }

    // Show alt text as fallback
    if (showAltTextOnError && alt) {
      return (
        <div 
          className={`inline-flex items-center justify-center bg-gray-100 text-gray-500 text-center align-middle ${className || ''}`}
          style={style}
          data-fallback="true"
          data-original-src={src}
          title={`Failed to load: ${alt}`}
        >
          <span className="text-sm px-2 py-1 break-words max-w-full">
            {alt}
          </span>
        </div>
      )
    }

    // Default image fallback
    return (
      <div 
        className={`inline-flex items-center justify-center bg-gray-100 text-center align-middle ${className || ''}`}
        style={style}
        data-fallback="true"
        data-original-src={src}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img 
            src={fallbackSrc} 
            alt={alt ? `Error loading: ${alt}` : 'Error loading image'} 
            className="max-w-full max-h-full object-contain"
            {...rest} 
          />
        </div>
      </div>
    )
  }

  // Loading state (optional visual feedback)
  const loadingStyles = isLoading ? { opacity: 0.5, filter: 'blur(1px)' } : {}

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      style={{ ...style, ...loadingStyles, transition: 'opacity 0.2s ease-in-out' }}
      onError={handleError}
      onLoad={handleLoad}
      loading="lazy"
      {...rest} 
    />
  )
}

// Alternative hook version for more control
export function useImageWithFallback(src: string, options: { retryCount?: number; retryDelay?: number } = {}) {
  const { retryCount = 0, retryDelay = 1000 } = options
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    if (!src) {
      setStatus('error')
      return
    }

    setStatus('loading')
    const img = new Image()
    
    const handleLoad = () => {
      setStatus('success')
    }

    const handleError = () => {
      if (retry < retryCount) {
        setTimeout(() => {
          setRetry(prev => prev + 1)
        }, retryDelay)
      } else {
        setStatus('error')
      }
    }

    img.src = src
    img.onload = handleLoad
    img.onerror = handleError

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src, retry, retryCount, retryDelay])

  return status
}

// Higher Order Component voor class components (indien nodig)
export function withImageFallback<P extends React.ImgHTMLAttributes<HTMLImageElement>>(
  Component: React.ComponentType<P>
) {
  return function WrappedComponent(props: P & { fallbackSrc?: string }) {
    return <ImageWithFallback {...props} />
  }
}