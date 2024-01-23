import Link from "next/link";
import OptionItem from "./option-item";
import ButtonSubmitAddCart from "./button-submit-add-cart";
import ButtonContactCallback from "./button-contact-callback";
import { addToCart } from "./actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Options({
  items,
  onSelect,
  selectedOption,
  dataProduct,
  dataFilterAdvanced,
}: {
  items: any[];
  selectedOption: any;
  dataProduct: any;
  dataFilterAdvanced: any[];
  onSelect: (option: any) => void;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const dataKeywords: {
    path: string;
    name: string;
  }[] = [];

  const arrKeysFilterAdvanced = Object.keys(
    selectedOption?.filter_advanced || {}
  );

  const handleSelect = (item: any) => {
    onSelect(item);
  };

  if (dataProduct?.brand?.id) {
    dataKeywords.push({
      path: `/shop?brands=${dataProduct?.brand?.slug}`,
      name: dataProduct?.brand?.name,
    });
  }

  if (dataProduct?.demands?.length > 0) {
    dataProduct?.demands?.forEach((item: any) => {
      dataKeywords.push({
        path: `/shop?demands=${item?.slug}`,
        name: item?.name,
      });
    });
  }

  if (arrKeysFilterAdvanced.length > 0) {
    arrKeysFilterAdvanced.forEach((key) => {
      const itemFind = dataFilterAdvanced?.find((it: any) => it?.slug === key);
      const itemOptionFind = itemFind?.options?.find(
        (it: any) => it?.slug === selectedOption?.filter_advanced?.[key]
      );

      dataKeywords.push({
        path: `/shop?${key}=${selectedOption?.filter_advanced?.[key]}`,
        name: itemOptionFind?.name,
      });
    });
  }

  const handleAddCart = async () => {
    setLoading(true);
    await addToCart({
      dataProduct,
      selectedOption,
    });

    setLoading(false);
    router.refresh();
  };

  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <OptionItem
            key={item.id}
            item={item}
            onClick={handleSelect}
            checked={selectedOption?.id === item?.id}
          />
        ))}
      </div>

      <ButtonSubmitAddCart loading={loading} onClick={handleAddCart} />

      <ButtonContactCallback
        product={{
          image: dataProduct?.images?.main_images?.[0],
          short_configuration: selectedOption?.short_configuration,
          name: dataProduct?.name,
          price: selectedOption?.price,
        }}
      />

      <div className="text-sm">
        <div className="border-t border-dashed border-gray-300 py-1">
          <p>Mã: {dataProduct?.code}</p>
        </div>

        <div className="border-t border-dashed border-gray-300 py-1">
          <p>
            Danh mục:{" "}
            <Link
              className="text-sky-600"
              href={`/shop?brands=${dataProduct?.brand?.slug}`}
            >
              {dataProduct?.brand?.name}
            </Link>
          </p>
        </div>

        <div className="border-t border-dashed border-gray-300 py-1">
          <p>
            Từ khoá:{" "}
            {dataKeywords.map((item, index) => (
              <span key={item.path}>
                <Link className="text-sky-600" href={item.path}>
                  {item.name}
                </Link>

                {index < dataKeywords.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
