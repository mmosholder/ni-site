const StoryblokClient = require('storyblok-js-client')
const json2csv = require('json2csv').parse;
const fs = require('fs')

const Storyblok = new StoryblokClient({
  oauthToken: 'YhyWNXIZZrl7cMygbmgJYgtt'
})

const start = async () => {
  // load space overview list
  let spacesList = await Storyblok.get(`spaces/`);

  console.log(spacesList);

  // build requests for invoices for all spaces
  let invoiceRequests = []
  spacesList.data.spaces.forEach(space => {
    invoiceRequests.push(Storyblok.get(`spaces/${space.id}/locations/`))
  })

  // execute requests and filter invoices to actual paid invoices (tatal != 0)
  let locations = []
  let locationResponses = await Promise.all(locationRequests)
  locationResponses.forEach(response => {
    locations = locations.concat(response.data.locations)
  })

  try {
    let fields = Object.keys(locations[0])
    let csv = json2csv(locations, { fields })

    fs.writeFileSync(`./locations-${Date.now()}.csv`, csv);
  } catch (err) {
    console.error(err);
  }
}

start()
  .catch(e => {
    console.log(e);
  });
