"use client";


import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Eye, Image as ImageIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import ImageUploadMultiple from "./image-upload-multiple";



interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  format: string;
  bytes: number;
  width: number;
  height: number;
  created_at: string;
}


interface Props {
  images: CloudinaryImage[];
  isLoading: boolean;
  fetchImages: () => Promise<void>;
  deleteImage: (publicId: string) => Promise<void>;
  copyToClipboard: (text: string) => void;
  formatFileSize: (bytes: number) => string;
}


export default function MediaGallery({
  images,
  isLoading,
  fetchImages,
  deleteImage,
  copyToClipboard,
  formatFileSize,
}: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string>("");
  

  return (
    <div>
      {/* New separated uploader */}
      <ImageUploadMultiple
        label="Upload New Image(s)"
        onComplete={async () => {
          await fetchImages();
          toast.success("Gallery updated");
        }}
      />

 

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      ) : images?.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No images found.</p>
          <p className="text-sm text-muted-foreground mt-1">Upload your first image to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {images.map((image) => (
            <div key={image.public_id} className="border rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
              <div className="relative aspect-square bg-muted">
                <Image src={image.secure_url} alt={image.public_id} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button variant="secondary" size="sm" onClick={() => window.open(image.secure_url, "_blank")} className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => { setImageToDelete(image.public_id); setDeleteDialogOpen(true); }} className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>


              <div className="p-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-medium truncate">{image.public_id.split("/").pop()}</div>
                  <span className="text-xs px-2 py-1 bg-muted rounded-md">{image.format.toUpperCase()}</span>
                </div>
                <div className="text-xs text-muted-foreground space-y-1 mb-3">
                  <div className="flex justify-between"><span>Size:</span><span>{formatFileSize(image.bytes)}</span></div>
                  <div className="flex justify-between"><span>Dimensions:</span><span>{image.width} × {image.height} px</span></div>
                  <div className="flex justify-between"><span>Uploaded:</span><span>{new Date(image.created_at).toLocaleDateString()}</span></div>
                </div>
                <div className="flex gap-2">
                  <Input value={image.secure_url} readOnly className="text-xs h-8" />
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(image.secure_url)} className="h-8 w-8 shrink-0">
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}



      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this image? This action cannot be undone and will permanently remove the image from Cloudinary.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (!imageToDelete) return;
                await deleteImage(imageToDelete);
                setDeleteDialogOpen(false);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Image
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* NOTE: Re-use your existing AlertDialog around here if needed */}
    </div>
  );
}