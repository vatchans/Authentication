const http=require('http')
const fs=require('fs')
const server=http.createServer((req,res)=>{
    let timestamp=new Date()
    let a=Math.floor(Math.random()*10)
    fs.writeFileSync(`Date-time/date-time-${a}.txt`,`<h2>${timestamp}</h2>`,`utf-8`)
  let currenttime=fs.readFileSync(`./Date-time/date-time-${a}.txt`,`utf-8`)
    res.writeHead(200,{'Content-type':'text/html'})

    res.end(currenttime)
})
const PORT = process.env.PORT || 8000;
server.listen(PORT,()=>{console.log(`Server listening to ${PORT}`)})
