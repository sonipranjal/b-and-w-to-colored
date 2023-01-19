import { useSession } from "next-auth/react/index.js";
import Image from "next/image.js";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { UploadDropzone } from "react-uploader";
import { Uploader } from "uploader";
import { env } from "../../env/client.mjs";
import LoadingCircle from "../../icons/loading-circle";
import { api } from "../../utils/api";

const uploader = Uploader({
  apiKey: env.NEXT_PUBLIC_UPLOAD_API_KEY ?? "free",
});

const options = {
  maxFileCount: 1,
  mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
  editor: { images: { crop: false } },
  styles: { colors: { primary: "#000" } },
};

const UploadFile = () => {
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");
  const [coloredImages, setColoredImages] = useState<string[]>([]);

  const paintImage = api.ai.paintImage.useMutation();

  const getPaintedPhoto = async (imageUrl: string) => {
    setLoading(true);
    const { images, message } = await paintImage.mutateAsync({
      imageUrl,
    });

    if (message) {
      return toast.error("failed to convert image");
    }

    if (images) {
      setColoredImages(images);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      {!(coloredImages.length > 0) && (
        <UploadDropzone
          uploader={uploader}
          options={options}
          onUpdate={(file) => {
            if (file.length !== 0 && file[0]) {
              // save this image url to db if signed in, call replicate api to generate color image, listen for webhook or do a polling get colored image, show here, update db
              setUploadedImage(file[0].fileUrl.replace("raw", "thumbnail"));
              void getPaintedPhoto(file[0].fileUrl.replace("raw", "thumbnail"));
            }
          }}
          width="670px"
          height="250px"
        />
      )}

      {uploadedImage && coloredImages && (
        <div className="my-10 flex flex-col sm:flex-row sm:space-x-4">
          <div>
            <h2 className="mb-1 text-center text-lg font-medium">
              Original Photo
            </h2>
            <Image
              alt="original photo"
              src={uploadedImage}
              className="relative rounded-2xl"
              width={475}
              height={475}
            />
          </div>
          <div className="mt-8 sm:mt-0">
            <h2 className="mb-1 text-center text-lg font-medium">
              Colored Photos
            </h2>
            <div className="flex flex-row flex-wrap items-center justify-center gap-5">
              {loading && (
                <div>
                  <LoadingCircle />
                </div>
              )}
              {coloredImages.map((imageUrl) => (
                <a
                  href={imageUrl}
                  key={imageUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    alt="restored photo"
                    src={imageUrl}
                    className="relative mt-2 cursor-zoom-in rounded-2xl sm:mt-0"
                    width={175}
                    height={175}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {uploadedImage && (
        <div>
          <button
            className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
            onClick={() => {
              setColoredImages([]);
              setUploadedImage("");
            }}
          >
            Upload new photo
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
