<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    */

'paths' => ['api/*', 'sanctum/csrf-cookie'], 
'allowed_methods' => ['*'], 

'allowed_origins' => ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5179', 'http://localhost:5174'], // Incluye todas las URLs de tu frontend.

'allowed_headers' => ['*'], 

'supports_credentials' => true, 

];
