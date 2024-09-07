// @ts-nocheck
import React, { useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { Toaster } from "./ui/toaster";
import { useAddProduct, useFetchCategories } from "./hooks/useFetch";
import { Button } from "./ui/button";
import { useSingleUser } from "./hooks/useFetch";
import { useLocalStorage } from "@uidotdev/usehooks";

function ProductForm() {
  const [user, setUser] = useLocalStorage("user");
  const editor = useRef(null);
  const [editorContent, setEditorContent] = useState("");
  const { data: categories } = useFetchCategories();
  const { mutate, status } = useAddProduct();
  const [productName, setProductName] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState();
  let handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      name: productName,
      details,
      cost,
      price,
      category,
      img,
    });
  };

  if (!user?.role == "admin") {
    return <Header />;
  }
  return (
    <div className="flex flex-col container gap-2 mx-auto">
      <Toaster />
      <Header />

      <h1 className="text-3xl text-center text-green-600">
        Creating New Product
      </h1>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        placeholder="Enter Product Name"
        name="productName"
        className="border p-2"
        value={productName}
        onChange={(e) => {
          setProductName(e.target.value);
        }}
      />
      <label htmlFor="details">Details</label>
      <textarea
        type="text"
        id="details"
        placeholder="Enter Details"
        name="details"
        className="border p-2"
        rows="4"
        value={details}
        onChange={(e) => {
          setDetails(e.target.value);
        }}
      />
      <label htmlFor="cost">Cost:</label>
      <input
        type="number"
        id="cost"
        placeholder="Enter Cost"
        name="cost"
        className="border p-2"
        value={cost}
        onChange={(e) => {
          setCost(e.target.value);
        }}
      />
      <label htmlFor="price">Price:</label>
      <input
        // @ts-ignore
        type="text"
        id="price"
        placeholder="Enter Price"
        name="price"
        className="border p-2"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />

      <label htmlFor="category">Category:</label>
      <select
        id="category"
        className="p-2"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        <option value="">Select a category</option>
        {categories?.map((category) => {
          return (
            <option
              key={category.id}
              defaultValue={category.id}
              value={category.id}
            >
              {category.id} - {category.name}
            </option>
          );
        })}
      </select>
      <label htmlFor="img">Image URL</label>
      <textarea
        type="text"
        id="img"
        placeholder="Enter Img Source"
        name="img"
        className="border"
        value={img}
        onChange={(e) => {
          setImg(e.target.value);
        }}
      />
      <div className="flex border border-red-300">
        <span className="p-6">Image Preview:</span>
        <img className="w-1/3 my-6" alt="preview" src={img} />
      </div>
      <div className="mx-auto container">
        <form className="mt-4 mb-10 text-center">
          <Link to="/dashboard/all">
            <Button className="mx-4 border shadow w-1/5">Cancel</Button>
          </Link>

          <Button
            disabled={status === "success"}
            onClick={handleSubmit}
            className="mx-4 border shadow bg-green-600 text-white w-1/5"
          >
            {status === "success" ? "Product Created" : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}
export default ProductForm;
