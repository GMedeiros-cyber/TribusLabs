"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

// Stream HLS hospedado no Mux (.m3u8 → exige hls.js fora do Safari).
const SRC =
  "https://stream.mux.com/kimF2ha9zLrX64H00UgLGPflCzNtl1T0215MlAmeOztv8.m3u8";

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Safari/iOS reproduzem HLS nativamente.
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = SRC;
      return;
    }

    // Demais navegadores: hls.js.
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(SRC);
      hls.attachMedia(video);
      return () => hls.destroy();
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-100"
      />
    </div>
  );
}
