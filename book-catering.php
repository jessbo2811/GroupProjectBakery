<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
    exit();
}

$servername = "brighton";
$username = "knc23_CI536_Tester";
$password = "knc23_CI536_Tester";
$db = "knc23_CI536_Assessment_Bakery";

$mysqli = new mysqli($servername, $username, $password, $db);

if ($mysqli->connect_errno) {
    echo json_encode(['success' => false, 'message' => 'DB connection failed']);
    exit();
}

$email      = htmlspecialchars(trim($_POST['email']), ENT_QUOTES); // To handle any names with an apostrophe like o'brien or something
$menuChoice = htmlspecialchars(trim($_POST['menu-choice']), ENT_QUOTES);
$date       = htmlspecialchars(trim($_POST['catering-date']), ENT_QUOTES);

$check = $mysqli->prepare("SELECT bookingID FROM tBooking WHERE bookingDate = ?");
$check->bind_param("s", $date);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'That date is already booked']);
    $check->close();
    $mysqli->close();
    exit();
}
$check->close();

$stmt = $mysqli->prepare("
    INSERT INTO tBooking (bookingEmail, menuChoice, bookingDate)
    VALUES (?, ?, ?)
");
$stmt->bind_param("sss", $email, $menuChoice, $date);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => $stmt->error]);
}

$stmt->close();
$mysqli->close();
?>