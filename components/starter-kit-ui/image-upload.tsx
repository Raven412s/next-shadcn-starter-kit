/** biome-ignore-all lint/a11y/noLabelWithoutControl: explanation */
/** biome-ignore-all lint/correctness/noUnusedVariables: explanation */
/** biome-ignore-all lint/complexity/useOptionalChain: explanation */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: explanation */
"use client";

import { Check, Image as ImageIcon, Loader2, Upload, Video, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Types for multi-file uploads
 */
export interface UploadedAsset {
  public_id?: string;
  secure_url?: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
  url?: string;
}

export interface ImageUploadProps {
  /**
   * Enable multiple file uploads. Defaults to false for simple single-file mode.
   */
  multiple?: boolean;

  /**
   * For single-file mode: current value and change handler
   */
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  name?: string;

  /**
   * For single-file mode: old image URL for cleanup
   */
  oldImageUrl?: string;

  /**
   * For multi-file mode: custom upload endpoint
   */
  endpoint?: string;

  /**
   * For multi-file mode: max image size in MB
   */
  maxImageSizeMB?: number;

  /**
   * For multi-file mode: max video size in MB
   */
  maxVideoSizeMB?: number;

  /**
   * For multi-file mode: accepted file types
   */
  accept?: string;

  /**
   * For multi-file mode: callback when upload completes
   */
  onComplete?: (uploaded: UploadedAsset[]) => void;

  /**
   * For multi-file mode: label above dropzone
   */
  label?: string;

  /**
   * Show inline preview for single-file mode. Defaults to true.
   */
  showPreview?: boolean;
}

interface FileItem {
  id: string;
  file: File;
  progress: number;
  status: "queued" | "uploading" | "done" | "error" | "canceled";
  error?: string;
  uploaded?: UploadedAsset;
}

/**
 * Unified image upload component supporting both single and multiple file modes.
 *
 * Single-file mode (multiple=false):
 * - Simple text input + upload button
 * - Optional inline preview
 * - Automatic cleanup of old images
 * - Perfect for form fields
 *
 * Multi-file mode (multiple=true):
 * - Drag & drop dropzone
 * - Queue-based upload with progress
 * - File type and size validation
 * - Perfect for galleries or batch uploads
 */
export function ImageUpload({
  multiple = false,
  value = "",
  onChange,
  onBlur,
  name,
  oldImageUrl,
  endpoint = "/api/upload",
  maxImageSizeMB = 10,
  maxVideoSizeMB = 100,
  accept = multiple ? "image/*,video/*" : "image/*",
  onComplete,
  label = multiple ? "Upload Files" : undefined,
  showPreview = !multiple,
}: ImageUploadProps) {
  // Single-file mode state
  const [isUploading, setIsUploading] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  // Multi-file mode state
  const [items, setItems] = useState<FileItem[]>([]);
  const [isDragging, setDragging] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const multiInputRef = useRef<HTMLInputElement>(null);

  // ============================================================================
  // SINGLE-FILE MODE HANDLERS
  // ============================================================================

  const handleSingleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > maxImageSizeMB * 1024 * 1024) {
      toast.error(`Image size should be less than ${maxImageSizeMB}MB`);
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      // Include old image URL for cleanup if provided
      if (oldImageUrl) {
        formData.append("oldImageUrl", oldImageUrl);
      }

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const data = await response.json();
      if (onChange) {
        onChange(data.url);
      }
      setPreviewError(false);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to upload image",
      );
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleImageError = () => {
    setPreviewError(true);
    toast.error("Failed to load image preview");
  };

  const handleClearImage = async () => {
    // If there's a current image URL and it's from Cloudinary, delete it
    if (value && value.includes("cloudinary.com")) {
      try {
        const response = await fetch(endpoint, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl: value }),
        });

        if (response.ok) {
          toast.success("Previous image removed from storage");
        }
      } catch (error) {
        console.error("Error deleting image:", error);
        // Don't show error to user as this is cleanup
      }
    }

    if (onChange) {
      onChange("");
    }
    setPreviewError(false);
  };

  // ============================================================================
  // MULTI-FILE MODE HANDLERS
  // ============================================================================

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const arr = Array.from(files);
      if (!arr.length) return;

      const oversize = arr.find((f) => {
        if (f.type.startsWith("video/")) {
          return f.size > maxVideoSizeMB * 1024 * 1024;
        }
        return f.size > maxImageSizeMB * 1024 * 1024;
      });

      if (oversize) {
        const limit = oversize.type.startsWith("video/") ? maxVideoSizeMB : maxImageSizeMB;
        toast.error(
          `"${oversize.name}" is larger than ${limit}MB (${oversize.type.startsWith("video/") ? "video" : "image"})`
        );
        return;
      }

      const next: FileItem[] = arr.map((file) => ({
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
        file,
        progress: 0,
        status: "queued",
      }));
      setItems((prev) => [...prev, ...next]);
    },
    [maxImageSizeMB, maxVideoSizeMB]
  );

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      addFiles(e.dataTransfer.files);
    }
  };

  const startUpload = async () => {
    if (!items.length) {
      toast.message("Select files first");
      return;
    }

    setIsBusy(true);
    const uploaded: UploadedAsset[] = [];

    // helper type-safe patch updater
    type Patch = Partial<FileItem>;
    const makeUpdater = (id: string) => (patch: Patch) =>
      setItems((prev) => prev.map((p) => (p.id === id ? { ...p, ...(patch as Patch) } : p)));

    for (const it of items) {
      if (it.status === "done") continue;

      await new Promise<void>((resolve) => {
        const xhr = new XMLHttpRequest();
        const form = new FormData();
        form.append("files", it.file);

        const toastId = toast.loading(`Uploading ${it.file.name} — 0%`);
        const update = makeUpdater(it.id);

        update({ status: "uploading", progress: 0 });

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const percent = Math.min(99, Math.round((e.loaded / e.total) * 100));
            update({ progress: percent });
            toast.message(`Uploading ${it.file.name} — ${percent}%`, { id: toastId });
          }
        };

        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            try {
              if (xhr.status >= 200 && xhr.status < 300) {
                // parse response safely and map to UploadedAsset if possible
                let asset: UploadedAsset | undefined;
                try {
                  const json = JSON.parse(xhr.responseText);
                  if (Array.isArray(json) && json.length > 0) {
                    asset = json[0] as UploadedAsset;
                  } else if (json?.result) {
                    asset = json.result as UploadedAsset;
                  } else if (json?.secure_url || json?.public_id) {
                    asset = json as UploadedAsset;
                  }
                } catch (err) {
                  // keep asset undefined if parse fails
                  asset = undefined;
                }

                if (asset) {
                  uploaded.push(asset);
                  update({ status: "done", progress: 100, uploaded: asset });
                } else {
                  // no asset metadata returned, still mark done
                  update({ status: "done", progress: 100 });
                }

                toast.success(`Uploaded ${it.file.name}`, { id: toastId });
                resolve();
              } else {
                const msg = xhr.responseText || "Upload failed";
                update({ status: "error", error: msg });
                toast.error(`Failed: ${it.file.name}`, { id: toastId });
                resolve();
              }
            } catch (err) {
              // fallback error handling
              update({ status: "error", error: "Unknown error" });
              toast.error(`Failed: ${it.file.name}`, { id: toastId });
              resolve();
            }
          }
        };

        xhr.onerror = () => {
          update({ status: "error", error: "Network error" });
          toast.error(`Network error: ${it.file.name}`);
          resolve();
        };

        xhr.open("POST", endpoint, true);
        xhr.send(form);
      });
    }

    setIsBusy(false);

    if (onComplete) {
      try {
        onComplete(uploaded);
      } catch (err) {
        console.error("onComplete handler error:", err);
      }
    }

    // clear queue of successfully uploaded items (keep errors if any)
    setItems((prev) => prev.filter((p) => p.status !== "done"));
  };

  // ============================================================================
  // RENDER: SINGLE-FILE MODE
  // ============================================================================

  if (!multiple) {
    return (
      <div className="flex gap-2 items-center">
        <Input
          type="text"
          value={value}
          onChange={(e) => {
            if (onChange) {
              onChange(e.target.value);
            }
            setPreviewError(false);
          }}
          onBlur={onBlur}
          name={name}
          placeholder="Enter image URL or upload a file"
          className="flex-1"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleSingleFileChange}
          accept={accept}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          title="Upload image"
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
        </Button>

        {value && showPreview && (
          <>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleClearImage}
              title="Clear image"
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="relative h-10 w-10">
              {!previewError ? (
                <Image
                  src={value}
                  alt="Preview"
                  fill
                  className="h-10 w-10 object-cover rounded-md"
                  onError={handleImageError}
                />
              ) : (
                <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                  <ImageIcon className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  // ============================================================================
  // RENDER: MULTI-FILE MODE
  // ============================================================================

  return (
    <div className="p-4 border rounded-lg bg-muted/30">
      {label && <label className="block mb-2 font-medium">{label}</label>}

      {/* Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={[
          "relative flex flex-col items-center justify-center gap-3",
          "rounded-xl border-2 border-dashed p-8 text-center",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/30",
        ].join(" ")}
      >
        <Upload className="h-6 w-6" />
        <div className="text-sm">
          <span className="font-medium">Drag & drop</span> files here or
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={() => multiInputRef.current?.click()}
            className="gap-2"
            disabled={isBusy}
          >
            <Upload className="h-4 w-4" /> Choose Files
          </Button>
          <span className="text-xs text-muted-foreground">
            (Images up to {maxImageSizeMB}MB, Videos up to {maxVideoSizeMB}MB)
          </span>
        </div>
        <Input
          ref={multiInputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
            e.currentTarget.value = "";
          }}
        />
      </div>

      {/* Queue */}
      {items.length > 0 && (
        <div className="mt-4 space-y-2">
          {items.map((it) => (
            <div key={it.id} className="flex items-center gap-3 border rounded-lg p-3">
              <div className="shrink-0 w-10 h-10 bg-muted rounded overflow-hidden flex items-center justify-center relative">
                {it.file.type.startsWith("image/") ? (
                  <Image src={URL.createObjectURL(it.file)} alt={it.file.name} className="object-cover w-full h-full" fill />
                ) : it.file.type.startsWith("video/") ? (
                  <Video className="h-5 w-5" />
                ) : (
                  <ImageIcon className="h-5 w-5" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="truncate text-sm font-medium">{it.file.name}</div>
                  <div className="text-xs text-muted-foreground">{(it.file.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>

                <div className="h-2 w-full bg-muted rounded overflow-hidden mt-2">
                  <div className="h-full bg-primary transition-all" style={{ width: `${it.progress}%` }} />
                </div>

                <div className="mt-1 text-xs">
                  {it.status === "uploading" && (
                    <span className="inline-flex items-center gap-1">
                      <Loader2 className="h-3 w-3 animate-spin" /> Uploading… {it.progress}%
                    </span>
                  )}
                  {it.status === "done" && (
                    <span className="inline-flex items-center gap-1 text-green-600">
                      <Check className="h-3 w-3" /> Done
                    </span>
                  )}
                  {it.status === "error" && <span className="text-destructive">{it.error || "Failed"}</span>}
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(it.id)}
                disabled={isBusy && it.status === "uploading"}
                className="shrink-0"
                title="Remove"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button onClick={startUpload} disabled={isBusy || items.length === 0} className="gap-2">
          {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {isBusy ? "Uploading…" : "Start Upload"}
        </Button>

        {items.length > 0 && (
          <Button variant="outline" onClick={() => setItems([])} disabled={isBusy}>
            Clear Queue
          </Button>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// BACKWARDS COMPATIBILITY EXPORTS
// ============================================================================

/**
 * @deprecated Use ImageUpload component instead
 */
export function ImageInput(props: ImageUploadProps) {
  return <ImageUpload {...props} />;
}

/**
 * @deprecated Use ImageUpload with multiple=true instead
 */
export function ImageUploadSingle(props: Omit<ImageUploadProps, 'multiple'>) {
  return <ImageUpload {...props} multiple={false} />;
}

/**
 * @deprecated Use ImageUpload with multiple=true instead
 */
export function ImageUploadMultiple(props: Omit<ImageUploadProps, 'multiple'>) {
  return <ImageUpload {...props} multiple={true} />;
}
