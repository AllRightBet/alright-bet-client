// REACT
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./app.css";

// USER COMPONENTS
import Landing from "./components/Users/Display/Landing/Landing";
import SignIn from "./components/Users/Display/SignIn/SignIn";
import SignUp from "./components/Users/Display/SignUp/SignUp";
import Home from "./components/Users/Display/Home/Home";
import DepositFunds from "./components/Users/Forms/Wallet/HandleFunds";
import { fetchFightCards } from "./api/event";

// ADMIN COMPONENTS
import AdminDashboard from "./components/Admin/Display/AdminDashboard.js";
import AdminCreateFightCard from "./components/Admin/Forms/Admin_CreateFightCard";
import GetFightCard from "./components/Users/Display/GetFightCard/GetFightCard";

// GLOBAL COMPONENTS
import Navbar from "./components/Global/Navbar/Navbar";
import SignUpForm from "./components/Users/Forms/SignUp/SignUpForm";
import Bet from "./components//Users/Forms/Bet/Bet.js";
import DisplayModels from "./components/DisplayModels";

// STRIPE
import { loadStripe } from "@stripe/stripe-js";
import Settings from "./components/Users/Display/Settings/Settings";

// INIT STRIPE PAYMENT OBJECTS
//TODO: USE SPRING API TO SERVE STRIPE CREDENTIALS
const stripePromise = loadStripe("pk_test_BDT6hqtqNcW6MwYguNEYe2Wa00vTqDikAb");

const App = () => {
  // STATES
  const [user, setUser] = useState(null);
  const [stripeSecret, setStripeSecret] = useState("");

  useEffect(() => {

  }, [user]);


  const notLoggedIn = (
    <Routes>
      <Route exact path="/" element={<Landing/>} />
      <Route
        exact
        path="/signIn"
        element={<SignIn setUser={setUser} user={user} />}
      />
      <Route
        path="/signUp"
        element={<SignUp setUser={setUser} user={user} />}
      />
    </Routes>
  );

  const loggedIn = (
    <Routes>
      {/* USER INTERFACE */}
      <Route exact path="/" element={<Home user={user} />} />

      <Route
        exact
        path="/deposit-funds"
        element={
          <DepositFunds
            stripePromise={stripePromise}
            stripeSecret={stripeSecret}
            user={user}
            setUser={setUser}
            deposit={true}
          />
        }
      />

      <Route
        exact
        path="/withdraw-funds"
        element={
          <DepositFunds
            stripePromise={stripePromise}
            stripeSecret={stripeSecret}
            user={user}
            setUser={setUser}
            deposit={false}
          />
        }
      />

      <Route
        path="/user-bets"
        element={<DisplayModels url="/bet?relative_user=1" />}
      />
      <Route
        path="/user-fight-cards"
        element={<DisplayModels url="/fight-card?relative_user=1" />}
      />

      <Route path="/event" element={<GetFightCard />} />
      <Route
        path="/bet-1"
        element={
          <Bet option={1} user={user} setUser={setUser} />
        }
      />
      <Route
        path="/bet-2"
        element={
          <Bet option={2} user={user} setUser={setUser} />
        }
      />

      {user ? (
        <Route
          path="/history"
          element={<DisplayModels url={`/user-history?email=${user.email}`} />}
        />
      ) : null}

      <Route path="/top-bets" element={<DisplayModels url={"/top-bets"} />} />
      <Route path="/all-bets" element={<DisplayModels url={"/bet"} />} />

      <Route
        path="/settings"
        element={<Settings user={user} setUser={setUser} />}
      />

      {/* ADMIN INTERFACE */}
      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="/create-fight-card" element={<AdminCreateFightCard />} />

      <Route
        path="/create-user"
        element={
          <SignUpForm
            isSetting={false}
            isAdmin={true}
            setUser={setUser}
            user={user}
          />
        }
      />

      <Route path="/all-users" element={<DisplayModels url="/user" />} />

      <Route
        path="/all-fight-cards"
        element={<DisplayModels url="/fight-card" />}
      />
    </Routes>
  );

  return (
    <React.Fragment>
      <div className="page__container">
        <Navbar setUser={setUser} user={user} />
        {user ? loggedIn : notLoggedIn}
      </div>
    </React.Fragment>
  );
};

export default App;
