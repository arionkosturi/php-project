// @ts-nocheck
import React from "react";
import Header from "../Header";
import { useFetchAllOrders } from "../hooks/useFetch";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Layout, Row, Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import LeftPanel from "./LeftPanel";
const OrdersDashboard = () => {
  const [user] = useLocalStorage("user");
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
      render: (dataIndex) => (
        <p
          className={
            (dataIndex === "Paid" && `font-bold text-lg text-purple-500`) ||
            (dataIndex === "Proccessing" &&
              `font-bold text-lg text-pink-500`) ||
            (dataIndex === "Shipped" && `font-bold text-lg text-blue-500`) ||
            (dataIndex === "Delivered" && `font-bold text-lg text-green-500`) ||
            (dataIndex === "Cancelled" && `font-bold text-lg text-red-500`)
          }
        >
          {dataIndex && dataIndex[0]?.status}
          {dataIndex}
        </p>
      ),
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
      <div className="container mx-auto flex flex-col sm:flex-row gap-4">
        <LeftPanel />

        <div className="container px-2 mx-auto flex flex-col gap-2 mt-4">
          Order History:
          <Layout>
            <Content className="site-layout-background">
              <Row justify="start" className="flex justify-between">
                <div className="flex gap-2">
                  {" "}
                  <Button
                    onClick={() => {
                      navigate("/");
                    }}
                  ></Button>
                </div>

                <h2>
                  Total Orders <strong>({data?.length})</strong>
                </h2>
              </Row>
              <Row justify="end" className="me-2"></Row>

              <br></br>
              {data?.length > 0 && (
                <Table
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: (event) => {
                        navigate(`order?id=${record.order_id}`);
                      },
                    };
                  }}
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                />
              )}
            </Content>
          </Layout>
        </div>
      </div>
    </>
  );
};

export default OrdersDashboard;
