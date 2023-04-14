import React from "react";
import { useLocation } from "react-router-dom";

export const Details: React.FC = () => {
  const {state} = useLocation()
  console.log(state);
  return (
    <div style={{minHeight:'100vh', zIndex:'1'}}>
        <h1> THIS IS DETAILS</h1>
        <h1> THIS IS DETAILS</h1>
        <h1> THIS IS DETAILS</h1>
        <h1> THIS IS DETAILS</h1>
        <h1> THIS IS DETAILS</h1>
        <h1> THIS IS DETAILS</h1>
        <h1> THIS IS DETAILS</h1>
        <h1> THIS IS DETAILS</h1>
        <h1> THIS IS DETAILS</h1>
        <h1> THIS IS DETAILS</h1>
        <h1> THIS IS DETAILS</h1>
        <h1> THIS IS DETAILS</h1>
    </div>
  );
};
