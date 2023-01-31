import { useEffect } from "react";
import { createContext, useState } from "react";

// create export for context.
export const TemplateContext = createContext();

// export the template provider.
export function TemplateProvider({ children }) {
  // create test data for context.
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    setUserInfo({
      id: 1,
      name: "Your Name",
    });
  }, []);

  return (
    <TemplateContext.Provider value={{ userInfo }}>
      {children}
    </TemplateContext.Provider>
  );
}
