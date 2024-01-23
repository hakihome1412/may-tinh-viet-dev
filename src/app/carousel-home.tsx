import { Carousel } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function CarouselHome() {
  return (
    <Carousel autoplay className="h-full">
      <div>
        <Link href="/abc">
          <Image
            priority
            width={500}
            height={500}
            src="https://hungphatlaptop.com/wp-content/uploads/2022/08/Home-Banner-ALIENWARE-X17-R2-2022.jpg"
            alt="banner1"
            className="h-full w-full rounded-md"
          />
        </Link>
      </div>

      <div>
        <Link href="/abc">
          <Image
            priority
            width={500}
            height={500}
            src="https://hungphatlaptop.com/wp-content/uploads/2022/12/Banner-Dell-XPS-Plus-9320.jpg"
            alt="banner2"
            className="h-full w-full rounded-md"
          />
        </Link>
      </div>
    </Carousel>
  );
}
