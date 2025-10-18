"use client";

import { useCallback } from "react";

declare global {
  interface Window {
    cloudinary?: any;
  }
}

const WIDGET_SRC = "https://widget.cloudinary.com/v2.0/global/all.js";
let widgetReady: Promise<void> | null = null;

async function loadWidget() {
  if (window.cloudinary) return;
  if (!widgetReady) {
    widgetReady = new Promise((resolve, reject) => {
      const tag = document.createElement("script");
      tag.src = WIDGET_SRC;
      tag.async = true;
      tag.onload = () => resolve();
      tag.onerror = () => reject(new Error("Cloudinary widget failed to load"));
      document.body.appendChild(tag);
    });
  }
  await widgetReady;
}

export default function TinyImageUpload({
  onPicked,
  disabled,
  className,
}: {
  onPicked: (url: string) => void;
  disabled?: boolean;
  className?: string;
}) {
  const handleClick = useCallback(async () => {
    await loadWidget();
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET_NAME || "jaytech",
        multiple: false,
        sources: ["local", "url", "camera"],
      },
      (err: any, res: any) => {
        if (!err && res?.event === "success") {
          const url = res?.info?.secure_url || res?.info?.url;
          if (url) onPicked(url);
        }
      },
    );
    widget.open();
  }, [onPicked]);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={
        className ?? "hover:bg-muted rounded-md border px-3 py-2 text-sm transition-colors"
      }
    >
      Upload / Change image
    </button>
  );
}
