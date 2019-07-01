const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// tell it to use the public directory as one where static files live
app.use(express.static(__dirname + '/public'));


// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/search", search);

app.listen(port, function() {
   console.log("Now listening for connections on port: ", port);
});


function search(req, res) {
   console.log("Request for Search");

   const song = req.query.song;

   console.log("Song: " + song);

   getResults(res, song);

};

function getResults(res, song) {

   //Create the Search URL
   const search_url = 'https://api.spotify.com/v1/search?';
   const fetch_url = 'q=' + song + '&type=track&limit=1';
   const accessToken = 'BQDODmdKXB0ktWJmSoQ0qz6unZYuOcbfqNOVdnQs-gq9V3t_lf6T10eJNIJYhNTYQY9L-gkXA8zATdkH3Wo6CCUWvVpcnB4YCHYj4kNeE9NJNnDL9fGzlpMeBe7TE2ct7bXAXA2StpX9YsMy-KnseCpBeDf91eYXis8W13WQDFHs4w8B5kHa&refresh_token=AQB6aNgkp5GcIXgtk8v61SFHyjzcVVZcI8omAa9Vo7WBC50_9D3ItgxTvPO81RyGBpXPPPbC54eHcAIID3R6xryx8jqW8Q-Apm0gyTcr39U6Z3chBdDrpwiNVnY8tcQBEKFcTg';
   const final_url = 'Authorization: Brearer ' + accessToken;

   const total_url = search_url + fetch_url + final_url;

   app.get(total_url);

   let resultsOfQuery = {
      artist: {
         name: '',
      }
   };

   console.log("Artist: " + resultsOfQuery.name)

   resultsOfQuery = this.resultsOfQuery;

   const params = {song: song, resultsOfQuery: resultsOfQuery};

   display(res, params);

   //Currently not working (err: failed to lookup views/results...)
   //res.render('views/results', params);

}

function display(res, params) {
   res.write("You song choice: " + params.song + "<br>");
   res.write("Other variable: " + params.resultsOfQuery);
   res.end();
}