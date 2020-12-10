const callRequestInBatches = async (arrayOfPromises, batchSize) => {
  console.log(`Starting to execute`)
  let batchNum = 0
  while (arrayOfPromises.length > 0) {
    batchNum++
    console.log(`Starting on batch number ${batchNum}`)
    const batch = arrayOfPromises.splice(0, batchSize)
    await Promise.all(batch)
    console.log(`Resolved batch ${batchNum}`)
  }
}

module.exports = callRequestInBatches
