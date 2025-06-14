import MuxVideo from '@mux/mux-video-react'
import { useCallback, useRef } from 'react'
import { useEffect, useState } from 'react'

export const HeroVideo = () => {
    // State
    const [renderBackgroundImage, setRenderBackgroundImage] = useState(true)
    const videoRef = useRef<HTMLVideoElement>(null)

    // Interactivity
    const startVideoAndRemoveBackgroundImage = useCallback(() => {
        videoRef.current?.play()
        setRenderBackgroundImage(false)
    }, [])

    const handleVideoError = () => {
        setRenderBackgroundImage(true)
    }

    useEffect(() => {
        setTimeout(() => {
            videoRef.current?.pause()
        }, 15000)
    }, [])

    return (
        <>
            {renderBackgroundImage && (
                <div className="absolute">
                    <img
                        src="https://image.mux.com/B9bnytgWUYSzCwHEMOLAjONeboKqc4cmftULkDoaYwE/thumbnail.png?width=1200&height=900&time=7"
                        className="w-full aspect-16/9"
                    />
                </div>
            )}
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

        </>
    )
}
