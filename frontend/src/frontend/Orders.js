// @ts-nocheck
import React, { useState, useEffect } from "react";
import Header from "./Header";
import { CgSmileSad } from "react-icons/cg";
import {
  useMutateUserProfile,
  useCreateOrder,
  useFetchOrdersByUser,
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
const Orders = (props) => {
  const { mutate } = useMutateUserProfile();
  const [user, setUser] = useLocalStorage("user");
  const [cart, setCart] = useLocalStorage("cart", []);
  const [qty, setQty] = useState(1);
  // const [total, setTotal] = useState(0.0);
  const { mutate: createOrder } = useCreateOrder();
  const [alert, setAlert] = useState({});
  const [passwordAlert, setPasswordAlert] = useState({});
  const { data } = useFetchOrdersByUser(user.id);

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
      ...cart.map((item, key) => {
        return key == index ? { ...item, qty: item.qty - 1 } : item;
      }),
    ]);
  };

  const handleIncQty = (e) => {
    const index = e.target.getAttribute("index");

    setCart([
      ...cart.map((item, key) => {
        return key == index ? { ...item, qty: item.qty + 1 } : item;
      }),
    ]);
  };

  let url = `product?id=${cart?.id}`;
  const columns = [
    {
      title: "id",
      dataIndex: "order_id",
      name: "id",
    },

    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "qty",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (dataIndex) => <a>{dataIndex} €</a>,
    },
  ];

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
        Your shopping cart:
        <Layout>
          <Content className="site-layout-background">
            <Row justify="end">
              <Col>
                {cart.length > 0 && (
                  <Button
                    type="default"
                    onClick={() => {
                      setCart([]);
                    }}
                    danger
                  >
                    <DeleteOutlined />
                    &nbsp;
                    <span>Delete Cart</span>
                  </Button>
                )}
              </Col>
            </Row>
            <h2>
              Total Items <strong>({cart.length})</strong>
            </h2>
            <br></br>
            <Table columns={columns} dataSource={data} pagination={false} />
            {cart.length > 0 ? (
              <Divider orientation="right">
                <p>Billing</p>
              </Divider>
            ) : (
              <>
                <p className="text-center mt-6 text-xl text-slate-600">
                  Your cart is empty
                </p>

                <div className="flex gap-2 p-2 items-center mt-6 mx-2 justify-evenly">
                  <a
                    href="/"
                    className="text-blue-600 underline hover:underline"
                  >
                    Find products
                  </a>
                  <a
                    href="/orders"
                    className="text-blue-600 underline hover:underline"
                  >
                    See your orders
                  </a>
                </div>
              </>
            )}
            {cart.length > 0 && (
              <Row justify="end">
                <Col>
                  <Statistic
                    title="Total (tax incl)."
                    value={`$ ${Math.round(
                      total.reduce((total, num) => total + num)
                    ).toFixed(2)}`}
                    precision={2}
                  />
                  <Button
                    style={{ marginTop: 16 }}
                    type="primary"
                    onClick={handleOrder}
                  >
                    Pay now <CreditCardOutlined />
                  </Button>
                </Col>
              </Row>
            )}
            {cart.length > 0 && (
              <Row justify="start" className="items-center ml-4">
                <Col md={12}>
                  <Divider orientation="left">Returns</Divider>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                </Col>
                <Col md={12}>
                  <Divider orientation="left">Warranty Info:</Divider>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                </Col>
              </Row>
            )}
            <br></br>
          </Content>
        </Layout>
        <Footer />
      </div>
    </>
  );
};

export default Orders;
