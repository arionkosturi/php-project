// @ts-nocheck
import React from "react";
import Header from "./Header";
import { useCreateOrder } from "../components/hooks/useFetch";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Layout, Row, Col, Table, Divider, Statistic, Button } from "antd";
import { CreditCardOutlined, DeleteOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { Toaster } from "../components/ui/toaster";
const Cart = (props) => {
  const [user] = useLocalStorage("user");
  const [cart, setCart] = useLocalStorage("cart", []);
  const navigate = useNavigate();
  const { mutate: createOrder } = useCreateOrder();
  const { Content } = Layout;

  const total = [0];
  cart?.forEach((item) => total.push(item.qty * item.price));
  let totali = Math.round(total.reduce((total, num) => total + num)).toFixed(2);
  const handleOrder = (e) => {
    e.preventDefault();
    let orderId = uuidv4();
    let userId = user.id;
    createOrder({
      orderId,
      userId,
      totali,
      cart,
    });
  };

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      key: "record",
    },

    {
      title: "qty",
      dataIndex: "qty",
      key: "record",
      render: (dataIndex, item, record, index) => {
        let handleDecrease = (...e) => {
          const index = record;
          if (dataIndex <= 1) return;
          setCart([
            ...cart.map((item, key) => {
              return key === index ? { ...item, qty: item.qty - 1 } : item;
            }),
          ]);
        };
        let handleIncrease = (...e) => {
          const index = record;

          setCart([
            ...cart.map((item, key) => {
              return key === index ? { ...item, qty: item.qty + 1 } : item;
            }),
          ]);
        };
        let handleDeleteItem = (...e) => {
          const index = record;
          setCart([...cart.filter((item, key) => key !== index)]);
        };

        return (
          <div
            className="flex justify-evenly items-center gap-2"
            key={dataIndex?.id}
          >
            {" "}
            <Toaster />
            <Button onClick={handleDecrease}>-</Button>
            <p className="w-10 inline bg-slate-200 text-center">{dataIndex}</p>
            <Button onClick={handleIncrease}>+</Button>
            <Button
              type="outline"
              onClick={handleDeleteItem}
              className="text-red-600 hover:text-red-700"
            >
              <FaTrashAlt />
            </Button>
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "record",
      render: (dataIndex) => <p>{dataIndex} €</p>,
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
            <Row justify="start" className="flex gap-2">
              <Button
                onClick={() => {
                  navigate("/orders");
                }}
              >
                Orders History
              </Button>
            </Row>
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
            <Table
              rowKey={(record, index) => {
                return record.index;
              }}
              rowClassName={() => "editable-row"}
              bordered
              columns={columns}
              dataSource={cart}
              pagination={false}
            />
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

export default Cart;
