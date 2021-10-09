function sortInner(column, tableId, startIndex, rankFunction)
{
    var tableData = $('#'+tableId);
    var rowData = tableData.find('>tbody>tr');
    for(var i = startIndex; i < rowData.length; i++){
        rowData = tableData.find('>tbody>tr');
        for(var j = startIndex; j < rowData.length - 2; j+=2){
            var shouldMoveUP = rankFunction(rowData[j].children[column], rowData[j+2].children[column]);
            if(shouldMoveUP==true){;
                var parent = rowData[j].parentNode;
                parent.insertBefore(rowData[j+2], rowData[j]);
                parent.insertBefore(rowData[j+3], rowData[j]);
            }
        }
    }
}
function sortDataAsTimeMSUp(column, tableId, startIndex)
{
    sortInner(column, tableId, startIndex, function(col1, col2){
        return col1.innerHTML.localeCompare(col2.innerHTML)>0;
    });
}
function sortDataAsTimeMSDown(column, tableId, startIndex)
{
    sortInner(column, tableId, startIndex, function(col1, col2){
        return col1.innerHTML.localeCompare(col2.innerHTML)<0;
    });
}
function sortDataAsRateUp(column, tableId, startIndex)
{
    sortInner(column, tableId, startIndex, function(col1, col2){
        var elementJ1 = col1.children[0].children[0].innerHTML;
        var elementJ2 = col2.children[0].children[0].innerHTML;
        return parseInt(elementJ1.substring(0, elementJ1.length-1)) > parseInt(elementJ2.substring(0, elementJ2.length-1));
    });
}
function sortDataAsRateDown(column, tableId, startIndex)
{
    sortInner(column, tableId, startIndex, function(col1, col2){
        var elementJ1 = col1.children[0].children[0].innerHTML;
        var elementJ2 = col2.children[0].children[0].innerHTML;
        return parseInt(elementJ1.substring(0, elementJ1.length-1)) < parseInt(elementJ2.substring(0, elementJ2.length-1));
    });
}
function sortDataAsIntegerUp(column, tableId, startIndex)
{
    sortInner(column, tableId, startIndex, function(col1, col2){
        var elementJ1 = col1.innerHTML;
        var elementJ2 = col2.innerHTML;
        return parseInt(elementJ1) > parseInt(elementJ2);
    });
}
function sortDataAsIntegerDown(column, tableId, startIndex)
{
    sortInner(column, tableId, startIndex, function(col1, col2){
        var elementJ1 = col1.innerHTML;
        var elementJ2 = col2.innerHTML;
        return parseInt(elementJ1) < parseInt(elementJ2);
    });
}
function sortDataAsStringUp(column, tableId, startIndex)
{
    sortInner(column, tableId, startIndex, function(col1, col2){
        var elementJ1 = col1.innerHTML;
        var elementJ2 = col2.innerHTML;
        return elementJ1.localeCompare(elementJ2)>0;
    });
}
function sortDataAsStringDown(column, tableId, startIndex)
{
    sortInner(column, tableId, startIndex, function(col1, col2){
        var elementJ1 = col1.innerHTML;
        var elementJ2 = col2.innerHTML;
        return elementJ1.localeCompare(elementJ2)<0;
    });
}
function sortDataAsLinkUp(column, tableId, startIndex)
{
    sortInner(column, tableId, startIndex, function(col1, col2){
        var elementJ1 = col1.children[0].innerHTML;
        var elementJ2 = col2.children[0].innerHTML;
        return elementJ1.localeCompare(elementJ2)>0;
    });
}
function sortDataAsLinkDown(column, tableId, startIndex)
{
    sortInner(column, tableId, startIndex, function(col1, col2){
        var elementJ1 = col1.children[0].innerHTML;
        var elementJ2 = col2.children[0].innerHTML;
        return elementJ1.localeCompare(elementJ2)<0;
    });
}
function openImageRelative(name){
    var loc = window.location.pathname;var dir = loc.substring(0, loc.lastIndexOf('/')+1);window.open(dir+name, '_blank');
}
function openImage(name){
    window.open(name, '_blank');
}
function filterTests(column, tableId, searchBoxId, startIndex)
{
    var tableData = $('#'+tableId);
    var rowData = tableData.find('>tbody>tr');
    var searchString = document.getElementById(searchBoxId).value.toLowerCase();
    for(var i = startIndex; i < rowData.length; i+=2){
        var element = rowData[i].children[column].innerHTML.toLowerCase();
        if(element.indexOf(searchString)>-1){
            rowData[i].removeAttribute('style');
        }
        else{
            rowData[i].setAttribute('style', 'display:none');
        }
        rowData[i+1].setAttribute('style', 'display:none');
    }
}
function showHide(elementsClass, radioBoxId){
    var elementsToShow = document.getElementsByClassName(elementsClass);
    var radioBoxChecked = document.getElementById(radioBoxId).checked;
    for(var i = 0; i < elementsToShow.length; i++){
        var element = elementsToShow.item(i);
        if(radioBoxChecked==true){
            elementsToShow.item(i).removeAttribute('style');
        }
        else{
            elementsToShow.item(i).setAttribute('style', 'display:none');
        }
    }
}
function openImageModal(e, imageIndex, mockupId)
{
    // dynamic modal elements //
    var images = jQuery.parseJSON(sessionStorage.getItem('images'));
    var image = images[imageIndex];
    var mockups = jQuery.parseJSON(sessionStorage.getItem('mockups'));
    var mockupElements = mockups[image.step];
    var mockupsStr = "";
    if(mockupElements){
        for (var i = 0; i < mockupElements.length; i++) {
            mockupsStr +=
                '&nbsp;&nbsp;'+
                '<span onmouseenter="imageModalEnter()"><img class="mockupUrlIcon" src="mockups/'+mockupElements[i].pathId+'.png" title="mockup path '+mockupElements[i].url+'" onclick="openLink(\''+mockupElements[i].url+'\', '+i+')"/></span>'+
                '<span onmouseenter="imageModalEnter()"><img class="mockupCompareIcon" src="../resources/images/compare.png" title="compare mockup with image" onclick="openImageModal(event, '+imageIndex+', \''+mockupElements[i].pathId+'\')"/></span>';
        }
    }
    var scrollDots = "";
    for (var i = 0; i < images.length; i++) {
        if(imageIndex==i){
            scrollDots += "<span class='dotActive' onmouseenter='imageModalEnter()'>. </span>";
        }
        else{
            scrollDots += "<span class='dotInactive' onclick='openImageModal(event,"+(i)+")' title='"+images[i].path+"' onmouseenter='imageModalEnter()'>. </span>";
        }
    }
    imageIndex==0 ? prevAction='':prevAction='openImageModal(event,'+(imageIndex-1)+')';
    imageIndex==images.length-1 ? nextAction='':nextAction='openImageModal(event,'+(imageIndex+1)+')';
    imageIndex==0 ? prevClass='backNextInactive':prevClass='backNextActive';
    imageIndex==images.length-1 ? nextClass='backNextInactive':nextClass='backNextActive';

    var imageHTML = "", contentWidth=0;
    if(mockupId){
        imageHTML =
            "<table style='background-color:transparent;border:none;border-collapse:collapse;'><tr>"+
            "<td valign='top' style='border:none;padding:0px;'><img class='subImage' title='"+image.path+"' src='"+image.path+"' onclick='"+nextAction+"'/></td>"+
            "<td valign='top' style='border:none;padding:0px;'><img class='subImage' src='mockups/"+mockupId+".png' onclick='"+nextAction+"'/></td>"+
            "</tr></table>";
        contentWidth = 1300;
    }
    else{
        imageHTML = "<img class='mainImage' title='"+image.path+"' src='"+image.path+"' onclick='"+nextAction+"'/>";
        contentWidth = 1000;
    }

    // create modal //
    openModal(e,
        "<div class='imageModalContent' style='width:"+contentWidth+"px'>"+
        "  <div class='imageContainer' onmouseout='imageModalOut()'>"+
        "    <div class='topBar' align='center'>"+
        "      <div class='dots' onmouseenter='imageModalEnter()'>"+scrollDots+"</div>"+
        "      <div class='compare'>"+mockupsStr+"</div>"+
        "    </div>"+
        "    <div class='backNextContainer' onmouseenter='imageModalEnter()' >"+
        "      <div class='backDiv' title='prev' onclick='"+prevAction+"'>"+
        "        <md-icon class='material-icons md-light md-48 "+prevClass+"'>keyboard_arrow_left</md-icon>"+
        "      </div>"+
        "      <div class='nextDiv' title='next' onclick='"+nextAction+"'>"+
        "        <md-icon class='material-icons md-light md-48 "+nextClass+"'>keyboard_arrow_right</md-icon>"+
        "      </div>"+
        "    </div>"+
        "    <div class='imageSubContainer' onclick='"+nextAction+"' onmouseenter='imageModalEnter()'>"+
        "      "+imageHTML+
        "    </div>"+
        "  </div>"+
        "</div>");
}
function imageModalEnter()
{
    $('.imageModalContent .topBar').css('opacity', '1');
    $('.backNextContainer').css('opacity', '1');
}
function imageModalOut()
{
    $('.imageModalContent .topBar').css('opacity', '0');
    $('.backNextContainer').css('opacity', '0');
}
function move()
{
    console.log('move');
}
function openLink(url)
{
    var win = window.open(url, '_blank');
    win.focus();
}
function toggleElement(elementID){
    var style = $('#'+elementID).css('display');
    if(style=='none'){
        $('#'+elementID+'Button').html('-');
    }
    else{
        $('#'+elementID+'Button').html('+');
    }
    $('#'+elementID).slideToggle(1000);
}
function hideAllElementStartsWith(elementID){
    $('.'+elementID).slideUp(1000);
}
function showAllElementStartsWith(elementID){
    $('.'+elementID).slideDown(1000);
}
function showOnlyRowFromType(type){
    $('.totalRow').hide();
    $('.'+type+'Row').show();
}
function drawCharts(prefix, passedNum, skippedNum, failedNum)
{
    var total = passedNum+skippedNum+failedNum;
    $(function () {
        $('#'+prefix+'pieContainer').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: true,
                height: 230,
                width: 450,
                type: 'pie'
            },
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    },
                    size: 150,
                    shadow: {
                        color: 'black',
                        offsetX : 0,
                        offsetY: 0,
                        opacity: 1,
                        width: 3
                    }
                },
            },
            series: [{
                name: 'Tests',
                colorByPoint: true,
                data: [{
                    name: 'Passsed ('+passedNum+')',
                    color: '#00FF00',
                    y: passedNum/total
                }, {
                    name: 'Skipped ('+skippedNum+')',
                    color: '#BBBBBB',
                    y: skippedNum/total
                }, {
                    name: 'Failed ('+failedNum+')',
                    color: '#FF0000',
                    y: failedNum/total
                }]
            }]
        });
    });
}