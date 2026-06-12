"use client";
import React from "react";
import { DefaultEditor } from "react-simple-wysiwyg";
import CustomModal from "@/app/ui/modals/CustomModal";
import { HttpPostForm } from "@/app/lib/http";
import { useRouter } from "next/navigation";

//
export default function EditTerms({
  page,
  user,
  is_logged,
  members,
  loaded_members,
  is_admin,
}: {
  page: any;
  user: any;
  is_logged: boolean;
  members?: any;
  loaded_members?: any;
  is_admin: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = React.useState<any>(false);
  const  [loaded, setLoaded] = React.useState<any>(false);
  const  [post, setPost] = React.useState<any>(null);
  const [titles, setTitles] = React.useState<any>("");
  const [title, setTitle] = React.useState<any>("");
  const [meta_keyword, setMetaKeyword] = React.useState<any>("");
  const [slug, setSlug] = React.useState<any>("");
  const [meta, setMeta] = React.useState<any>("");
  const [description, setDesc] = React.useState<any>("");
  const [content, setContent] = React.useState<any>("");
  const [id, setId] = React.useState<any>(0);
  const [user_id, setUserId] = React.useState<any>(null);
  const [page_user, setUser] = React.useState<any>(null);
  const [selected_member, setSelected] = React.useState<any>(null);
  console.log(page);
  /*  */
  React.useEffect(() => {
    setLoaded(page ? true : false);
    setUserId(page.user_id ? page.user_id : 0);
    setTitle(page.title ? page.title : "");
    setTitles(page.titles ? page.titles : "");
    setDesc(page.description ? page.description : "");
    setUserId(page.user_id ? page.user_id : null);
    setMetaKeyword(page.meta_keyword ? page.meta_keyword : "");
    setSlug(page.slug ? page.slug : "");
    setId(page.id ? page.id : 0);
    setUser(page.user ? page.user : null);
    setSelected(page.user ? page.user : null);
    setPreview(
      page.picture ? process.env.NEXT_PUBLIC_SERVER_ROOT + page.picture : ""
    );
    setPost(page);
  }, []);

  const [file, setFile] = React.useState<any>(null);
  const [new_file, setNewFile] = React.useState<any>(0);
  const [preview_image, setPreview] = React.useState<any>(null);
  const handleFileChange = (e: any) => {
    const formData = new FormData();
    const fname = e.target.title;
    const flx = e.target.files[0];
    formData.append("file", flx);
    console.log(flx, formData);
    setFile(flx);
    console.log(flx);
    setPreview(URL.createObjectURL(flx)); // Would see a path?
    setNewFile(1);
  };
  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };
  const [modal, setModal] = React.useState<any>({
    onopen: false,
    onclose: closeModal,
    title: "Edit post",
  });

  const handleSubmit = async () => {
    console.log("SUBMITTING", new_file, file);
    const formData = new FormData();
    formData.append("page", "admin");
    formData.append("id", id);
    formData.append("user_id", user_id);
    
    formData.append("banner", file);
    formData.append("description", description);
    formData.append("meta_keyword", meta_keyword);
    formData.append("slug", slug);
    formData.append("user", JSON.stringify(page_user));
    formData.append("picture", file);
    //setMeta({ ...post, picture: file });
    console.log("post::", post);
    //return;
    setLoading(true);
    try {
      const resp = await HttpPostForm(formData, "edit_page");
      console.log(resp);
      confirm_post(resp);
    } catch (error: any) {
      setModal({
        ...modal,
        onopen: true,
        message: error.message,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const confirm_post = (resp: any) => {
    console.log(resp);
    const severity =
      resp.status === 1
        ? "success"
        : resp.status === 0
        ? "error"
        : resp.status === 44
        ? "error"
        : "info";
    setModal({
      ...modal,
      onopen: true,
      message: resp.message,
      severity: severity,
    });
    if (resp.status === 1) {
      router.push(`/admin/privacy-policy`);
    }
  };

  const onHtmlChange = (e: any) => {
    setDesc(e.target.value);
    //setPost({ ...post, description: e.target.value });
  };

  React.useEffect(() => {
    setContent(post?.content);
  }, [post]);
  return (
    <div className="px0">
      <div className={`input mb0 spacer ${loading ? "iconed" : ""}`}>
        <label>Page Title</label>
        <input
          type="text"
          className="input-form-control"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={"Page Title"}
        />
      </div>

      <div className={`input mb0 spacer ${loading ? "iconed" : ""}`}>
        <label>Page Slug</label>
        <input
          type="text"
          className="input-form-control"
          name="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder={"Page Slug "}
        />
      </div>

      <div className="banner-section">
        {preview_image && (
          <div className="image_preview">
            <img className="" src={preview_image} alt="preview Image" />
          </div>
        )}
        <div
          className={
            loading ? " input mb0 iconed mt20 pt10" : " input mb0 mt20 pt10"
          }
        >
          <label>Constitution's Banner Picture</label>
          <input
            type="file"
            className="form-control"
            name="file"
            onChange={handleFileChange}
            placeholder={"picture"}
          />
        </div>
      </div>

      <div className="mb10">
        <DefaultEditor
          className="form-control"
          placeholder="Constitution Body"
          value={description}
          onChange={onHtmlChange}
        />
      </div>

      <div className={`input mb0 spacer ${loading ? "iconed" : ""}`}>
        <label>Meta Keyword</label>
        <textarea
          className="input-form-control"
          name="meta_keyword"
          defaultValue={meta_keyword}
          onChange={(e) => setMetaKeyword(e.target.value)}
          placeholder={"Meta Keyword"}
        />
      </div>

      <button
        type="submit"
        className="btn btn-medium"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Working..." : " Edit Policy"}
      </button>
      {modal.onopen && <CustomModal data={modal} />}
    </div>
  );
}
