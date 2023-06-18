import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import Swich from '@/pages/controlAdmin/switch';

function page() {
    useEffect(() => {
        const buycard = document.getElementById('BuyCardBtn',) as HTMLInputElement | null;
        const usecard = document.getElementById('UseCardBtn',) as HTMLInputElement | null;
        buycard?.addEventListener("click", buyYet)
        usecard?.addEventListener("click", useYet)
        function buyYet() {
            if (buycard != null) {
                if (buycard.checked) {
                    console.log("checked")
                }
                else if (buycard.checked) {
                    console.log("not yet check")
                }
            }
        }
        function useYet() {
            if (usecard != null) {
                if (usecard.checked) {
                    console.log("checked")
                }
                else if (usecard.checked) {
                    console.log("not yet check")
                }
            }
        }
        return () => {
            buycard?.removeEventListener("click", buyYet)
            usecard?.removeEventListener("click", useYet)
            console.log("cleaned up")
        }
    })
    return (

        <div className="p-3 h-screen justify-center items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
            {/* <Head>
      <script type="text/javascript" src="/controlPage.ts"></script>
    </Head> */}
     <div className="flex w-full h-1/4 justify-center items-center bg-purple-200	">
            <Swich id2='BuyCardBtn' name='buy card'/>
            <Swich id2='UseCardBtn' name='use card'/>
            </div>
            <div>
            </div>
            {/* <Script src="./controlPage.ts" /> */}
            {/* <script type="text/javascript" src="./controlPage.ts"></script> */}

        </div>

    )

}



export default page;