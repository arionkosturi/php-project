import React from "react";
import { FaOpencart } from "react-icons/fa";
import { useFetchCategories } from "../components/hooks/useFetch";

function Footer() {
  const { data: categories } = useFetchCategories();

  return (
    <div className="mx-auto py-6 container">
      <div className="lg:flex">
        <div className="w-full lg:w-2/5">
          <div className="px-4 flex justify-between my-4">
            <div className="gap-2 flex mx-1 font-bold text-3xl text-purple-700 fa-newspaper fa-regular">
              <FaOpencart />
              <p>Online Shop</p>
            </div>

            <p className="mt-2 max-w-sm text-gray-500 dark:text-gray-400">
              Website me i mire per blerje online.
            </p>
          </div>
        </div>

        <div className="lg:flex-1 mt-6 lg:mt-0 text-gray-600 text-sm dark:text-gray-400">
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-4">
            <div>
              <h3 className="font-bold text-purple-700 dark:text-white uppercase">
                MENU
              </h3>
              <a href="/register" className="block mt-2 hover:text-purple-600">
                Register
              </a>
              <a href="/login" className="block mt-2 hover:text-purple-600">
                Login
              </a>
            </div>

            <div>
              <h3 className="font-bold text-purple-700 dark:text-white uppercase">
                CATEGORIES
              </h3>
              {categories?.map((category) => {
                return (
                  <a
                    href={`/category/${category.name}`}
                    className="block mt-2 hover:text-purple-600"
                  >
                    {category.name}
                  </a>
                );
              })}
            </div>

            <div>
              <h3 className="font-bold text-purple-700 dark:text-white uppercase">
                Contact
              </h3>
              <span className="block mt-2">+355 6x xx xx xxx</span>
              <span className="block mt-2 hover:text-purple-600 cursor-pointer">
                info@onlineshop.site
              </span>
            </div>
          </div>
        </div>
      </div>

      <hr className="bg-gray-200 dark:bg-gray-700 my-6 border-none h-px" />

      <div className="flex justify-between text-center dark:text-gray-300">
        <div className="flex gap-2 items-center mx-1 font-bold text-md text-purple-600">
          <FaOpencart />
          <p>Online Shop</p>
        </div>{" "}
        <p>2024 - All rights reserved</p>
      </div>
    </div>
  );
}

export default Footer;
