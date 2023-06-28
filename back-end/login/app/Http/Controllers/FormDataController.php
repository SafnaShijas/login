<?php

namespace App\Http\Controllers;
use App\Models\userdata;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\Transport;
use Symfony\Component\Mime\Email;
class FormDataController extends Controller
{
    public function saveFormData(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'email' => 'required|email',
            'country_id' => 'required|exists:countries,id',
            'regions_id' => 'required|exists:regions,id',
        ]);

        // Create a new FormData instance and assign the validated data
        $formData = new userdata();
        $formData->firstname = $validatedData['firstname'];
        $formData->lastname = $validatedData['lastname'];
        $formData->email = $validatedData['email'];
        $formData->country_id = $validatedData['country_id'];
        $formData->regions_id = $validatedData['regions_id'];

        // Save the form data into the database
        $formData->save();

        // Return a JSON response indicating success

        $email = (new Email())
                ->from('abhiravi889833@gmail.com')
                ->to('grp.abhiram@gmail.com')
                ->subject('Hello')
                ->text('Your account created.')
                ->html('<h1>Click here to update password</h1>');
    
            // Create the SMTP transport
            $transport = Transport::fromDsn('smtp://abhiravi889833@gmail.com:gcsmypoquyicuqst@smtp.gmail.com:587');
    
            // Create the Mailer instance and send the email
            $mailer = new Mailer($transport);
            $mailer->send($email);
    
            // Email sent successfully
            
            return response()->json(['message' => 'Form data saved successfully and email sent'], 200);
    }
}
