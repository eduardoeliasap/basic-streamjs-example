import http from 'node:http'

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    /**
     * I'm going through each piece of the chunk (from the req) and inserting it into the buffer.
       The idea here will be to read all the data and then process it
       The Await allows nothing else to be executed until the Buffer is finished loading.
     */
    if (method === 'GET' && url === '/allfile') {
        const buffer = []

        for await (const chunk of req) {
            buffer.push(chunk)
        }

        const fullStreamContent = Buffer.concat(buffer).toString()

        return res.end(fullStreamContent)
    }

    /**
     * In this example, we are looping through each piece of data provided by req and returning to res.
       The idea here is to read item by item and process them (item by item)
     */
    if (method === 'GET' && url === '/oneatatime') {
        return req
            .pipe(res)
    }
})

console.log ('Server is running!!')
server.listen(3335)