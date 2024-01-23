import Link from "next/link";

export default function TitleLineHome({
  brands,
  item,
}: {
  brands: any[];
  item: any;
}) {
  return (
    <div className={`${brands.length > 0 ? "mb-16" : ""} md:mb-4`}>
      <div className="relative border-b-[2px] border-solid border-primary block rounded-bl-[5px]">
        <h2 className="m-0 leading-[20px] inline-block uppercase before:content-['❖'] before:absolute before:inline-block before:w-[40px] before:text-center before:text-[30px] before:leading-[40px] before:bg-black before:text-white before:rounded-tl-[5px] before:rounded-bl-[5px] before:border-r before:border-solid before:border-r-white w-[100%] md:w-[30%]">
          <span className="mt-0 mr-0 mb-0 ml-[41px] bg-primary px-[20px] text-white font-semibold relative inline-block leading-[20px] uppercase after:content-[''] after:w-0 after:h-0 after:border-t-[40px] after:border-solid after:border-t-transparent after:border-l-[20px] after:border-l-primary after:border-b-0 after:border-r-0 after:absolute after:top-0 after:right-[-20px] text-sm md:text-lg py-[10px] md:py-[6px]">
            {item.name}
          </span>
        </h2>

        <div
          className={`flex item-center gap-2 absolute overflow-x-auto px-1 pb-1 max-w-[calc(100vw-16px)] md:pb-0 md:px-0 md:left-auto md:right-0  ${
            brands.length > 0 ? "top-12" : ""
          } md:top-2`}
        >
          {brands.map((itemBrand: any) => (
            <Link
              href={{
                pathname: "/shop",
                query: {
                  brands: itemBrand.slug,
                },
              }}
              key={itemBrand.id}
            >
              <div className="transition duration-200 text-xs font-semibold text-primary uppercase border border-primary rounded-full py-1 px-2 hover:bg-primary hover:border-primary hover:text-white">
                {itemBrand.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
