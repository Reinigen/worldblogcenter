import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import store from "./app/store"
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { router } from "./router"
import { RouterProvider } from "react-router"


const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
