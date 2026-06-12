"use client";
import React from "react";
import { DefaultEditor } from "react-simple-wysiwyg";
import HttpPost, { HttpPostForm } from "@/app/lib/http";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import CustomModal from "@/app/ui/modals/CustomModal";

const CreateProduct = ({
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
  const router = useRouter();
  const [loading, setLoading] = React.useState<any>(false);
  const [loaded, setLoaded] = React.useState<any>(false);
  const [product, setProduct] = React.useState<any>({});
  const [description, setDesc] = React.useState<any>("");
  const [direction, setDir] = React.useState<any>("");
  const [innovation, setInn] = React.useState<any>("");
  const [ingredients, setIng] = React.useState<any>("");
  const closeOpts = () => setOptModal({ ...opts, onopen: false });
  const [opts, setOptModal] = React.useState<any>({
    onopen: false,
    onclose: closeOpts,
  });

  const handleInputChange = (e: any) => {
    const name = e.target.name;
    setMeta({ ...meta, [name]: e.target.value });
    console.log(name, e.target.value);
  };

  const [file, setFile] = React.useState<any>(null);
  const [new_file, setNewFile] = React.useState<any>(0);
  const [preview_image, setPreview] = React.useState<any>(null);
  const [barcode_image, setBarcodeImage] = React.useState<any>(null);
  const [preview_barcode, setBarcodePreview] = React.useState<any>(null);
  
    const [new_barcode_image, setNewBarcodeImage] = React.useState<any>(0);


  //
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

  //
  
  ///
  const handleBarChange = (e: any) => {
    const formData = new FormData();
    const fname = e.target.title;
    const flx = e.target.files[0];
    formData.append("barcode", flx);
    console.log(flx, formData);
    setBarcodeImage(flx);
    console.log(flx);
    setBarcodePreview(URL.createObjectURL(flx)); // Would see a path?
    setNewBarcodeImage(1)
  };
  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };
  const [modal, setModal] = React.useState<any>({
    onopen: false,
    onclose: closeModal,
    title: "New product",
  });

  const [meta, setMeta] = React.useState<any>(null);
  const onHtmlChange = (e: any, mode: string) => {
    if (mode === "description") {
      setDesc(e.target.value);
    } else if (mode === "innovation") {
      setInn(e.target.value);
    } else if (mode === "direction") {
      setDir(e.target.value);
    } else if (mode === "ingredients") {
      setIng(e.target.value);
    }
    setMeta({ ...meta, [mode]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log("SUBMITTING:: meta::", meta);

    setLoading(true);
    setLoaded(false);

    const formData = new FormData();
    formData.append("page", "admin");
    formData.append("title", meta?.title);
    formData.append("sub_title", meta?.sub_title);
    formData.append("category_id", meta?.category_id);
    formData.append("barcode_id", meta?.barcode_id);
    formData.append("banner", file);
    formData.append("description", meta?.description);
    formData.append("direction", meta?.direction);
    formData.append("ingredients", meta?.ingredients);
    formData.append("innovation", meta?.innovation);
    formData.append("new_file", new_file);
    formData.append("barcode_image", barcode_image);
    formData.append("new_barcode_image", new_barcode_image);
    const raw = Object.fromEntries(formData.entries());
    try {
      const resp = await HttpPostForm(formData, "create_product");
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
        router.push(`/admin/products`);
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
          <span>New product</span>
        </div>
      </div>

      <section className="page-detail-container">
        <div className="py30 px20">
          <div className={`input  spacer ${loading ? "iconed" : ""}`}>
            <label>Product Title</label>
            <input
              type="text"
              className="input-form-control"
              name="title"
              onChange={handleInputChange}
              placeholder={"Product Title "}
            />
          </div>

          <div className={`input  spacer ${loading ? "iconed" : ""}`}>
            <label>Product Sub Title</label>
            <input
              type="text"
              className="input-form-control"
              name="sub_title"
              onChange={handleInputChange}
              placeholder={"Product Sub Title "}
            />
          </div>

          <div className={`input  spacer`}>
            <label className="textfeld-control">
              {"Product Category"}
              <sup className="boldest red" title="This field is required!">
                *
              </sup>
            </label>
            <select
            title="Category"
              className={" input-form-control "}
              name={"category_id"}
              required
              onChange={handleInputChange}
            >
              <option value="">Select Product Category...</option>
              {categories.map((item: any) => (
                <option value={item.id} key={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          <div className="banner-section">
            {preview_image && (
              <div className="image_preview">
                <img className="" src={preview_image} alt="preview Image" />
              </div>
            )}
            <div
              className={
                loading ? " input iconed mt20 pt10" : " input  mt20 pt10"
              }
            >
              <label>Attach product's Banner</label>
              <input
                type="file"
                className="form-control"
                name="file"
                onChange={handleFileChange}
                placeholder={"picture"}
              />
            </div>
          </div>




          
            <div className={`input mb10 spacer ${loading ? "iconed" : ""}`}>
              <label>Barcode</label>
              <input
                type="text"
                className="input-form-control"
                name="barcode_id"
                 onChange={handleInputChange}
                placeholder={"Product Barcode Number"}
              />
            </div>

            <div className="banner-section mt20">
              {preview_barcode && (
                <div className="barcode_preview">
                  <img className="" src={preview_barcode} alt="preview Image" />
                </div>
              )}
              <div className={"input my20"}>
                <label>Attach Product Barcode</label>
                <input
                  type="file"
                  className="form-control"
                  name="barcode"
                  onChange={handleBarChange}
                  placeholder={"barcode"}
                />
              </div>
            </div>


          <div className="mb10 mt20">
            <DefaultEditor
              className="form-control"
              placeholder="Product Description"
              value={description}
              onChange={(e) => onHtmlChange(e, "description")}
            />
          </div>

          <div className="mb10">
            <DefaultEditor
              className="form-control"
              placeholder="Direction For Use"
              value={direction}
              onChange={(e) => onHtmlChange(e, "direction")}
            />
          </div>
          <div className="mb10">
            <DefaultEditor
              className="form-control"
              placeholder="Ingredients"
              value={ingredients}
              onChange={(e) => onHtmlChange(e, "ingredients")}
            />
          </div>
          <div className="mb10">
            <DefaultEditor
              className="form-control"
              placeholder="Innovation"
              value={innovation}
              onChange={(e) => onHtmlChange(e, "innovation")}
            />
          </div>

          <button className="btn" type="submit" disabled={loading} onClick={handleSubmit}>
            {loading ? "Working..." : " Add product"}
          </button>
        </div>
      </section>
      {modal.onopen && <CustomModal data={modal} />}
    </>
  );
};

export default CreateProduct;
