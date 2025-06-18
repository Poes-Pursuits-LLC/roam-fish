import MuxVideo from '@mux/mux-video-react'
import { useCallback, useRef } from 'react'
import { useEffect, useState } from 'react'

export const HeroVideo = () => {
    const [renderBackgroundImage, setRenderBackgroundImage] = useState(true)
    const videoRef = useRef<HTMLVideoElement>(null)

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
        }, 30000)
    }, [])

    return (
        <>
            {renderBackgroundImage && (
                <div className="absolute inset-0">
                    <img
                        src="https://image.mux.com/B9bnytgWUYSzCwHEMOLAjONeboKqc4cmftULkDoaYwE/thumbnail.png?width=1200&height=900&time=7"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            <MuxVideo
                ref={videoRef}
                onCanPlay={() => startVideoAndRemoveBackgroundImage()}
                onError={() => handleVideoError()}
                className="absolute inset-0 w-full h-full object-cover"
                playbackId="B9bnytgWUYSzCwHEMOLAjONeboKqc4cmftULkDoaYwE"
                playsInline
                title="Hero Section Background Video"
                muted
                loop
            />
        </>
    )
}
