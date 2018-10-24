const nodeMailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const key = require("../config/keys");

module.exports = userData => {
  jwt.sign(
    {
      id: userData.id
    },
    key.secretOrKey,
    {
      algorithm: "HS256",
      expiresIn: "1d"
    },
    (err, emailToken) => {
      //////////////////////////////
      /// back up for deployment ///
      //////////////////////////////

      // const url = `https://doreamon.herokuapp.com/api/users/confirmation/${emailToken}`;
      const url = `http://localhost:5000/api/users/confirmation/${emailToken}`;

      const transporter = nodeMailer.createTransport({
        service: "Gmail",
        auth: {
          user: key.email,
          pass: key.emailPassword
        }
      });

      // email content (send to a new user after register)
      let mailOptions = {
        from: '"Filmtopia"<filmtopia.team@gmail.com>',
        to: userData.email,
        subject: "Filmtopia - Account Confirmation",
        html: `<div>
                    <p>Please click the following link to confirm your email: </p>
                    <p><a href=${url}>${emailToken}</a ></p>
                    <br>
                    <p>From Filmtopia team with ❤</p>
                    <br>
                    <p>* This is a system generated email. Please do not reply to this email.</p>
                   </div>`
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) return next(err);
      });
    }
  );
};
