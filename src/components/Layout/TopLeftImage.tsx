import Image from "next/image";

export default function TopLeftImg() {
  return (
    <div className="absolute left-0 top-0 mix-blend-color-dodge z-10 opacity-50 w-[400px] xl:w-[600px]">
      <Image
        src="/images/top-left-img.png"
        width={600}
        height={600}
        alt="left-top-image"
      />
    </div>
  );
}
