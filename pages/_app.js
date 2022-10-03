import "../styles/globals.css";
import { createContext, useState } from "react";
export const UserContext = createContext();
function MyApp({ Component, pageProps }) {
  const [rem, setRem] = useState(true);
  return (
    <>
      <UserContext.Provider value={{ rem, setRem }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </>
  );
}

export default MyApp;
