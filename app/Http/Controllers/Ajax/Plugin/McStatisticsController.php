<?php

namespace App\Http\Controllers\Ajax\Plugin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class McStatisticsController extends Controller
{
    public function __construct() {
        $this->monthArray = [
            "Jan" => [],
            "Feb" => [],
            "Mar" => [],
            "Apr" => [],
            "May" => [],
            "Jun" => [],
            "Jul" => [],
            "Aug" => [],
            "Sep" => [],
            "Okt" => [],
            "Nov" => [],
            "Dec" => [],
        ];
    }

    public function getTotalDeaths() {
        $response = Http::get('http://localhost:7070/getPlayerDeaths');
        $data = json_decode($response->body(), true);
        return response(count($data["data"]));
    }

    public function getTotalPlayerKills() {
        $response = Http::get('http://localhost:7070/getPlayerKills');
        $data = json_decode($response->body(), true);
        return response(count($data["data"]));
    }

    public function getTotalEntityKills() {
        $response = Http::get('http://localhost:7070/getEntityKills');
        $data = json_decode($response->body(), true);
        return response(count($data["data"]));
    }

    public function getTotalPlayers() {
        $response = Http::get('http://localhost:7070/getTotalPlayers?serverReference=825eef96-7850-4b04-b169-892d2e57315b');
        $data = json_decode($response->body(), true);
        return response(count($data["data"]));
    }

    public function getTotalDeathsGraphData() {
        $response = Http::get('http://localhost:7070/getPlayerDeaths');
        $data = json_decode($response->body(), true);
        $sortedDates = $this->sortDates($data, "m");
        return response($sortedDates);
    }

    public function getTotalPlayersGraphData() {
        $response = Http::get('http://localhost:7070/getTotalPlayers?serverReference=825eef96-7850-4b04-b169-892d2e57315b');
        $data = json_decode($response->body(), true);
        $sortedDates = $this->sortDates($data, "m");
        return response($sortedDates);
    }

    public function getTotalEntityKillsGraphData() {
        $response = Http::get('http://localhost:7070/getEntityKills');
        $data = json_decode($response->body(), true);
        $sortedDates = $this->sortDates($data, "m");
        return response($sortedDates);
    }

    public function getTotalPlayerKillsGraphData() {
        $response = Http::get('http://localhost:7070/getPlayerKills');
        $data = json_decode($response->body(), true);
        $sortedDates = $this->sortDates($data, "m");
        return response($sortedDates);
    }

    private function sortDates($data, $type) {
        $tempNumber = false;
        $index = 0;
        $addedNew = false;

        foreach ($data["data"] as $item) {
            $index++;
            $year = date("y",strtotime($item["dateTime"]));
            $month = date("m",strtotime($item["dateTime"]));
            $day = date("d",strtotime($item["dateTime"]));

            $monthShort = date("M",strtotime($item["dateTime"]));

            if(!$tempNumber)
            {
                if($type === "y") {$tempNumber = $year; $this->monthArray["$monthShort"] = []; $this->monthArray["$monthShort"][] = $item;}
                elseif($type === "m") {$tempNumber = $month; $this->monthArray["$monthShort"] = []; $this->monthArray["$monthShort"][] = $item;}
                elseif($type === "d") {$tempNumber = $day; $this->monthArray["$monthShort"] = [];$this->monthArray["$monthShort"][] = $item;}
            }
            else
            {
                if($type === "y") {if($year > $tempNumber) {$tempNumber = $year; $this->monthArray["$monthShort"] = []; $this->monthArray["$monthShort"][] = $item; $addedNew = true;}}
                elseif($type === "m") {if($month > $tempNumber) {$tempNumber = $month; $this->monthArray["$monthShort"] = []; $this->monthArray["$monthShort"][] = $item; $addedNew = true;}}
                elseif($type === "d") {if($day > $tempNumber) {$tempNumber = $day; $this->monthArray["$monthShort"] = []; $this->monthArray["$monthShort"][] = $item; $addedNew = true;}}


                if($index === count($data["data"]) && $addedNew) {return $this->monthArray;}
                if($type === "y") {$this->monthArray["$monthShort"][] = $item;}
                elseif($type === "m") {$this->monthArray["$monthShort"][] = $item;}
                elseif($type === "d") {$this->monthArray["$monthShort"][] = $item;}
            }
        }

        return $this->monthArray;
    }
}
