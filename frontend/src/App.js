import { Button, Checkbox, Form } from "semantic-ui-react";
import Axios from "axios";

import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

function App() {
  const recaptchaRef = useRef();

  const recaptchaChange = (value) => {
    console.log("Captcha value:", value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const recaptchaToken = await recaptchaRef.current.executeAsync();
    recaptchaRef.current.reset();

    const emailValue = event.target.emailID.value;
    const passwordValue = event.target.passwordID.value;
    console.log(emailValue);
    console.log(passwordValue);

    const BackendURL = `${process.env.REACT_APP_BACKEND_URL}/api/signin`;

    const option = {
      method: "POST",
      url: BackendURL,
      data: {
        email: emailValue,
        password: passwordValue,
        token: recaptchaToken,
      },
    };

    const response = await Axios(option);

    console.log(response.data.data);
  };

  return (
    <div style={{ width: "400px", margin: "0 auto" }}>
      <Form onSubmit={handleSubmit}>
        <ReCAPTCHA
          sitekey={`${process.env.REACT_APP_SITE_KEY}`}
          size="invisible"
          ref={recaptchaRef}
          onChange={recaptchaChange}
        />
        <Form.Field>
          <label htmlFor="emailID">Email</label>
          <input type="email" placeholder="Email" name="emailID" id="email" />
        </Form.Field>
        <Form.Field>
          <label htmlFor="passwordID">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="passwordID"
            id="password"
          />
        </Form.Field>
        <Form.Field>
          <Checkbox label="I agree to the Terms and Conditions" name="agree" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default App;
