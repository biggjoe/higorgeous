import { FaBan, FaCogs, FaFolderPlus, FaRegFolder, FaUserSecret } from "react-icons/fa";
import { FaListCheck, FaMoneyBillTransfer } from "react-icons/fa6";

const site_pages: any[] = [
  {
    path: "kindreds",
    title: "Kindreds",
    icon: <FaMoneyBillTransfer />,
    navItem: true,
    data: { mustAuth: true, isAdmin: false, showSideNav: false },
  },
  {
    path: "quarters",
    title: "Quarters",
    icon: <FaMoneyBillTransfer />,
    navItem: true,
    data: { mustAuth: true, isAdmin: false, showSideNav: false },
  },
  {
    path: "history",
    title: "History",
    icon: <FaMoneyBillTransfer />,
    navItem: true,
    data: { mustAuth: true, isAdmin: false, showSideNav: false },
  },
  {
    path: "nze",
    title: "Ndi Nze",
    icon: <FaMoneyBillTransfer />,
    navItem: true,
    data: { mustAuth: true, isAdmin: false, showSideNav: false },
  },
  {
    path: "ichie-eboani",
    title: "Ichie Eboani",
    icon: <FaBan />,
    navItem: true,
    data: { mustAuth: true, isAdmin: false, showSideNav: false },
  },
  {
    path: "ichie-dimechem",
    title: "Ichie Dimechem",
    icon: <FaUserSecret />,
    navItem: true,
    data: { mustAuth: true, isAdmin: false, showSideNav: false },
  },
  {
    path: "ichie-diokwu",
    title: "Ichie Diokwu",
    icon: <FaListCheck />,
    navItem: true,
    data: { mustAuth: true, isAdmin: false, showSideNav: false },
  },

  {
    path: "chairman",
    title: "Our Chairman",
    icon: <FaFolderPlus />,
    navItem: true,
    data: { mustAuth: true, isAdmin: false, showSideNav: false },
  },
  {
    path: "past-leaders",
    title: "Past Leaders",
    icon: <FaRegFolder />,
    navItem: true,
    data: { mustAuth: true, isAdmin: false, showSideNav: false },
  },
  {
    path: "executives",
    title: "Executives",
    icon: <FaCogs />,
    navItem: true,
    data: { mustAuth: true, isAdmin: false, showSideNav: false },
  },
  {
    path: "privacy-policy",
    title: "Privacy Policy",
    icon: <FaCogs />,
    navItem: true,
    data: { mustAuth: true, isAdmin: false, showSideNav: false },
  },
  {
    path: "constitution",
    title: "Constitution",
    icon: <FaCogs />,
    navItem: true,
    data: { mustAuth: true, isAdmin: false, showSideNav: false },
  },
  {
    path: "committees",
    title: "Committees",
    icon: <FaCogs />,
    navItem: true,
    data: { mustAuth: true, isAdmin: false, showSideNav: false },
  },
  {
    path: "faq",
    title: "FAQ",
    icon: <FaCogs />,
    navItem: true,
    data: { mustAuth: true, isAdmin: false, showSideNav: false },
  },
];
export default site_pages;
