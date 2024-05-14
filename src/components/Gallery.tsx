import Image from "./Image";

export interface GalleryProps {
  mainImage: string;
  images: string[];
}
export function Gallery({ mainImage, images }: GalleryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full ">
      <div>
        <Image src={mainImage} alt="" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
        {images.map((image) => (
          <div>
            <Image src={image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
