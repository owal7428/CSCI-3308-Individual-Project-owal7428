const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const axios = require('axios');

const dbConfig = {
    host: 'db',
    port: 5432,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
};
  
const db = pgp(dbConfig);
  
// test the database
db.connect()
    .then(obj => {
        console.log('Database connection successful'); // you can view this message in the docker compose logs
        obj.done(); // success, release the connection;
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
});

app.set('view engine', 'ejs');

app.use(bodyParser.json());
    
app.use(bodyParser.urlencoded({
    extended: true,
})
);

// set access for files in /resources folder
app.use(express.static(__dirname + '/resources'));

app.get("/", (req, res) => {
    res.redirect("/main");
});

app.get("/main", (req, res) => {
    res.render("pages/main", {
        results: null,
    });
});

app.post("/main", (req, res) => {
    axios({
        url: 'https://www.themealdb.com/api/json/v1/1/search.php',
        method: 'GET',
        dataType:'json',
        params: {
            "s": req.body.search,
        }
    })
    .then(results => {
        console.log(results.data); // the results will be displayed on the terminal if the docker containers are running

        if (results.data.meals == null)
        {
            res.render("pages/main", {
                results: null,
                error: true,
                message: req.body.search + " is not in the meals database.",
            });
        }
        else
        {
            res.render("pages/main", {
                results: results.data.meals,
            });
        }
        
    })
    .catch(error => {
        // Handle errors
        res.render("pages/main", {
            results: null,
            error: true,
            message: error.message,
        });
    });
});

app.get("/reviews", (req, res) => {
    res.render("pages/reviews", {
        results: null,
    });
});

app.post("/reviews", (req, res) => {
    const recipe = req.body.recipe;
    const recipe_lower = req.body.recipe.toLowerCase();
    const review = req.body.review;

    const date = new Date();

    const today = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

    const query = "INSERT INTO reviews (recipe, recipe_upper, review, review_date) VALUES ($1, $2, $3, $4);";

    db.any(query, [recipe_lower, recipe, review, today])
    .then(() => {
        const secondary_query = "SELECT * FROM reviews WHERE recipe = $1;";

        db.any(secondary_query, [recipe_lower])
        .then(results => {
            console.log(results);
            res.render("pages/reviews", {
                results: results,
                recipe: recipe,
            });
        });
    })
    .catch(error => {
        console.log("Failed to insert into reviews table.");
        res.render("pages/reviews", {
            results: null,
            error: true,
            message: error.message,
        });
    });
});

app.post("/reviewSearch", (req, res) => {
    const recipe = req.body.recipe.toLowerCase();

    const query = "SELECT * FROM reviews WHERE recipe = $1;";

    db.any(query, [recipe])
    .then(results => {
        console.log(results);

        if (results != null && results.length != 0)
        {
            res.render("pages/reviews", {
                results: results,
                recipe: results[0].recipe_upper,
            });
        }
        else
        {
            res.render("pages/reviews", {
                results: null,
                error: true,
                message: recipe + " does not have reviews or is not a recognized meal.",
            });
        }
    })
    .catch(error => {
        res.render("pages/reviews", {
            results: null,
            error: true,
            message: error.message,
        });
    });
});

app.listen(3000);
console.log('Server is listening on port 3000');
