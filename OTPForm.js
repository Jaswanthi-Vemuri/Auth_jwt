import React, { useState } from 'react';

function OTPForm(props) {
  const [otp, setOtp] = useState('');
  const [info, setInfo] = useState('');

  function handleRequest() {
    fetch('http://localhost:8080/otp/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: props.email })
    })
    .then(res => res.json())
    .then(json => {
      setInfo(json.message + " (Check backend console for OTP in dev)");
    })
    .catch(err => { setInfo("Error: " + err); });
  }

  function handleVerify() {
    fetch('http://localhost:8080/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: props.email, otp: otp })
    })
    .then(res => res.json())
    .then(json => {
      if(json.success) {
        setInfo('OTP verified!');
        if(props.onVerified) props.onVerified();
      } else {
        setInfo(json.message || "Invalid OTP.");
      }
    })
    .catch(err => { setInfo("Error: " + err); });
  }

  return React.createElement(
    'div', {},
    React.createElement('button', { onClick: handleRequest, type: 'button' }, 'Request OTP'),
    React.createElement('input', {
      value: otp,
      onChange: function(e) { setOtp(e.target.value); },
      placeholder: 'Enter OTP'
    }),
    React.createElement('button', { onClick: handleVerify, type: 'button' }, 'Verify OTP'),
    React.createElement('div', {}, info)
  );
}

export default OTPForm;
