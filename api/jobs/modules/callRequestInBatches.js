const callRequestInBatches = async (arrayOfPromises, batchSize) => {
  console.log(`Starting to execute`)
  let batchNum = 0
  while (arrayOfPromises.length > 0) {
    batchNum++
    console.log(`Starting on batch number ${batchNum}`)
    const batch = arrayOfPromises.splice(0, batchSize)
    await Promise.all(batch).catch((err) => {
      console.log(`There was an error while sending the declaration requests.`)
      console.log(err)
    })
    console.log(`Resolved batch ${batchNum}`)
  }
}

module.exports = callRequestInBatches
