"use client";

import { useRef, useState, useEffect } from "react";
import { VideoPlayIcon, VideoPlayIconSmall, VideoPauseIcon, VideoVolumeIcon } from "./Icons";

interface VideoPlayerProps {
  src: string;
  poster: string;
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateDuration = () => {
      if (video.duration && !isNaN(video.duration) && video.duration !== Infinity) {
        setDuration(video.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      updateDuration();
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("durationchange", updateDuration);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("durationchange", updateDuration);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
      setShowControls(true);
      if (video.duration && !isNaN(video.duration) && video.duration !== Infinity) {
        setDuration(video.duration);
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    const progress = progressRef.current;
    if (!video || !progress) return;

    const rect = progress.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;

    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newVolume = Math.max(0, Math.min(1, clickX / width));

    video.volume = newVolume;
    setVolume(newVolume);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.volume > 0) {
      video.volume = 0;
      setVolume(0);
    } else {
      video.volume = 1;
      setVolume(1);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="h-full w-full object-cover"
        playsInline
        preload="none"
        onClick={togglePlay}
        onLoadedMetadata={(e) => {
          const video = e.currentTarget;
          if (video.duration && !isNaN(video.duration) && video.duration !== Infinity) {
            setDuration(video.duration);
          }
        }}
      />

      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center"
        >
          <VideoPlayIcon className="scale-200" />
        </button>
      )}

      {showControls && (
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent px-3 pt-10 pb-3">
          <div className="flex items-center gap-2">
            <button onClick={togglePlay} className="shrink-0 text-white">
              {isPlaying ? <VideoPauseIcon /> : <VideoPlayIconSmall />}
            </button>

            <div
              ref={progressRef}
              onClick={handleProgressClick}
              className="relative h-1 flex-1 cursor-pointer rounded-full bg-white/30"
            >
              <div
                className="bg-brand absolute top-0 left-0 h-full rounded-full"
                style={{ width: `${progress}%` }}
              />
              <div
                className="bg-brand absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full"
                style={{ left: `calc(${progress}% - 6px)` }}
              />
            </div>

            <span className="shrink-0 text-xs text-white">{formatTime(currentTime)}</span>

            <div className="flex shrink-0 items-center gap-1">
              <button onClick={toggleMute} className="text-white">
                <VideoVolumeIcon muted={volume === 0} />
              </button>
              <div
                onClick={handleVolumeClick}
                className="relative h-1 w-10 cursor-pointer rounded-full bg-white/30"
              >
                <div
                  className="bg-brand absolute top-0 left-0 h-full rounded-full"
                  style={{ width: `${volume * 100}%` }}
                />
                <div
                  className="bg-brand absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full"
                  style={{ left: `calc(${volume * 100}% - 6px)` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
