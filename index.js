const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/getRate'))
  .get('/cool', (req, res) => res.send(cool()))
  .get('/rateResult', vaildation)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  // vaildation function
function vaildation(req, res) {
  const weight = Number(req.query.weight);
  const type = req.query.types;
  let weight_ = "";
  let type_ = "";
  let rate = "";
  let vaild = true;

  if (weight == "") {
      weight_ = "missing!!";
      vaild = false;
  } 
  
  if (type == "") {
      type_ = "missing!!";
      vaild = false;
  } 

  if (vaild) {
      calculateRate(res, weight, type, rate);
  } else {
      rate = "Error!!";
      res.render('pages/rateResult', {weight: weight_, type: type_, rate: rate});
  }
}

// CalculateRate function
function calculateRate (res, weight, type, rate) {
  switch (type) {
      case ("Letters (Stamped)"):
          if (weight <= 1) {
              rate = "$0.55";
          } else if (weight <= 2) {
              rate = "$0.70";
          } else if (weight <= 3) {
              rate = "$0.85";
          } else  if (weight >= 3) {
                  rate = "$1.00";
          }

          break;

      case ("Letters (Metered)"):
          if (weight <= 1) {
              rate = "$0.50";
          } else if (weight <= 2) {
              rate = "$0.65";
          } else if (weight <= 3) {
              rate = "$0.80";
          } else  if (weight >= 3) {
                  rate = "$0.95";
          }

          break;

      case ("Large Envelopes (Flats)"):

          if (weight <= 1) {
              rate = "$1.00";
          } else if (weight <= 2) {
              rate = "$1.15";
          } else if (weight <= 3) {
              rate = "$1.30";
          } else  if (weight <= 4) {
              rate = "$1.45";
          } else if (weight <= 5) {
              rate = "$1.60";
          } else if (weight <= 6) {
              rate = "$1.75";
          } else if (weight <= 7) {
              rate = "$1.90";
          } else  if (weight <= 8) {
              rate = "$2.05";
          } else if (weight <= 9) {
              rate = "$2.20";
          } else if (weight <= 10) {
              rate = "$2.35";
          } else if (weight <= 11) {
              rate = "$2.50";
          } else if (weight <= 12) {
              rate = "$2.65";
          } else if (weight <= 13) {
              rate = "$2.80";
          } else {
              rate = "Overweight!!";
          }

          break;

      case ("First-Class Package Service—Retail"):

          if (weight <= 1) {
              rate = "$3.66";
          } else if (weight <= 2) {
              rate = "$3.66";
          } else if (weight <= 3) {
              rate = "$3.66";
          } else  if (weight <= 4) {
              rate = "$3.66";
          } else if (weight <= 5) {
              rate = "$4.39";
          } else if (weight <= 6) {
              rate = "$4.39";
          } else if (weight <= 7) {
              rate = "$4.39";
          } else  if (weight <= 8) {
              rate = "$4.39";
          } else if (weight <= 9) {
              rate = "$5.19";
          } else if (weight <= 10) {
              rate = "$5.19";
          } else if (weight <= 11) {
              rate = "$5.19";
          } else if (weight <= 12) {
              rate = "$5.19";
          } else if (weight <= 13) {
              rate = "$5.71";
          } else {
              rate = "Overweight!!";
          }

          break;
      }

  res.render('pages/rateResult', {weight: weight, type: type, rate: rate});
}