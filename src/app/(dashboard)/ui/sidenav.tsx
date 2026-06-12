"use client";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaChevronCircleDown,
  FaCogs,
  FaHome,
  FaImages,
  FaUserSecret,
} from "react-icons/fa";
import {
  FaBan,
  FaBook,
  FaFolderPlus,
  FaInfo,
  FaListCheck,
  FaMoneyBill,
  FaMoneyBillTransfer,
  FaPagelines,
  FaRegFolder,
  FaUsers,
} from "react-icons/fa6";
import site_pages from "./pages";

export default function SideNav({ page, togMore }: { page: string; togMore: any }) {
  const admin_pages: any[] = [
    {
      path: "/",
      title: "Dashboard ",
      navItem: true,
      icon: <FaPagelines />,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    },
    {
      path: "pages",
      title: "Site Pages",
      icon: <FaInfo />,
      navItem: true,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
      pages: site_pages,
    },
    {
      path: "gallery",
      title: "Gallery",
      icon: <FaImages />,
      navItem: true,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    },
    {
      path: "members",
      title: "Members",
      icon: <FaUsers />,
      navItem: true,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    },
    {
      path: "financials",
      title: "Financials",
      icon: <FaMoneyBill />,
      navItem: true,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    } /* */,
    {
      path: "events",
      title: "Events",
      icon: <FaCalendarAlt />,
      navItem: true,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    },
    {
      path: "articles",
      title: "Articles",
      icon: <FaBook />,
      navItem: true,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    },
    {
      path: "levies",
      title: "Levies",
      icon: <FaMoneyBillTransfer />,
      navItem: true,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    },
    {
      path: "penalties",
      title: "Penalties",
      icon: <FaBan />,
      navItem: true,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    },
    {
      path: "non-indigenes",
      title: "Non Indigenes",
      icon: <FaUserSecret />,
      navItem: true,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    },
    {
      path: "transactions",
      title: "Transactions",
      icon: <FaListCheck />,
      navItem: true,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    },

    {
      path: "cases",
      title: "Cases",
      icon: <FaFolderPlus />,
      navItem: true,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    },
    {
      path: "records",
      title: "Records",
      icon: <FaRegFolder />,
      navItem: true,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    },
    {
      path: "site-settings",
      title: "Settings",
      icon: <FaCogs />,
      navItem: true,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    },
  ];

  return (
    <div className="side-navgation">
      <ul>
        {admin_pages.map(
          (item: any, index: number) =>
            item.path !== "" &&
            item.navItem &&
            item.path !== "*" && (
              <li key={item.path}>
                <Link href={`${page}${item.path}`}>{item.title}</Link>

                {item.pages && (
                  <ul id={`more_${index}`} className={`more_list`}>
                    {item.pages.map((itm: any) => (
                      <li key={itm.path}>
                        <Link href={`${page}pages/${itm.path}`}>
                          {itm.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {item.pages && (
                  <Link
                    href="#"
                    className="toggle-span"
                    onClick={() => togMore(index)}
                  >
                    <FaChevronCircleDown />
                  </Link>
                )}
              </li>
            )
        )}
      </ul>
    </div>
  );
}
