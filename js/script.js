$(function () {
    $('.coffin-input').click(function () {
        $('.coffin-input-block').not($(this).parent()).find('.coffin-list').hide();
        $(this).parent().find('.coffin-list').slideToggle(300);
        $(this).toggleClass('deployed');
    });

    function addSpace(elem) {
        return elem.replace(/(.)(?=(.{3})+$)/g, "$1 ");
    }

    function digits(elem) {
        elem.textContent = addSpace(elem.textContent) + ' ' + 'руб.'
    }
    $('body').click(function (e) {
        if(!$(e.target).hasClass('coffin-input')){
            $('.coffin-list').hide();
            $('.coffin-input').removeClass('deployed');
        }

    });


    function showButton(elem, direction) {

        var inputGroups = elem.children();
        var lenght = inputGroups.length;
        inputGroups.find('.button-calc').css({visibility: 'visible'});
        inputGroups.find('.plus, .minus').css({visibility: 'visible'});

        if (lenght < 1) {
            return
        }
        else if (lenght == 1) {
            inputGroups.first().children().eq(3).css({visibility: 'visible'})
            // inputGroups.first().find('.button-calc').css({visibility: 'visible'});
            inputGroups.find('.plus').css({visibility: 'visible'});
            inputGroups.find('.minus').css({visibility: 'hidden'});
        }
        else if (lenght == 2) {
            inputGroups.first().find('.buttons-calc').css({visibility: 'hidden'});
            inputGroups.eq(1)
                .find('.plus').css({visibility: 'visible'}).end()
                .find('minus').css({visibility: 'visible'});

        }
        else if (lenght > 2) {
            inputGroups.find('.button-calc').css({visibility: 'visible'});
            inputGroups.find('.plus, .minus').css({visibility: 'visible'});
            inputGroups.first().find('.buttons-calc').css({visibility: 'hidden'});
            inputGroups.each(function (i) {
                if (i > 0 && i < lenght - 1) {

                    $(this).find('.plus').css({visibility: 'hidden'});
                    $(this).find('.minus').css({visibility: 'visible'})
                }
            });
            inputGroups.last()
                .find('.plus, .minus').css({visibility: 'visible'})

        }


    }
    function showButton(elem, direction) {

        var inputGroups = elem.children();
        var lenght = inputGroups.length;
        inputGroups.find('.button-calc').show();
        inputGroups.find('.plus, .minus').show();



        if (lenght < 1) {
            return
        }
        else if (lenght == 1) {
            inputGroups.first().children().eq(3).show()
            // inputGroups.first().find('.button-calc').show();
            inputGroups.find('.plus').show();
            inputGroups.find('.minus').hide();
        }
        else if (lenght == 2) {
            inputGroups.first().find('.buttons-calc').hide();
            inputGroups.eq(1)
                .find('.plus').show().end()
                .find('minus').show();

        }
        else if (lenght > 2) {
            inputGroups.find('.button-calc').show();
            inputGroups.find('.plus, .minus').show();
            inputGroups.first().find('.buttons-calc').hide();
            inputGroups.each(function (i) {
                if (i > 0 && i < lenght - 1) {

                    $(this).find('.plus').hide();
                    $(this).find('.minus').show()
                }
            });
            inputGroups.last()
                .find('.plus, .minus').show()

        }
        if(elem.hasClass('coffin-grob') && lenght ==  2){
            console.log(1);
            inputGroups.eq(1).children().eq(3).show()
            // inputGroups.first().find('.button-calc').show();
            inputGroups.find('.plus').show();
            inputGroups.find('.minus').hide();
        }


    }

    rubles = 0;

    $('body').on('click', '.coffin-list-item', function () {
        rubles = 0;
        $('.coffin-input').removeClass('deployed');
        $(this).parent().parent().find('.coffin-price').text('');
        $(this).parent().slideUp(300);
        $(this).parent().parent().find('.coffin-price').attr('data-price', $(this).attr('data-price'));
        $(this).parent().parent().find('.coffin-price').text($(this).attr('data-price'));
        digits(this.parentNode.parentNode.querySelector('.coffin-price'));
        $(this).parent().parent().find('.coffin-input').text($(this).text());
        $(this).parent().parent().find('.coffin-input').addClass('active');
        $(this).parent().parent().find('.coffin-input-title').addClass('active');
        calculateSumm();
        $('.hidden-form').html('');
        createForm();
    });
    $('body').on('click', '.plus', function () {
        $('.coffin-input').removeClass('deployed');
        $('.coffin-list').hide();
        var clone = $(this).parent().parent().clone(true);
        clone.find('.coffin-price').text('0 руб.').attr('data-price', 0).hide();
        clone.find('.coffin-input-title').hide();
        clone.find('.coffin-input').removeClass('active').text('Не выбран');

        $(this).parent().parent().parent().append(clone);
        $('.hidden-form').html('');

        createForm();
        showButton($(this).parent().parent().parent())
    });
    $('body').on('click', '.minus', function () {
        $('.coffin-input').removeClass('deployed');
        $('.coffin-list').hide();
        var father = $(this).parent().parent();
        var grandFather = father.parent();
        var prev = father.prev();
        $(this).parent().parent().remove();
        showButton(grandFather, 'bottom');
        rubles = 0;
        calculateSumm();
        $('.hidden-form').html('');
        createForm();


    });
    var rubles = 0;

    function calculateSumm() {

        $('.coffin-price').each(function () {
            if ($(this).attr('data-price')) {
                rubles += parseInt($(this).attr('data-price'));

                $('.allSumm').text(rubles);
                digits(document.querySelector('.allSumm'))

            }


        });

        $('.calc-clone').each(function (i) {
            var allSumm = 0;
            $(this).find('.coffin-price').each(function (i, item) {
                var price = parseInt($(this).attr('data-price'));
                allSumm += price;


            })

            $(this).find('.coffin-price').eq(0).text(allSumm);
            digits(this.querySelector('.coffin-price'))

        })

    }


    calculateSumm();

    function createForm() {
        $('.coffin-input-title').each(function () {
            var fieldset = document.createElement('fieldset');
            fieldset.className = 'hiddenFieldset';
            var wordInput = document.createElement('input');
            wordInput.setAttribute('name', $(this).attr('data-name'));
            wordInput.value = $(this).find('span').first().text();
            var priceInput = document.createElement('input');
            priceInput.setAttribute('name', $(this).attr('data-name') + '_price');
            priceInput.value = $(this).find('.coffin-price').text();
            var valueInput = document.createElement('input');
            valueInput.setAttribute('name', $(this).attr('data-name') + '_price');
            valueInput.value = $(this).next().text();
            fieldset.appendChild(wordInput);
            fieldset.appendChild(priceInput);
            fieldset.appendChild(valueInput);
            document.querySelector('.hidden-form').appendChild(fieldset)
        })

    }

    createForm();


});



$(function () {
    $('.catted-buttonAll').click(function () {
        $(this).parent('.catted-blockAll').find('.catted-contentAll').slideToggle(300);
        if ($(this).text() === 'Скрыть') {
            $(this).text('Раскрыть');
        } else {
            $(this).text('Скрыть');
        }
    });

    $('.form-vacOverlay, .close-vac').click(function (e) {
        if(!$(e.target).hasClass('form-vacInner')){
            $('.form-vac').fadeOut(300);
            $('html').removeClass('ovHid');
            $('html').removeClass('fancybox-lock');
            $('html').removeClass('fancybox-margin');
            $('.catted-contentAll').slideUp(300);
            if($('.catted-buttonAll').text() === 'Раскрыть') {
                $('.catted-buttonAll').text('Скрыть');
            }
            else{
                $('.catted-buttonAll').text('Раскрыть');
            }

        }
    });
    $('.responseBtn').click(function () {
        $('.form-vac').fadeIn(300);
        $('html').addClass('ovHid');
        $('html').addClass('fancybox-lock');
        $('html').addClass('fancybox-margin');

        var title = '"'+ $(this).parent().parent().find('.catted-titleAll').text() + '"';
        $('.form-vacInner-name').text(title)
    });


    var wrapper = $( ".file_upload" ),
        inp = wrapper.find( "input" ),
        btn = wrapper.find( ".button" ),
        lbl = wrapper.find( "mark" );

    inp.focus(function(){
        wrapper.addClass( "focus" );
    }).blur(function(){
        wrapper.removeClass( "focus" );
    });

    var file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;

    inp.change(function(){
        var file_name;
        if( file_api && inp[ 0 ].files[ 0 ] )
            file_name = inp[ 0 ].files[ 0 ].name;
        else
            file_name = inp.val().replace( "C:\\fakepath\\", '' );

        if( ! file_name.length )
            return;

        if( lbl.is( ":visible" ) ){
            lbl.text( file_name );
            btn.text( "Выбрать" );
        }else
            btn.text( file_name );
    }).change();

    $('input').mousedown(function(){
        $(this).show();
    })


    $('label').on('click mousedown', function(e){
        $(this).children().show();
        $(this).children().css({
            visibility: 'visible',
            opacity: 1
        })
        $(this).show();
        $(this).css({
            visibility: 'visible',
            opacity: 1
        })
    })


    $('.issue').on('click touchstart', function(){
        $('.form-vac').fadeIn(300).toggleClass('active');

    })

});

//Форма


$(function () {
    $('.catted-buttonAll').click(function () {
        $(this).parent('.catted-blockAll').find('.catted-contentAll').slideToggle(300);
        if ($(this).text() === 'Скрыть') {
            $(this).text('Раскрыть');
        } else {
            $(this).text('Скрыть');
        }
    });

    $('.form-vacOverlay, .close-vac').click(function (e) {
        if(!$(e.target).hasClass('form-vacInner')){
            $('.form-vac').removeClass('active');
            $('html').removeClass('ovHid');
            $('.catted-contentAll').slideUp(300);
            if($('.catted-buttonAll').text() === 'Раскрыть') {
                $('.catted-buttonAll').text('Скрыть');
            }
            else{
                $('.catted-buttonAll').text('Раскрыть');
            }

        }
    });
    $('.responseBtn').click(function () {
        $('.form-vac').addClass('active');
        $('html').addClass('ovHid');
        var title = '"'+ $(this).parent().parent().find('.catted-titleAll').text() + '"';
        $('.form-vacInner-name').text(title)
    });


    var wrapper = $( ".file_upload" ),
        inp = wrapper.find( "input" ),
        btn = wrapper.find( ".button" ),
        lbl = wrapper.find( "mark" );
    
    inp.focus(function(){
        wrapper.addClass( "focus" );
    }).blur(function(){
        wrapper.removeClass( "focus" );
    });

    var file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;

    inp.change(function(){
        var file_name;
        if( file_api && inp[ 0 ].files[ 0 ] )
            file_name = inp[ 0 ].files[ 0 ].name;
        else
            file_name = inp.val().replace( "C:\\fakepath\\", '' );

        if( ! file_name.length )
            return;

        if( lbl.is( ":visible" ) ){
            lbl.text( file_name );
            btn.text( "Выбрать" );
        }else
            btn.text( file_name );
    }).change();

});