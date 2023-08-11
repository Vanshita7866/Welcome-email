const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))



app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/page.html")
})

app.post('/' , (req,res)=>{
    const email = req.body.email
    const data = {
        members:[
            {
            email_address : email,
            status: "subscribed"
        }
        ]

        }
    
    var jsonData = JSON.stringify(data)
    const list_id = "3345ee4be5"
    const url = "https://us21.api.mailchimp.com/3.0/lists/3345ee4be5"
    const options= {
        method :"POST",
        auth:"vanshita:ed4d588bb6b0d83f73fc1b062028e37f-us21"
    }

    const request = https.request(url,options,function(response)
    {
      response.on("data", function(data){
          console.log(JSON.parse(data))
      })
    })

    request.write(jsonData)
    request.end()
})

 
app.listen(8080, function(){
console.log("Server is running on port 8080")
})

