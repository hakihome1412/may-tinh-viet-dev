import { IMG_FALLBACK } from "@/\bconstants";
import { getImageSanity } from "@/sanity/utils/image-url";
import { Image as ImageAntd } from "antd";
import { CarouselRef } from "antd/es/carousel";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import Carousel from "../../components/carousels/carousel";
import { getAlt } from "@/utils";

const CarouselOneStyled = styled(Carousel)`
  .ant-image-mask {
    &:hover {
      opacity: 0 !important;
    }
  }
  .slick-arrow {
    font-size: 32px;
    opacity: 0;
    transition: opacity 0.3s ease 0s;
    &.slick-prev {
      transition: all 0.3s ease 0s;
      &:hover {
        color: rgb(2 132 199) !important;
      }
    }
    &.slick-next {
      transition: all 0.3s ease 0s;
      &:hover {
        color: rgb(2 132 199) !important;
      }
    }
  }
  &:hover {
    .slick-arrow {
      opacity: 1;
    }
  }
`;

const CarouselTwoStyled = styled(Carousel)`
  .slide-item {
    transition: all 0.1s;
    &:hover {
      border: 1px solid rgb(2 132 199);
    }
    &:focus-visible {
      box-shadow: none;
      border: none !important;
    }
    img {
      opacity: 0.6;
    }
  }
  .slick-current {
    .slide-item {
      border: 1px solid rgb(2 132 199);
      img {
        opacity: 1;
      }
    }
  }
  .slick-arrow {
    width: fit-content !important;
    height: fit-content !important;
    font-size: 24px;
    opacity: 0;
    transition: opacity 0.3s ease 0s;
    &.slick-prev {
      transition: all 0.3s ease 0s;
      &:hover {
        color: rgb(2 132 199) !important;
      }
    }
    &.slick-next {
      transition: all 0.3s ease 0s;
      &:hover {
        color: rgb(2 132 199) !important;
      }
    }
  }
  &:hover {
    .slick-arrow {
      opacity: 1;
    }
  }
`;

function SampleNextArrow({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`w-[60px] h-[60px] text-black text-3xl font-bold flex justify-center items-center z-10 end-0 ${className}`}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`w-[60px] h-[60px] text-black text-3xl font-bold flex justify-center items-center z-10 start-0 ${className}`}
      onClick={onClick}
    />
  );
}

export default function CarouselDetail({ images }: { images: any[] }) {
  const [slide, setSlide] = useState(0);
  const carouselOneRef = useRef<CarouselRef>(null);
  const carouselTwoRef = useRef<CarouselRef>(null);

  const handleBeforeChange = (_: number, next: number) => {
    setSlide(next);
  };

  const handleChange = (index: number) => () => {
    setSlide(index);
  };

  useEffect(() => {
    if (carouselOneRef?.current && carouselTwoRef.current) {
      carouselOneRef?.current?.goTo(slide);
      carouselTwoRef?.current?.goTo(slide);
    }
  }, [slide]);

  return (
    <div>
      <CarouselOneStyled
        ref={carouselOneRef}
        dots={false}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        swipe={false}
        nextArrow={<SampleNextArrow />}
        prevArrow={<SamplePrevArrow />}
        arrows
        beforeChange={handleBeforeChange}
      >
        {images.map((item, index) => (
          <ImageAntd
            src={getImageSanity(item)}
            key={index}
            alt={getAlt()}
            className="w-full"
            fallback={IMG_FALLBACK}
          />
        ))}
      </CarouselOneStyled>

      <div className="mt-4">
        <CarouselTwoStyled
          ref={carouselTwoRef}
          slidesToShow={3}
          dots={false}
          speed={500}
          swipe
          swipeToSlide
          slidesToScroll={1}
          nextArrow={<SampleNextArrow />}
          prevArrow={<SamplePrevArrow />}
          arrows
          centerMode
          beforeChange={handleBeforeChange}
        >
          {images.map((item, index) => (
            <div key={index} className="px-1">
              <div
                className="slide-item p-3 rounded cursor-pointer"
                onClick={handleChange(index)}
              >
                <Image
                  width={500}
                  height={500}
                  src={getImageSanity(item)}
                  alt={getAlt()}
                  className="w-full transition-all hover:-translate-y-1"
                  priority
                />
              </div>
            </div>
          ))}
        </CarouselTwoStyled>
      </div>
    </div>
  );
}
