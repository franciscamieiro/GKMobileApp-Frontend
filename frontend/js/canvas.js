let toolsbar = document.getElementById("toolsbar");
let tools = document.getElementById("tools");
let header = document.getElementById("header");
let headerimg = document.getElementById("headerimg");
let saveCancas= document.getElementById("saveCancas");
let app_footer = document.getElementById("app-footer");
let showcolors = document.getElementById("showcolors");
let colors = document.getElementById("colors");
let pen_pencil = document.getElementById("pen_pencil");
let pen_range = document.getElementById("pen_range");
let rubber = document.getElementById("rubber");
let trash = document.getElementById("trash");
let showStickers = document.getElementById("showStickers");
let stickers = document.getElementById("stickers");
let saved = false;
let initialPage = document.getElementById("initialPage");
let settings = document.getElementById("settings");
let profile = document.getElementById("profile");

let hide1 = document.getElementsByClassName("rotation-handle");
let hide2 = document.getElementsByClassName("resizer_tl");
let hide3 = document.getElementsByClassName("resizer_tr");
let hide4 = document.getElementsByClassName("resizer_bl");
let hide5 = document.getElementsByClassName("resizer_br");

const id = localStorage.userloggedin;


if(screen.availHeight > screen.availWidth){

toolsbar.addEventListener("click", function() {

    if(tools.style.transform == "translate(-62px)"){

        tools.style.transform = "translate(0px)";
        toolsbar.style.transform = "translate(0px)";
        header.style.transform = "translate(0px,0px)";
        headerimg.style.transform = "translate(0px,0px)";
        saveCancas.style.transform = "translate(0px,0px)";
        app_footer.style.transform = "translate(0px,0px)";
        

    }else{

        tools.style.transform = "translate(-62px)";
        toolsbar.style.transform = "translate(-62px)";
        header.style.transform = "translate(0px,-55px)";
        headerimg.style.transform = "translate(0px,-55px)";
        saveCancas.style.transform = "translate(0px,-55px)";
        app_footer.style.transform = "translate(0px,55px)";
        
    }

    if(colors.style.display == "block"){
        colors.style.display = "none";
    }

    if(pen_range.style.display == "block"){
        pen_range.style.display = "none";
    }

    if(stickers.style.display == "block"){
        stickers.style.display = "none";
    }
})

}else{
    toolsbar.addEventListener("click", function() {

        toolsbar.style.transform = "rotate(-270deg);"

    if(toolsbar.style.top == "-21.5px"){

        tools.style.top = "50px";
        toolsbar.style.top = "81px";
        header.style.transform = "translate(0px,0px)";
        headerimg.style.transform = "translate(0px,0px)";
        saveCancas.style.transform = "translate(0px,0px)";
        app_footer.style.transform = "translate(0px,0px)";
        

    }else{

        tools.style.top = "-70px";
        toolsbar.style.top = "-21.5px"
        header.style.transform = "translate(0px,-55px)";
        headerimg.style.transform = "translate(0px,-55px)";
        saveCancas.style.transform = "translate(0px,-55px)";
        app_footer.style.transform = "translate(0px,55px)";
        
    }

    if(colors.style.display == "block"){
        colors.style.display = "none";
    }

    if(pen_range.style.display == "block"){
        pen_range.style.display = "none";
    }

    if(stickers.style.display == "block"){
        stickers.style.display = "none";
    }

});

}

showcolors.addEventListener("click", function() {

    if(colors.style.display == "block"){
        colors.style.display = "none";
    }else{
        colors.style.display = "block";
    }

});

showStickers.addEventListener("click", function() {

    if(stickers.style.display == "block"){
        stickers.style.display = "none";
    }else{
        stickers.style.display = "block";
    }

});

// create canvas

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let context = canvas.getContext("2d");
let start_background_color = "white";
context.fillStyle = start_background_color;
context.fillRect(0, 0, canvas.width, canvas.height);


let draw_color = "black";
let draw_width = "2";
let is_drawing = false;

let restore_array = [];
let index = -1;

window.onload = function(){

    let dataURL = localStorage.getItem("takenpicture");

    if(dataURL != null){

        var img = new Image;
        img.src = dataURL;
        img.onload = function () {
            context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        };

        localStorage.removeItem('takenpicture');
        
    }

}

//change pencil's color
function change_color(element){
    draw_color = element.style.background;
}

//draw on pencil click
pen_pencil.addEventListener("click", function() {

    if(pen_range.style.display == "block"){
        pen_range.style.display = "none";
    }else{
        pen_range.style.display = "block";
    }

    canvas.addEventListener("touchstart", function (e) {
    
        mousePos = getTouchPos(canvas, e);
        var touch = e.touches[0];
        
        var mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        
        canvas.dispatchEvent(mouseEvent);
    }, false);

    canvas.addEventListener("touchend", function (e) {

        var mouseEvent = new MouseEvent("mouseup", {});
        canvas.dispatchEvent(mouseEvent);

    }, false);

    canvas.addEventListener("touchmove", function (e) {

        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);

    }, false);

    canvas.addEventListener("mousedown", start, false);
    canvas.addEventListener("mousemove", draw, false);

    function start(event) {
        is_drawing = true;
        context.beginPath();
        context.moveTo(event.clientX - canvas.offsetLeft, 
                    event.clientY - canvas.offsetTop);
        event.preventDefault();
    }

    function draw(event){

        if(is_drawing){
            context.lineTo(event.clientX - canvas.offsetLeft, 
                            event.clientY - canvas.offsetTop);
            context.strokeStyle = draw_color;
            context.lineWidth = draw_width;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.stroke();
            header.style.transform = "translate(0px,-55px)";
            headerimg.style.transform = "translate(0px,-55px)";
            saveCancas.style.transform = "translate(0px,-55px)";
            app_footer.style.transform = "translate(0px,55px)";
            tools.style.transform = "translate(-62px)";
            toolsbar.style.transform = "translate(-62px)"

            if(colors.style.display == "block"){
                colors.style.display = "none";
            }
        
            if(pen_range.style.display == "block"){
                pen_range.style.display = "none";
            }
        
            if(stickers.style.display == "block"){
                stickers.style.display = "none";
            }
        }
        event.preventDefault();
    }

    canvas.addEventListener("mouseup", stop, false);
    canvas.addEventListener("mouseout", stop, false);

    function stop(event) {

        if(is_drawing){
            context.stroke(),
            context.closePath();
            is_drawing = false;
        }
        event.preventDefault();

        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
        
    }

});

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
    
    var rect = canvasDom.getBoundingClientRect();
    
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}

function clear_canvas() {

    context.fillStyle = start_background_color;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);

    restore_array = [];
    index = -1;

}


trash.addEventListener("click", function(){
    
    hideresize();

    if(tools.style.transform == "translate(-62px)"){

        tools.style.transform = "translate(0px)";
        toolsbar.style.transform = "translate(0px)";
        header.style.transform = "translate(0px,0px)";
        headerimg.style.transform = "translate(0px,0px)";
        saveCancas.style.transform = "translate(0px,0px)";
        app_footer.style.transform = "translate(0px,0px)";
        

    }else{

        tools.style.transform = "translate(-62px)";
        toolsbar.style.transform = "translate(-62px)";
        header.style.transform = "translate(0px,-55px)";
        headerimg.style.transform = "translate(0px,-55px)";
        saveCancas.style.transform = "translate(0px,-55px)";
        app_footer.style.transform = "translate(0px,55px)";
        
    }

    swal({
        icon: 'images/Usure_icon.png',
        title: 'Tens a certeza?',
        text: 'Queres apagar a tua criação?',
        className: "swalAlert",
        buttons: {
        catch: {
          text: "Sim",
          value: "catch",
        },
        cancel: "Não",
      },
    })
    .then((value) => {
        switch (value) {
     
            case "catch":
                clear_canvas();
                location.reload();
                break;
        
            default:
                showresize();
        }
    });

});

let i=0;

rubber.addEventListener("click", function() {

    i = i + 1;
    console.log("click = " + i);
    console.log("index = " + index);

    if(index <= 0){
        clear_canvas();
    }else{
        context.putImageData(restore_array[index-1], 0, 0);
        restore_array.pop();
        index-- ;
    }

});

function closeAll() {
    
    if(tools.style.transform == "translate(-62px)"){

        tools.style.transform = "translate(0px)";
        toolsbar.style.transform = "translate(0px)";
        header.style.transform = "translate(0px,0px)";
        headerimg.style.transform = "translate(0px,0px)";
        saveCancas.style.transform = "translate(0px,0px)";
        app_footer.style.transform = "translate(0px,0px)";
        

    }else{

        tools.style.transform = "translate(-62px)";
        toolsbar.style.transform = "translate(-62px)";
        header.style.transform = "translate(0px,-55px)";
        headerimg.style.transform = "translate(0px,-55px)";
        saveCancas.style.transform = "translate(0px,-55px)";
        app_footer.style.transform = "translate(0px,55px)";
        
    }

    document.getElementById("stickers").style.display = "none";
    
}


let sticker1 = document.getElementById("placesticker1");
let sticker2 = document.getElementById("placesticker2");
let sticker3 = document.getElementById("placesticker3");
let sticker4 = document.getElementById("placesticker4");
let sticker5 = document.getElementById("placesticker5");
let sticker6 = document.getElementById("placesticker6");
let sticker7 = document.getElementById("placesticker7");
let sticker8 = document.getElementById("placesticker8");
let sticker9 = document.getElementById("placesticker9");
let sticker10 = document.getElementById("placesticker10");
let sticker1shown = false;
let sticker2shown = false;
let sticker3shown = false;
let sticker4shown = false;
let sticker5shown = false;
let sticker6shown = false;
let sticker7shown = false;
let sticker8shown = false;
let sticker9shown = false;
let sticker10shown = false;

sticker1.addEventListener("click", function(){

    const div = document.createElement('div');

    div.className = 'item sticker1';

    div.id = 'sticker1shownn'

    div.innerHTML = `
        <div class="rotation-handle">&circlearrowright;</div>
        <div class="resizer_tl"></div>
        <div class="resizer_tr"></div>
        <div class="resizer_bl"></div>
        <div class="resizer_br"></div>
    `;

    document.getElementById('capture').appendChild(div);

    closeAll();

    sticker1shown = true;

});
sticker2.addEventListener("click", function(){

    const div = document.createElement('div');

    div.className = 'item sticker2';
    div.id = 'sticker2shownn'

    div.innerHTML = `
        <div class="rotation-handle">&circlearrowright;</div>
        <div class="resizer_tl"></div>
        <div class="resizer_tr"></div>
        <div class="resizer_bl"></div>
        <div class="resizer_br"></div>
    `;

    document.getElementById('capture').appendChild(div);

    closeAll();

    sticker2shown = true;
});

sticker3.addEventListener("click", function(){

    const div = document.createElement('div');

    div.className = 'item sticker3';
    div.id = 'sticker3shownn'

    div.innerHTML = `
        <div class="rotation-handle">&circlearrowright;</div>
        <div class="resizer_tl"></div>
        <div class="resizer_tr"></div>
        <div class="resizer_bl"></div>
        <div class="resizer_br"></div>
    `;

    document.getElementById('capture').appendChild(div);

    closeAll();
    sticker3shown = true;

});

sticker4.addEventListener("click", function(){

    const div = document.createElement('div');

    div.className = 'item sticker4';
    div.id = 'sticker4shownn'

    div.innerHTML = `
        <div class="rotation-handle">&circlearrowright;</div>
        <div class="resizer_tl"></div>
        <div class="resizer_tr"></div>
        <div class="resizer_bl"></div>
        <div class="resizer_br"></div>
    `;

    document.getElementById('capture').appendChild(div);

    closeAll();
    sticker4shown = true;

});

sticker5.addEventListener("click", function(){

    const div = document.createElement('div');

    div.className = 'item sticker5';
    div.id = 'sticker5shownn'

    div.innerHTML = `
        <div class="rotation-handle">&circlearrowright;</div>
        <div class="resizer_tl"></div>
        <div class="resizer_tr"></div>
        <div class="resizer_bl"></div>
        <div class="resizer_br"></div>
    `;

    document.getElementById('capture').appendChild(div);

    closeAll();
    sticker5shown = true;

});

sticker6.addEventListener("click", function(){

    const div = document.createElement('div');

    div.className = 'item sticker6';
    div.id = 'sticker6shownn'

    div.innerHTML = `
        <div class="rotation-handle">&circlearrowright;</div>
        <div class="resizer_tl"></div>
        <div class="resizer_tr"></div>
        <div class="resizer_bl"></div>
        <div class="resizer_br"></div>
    `;

    document.getElementById('capture').appendChild(div);

    closeAll();
    sticker6shown = true;

});

sticker7.addEventListener("click", function(){

    const div = document.createElement('div');

    div.className = 'item sticker7';
    div.id = 'sticker7shownn'

    div.innerHTML = `
        <div class="rotation-handle">&circlearrowright;</div>
        <div class="resizer_tl"></div>
        <div class="resizer_tr"></div>
        <div class="resizer_bl"></div>
        <div class="resizer_br"></div>
    `;

    document.getElementById('capture').appendChild(div);

    closeAll();
    sticker7shown = true;
});

sticker8.addEventListener("click", function(){

    const div = document.createElement('div');

    div.className = 'item sticker8';
    div.id = 'sticker8shownn'

    div.innerHTML = `
        <div class="rotation-handle">&circlearrowright;</div>
        <div class="resizer_tl"></div>
        <div class="resizer_tr"></div>
        <div class="resizer_bl"></div>
        <div class="resizer_br"></div>
    `;

    document.getElementById('capture').appendChild(div);

    closeAll();
    sticker8shown = true;
});

sticker9.addEventListener("click", function(){

    const div = document.createElement('div');

    div.className = 'item sticker9';
    div.id = 'sticker9shownn'
    div.innerHTML = `
        <div class="rotation-handle">&circlearrowright;</div>
        <div class="resizer_tl"></div>
        <div class="resizer_tr"></div>
        <div class="resizer_bl"></div>
        <div class="resizer_br"></div>
    `;

    document.getElementById('capture').appendChild(div);

    closeAll();
    sticker9shown = true;

});

sticker10.addEventListener("click", function(){

    const div = document.createElement('div');

    div.className = 'item sticker10';
    div.id = 'sticker10shownn'

    div.innerHTML = `
        <div class="delete-handle"></div>
        <div class="rotation-handle">&circlearrowright;</div>
        <div class="resizer_tl"></div>
        <div class="resizer_tr"></div>
        <div class="resizer_bl"></div>
        <div class="resizer_br"></div>
    `;

    document.getElementById('capture').appendChild(div);

    closeAll();
    sticker10shown = true;

});

let angleNow = 0;


interact('.item')
  .draggable({
    onmove: window.dragMoveListener
  })
  .resizable({
    preserveAspectRatio: true,
    edges: { left: true, right: true, bottom: true, top: true }
  })
  .on('resizemove', function (event) {

    
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px, ' + y + 'px) rotate(' + angleNow + 'rad' + ')';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  });

function dragMoveListener (event) {

    var box = event.target.parentElement;

    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
        'translate(' + x + 'px, ' + y + 'px) rotate(' + angleNow + 'rad' + ')';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }



  interact('.rotation-handle')
  .draggable({
    onstart: function(event) {
      var box = event.target.parentElement;
      var rect = box.getBoundingClientRect();

      // store the center as the element has css `transform-origin: center center`
      box.setAttribute('data-center-x', rect.left + rect.width / 2);
      box.setAttribute('data-center-y', rect.top + rect.height / 2);
      // get the angle of the element when the drag starts
      box.setAttribute('data-angle', getDragAngle(event));
    },
    onmove: function(event) {
      var box = event.target.parentElement;

      var pos = {
        x: parseFloat(box.getAttribute('data-x')) || 0,
        y: parseFloat(box.getAttribute('data-y')) || 0
      };

      var angle = getDragAngle(event);

      // update transform style on dragmove
      box.style.transform = 'translate(' + pos.x + 'px, ' + pos.y + 'px) rotate(' + angle + 'rad' + ')';
    },
    onend: function(event) {
      var box = event.target.parentElement;

      // save the angle on dragend
      box.setAttribute('data-angle', getDragAngle(event));
    },
  })

function getDragAngle(event) {

    var box = event.target.parentElement;
    var startAngle = parseFloat(box.getAttribute('data-angle')) || 0;
    var center = {
        x: parseFloat(box.getAttribute('data-center-x')) || 0,
        y: parseFloat(box.getAttribute('data-center-y')) || 0
    };

    var angle = Math.atan2(center.y - event.clientY, center.x - event.clientX);

    angleNow = angle - startAngle;

    return angle - startAngle;
}

function hideresize() {

    
    if(hide1 != null){
        for(let i =0; i<hide1.length; i++){
        hide1[i].style.display = "none";}}

   if(hide2 != null){
        for(let i =0; i<hide2.length; i++){
        hide2[i].style.display = "none";}}

    if(hide3 != null){
        for(let i =0; i<hide3.length; i++){
        hide3[i].style.display = "none";}}

    if(hide4 != null){
        for(let i =0; i<hide4.length; i++){
        hide4[i].style.display = "none";}}

    if(hide5 != null){
        for(let i =0; i<hide5.length; i++){
        hide5[i].style.display = "none";}}

}

function showresize() {
    
    if(hide1 != null){
        for(let i =0; i<hide1.length; i++){
        hide1[i].style.display = "table";}}

   if(hide2 != null){
        for(let i =0; i<hide2.length; i++){
        hide2[i].style.display = "block";}}

    if(hide3 != null){
        for(let i =0; i<hide3.length; i++){
        hide3[i].style.display = "block";}}

    if(hide4 != null){
        for(let i =0; i<hide4.length; i++){
        hide4[i].style.display = "block";}}

    if(hide5 != null){
        for(let i =0; i<hide5.length; i++){
        hide5[i].style.display = "block";}}

}

function findPos(obj) {
	var curleft = curtop = 0;

    if (obj.offsetParent) {
        
        do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
        
        return [curleft,curtop];
    }
}

function printCriation(){

    if(sticker1shown == true){

        let sticker1shown = document.getElementById("sticker1shown");
        let posx = sticker1shown.getAttribute("data-x");
        let posy = sticker1shown.getAttribute("data-y");
        let height = sticker1shown.style.height;
        let width = sticker1shown.style.width;

        findPos(sticker1shown);
        console.log(findPos(sticker1shown));

        let imgsticker1 = document.createElement('img');
        imgsticker1.setAttribute("src", "images/sticker1.png");
        imgsticker1.setAttribute("width", height-150 + "px");
        imgsticker1.setAttribute("height", width-150 + "px" );
        context.drawImage(imgsticker1, posx,posy+190);

    }

    if(sticker2shown == true){

        let sticker2shown = document.getElementById("sticker2shown");
        let posx = sticker2shown.getAttribute("data-x");
        let posy = sticker2shown.getAttribute("data-y");
        let height = sticker2shown.style.height;
        let width = sticker2shown.style.width;

        findPos(sticker2shown);
        console.log(findPos(sticker1shown));

        let imgsticker2 = document.createElement('img');
        imgsticker2.setAttribute("src", "images/sticker2.png");
        imgsticker2.setAttribute("width", height-150 + "px");
        imgsticker2.setAttribute("height", width-150 + "px" );
        context.drawImage(imgsticker2, posx,posy+190);

    }
    if(sticker3shown == true){

        let sticker3shown = document.getElementById("sticker3shown");
        let posx = sticker3shown.getAttribute("data-x");
        let posy = sticker3shown.getAttribute("data-y");
        let height = sticker3shown.style.height;
        let width = sticker3shown.style.width;

        findPos(sticker3shown);
        console.log(findPos(sticker3shown));

        let imgsticker3 = document.createElement('img');
        imgsticker3.setAttribute("src", "images/sticker3.png");
        imgsticker3.setAttribute("width", height-150 + "px");
        imgsticker3.setAttribute("height", width-150 + "px" );
        context.drawImage(imgsticker3, posx,posy+190);

    }
    if(sticker4shown == true){

        let sticker4shown = document.getElementById("sticker4shown");
        let posx = sticker4shown.getAttribute("data-x");
        let posy = sticker4shown.getAttribute("data-y");
        let height = sticker4shown.style.height;
        let width = sticker4shown.style.width;

        findPos(sticker4shown);
        console.log(findPos(sticker4shown));

        let imgsticker4 = document.createElement('img');
        imgsticker4.setAttribute("src", "images/sticker4.png");
        imgsticker4.setAttribute("width", height-150 + "px");
        imgsticker4.setAttribute("height", width-150 + "px" );
        context.drawImage(imgsticker4, posx,posy+190);

    }

    if(sticker5shown == true){

        let sticker5shown = document.getElementById("sticker5shown");
        let posx = sticker5shown.getAttribute("data-x");
        let posy = sticker5shown.getAttribute("data-y");
        let height = sticker5shown.style.height;
        let width = sticker5shown.style.width;

        findPos(sticker5shown);
        console.log(findPos(sticker5shown));

        let imgsticker5 = document.createElement('img');
        imgsticker5.setAttribute("src", "images/sticker5.png");
        imgsticker5.setAttribute("width", height-150 + "px");
        imgsticker5.setAttribute("height", width-150 + "px" );
        context.drawImage(imgsticker5, posx,posy+190);

    }

    if(sticker6shown == true){

        let sticker6shown = document.getElementById("sticker6shown");
        let posx = sticker6shown.getAttribute("data-x");
        let posy = sticker6shown.getAttribute("data-y");
        let height = sticker6shown.style.height;
        let width = sticker6shown.style.width;

        findPos(sticker6shown);
        console.log(findPos(sticker6shown));

        let imgsticker6 = document.createElement('img');
        imgsticker6.setAttribute("src", "images/sticker6.png");
        imgsticker6.setAttribute("width", height-150 + "px");
        imgsticker6.setAttribute("height", width-150 + "px" );
        context.drawImage(imgsticker6, posx,posy+190);

    }

    if(sticker7shown == true){

        let sticker7shown = document.getElementById("sticker7shown");
        let posx = sticker7shown.getAttribute("data-x");
        let posy = sticker7shown.getAttribute("data-y");
        let height = sticker7shown.style.height;
        let width = sticker7shown.style.width;

        let imgsticker7 = document.createElement('img');
        imgsticker7.setAttribute("src", "images/sticker7.png");
        imgsticker7.setAttribute("width", height-150 + "px");
        imgsticker7.setAttribute("height", width-150 + "px" );
        context.drawImage(imgsticker7, posx,posy+190);

    }

    if(sticker8shown == true){

        let sticker8shown = document.getElementById("sticker8shown");
        let posx = sticker8shown.getAttribute("data-x");
        let posy = sticker8shown.getAttribute("data-y");
        let height = sticker8shown.style.height;
        let width = sticker8shown.style.width;

        let imgsticker8 = document.createElement('img');
        imgsticker8.setAttribute("src", "images/sticker8.png");
        imgsticker8.setAttribute("width", height-150);
        imgsticker8.setAttribute("height", width-150);
        context.drawImage(imgsticker8, posx,posy+190);

    }
    if(sticker9shown == true){

        let sticker9shownn = document.getElementsByClassName("sticker9");
        let width = sticker9shownn[0].offsetWidth;
        let posx = sticker9shownn[0].getAttribute("data-x");
        let posy = sticker9shownn[0].getAttribute("data-y");
        let height = sticker9shownn[0].style.hei;
        alert(width);
        alert(height);
        let imgsticker9 = document.createElement('img');
        imgsticker9.setAttribute("src", "images/sticker9.png");
        imgsticker9.setAttribute("width", width + "px"); 
        imgsticker9.setAttribute("height", height + "px" );
        context.drawImage(imgsticker9, posx,posy);

    }
    if(sticker10shown == true){

        let posx = sticker10.getAttribute("data-x");
        let posy = sticker10.getAttribute("data-y");
        let height = sticker10.style.height;
        let width = sticker10.offsetWidth;
        console.log(width);

        let imgsticker10 = document.createElement('img');
        imgsticker10.setAttribute("src", "images/sticker10.png");
        imgsticker10.setAttribute("width", height-150 + "px");
        imgsticker10.setAttribute("height", width-150 + "px" );
        context.drawImage(imgsticker10, posx, posy+190, width, height, 0, 0, width, height);

    }

            hideresize();
            closeAll();

            var dataURI = canvas.toDataURL('image/jpeg');

            var blob = dataURLtoBlob(dataURI);
            image = new FormData();
            image.append("file", blob);

            swal({
                icon: 'images/Usure_icon.png',
                text: 'Qual é a cidade onde queres ver a tua criação?',
                content: {
                    element: "input",
                },
                button: 'OK',
                className: "swalAlert1",
                closeOnClickOutside: false,
                closeOnClick: false,
            }).then(function(inputValue) {
                if (inputValue === false) return false;
            
                else if (inputValue === "") {
                    
                    swal({
                        icon: 'images/warning.png',
                        text: 'Escreve uma cidade!',
                    }).then(function(isConfirm) {
                        printCriation();
                    });
                
                    
                }else{

                    let data = {};
                    data.city = inputValue;
                    data.coordinates = null;
                    data.userID = parseFloat(id);
                    data.date_creation = new Date();
                    data.date_published = null;
                    data.evaluation = 0;
                    data.published = 0;

                    if(saved == false){
                    
                        fetch("http://localhost:80/api/creations", {
                            headers: { 'Content-Type': 'application/json' },
                            method: 'POST',
                            body: JSON.stringify(data)
                        }).then(function(response) {
                            console.log(data);
                            if (!response.ok) {
                                console.log(response.status); //=> number 100–599
                                console.log(response.statusText); //=> String
                                console.log(response.headers); //=> Headers
                                console.log(response.url); //=> String
                                if (response.status === 409) {
                                }
                                else {
                                    throw Error(response.statusText);
                                }
                            }
                            else {
                                response.text().then(function (text) {
                                    let see = text.split("objectId");
                                    console.log(see[1]);
                                    var regex = /\d+/g;
                                    var string = see[1].toString();
                                    var matches = string.match(regex);
                    
                                    console.log(text);
                                    console.log(matches[0]);
                
                                    let idcreation = matches[0];

                                fetch('http://localhost:80/api/creations/' + idcreation + "/image"  , {
                                    mode: 'cors',
                                    method: 'PUT',
                                    body: image,
                                    credentials: 'include'
                                })
                                .then(function (response) {
                                    //console.log(response.headers.get('Set-Cookie'));
                                    console.log(response);
                                    if (!response.ok) {
                                        throw new Error(response.statusText);
                                    }
                                    return response.json();
                                })
                                .catch(function (err) {
                                    console.log(err); // estava alert(err); coloquei console log para não estar sempre a aparecer pop-up ao utilizador
                                })
                                .then(async function (result) {
                                    console.log(result);
                                    if (result) {

                                        ///
                                        saved = true;

                                        swal({
                                            icon: 'images/v254_5.png',
                                            title: 'Guardada',
                                            text: 'A tua criação foi guardada!',
                                            className: "swalAlert",
                                            button: 'Ok',
                                        }).then((value) => {
                                            
                                            swal({
                                                icon: 'images/Usure_icon.png',
                                                title: 'Sair?',
                                                text: 'Queres sair ou continuar a editar?',
                                                className: "swalAlert",
                                                buttons: {
                                                catch: {
                                                text: "Sair",
                                                value: "catch",
                                                },
                                                cancel: "Editar",
                                            },
                                            }).then((value) => {
                                                switch (value) {
                                            
                                                    case "catch":
                                                        window.location.replace("mydrawings.html");
                                                
                                                    default:
                                                        showresize();
                                                }
                                        
                                            });
                                    
                                        });

                                    }
                                    else {
                                        swal("Erro!", "Erro!", "error")
                                        .then(() => {
                                            //location.reload();
                                        })

                                    }
                                });
                            });
                            }
                            
                        }).then(function(result) {
                            console.log(result);
                        }).catch(function(err) {
                            swal({
                                icon: 'images/v237_21.png',
                                title: 'Erro',
                                text: 'Erro ao guardar.',
                                button: 'OK',
                                className: "swalAlert"
                                
                            })
                            console.error(err);
                            showresize();
                        });

                    }else{
                        //saved == true, logo já foi guardado uma vez e portanto agora aqui é para fazer um PUT
                    }

                }
            });
}


initialPage.addEventListener("click", function(){
    if(saved == false){
        swal({
            icon: 'images/Usure_icon.png',
            title: 'Não guardaste o desenho!',
            text: 'Queres sair na mesma?',
            className: "swalAlert",
            buttons: {
            catch: {
              text: "Sair",
              value: "catch",
            },
            cancel: "Cancelar",
          },
        }).then((value) => {
            switch (value) {
         
                case "catch":
                    window.location.replace("inicialPage.html");
            
                default:
                    showresize();
            }
    
        });
    }
});

settings.addEventListener("click", function(){
    if(saved == false){
        swal({
            icon: 'images/Usure_icon.png',
            title: 'Não guardaste o desenho!',
            text: 'Queres sair na mesma?',
            className: "swalAlert",
            buttons: {
            catch: {
              text: "Sair",
              value: "catch",
            },
            cancel: "Cancelar",
          },
        }).then((value) => {
            switch (value) {
         
                case "catch":
                    window.location.replace("settings.html");
            
                default:
                    showresize();
            }
    
        });
    }
});

profile.addEventListener("click", function(){
    if(saved == false){
        swal({
            icon: 'images/Usure_icon.png',
            title: 'Não guardaste o desenho!',
            text: 'Queres sair na mesma?',
            className: "swalAlert",
            buttons: {
            catch: {
              text: "Sair",
              value: "catch",
            },
            cancel: "Cancelar",
          },
        }).then((value) => {
            switch (value) {
         
                case "catch":
                    window.location.replace("perfil.html");
            
                default:
                    showresize();
            }
    
        });
    }
});

function dataURLtoBlob(dataurl) {
    
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
}