import Link from "next/link";
import Container from "./layouts/container";
import Image from "next/image";
import VisaIcon from "./icons/VisaIcon";
import MasterCardIcon from "./icons/MasterCardIcon";

export default function Footer() {
  return (
    <>
      <div className="border-t border-t-gray-200 p-4 bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Thời gian làm việc */}
            <div>
              <div className="text-sky-600 uppercase font-semibold border-b-2 border-b-sky-600 py-1">
                THỜI GIAN LÀM VIỆC
              </div>
              <div className="py-3">
                <p className="font-semibold text-sm">
                  Kinh Doanh: Thứ 2 - Chủ Nhật
                </p>

                <ul className="list-disc list-inside text-sm font-light space-y-1 mt-1">
                  <li>Thứ 2 – Thứ 7: 08:00 – 20:30</li>
                  <li>Chủ Nhật: 09:00 – 16:00</li>
                </ul>
              </div>

              <div className="py-3">
                <p className="font-semibold text-sm">Bảo Hành: Thứ 2 – Thứ 7</p>

                <ul className="list-disc list-inside text-sm font-light space-y-1 mt-1">
                  <li>Sáng: 08:30 – 12:00</li>
                  <li>Chiều: 13:30 – 18:00</li>
                </ul>
              </div>
            </div>

            {/* Thông tin liên hệ */}
            <div>
              <div className="text-sky-600 uppercase font-semibold border-b-2 border-b-sky-600 py-1">
                THÔNG TIN LIÊN HỆ
              </div>

              <div className="py-3">
                <p className="text-sm font-light">
                  <span className="font-semibold">Showroom: </span>123 ABC, ABC,
                  ABC.
                </p>

                <div className="mt-5 space-y-1">
                  <p className="text-sm font-light">
                    <span className="font-semibold">Kinh doanh 01: </span>0999
                    999 999
                  </p>
                  <p className="text-sm font-light">
                    <span className="font-semibold">Kinh doanh 02: </span>0999
                    999 999
                  </p>
                  <p className="text-sm font-light">
                    <span className="font-semibold">Kỹ Thuật: </span>0999 999
                    999
                  </p>
                </div>
              </div>
            </div>

            {/* Thông tin bổ sung */}
            <div className="flex flex-col">
              <div className="text-sky-600 uppercase font-semibold border-b-2 border-b-sky-600 py-1">
                THÔNG TIN BỔ SUNG
              </div>
              <ul className="list-disc list-inside text-sm font-light space-y-1 mt-3">
                <li>
                  <Link href="/" className="duration-200 hover:text-sky-600">
                    Phương thức Thanh Toán
                  </Link>
                </li>
                <li>
                  <Link href="/" className="duration-200 hover:text-sky-600">
                    Chính sách Bảo Mật Thông Tin
                  </Link>
                </li>
                <li>
                  <Link href="/" className="duration-200 hover:text-sky-600">
                    Quy Định Bảo Hành
                  </Link>
                </li>
                <li>
                  <Link href="/" className="duration-200 hover:text-sky-600">
                    Chính sách Vận Chuyển
                  </Link>
                </li>
                <li>
                  <Link href="/" className="duration-200 hover:text-sky-600">
                    Chính Đổi Trả & Hoàn Tiền
                  </Link>
                </li>

                <li>
                  <Link href="/" className="duration-200 hover:text-sky-600">
                    Chính Xử Lý Khiếu Nại
                  </Link>
                </li>
              </ul>

              <Link href="/" className="w-fit">
                <Image
                  priority
                  width={500}
                  height={500}
                  src="/dmca.png"
                  className="w-[140px] h-10 mt-2"
                  alt="dcma"
                />
              </Link>
            </div>

            {/* Thông tin bộ công thương */}
            <div className="flex flex-col">
              <div className="text-sky-600 uppercase font-semibold border-b-2 border-b-sky-600 py-1">
                THÔNG TIN BỘ CÔNG THƯƠNG
              </div>
              <ul className="list-disc list-inside text-sm font-light space-y-1 mt-3">
                <li>Công Ty TNHH Thương Mại – Dịch Vụ Máy Tính Việt</li>
                <li>
                  <Link href="/" className="duration-200 hover:text-sky-600">
                    MST/ĐKKD/QĐTL: 9999999999
                  </Link>
                </li>
                <li>
                  <Link href="/" className="duration-200 hover:text-sky-600">
                    Trụ sở: 123 ABC, ABC, ABC.
                  </Link>
                </li>
                <li>
                  <Link href="/" className="duration-200 hover:text-sky-600">
                    Điện thoại: 0999 999 999
                  </Link>
                </li>
              </ul>
              <Link href="/" className="w-fit">
                <Image
                  priority
                  width={500}
                  height={500}
                  src="https://static.hungphatlaptop.com/wp-content/uploads/2021/09/logoBCT.png.webp"
                  className="w-[160px] h-15 mt-2"
                  alt="dcma"
                />
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-black py-8">
        <Container>
          <div className="flex items-center justify-between flex-col-reverse gap-4 md:flex-row">
            <span className="text-white text-sm">
              Mọi bản quyền thuộc về{" "}
              <span className="font-semibold">Máy Tính Việt</span> © 2024
            </span>

            <div className="flex items-center gap-3">
              <VisaIcon className="h-5 w-auto transition duration-300 fill-gray-400 hover:fill-white" />

              <MasterCardIcon className="h-5 w-auto transition duration-300 fill-gray-400 hover:fill-white" />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
