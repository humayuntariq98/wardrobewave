

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/product`;

export async function index() {
    const res = await fetch(BASE_URL, { method: "GET" });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Invalid Request");
    }
}

export async function detail(id){
  try {
    const url = `${BASE_URL}/${id}`
    const res = await fetch(url, {
        method: 'GET',
    })
    if (res.ok) {
        return res.json()
    }
  } catch (err) {
    console.log(err)
    throw new Error("Invalid Request");
  }
}