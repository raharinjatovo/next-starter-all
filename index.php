<?php
$servername = "81.19.215.20";
$username = "adventis_apps";
$password = "fycpgmAPfQHU7WxGQaZu";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
