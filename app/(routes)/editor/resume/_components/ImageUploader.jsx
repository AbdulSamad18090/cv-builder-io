import React, { useState, useRef } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ImageUploader = ({ value, onChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(value || "");
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const imageRef = useRef(null);

  function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
        setIsDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const aspect = 1; // Square crop
    setCrop(centerAspectCrop(width, height, aspect));
    imageRef.current = e.currentTarget;
  };

  const saveImage = () => {
    if (!completedCrop || !imageRef.current) return;

    const canvas = document.createElement("canvas");
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      imageRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    const croppedImageUrl = canvas.toDataURL("image/jpeg");
    setPreviewUrl(croppedImageUrl);
    onChange(croppedImageUrl);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-2">
      {previewUrl && (
        <div className="relative w-32 h-32 mx-auto mb-4">
          <img
            src={previewUrl}
            alt="Profile preview"
            className="w-full h-full object-cover rounded-full border-2 border-gray-200"
          />
        </div>
      )}

      <div className="flex justify-center">
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById("profile-image-input").click()}
        >
          {previewUrl ? "Change Image" : "Upload Image"}
        </Button>
        <input
          id="profile-image-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Crop Image</DialogTitle>
          </DialogHeader>

          <div className="my-4">
            {previewUrl && (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1}
                circularCrop
              >
                <img
                  alt="Crop preview"
                  src={previewUrl}
                  onLoad={onImageLoad}
                  className="max-h-96 max-w-full"
                />
              </ReactCrop>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveImage}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageUploader;
