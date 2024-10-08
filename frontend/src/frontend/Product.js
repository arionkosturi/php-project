// @ts-nocheck
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Button, Form, Rate } from "antd";
import {
  useFetchReviews,
  useMutateUserProfile,
  useSingleProduct,
  useFetchSearchedArticles,
  useAddReview,
  useDeleteReview,
  useFetchRelatedProducts,
} from "../components/hooks/useFetch";
import {
  FaInfoCircle,
  FaBookmark,
  FaRegBookmark,
  FaRegHeart,
  FaHeart,
  FaRegTrashAlt,
  FaCartPlus,
  FaPencilAlt,
  FaCartArrowDown,
} from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import {
  Alert as Njoftim,
  AlertDescription,
  AlertTitle,
} from "../components/ui/alert";
import { useSessionStorage, useLocalStorage } from "@uidotdev/usehooks";
import TextArea from "antd/es/input/TextArea";
import { useToast } from "../components/ui/use-toast";
import { Toaster } from "../components/ui/toaster";
import { exists } from "../components/helpers/cart";
import { useNavigate } from "react-router-dom";
function PublicProduct() {
  const { mutate: addReview } = useAddReview();
  const { mutate: delReview } = useDeleteReview();
  const [relatedProd, setRelatedProd] = useState([]);
  const [form] = Form.useForm();
  const [rating, setRating] = useState(4);
  const { mutate: addTo } = useMutateUserProfile();
  const [user, setUser] = useLocalStorage("user");
  const [cart, setCart] = useLocalStorage("cart", []);
  const [qty] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();
  if (!user) {
    setUser(null);
  }
  const [localProducts, setLocalProducts] = useLocalStorage(
    "localProducts",
    []
  );

  const { data: product, isLoading, error } = useSingleProduct();
  const { data: reviews } = useFetchReviews();
  let rel = product?.category_name;
  const { data: related, isSuccess } = useFetchRelatedProducts(rel);
  const [reviewText, setReviewText] = useState();
  if (!isSuccess) {
    return "Loading";
  }
  if (isSuccess) {
    console.log(related);
  }
  if (related === undefined) {
    return <>Still loading...</>;
  }

  let addToCart = (e) => {
    e.preventDefault();

    if (exists(product, cart)) {
      setCart([
        ...cart.map((item) => {
          return item.id === product.id
            ? { ...item, qty: item.qty + parseInt(qty) }
            : product;
        }),
      ]);
    } else {
      setCart([...cart, { ...product, qty: parseInt(qty) }]);
    }
    toast({
      variant: "success",
      title: "Success",
      description: "Produkti u shtua ne shporte!",
    });
  };
  let handleReviewSubmit = () => {
    let productId = product.id;
    let userId = user.id;
    addReview({
      productId,
      userId,
      reviewText,
      rating,
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  // let handleLiked = (user) => {
  //   let id = user.id;
  //   let likedArticles = user.likedArticles;
  //   addTo({
  //     id,
  //     likedArticles: [
  //       ...likedArticles?.filter((liked) => liked._id !== product.id),
  //       product,
  //     ],
  //   });
  // };
  let handleRemoveLiked = (user) => {
    let id = user.id;
    let likedArticles = user.likedArticles;
    addTo({
      id,
      likedArticles: [
        ...likedArticles?.filter((liked) => liked.id !== product.id),
      ],
    });
  };
  let handleSaveProduct = () => {
    setLocalProducts([
      ...localProducts?.filter((saved) => saved.id !== product.id),
      product,
    ]);
  };
  let handleRemoveSaveProduct = () => {
    setLocalProducts([
      ...localProducts?.filter((saved) => saved.id !== product.id),
    ]);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data.</div>;
  }

  return (
    <div>
      <div>
        <Toaster />
        <Header />
      </div>
      <div>
        <section className="container mx-auto">
          <div className="flex px-2">
            <div className="mt-2 container">
              <div className="flex items-center justify-between">
                <p className="block my-4 text-2xl font-semibold text-slate-800 ">
                  {product.name}
                </p>
                {user?.role === "admin" && (
                  <p className=" text-slate-500 hover:text-slate-700">
                    <FaPencilAlt
                      onClick={() => {
                        navigate(`../dashboard/edit?id=${product.id}`);
                      }}
                    />
                  </p>
                )}
              </div>
              <div className="mt-8 flex lg:mt-0 lg:mx-6 ">
                {product.img ? (
                  <img
                    className="object-contain w-[70%] lg:mx-6 rounded-xl h-72 text-center"
                    alt="article"
                    src={product.img}
                  />
                ) : (
                  <img
                    className="object-contain w-[70%] lg:mx-6 rounded-xl h-72 text-center"
                    alt="article"
                    src={
                      "data:image/png;base64,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"
                    }
                  />
                )}

                <div className="flex flex-col gap-2 ml-4">
                  <p className="flex text-center items-center">
                    Kategoria:
                    <a
                      href={`/category/${product.category}`}
                      className="ml-2 cursor-pointer text-lg text-purple-700 font-bold uppercase"
                    >
                      {product?.category_name}
                    </a>
                  </p>

                  <p className="cursor-pointer block mt-4 text-xl font-semibold text-gray-800 ">
                    {product.details}
                  </p>
                </div>
              </div>
              {product?.stock > 0 && product?.stock <= 10 && (
                <p className="text-xl mb-2 text-red-600 px-4 py-1">
                  Hurry Up! Only {product?.stock} left!
                </p>
              )}
              {product?.stock <= 0 && (
                <p className="text-xl mb-2 text-red-600 px-4 py-1">
                  Out of stock!
                </p>
              )}
              <div className="flex gap-4 items-center">
                <p className="text-5xl bg-yellow-300 text-red-600 px-4 py-1">
                  {product.price} €
                </p>
                {product?.stock <= 0 ? (
                  <FaCartPlus className="text-3xl text-purple-300 hover:text-purple-500 hover:scale-110" />
                ) : (
                  <FaCartPlus
                    onClick={addToCart}
                    className="text-3xl text-purple-600 hover:text-purple-500 hover:scale-110"
                  />
                )}
                {
                  <>
                    {/* {user?.likedArticles?.filter(
                      (liked) => liked.id === product.id
                    ).length === 0 ? (
                      <FaRegHeart
                        className="text-2xl text-purple-500 hover:text-purple-600 hover:scale-110"
                        onClick={handleLiked}
                      />
                    ) : (
                      <FaHeart
                        className="text-2xl text-purple-500 hover:text-purple-600 hover:scale-110"
                        onClick={handleRemoveLiked}
                      />
                    )} */}
                    {localProducts.filter(
                      (savedProducts) => savedProducts.id === product.id
                    ).length === 0 ? (
                      <FaRegHeart
                        className="text-2xl text-purple-500 hover:text-purple-600 hover:scale-110"
                        onClick={handleSaveProduct}
                      />
                    ) : (
                      <FaHeart
                        className="text-2xl text-purple-500 hover:text-purple-600 hover:scale-110"
                        onClick={handleRemoveSaveProduct}
                      />
                    )}
                  </>
                }
              </div>
            </div>
          </div>
          {isSuccess && related?.length > 0 && (
            <div className="bg-gray-100 dark:bg-neutral-700 w-full dark:text-gray-200 mt-10">
              <div className="border-t-8 border-red-600 w-2/12"></div>
              <h1 className="text-2xl p-2">Related Products:</h1>
              <div className="border-red-600 border-b-8 w-2/12"></div>
            </div>
          )}
          {/* Related section */}
          <div className="p-2 grid md:grid-cols-2 gap-2 mb-6">
            {isSuccess &&
              related.length > 0 &&
              related
                ?.filter((f) => f.id !== product?.id)
                .map((prod) => {
                  return (
                    <div key={prod.id}>
                      <a
                        href={`?id=${prod.id}`}
                        className="hover:text-purple-800 "
                      >
                        <div className="flex border items-center hover:bg-slate-50">
                          <img
                            className="w-32 h-24 p-2"
                            src={prod.img}
                            alt={prod.name}
                          />
                          <div className="flex flex-col gap-2">
                            <h1 className="text line-clamp-3">{prod.name}</h1>
                          </div>
                        </div>
                      </a>
                    </div>
                  );
                })}
          </div>
          <hr />
          <span className="font-bold px-2 py-1 bg-green-600 text-white ">
            Reviews:
          </span>

          {user?.role ? (
            <Form
              onFinish={handleReviewSubmit}
              form={form}
              className="flex flex-col gap-2 mt-2"
            >
              <Form.Item label="Rate this product">
                <Rate
                  name="rating"
                  defaultValue="4"
                  allowClear={false}
                  onChange={(value) => {
                    setRating(value);
                  }}
                />
              </Form.Item>
              <TextArea
                name={"textA"}
                initialValue={""}
                required
                onChange={(e) => {
                  setReviewText(e.target.value);
                }}
                rows={4}
              />

              <Button htmlType="submit" type="primary">
                Add Review
              </Button>
            </Form>
          ) : (
            <div>
              <p className="p-4 text-center font-semibold">
                <a href="Login" className="text-blue-500 underline">
                  Login
                </a>{" "}
                to leave a review
              </p>
              <p className="font-semibold">Reviews:</p>
            </div>
          )}
          {reviews &&
            reviews[0]
              ?.filter((f) => f.user_id === user?.id)
              .map((review) => {
                return (
                  <div
                    className="border p-2 mt-4 bg-slate-100"
                    key={review?.id}
                  >
                    <div className="mt-2 text-lg">
                      <div className="flex justify-between">
                        <p className="flex items-center gap-2 text-yellow-500">
                          <Rate defaultValue={review.rating} />
                        </p>
                        <FaRegTrashAlt
                          className="hover:text-red-600 text-red-400 text-xl"
                          onClick={() => {
                            delReview(review);
                          }}
                        />
                      </div>
                      <p className="text-slate-800">
                        By: {review.username} (me)
                      </p>

                      <p className="text-slate-600">{review.content}</p>
                    </div>
                  </div>
                );
              })}
          {reviews &&
            reviews[0]
              ?.filter((f) => f.user_id !== user?.id)
              .map((review) => {
                return (
                  <div className="border p-2">
                    <div className="mt-2 text-lg">
                      <p className="text-slate-800">By: {review.username}</p>
                      {[]}
                      <p className="flex items-center gap-2 text-yellow-500">
                        <Rate defaultValue={review.rating} disabled />
                      </p>
                      <p className="text-slate-600">{review.content}</p>
                    </div>
                  </div>
                );
              })}
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default PublicProduct;
