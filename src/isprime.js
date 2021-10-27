process.on("message", message => {
  const jsonResponse = isPrime(message.number);
  process.send(jsonResponse)
  process.exit();
})

function isPrime(number){
  let startTime = new Date();
  let endTime = new Date();
  let isPrime1 = true;
  for(let i = 3; i < number; i++){
    if(number % i === 0){
      endTime = new Date();
      isPrime1 = false;
      break;
    }
  }
  if(isPrime1) endTime = new Date();
  return {
    "number": number,
    "isPrime": isPrime1,
    "time": endTime.getTime() - startTime.getTime() 
  }
}