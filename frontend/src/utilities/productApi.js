

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/`;

export async function index() {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.
    const res = await fetch(BASE_URL, { method: "GET" });
    // Check if request was successful
    if (res.ok) {
      // res.json() - the returned JSON serialzier data from our people API
      return res.json();
    } else {
      throw new Error("Invalid Request");
    }
}
