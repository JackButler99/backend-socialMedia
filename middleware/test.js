const jwt= require('jsonwebtoken')

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmJkMTc5ZjczZTNhOTg5MmY3YTdkZjMiLCJlbWFpbCI6InRlc3V0bzFAZ21haWwuY29tIiwiaWF0IjoxNjU3MTY2ODUxLCJleHAiOjE2NTc3NzE2NTF9.P5NrCKtDANk2ASv6nVVzedzHu0sjmd4PYbpqVJMD5z8'

let decodedData
if (token ){
  decodedData = jwt.verify(token, 'horas')
  userId = decodedData ?.exp
} 

console.log(decodedData)

