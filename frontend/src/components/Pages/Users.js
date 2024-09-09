// @ts-nocheck
import React, { useState } from "react";
import Header from "../Header";
import Dashboard from "./Dashboard";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Alert from "../Alert";
import {
  useFetchUsers,
  useDeleteUser,
  useSingleUser,
  useMutateUsersRole,
  useFetchSearchedUsers,
  useMutatePasswordByAdmin,
} from "../hooks/useFetch";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import LeftPanel from "./LeftPanel";
import useDebounce from "../../frontend/useDebounce";
import { useLocalStorage } from "@uidotdev/usehooks";

function FetchUsers({ loggedUser, searchTerm }) {
  const { data: users, isPending, error } = useFetchUsers();
  const { mutate: remove } = useDeleteUser();
  const { mutate } = useMutateUsersRole();
  const { mutate: mutateRole } = useMutateUsersRole();
  const { mutate: mutatePassword } = useMutatePasswordByAdmin();
  const [newPassword, setNewPassword] = useState();
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { data: searchUsers } = useFetchSearchedUsers(debouncedSearch);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return searchTerm?.length > 0
    ? searchUsers?.length > 0 &&
        searchUsers?.map((user) => {
          return (
            <TableRow key={user?.id}>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>
                <Select
                  className="flex justify-end"
                  onValueChange={(value) => {
                    let id = user.id;
                    if (id !== loggedUser.id) {
                      mutateRole({
                        id,
                        role: value,
                      });
                    }
                  }}
                >
                  <SelectTrigger
                    className="flex items-center w-[170px] md:w-[280px] max-w-[480px]"
                    disabled={user.id === loggedUser.id}
                  >
                    <SelectValue
                      placeholder={user.role == "admin" ? "Admin" : "Client"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right">
                {" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mr-2">
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Change User Password</DialogTitle>
                      <DialogDescription>
                        <div className="mt-2">
                          Jeni duke ndryshuar passwordin per perdoruesin:{" "}
                          <span className="text-md text-red-600">
                            {user.username}
                          </span>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Password
                        </Label>
                        <Input
                          autoComplete="off"
                          id="password"
                          defaultValue=""
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                          }}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        onClick={() => {
                          let id = user.id;
                          mutatePassword({
                            id,
                            password: newPassword,
                          });
                        }}
                      >
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Alert
                  alertTitle={"Po fshin perdoruesin"}
                  alertMessage={`Deshiron ta fshish perdoruesin: "${user.username}" ?`}
                  handleFunction={(e) => {
                    let id = user.id;
                    if (loggedUser.id !== id) {
                      remove(id);
                    }
                  }}
                  alertTriggerButton={
                    <Button
                      variant={"destructive"}
                      disabled={loggedUser.id === user.id}
                    >
                      {" "}
                      Detele{" "}
                    </Button>
                  }
                />
              </TableCell>
            </TableRow>
          );
        })
    : users &&
        users?.map((user) => {
          return (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>
                <Select
                  className="flex justify-end"
                  onValueChange={(value) => {
                    let id = user.id;
                    if (id !== loggedUser.id) {
                      mutateRole({
                        id,
                        role: value,
                      });
                    }
                  }}
                >
                  <SelectTrigger
                    className="flex items-center w-[170px] md:w-[280px] max-w-[480px]"
                    disabled={user.id === loggedUser.id}
                  >
                    <SelectValue
                      placeholder={user?.role == "admin" ? "Admin" : "Client"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right">
                {" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mr-2">
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Change User Password</DialogTitle>
                      <DialogDescription>
                        <div className="mt-2">
                          Jeni duke ndryshuar passwordin per perdoruesin:{" "}
                          <span className="text-md text-red-600">
                            {user.username}
                          </span>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Password
                        </Label>
                        <Input
                          autoComplete="off"
                          id="password"
                          defaultValue=""
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                          }}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        onClick={() => {
                          let id = user.id;
                          mutatePassword({
                            id,
                            password: newPassword,
                          });
                        }}
                      >
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Alert
                  alertTitle={"Po fshin perdoruesin"}
                  alertMessage={`Deshiron ta fshish perdoruesin: "${user.username}" ?`}
                  handleFunction={(e) => {
                    let id = user.id;
                    if (loggedUser.id !== id) {
                      remove(id);
                    }
                  }}
                  alertTriggerButton={
                    <Button
                      variant={"destructive"}
                      disabled={loggedUser.id === user.id}
                    >
                      {" "}
                      Detele{" "}
                    </Button>
                  }
                />
              </TableCell>
            </TableRow>
          );
        });
}

function Users() {
  const [loggedUser, setLoggedUser] = useLocalStorage("user");
  const [searchTerm, setSearchTerm] = useState();

  let handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  if (loggedUser?.role !== "admin") {
    return <Dashboard />;
  }

  return (
    loggedUser?.role == "admin" && (
      <>
        <Header />
        <div className="container mx-auto mb-2">
          <h1 className="text-3xl">
            Users
            <span className="bg-green-500 text-white ml-2 px-2 py-1">
              Management
            </span>
          </h1>
        </div>
        <div className="container mx-auto flex gap-4">
          <div className="flex flex-col md:flex-row container mx-auto">
            <LeftPanel />

            <section className="container mx-auto">
              <div className="flex items-center">
                <div className="flex mx-auto items-center ">
                  <label htmlFor="search__input" className="w-full">
                    Search User
                  </label>
                  <input
                    type="search"
                    id="search__input"
                    onChange={handleSearch}
                    className=" border-purple-600 w-full bg-white dark:bg-neutral-900 focus:ring-opacity-70 p-1 border border-opacity-30 focus:outline-none focus:ring focus:ring-purple-600"
                    placeholder="Username or Email"
                  />
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      {" "}
                      <div className="flex items-center">Username</div>
                    </TableHead>
                    <TableHead className="text-center">Email</TableHead>
                    <TableHead className="text-center">Role</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <FetchUsers loggedUser={loggedUser} searchTerm={searchTerm} />
                </TableBody>
              </Table>
            </section>
          </div>
        </div>
      </>
    )
  );
}

export default Users;
