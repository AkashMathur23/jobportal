// error middleware || NEXT function
//jbtak iski condition true ni hogi iska aage ka code run nhi krega

// err we can show specific error
// next if we want to do further execute this or not
const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({
    success: false,
    Message: "Something went Wrong",
    err,
  });

  //missing field error
};
export default errorMiddleware;
