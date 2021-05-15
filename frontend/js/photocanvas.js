let toolsbar = document.getElementById("toolsbar");
let tools = document.getElementById("tools");
let header = document.getElementById("header");
let headerimg = document.getElementById("headerimg");
let saveCancas = document.getElementById("saveCancas");
let app_footer = document.getElementById("app-footer");
let showcolors = document.getElementById("showcolors");
let colors = document.getElementById("colors");
let pen_pencil = document.getElementById("pen_pencil");
let pen_range = document.getElementById("pen_range");
let rubber = document.getElementById("rubber");
let trash = document.getElementById("trash");
let showStickers = document.getElementById("showStickers");
let stickers = document.getElementById("stickers");
let inputLabel = document.getElementById("inputLabel");
let back = document.getElementById("goBack");
let initialPage = document.getElementById("initialPage");
let settings = document.getElementById("settings");
let profile = document.getElementById("profile");
let saved = false;
const id = localStorage.userloggedin;

toolsbar.addEventListener("click", function () {

    if (tools.style.transform == "translate(-62px)") {

        tools.style.transform = "translate(0px)";
        toolsbar.style.transform = "translate(0px)";
        header.style.transform = "translate(0px,0px)";
        headerimg.style.transform = "translate(0px,0px)";
        saveCancas.style.transform = "translate(0px,0px)";
        app_footer.style.transform = "translate(0px,0px)";


    } else {

        tools.style.transform = "translate(-62px)";
        toolsbar.style.transform = "translate(-62px)";
        header.style.transform = "translate(0px,-55px)";
        headerimg.style.transform = "translate(0px,-55px)";
        saveCancas.style.transform = "translate(0px,-55px)";
        app_footer.style.transform = "translate(0px,55px)";

    }

    if (colors.style.display == "block") {
        colors.style.display = "none";
    }

    if (pen_range.style.display == "block") {
        pen_range.style.display = "none";
    }

    if (stickers.style.display == "block") {
        stickers.style.display = "none";
    }
})

showcolors.addEventListener("click", function () {

    if (colors.style.display == "block") {
        colors.style.display = "none";
    } else {
        colors.style.display = "block";
    }

});

showStickers.addEventListener("click", function () {

    if (stickers.style.display == "block") {
        stickers.style.display = "none";
    } else {
        stickers.style.display = "block";
    }

});

let loadedIMGsrc = null;

function loadCanvasWithInputFile(cns) {
    var context = cns.getContext("2d");
    cns.width = window.innerWidth;
    cns.height = window.innerHeight;
    var fileinput = document.getElementById('inputfile'); // input file
    var img = new Image();

    fileinput.onchange = function (evt) {
        var files = evt.target.files; // FileList object
        var file = files[0];
        if (file.type.match('image.*')) {
            var reader = new FileReader();
            // Read in the image file as a data URL.
            reader.readAsDataURL(file);
            reader.onload = function (evt) {
                if (evt.target.readyState == FileReader.DONE) {
                    img.src = evt.target.result;
                    img.style.overflow = "hidden";
                    loadedIMGsrc = img.src;
                    if (img.width < img.height) {
                        img.onload = () => context.drawImage(img, 0, 0, img.width, img.height, 0, 0, cns.width, cns.height);
                        cns.style.display = "block";
                        toolsbar.style.display = "block";
                        tools.style.display = "block";
                        saveCancas.style.display = "block";
                        inputLabel.style.display = "none";
                        back.style.display = "none";
                    } else {
                        img.onload = () => context.drawImage(img, 0, 0, img.width, img.height, 0, 0, cns.width, cns.height);
                        cns.style.display = "block";
                        toolsbar.style.display = "block";
                        tools.style.display = "block";
                        saveCancas.style.display = "block";
                        inputLabel.style.display = "none";
                        back.style.display = "none";
                    }
                }
            }

        } else {
            alert("not an image");
        }
    };
}


// create canvas

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let context = canvas.getContext("2d");
let start_background_color = "white";
context.fillStyle = start_background_color;
context.fillRect(0, 0, canvas.width, canvas.height);

let restore_array = [];

let index = -1;

loadCanvasWithInputFile(canvas);

let draw_color = "black";
let draw_width = "2";
let is_drawing = false;

//change pencil's color
function change_color(element) {
    draw_color = element.style.background;
}

//draw on pencil click
pen_pencil.addEventListener("click", function () {


    restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;

    if (pen_range.style.display == "block") {
        pen_range.style.display = "none";
    } else {
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

    function draw(event) {

        if (is_drawing) {
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

            if (colors.style.display == "block") {
                colors.style.display = "none";
            }

            if (pen_range.style.display == "block") {
                pen_range.style.display = "none";
            }

            if (stickers.style.display == "block") {
                stickers.style.display = "none";
            }
        }
        event.preventDefault();
    }

    canvas.addEventListener("mouseup", stop, false);
    canvas.addEventListener("mouseout", stop, false);

    function stop(event) {

        if (is_drawing) {
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


trash.addEventListener("click", function () {

    hideresize();

    if (tools.style.transform == "translate(-55px)") {

        tools.style.transform = "translate(0px)";
        toolsbar.style.transform = "translate(0px)";
        header.style.transform = "translate(0px,0px)";
        headerimg.style.transform = "translate(0px,0px)";
        saveCancas.style.transform = "translate(0px,0px)";
        app_footer.style.transform = "translate(0px,0px)";


    } else {

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

let i = 0;

rubber.addEventListener("click", function () {

    i = i + 1;
    console.log("click = " + i);
    console.log("index = " + index);

    if (index <= 0) {
    } else {
        context.putImageData(restore_array[index - 1], 0, 0);
        restore_array.pop();
        index--;
    }

});

function closeAll() {

    if (tools.style.transform == "translate(-55px)") {

        tools.style.transform = "translate(0px)";
        toolsbar.style.transform = "translate(0px)";
        header.style.transform = "translate(0px,0px)";
        headerimg.style.transform = "translate(0px,0px)";
        saveCancas.style.transform = "translate(0px,0px)";
        app_footer.style.transform = "translate(0px,0px)";


    } else {

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

sticker1.addEventListener("click", function () {

    const div = document.createElement('div');

    div.className = 'item sticker1';

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
sticker2.addEventListener("click", function () {

    const div = document.createElement('div');

    div.className = 'item sticker2';

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

sticker3.addEventListener("click", function () {

    const div = document.createElement('div');

    div.className = 'item sticker3';

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

sticker4.addEventListener("click", function () {

    const div = document.createElement('div');

    div.className = 'item sticker4';

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

sticker5.addEventListener("click", function () {

    const div = document.createElement('div');

    div.className = 'item sticker5';

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

sticker6.addEventListener("click", function () {

    const div = document.createElement('div');

    div.className = 'item sticker6';

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

sticker7.addEventListener("click", function () {

    const div = document.createElement('div');

    div.className = 'item sticker7';

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

sticker8.addEventListener("click", function () {

    const div = document.createElement('div');

    div.className = 'item sticker8';

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

sticker9.addEventListener("click", function () {

    const div = document.createElement('div');

    div.className = 'item sticker9';

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

sticker10.addEventListener("click", function () {

    const div = document.createElement('div');

    div.className = 'item sticker10';

    div.innerHTML = `
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
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    });

function dragMoveListener(event) {

    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}



interact('.rotation-handle')
    .draggable({
        onstart: function (event) {
            var box = event.target.parentElement;
            var rect = box.getBoundingClientRect();

            // store the center as the element has css `transform-origin: center center`
            box.setAttribute('data-center-x', rect.left + rect.width / 2);
            box.setAttribute('data-center-y', rect.top + rect.height / 2);
            // get the angle of the element when the drag starts
            box.setAttribute('data-angle', getDragAngle(event));
        },
        onmove: function (event) {
            var box = event.target.parentElement;

            var pos = {
                x: parseFloat(box.getAttribute('data-x')) || 0,
                y: parseFloat(box.getAttribute('data-y')) || 0
            };

            var angle = getDragAngle(event);

            // update transform style on dragmove
            box.style.transform = 'translate(' + pos.x + 'px, ' + pos.y + 'px) rotate(' + angle + 'rad' + ')';
        },
        onend: function (event) {
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
    var angle = Math.atan2(center.y - event.clientY,
        center.x - event.clientX);

    return angle - startAngle;
}

function hideresize() {

    let hide1 = document.getElementsByClassName("rotation-handle");
    let hide2 = document.getElementsByClassName("resizer_tl");
    let hide3 = document.getElementsByClassName("resizer_tr");
    let hide4 = document.getElementsByClassName("resizer_bl");
    let hide5 = document.getElementsByClassName("resizer_br");

    if (hide1 != null) {
        for (let i = 0; i < hide1.length; i++) {
            hide1[i].style.display = "none";
        }
    }

    if (hide2 != null) {
        for (let i = 0; i < hide2.length; i++) {
            hide2[i].style.display = "none";
        }
    }

    if (hide3 != null) {
        for (let i = 0; i < hide3.length; i++) {
            hide3[i].style.display = "none";
        }
    }

    if (hide4 != null) {
        for (let i = 0; i < hide4.length; i++) {
            hide4[i].style.display = "none";
        }
    }

    if (hide5 != null) {
        for (let i = 0; i < hide5.length; i++) {
            hide5[i].style.display = "none";
        }
    }

}

function showresize() {

    let hide1 = document.getElementsByClassName("rotation-handle");
    let hide2 = document.getElementsByClassName("resizer_tl");
    let hide3 = document.getElementsByClassName("resizer_tr");
    let hide4 = document.getElementsByClassName("resizer_bl");
    let hide5 = document.getElementsByClassName("resizer_br");

    if (hide1 != null) {
        for (let i = 0; i < hide1.length; i++) {
            hide1[i].style.display = "table";
        }
    }

    if (hide2 != null) {
        for (let i = 0; i < hide2.length; i++) {
            hide2[i].style.display = "block";
        }
    }

    if (hide3 != null) {
        for (let i = 0; i < hide3.length; i++) {
            hide3[i].style.display = "block";
        }
    }

    if (hide4 != null) {
        for (let i = 0; i < hide4.length; i++) {
            hide4[i].style.display = "block";
        }
    }

    if (hide5 != null) {
        for (let i = 0; i < hide5.length; i++) {
            hide5[i].style.display = "block";
        }
    }

}
let justsavedID = null;

function printCriation() {

    if (sticker1shown == true) {

        let sticker1shownn = document.getElementsByClassName("sticker1");
        var viewportOffset = sticker1shownn[0].getBoundingClientRect();
        // these are relative to the viewport, i.e. the window
        var top = viewportOffset.top;
        var left = viewportOffset.left;
        let width = sticker1shownn[0].offsetWidth;
        let height = sticker1shownn[0].clientHeight;
        let posx = left + (0.072 * width);
        let posy = top;
        let imgsticker1 = document.createElement('img');
        imgsticker1.setAttribute("src", "images/sticker1.png");
        imgsticker1.setAttribute("width", ((85 * width) / 100) + "px");
        imgsticker1.setAttribute("height", ((65 * height) / 100) + "px");
        context.drawImage(imgsticker1, posx, posy, ((85 * width) / 100), ((65 * height) / 100));

    }

    if (sticker2shown == true) {

        let sticker2shownn = document.getElementsByClassName("sticker2");
        var viewportOffset = sticker2shownn[0].getBoundingClientRect();
        // these are relative to the viewport, i.e. the window
        var top = viewportOffset.top;
        var left = viewportOffset.left;
        let width = sticker2shownn[0].offsetWidth;
        let height = sticker2shownn[0].clientHeight;
        let posx = left + (0.072 * width);
        let posy = top;
        let imgsticker2 = document.createElement('img');
        imgsticker2.setAttribute("src", "images/sticker2.png");
        imgsticker2.setAttribute("width", ((85 * width) / 100) + "px");
        imgsticker2.setAttribute("height", ((60 * height) / 100) + "px");
        context.drawImage(imgsticker2, posx, posy, ((85 * width) / 100), ((60 * height) / 100));

    }
    if (sticker3shown == true) {

        let sticker3shownn = document.getElementsByClassName("sticker3");
        var viewportOffset = sticker3shownn[0].getBoundingClientRect();
        // these are relative to the viewport, i.e. the window
        var top = viewportOffset.top;
        var left = viewportOffset.left;
        let width = sticker3shownn[0].offsetWidth;
        let height = sticker3shownn[0].clientHeight;
        let posx = left + (0.072 * width);
        let posy = top;
        let imgsticker3 = document.createElement('img');
        imgsticker3.setAttribute("src", "images/sticker3.png");
        imgsticker3.setAttribute("width", ((85 * width) / 100) + "px");
        imgsticker3.setAttribute("height", ((80 * height) / 100) + "px");
        context.drawImage(imgsticker3, posx, posy, ((85 * width) / 100), ((80 * height) / 100));

    }
    if (sticker4shown == true) {

        let sticker4shownn = document.getElementsByClassName("sticker4");
        var viewportOffset = sticker4shownn[0].getBoundingClientRect();
        // these are relative to the viewport, i.e. the window
        var top = viewportOffset.top;
        var left = viewportOffset.left;
        let width = sticker4shownn[0].offsetWidth;
        let height = sticker4shownn[0].clientHeight;
        let posx = left + (0.072 * width);
        let posy = top;
        let imgsticker4 = document.createElement('img');
        imgsticker4.setAttribute("src", "images/sticker4.png");
        imgsticker4.setAttribute("width", ((85 * width) / 100) + "px");
        imgsticker4.setAttribute("height", ((70 * height) / 100) + "px");
        context.drawImage(imgsticker4, posx, posy, ((85 * width) / 100), ((70 * height) / 100));

    }

    if (sticker5shown == true) {

        let sticker5shownn = document.getElementsByClassName("sticker5");
        var viewportOffset = sticker5shownn[0].getBoundingClientRect();
        // these are relative to the viewport, i.e. the window
        var top = viewportOffset.top;
        var left = viewportOffset.left;
        let width = sticker5shownn[0].offsetWidth;
        let height = sticker5shownn[0].clientHeight;
        let posx = left + (0.072 * width);
        let posy = top;
        let imgsticker5 = document.createElement('img');
        imgsticker5.setAttribute("src", "images/sticker5.png");
        imgsticker5.setAttribute("width", ((95 * width) / 100) + "px");
        imgsticker5.setAttribute("height", ((45 * height) / 100) + "px");
        context.drawImage(imgsticker5, posx, posy, ((95 * width) / 100), ((45 * height) / 100));

    }

    if (sticker6shown == true) {

        let sticker6shownn = document.getElementsByClassName("sticker6");
        var viewportOffset = sticker6shownn[0].getBoundingClientRect();
        // these are relative to the viewport, i.e. the window
        var top = viewportOffset.top;
        var left = viewportOffset.left;
        let width = sticker6shownn[0].offsetWidth;
        let height = sticker6shownn[0].clientHeight;
        let posx = left + (0.072 * width);
        let posy = top;
        let imgsticker6 = document.createElement('img');
        imgsticker6.setAttribute("src", "images/sticker6.png");
        imgsticker6.setAttribute("width", ((85 * width) / 100) + "px");
        imgsticker6.setAttribute("height", ((45 * height) / 100) + "px");
        context.drawImage(imgsticker6, posx, posy, ((85 * width) / 100), ((45 * height) / 100));

    }

    if (sticker7shown == true) {

        let sticker7shownn = document.getElementsByClassName("sticker7");
        var viewportOffset = sticker7shownn[0].getBoundingClientRect();
        // these are relative to the viewport, i.e. the window
        var top = viewportOffset.top;
        var left = viewportOffset.left;
        let width = sticker7shownn[0].offsetWidth;
        let height = sticker7shownn[0].clientHeight;
        let posx = left + (0.08 * width);
        let posy = top;
        let imgsticker7 = document.createElement('img');
        imgsticker7.setAttribute("src", "images/sticker7.png");
        imgsticker7.setAttribute("width", ((85 * width) / 100) + "px");
        imgsticker7.setAttribute("height", ((65 * height) / 100) + "px");
        context.drawImage(imgsticker7, posx, posy, ((85 * width) / 100), ((65 * height) / 100));

    }

    if (sticker8shown == true) {

        let sticker8shownn = document.getElementsByClassName("sticker8");
        var viewportOffset = sticker8shownn[0].getBoundingClientRect();
        // these are relative to the viewport, i.e. the window
        var top = viewportOffset.top;
        var left = viewportOffset.left;
        let width = sticker8shownn[0].offsetWidth;
        let height = sticker8shownn[0].clientHeight;
        let posx = left + (0.08 * width);
        let posy = top;
        let imgsticker8 = document.createElement('img');
        imgsticker8.setAttribute("src", "images/sticker8.png");
        imgsticker8.setAttribute("width", ((85 * width) / 100) + "px");
        imgsticker8.setAttribute("height", ((90 * height) / 100) + "px");
        context.drawImage(imgsticker8, posx, posy, ((85 * width) / 100), ((90 * height) / 100));

    }
    if (sticker9shown == true) {

        let sticker9shownn = document.getElementsByClassName("sticker9");
        var viewportOffset = sticker9shownn[0].getBoundingClientRect();
        // these are relative to the viewport, i.e. the window
        var top = viewportOffset.top;
        var left = viewportOffset.left;
        let width = sticker9shownn[0].offsetWidth;
        let height = sticker9shownn[0].clientHeight;
        let posx = left + (0.15 * width);
        let posy = top + (0.15 * height);
        let imgsticker9 = document.createElement('img');
        imgsticker9.setAttribute("src", "images/sticker9.png");
        imgsticker9.setAttribute("width", ((70 * width) / 100) + "px");
        imgsticker9.setAttribute("height", ((70 * height) / 100) + "px");
        context.drawImage(imgsticker9, posx, posy, ((70 * width) / 100), ((70 * height) / 100));

    }
    if (sticker10shown == true) {

        let sticker10shownn = document.getElementsByClassName("sticker10");
        var viewportOffset = sticker10shownn[0].getBoundingClientRect();
        // these are relative to the viewport, i.e. the window
        var top = viewportOffset.top;
        var left = viewportOffset.left;
        let width = sticker10shownn[0].offsetWidth;
        let height = sticker10shownn[0].clientHeight;
        let posx = left + (0.175 * width);
        let posy = top + (0.15 * height);
        let imgsticker10 = document.createElement('img');
        imgsticker10.setAttribute("src", "images/sticker10.png");
        imgsticker10.setAttribute("width", ((65 * width) / 100) + "px");
        imgsticker10.setAttribute("height", ((70 * height) / 100) + "px");

        /*let angle = getRotationAngle(sticker10shownn[0]);

        var TO_RADIANS = Math.PI/180; 
        function drawRotatedImage(image, x, y, angle, width, height) { 
 
            // save the current co-ordinate system 
            // before we screw with it
            context.save(); 
         
            // move to the middle of where we want to draw our image
            context.translate(x, y);
         
            // rotate around that point, converting our 
            // angle from degrees to radians 
            context.rotate(angle * TO_RADIANS);
         
            // draw it up and to the left by half the width
            // and height of the image 
            context.drawImage(image, -((image.width/2)), -(image.height/2), width, height);
         
            // and restore the co-ords to how they were when we began
            context.restore(); 
        }

        drawRotatedImage(imgsticker10, posx, posy, angle, ((65*width)/100), ((70*height)/100)); */



        context.drawImage(imgsticker10, posx, posy, ((65 * width) / 100), ((70 * height) / 100));

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
    }).then(function (inputValue) {
        if (inputValue === false) return false;

        else if (inputValue === "") {

            swal({
                icon: 'images/warning.png',
                text: 'Escreve uma cidade!',
            }).then(function (isConfirm) {
                printCriation();
            });


        } else {

            if (saved == false) {

                fetch("http://localhost:80/api/creations/" + id, {
                    mode: 'cors',
                    method: 'POST',
                    body: image,
                    credentials: 'include'
                }).then(function (response) {
                    console.log(image);
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
                            console.log("see id:");
                            console.log(text);
                            let see = text.split("id:");
                            console.log(see[1]);
                            var regex = /\d+/g;
                            var string = see[1].toString();
                            var matches = string.match(regex);

                            console.log(text);
                            console.log(matches[0]);

                            let idcreation = matches[0];

                            justsavedID = idcreation;

                            let data = {};
                            data.city = inputValue;
                            data.coordinates = null;
                            data.date_published = null;
                            data.published = 0;
                            data.evaluation = 0;


                            fetch('http://localhost:80/api/creations/' + idcreation + "/data", {
                                headers: { 'Content-Type': 'application/json' },
                                method: 'PUT',
                                body: JSON.stringify(data)
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
                                                        if (restore_array.length == 0) {
                                                            clear_canvas();

                                                            var img = new Image;
                                                            img.src = loadedIMGsrc;
                                                            context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.offsetWidth, canvas.clientHeight);
                                                            showresize();
                                                        } else {
                                                            context.putImageData(restore_array[index], 0, 0);
                                                            showresize();
                                                        }
                                                }

                                            });

                                        });

                                    }
                                    else {
                                        swal({
                                            icon: 'images/v237_21.png',
                                            title: 'Erro',
                                            text: 'Erro ao guardar.',
                                            button: 'OK',
                                            className: "swalAlert"

                                        })

                                    }
                                });
                        });
                    }

                }).then(function (result) {
                    console.log(result);
                }).catch(function (err) {
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

            } else {
                console.log(justsavedID);
                //saved == true, logo já foi guardado uma vez e portanto agora aqui é para fazer um PUT
                var dataURI = canvas.toDataURL('image/jpeg');

                var blob = dataURLtoBlob(dataURI);
                image = new FormData();
                image.append("file", blob);

                fetch('http://localhost:80/api/creations/' + justsavedID + "/image", {
                    mode: 'cors',
                    method: 'PUT',
                    body: image,
                    credentials: 'include'
                }).then(function (response) {
                    //console.log(response.headers.get('Set-Cookie'));
                    console.log(response);
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                }).catch(function (err) {
                    console.log(err); // estava alert(err); coloquei console log para não estar sempre a aparecer pop-up ao utilizador
                }).then(async function (result) {
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
                                        context.putImageData(restore_array[index], 0, 0);
                                        showresize();
                                }

                            });

                        });

                    }
                    else {
                        swal({
                            icon: 'images/v237_21.png',
                            title: 'Erro',
                            text: 'Erro ao guardar.',
                            button: 'OK',
                            className: "swalAlert"

                        })

                    }
                });
            }

        }
    });
}

function goBack() {
    window.history.back();
}

initialPage.addEventListener("click", function () {
    if (saved == false) {
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

settings.addEventListener("click", function () {
    if (saved == false) {
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

profile.addEventListener("click", function () {

    if (saved == false) {
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

let logout = document.getElementById("logout");

logout.addEventListener("click", function () {

    swal({
        icon: 'images/v254_5.png',
        title: 'Sucesso',
        text: 'Sessão terminada',
        button: 'OK',
        className: "swalAlert"
    }).then((isConfirm) => {
        storage.clear();
        window.location.replace("login.html");
    });

});

function dataURLtoBlob(dataurl) {

    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
}