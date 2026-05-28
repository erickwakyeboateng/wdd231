const openButton1 = document.querySelector("#openButton1");
const openButton2 = document.querySelector("#openButton2");
const openButton3 = document.querySelector("#openButton3");

const dialogBox = document.querySelector("#dialogBox");
const dialogBoxText = document.querySelector("#dialogBox div");
const dialogBoxHead = document.querySelector("#dialogBox h1");
const closeButton = document.querySelector("#closeButton");

//show dialog
openButton1.addEventListener("click", () => {
  dialogBoxHead.innerHTML = "Apple";
  dialogBoxText.innerHTML = "An apple has 95 calories";
  dialogBox.showModal();
});

openButton2.addEventListener("click", () => {
  dialogBoxHead.innerHTML = "Oranges";
  dialogBoxText.innerHTML = "An orange has 45 calories";
  dialogBox.showModal();
});

openButton3.addEventListener("click", () => {
  dialogBoxHead.innerHTML = "Bananas";
  dialogBoxText.innerHTML = "A Banana has 105 calories";
  dialogBox.showModal();
});


//close Dialog
closeButton.addEventListener("click", () => {
  dialogBox.close();
});
