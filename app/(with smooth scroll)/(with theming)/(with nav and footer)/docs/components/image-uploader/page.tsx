// app/docs/components/image-uploader/page.tsx
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: explanation */
"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import CopyComponent from "@/registry/default/starter-kit-ui/copy-component";
import ImageUploadMultiple from "@/registry/default/starter-kit-ui/image-upload-multiple";
import ImageUploadSingle from "@/registry/default/starter-kit-ui/image-upload-single";
import MediaGallery from "@/registry/default/starter-kit-ui/media-gallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  format: string;
  bytes: number;
  width: number;
  height: number;
  created_at: string;
}

const ImageUploaderDocsPage = () => {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchImages = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/images");
      const data = await res.json();
      setImages(data.images || []);
    } catch (err) {
      console.error("Error fetching images:", err);
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array

  const deleteImage = async (publicId: string) => {
    try {
      const res = await fetch("/api/images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });
      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.public_id !== publicId));
        toast.success("Image deleted successfully");
      } else {
        toast.error("Failed to delete image");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting image");
    }
  };

  useEffect(() => {
    fetchImages();
  }, [fetchImages, refreshKey]); // Ab fetchImages stable hai

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (error) {
      console.error("copy error:", error);
      toast.error("Failed to copy");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === undefined || bytes === null) return "-";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };
  const usageExample = `// Example usage (single)
import ImageUploadSingle from "@/components/starter-kit-ui/ImageUploadSingle";

export default function Page() {
  return <ImageUploadSingle />;
}

// Example usage (multi)
import ImageUploadMultiple from "@/components/starter-kit-ui/ImageUploadMultiple";

<ImageUploadMultiple onComplete={(uploaded) => console.log(uploaded)} />`;

  const apiUploadRoute = `// app/api/upload/route.ts (server)
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const files = (formData.getAll("files").length ? formData.getAll("files") : [formData.get("file")]).filter(Boolean) as File[];
  if (!files.length) return NextResponse.json({ error: "No files received" }, { status: 400 });

  const uploads = await Promise.all(files.map(async (file) => {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUri = \`data:\${file.type};base64,\${base64}\`;
    return cloudinary.uploader.upload(dataUri, { folder: "uploads", resource_type: "auto" });
  }));

  return NextResponse.json({ uploads });
}`;

  const apiImageRoute = `// app/api/images/route.ts (server)
// app/api/admin/images/route.ts
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const [images, videos] = await Promise.all([
      cloudinary.api.resources({
        type: "upload",
        resource_type: "image",
        max_results: 500,
      }),
      cloudinary.api.resources({
        type: "upload",
        resource_type: "video",
        max_results: 500,
      }),
    ]);

    // merge both
    const resources = [...images.resources, ...videos.resources];

    return NextResponse.json({ images: resources });
  } catch (error) {
    console.error("Error fetching media:", error);
    return NextResponse.json(
      { error: "Failed to fetch media" },
      { status: 500 }
    );
  }
}

// app/api/admin/images/route.ts
export async function DELETE(req: Request) {
  try {
    const { publicId } = await req.json();

    const result = await cloudinary.uploader.destroy(publicId);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 },
    );
  }
}`;

  const imageInputSource = `// components/starter-kit-ui/image-input.tsx (client)
/** biome-ignore-all lint/complexity/useOptionalChain: explanation */
"use client";

import { Image as ImageIcon, LoaderCircle, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ImageInputProps {
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  oldImageUrl?: string; // For cleanup when updating
}

export function ImageInput({
  value = "",
  onChange,
  onBlur,
  name,
  oldImageUrl,
}: ImageInputProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size should be less than 10MB");
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

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const data = await response.json();
      onChange(data.url);
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
        const response = await fetch("/api/upload", {
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

    onChange("");
    setPreviewError(false);
  };

  return (
    <div className="flex gap-2 items-center">
      <Input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
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
        onChange={handleFileChange}
        accept="image/*"
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
          <LoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <Upload className="h-4 w-4" />
        )}
      </Button>

      {value && (
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
`;
  const imageUploadSingleSource = `// components/starter-kit-ui/ImageUploadSingle.tsx (client)
"use client";

import { useState } from "react";
import { ImageInput } from "./image-input";

const ImageUploadSingle = () => {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <ImageInput
        value={imageUrl}
        onChange={(url) => {
          setImageUrl(url); // 👈 jaise hi file upload hoga, Cloudinary URL aa jayega
        }}
      />

      {imageUrl && (
        <p className="text-sm text-gray-600">
          ✅ Uploaded Image:{" "}
          <a
            href={imageUrl}
            target="_blank"
            className="text-violet-600 underline"
          >
            {imageUrl}
          </a>
        </p>
      )}
    </div>
  );
};

export default ImageUploadSingle;
`;



  return (
    <div>
      <header>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Image Uploader</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Demo & docs for <strong>ImageInput</strong>, <strong>ImageUploadSingle</strong>, <strong>ImageUploadMultiple</strong> and <strong>MediaGallery</strong>.
          These use the server APIs <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">/api/upload</code> and <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">/api/images</code>.
        </p>
      </header>

      <Tabs defaultValue="preview" className="w-full border rounded-lg">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Single uploader</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              Use the single-file uploader when you need one image input (e.g. product thumbnail).
            </p>
            <div className="p-4 border rounded bg-white dark:bg-gray-900">
              <ImageUploadSingle />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Multi uploader & gallery</h2>
            <div className="grid gap-4">
              <div className="p-4 border rounded bg-white dark:bg-gray-900">
                <ImageUploadMultiple
                  label="Drop images here"
                  onComplete={async () => {
                    // Refresh gallery after upload completes
                    setRefreshKey((k) => k + 1);
                    await fetchImages();
                    toast.success("Upload complete — gallery refreshed");
                  }}
                />
              </div>

              <div className="p-4 border rounded bg-white dark:bg-gray-900 h-[]" >
                <h3 className="text-sm font-medium mb-2">Gallery</h3>
                <MediaGallery
                  images={images}
                  isLoading={isLoading}
                  fetchImages={fetchImages}
                  deleteImage={deleteImage}
                  copyToClipboard={copyToClipboard}
                  formatFileSize={formatFileSize}
                />
              </div>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="usage" className="p-6">
          <h3 className="text-lg font-medium mb-3">Quick usage</h3>
          <CopyComponent code={usageExample} fileName="usage-example.tsx" language="typescript" defaultExpanded={false} />
        </TabsContent>

        <TabsContent value="api" className="p-6 space-y-5">
          <h3 className="text-lg font-medium mb-3">Server API (upload & images)</h3>
          <CopyComponent
            code={apiUploadRoute}
            fileName="app/api/upload/route.ts"
            language="typescript"
            height="max-h-[300px] max-w-2xl"
            defaultExpanded={false}
            showCopyButton
            showRefreshButton={false}
            showExpandButton />
          <CopyComponent
            code={apiImageRoute}
            fileName="app/api/images/route.ts"
            language="typescript"
            height="max-h-[300px] max-w-2xl"
            defaultExpanded={false}
            showCopyButton
            showRefreshButton={false}
            showExpandButton />
        </TabsContent>

        <TabsContent value="sources" className="p-6 space-y-4">
          <h3 className="text-lg font-medium">Key component sources</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">Below are short excerpts — use the original components in <code>components/starter-kit-ui</code>.</p>
          <CopyComponent code={imageInputSource} fileName="components/starter-kit-ui/image-input.tsx" language="typescript" defaultExpanded={false} />
          <CopyComponent code={imageUploadSingleSource} fileName="components/starter-kit-ui/ImageUploadSingle.tsx" language="typescript" defaultExpanded={false} />
          {/* <CopyComponent code={imageUploadMultipleSource} fileName="components/starter-kit-ui/ImageUploadMultiple.tsx" language="typescript" defaultExpanded={false} /> */}
        </TabsContent>
      </Tabs>

      <section>
        <h3 className="text-lg font-medium">Notes & .env</h3>
        <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li>Create a <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">.env</code> (or .env.local) with your Cloudinary keys:</li>
        </ul>

        <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 rounded-lg p-4 mt-3 text-sm overflow-x-auto">
          {`# .env.example
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
# (optional)
NEXT_PUBLIC_SOME_KEY=...`}
        </pre>

        <ul className="list-disc pl-5 mt-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li>Multi uploader posts files to <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">/api/upload</code> by default.</li>
          <li>Gallery deletion calls <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">/api/images</code> with payload <code>{`{ publicId }`}</code>.</li>
          <li>If anything is in a different folder, update the import paths at the top of this file.</li>
        </ul>
      </section>
    </div>
  );
};

export default ImageUploaderDocsPage;
