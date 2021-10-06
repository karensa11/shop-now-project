function openImageModal(e, image){
    openModal(e, "<img style='width:1400px;' src='"+image+"'/>");
}
function showHide(elementsClass, radioBoxId){
    const elementsToShow = document.getElementsByClassName(elementsClass);
    const radioBoxChecked = document.getElementById(radioBoxId).checked;
    for(let i = 0; i < elementsToShow.length; i++){
        const element = elementsToShow.item(i);
        if(radioBoxChecked==true){
            elementsToShow.item(i).removeAttribute('style');
        }
        else{
            elementsToShow.item(i).setAttribute('style', 'display:none');
        }
    }
}
