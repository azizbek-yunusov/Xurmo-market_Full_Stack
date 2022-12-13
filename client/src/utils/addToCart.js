

export const addToCart = (e, _id) => {
  e.preventDefault();
  fetch(`http://localhost:5000/addcart/${_id}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        
      } else {
      }
    });
};
