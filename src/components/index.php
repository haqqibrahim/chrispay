

<?php  // API endpoint URL


    $url = 'https://api.fruitask.com/v3/tables/v0ArBUGRGnF5wTP/rows/?api_key=09462bb1dea5da31f530713422d6fa60';
    
    // Request payload
    $data = array(
        'Name' => 'John Doe',
        'Info' => 'john@example.com',
        'Level' => 300,
        'Department' => 'Software Engineering'
    );
    
    // Set headers
    $headers = array(
        'Content-Type: application/json'
    );
    
    // Initialize cURL session
    $curl = curl_init();
    
    // Set cURL options
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    
    // Execute the request
    $response = curl_exec($curl);
    
    // Check for errors
    if (curl_errno($curl)) {
        $error = curl_error($curl);
        // Handle the error
        echo "cURL Error: " . $error;
    } else {
        // Process the response
        echo $response;
    }
    
    // Close the cURL session
    curl_close($curl);
      ?>