import MuxVideo from '@mux/mux-video-react'
import { useCallback, useRef } from 'react'

export const HeroVideo = () => {
    const videoRef = useRef<HTMLVideoElement>(null)

    const startVideo = useCallback(() => {
        videoRef.current?.play()
    }, [])

    return (
        <MuxVideo
            ref={videoRef}
            onCanPlay={() => startVideo()}
            // onError={() => handleVideoError()}
            className="absolute w-full h-full object-cover"
            playbackId="B9bnytgWUYSzCwHEMOLAjONeboKqc4cmftULkDoaYwE"
            playsInline
            title="Hero Section Background Video"
            muted
            loop
        />
    )
}
;('use client')

import { useEffect, useRef, useState } from 'react'
import MuxVideo from '@mux/mux-video-react'
import { OptimizedImage } from '~/ui/components/OptimizedImage'
import { AspectRatioSize } from '~/ui/elements/images/AspectRatio'

export const HeroBackgroundVideo = () => {
    // State
    const [renderBackgroundImage, setRenderBackgroundImage] = useState(true)
    const videoRef = useRef<HTMLVideoElement>(null)

    // Interactivity
    const startVideoAndRemoveBackgroundImage = () => {
        videoRef.current?.play()
        setRenderBackgroundImage(false)
    }

    const handleVideoError = () => {
        setRenderBackgroundImage(true)
    }

    useEffect(() => {
        setTimeout(() => {
            videoRef.current?.pause()
        }, 60000)
    }, [])

    return (
        <>
            {renderBackgroundImage && (
                <OptimizedImage
                    ratio={AspectRatioSize['16:9']}
                    src="https://image.mux.com/B9bnytgWUYSzCwHEMOLAjONeboKqc4cmftULkDoaYwE/thumbnail.png?width=214&height=121&time=7"
                    parentClassName="absolute h-screen w-full"
                    className="w-full h-screen"
                />
            )}
            {!process.env.NEXT_PUBLIC_IS_LOCAL && (
                <MuxVideo
                    ref={videoRef}
                    onCanPlay={() => startVideoAndRemoveBackgroundImage()}
                    onError={() => handleVideoError()}
                    className="absolute w-full h-full object-cover"
                    playbackId="B9bnytgWUYSzCwHEMOLAjONeboKqc4cmftULkDoaYwE"
                    playsInline
                    title="Hero Section Background Video"
                    muted
                    loop
                />
            )}
        </>
    )
}
