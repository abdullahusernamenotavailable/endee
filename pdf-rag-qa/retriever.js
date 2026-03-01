async function storeInEndee(chunks, embeddings) {

    const storedVectors = [];

    for (let i = 0; i < embeddings.length; i++) {
        storedVectors.push({
            id: i,
            vector: embeddings[i],
            metadata: {
                text: chunks[i]
            }
        });
    }

    console.log("Stored in Endee:", storedVectors.length);

    return storedVectors;
}

module.exports = {
    storeInEndee
};