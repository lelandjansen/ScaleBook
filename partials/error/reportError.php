<?php

/*
  ScaleBook
  reportError.php
  v0.0.1
  Copyright (c) Leland Jansen 2015. All rights reserved.
*/

$userInput            = $_POST["userInput"];
$userName             = $_POST["name"];
$userEmail            = $_POST["userEmail"];
$userErrorDescription = $_POST["userErrorDescription"];

$to                   = "leland@thejansens.ca";
$subject              = "Error report form submission";
$message              = "Name: " . $userName . "\n" . "Email: " . $userEmail . "\n\n" . "User input: " . $userInput . "\n\n" . "Error description:" . "\n" . $userErrorDescription;
$headers              = "From: " . $userName . " <" . $userEmail . ">";


mail ($to, $subject, $message, $headers);

echo "Thank you for your feedback.";
header("location: http://www.scalebook.org/#/error-submitted");

?>
