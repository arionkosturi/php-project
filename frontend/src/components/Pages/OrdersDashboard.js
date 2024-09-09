// @ts-nocheck
import React, { useState } from "react";
import Header from "../Header";
import { useFetchAllOrders, useSearchOrders } from "../hooks/useFetch";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Layout, Row, Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import LeftPanel from "./LeftPanel";
import useDebounce from "../../frontend/useDebounce";
const OrdersDashboard = () => {
  const [user] = useLocalStorage("user");
  const [searchTerm, setSearchTerm] = useState();
  const debouncedSearch = useDebounce(searchTerm, 1000);
  const { data: searchedResult } = useSearchOrders(debouncedSearch);
  const [cart] = useLocalStorage("cart", []);
  const navigate = useNavigate();
  const { data } = useFetchAllOrders();
  const { Content } = Layout;
  const total = [0];
  cart?.forEach((item) => total.push(item.qty * item.price));

  const columns = [
    {
      title: "Order",
      dataIndex: "order_id",
      name: "id",
      render: (dataIndex) => (
        <p className="underline text-blue-600 cursor-pointer">{dataIndex}</p>
      ),
    },
    {
      title: "Client",
      dataIndex: "username",
      key: "name",
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "name",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (dataIndex) => <p>{dataIndex} €</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "name",
      render: (dataIndex) => (
        <p
          className={
            (dataIndex === "Paid" &&
              `bg-purple-100 text-purple-800 text-lg text-center font-medium rounded dark:bg-gray-700 dark:text-purple-400 border border-purple-400`) ||
            (dataIndex === "Proccessing" &&
              `bg-gray-100 text-gray-800 px-1.5 text-lg text-center font-medium rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500`) ||
            (dataIndex === "Shipped" &&
              `bg-blue-100 text-blue-800 text-center text-lg font-medium rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400`) ||
            (dataIndex === "Delivered" &&
              `bg-green-100 text-green-800 text-lg font-medium rounded dark:bg-gray-700 dark:text-green-400 border border-green-400 text-center`) ||
            (dataIndex === "Cancelled" &&
              `bg-red-100 text-red-800 text-lg text-center font-medium px-1 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400`)
          }
        >
          {dataIndex && dataIndex[0]?.status}
          {dataIndex}
        </p>
      ),
    },
  ];

  let handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  // searchedResult?.map((r) => console.log(r));
  if (!user) {
    return (
      <>
        <Header />
        <div className="mt-10 text-3xl font-bold container mx-auto text-center">
          Please{" "}
          <a
            href="login"
            className="text-blue-500 underline hover:text-blue-600"
          >
            login
          </a>{" "}
          first!
        </div>
      </>
    );
  }
  let dataSource;
  if (searchedResult?.length > 0) {
    dataSource = searchedResult[0];
  } else {
    dataSource = data;
  }
  console.log(dataSource);

  return (
    <>
      <Header />
      <div className="container mx-auto flex flex-col sm:flex-row gap-4">
        <LeftPanel />

        <div className="container px-2 mx-auto flex flex-col gap-2 mt-4">
          Order History:
          <Layout>
            <Content className="site-layout-background">
              <Row justify="start" className="flex justify-between">
                <div className="flex gap-2 p-4">
                  <div className="flex items-center gap-2 mb-2 rounded-full w-full mx-auto">
                    <label htmlFor="search__input">Search</label>
                    <input
                      type="search"
                      id="search__input"
                      onChange={handleSearch}
                      className=" border-purple-600 bg-white dark:bg-neutral-900 focus:ring-opacity-70 p-1 border border-opacity-30 rounded-full w-full focus:outline-none focus:ring focus:ring-purple-600"
                      placeholder="Search Orders"
                    />
                  </div>
                </div>

                <h2 className="p-4">
                  Total Orders <strong>({dataSource?.length})</strong>
                </h2>
              </Row>
              <Row justify="end" className="me-2"></Row>

              <br></br>
              <Table
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      navigate(`order?id=${record.order_id}`);
                    },
                  };
                }}
                columns={columns}
                dataSource={dataSource}
                pagination={false}
              />
            </Content>
          </Layout>
        </div>
      </div>
    </>
  );
};

export default OrdersDashboard;
