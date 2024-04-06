import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from "./App.tsx";
import { SearchsProvider } from './context/SearchsContext.tsx';
import "./index.css";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot( document.getElementById( "root" )! ).render(
	// <React.StrictMode>
	<BrowserRouter>
		<SearchsProvider>
			<App />
		</SearchsProvider>
	</BrowserRouter>
	// </React.StrictMode>,
);
