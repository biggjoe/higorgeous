"use client";
import React from "react";
import { DefaultEditor } from "react-simple-wysiwyg";
import CustomModal from "@/app/ui/modals/CustomModal";
import Link from "next/link";
import { HttpPostForm } from "@/app/lib/http";
import { useRouter } from "next/navigation";
const EditProduct = ({
  product,
  user,
  is_logged,
  categories,
}: {
  product: any;
  user: any;
  is_logged: boolean;
  categories: any;
}) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<any>(false);
  const [loaded, setLoaded] = React.useState<any>(false);
  const [post, setPost] = React.useState<any>(product);

  const [title, setTitle] = React.useState<any>("");
  const [sub_title, setSubTitle] = React.useState<any>("");
  const [meta, setMeta] = React.useState<any>("");
  const [description, setDesc] = React.useState<any>("");
  const [direction, setDir] = React.useState<any>("");
  const [innovation, setInn] = React.useState<any>("");
  const [ingredients, setIng] = React.useState<any>("");
  const [id, setId] = React.useState<any>(0);
   const [is_published, setIsPublished] = React.useState<any>("");
  const [category_id, setCategoryId] = React.useState<any>("");
  const [barcode_id, setBarcodeId] = React.useState<any>("");

  React.useEffect(() => {
    setLoaded(product ? true : false);
    setMeta({ ...product });
    setCategoryId(product?.category_id);
    setTitle(product?.title);
    setSubTitle(product?.sub_title);
    setDesc(product?.description);
    setDir(product?.direction);
    setIng(product?.ingredients);
    setInn(product?.innovation);
    setId(product?.id);
    setIsPublished(product?.is_published);
    setBarcodeId(product?.barcode);
    setPreview(process.env.NEXT_PUBLIC_SERVER_ROOT + product?.picture);
    setBarcodePreview(
      process.env.NEXT_PUBLIC_SERVER_ROOT + product?.barcode_image
    );
  }, []);

  const handleInputChange = React.useCallback(
    (e: any) => {
      console.log(e.target);
      const name = e.target.title;
      setPost({ ...post, [name]: e.target.value });
    },
    [post]
  );

  const [file, setFile] = React.useState<any>(null);
  const [barcode, setBarcode] = React.useState<any>(null);
  const [barcode_image, setBarcodeImage] = React.useState<any>(null);
  const [new_file, setNewFile] = React.useState<any>(0);
  const [new_barcode_image, setNewBarcodeImage] = React.useState<any>(0);
  const [preview_image, setPreview] = React.useState<any>(null);
  const [preview_barcode, setBarcodePreview] = React.useState<any>(null);

  //
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
    title: "Edit post",
  });

  const handleSubmit = async () => {
    console.log("SUBMITTING", new_file, file);
    const formData = new FormData();
    formData.append("page", "admin");
    formData.append("id", id);
    formData.append("category_id", category_id);
    formData.append("title", title);
    formData.append("sub_title", sub_title);
    formData.append("banner", file);
    formData.append("description", description);
    formData.append("ingredients", ingredients);
    formData.append("innovation", innovation);
    formData.append("direction", direction);
    formData.append("barcode", barcode_id);
    formData.append("new_file", new_file);
    formData.append("barcode_image", barcode_image);
    formData.append("new_barcode_image", new_barcode_image);
    setMeta({ ...meta, picture: file });
    console.log("meta::", meta);
    setLoading(true);
    try {
      const resp = await HttpPostForm(formData, "edit_product");
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
      router.push(`/admin/products`);
    }
  };

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

  return (
    <>
      <div className="dashboard-page-title">
        <div className="breadcrumbs">
          <Link href="/admin">Admin Dashboard</Link>
          <Link href="/admin/products">Products</Link>
          <span>{post?.title}</span>
        </div>
      </div>
      <div className="dashboard-page-content">
        <section className="page-detail-container">
          <div className="py30 px20">
            <div>
              <div className={`input mb10 spacer ${loading ? "iconed" : ""}`}>
                <label>Product Title</label>
                <input
                  type="text"
                  className="input-form-control"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={"Product Title"}
                />
              </div>
            </div>
            <div>
              <div className={`input mb10 spacer ${loading ? "iconed" : ""}`}>
                <label>Product Sub Title</label>
                <input
                  type="text"
                  className="input-form-control"
                  name="sub_title"
                  value={sub_title}
                  onChange={(e) => setSubTitle(e.target.value)}
                  placeholder={"Product Sub Title"}
                />
              </div>
            </div>

            <div className={`input mb10 spacer`}>
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
                value={category_id}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Select Product Category...</option>
                {categories.map((item: any) => (
                  <option value={item.id} key={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="banner-section mt20">
              {preview_image && (
                <div className="image_preview">
                  <img className="" src={preview_image} alt="preview Image" />
                </div>
              )}
              <div className={"input my20"}>
                <label>Attach Product Banner</label>
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
                value={barcode_id ? barcode_id : ""}
                onChange={(e) => setBarcodeId(e.target.value)}
                placeholder={"Barcode"}
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

            <div className="mb10">
              <label>Product Description</label>
              <DefaultEditor
                className="form-control"
                placeholder="Product Description"
                value={description}
                onChange={(e) => onHtmlChange(e, "description")}
              />
            </div>
            <div className="mb20">
              <label>Direction for use</label>
              <DefaultEditor
                className="form-control"
                placeholder="Direction For Use"
                value={direction}
                onChange={(e) => onHtmlChange(e, "direction")}
              />
            </div>
            <div className="mb20">
              <label>Ingredients</label>
              <DefaultEditor
                className="form-control"
                placeholder="Ingredients"
                value={ingredients}
                onChange={(e) => onHtmlChange(e, "ingredients")}
              />
            </div>
            <div className="mb20">
              <label>Innovation</label>
              <DefaultEditor
                className="form-control"
                placeholder="Innovation"
                value={innovation}
                onChange={(e) => onHtmlChange(e, "innovation")}
              />
            </div>


            
            <div className={`input mb10 spacer`}>
              <label className="textfeld-control">
                {"Publish Product"}
                <sup className="boldest red" title="This field is required!">
                  *
                </sup>
              </label>
              <select
              title="Publish Product"
                className={" input-form-control "}
                name={"is_published"}
                required
                value={is_published}
                onChange={(e) => setIsPublished(e.target.value)}
              >
                <option value="">Publish Product</option>
                  <option value="1">Publish</option>
                  <option value="0">Do Not Publish</option>
               
              </select>
            </div>

            <button
              className="btn"
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "Working..." : " Edit Product"}
            </button>
          </div>
        </section>

        {modal.onopen && <CustomModal data={modal} />}
      </div>
    </>
  );
};

export default EditProduct;
