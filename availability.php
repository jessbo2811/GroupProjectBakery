<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// gets the current month
$month = date('Y-m');

// Hardcoded data just for testing the calendar display
list($year, $mon) = explode('-', $month);
$daysInMonth = cal_days_in_month(CAL_GREGORIAN, (int)$mon, (int)$year);

$testData = [];

for ($d = 1; $d <= $daysInMonth; $d++) {
    $dateStr = "$year-$mon-" . str_pad($d, 2, '0', STR_PAD_LEFT);

    // Day of week: 0 is sunday 1 is monday ect
    $dow = date('w', strtotime($dateStr));

    // no avilability on saturdays or sundays
    if ($dow == 0 || $dow == 6) {
        $testData[$dateStr] = ['status' => 'unavailable', 'slots' => 0];
    }
    // some random hardcoded unavailable days : the 5th, 12th and 20th
    elseif (in_array($d, [5, 12, 20])) {
        $testData[$dateStr] = ['status' => 'booked', 'slots' => 0];
    }
    // all other days should be available
    else {
        $testData[$dateStr] = ['status' => 'available', 'slots' => 1];
    }
}

echo json_encode($testData);
?>