<?php

if (isset($_POST['send_enq'])) {
    storeEnquiry();
}

function improve_input($data) {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

function storeEnquiry() {

    $servername = "brighton";
    $username = "knc23_CI536_Tester";
    $password = "knc23_CI536_Tester";
    $db = "knc23_CI536_Assessment_Bakery";

    $mysqli = new mysqli($servername, $username, $password, $db);

    // Check connection
    if ($mysqli->connect_errno) {
        printf("Connection failed: %s\n", $mysqli->connect_error);
        exit();
    }

    $ID = $mysqli->query("SELECT MAX(enquiryID) AS currentMaxEnquiryID FROM tEnquiry;");
    $searchRows = $ID->fetch_assoc();
    $currentMaxEnquiryID = $searchRows['currentMaxEnquiryID'] ?? 0;

    $enquiryID = $currentMaxEnquiryID + 1;
    $email = improve_input($_POST['email']);
    $enquirySubject = improve_input($_POST['enquirysubject'] ?? '');
    $enquiry = improve_input($_POST['enquiry']);

    $stmt = $mysqli->prepare("INSERT INTO tEnquiry (enquiryEmail, enquirySubject, enquiry) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $email, $enquirySubject, $enquiry);

    if ($stmt->execute()) {
        echo "Enquiry added to database.";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $mysqli->close();
}

?>