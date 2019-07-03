// disable enter key - temporary fix due to keydown spam -
window.document.onkeydown = CheckEnter;

function CheckEnter(){
    if(event.keyCode == 13)
         return false;
   return true;
}