async function generateEmbeddings(chunks) {

    const embeddings = [];

    for (let chunk of chunks) {

        const vector = [];

        for (let i = 0; i < 384; i++) {
            vector.push(Math.random());
        }

        embeddings.push(vector);
    }

    return embeddings;
}

module.exports = {
    generateEmbeddings
};