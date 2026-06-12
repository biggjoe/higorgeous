"use client";
import React from "react";

import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { FaShare } from "react-icons/fa6";
import { postShare } from "../lib/postData";

const ShareTemplate = (props: any) => {
  const { item, item_label, is_white } = props;
  const [shares, setShares] = React.useState(item.share_num);

  const setShare = (res: any) => {
    if (res.status === 1) {
      setShares(shares + 1);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<any>();

  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const handleClick =
    (newPlacement: any) => (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };
  const handleClose = (event: Event | React.SyntheticEvent) => {
    setOpen(false);
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
    setAnchorEl(null);
  };

  const shareUrl = process.env.NEXT_PUBLIC_API_DOMAIN + item.url;
  return (
    <React.Fragment>
      <span className="pl0">
        <span className="px5">
          <TwitterShareButton
            url={shareUrl}
            title={item.title}
            onShareWindowClose={async () => {
              const share_res = await postShare({
                label: item_label,
                item_id: item.id,
                platform: "twitter",
              });
              setShare(share_res);
            }}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </span>

        <span className="px5">
          <FacebookShareButton
            className={"react-btn"}
            url={shareUrl}
            hashtag={"#item"}
            //quote={item.title}
            title={item.title}
            onShareWindowClose={async () => {
              const share_res = await postShare({
                label: item_label,
                item_id: item.id,
                platform: "facebook",
              });
              setShare(share_res);
            }}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </span>

        <span className="px5">
          <WhatsappShareButton
            className={"react-btn"}
            url={shareUrl}
            title={item.title}
            onShareWindowClose={async () => {
              const share_res = await postShare({
                label: item_label,
                item_id: item.id,
                platform: "whatsapp",
              });
              setShare(share_res);
            }}
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </span>

        <span className="px5">
          <LinkedinShareButton
            url={shareUrl}
            title={item.title}
            className="react-btn"
            onShareWindowClose={async () => {
              const share_res = await postShare({
                label: item_label,
                item_id: item.id,
                platform: "linkedin",
              });
              setShare(share_res);
            }}
          >
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </span>

        <button className="btn btn-icon" onClick={handleClick("top")}>
          <FaShare
            className={"react-icon"}
            style={{ color: is_white ? "#fff" : "#444" }}
          />
        </button>

        <span
          className="count-span"
          style={{ color: is_white ? "#fff" : "#444" }}
        >
          {shares}
        </span>
      </span>
    </React.Fragment>
  );
};

const paper = {
  content: '""',
  display: "block",
  position: "absolute",
  top: "calc(100% - 5px)",
  right: "45%",
  width: 12,
  height: 12,
  bgcolor: "#ddd",
  transform: "translateY(-5%) rotate(45deg)",
  zIndex: 0,
};

export default React.memo(ShareTemplate);
