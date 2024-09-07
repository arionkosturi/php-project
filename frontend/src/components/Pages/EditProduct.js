// @ts-nocheck
import React, { useState } from "react";
import axios from "axios";
import Header from "../Header";
import CustomEditor from "../CustomEditor";
import Alert from "../Alert";
import { FaTrash } from "react-icons/fa";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import { useFetchCategories, useSingleCategory } from "../hooks/useFetch";
const api = axios.create({
  baseURL: "http://localhost/php-project/backend/",
});

function EditProduct() {
  const { data: categories } = useFetchCategories();
  const navigate = useNavigate();
  const { toast } = useToast();
  let handleDelete = (e) => {
    e.preventDefault();
    api
      .delete(`api.php?endpoint_name=delete_product&id=${id}`)
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });

    navigate(`/dashboard`);
  };
  let handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `http://localhost/php-project/backend/api.php`,

        {
          endpoint_name: "update_product",
          name,
          details,
          cost,
          price,
          stock,
          img,
          category,
          id,
        }
      )
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });

    toast({
      variant: "success",
      title: "Success",
      description: "Perditesimi u ruajt me sukses!",
    });
    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
  };

  const [name, setName] = useState();
  const [details, setDetails] = useState();
  const [img, setImg] = useState();
  const [cost, setCost] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [category, setCategory] = useState();
  const [queryParameter] = useSearchParams();
  let id = queryParameter.get("id");

  React.useEffect(() => {
    api.get(`api.php?endpoint_name=products_by_id&id=${id}`).then((res) => {
      setName(res.data.name);
      setDetails(res.data.details);
      setCost(res.data.cost);
      setPrice(res.data.price);
      setCategory(res.data.category);
      setImg(res.data.img);
      setStock(res.data.stock);
    });

    return () => {};
  }, [id]);

  return (
    <div className="flex flex-col container gap-1 mx-auto">
      <Toaster />
      <Header className="text-white" />
      <h1 className="text-3xl text-purple-600">Edit Product:</h1>
      <label htmlFor="name" className="text-xl">
        Product Name:
      </label>
      <input
        type="text"
        id="name"
        placeholder="Enter Product Name"
        name="name"
        className="border p-2"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <label htmlFor="details">Details</label>
      <textarea
        type="text"
        id="details"
        placeholder="Enter Description"
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
        className="border"
        value={cost}
        onChange={(e) => {
          setCost(e.target.value);
        }}
      />
      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        placeholder="Enter Price"
        name="price"
        className="border"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <label htmlFor="stock">Stock:</label>
      <input
        type="number"
        id="stock"
        placeholder="Enter Stock"
        name="stock"
        className="border"
        value={stock}
        onChange={(e) => {
          setStock(e.target.value);
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
        <option value="">Select a category: {category}</option>
        {categories?.map((categ) => {
          return (
            <option key={categ.id} defaultValue={categ.id} value={categ.id}>
              {categ.id} - {categ.name}
            </option>
          );
        })}
      </select>

      <label htmlFor="img">Img Source</label>
      <input
        type="text"
        id="img"
        placeholder="Enter Img Source"
        name="img"
        className="border p-1"
        value={img}
        onChange={(e) => {
          setImg(e.target.value);
        }}
      />
      <div className="flex border border-red-300">
        <span className="p-6">Image Preview:</span>
        <img className="w-1/3 my-6" src={img} alt="preview for article image" />
      </div>
      <div className="mx-auto container ">
        <form>
          <div className="flex">
            <Link to="/dashboard/all  ">
              <button className="mx-4 py-2 px-4 border shadow w-48">
                Cancel
              </button>
            </Link>
            <span className="border shadow hover:bg-red-500 bg-red-600 text-white">
              {/* Delete Button */}
              <Alert
                handleFunction={handleDelete}
                alertTriggerButton={
                  <div className="w-32 hover:text-slate-100 text-white border h-9  flex bg-red-500 hover:bg-red-600 gap-2 justify-center ">
                    <p className="py-1 ms-2 flex ">Delete</p>
                    <FaTrash className="mt-2 me-2" />
                  </div>
                }
                alertTitle="Jeni i sigurt?"
                alertMessage="Jeni duke fshire artikullin nga serveri. Jeni te sigurt per kete veprim?"
              />
            </span>
            <button
              onClick={handleSubmit}
              className="hover:bg-green-500 mx-4 border shadow bg-green-600 text-white w-1/5"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
