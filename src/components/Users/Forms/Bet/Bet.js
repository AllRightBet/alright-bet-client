import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createBet } from "../../../../api/bet";
import { useNavigate } from "react-router-dom";
import { updateDB } from "../../../../api/updateUser";
import { fetchFightCards } from "../../../../api/event";

const Bet = ({ option, user, setUser }) => {


  const navigate = useNavigate()

  const [Event, setEvent] = useState();
  const [bet_amount, setBet_amount] = useState(0);



  useEffect(() => {
    // FETCH latest event
    const fetchLatestEvent = async () => {
      try {
        const res = await fetchFightCards();
        setEvent(res.data[res.data.length - 1]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLatestEvent();
    console.log(option)
  }, []);




  const onCreateBet = (e) => {
    e.preventDefault();


    const addBet = async () => {
      try {
        const res = await createBet(bet_amount, user, Event, option);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };


    const updateUser = async () => {
      try {

        let amount = 0;
        amount = parseFloat(user['wallet_balance']) - parseFloat(bet_amount)

        const res = await updateDB(
          user,
          ["wallet_balance"],
          [amount]
        );
        setUser(res.data);
      } catch (error) {
        console.log("error message: ", error);
      }
    };



    updateUser();
    addBet();
    navigate("/history")
  };
  return (

    <>
      {/* DEBUG */}
      <h1> ${user['wallet_balance']} </h1>
      <h1> {option} </h1>

      <Form onSubmit={onCreateBet}>
        <Form.Group className="mb-3" controlId="formBasicBet">
          <Form.Label>Bet</Form.Label>
          <Form.Control
            type="text"
            placeholder="place a bet"
            name="betG"
            value={bet_amount}
            onChange={(e) => setBet_amount(e.target.value)}
          />
        </Form.Group>


        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>



  );
};

export default Bet;
