// @ts-nocheck
import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useMutateUserProfile } from "../components/hooks/useFetch";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Table } from "antd";
import Column from "antd/es/table/Column";
function Cart() {
  const { mutate } = useMutateUserProfile();
  const [user, setUser] = useLocalStorage("user");
  const [cart, setCart] = useLocalStorage("cart", []);
  const [qty, setQty] = useState(1);
  const [total, setTotal] = useState(0.0);

  const [alert, setAlert] = useState({});
  const [passwordAlert, setPasswordAlert] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [oldPasword, setOldPassword] = useState("");

  useEffect(() => {
    setTotal(
      cart.reduce(
        (sum, movie) => sum + movie.qty * parseFloat(movie.vote_average),
        0.0
      )
    );
  }, [cart]);

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

  const handleDelete = (e) => {
    const index = e.target.getAttribute("index");

    if (window.confirm("Are you sure?")) {
      setCart([...cart.filter((movie, key) => key != index)]);
      alert("Item was deleted.");
    }
  };
  let url = `product?id=${cart?.id}`;
  // const columns = [
  //   {
  //     title: "id",
  //     dataIndex: "id",
  //     key: "id",
  //   },

  //   {
  //     title: "name",
  //     dataIndex: "name",
  //     key: "name",
  //     render: (dataIndex) => {
  //       return (
  //         <p
  //           onClick={(e) => {
  //             console.log(e.target);
  //           }}
  //         >
  //           {dataIndex}
  //         </p>
  //       );
  //     },
  //   },

  //   {
  //     title: "qty",
  //     dataIndex: "qty",
  //     key: "qty",
  //   },
  //   {
  //     title: "Price",
  //     dataIndex: "price",
  //     key: "price",
  //     render: (dataIndex) => <a>{dataIndex} €</a>,
  //   },
  // ];
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
  let handleUsernameChange = (e) => {
    e.preventDefault();
    let id = user.id;
    if (username.length >= 5) {
      mutate(
        {
          id,
          username,
        },
        {
          onSuccess: () => {
            setAlert({
              message: "Username u ndryshua me sukses!",
              style: "p-2 text-green-600",
            });
          },
          onError: () => {
            setAlert({
              message: "Username nuk mund te ndryshohet!",
              style: "p-2 text-red-600",
            });
          },
        }
      );
    } else
      setAlert({
        message: "Username nuk mund te ndryshohet!",
        style: "p-2 text-red-600",
      });
  };
  let handlePasswordChange = (e) => {
    e.preventDefault();
    let id = user.id;
    if (oldPasword === user.password && password.length >= 5) {
      mutate(
        {
          id,
          password,
        },
        {
          onSuccess: () => {
            setPasswordAlert({
              message: "Password u ndryshua me sukses!",
              style: "p-2 text-green-600",
            });
          },
        }
      );
    } else
      setPasswordAlert({
        message: "Passwordi nuk mund te ndryshohet !",
        style: "p-2 text-red-600",
      });
  };

  return (
    <>
      <Header />
      <div className="container px-2 mx-auto flex flex-col gap-2 mt-4">
        Your shopping cart:
        <Table
          onRow={(record, rowIndex) => {
            return {
              onClick: (event, rowIndex) => {
                console.log(event, rowIndex);
              }, // click row
              onDoubleClick: (event) => {
                console.log("double click");
              }, // double click row
              onContextMenu: (event) => {
                console.log("context");
              }, // right button click row
              onMouseEnter: (event) => {}, // mouse enter row
              onMouseLeave: (event) => {}, // mouse leave row
            };
          }}
          dataSource={cart}
          // columns={columns}
        />
        <label htmlFor="username">
          Username: <span className={alert?.style}>{alert?.message}</span>
        </label>
        <input
          name="username"
          type="text"
          className="border p-1"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          defaultValue={user?.username}
        />
        <button
          className="border px-3 py-1 rounded bg-purple-500 text-white hover:bg-purple-400"
          onClick={handleUsernameChange}
        >
          Change Username
        </button>
        <label htmlFor="oldPassword">Old Password: </label>
        <input
          name="oldPassword"
          type="password"
          className="border p-1"
          defaultValue={""}
          onChange={(e) => {
            setOldPassword(e.target.value);
          }}
        />
        <label htmlFor="password">New Password: </label>
        <input
          name="password"
          type="password"
          className="border p-1"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          defaultValue={""}
        />
        {<span className={passwordAlert.style}>{passwordAlert.message}</span>}
        <button
          className="border px-3 py-1 rounded bg-purple-500 text-white hover:bg-purple-400"
          onClick={handlePasswordChange}
        >
          Change Password
        </button>
        <p>Admin: {(user.role = "admin" ? "true" : "false")}</p>
        <p></p>
      </div>
    </>
  );
}

export default Cart;
