interface ImageProps {
  src: string;
  alt: string;
}

const Image = ({ src, alt }: ImageProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="relative pb-2/3">
        <img
          className="absolute h-full w-full object-cover"
          src={src}
          alt={alt}
        />
      </div>
    </div>
  );
};

export default Image;
