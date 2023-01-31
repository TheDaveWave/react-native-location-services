import { registerRootComponent } from "expo";
import { TemplateProvider } from "./context/TemplateContext.js";
import AppNav from "./navigators/AppNav.js";

function App() {
  return (
    <TemplateProvider>
      <AppNav />
    </TemplateProvider>
  );
}

export default registerRootComponent(App);
