"use client";
import React from "react";
import { DefaultEditor } from "react-simple-wysiwyg";
import CustomModal from "@/app/ui/modals/CustomModal";
import { HttpPostForm } from "@/app/lib/http";
import Link from "next/link";

const CreateproductCategory = ({
  categories,
  user,
  is_logged,
  is_admin,
}: {
  categories: any;
  user: any;
  is_logged: boolean;
  is_admin: boolean;
}) => {
  const [loading, setLoading] = React.useState<any>(false);
  const [loaded, setLoaded] = React.useState<any>(false);
  const [product, setproduct] = React.useState<any>({ designation: "0" });
  const [description, setContent] = React.useState<any>("");

  const handleInputChange = React.useCallback(
    (e: any) => {
      const name = e.target.name;
      setproduct({ ...product, [name]: e.target.value });
      console.log(name);
    },

    [product]
  );

  const [file, setFile] = React.useState<any>(null);
  const [new_file, setNewFile] = React.useState<any>(0);
  const [preview_image, setPreview] = React.useState<any>(null);
  const handleFileChange = (e: any) => {
    const formData = new FormData();
    const fname = e.target.name;
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
    title: "New product",
  });
  const onHtmlChange = (e: any) => {
    setContent(e.target.value);
    console.log(description);
  };

  const handleSubmit = async () => {
    console.log("SUBMITTING:: ", product);

    setLoading(true);
    setLoaded(false);

    const formData = new FormData();
    formData.append("page", "admin");
    formData.append("title", product?.title);
    formData.append("banner", file);
    formData.append("description", description);
    try {
      const resp = await HttpPostForm(formData, "create_product_category");

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
      }
    } catch (err: any) {
      console.log(err);
      setModal({
        ...modal,
        onopen: true,
        severity: "error",
        message: err.message,
      });
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  };
  return (
    <>
      <div className="dashboard-page-title">
        <div className="breadcrumbs">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/products">Products</Link>
          <span>New Product Category</span>
        </div>
      </div>

      <section className="page-detail-container">
        <div className="py30 px20">
          <div className={`input mb0 spacer ${loading ? "iconed" : ""}`}>
            <label>Category Title</label>
            <input
              type="text"
              className="input-form-control"
              name="title"
              onChange={handleInputChange}
              placeholder={"Category Title "}
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
              <label>Attach Category Banner</label>
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
              placeholder="Category description "
              value={description}
              onChange={onHtmlChange}
            />
          </div>
          <button disabled={loading} onClick={handleSubmit}>
            {loading ? "Working..." : " Add Category"}
          </button>
        </div>

        {modal.onopen && <CustomModal data={modal} />}
      </section>
    </>
  );
};

export default CreateproductCategory;
