import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from "react-redux";
import { store } from '@/state/store.js';
import { ThemeProvider } from "@/context/ThemeContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <Provider store={store}>
                    <App />
                    <Toaster
                        position="top-center"
                        toastOptions={{
                            duration: 2000,
                            style: {
                                background: "#1e293b",
                                color: "#fff",
                                fontFamily: "Outfit, sans-serif",
                                borderRadius: "8px",
                            },
                        }}
                    />
                </Provider>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>
);
