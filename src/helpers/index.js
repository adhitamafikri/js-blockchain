const types = [
  'amount'
]

export const reqBodyJSON = (body) => {
  console.log(body)
  let result  = {}  

  body.forEach(item => {
    let values = Object.values(item)
    if(types.indexOf(values[0]) != -1) result[values[0]] = parseInt(values[1])
    else result[values[0]] = values[1]
  });

  return result
}
