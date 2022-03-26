import React, { useState, useEffect, useReducer, createContext } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import * as Api from "./api"
import { userReducer } from "./reducer"

import Header from "./components/Header"
import LoginForm from "./components/user/LoginForm"
import Network from "./components/user/Network"
import RegisterForm from "./components/user/RegisterForm"
import Portfolio from "./components/Portfolio"
import Home from './components/Home'
import Footer from "./components/Footer"

export const UserStateContext = createContext(null)
export const DispatchContext = createContext(null)


function App() {
    const [userState, userDispatch] = useReducer(userReducer, {
        user: null,
    });

    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    const fetchCurrentUser = async () => {
        try {
            const res = await Api.get("user/current");
            console.log(res.data)
            const currentUser = res.data;

            userDispatch({
                type: "LOGIN_SUCCESS",
                payload: currentUser,
            });

            console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
        } catch {
            console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
        }
        setIsFetchCompleted(true);
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    if (!isFetchCompleted) {
        return "loading...";
    }

    return (
        <DispatchContext.Provider value={userDispatch}>
            <UserStateContext.Provider value={userState}>
                <Router >
                    <Header />
                    <Routes >
                        <Route path="/" exact element={<Home />} />
                        <Route path="/:categoryId" exact element={<Home />} />
                        <Route path="/:categoryId/:articleName" element={<Home />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/user/:userId" element={<Portfolio />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/userlist" element={<Network />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                    <Footer />
                </Router>

            </UserStateContext.Provider>
        </DispatchContext.Provider>
    );
}

export default App;
