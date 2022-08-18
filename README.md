# Google reCAPTCHA v2 using MERN Stack
Google reCAPTCHA v2 verifies if an interaction is legitimate with the “I am not a robot” checkbox and invisible reCAPTCHA badge challenges.
## Documentations

- [Official Google reCAPTCHA v2 Documentation](https://developers.google.com/recaptcha/docs/invisible)
- [Google Recaptcha by Hugo Dozois (dozoisch)](https://www.npmjs.com/package/react-google-recaptcha)

## How it Works?
- Generate a Recaptcha Token when submitting the form on the Frontend.
- Send it to backend, inturn, send that token to Google Recaptcha URL.
```
https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${tokenID}
```
- That URL will return a response message with data "success" whether it's True or False.
- If True, then you can submit the Form data to database then login the User.
- If False, stop the form validation then show error message to user (Bot).

## Tutorial
[![Watch the video](https://img.youtube.com/vi/vrbyaOoZ-4Q/maxresdefault.jpg)](https://youtu.be/vt5fpE0bzSY)
