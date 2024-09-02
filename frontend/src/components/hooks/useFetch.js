// @ts-nocheck
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";
import { useToast } from "../ui/use-toast";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";

// Fetch All Products
const fetchProducts = async (pageNumber) => {
  return await apiClient.get(
    `api.php?endpoint_name=products&pageNumber=${pageNumber}`
  );
};
// Fetch All Products
export const useFetchProducts = (pageNumber) => {
  return useQuery({
    queryFn: async () => {
      const { data } = await fetchProducts(pageNumber);

      return data;
    },
    queryKey: ["products", pageNumber],
  });
};
// Fetch Products By Category
const fetchProductsByCategory = async (category) => {
  return await apiClient.get(
    `api.php?endpoint_name=products_by_category&category=${category}`
  );
};
// Fetch Products By Category
export const useFetchProductsByCategory = (category) => {
  return useQuery({
    queryFn: async () => {
      const { data } = await fetchProductsByCategory(category);

      return data;
    },
    queryKey: ["products", category],
  });
};

// Fetch Highlighted Articles
const fetchHighlightedArticles = async () => {
  return await apiClient.get(`news/top`);
};

// Fetch Highlighted Articles
export const useFetchHighlightedArticles = () => {
  return useQuery({
    queryFn: async () => {
      const { data } = await fetchHighlightedArticles();
      return data;
    },
    queryKey: ["highlighted articles"],
  });
};
// Fetch 1 Highlighted Articles
const fetchHighlightedArticle = async () => {
  return await apiClient.get(`news/top1`);
};

// Fetch 1 Highlighted Articles
export const useFetchHighlightedArticle = () => {
  return useQuery({
    queryFn: async () => {
      const { data } = await fetchHighlightedArticle();
      return data;
    },
    queryKey: ["highlighted article"],
  });
};
// Fetch Single Article
const fetchSingleArticle = async (id) => {
  return await apiClient.get(`api.php?endpoint_name=products_by_id&id=${id}`);
};
// Fetch Single Article
export const useSingleArticle = () => {
  const [queryParameter] = useSearchParams();
  let id = queryParameter.get("id");

  return useQuery({
    queryFn: async () => {
      const { data } = await fetchSingleArticle(id);
      return data;
    },
    queryKey: ["single product", id],
  });
};

// Fetch Searched Articles
const fetchSearchedArticles = async (q) => {
  let query = q.queryKey[1]?.q;
  if (query === undefined) return;
  return await apiClient.get(
    `api.php?endpoint_name=search&q=${q.queryKey[1].q}`
  );
};

// Fetch Searched Articles
export const useFetchSearchedArticles = (q) => {
  return useQuery({
    queryFn: async (q) => {
      if (!q) return;
      const { data } = await fetchSearchedArticles(q);
      return data;
    },
    queryKey: ["searched articles", { q }],
  });
};
// Fetch Search All Articles
const fetchSearchAllArticles = async (q) => {
  let query = q.queryKey[1].q;
  if (query.length >= 3) {
    return await apiClient.get(
      `api.php?endpoint_name=search&q=${q.queryKey[1].q}`
    );
  }
};

// Fetch Search All Articles
export const useFetchSearchAllArticles = (q) => {
  return useQuery({
    queryFn: async (q) => {
      const { data } = await fetchSearchAllArticles(q);
      return data;
    },
    queryKey: ["searched articles", { q }],
  });
};

//Add Product
const addProduct = async (product) => {
  const { name, details, cost, price, img, category } = product;

  return await apiClient.post("api.php", {
    endpoint_name: "add_product",
    name,
    details,
    cost,
    price,
    category,
    img,
  });
};
export const useAddProduct = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: addProduct,
    mutationKey: ["single product"],
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Success",
        description: "Produkti u krijua me sukses!",
      });
      setTimeout(() => {
        navigate("/dashboard/all");
      }, 5000);
    },
  });
};
//Mutate Product
const mutateSingleProduct = async (id) => {
  let {
    name,
    details,
    isHighlighted,
    category,
    isPublished,
    cost,
    price,
    img,
    stock,
  } = id;
  return await apiClient.post(`api.php`, {
    endpoint_name: "update_product",
    name,
    details,
    isHighlighted,
    category,
    isPublished,
    cost,
    price,
    img,
    stock,
    id: id.articleId,
  });
};
// Mutate Product
export const useMutateProduct = (product) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["single product"],
    mutationFn: mutateSingleProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["single product"],
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["searched articles"],
      });
    },
  });
};

//Delete Article
const deleteSingleArticle = async (id) => {
  return await apiClient.delete(`/news/${id}`);
};
// Delete Article
export const useDeleteArticle = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["single article"],
    mutationFn: deleteSingleArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["searched articles"] });
      queryClient.invalidateQueries({ queryKey: ["highlighted articles"] });
      queryClient.invalidateQueries({ queryKey: ["highlighted article"] });
    },
  });
};

// Categories
// Fetch All Categoris

const fetchCategories = async () => {
  return await apiClient.get(`api.php?endpoint_name=categories`);
};
// Fetch All Categories
export const useFetchCategories = () => {
  return useQuery({
    queryFn: async () => {
      const { data } = await fetchCategories();
      return data;
    },
    queryKey: ["categories"],
  });
};

// Fetch Single Category
const fetchSingleCategory = async (id) => {
  return await apiClient.get(`api.php?endpoint_name=category_by_id&id=${id}`);
};
// Fetch Single Category
export const useSingleCategory = () => {
  const [queryParameter] = useSearchParams();
  let id = queryParameter.get("id");

  return useQuery({
    queryFn: async () => {
      const { data } = await fetchSingleCategory(id);
      return data;
    },
    queryKey: ["single category", id],
  });
};
// Fetch Product Category
export const useProductCategory = (categId) => {
  let id = categId;

  return useQuery({
    queryFn: async (categId) => {
      const { data } = await fetchSingleCategory(id);
      return data;
    },
    queryKey: ["single category", id],
  });
};

//Add Category
const addCategory = async (category) => {
  const { name, imgUrl } = category;
  let data = {
    endpoint_name: "add_category",
    name,
    imgUrl,
  };
  return await apiClient.post("api.php", data);
};
export const useAddCategory = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: addCategory,
    mutationKey: ["single category"],
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Success",
        description: "Kategorite u modifikuan me sukses!",
      });
    },
  });
};

//Mutate Category
const useMutateSingleCategory = async (category) => {
  let { name, imgUrl, id } = category;
  return await apiClient.post(`api.php`, {
    _method: "PATCH",
    endpoint_name: "update_category",
    name,
    imgUrl,
    id,
  });
};
// Mutate Category
export const useMutateCategory = (category) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["single category"],
    mutationFn: useMutateSingleCategory,
    onSuccess: async (id) => {
      return await queryClient.invalidateQueries({
        queryKey: ["single category"],
      });
    },
    onSettled: (category) => {
      console.log(category.data);
    },
  });
};

//Delete Category
const deleteSingleCategory = async (id) => {
  return await apiClient.get(`/api.php?endpoint_name=delete_category&id=${id}`);
};
// Delete Category
export const useDeleteCategory = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["single category"],
    mutationFn: deleteSingleCategory,
    onSuccess: () => {
      console.log("applyed");

      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

// User Fetch Single User
const fetchSingleUser = async (id) => {
  return await apiClient.get(
    `api.php?endpoint_name=profile&email=${id?.email}`
  );
};
// User Fetch Single User
export const useSingleUser = () => {
  const [user, setUser] = useLocalStorage("user");
  let id = user?.email || "guest";
  return useQuery({
    queryFn: async () => {
      const { data } = await fetchSingleUser(id);
      return data;
    },
    queryKey: ["single user", id],
  });
};

//Mutate User Profile
const useMutateUser = async (user) => {
  let { email, password, likedArticles, isAdmin } = user;
  return await apiClient.patch(`/users/${user.id}`, {
    email,
    password,
    likedArticles,
    isAdmin,
  });
};
// Mutate User Profile
export const useMutateUserProfile = (user) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["single user"],
    mutationFn: useMutateUser,
    onSuccess: async (id) => {
      return await queryClient.invalidateQueries({
        queryKey: ["single user"],
      });
    },
    onSettled: (user) => {
      console.log(user.data);
    },
  });
};

// Login
const fetchUsers = async (username, password) => {
  return await apiClient.post(`api.php`, {
    endpoint_name: "login",
    username,
    password,
  });
};
// Query All Users
export const useFetchUsers = () => {
  return useQuery({
    queryFn: async () => {
      const { data } = await fetchUsers();
      return data;
    },
    queryKey: ["users"],
  });
};
//Delete User
const deleteSingleUser = async (id) => {
  return await apiClient.delete(`/users/${id}`);
};
// Delete User
export const useDeleteUser = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["single user"],
    mutationFn: deleteSingleUser,
    onSuccess: () => {
      queryClient.invalidateQueries(
        { queryKey: ["users"] },
        queryClient.invalidateQueries({ queryKey: ["searched users"] })
      );
    },
  });
};
//Mutate User
const useMutateSingleUser = async (user) => {
  let { username, password, isAdmin } = user;
  return await apiClient.patch(`/users/${user.userId}`, {
    username,
    password,
    isAdmin,
  });
};
// Mutate User
export const useMutateUsers = (user) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["user"],
    mutationFn: useMutateSingleUser,
    onSuccess: async (id) => {
      return await queryClient.invalidateQueries({
        queryKey: ["single user"],
      });
    },
  });
};
// Fetch Searched Users
const fetchSearchedUsers = async (q) => {
  let query = q.queryKey[1]?.q;
  if (query === undefined) return;
  return await apiClient.get(`/users/search/${q.queryKey[1].q}`);
};

// Fetch Searched Users
export const useFetchSearchedUsers = (q) => {
  return useQuery({
    queryFn: async (q) => {
      if (!q) return;
      const { data } = await fetchSearchedUsers(q);
      return data;
    },
    queryKey: ["searched users", { q }],
  });
};

// Fetch All Reklama
const fetchReklama = async () => {
  return await apiClient.get(`/api.php?endpoint_name=reklama`);
};
// Query All Reklama
export const useFetchReklama = () => {
  return useQuery({
    queryFn: async () => {
      const { data } = await fetchReklama();
      return data;
    },
    queryKey: ["reklama"],
  });
};

//Add Reklama
const addReklama = async (reklama) => {
  return await apiClient.post("/reklama", reklama);
};
export const useAddReklama = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addReklama,
    mutationKey: ["single reklama"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reklama"],
      });
    },
  });
};

//Mutate Reklama
const useMutateSingleReklama = async (reklama) => {
  let {
    title,
    imgUrl,
    isPublished,
    partner,
    targetUrl,
    startsAt,
    endsAt,
    buttonMessage,
  } = reklama;
  return await apiClient.patch(`/reklama/${reklama.reklamaId}`, {
    title,
    imgUrl,
    isPublished,
    partner,
    targetUrl,
    startsAt,
    endsAt,
    buttonMessage,
  });
};
// Mutate Reklama
export const useMutateReklama = (reklama) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["mutate reklama"],
    mutationFn: useMutateSingleReklama,
    onSuccess: async (id) => {
      return await queryClient.invalidateQueries({
        queryKey: ["reklama"],
      });
    },
  });
};

//Delete Reklama
const deleteSingleReklama = async (id) => {
  return await apiClient.delete(`/reklama/${id}`);
};
// Delete Reklama
export const useDeleteReklama = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete reklama"],
    mutationFn: deleteSingleReklama,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reklama"],
      });
    },
  });
};
// User Fetch Single Reklame
const fetchSingleReklama = async (id) => {
  return await apiClient.get(`/reklama/${id}`);
};
// User Fetch Single Reklame
export const useSingleReklama = (id) => {
  return useQuery({
    queryFn: async (id) => {
      const { data } = await fetchSingleReklama(id);
      return data;
    },
    queryKey: ["single reklama", id],
  });
};
// Fetch Searched Reklama
const fetchSearchedReklama = async (q) => {
  let query = q.queryKey[1]?.q;
  if (query === undefined) return;
  return await apiClient.get(`/reklama/search/${q.queryKey[1].q}`);
};

// Fetch Searched Users
export const useFetchSearchedReklama = (q) => {
  return useQuery({
    queryFn: async (q) => {
      if (!q) return;
      const { data } = await fetchSearchedReklama(q);
      return data;
    },
    queryKey: ["searched reklama", { q }],
  });
};
