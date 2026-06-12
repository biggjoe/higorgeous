import { getCookie } from "@/app/lib/auth_base/cookie_auth";
import LogOut from "@/app/ui/logout";
import Link from "next/link";

import {
  FaCalendarAlt,
  FaCogs,
  FaEdit,
  FaHandshake,
  FaImages,
  FaInfoCircle,
  FaPen,
  FaPenAlt,
  FaQuestionCircle,
  FaUserSecret,
} from "react-icons/fa";
import {
  FaBan,
  FaBook,
  FaCalendar,
  FaCartShopping,
  FaCloudversify,
  FaInfo,
  FaMoneyBill,
  FaRegImages,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa6";

export async function generateMetadata() {
  return {
    title: `Admin`,
    description: `All Admin`, // meta description
  };
} /**/
export default async function Page() {
  
    const user = await getCookie("user");
  const page = "/admin/";
  const admin_pages: any[] = [
    {
      path: "about",
      title: "About Us",
      icon: <FaInfoCircle />,
    },
    {
      path: "products",
      title: "Products",
      icon: <FaCartShopping />,
    },
    {
      path: "privacy-policy",
      title: "Privacy Policy",
      icon: <FaUserSecret />,
    },
    {
      path: "terms",
      title: "Terms & Conditions",
      icon: <FaHandshake />,
    },
    {
      path: "faq",
      title: "FAQ",
      icon: <FaQuestionCircle />,
    },
    {
      path: "change-password",
      title: "Change Password",
      icon: <FaCogs />,
    },
  ];
  return (
    <>
      <div className="dashboard-container">
        <div className="list">
          {admin_pages.map((item: any, index) => (
            <Link
              href={`${page}${item.path}`}
              className="list-item br-5 flex flex-row align-items-center"
              key={item.path}
            >
              <span className="p0" style={{ fontSize: "25px" }}>
                {item.icon}
              </span>
              <span className="spacer ml10">{item.title}</span>
              <span className="p0">
                <FaPen />
              </span>
            </Link>
          ))}
          {user?.role==="admin" && (
            <Link
              href={`/admin/accounts`}
              className="list-item br-5 flex flex-row align-items-center"
            >
              <span className="p0" style={{ fontSize: "25px" }}>
        <FaUserPlus/>
              </span>
              <span className="spacer ml10">Accounts</span>
              <span className="p0">
                <FaPen />
              </span>
            </Link>
          )}
          <LogOut class_name="list-item br-5 flex flex-row align-items-center" />
        </div>
      </div>
    </>
  );
}
