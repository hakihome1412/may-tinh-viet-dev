import { Drawer, Tree } from "antd";
import { DataNode } from "antd/es/tree";
import Link from "next/link";
import styled from "styled-components";
import SearchIcon from "../icons/SearchIcon";

const { DirectoryTree } = Tree;

type Props = {
  open: boolean;
  onClose?: () => void;
  dataDemands?: any[];
  dataBrands?: any[];
  onOpenSearch?: () => void;
};

const DirectoryTreeStyled = styled(DirectoryTree)`
  .ant-tree-treenode {
    padding: 8px 0;
    .ant-tree-title {
      color: rgb(100 116 139);
      transition-property: color, background-color, border-color,
        text-decoration-color, fill, stroke, opacity, box-shadow, transform,
        filter, backdrop-filter !important;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
      transition-duration: 150ms !important;
      a {
        color: rgb(100 116 139);
      }
    }
    &:hover {
      .ant-tree-title {
        color: rgb(2 132 199);
        a {
          color: rgb(2 132 199);
        }
      }
    }
  }
`;

export default function Menu({
  open,
  onClose,
  dataDemands,
  dataBrands,
  onOpenSearch,
}: Props) {
  const treeData: DataNode[] = [
    {
      title: (
        <Link href="/" className="uppercase font-semibold text-lg">
          Trang chủ
        </Link>
      ),
      key: "home",
    },
    {
      title: (
        <span className="uppercase font-semibold text-lg">
          Danh mục sản phẩm
        </span>
      ),
      key: "categories",
      children: [
        {
          title: (
            <span className="uppercase font-semibold text-lg">
              Chọn theo sản phẩm
            </span>
          ),
          key: "categories-brand",
          children: dataBrands?.map((item) => ({
            title: (
              <Link
                href={`/shop?brands=${item?.slug}`}
                className="uppercase font-semibold text-lg"
              >
                {item?.name}
              </Link>
            ),
            key: `categories-brand-${item?.slug}`,
          })),
        },
        ...(dataDemands?.map((item) => ({
          title: (
            <Link
              href={`/shop?demands=${item?.slug}`}
              className="uppercase font-semibold text-lg"
            >
              {item?.name}
            </Link>
          ),
          key: `categories-${item?.slug}`,
        })) || []),
      ],
    },
    {
      title: (
        <Link href="/news" className="uppercase font-semibold text-lg">
          Tin tức
        </Link>
      ),
      key: "tin-tuc",
    },
    {
      title: (
        <Link href="/sales" className="uppercase font-semibold text-lg">
          Khuyến mãi
        </Link>
      ),
      key: "khuyen-mai",
    },
    {
      title: (
        <Link href="/sales" className="uppercase font-semibold text-lg">
          Thanh toán
        </Link>
      ),
      key: "hinh-thuc-thanh-toan",
    },
    {
      title: (
        <Link href="/sales" className="uppercase font-semibold text-lg">
          Dịch vụ sửa chữa Macbook
        </Link>
      ),
      key: "dich-vu-sua-chua-macbook",
    },
    {
      title: (
        <Link href="/sales" className="uppercase font-semibold text-lg">
          Liên hệ
        </Link>
      ),
      key: "lien-he",
    },
  ];

  const header = (
    <div className="relative block">
      <input
        placeholder="Tìm sản phẩm ..."
        type="text"
        className="border border-gray-300 w-full rounded-full h-9 pl-12 pr-4 text-sm transition duration-500 placeholder-shown:italic focus-visible:outline-none focus:shadow-md"
        onClick={onOpenSearch}
      />

      <div className="absolute left-4 top-[8px]">
        <SearchIcon className="w-5 h-5 fill-gray-400" />
      </div>
    </div>
  );

  return (
    <Drawer title={header} placement="left" onClose={onClose} open={open}>
      <DirectoryTreeStyled
        showIcon={false}
        treeData={treeData}
        selectedKeys={[]}
      />
    </Drawer>
  );
}
