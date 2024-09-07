// @ts-nocheck
import React from "react";
import Header from "./Header";
import { useFetchOrdersByUser } from "../components/hooks/useFetch";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Layout, Row, Table, Button } from "antd";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
const Orders = () => {
  const [user] = useLocalStorage("user");
  const [cart] = useLocalStorage("cart", []);
  const navigate = useNavigate();
  const { data } = useFetchOrdersByUser(user.id);
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
      title: "Created Date",
      dataIndex: "created",
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
        Order History:
        <Layout>
          <Content className="site-layout-background">
            <Row justify="start" className="flex justify-between">
              <div className="flex gap-2">
                {" "}
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
                      navigate(`/order?id=${record.order_id}`);
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
