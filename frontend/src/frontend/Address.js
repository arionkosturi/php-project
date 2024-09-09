// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
  useSingleUser,
  useAddAddress,
  useGetAddress,
  useUpdateAddress,
} from "../components/hooks/useFetch";
import { useLocalStorage } from "@uidotdev/usehooks";
import Header from "./Header";
function Address() {
  const [user, setUser] = useLocalStorage("user");
  let userId = user.id;
  const { mutate: addAddress } = useAddAddress();
  const { mutate: mutateAddress } = useUpdateAddress();
  const { data } = useSingleUser();
  const { data: userAddress } = useGetAddress(userId);
  const [address, setAddress] = useState();
  const [shteti, setShteti] = useState("Shqiperi");

  if (!user) {
    return (
      <>
        <Header />
      </>
    );
  }

  let handleAddAddress = () => {
    let userId = user.id;
    addAddress({
      userId,
      address,
      shteti,
    });
  };
  let handleMutateAddress = () => {
    let id = user.id;

    mutateAddress({
      id,
      address,
      shteti,
    });
  };

  return (
    <>
      <Header />
      {userAddress ? (
        <div className="container px-2 mx-auto flex flex-col gap-2">
          <p className="mt-6 text-center text-xl">Modifikoni adresen</p>
          {/* Address */}
          <label htmlFor="address">Address: </label>
          <input
            name="address"
            type="text"
            className="border p-1"
            defaultValue={userAddress?.address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          {/* Username */}
          <label htmlFor="shteti">Shteti:</label>
          <select
            id="shteti"
            className="p-2"
            // value={""}
            onChange={(e) => {
              setShteti(e.target.value);
            }}
          >
            {" "}
            <option value="">{userAddress?.shteti}</option>
            <option value="Shqiperi">Shqiperi</option>
            <option value="Maqedoni">Maqedoni</option>
            <option value="Kosove">Kosove</option>
          </select>
          <button
            className="border px-3 py-1 rounded bg-purple-500 text-white hover:bg-purple-400"
            onClick={handleMutateAddress}
          >
            Update Address
          </button>
          <a
            href="/orders"
            className="mt-10 text-blue-600 underline hover:underline hover:text-blue-400"
          >
            See your orders
          </a>
        </div>
      ) : (
        <div className="container px-2 mx-auto flex flex-col gap-2">
          Ju lutem vendosni adresen tuaj
          {/* Address */}
          <label htmlFor="address">Address: </label>
          <input
            name="address"
            type="text"
            className="border p-1"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          {/* Username */}
          <label htmlFor="shteti">Shteti:</label>
          <select
            id="shteti"
            className="p-2"
            onChange={(e) => {
              console.log(e.target.value);

              setShteti(e.target.value);
            }}
          >
            <option value="Shqiperi">Shqiperi</option>
            <option value="Maqedoni">Maqedoni</option>
            <option value="Kosove">Kosove</option>
          </select>
          <button
            className="border px-3 py-1 rounded bg-purple-500 text-white hover:bg-purple-400"
            onClick={handleAddAddress}
          >
            Add Address
          </button>
        </div>
      )}
    </>
  );
}

export default Address;
