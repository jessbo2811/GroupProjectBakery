<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// gets the current month
$month = date('Y-m');

// Hardcoded data just for testing the calendar display
list($year, $mon) = explode('-', $month);
$daysInMonth = cal_days_in_month(CAL_GREGORIAN, (int)$mon, (int)$year);

$servername = "brighton";
$username   = "knc23_CI536_Tester";
$password   = "knc23_CI536_Tester";
$db         = "knc23_CI536_Assessment_Bakery";

$mysqli = new mysqli($servername, $username, $password, $db);

if ($mysqli->connect_errno) {
    echo json_encode(['error' => 'Connection failed: ' . $mysqli->connect_error]);
    exit();
}

$stmt = $mysqli->prepare("
    SELECT bookingDate 
    FROM tBooking 
    WHERE DATE_FORMAT(bookingDate, '%Y-%m') = ?
");

$stmt->bind_param("s", $month);
$stmt->execute();
$result = $stmt->get_result();

$bookedDates = [];
while ($row = $result->fetch_assoc()) {
    $bookedDates[$row['bookingDate']] = true;
}

$stmt->close();
$mysqli->close();

$calendarData = [];

for ($d = 1; $d <= $daysInMonth; $d++) {
    $dateStr = "$year-$mon-" . str_pad($d, 2, '0', STR_PAD_LEFT);

    // Day of week: 0 is sunday 1 is monday ect
    $dow = date('w', strtotime($dateStr));

    // no avilability on saturdays or sundays
    if ($dow == 0 || $dow == 6) {
        $calendarData[$dateStr] = ['status' => 'unavailable', 'slots' => 0];
    }
    // some random hardcoded unavailable days : the 5th, 12th and 20th
    elseif (in_array($d, [5, 12, 20])) {
        $calendarData[$dateStr] = ['status' => 'booked', 'slots' => 0];
    }
    // all other days should be available
    else {
        $calendarData[$dateStr] = ['status' => 'available', 'slots' => 1];
    }
}

echo json_encode($calendarData);
?>