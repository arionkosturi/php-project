// @ts-nocheck
import React, { useState, useEffect } from "react";
import Header from "../Header";
import { CgSmileSad } from "react-icons/cg";
import {
  fetchOrderProducts,
  useCreateOrder,
  useFetchOrdersByUser,
  useFetchOrderProducts,
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
import { CreditCardOutlined, DeleteOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import Column from "antd/es/table/Column";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
const OrderDashboard = () => {
  const queryClient = useQueryClient();
  const [user, setUser] = useLocalStorage("user");
  const [cart, setCart] = useLocalStorage("cart", []);
  const navigate = useNavigate();
  // const [total, setTotal] = useState(0.0);
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
  const onChange = (value) => {
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
            <div className="flex flex-col justify-end items-end gap-2 me-2">
              <p>
                {/* 'Paid', 'Proccessing', 'Shipped', 'Delivered' */}
                Order Status
              </p>
              <Select
                placeholder={orderProducts && orderProducts[0]?.status}
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
                    value: "Delivered",
                    label: "Delivered",
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
                <div className="text-center mt-6 text-xl text-slate-600">
                  <p>
                    Totali:{" "}
                    {orderProducts?.length > 0 && orderProducts[0]?.total} €
                  </p>
                  <p>(Tax included)</p>
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
