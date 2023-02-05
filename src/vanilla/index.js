import './index.css';
import liff from '@line/liff'

document.addEventListener("DOMContentLoaded", function() {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {

        document.getElementById("liff").innerHTML = "1";

        const contextToken = ((token) => {   
            
            document.getElementById("liff").innerHTML = document.getElementById("liff").innerHTML + "2"

            const base64Url = token.split('.')[1];                             
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');    

            return JSON.parse( decodeURIComponent( escape( window.atob(base64) ) ) );

        })( liff.getDecodedIDToken().contextToken );

        document.getElementById("liff").innerHTML = document.getElementById("liff").innerHTML + "3"

        document.getElementById("liff").innerHTML = JSON.stringify(contextToken);

        document.getElementById("liff").innerHTML = document.getElementById("liff").innerHTML + "4"

        const url = process.env.LINE_LOGIN_API_ENDPOINT;
        const option = {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: (( data ) => {
                const form = new FormData();

                Object
                  .keys(data)
                  .forEach(key => form.append(key, data[key]));

                return form;

            })( { id_token: id_token, client_id: process.env.CHANNEL_ID } )
        };

        fetch(url, option).then((data) => {
            console.log(data);
            document.getElementById("liff").innerHTML = JSON.stringify(data.json());
        });

        console.log("Success! you can do something with LIFF API here.")
    })
    .catch((error) => {
        document.getElementById("catch").innerHTML = error
        console.log(error)
    })
});
