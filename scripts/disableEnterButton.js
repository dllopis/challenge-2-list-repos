window.document.onkeydown = CheckEnter;

function CheckEnter(){
    if(event.keyCode == 13)
         return false;
   return true;
}