// @ts-nocheck
import React, { useState, useEffect } from "react";
import Header from "./Header";
import { CgSmileSad } from "react-icons/cg";
import {
  fetchOrderProducts,
  useMutateUserProfile,
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
const Orders = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutateUserProfile();
  const [user, setUser] = useLocalStorage("user");
  const [cart, setCart] = useLocalStorage("cart", []);
  const [qty, setQty] = useState(1);
  const [orderData, setOrderData] = useState("");
  const navigate = useNavigate();
  // const [total, setTotal] = useState(0.0);
  const { mutate: createOrder } = useCreateOrder();
  const [alert, setAlert] = useState({});
  const [passwordAlert, setPasswordAlert] = useState({});
  const { data } = useFetchOrdersByUser(user.id);
  const { data: orderProducts } = useFetchOrderProducts();
  const { Content } = Layout;
  const total = [0];
  cart?.forEach((item) => total.push(item.qty * item.price));
  let totali = Math.round(total.reduce((total, num) => total + num)).toFixed(2);
  const handleOrder = (e) => {
    e.preventDefault();
    let orderId = uuidv4();
    let userId = user.id;
    createOrder(
      {
        orderId,
        userId,
        totali,
        cart,
      },
      {
        onSuccess: () => {
          setCart([]);
        },
      }
    );
  };
  const handleDecQty = (e) => {
    const index = e.target.getAttribute("index");

    setCart([
      ...cart?.map((item, key) => {
        return key == index ? { ...item, qty: item.qty - 1 } : item;
      }),
    ]);
  };

  const handleIncQty = (e) => {
    const index = e.target.getAttribute("index");

    setCart([
      ...cart?.map((item, key) => {
        return key == index ? { ...item, qty: item.qty + 1 } : item;
      }),
    ]);
  };

  let url = `order?id=${cart?.id}`;
  const columns = [
    {
      title: "id",
      dataIndex: "order_id",
      name: "id",
      render: (dataIndex) => (
        <p className="underline text-blue-600 cursor-pointer">{dataIndex}</p>
      ),
    },

    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
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
        Order History:
        <Layout>
          <Content className="site-layout-background">
            <Row justify="start" className="flex justify-between">
              <div className="flex gap-2">
                {" "}
                {/* <Button
                  onClick={() => {
                    navigate("/orders");
                  }}
                >
                  Orders History
                </Button> */}
                <Button
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  Cart
                </Button>
              </div>

              <h2>
                Total Items <strong>({data?.length})</strong>
              </h2>
            </Row>
            <Row justify="end" className="me-2"></Row>

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
                    },
                  };
                }}
                columns={columns}
                dataSource={data}
                pagination={false}
              />
            )}

            <div className="flex gap-2 p-2 items-center mt-6 mx-2 justify-evenly">
              <a href="/" className="text-blue-600 underline hover:underline">
                Find products
              </a>
              <a
                href="/orders"
                className="text-blue-600 underline hover:underline"
              >
                See your orders
              </a>
            </div>
          </Content>
        </Layout>
        <Footer />
      </div>
    </>
  );
};

export default Orders;
