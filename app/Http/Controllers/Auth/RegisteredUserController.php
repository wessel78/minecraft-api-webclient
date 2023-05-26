<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(Request $request): Response
    {
        if(!$this->checkServerReferenceId($request))
        {
            return Inertia::render('Auth/Login');
        }
        else
        {
            return Inertia::render('Auth/Register');
        }
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $this->activateApiToken($request);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }

    private function activateApiToken($request) {
        $request = Http::withBody(json_encode(["reference" => $request->serverReference]), 'application/json')->post("http://localhost:7070/activateApiToken");
        if($request->status() === 200) {return true;} else {return false;}
    }

    private function checkServerReferenceId($request) {
        $serverReference = $request->input('serverReference');
        $response = Http::get("http://localhost:7070/checkReferenceId?reference=$serverReference");
        $parsedData = json_decode($response, true);

        if($parsedData['data']["reference"] === null || $parsedData['data']["id"] === 0) {return false;}
        if($parsedData['data']["active"]) { return false;}
        return true;
    }
}
