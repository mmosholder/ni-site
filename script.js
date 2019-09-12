const StoryblokClient = require('storyblok-js-client')
const json2csv = require('json2csv').parse;
const fs = require('fs')

const Storyblok = new StoryblokClient({
  oauthToken: 'LnX8nlr2iiejA5zBOCt8Zgtt'
})

const start = () => {
  // load space overview list
  let spacesList = Storyblok.get(`spaces/43622/stories/locations`).then(r => console.log(r)).catch(error => console.log(error));

  console.log(spacesList)

  // // build requests for invoices for all spaces
  // let invoiceRequests = []
  // spacesList.data.spaces.forEach(space => {
  //   invoiceRequests.push(Storyblok.get(`spaces/${space.id}/locations/`))
  // })

  // // execute requests and filter invoices to actual paid invoices (tatal != 0)
  // let locations = []

  // invoiceResponses.forEach(response => {
  //   locations = locations.concat(response.data.locations)
  // })

  // try {
  //   let fields = Object.keys(locations[0])
  //   let csv = json2csv(invoices, { fields })

  //   fs.writeFileSync(`./invoices-${Date.now()}.csv`, csv);
  // } catch (err) {
  //   console.error(err);
  // }
}

start()
