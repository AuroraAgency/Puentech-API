const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema ({
  _id: {type: String, required: true},
  tweet: {
    id: {type: String, required: true},
    author_id: {type: String, required: true},
    text: {type: String, required: true},
    description: {type: String, required: false},
    created_at: {type: String, required: true},
    lang: {type: String, required: false},
    label: [
      {type: String, required: true}
    ],
    // geo: {
    //   id: {type: String, required: true},
    //   country: {type: String, required: true},
    //   full_name: {type: String, required: true},
    //   country_code: {type: String, required: true},
    // } || false,
    matching_rules: [
      {
        id: {type: String, required: true},
        tag: {type: String, required: true},
      }
    ],
  },
  user: {
    id: {type: String, required: true},
    tweet_id: {type: String, required: true},
    username: {type: String, required: true},
    location: {type: String, required: false},
  }
});

function createModel (collectionName) {
  const model = mongoose.model(collectionName, mySchema);
  return model
}

module.exports = createModel;

/* 

  {
    _id: '32131283129821983129',
    tweet: {
      id: '1349112951106633735',
      text: 'RT @policia: ¡Mucho ojo 👁! Si alguien te pide el código de verificación de #WhatsApp                               qu e ha llegado a tu móvil, NO lo hagas y desconfía......',    
      author_id: '1274658582223560710',
      description: 'Categories within Brand Verticals that narrow down the scope of Brands',
      created_at: "2021-01-11T21:03:09.000Z",
      lang: "en" || false,
      matching_rules: [
        { id: '1347305369958281200', tag: 'WhatsApp' }
      ],
      label: ["WhatsApp"],	

      geo: {
        id: '3213123231232312312',
        country: 'México',
        full_name: 'Ciudad de México, México',
        country_code: 'MX'
      } || false
    },
    user: {
      tweet_id: '1349112951106633735', 
      id: '1274658582223560710',
      username: 'Santiag19006252',
      location: 'Lima, Perú' || false
    }
  },

*/