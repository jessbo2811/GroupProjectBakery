<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Gets the current month
$month = isset($_GET['month']) ? $_GET['month'] : date('Y-m');

list($year, $mon) = explode('-', $month);
$daysInMonth = cal_days_in_month(CAL_GREGORIAN, (int)$mon, (int)$year);

$servername = "brighton";
$username = "knc23_CI536_Tester";
$password = "knc23_CI536_Tester";
$db = "knc23_CI536_Assessment_Bakery";

$mysqli = new mysqli($servername, $username, $password, $db);

if ($mysqli->connect_errno) {
    echo json_encode(['error' => 'Connection failed: ' . $mysqli->connect_error]);
    exit();
}

$stmt = $mysqli->prepare("
    SELECT cateringDate 
    FROM tCatering 
    WHERE DATE_FORMAT(cateringDate, '%Y-%m') = ?
");

$stmt->bind_param("s", $month);
$stmt->execute();
$result = $stmt->get_result();

$bookedDates = [];
while ($row = $result->fetch_assoc()) {
    $bookedDates[$row['cateringDate']] = true;
}

$stmt->close();
$mysqli->close();

echo json_encode($bookedDates);
?>