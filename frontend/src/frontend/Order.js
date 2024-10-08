// @ts-nocheck
import React, { useState, useEffect } from "react";
import Header from "./Header";
import { CgSmileSad } from "react-icons/cg";
import {
  fetchOrderProducts,
  useCreateOrder,
  useFetchOrdersByUser,
  useFetchOrderProducts,
} from "../components/hooks/useFetch";
import { useLocalStorage } from "@uidotdev/usehooks";
import {
  Layout,
  Breadcrumb,
  Row,
  Col,
  Table,
  Space,
  Divider,
  Statistic,
  Button,
} from "antd";
import { CreditCardOutlined, DeleteOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import Column from "antd/es/table/Column";
import Footer from "./Footer";
import { useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
const Order = () => {
  const queryClient = useQueryClient();
  const [user, setUser] = useLocalStorage("user");
  const [cart, setCart] = useLocalStorage("cart", []);
  const navigate = useNavigate();
  const [alert, setAlert] = useState({});
  const [passwordAlert, setPasswordAlert] = useState({});
  const { data } = useFetchOrdersByUser(user.id);
  const { data: orderProducts } = useFetchOrderProducts();
  const { Content } = Layout;
  const total = [0];
  cart?.forEach((item) => total.push(item.qty * item.price));
  let totali = Math.round(total.reduce((total, num) => total + num)).toFixed(2);

  let url = `order?id=${cart?.id}`;
  const columns = [
    {
      title: "Image",
      dataIndex: "img",
      name: "img",
      render: (dataIndex) => (
        <img
          src={dataIndex}
          className="underline text-blue-600 cursor-pointer w-14"
        />
      ),
    },
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Sasia",
      dataIndex: "qty",
      key: "qty",
      render: (dataIndex) => <a>{dataIndex} Cope</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (dataIndex) => <a>{dataIndex} €</a>,
    },
  ];
  let orderItems = data?.map((order) => {
    return order?.order_details;
  });
  let list = [];

  let odetalis = orderItems?.map((order) => {
    let items = JSON.parse(order);
    items?.map((i) => {
      list.push([
        <p>
          {i.name} - {i.qty} Cope x {i.price} €
        </p>,
      ]);
    });
  });
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

  return (
    <>
      <Header />
      <div className="container px-2 mx-auto flex flex-col gap-2 mt-4">
        Order details:
        <Layout>
          <Content className="site-layout-background">
            <Row justify="start" className="flex gap-2">
              <Button
                onClick={() => {
                  navigate("/orders");
                }}
              >
                Orders History
              </Button>
              <Button
                onClick={() => {
                  navigate("/cart");
                }}
              >
                Cart
              </Button>
            </Row>
            <h2 className="text-right p-2 mt-2 items-end">
              Total Items <strong>({orderItems?.length})</strong>
            </h2>
            <br></br>
            {data?.length > 0 && (
              <Table
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      const prod = queryClient.fetchQuery({
                        queryKey: ["order products"],
                        queryFn: async () => {
                          const { data } = await fetchOrderProducts(
                            record.order_id
                          );

                          navigate(`/order?id=${record.order_id}`);

                          return data;
                        },
                      });
                    }, // click row
                    onDoubleClick: (event) => {}, // double click row
                    onContextMenu: (event) => {}, // right button click row
                    onMouseEnter: (event) => {}, // mouse enter row
                    onMouseLeave: (event) => {}, // mouse leave row
                  };
                }}
                columns={columns}
                // rowKey={data?.order_id}
                dataSource={orderProducts}
                pagination={false}
              />
            )}
            {data?.length > 0 && (
              <>
                <div className="text-right p-4 mt-6  text-slate-600">
                  <p>
                    Subtotal:{" "}
                    {orderProducts?.length > 0 &&
                      (orderProducts[0]?.total / 1.2).toFixed(2)}{" "}
                    €
                  </p>
                  <p>
                    TAX:{" "}
                    {orderProducts?.length > 0 &&
                      (
                        orderProducts[0]?.total -
                        orderProducts[0]?.total / 1.2
                      ).toFixed(2)}{" "}
                    €
                  </p>
                  <p className="text-xl">
                    Total:{" "}
                    {orderProducts?.length > 0 &&
                      orderProducts[0]?.total.toFixed(2)}{" "}
                    €
                  </p>
                </div>
                <div className="flex gap-2 p-2 items-center mt-6 mx-2 justify-evenly">
                  <a
                    href="/"
                    className="text-blue-600 underline hover:underline"
                  >
                    Find products
                  </a>
                  <div className="flex items-center ">
                    <div className="flex flex-col gap-1 p-1 items-center">
                      <p className="font-bold">Adresa juaj:</p>
                      <p>
                        Tel: <span className="font-bold">{data[0]?.tel}</span>
                      </p>
                      <p>
                        Rruga/Qyteti:{" "}
                        <span className="font-bold">{data[0]?.address}</span>
                      </p>
                      <p>
                        Shteti:{" "}
                        <span className="font-bold">{data[0]?.shteti}</span>
                      </p>
                    </div>
                    <FaPencilAlt
                      className="relative -top-6 text-slate-500 hover:text-slate-800"
                      onClick={() => {
                        navigate("/address");
                      }}
                    />
                  </div>
                  <a
                    href="/orders"
                    className="text-blue-600 underline hover:underline"
                  >
                    See your orders
                  </a>
                </div>
              </>
            )}
          </Content>
        </Layout>
        <Footer />
      </div>
    </>
  );
};

export default Order;
