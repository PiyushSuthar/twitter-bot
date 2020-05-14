var twit = require('twit')
var fs = require('fs')
var request = require('request')
const { createCanvas, loadImage  } = require('canvas')
const drawMultilineText = require('canvas-multiline-text')


var T = new twit({
    consumer_key:         'KrIAnHrkAfbV1cvzJ3fQ19kdG',//consumer_key
    consumer_secret:      'aYRKjP54fuudUgtjvSbnZbwKQtnrzIozM5s3m7fBWOlucyORLa',//consumer_secret
    access_token:         '842727113438326784-AIXtd60WI1Dcb68rLDKcNeuMCUvPEXE',//access_token
    access_token_secret:  'dnjubTEPMEcU5r6aWTbBYlG03dIXX2SBKMBbz1oIICAJd',//access_token secret
})

// Function for capitalizing the first word of the string
const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
;
// For Downloading an image, Global Func()
const download = (url, path, callback) => {
    request.head(url, (err, res, body) => {
      request(url)
        .pipe(fs.createWriteStream(path))
        .on('close', callback)
    })
  }

  //Getting Quotes from api
request("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json",{json : true}, async(err,res,body)=>{
    console.log(body.quoteText)
    console.log(body.quoteAuthor);
    
    //Text you want to show in the image
    let quoteText = body.quoteText;
    let quoteAuthor = body.quoteAuthor;

    let url = "http://source.unsplash.com/1200x630/?coding" //Replace it with url from where you want to get the background image
    let path = "myImage.jpg" //the image it will be replace.
    
    //Downloading an images from unsplash
    download(url, path,()=>{

        //setting height and width of the generated image
        const width = 1200
        const height = 630
        
        const canvas = createCanvas(width, height)
        const context = canvas.getContext('2d')
        
        //loading the image and placing it as background
        loadImage('myImage.jpg').then(image => {
            context.drawImage(image, 0, 0)

            //Adding a dark overlay
            context.fillStyle = "rgba(0, 0, 0, 0.4)";//color of the overlay
            context.fillRect(0, 0, width, height);
            
            const text = capitalize(quoteText) //If you wish not to capitalize the text, remove capitalize() and just keep quoteText
            context.fillStyle = '#fff'//color of the text
            drawMultilineText(context,text,{
                rect:{
                    x:20,//x axis of the text
                    y:40,//y axix of the text
                    width: canvas.width - 20,
                    height: canvas.height - 20
                },
                font: "Sans",//font of the text
                minFontSize: 15,//Minimum size of the text
                maxFontSize: 50//Max Size of the text
            })
            
            context.fillStyle = '#fff'//Color of the second text
            context.font = 'bold 30pt Sans'//Font size and font style of the second text 
            context.fillText("- "+capitalize(quoteAuthor), 500/*x Axis*/, 430/*y axis */)//If you wish not to capitalize the text, remove capitalize() and just keep quoteAuthor

            const buffer = canvas.toBuffer('image/png')
            fs.writeFileSync('send.png', buffer)//The generated image

            //Tweet Func()
            tweet(text , quoteAuthor)
            // tweet(text1 , text2)
          })

    })
})





// uploading Image
  function tweet(quote , quoteAuthor){
    //Converting image to base64 to easily upload image on twitter servers
    var b64content = fs.readFileSync('send.png', { encoding: 'base64' })

    T.post('media/upload', { media_data: b64content }, function (err, data, response) {
        // now we can assign alt text to the media, for use by screen readers and
        // other text-based presentations and interpreters
        var mediaIdStr = data.media_id_string //After uploading we get an id of the image
        var AltText = quote+"\n -"+quoteAuthor; // Your Alt Text
        var meta_params = { media_id: mediaIdStr, alt_text:{ text: AltText} }

        T.post('media/metadata/create', meta_params, function (err, data, response) {
        if (!err) {
                // now we can reference the media and post a tweet (media will attach to the tweet)

                var Status= quote+"\n -"+quoteAuthor +"\n\nThat's Me, The Bot 🤖";//Your Status
                var params = { status: Status, media_ids: [mediaIdStr] }

                //Now It will post the tweet with the image.
                T.post('statuses/update', params, function (err, data, response) {
                    console.log("Tweeted")// Console Logging if tweeted.
                })
            }
        })
    })
  }

  