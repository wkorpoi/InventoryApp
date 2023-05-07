let deleteItem = document.getElementsByClassName("delete-button");
let editItem = document.getElementsByClassName("edit");

Array.from(editItem).forEach(function(element) {
  element.addEventListener('click', function(event){
  console.log(this.parentNode)
  const input = this.parentNode.childNodes[1]
  input.focus()
  input.select()
  input.addEventListener('keyup',changeText)
   
  });
});
function changeText(e){
const _id = e.target.dataset.id
const newText = e.target.value
fetch("/edit", {
  method: "put",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
  _id, newText
  }),
})
  .then((res) => {
    if (res.ok) return res.json();
  })
  .then((data) => {
  });
}
