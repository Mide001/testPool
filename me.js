const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Parse JSON requests
app.use(bodyParser.json());

// Parse URL-encoded requests
app.use(bodyParser.urlencoded({ extended: true }));

const buildPathMain = path.join(__dirname, ".", "build-main");
const buildPathPool = path.join(__dirname, ".", "build");
const buildPathDeveloper = path.join(__dirname, ".", "build-createPool");


// Parse JSON requests
app.use(bodyParser.json());

// Parse URL-encoded requests
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the build directory
app.use(express.static(buildPathMain));
app.use('/pools', express.static(buildPathPool));
app.use('/createpools', express.static(buildPathDeveloper));


app.use('/', express.static(path.join(__dirname, 'index.html')));
app.use('/pools/', express.static(path.join(__dirname, 'index.html')));
app.use('/createpools', express.static(path.join(__dirname, 'index.html')));


// Configure fallback routing
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPathMain, "index.html"));
});




// Configure fallback routing for main app
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPathMain, "index.html"));
});

// Configure fallback routing for sub app
app.get("/pools/*", (req, res) => {
  res.sendFile(path.join(buildPathPool, "index.html"));
});

app.get("/createpools/*", (req, res) => {
  res.sendFile(path.join(buildPathDeveloper, "index.html"));
});


const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "testerola16@gmail.com",
    pass: "anhndmltmohphilm",
  },
});

app.post("/submit-form", async (req, res) => {
  const {
    projectName,
    tokenSymbol,
    country,
    contactEmail,
    projectEmail,
    tokenContractAddress,
    walletAddress,
    projectWebsite,
    logoLink,
    twitterLink,
    telegram,
    projectDescription,
    agreeToTerms,
  } = req.body;

  const message = {
    from: "testerola16@gmail.com",
    to: "listing@rewardpools.io",
    subject: "New StakePool Listing",
    html: `
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333333;
              margin: 0;
              padding: 20px;
            }
      
            h1 {
              color: #22647b;
              font-size: 24px;
              margin-bottom: 20px;
            }
      
            p {
              margin: 0 0 10px;
            }
      
            strong {
              font-weight: bold;
            }
      
            .container {
              background-color: #ffffff;
              border-radius: 5px;
              padding: 20px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
      
            .footer {
              margin-top: 20px;
              text-align: center;
              font-size: 14px;
            }
          </style>
          <body>
            <div class="container">
              <h1>Stake Pool Listing Form Submission</h1>
              <p><strong>Project Name:</strong> ${projectName}</p>
              <p><strong>Token Symbol:</strong> ${tokenSymbol}</p>
              <p><strong>Country: </strong> ${country}</p>
              <p><strong>Contact Email:</strong> ${contactEmail}</p>
              <p><strong>Project Email:</strong> ${projectEmail}</p>
              <p><strong>Token Contract Address:</strong> ${tokenContractAddress}</p>
              <p><strong>Wallet Address: </strong> ${walletAddress} </p>
              <p><strong>Project Website:</strong> ${projectWebsite}</p>
              <p><strong>Logo Link:</strong> ${logoLink} </p>
              <p><strong>Twitter Link: </strong> ${twitterLink}</p>
              <p><strong>Telegram UserName: </strong> ${telegram}</p>
              <p><strong>Agreed to terms: </strong> ${agreeToTerms}</p>
              <p><strong>Project Description: </strong> ${projectDescription}</p>
            </div>
            <p class="footer">This email was sent from the RewardPools.io.</p>
          </body>
        `,
  };

  try {
    const info = await transporter.sendMail(message);
    console.log("Email sent: ", info.response);
    res.status(200).send("Form submitted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Sending Mail");
  }
});

app.post("/submit-affilate", async (req, res) => {
  const {
    username,
    firstName,
    lastName,
    country,
    emailAddress,
    companyName,
    contactEmail,
    website,
    walletAddress,
    twitterLink,
    telegram,
    agreeToTerms,
  } = req.body;

  const message = {
    from: "testerola16@gmail.com",
    to: "affiliate@rewardpools.io", //hello@rewardpools.io"
    subject: "Affilate New Registration",
    html: `
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333333;
              margin: 0;
              padding: 20px;
            }
      
            h1 {
              color: #22647b;
              font-size: 24px;
              margin-bottom: 20px;
            }
      
            p {
              margin: 0 0 10px;
            }
      
            strong {
              font-weight: bold;
            }
      
            .container {
              background-color: #ffffff;
              border-radius: 5px;
              padding: 20px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
      
            .footer {
              margin-top: 20px;
              text-align: center;
              font-size: 14px;
            }
          </style>
          <body>
            <div class="container">
              <h1>Affilate Application Form</h1>
              <p><strong>Username:</strong> ${username}</p>
              <p><strong>First Name:</strong> ${firstName}</p>
              <p><strong>Last Name:</strong> ${lastName}</p>
              <p><strong>Country: </strong> ${country}</p>
              <p><strong>Email Address:</strong> ${emailAddress}</p>
              <p><strong>Company Name:</strong> ${companyName}</p>
              <p><strong>Contact Email:</strong> ${contactEmail}</p>
              <p><strong>Website: </strong> ${website} </p>
              <p><strong>Wallet Address:</strong> ${walletAddress}</p>
              <p><strong>Twitter Link: </strong> ${twitterLink}</p>
              <p><strong>Telegram UserName: </strong> ${telegram}</p>
              <p><strong>Agreed to terms: </strong> ${agreeToTerms}</p>
            </div>
            <p class="footer">This email was sent from the RewardPools.io.</p>
          </body>
        `,
  };

  try {
    const info = await transporter.sendMail(message);
    console.log("Email sent: ", info.response);
    res.status(200).send("Form submitted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Sending Mail");
  }
});

app.post("/submit-subscribe", async (req, res) => {
  const { email } = req.body;

  const message = {
    from: "testerola16@gmail.com",
    to: "newsletter@rewardpools.io",
    subject: "New Subscriber Listing",
    html: `
        <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          color: #333333;
          margin: 0;
          padding: 20px;
        }
      
        h1 {
          color: #22647b;
          font-size: 24px;
          margin-bottom: 20px;
        }
        
        p {
          margin: 0 0 10px;
        }
      
        strong {
          font-weight: bold;
        }
      
        .container {
          background-color: #ffffff;
          border-radius: 5px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      
        .footer {
          margin-top: 20px;
          text-align: center;
          font-size: 14px;
        }
      
        </style>
        <body>
        <div class="container">
        <h1>Hurray, You Have A New Subscriber</h1>
        <p><strong>Subscriber Mail: </strong> ${email}</p>
        </div>
        <p class="footer">This email was sent from the RewardPools.io.</p>
        </body>
        `,
  };

  try {
    const info = await transporter.sendMail(message);
    console.log("Email sent: ", info.response);
    res.status(200).send("Form submitted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Sending Mail");
  }
});


app.listen(3001, () => {
    console.log("Server started on port 3001");
  });
