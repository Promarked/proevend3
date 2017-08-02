<?php

//recipient data
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$company = $_POST['company'];
$country = $_POST['country']; 
$phone = $_POST['phone'];
$website = $_POST['website'];
$email = $_POST['email'];
$password = $_POST['password'];
$confirmpass = $_POST['confirmpass'];



if( isset( $_POST['submit-register'] ) ) {
    
    if( $firstname != '' && $lastname != '' && $company != '' && $country != '' &&  $phone != '' &&  $email != '' && $password != '' && $confirmpass != '' ) 			{
		if ($password == $confirmpass)  
		$arrResult = array ('response'=>'success');
		else 
		$arrResult = array ('response'=>'passerror');
   
    } else {
		$arrResult = array ('response'=>'empty');	         
    }
    
} else {
		$arrResult = array ('response'=>'unexpected');
}
echo json_encode($arrResult);
?>