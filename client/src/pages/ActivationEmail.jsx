import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ActivationEmail() {
  const { activationtoken } = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (activationtoken) {
      const activationEmail = async () => {
        try {
          const res = await axios.post("/activation", {
            activationtoken,
          });
          setSuccess(res.data.msg);
        } catch (err) {
          err.response.data.msg && setErr(err.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [activationtoken]);
  return (
    <div className="active_page min-h-screen">
      {/* {success && showSuccessMsg(success)} */}
      <h1 className="">{success}</h1>
    </div>
  );
}

export default ActivationEmail;
