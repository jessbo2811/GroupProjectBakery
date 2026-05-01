<?php

if (isset($_POST['send_enq'])) {
    storeEnquiry();
}

function improve_input($data){
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

function storeEnquiry(){

    echo "<h3>storeEnquiry() Called</h3>";

    $servername = "brighton";
    $username = "knc23_CI536_Tester";
    $password = "knc23_CI536_Tester";
    $db="knc23_CI536_Assessment_Bakery";

    $mysqli = new mysqli($servername, $username,$password,$db);

    // check connection
    if ($mysqli->connect_errno) {
        printf("Connect failed why oh why: %s\n", $mysqli->connect_error);
        exit();
    }

    $ID = $mysqli->query("SELECT MAX(enquiryID) AS currentMaxEnquiryID FROM tEnquiry;");
    $searchRows = $ID->fetch_assoc();
    $currentMaxEnquiryID = $searchRows['currentMaxEnquiryID'] ?? 0;

    $enquiryID = $currentMaxEnquiryID + 1;
    $email = improve_input($_POST['email']);
    $enquirySubject = improve_input($_POST['enquirysubject'] ?? '');
    $enquiry = improve_input($_POST['enquiry']);

    echo "<p>Attempting to insert comment on $enquiryID</p>";

    $insertDataEnquirySQL = "INSERT INTO tEnquiry (enquiryID, enquiryEmail, enquirySubject, enquiry)
                             VALUES ($enquiryID, '$email', '$enquirysubject', '$enquiry')";

    if ($mysqli->query($insertDataEnquirySQL) === TRUE) {
        echo "Enquiry added to database";
    } else {
        echo "Error: " . $mysqli->error;
    }

    $mysqli->close();
}

?>
