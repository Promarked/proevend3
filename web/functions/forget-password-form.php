<?php

//recipient data
$toemail = $_POST['email']; // Your Email Address



if( isset( $_POST['submit-password'] ) ) {
    
    if( $toemail != ''  ) {
		$arrResult = array ('response'=>'success');
   
    } else {
		$arrResult = array ('response'=>'empty');	         
    }
    
} else {
		$arrResult = array ('response'=>'unexpected');
}
echo json_encode($arrResult);
?>