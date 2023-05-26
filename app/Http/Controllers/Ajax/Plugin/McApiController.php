<?php

namespace App\Http\Controllers\Ajax\Plugin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;

class McApiController extends Controller
{
    public function getOnlinePlayers()
    {
        $response = Http::get('http://localhost:7070/getOnlinePlayers');
        return response(json_encode($response->body(), JSON_UNESCAPED_SLASHES));
    }
}
