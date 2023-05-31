const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const OBJECT_ID = "2-15357285";
const PRIVATE_APP_ACCESS = "pat-na1-013aa18a-bc86-4340-b43f-cd3f4fce1ed9";

app.get("/", async (req, res) => {
  const objects = `https://api.hubspot.com/crm/v3/objects/${OBJECT_ID}?properties=name,genres,platforms`;
  const headers = {
    Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
    "Content-Type": "application/json",
  };
  try {
    const resp = await axios.get(objects, { headers });
    const data = resp.data.results;
    res.render("objects", { title: "Custom Object Table | Integrating With HubSpot I Practicum", data });
  } catch (error) {
    console.error(error);
  }
});

app.get("/update-cobj", (req, res) => {
    res.render("updates", { title: "Update Custom Object Form | Integrating With HubSpot I Practicum" });
});

app.post('/update-cobj', async (req, res) => {
    const create = {
        properties: {
            "name": req.body.name,
            "genres": req.body.genres,
            "platforms": req.body.platforms
        }
    }
    const createObject = `https://api.hubspot.com/crm/v3/objects/${OBJECT_ID}`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.post(createObject, create, { headers } );
        res.redirect('/');
    } catch(err) {
        console.error(err);
    }
});

app.listen(3000, () => console.log("Listening on http://localhost:3000"));
