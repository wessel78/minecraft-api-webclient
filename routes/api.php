<?php

use App\Http\Controllers\Ajax\Plugin\McApiController;
use App\Http\Controllers\Ajax\Plugin\McStatisticsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::name('data.')->prefix('/data')->group(function(){
    Route::get('/getOnlinePlayers', [McApiController::class, 'getOnlinePlayers'])->name('get.online.players');
});

Route::name('stats.')->prefix('/stats')->group(function(){
   Route::get('/getTotalDeaths', [McStatisticsController::class, 'getTotalDeaths'])->name('get.total.deaths');
   Route::get('/getTotalPlayerKills', [McStatisticsController::class, 'getTotalPlayerKills'])->name('get.total.player.kills');
   Route::get('/getTotalEntityKills', [McStatisticsController::class, 'getTotalEntityKills'])->name('get.total.entity.kills');
   Route::get('/getTotalPlayers', [McStatisticsController::class, 'getTotalPlayers'])->name('get.total.players');

   Route::get('/getTotalDeathsGraph', [McStatisticsController::class, 'getTotalDeathsGraphData'])->name('get.total.deaths.graph');
   Route::get('/getTotalPlayersGraph', [McStatisticsController::class, 'getTotalPlayersGraphData'])->name('get.total.players.graph');
   Route::get('/getTotalEntityKillsGraph', [McStatisticsController::class, 'getTotalEntityKillsGraphData'])->name('get.total.entity.kills.graph');
   Route::get('/getTotalPlayerKillsGraph', [McStatisticsController::class, 'getTotalPlayerKillsGraphData'])->name('get.total.player.kills.graph');

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
