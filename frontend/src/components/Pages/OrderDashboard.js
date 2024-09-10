// @ts-nocheck
import React, { useState, useEffect } from "react";
import Header from "../Header";
import { CgSmileSad } from "react-icons/cg";
import {
  fetchOrderProducts,
  useCreateOrder,
  useFetchOrdersByUser,
  useFetchOrderProducts,
  useMutateOrderStatus,
} from "../../components/hooks/useFetch";
import { useLocalStorage } from "@uidotdev/usehooks";
import {
  Layout,
  Breadcrumb,
  Row,
  Col,
  Table,
  Select,
  Space,
  Divider,
  Statistic,
  Button,
} from "antd";
import Column from "antd/es/table/Column";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import { FaPencilAlt } from "react-icons/fa";
const OrderDashboard = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutateOrderStatus();
  const [user, setUser] = useLocalStorage("user");
  const [cart, setCart] = useLocalStorage("cart", []);
  const navigate = useNavigate();
  const { data } = useFetchOrdersByUser(user.id);

  const { data: orderProducts } = useFetchOrderProducts();
  const { Content } = Layout;
  const total = [0];
  cart?.forEach((item) => total.push(item.qty * item.price));
  let totali = Math.round(total.reduce((total, num) => total + num)).toFixed(2);

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
  const onChange = (value) => {
    let id = orderProducts[0]?.order_id;

    mutate({
      id,
      status: value,
    });
    console.log(`selected ${value}`);
  };
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
                  navigate("/dashboard/orders");
                }}
              >
                Orders History
              </Button>
            </Row>
            {orderProducts && (
              <Row justify="center">
                <div className="flex items-center ">
                  <div className="flex flex-col gap-1 p-1 items-center">
                    <p className="font-bold">Adresa e klientit:</p>

                    {orderProducts[0]?.username && (
                      <p>
                        Emri:{" "}
                        <span className="text-xl">
                          {orderProducts[0]?.username}{" "}
                        </span>
                      </p>
                    )}

                    {orderProducts[0]?.tel && (
                      <p className="text-xl">Tel: {orderProducts[0]?.tel}</p>
                    )}
                    {orderProducts[0]?.email && (
                      <p>
                        Email:{" "}
                        <span className="font-bold">
                          {orderProducts[0]?.email}
                        </span>
                      </p>
                    )}
                    <p>
                      Rruga/Qyteti:{" "}
                      <span className="text-xl">
                        {orderProducts && orderProducts[0]?.address}
                      </span>
                    </p>
                    <p>
                      Shteti:{" "}
                      <span className="text-xl text-purple-700">
                        {orderProducts && orderProducts[0]?.shteti}
                      </span>
                    </p>
                  </div>
                </div>
              </Row>
            )}
            <div className="flex flex-col justify-end items-end gap-2 me-2">
              <p>
                {/* 'Paid', 'Proccessing', 'Shipped', 'Delivered' */}
                Order Status:{" "}
                <span
                  className={
                    (orderProducts &&
                      orderProducts[0]?.status === "Paid" &&
                      `font-bold text-xl text-purple-500`) ||
                    (orderProducts &&
                      orderProducts[0]?.status === "Proccessing" &&
                      `font-bold text-xl text-pink-500`) ||
                    (orderProducts &&
                      orderProducts[0]?.status === "Shipped" &&
                      `font-bold text-xl text-blue-500`) ||
                    (orderProducts &&
                      orderProducts[0]?.status === "Delivered" &&
                      `font-bold text-xl text-green-500`) ||
                    (orderProducts &&
                      orderProducts[0]?.status === "Cancelled" &&
                      `font-bold text-xl text-red-500`)
                  }
                >
                  {orderProducts && orderProducts[0]?.status}
                </span>
              </p>
              <Select
                className="w-34"
                placeholder="Change Status"
                onChange={onChange}
                options={[
                  {
                    value: "Paid",
                    label: "Paid",
                  },
                  {
                    value: "Proccessing",
                    label: "Proccessing",
                  },
                  {
                    value: "Shipped",
                    label: "Shipped",
                  },
                  {
                    value: "Delivered",
                    label: "Delivered",
                  },
                  {
                    value: "Cancelled",
                    label: "Cancelled",
                  },
                ]}
              />
              <h2 className="text-right p-2 mt-2 items-end">
                Total Items{" "}
                <strong>({orderProducts && orderProducts?.length})</strong>
              </h2>
            </div>

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
                            record?.order_id
                          );

                          navigate(`/dashboard/order?id=${record.order_id}`);

                          return data;
                        },
                      });
                    },
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
                    {orderProducts &&
                      orderProducts?.length > 0 &&
                      (orderProducts[0]?.total / 1.2).toFixed(2)}{" "}
                    €
                  </p>
                  <p>
                    TAX:{" "}
                    {orderProducts &&
                      orderProducts?.length > 0 &&
                      (
                        orderProducts[0]?.total -
                        orderProducts[0]?.total / 1.2
                      ).toFixed(2)}{" "}
                    €
                  </p>
                  <p className="text-xl">
                    Total:{" "}
                    {orderProducts &&
                      orderProducts?.length > 0 &&
                      orderProducts[0]?.total.toFixed(2)}{" "}
                    €
                  </p>
                </div>
              </>
            )}
          </Content>
        </Layout>
      </div>
    </>
  );
};

export default OrderDashboard;
