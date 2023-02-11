import React from "react";
import { Button, Result } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";

const SignupResult = () => {
  const state = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {state.state ? (
        <div>
          <h2 className="text-center mt-5">
            Bienvenue {state.state.firstname}
          </h2>
          <Result
            status="success"
            title="Bravo, nous sommes heureux de vous compter parmi nous"
            subTitle="Vous pouvez maintenant vous connecter pour prendre un rendez-vous papa NomaQ, suivre nos cultes en ligne et bien plus"
            extra={[
              <Button
                type="primary"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Je me connecte
              </Button>,
            ]}
          />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default SignupResult;
