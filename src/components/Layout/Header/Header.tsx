import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="absolute z-30 w-full flex items-center  px-[10%] xl:h-[90px]">
      <div className="">
        <div className="flex flex-col justify-between items-center xl:flex-row">
          <Link href={"/"}>
            <Image
              className="ml-[-18px]"
              src={"/images/logo.png"}
              width={220}
              height={48}
              alt=""
              priority
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
