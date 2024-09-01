import React from "react";
import Header from "./Header";
import { useParams } from "react-router";
import { useFetchProductsByCategory } from "../components/hooks/useFetch";
function PublicCategory() {
  let { category } = useParams();
  const { data: products } = useFetchProductsByCategory(category);
  return (
    <>
      <Header />
      <div className="container mx-auto mt-6 text-4xl font-bold p-2 text-purple-700">
        <p className="text-black">Showing products from: </p>
        {category}
        {products &&
          products.map((product) => {
            return (
              <article className="flex items-center justify-around mr-4 bg-white shadow-xl hover:shadow-xl my-3">
                <div className="flex flex-row w-1/12 ">
                  <img alt="" src={product.img} className="w-full p-4" />
                </div>

                <div className="flex flex-col dark:bg-neutral-900 w-1/2">
                  <div className="border-gray-900/10 border-s p-2 sm:p-4 sm:border-l-transparent">
                    <a href={`/product?id=${product.id}`}>
                      <h4 className="line-clamp-2 text-xl sm:line-clamp-3 font-bold text-gray-900 dark:text-white uppercase">
                        {product.name}
                      </h4>
                      <p className="text-md">{product.price} €</p>
                    </a>

                    <p className=" text-sm line-clamp-4 mt-6 dark:text-gray-100">
                      {" "}
                      {product.description}
                    </p>
                  </div>

                  <div className="sm:flex sm:justify-end sm:items-end">
                    <a
                      href={`/product?id=${product.id}`}
                      className="block bg-purple-500 hover:bg-purple-400 mx-2 px-5 py-3 font-bold text-center text-gray-100 text-xs uppercase transition"
                    >
                      Lexo me shume
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
      </div>
    </>
  );
}

export default PublicCategory;
