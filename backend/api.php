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
  $role = $payload['role'];
  $fullname = $payload['fullname'];
  $email = $payload['email'];
  $password = $payload['password'];

  if (empty($payload['fullname']) or empty($payload['email']) or empty($payload['password']) or empty($payload['role'])) {
    die(json_encode(['message' => 'Role, fullname, email and password are required!']));
  }
  $stm = $pdo->prepare("INSERT INTO users (`fullname`,`email`,`password`,`role`) VALUES (?, ?, ?, ?)");

  if ($stm->execute([$payload['fullname'], $payload['email'], password_hash($payload['password'], PASSWORD_BCRYPT), $payload['role']])) {
    echo json_encode(['message' => 'User was created successfully']);
  } else {
    json_encode(['message' => 'Something went wrong!']);
  }
}

// Login
if (isset($payload['endpoint_name']) and ($payload['endpoint_name'] === 'login') and ($method === 'POST')) {
  if (empty($payload['email']) or empty($payload['password'])) {
    die(json_encode(['message' => 'Email and Password are required!']));
  }
  $stm = $pdo->prepare("SELECT * FROM users WHERE EMAIL = ? LIMIT 1");
  $stm->execute([$payload['email']]);
  $user = $stm->fetch();
  if ($user) {
    if (password_verify($payload['password'], $user['password'])) {
      $_SESSION['user'] = ["role" => $user['role'], "email" => $user["email"]];
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
