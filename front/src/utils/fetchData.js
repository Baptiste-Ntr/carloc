export const fetchData = async (url, method, headers, body) => {
    try {
        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: body,
            credentials: 'include'
        })
        if(response.status === 200) {
            const data = await response.json()
            return {data: data, status: response.status}
        } else {
            return {error: response.statusText, message: `Error fetching data ${url}`, data: null, status: response.status}
        }
    } catch(err) {
        console.log(`Error fetching data ${url}:`, err)
        return {error: err, message: `Error fetching data ${url} : ${err}`, data: null, status: null}
    }
}