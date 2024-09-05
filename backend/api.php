<?php
session_start();
include('config.php');
include('Database.php');
include('helpers/helpers.php');

header('Access-Control-Allow-Origin: *');
header('Content-Type: multipart/form-data');
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Authentication, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Allow-Origin");

if (get_domain() !== $config['domain']) {
  die("You dont have permissions to consume this API!");
}

$pdo = (new Database(
  $config['database']['type'],
  $config['database']['host'],
  $config['database']['name'],
  $config['database']['user']['username'],
  $config['database']['user']['password'],
))->connect();

$method = $_SERVER['REQUEST_METHOD'];
$payload = json_decode(file_get_contents('php://input'), true);


// ENDPOINTS

// AUTH
// Register
if (isset($payload['endpoint_name']) and ($payload['endpoint_name'] === 'register') and ($method === 'POST')) {
  // $role = $payload['role'];
  $username = $payload['username'];
  $email = $payload['email'];
  $password = $payload['password'];
  try {
    $stm = $pdo->prepare("INSERT INTO users (`username`,`email`,`password`) VALUES (?, ?, ?)");
    $user = $stm->execute([$payload['username'], $payload['email'], password_hash($payload['password'], PASSWORD_BCRYPT)]);
    if (!empty($user)) {
      echo json_encode(['message' => 'User was created successfully']);
    } else {
      http_response_code(400);
      json_encode(
        ['error' => 'error']
      );
    }
    if ($e->errorCode() != 23000) {
      http_response_code(400);

      json_encode('error');
    }
  } catch (Exception $error) {
    echo json_encode([
      $error->getMessage(),
    ]);
  }
}

if (isset($payload['endpoint_name']) and ($payload['endpoint_name'] === 'users') and $method === 'POST') {
  $SQL = "SELECT * FROM `users`";
  $stm = $pdo->prepare($SQL);
  $stm->execute();
  $users = $stm->fetchAll(PDO::FETCH_ASSOC);

  if ($users) {
    echo json_encode($users);
  } else {
    echo json_encode(['message' => 'There are no users']);
  }
}

// Login
if (isset($payload['endpoint_name']) and ($payload['endpoint_name'] === 'login') and ($method === 'POST')) {
  if (empty($payload['email']) or empty($payload['password'])) {
    die(json_encode(['message' => 'Username and Password are required!']));
  }
  $stm = $pdo->prepare("SELECT * FROM users WHERE EMAIL = ? LIMIT 1");
  $stm->execute([$payload['email']]);
  $user = $stm->fetch(PDO::FETCH_ASSOC);
  if ($user) {
    if (password_verify($payload['password'], $user['password'])) {
      $_SESSION['user'] = ["id" => $user['id'], "role" => $user['role'], "email" => $user["email"]];
      echo json_encode(
        $_SESSION['user']
      );
    } else {
      echo json_encode(['message' => 'Invalid Password']);
    }
  } else {
    echo json_encode(['message' => 'Invalid Credentials']);
  }
}

// is logged in? 
if (isset($payload['endpoint_name']) and ($payload['endpoint_name'] === 'is_logged_in') and ($method === 'POST')) {
  echo json_encode(isset($_SESSION['user']));
}

// Logout
if (isset($payload['endpoint_name']) and ($payload['endpoint_name'] === 'logout') and ($method === 'POST')) {
  if (isset($_SESSION['user'])) {
    unset($_SESSION['user']);
    echo json_encode(true);
  } else {
    echo json_encode(false);
  }
}

// Users

// User Profile
if (isset($payload['endpoint_name']) and ($payload['endpoint_name'] === 'profile') and $method === 'GET') {
  if (!isset($_SESSION['user'])) {
    die(json_encode(['message' => 'You are not logged in']));
  }
  $stm = $pdo->prepare("SELECT * FROM users WHERE email = ? LIMIT 1");
  $stm->execute([$_SESSION['user']['email']]);
  $user = $stm->fetch(PDO::FETCH_ASSOC);
  if ($user) {
    unset($user['id']);
    unset($user['password']);
    echo json_encode($user);
  }
}

// Orders

if (isset($payload['endpoint_name']) and ($payload['endpoint_name'] === 'orders') and $method === 'GET') {
  if (!isset($_SESSION['user'])) {
    die(json_encode(['message' => 'You are not logged in']));
  }
  $SQL = "SELECT `orders`.*, `order_line`.*, `users`.`email`, `users`.`username`
  FROM `orders` 
	INNER JOIN `order_line` ON `order_line`.`order_id` = `orders`.`id` 
	INNER JOIN `users` ON `orders`.`user_id` = `users`.`id`
    WHERE
    `users`.`email` = ?";
  $stm = $pdo->prepare($SQL);
  $stm->execute([$_SESSION['user']['email']]);
  $orders = $stm->fetchAll(PDO::FETCH_ASSOC);

  if ($orders) {
    echo json_encode($orders);
  } else {
    echo json_encode(['message' => 'You have no orders']);
  }
}
// Create Product
if (isset($payload['endpoint_name']) and ($payload['endpoint_name'] === 'add_product') and ($method === 'POST')) {
  $name = $payload['name'];
  $details = $payload['details'];
  $cost = $payload['cost'];
  $price = $payload['price'];
  $category = $payload['category'];

  $img = $payload['img'];
  try {
    $stm = $pdo->prepare("INSERT INTO `products` (`name`,`details`,`category`,`cost`, `price`,`img`) VALUES (?, ?, ?, ?, ?, ?)");
    $user = $stm->execute([$name, $details, $category, $cost, $price, $img]);
    if (!empty($user)) {
      echo json_encode(['message' => 'Product was created successfully']);
    } else {
      http_response_code(400);
      json_encode(
        ['error' => 'error']
      );
    }
  } catch (Exception $error) {
    echo json_encode([
      $error->getMessage(),
    ]);
  }
}
// All Products
if (isset($_GET['endpoint_name']) and ($_GET['endpoint_name'] === 'products') and $method === 'GET') {
  $pageNumber = $_GET['pageNumber'];
  $SQL = "SELECT `products`.*, `categories`.`name` as `category_name`
  FROM `products` 
	LEFT JOIN `categories` ON `products`.`category` = `categories`.`id`
  ORDER BY `products`.`created_at` DESC LIMIT $pageNumber, 9";

  $stm = $pdo->prepare($SQL);
  $stm->execute();
  $products = $stm->fetchAll(PDO::FETCH_ASSOC);


  if ($products) {
    // foreach ($products as $product) {
    echo json_encode($products);
    // }
  } else {
    echo json_encode(['message' => 'You have no products']);
  }
}

// Product BY ID
if (isset($_GET['endpoint_name']) &&  ($_GET['endpoint_name'] === 'published_products') && $method === 'GET') {
  // if (!isset($_GET['id']) || empty($_GET['id'])) {
  //   die(json_encode(['message' => 'Product ID is required!']));
  // }

  $stm = $pdo->prepare("SELECT * FROM `products` WHERE isPublished = 1");
  $stm->execute();
  $product = $stm->fetchAll(PDO::FETCH_ASSOC);

  if ($product) {
    echo json_encode($product);
  } else {
    echo json_encode([]);
  }
}


// Product BY Category
if (isset($_GET['endpoint_name']) &&  ($_GET['endpoint_name'] === 'products_by_category') && $method === 'GET') {
  if (!isset($_GET['category']) || empty($_GET['category'])) {
    die(json_encode(['message' => 'Product category is required!']));
  }

  $stm = $pdo->prepare(
    "SELECT `products`.*, `categories`.`name` as `category_name`
     FROM `products` 
     INNER JOIN `categories` ON `products`.`category` = `categories`.`id` 
     WHERE `categories`.`name` = ?"
  );
  $stm->execute([$_GET['category']]);
  $products = $stm->fetchAll(PDO::FETCH_ASSOC);
  if ($products) {
    echo json_encode($products);
  } else {
    echo json_encode(["message" => 'No products with category']);
  }
}

// Product BY ID
if (isset($_GET['endpoint_name']) &&  ($_GET['endpoint_name'] === 'products_by_id') && $method === 'GET') {
  if (!isset($_GET['id']) || empty($_GET['id'])) {
    die(json_encode(['message' => 'Product ID is required!']));
  }

  $stm = $pdo->prepare("SELECT * FROM `products` WHERE id = ? LIMIT 1");
  $stm->execute([$_GET['id']]);
  $product = $stm->fetch(PDO::FETCH_ASSOC);

  if ($product) {
    echo json_encode($product);
  } else {
    echo json_encode([]);
  }
}

// Update Product
if (isset($payload['endpoint_name']) &&  ($payload['endpoint_name'] === 'update_product') && $method === 'POST') {
  if (!isset($payload['id']) || empty($payload['id'])) {
    die(json_encode(['message' => 'Product ID is required!']));
  }
  $name = $payload['name'];
  $details = $payload['details'];
  $category = $payload['category'];
  $cost = $payload['cost'];
  $price = $payload['price'];
  $img = $payload['img'];
  $stock = $payload['stock'];
  $id = $payload['id'];
  $stm = $pdo->prepare("UPDATE `products` SET 
  `name`= COALESCE(?, `name`),
  `details` = COALESCE(?, `details`),
  `category` = COALESCE(?, `category`),
  `cost` = COALESCE(?, `cost`),
  `price` = COALESCE(?, `price`),
  `img` = COALESCE(?, `img`),
  `stock` = COALESCE(?, `stock`)
  WHERE `id` = ? LIMIT 1");

  $stm->execute([$name, $details, $category, $cost, $price,  $img, $stock, $id]);

  echo json_encode(["success" => "Updated successfully"]);
}
// Product Update Published
if (isset($payload['endpoint_name']) &&  ($payload['endpoint_name'] === 'update_published_product') && $method === 'POST') {
  if (!isset($payload['id']) || empty($payload['id'])) {
    die(json_encode(['message' => 'Product ID is required!']));
  }
  $isPublished = $payload['isPublished'];
  if ($isPublished) {
    $isPublished = 1;
  } else {
    $isPublished = 0;
  }
  $id = $payload['id'];
  $publish = $pdo->prepare("UPDATE `products` 
  SET 
  `isPublished` = ?
  WHERE `products`.`id` = ? LIMIT 1");
  $publish->execute([$isPublished, $id]);
  echo json_encode(["success" => "Updated successfully"]);
}

// Product Update Highlighted
if (isset($payload['endpoint_name']) &&  ($payload['endpoint_name'] === 'update_highlighted_product') && $method === 'POST') {
  if (!isset($payload['id']) || empty($payload['id'])) {
    die(json_encode(['message' => 'Product ID is required!']));
  }
  $isHighlighted = $payload['isHighlighted'];
  if ($isHighlighted) {
    $isHighlighted = 1;
  } else {
    $isHighlighted = 0;
  }
  $id = $payload['id'];
  $highlight = $pdo->prepare("UPDATE `products` 
  SET 
  `isHighlighted` = ?
  WHERE `products`.`id` = ? LIMIT 1");
  $highlight->execute([$isHighlighted, $id]);
  echo json_encode(["success" => "Updated successfully"]);
}

// Create Reviews
if (isset($payload['endpoint_name']) and ($payload['endpoint_name'] === 'add_review') and ($method === 'POST')) {
  $product_id = $payload['productId'];
  $user_id = $payload['userId'];
  $content = $payload['reviewText'];
  $rating = $payload['rating'];
  try {
    $stm = $pdo->prepare("INSERT INTO `reviews` (`product_id`,`user_id`,`content`,`rating`) VALUES (?, ?, ?, ?)");
    $user = $stm->execute([$product_id, $user_id, $content, $rating]);

    echo json_encode(['message' => 'Review was created successfully']);
  } catch (Exception $error) {
    echo json_encode([
      $error->getMessage(),
    ]);
  }
}
// Read Reviews
if (isset($_GET['endpoint_name']) &&  ($_GET['endpoint_name'] === 'product_reviews') && $method === 'GET') {
  if (!isset($_GET['id']) || empty($_GET['id'])) {
    die(json_encode(['message' => 'Product is required!']));
  }

  $stm = $pdo->prepare("SELECT `reviews`.*, `users`.`username` FROM `reviews` INNER JOIN `users` ON `reviews`.`user_id` = `users`.`id` WHERE `product_id` = ? ORDER BY `id` DESC");
  $stm->execute([$_GET['id']]);
  $reviews = [];

  while ($review = $stm->fetchAll(PDO::FETCH_ASSOC)) {
    $reviews[] = $review;
  }

  echo json_encode($reviews);
}
// Update Reviews
if (isset($payload['endpoint_name']) &&  ($payload['endpoint_name'] === 'update_review') && $method === 'POST') {
  if (!isset($payload['id']) || empty($payload['id'])) {
    die(json_encode(['message' => 'Review ID is required!']));
  }
  // $content = $payload['reviewText'];
  $rating = $payload['rating'];

  $id = $payload['id'];
  $stm = $pdo->prepare("UPDATE `reviews` SET 
  -- `content`= COALESCE(?, `content`),
  `rating` = ?
  WHERE `id` = ? LIMIT 1");

  $stm->execute([$rating, $id]);

  echo json_encode(["success" => "Updated successfully"]);
}

// Delete Review
if (isset($_GET['endpoint_name']) &&  ($_GET['endpoint_name'] === 'delete_review') && $method === 'DELETE') {
  if (!isset($_GET['id']) || empty($_GET['id'])) {
    die(json_encode(['message' => 'Review ID is required!']));
  }

  $stm = $pdo->prepare("DELETE FROM `reviews` WHERE `reviews`.`id` = ? LIMIT 1");
  $stm->execute([$_GET['id']]);
  echo json_encode(["success" => "deleted successfully"]);
}
// Delete Product
if (isset($_GET['endpoint_name']) &&  ($_GET['endpoint_name'] === 'delete_product') && $method === 'DELETE') {
  if (!isset($_GET['id']) || empty($_GET['id'])) {
    die(json_encode(['message' => 'Product ID is required!']));
  }

  $stm = $pdo->prepare("DELETE FROM `products` WHERE `products`.`id` = ? LIMIT 1");
  $stm->execute([$_GET['id']]);
  echo json_encode(["success" => "deleted successfully"]);
}

// Product Search
if (isset($_GET['endpoint_name']) &&  ($_GET['endpoint_name'] === 'search') && $method === 'GET') {
  if (!isset($_GET['q']) || empty($_GET['q'])) {
    die(json_encode(['message' => 'Search query is required!']));
  }
  $stm = $pdo->prepare("SELECT
    `products`.*,
    `categories`.`name` AS `category_name`
FROM
    `products`
LEFT JOIN `categories` ON `products`.`category` = `categories`.`id`
WHERE
    `products`.`name` LIKE :phrase");
  $q = '%' . $_GET['q'] . '%';
  $stm->bindValue(':phrase', $q, PDO::PARAM_STR);
  $stm->execute();
  $products = [];

  while ($product = $stm->fetch(PDO::FETCH_ASSOC)) {
    $products[] = $product;
  }
  echo json_encode($products);
}
// Create Category
if (isset($payload['endpoint_name']) and ($payload['endpoint_name'] === 'add_category') and ($method === 'POST')) {
  $name = $payload['name'];
  $imgUrl = $payload['imgUrl'];
  try {
    $stm = $pdo->prepare("INSERT INTO `categories` (`name`,`imgUrl`) VALUES (?, ?)");
    $user = $stm->execute([$payload['name'], $payload['imgUrl']]);
    if (!empty($user)) {
      echo json_encode(['message' => 'Category was created successfully']);
    } else {
      http_response_code(400);
      json_encode(
        ['error' => 'error']
      );
    }
  } catch (Exception $error) {
    echo json_encode([
      $error->getMessage(),
    ]);
  }
}
// All Categories
if (isset($_GET['endpoint_name']) and ($_GET['endpoint_name'] === 'categories') and $method === 'GET') {
  $SQL = "SELECT * FROM `categories`";
  $stm = $pdo->prepare($SQL);
  $stm->execute();
  $categories = $stm->fetchAll(PDO::FETCH_ASSOC);


  if ($categories) {
    // foreach ($products as $product) {
    echo json_encode($categories);
    // }
  } else {
    echo json_encode(['message' => 'You have no categories']);
  }
}
// Category BY ID
if (isset($_GET['endpoint_name']) &&  ($_GET['endpoint_name'] === 'category_by_id') && $method === 'GET') {
  if (!isset($_GET['id']) || empty($_GET['id'])) {
    die(json_encode(['message' => 'Category ID is required!']));
  }

  $stm = $pdo->prepare("SELECT * FROM `categories` WHERE id = ? LIMIT 1");
  $stm->execute([$_GET['id']]);
  $category = $stm->fetch(PDO::FETCH_ASSOC);

  if ($category) {
    echo json_encode($category);
  } else {
    echo json_encode([]);
  }
}
// Update Category
if (isset($payload['endpoint_name']) &&  ($payload['endpoint_name'] === 'update_category') && $method === 'POST') {
  if (!isset($payload['id']) || empty($payload['id'])) {
    die(json_encode(['message' => 'Category ID is required!']));
  }
  $name = $payload['name'];
  $imgUrl = $payload['imgUrl'];
  $id = $payload['id'];
  $stm = $pdo->prepare("UPDATE `categories` SET `name` = COALESCE(?, `name`), `imgUrl` = COALESCE(?, `imgUrl`) WHERE `categories`.`id` = ? LIMIT 1");
  $stm->execute([$name, $imgUrl, $id]);
  echo json_encode(["success" => "Updated successfully"]);
}

// Delete Category
if (isset($_GET['endpoint_name']) &&  ($_GET['endpoint_name'] === 'delete_category') && $method === 'DELETE') {
  if (!isset($_GET['id']) || empty($_GET['id'])) {
    die(json_encode(['message' => 'Category ID is required!']));
  }

  $stm = $pdo->prepare("DELETE FROM `categories` WHERE `categories`.`id` = ? LIMIT 1");
  $stm->execute([$_GET['id']]);
  echo json_encode(["success" => "deleted successfully"]);
}
// Reklama
if (isset($_GET['endpoint_name']) and ($_GET['endpoint_name'] === 'reklama') and $method === 'GET') {
  $SQL = "SELECT * FROM `reklama`;";
  $stm = $pdo->prepare($SQL);
  $stm->execute();
  $reklama = $stm->fetchAll(PDO::FETCH_ASSOC);


  if ($reklama) {
    // foreach ($products as $product) {
    echo json_encode($reklama);
    // }
  } else {
    echo json_encode(['message' => 'You have no ads']);
  }
}
