// @ts-nocheck
import React, { useState } from "react";
import {
  useMutateProfileUsername,
  useMutateEmail,
  useSingleUser,
  useMutatePassword,
} from "../components/hooks/useFetch";
import { useLocalStorage } from "@uidotdev/usehooks";
import Header from "./Header";
function Cart() {
  const { mutate } = useMutateProfileUsername();
  const { mutate: mutateEmail } = useMutateEmail();
  const { mutate: mutatePassword, data: passData } = useMutatePassword();
  const { data } = useSingleUser();
  const [user, setUser] = useLocalStorage("user");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordAlert, setPasswordAlert] = useState({});
  const [emailAlert, setEmailAlert] = useState({});
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [alert, setAlert] = useState({});

  if (!user) {
    return (
      <>
        <Header />
      </>
    );
  }

  let handleEmailChange = (e) => {
    e.preventDefault();
    let id = user.id;
    if (email.length >= 5) {
      mutateEmail(
        {
          id,
          email,
        },
        {
          onSuccess: () => {
            setEmailAlert({
              message: "Email u ndryshua me sukses!",
              style: "p-2 text-green-600",
            });
          },
          onError: () => {
            setEmailAlert({
              message: "Email nuk mund te ndryshohet!",
              style: "p-2 text-red-600",
            });
          },
        }
      );
    } else
      setEmailAlert({
        message: "Email nuk mund te ndryshohet!",
        style: "p-2 text-red-600",
      });
  };

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
    if (password) {
      mutatePassword(
        {
          id,
          oldPassword,
          password,
        },
        {
          onSuccess: (passData) => {
            let error = passData.data.message;
            console.log(passData);

            if (error) {
              setPasswordAlert({
                message: "Passwordi nuk mund te ndryshohet !",
                style: "p-2 text-red-600",
              });
            } else {
              setPasswordAlert({
                message: "Password u ndryshua me sukses!",
                style: "p-2 text-green-600",
              });
            }
          },
        }
      );
      console.log();
    } else
      setPasswordAlert({
        message: "Passwordi nuk mund te ndryshohet !",
        style: "p-2 text-red-600",
      });
  };

  return (
    <>
      <Header />
      <div className="container px-2 mx-auto flex flex-col gap-2">
        Profile
        <div className="flex justify-between border">
          <p>Your email: {data?.email}</p>
          <p>Your username: {data?.username}</p>
          <p className="capitalize ">
            Your role: <span className="text-purple-700">{user?.role}</span>
          </p>
        </div>
        {/* Email */}
        <label htmlFor="email">
          Email:{" "}
          <span className={emailAlert?.style}>{emailAlert?.message}</span>
        </label>
        <input
          name="email"
          type="email"
          className="border p-1"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          defaultValue={data?.email}
        />
        <button
          className="border px-3 py-1 rounded bg-purple-500 text-white hover:bg-purple-400"
          onClick={handleEmailChange}
        >
          Change Email
        </button>
        {/* Username */}
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
          defaultValue={data?.username}
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
      </div>
    </>
  );
}

export default Cart;
