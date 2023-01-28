import React, { useEffect, useState } from "react";

export default function Polis() {
  const [userID, setUserID] = useState<string>();

  const uuidv4 = () =>  {
    // It depends on the crypto API, which is supported by 97.4% of browsers
    if (window.crypto) {
      return (String(1e7) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          Number(c) ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))
        ).toString(16)
      )
      // fallback which uses timestamp and ms since browser opened to come up with a uuid
    } else {
      var d = new Date().getTime() //Timestamp
      var d2 = (performance && performance.now && performance.now() * 1000) || 0 //Time in microseconds since page-load or 0 if unsupported
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
          var r = Math.random() * 16 //random number between 0 and 16
          if (d > 0) {
            //Use timestamp until depleted
            r = (d + r) % 16 | 0
            d = Math.floor(d / 16)
          } else {
            //Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0
            d2 = Math.floor(d2 / 16)
          }
          return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
        }
      )
    }
  }

  useEffect(() => {
    if (localStorage.polisUserXID !== "undefined" && localStorage.polisUserXID !== undefined) {
      setUserID(localStorage.polisUserXID)
      console.log('Existing polisUserXID found:', localStorage.polisUserXID)
    } else {
      setUserID(uuidv4())
      console.log('Assigning new polisUserXID:', userID)
      localStorage.polisUserXID = userID
    }
  }, [userID]);

  useEffect(() => {
    const script = document.createElement('script');
  
    script.src = "https://pol.is/embed.js";
    script.async = true;
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, []);
  
  return (
    <>
      <h1>UserID: {userID}</h1>
        {/* TODO: Fix Styling here */}
        <div id="polis-container" style={{width: "70vw", margin:"0 auto"}}>
          <div className="polis" data-conversation_id="5szsz2uxay" data-xid={userID}>
          </div>
      </div>
    </>
  )
}