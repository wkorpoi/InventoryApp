let deleteItem = document.getElementsByClassName("delete-button");

Array.from(deleteItem).forEach(function(element) {
  element.addEventListener('click', function(event){
  const _id = event.target.value
    console.log('working')
    window.location.reload();
    
    fetch("/inventory", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      _id
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        window.location.reload();
      });
  });
});
