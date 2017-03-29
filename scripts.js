function Slider(options) {
    this.elem = options.elem;
    this.step = options.step;
    this.max = options.max;
    this.min = options.min;
    this.step = options.step;
    this.default = options.default;
    var self = this;
    var thumbElem = this.elem.querySelector('.thumb');


    var max = options.max;
    var sliderCoords, thumbCoords, shiftX;

    var pixelsPerValue = (this.elem.clientWidth - thumbElem.clientWidth) / max;

    this.elem.ondragstart = function() {
        return false;
    };


    this.elem.onmousedown = function(event) {
        if (event.target.closest('.thumb')) {
            startDrag(event.clientX, event.clientY);
            return false;
        }
    }


    function startDrag(startClientX, startClientY) {
        thumbCoords = thumbElem.getBoundingClientRect();
        shiftX = startClientX - thumbCoords.left;

        sliderCoords = self.elem.getBoundingClientRect();

        document.addEventListener('mousemove', onDocumentMouseMove);
        document.addEventListener('mouseup', onDocumentMouseUp);
    }


    function moveTo(clientX) {

        var newLeft = clientX - shiftX - sliderCoords.left;


        if (newLeft < 0) {
            newLeft = 0;
        }
        var rightEdge = self.elem.offsetWidth - thumbElem.offsetWidth;
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }

        thumbElem.style.left = newLeft + 'px';

        self.elem.dispatchEvent(new CustomEvent('slide', {
            bubbles: true,
            detail: positionToValue(newLeft)
        }));
    }


    function valueToPosition(value) {
        var newValue = pixelsPerValue * value;
        return newValue;
    }

    function positionToValue(left) {
        var newValue = Math.round(left / pixelsPerValue) + self.min;
        if (newValue > max *0.5) {
            newValue = Math.round(left / pixelsPerValue);
        }

        return newValue;
    }

    function onDocumentMouseMove(e) {
        moveTo(e.clientX);
    }

    function onDocumentMouseUp() {
        endDrag();
    }


    this.elem.onclick = function(e) {
        if (!event.target.classList.contains('.thumb')) {
            self.elem.querySelector('.thumb').style.left = e.clientX - self.elem.getBoundingClientRect().left + 'px';

            if (parseInt(self.elem.querySelector('.thumb').style.left) > self.elem.clientWidth - self.elem.querySelector('.thumb').clientWidth) {

                self.elem.querySelector('.thumb').style.left = self.elem.clientWidth - self.elem.querySelector('.thumb').clientWidth + 'px';
            }

            this.dispatchEvent(new CustomEvent('change', {
                bubles: true,
                detail: positionToValue(parseFloat(self.elem.querySelector('.thumb').style.left))
            }));



        }
    };


    var interval;
    this.elem.parentNode.querySelector('.minus').onmousedown = function(e) {
        var computedStyle = getComputedStyle(self.elem.querySelector('.thumb'));
        if (parseInt(self.elem.querySelector('.thumb').style.left) <= 0 || parseInt(computedStyle.left) <= 0 ) {
            self.elem.querySelector('.thumb').style.left = '0' + 'px';
        } else {
            interval = setInterval(function () {
                self.elem.querySelector('.thumb').style.left = parseFloat(self.elem.querySelector('.thumb').style.left) - (self.step * pixelsPerValue) + 'px';
                if (parseFloat(self.elem.querySelector('.thumb').style.left) < 0) {
                    self.elem.querySelector('.thumb').style.left = 0 + 'px';
                }
                self.elem.parentNode.parentNode.nextElementSibling.value = positionToValue(parseFloat(self.elem.querySelector('.thumb').style.left)) + self.min;
                digits(self.elem.parentNode.parentNode.nextElementSibling);
            }, 40)
        }
    };


    this.elem.parentNode.querySelector('.minus').onmouseup = function() {
        clearInterval(interval)
    };


    var interval2;
    this.elem.parentNode.querySelector('.plus').onmousedown = function() {
        if (parseInt(self.elem.querySelector('.thumb').style.left) >= self.elem.clientWidth - self.elem.querySelector('.thumb').clientWidth ) {
            self.elem.querySelector('.thumb').style.left = self.elem.clientWidth - self.elem.querySelector('.thumb') + 'px';
        }

        interval2 = setInterval(function(){
            self.elem.querySelector('.thumb').style.left = parseFloat(self.elem.querySelector('.thumb').style.left) +(self.step * pixelsPerValue) + 'px';
            if (parseInt(self.elem.querySelector('.thumb').style.left) >= self.elem.clientWidth - self.elem.querySelector('.thumb').clientWidth) {
                self.elem.querySelector('.thumb').style.left = self.elem.clientWidth - self.elem.querySelector('.thumb').clientWidth + 'px';
            }
            self.elem.parentNode.parentNode.nextElementSibling.value = positionToValue(parseFloat(self.elem.querySelector('.thumb').style.left));
            digits(self.elem.parentNode.parentNode.nextElementSibling)
        },40)
    };

    this.elem.parentNode.querySelector('.plus').onmouseup = function() {
        clearInterval(interval2)
    }


    self.elem.parentNode.parentNode.nextElementSibling.oninput = function() {


            var max = self.max;

            var val = this.value.split(' ').join('');
            if (val > max) val = max;
            if (val < max) {
                digits(this)
            } else {
                this.value = max;
                digits(this)
            }
            setValue(val);


    }





    function endDrag() {
        document.removeEventListener('mousemove', onDocumentMouseMove);
        document.removeEventListener('mouseup', onDocumentMouseUp);

        self.elem.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            detail: positionToValue(parseInt(thumbElem.style.left))
        }));
    }


    function setValue(value) {
        thumbElem.style.left = valueToPosition(value) + 'px';
    }

    setValue(self.default)


}





String.prototype.addSpace = function() {
    return this.replace(/(.)(?=(.{3})+$)/g,"$1 ");
};
function digits(elem)  {

    elem.value = elem.value.replace(/(,| )/g,'').addSpace();
};


function getChar(event) {
    if (event.which == null) {
        if (event.keyCode < 32) return null;
        return String.fromCharCode(event.keyCode) // IE
    }

    if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32) return null;
        return String.fromCharCode(event.which) // остальные
    }

    return null; // специальная клавиша
}









$(document).ready(function(){
    $('.currency-item').click(function(){
        $('.currency-item').removeClass('active');
        $(this).addClass('active');
        $('.calculator-items-wrap .calculator-item').removeClass('active');
        $('.calculator-items-wrap .calculator-item').eq($(this).index()).addClass('active');
    })



    document.querySelector('.sum').oninput = function() {
        var val = this.value;
        digits(this);
    };


    document.querySelector('.sum').onkeypress = function(e) {
        e = e || event;
        var chr = getChar(e);

        if (e.ctrlKey || e.altKey || chr == null) return; // специальная клавиша
        if (chr < '0' || chr > '9') return false;
    }



    document.querySelector('.days-input').onkeypress = function(e) {
        e = e || event;
        var chr = getChar(e);

        if (e.ctrlKey || e.altKey || chr == null) return; // специальная клавиша
        if (chr < '0' || chr > '9') return false;
    }




    var vkladSlider = new Slider({elem: document.querySelector('.vklad'), step: 30000, max: 50000000, min: 500000, default: 1000000});


    document.querySelector('.vklad').addEventListener('slide', function(event) {
        document.querySelector('.sum').value = parseInt(Math.round(event.detail / 500) * 500);
        digits( document.querySelector('.sum'))

    });


    document.querySelector('.vklad').addEventListener('change', function(event) {
        document.querySelector('.sum').value = parseInt(Math.round(event.detail / 500) * 500);
        digits( document.querySelector('.sum'))

    });


    var daysSlider = new Slider({elem: document.querySelector('.days'), step: 1, max: 1090, min: 91, default:367});

    document.querySelector('.days').addEventListener('slide', function(event) {
        document.querySelector('.days-input').value = parseInt(Math.round(event.detail));
        digits( document.querySelector('.days-input'));


    });


    document.querySelector('.days').addEventListener('change', function(event) {
        document.querySelector('.days-input').value = parseInt(Math.round(event.detail));
        digits( document.querySelector('.days-input'));


    });



    var vkladEuroSlider = new Slider({elem: document.querySelector('.vklad-euro'), step: 3000, max: 500000, min: 7000, default: 100000});


    document.querySelector('.vklad-euro').addEventListener('slide', function(event) {
        document.querySelector('.euro-sum').value = parseInt(Math.round(event.detail / 500) * 500);
        digits( document.querySelector('.euro-sum'))

    });


    document.querySelector('.vklad-euro').addEventListener('change', function(event) {
        document.querySelector('.euro-sum').value = parseInt(Math.round(event.detail / 500) * 500);
        digits( document.querySelector('.euro-sum'))

    });



    var vkladDollarSlider = new Slider({elem: document.querySelector('.vklad-dollar'), step: 3000, max: 500000, min: 5000, default: 100000});


    document.querySelector('.vklad-dollar').addEventListener('slide', function(event) {
        document.querySelector('.dollar-sum').value = parseInt(Math.round(event.detail / 500) * 500);
        digits( document.querySelector('.dollar-sum'))

    });


    document.querySelector('.vklad-dollar').addEventListener('change', function(event) {
        document.querySelector('.dollar-sum').value = parseInt(Math.round(event.detail / 500) * 500);
        digits( document.querySelector('.dollar-sum'))

    });


    if ($('.sel-hidden').length) {
        $('.sel-hidden').sun({
            wrapperClass: 'select',
            selClass: 'sel',
            optClass: 'option',
            arrowClass: 'arrow',
            maxListHeight: 200
        })
    }




})