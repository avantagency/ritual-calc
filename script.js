function defineImgWidth() {

    if ($(window).width() <= 600) {

        $('.inner-text-content img').each(function () {
            if ($(this).width() > 500) {
                $(this).css({'width': '100%'});

            }
        })

    } else {
        $('.inner-text-content img').css({'width': ''});

    }



}
$(document).ready(function(){


    if ($('.news-title').length) {
        $('.news-title').each(function(){
            var text = $(this).text();
            if (text.length > 100) {
                var newText = $(this).text().slice(0,100);
                $(this).text(newText + '...');
            }
        })
    }





    if ($(window).width() < 600) {
        //$('.funeral-wrap div a').removeClass('fancybox');
        $('.funeral-wrap div a').on('click',  function(){
            return false;
        })
    }


     $('input[name=phone]').mask('+7 (999) 999-9999');

    $('.catted-button').click(function() {
        $(this).parent('.catted-block').find('.catted-content').slideToggle(300);
        if ($(this).text() === 'Скрыть') {
            $(this).text('Раскрыть');
        } else {
            $(this).text('Скрыть');
        }
    })


    $('h1').each(function(){
        if ($(this).text() === 'нижний текст') {
            $(this).hide();
        }
    })


    $('p').each(function(){
        if ($(this).text() === 'Нижний') {
            $(this).hide();
        }
    })



    function defineCloseButton() {
        var closeButton = '<div class="menuCloseButton">Закрыть</div>';
        $('.main-menu_list').prepend(closeButton);
        var footerSwitch = '<div class="footer-title-switch"></div>';
        $('.footer-title').append(footerSwitch);
    }

    function defineCloseButtonVisibility() {
        if ($(window).width() < 1025) {
            $('.menuCloseButton').show();
        } else {
            $('.menuCloseButton').hide();
        }
        $('.menu-menu_link').each(function(){
            var text = $(this).text();
            $(this).html('<span>' + text + '</span>');
        })
    }


    function defineMobilMenuClasses() {

        if ($(window).width() < 1025) {
            $('.main-menu_list_item').each(function(){
                if ($(this).find('.submenu-inner').length) {
                    $(this).addClass('backgrounded');
                }
            })
        } else {
            $('.main-menu_list_item').removeClass("backgrounded");
        }


    }

    defineCloseButton();
    defineCloseButtonVisibility();
    defineMobilMenuClasses();
    defineImgWidth();



    $('.popup').find('h3').each(function(){
        var text = $(this).text();
        console.log(1);
        var newTitle = '<div class="form-title" style="font-size: 24px; color: #000000; font-family: "Arial";">' + text + '</div>';
        $(this).replaceWith(newTitle);

    })


    if ($('.zoom-link').length) {

        if ($(window).width() > 600) {
            $('.zoom-link').fancybox()
            $('.svg-wrap-catalog').on('click',   function(){
                $('.zoom-link').fancybox()
            })
        }  else {

            $('.zoom-link').find('img').appendTo($('.zoom-link').parent());


            $('.zoom-link').click(function(){
                return false;
            })

            $('.zoom-link img').on('click', function(e){
                e.preventDefault();
            })



        }


    }


    $('.main-menu_list_item').on('mouseover', function(){
    });
    //$('a[href="/ritualnie-tovary/"] ul').append("тут пункт меню"); // пункт перейти в каталог для ритуальных товаров


    if ($(this).width() > 1025) {

        $('.main-menu_list_item').hover(function(){
            if ($(this).find('.submenu-inner')) {
                $(this).find('.submenu-inner').stop().slideDown('150');
            }
        }, function(){
            if ($(this).find('.submenu-inner')) {
                $(this).find('.submenu-inner').stop().slideUp('150');
            }
        })
    }



    $('.burger').click(function () {
        $('.burger').toggleClass('open-menu-switch');

        if ($('.main-menu').css('visibility') == 'hidden' &&  $(this).hasClass('open-menu-switch')) {
            $('.main-menu').stop().css({'visibility': 'visible'}).animate({'opacity': '1', 'left': '0'}, 800)
        }
        else if ($('.main-menu').css('visibility') == 'visible' && !($(this).hasClass('open-menu-switch'))) {
            $('.main-menu').stop().animate({'opacity': '0', 'left': '-200px'},800, function () {
                $('.main-menu').css({'visibility': "hidden"})
            });
        }
    });


    $('.question-title').click(function(){
        $(this).next('.question-content').slideToggle(300);
    })

    var htmlWidth = $('html').width();
    $('.main-menu').css({'width':htmlWidth});
    $('.fixed-header').css({'width':htmlWidth});
    $('.header.inner-header').css({'width':htmlWidth});



    $(window).resize(function(){
        var htmlWidth = $('html').width();
        $('.main-menu').css({'width':htmlWidth});
        $('.fixed-header').css({'width':htmlWidth});
        $('.header.inner-header').css({'width':htmlWidth});
        defineCloseButtonVisibility();
        defineMobilMenuClasses();

    })


    var hrefL = location.href;

    if (hrefL.indexOf('prices') > 0 || hrefL.indexOf('catalog') > 0) {
        $('.inner-text-content').addClass('small-padding');
    } else {
        $('.inner-text-content').removeClass('small-padding');
    }


    $('.menu-menu_link').each(function(){
        if ($(this).text() == 'Ритуальные товары') {
            $(this).attr('href', '/catalog/');
            $(this).next().find('.submenu-list').prepend('<li class="submenu-inner_item wide-item"><a class="submenu-inner_link" href="/catalog/"><span>Общий каталог товаров</span></a></li>')
        }
    })


    if ($(window).width() < 1025) {
        $('.main-menu_list_item').click(function(e){

            var target = e.target;

            if (target.tagName !== 'SPAN' && $(this).hasClass('backgrounded')) {
                e.preventDefault();
                if ($(this).hasClass('switched-background')) {
                    $('.submenu-inner').hide();
                    $(this).removeClass('switched-background');
                }  else {
                    $('.submenu-inner').hide();

                    $(this).toggleClass('switched-background');
                    $(this).find('.submenu-inner').slideToggle(300);
                }

            }


        })


        $('.footer-title').click(function(){
            if ($(this).hasClass('switched-title')) {
                $('.footer-col-blocks').hide();
                $(this).removeClass('switched-title');
            }       else {

                $('.footer-col-blocks').hide();
                $('.footer-title').removeClass('switched-title');
                $(this).addClass('switched-title');
                $(this).next().slideToggle(300);
            }
        })


    }







    if ($('.product-slider-wrap').length) {

        $('.product-slider-wrap').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            speed: 500,

            arrows: false,
            responsive: [
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,



                    }
                }
            ]
        });

        $('.arrow-left').click(function () {
            $('.product-slider-wrap').slick('slickPrev');

        })

        $('.arrow-right').click(function () {
            $('.product-slider-wrap').slick('slickNext');
        })
    }





    if ($('.about-company-content.slider-content').length) {
        $('.about-company-content.slider-content').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            speed: 500,

            arrows: false,
            responsive: [
                {
                    breakpoint: 1130,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,



                    }
                }
            ]
        });

        $('.service-arrow-left').click(function () {
            $('.about-company-content.slider-content').slick('slickPrev');
        });


        $('.service-arrow-right').click(function () {
            $('.about-company-content.slider-content').slick('slickNext');
        });

    }


    if ($('.services-cols').length) {

        $('.services-cols').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            speed: 500,

            arrows: false,
            responsive: [
                {
                    breakpoint: 1130,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,



                    }
                }
            ]
        });

        $('.service-arrow-left').click(function () {
            $('.services-cols').slick('slickPrev');
        });


        $('.service-arrow-right').click(function () {
            $('.services-cols').slick('slickNext');
        });
    }



    var width = $(window).width();
    if(width < 810) {
        $('br').each(function(){
            $(this).remove();
        });
        /*var block_9_left = '<div class="left_col">'+$('.section_9 .left_col').html()+"</div>";
         var block_9_ceter = '<div class="center_col">'+$('.section_9 .center_col').html()+"</div>";
         var block_9_right = '<div class="right_col">'+$('.section_9 .right_col').html()+"</div>";
         $('.section_9 .left_col,.section_9 .center_col,.section_9 .right_col').remove();
         $('.section_9 .wrapper').append(block_9_ceter);
         $('.section_9 .wrapper').append(block_9_left);
         $('.section_9 .wrapper').append(block_9_right);*/

    }
    $('.pop').click(function(){
        $('.form-title').text('Заказ консультации')
        var title = $(this).data('title');
        $('html').addClass('fancybox-lock');
        $('html').addClass('fancybox-margin');
        var htmlWidth = $('html').width();
        $('.main-menu').css({'width':htmlWidth});
        $('.fixed-header').css({'width':htmlWidth});
        $('input[name=sub]').val(title);
        $('.overlay,#order').fadeIn(300);
        $('#order h3').text(title);
        $('#order .form-title').text(title);

        // reset form
        $('form').trigger("reset");
    });
    $('.header_left a').click(function(){

        $('html').addClass('fancybox-lock');
        $('html').addClass('fancybox-margin');
        $('.codesc_popup,.overlay').fadeIn(300);
        return false;
    });
    $('.fancybox').fancybox();
    $('.popup_form form').submit(function(e) {
        e.preventDefault();
        var yacity = $('#f-city').val();
        var f = $(this);
        $('input[type=text]', f).removeClass('ierror');

        var name = $('.popup_form input[name=name]').val();
        var phone = $('.popup_form input[name=phone]').val();
        var recaptcha = $('textarea[name=g-recaptcha-response]').val();
        var error = false;

        if(error) {

        }
        else {
            var query = 'act=sender';
            query += '&name=' + name;
            query += '&phone=' + phone;
            query += '&g-recaptcha-response=' + recaptcha;
            query += '&sub=' + $('#order .form-title').text();


            $.ajax({
                type: "POST",
                data: query,
                url: "/local/functions/sender.php",
                dataType: "json",
                success: function(data) {
                    if(data.result == 'ok') {
                        $('#order').fadeOut();
                        $('#thanks').fadeIn(300);


                    } else {
                        $('.error').text(data.text);
                    }
                }
            });
        }
        //$(this).trigger("reset");
        grecaptcha.reset();
        return false;
    });
    $('.overlay,.closed').click(function(){

        $('.overlay,.popup_form').fadeOut(300);
        setTimeout(function(){
            $('html').removeClass('fancybox-lock');
            $('html').removeClass('fancybox-margin');
        },300);

    });
    $('.fancybox2').click(function(){
        var top = $(this).offset().top;

        $('.popup_text').css('top',top+'px');
        $('html,body').animate({scrollTop:top-60+'px'},300);
        $('.overlay,.popup_text').fadeIn(300);
    });


    $('.buttons button').click(function(){
        var tab = $(this).attr('data-tab');
        $('.tab_content').hide();
        $(tab).fadeIn(300);
        if(tab == '#tab1') {
            $('.tab1').show();
        }
        else {
            $('.tab1').hide();
        }
        $('.buttons button').removeClass('active');
        $(this).addClass('active');
    });

    var owl = $("#spisok")
    owl.owlCarousel({
        loop:true,
        nav:true,
        dots:false,
        responsive : {
            // breakpoint from 0 up
            0 : {
                items:1
            },
            800 : {
                items:1
            },
            1260 : {
                items:3
            }
        }
    });
    $('.ras').owlCarousel({
        loop:true,
        nav:true,
        dots:false,
        items:1
    });

    owl.on('changed.owl.carousel', function(event) {
        $("#spisok .item").css('opacity','1');
        var item      = event.item.index;
        $("#spisok .item").eq(item).css('opacity','0.4');
        $("#spisok .item").eq(item+2).css('opacity','0.4');
    });
    $('.tab_content .items .item label').click(function(){

        if($(this).attr('data-img')) {
            $('html').addClass('fancybox-lock');
            $('html').addClass('fancybox-margin');
            var img = $(this).attr('data-img');
            $(this).find('input').attr('checked','checked');
            $('.popup img').attr('src','');
            $('.popup img').attr('src',img);
            $('.popup').fadeIn(300);
        }
        else {


        }
        return false;
    });
    $('.popup span,.popup').click(function(){
        $('.popup').fadeOut(300);
        setTimeout(function(){
            $('html').removeClass('fancybox-lock');
            $('html').removeClass('fancybox-margin');
        },300);
    });

    new WOW().init();

});


$(document).ready(function(){

    $('.follow-link.pop').click(function(){
        $('.form-title').text('Вызвать ритуального агента')
    })


    $('.img-thumbnail').click(function(){
        $('.img-thumbnail').removeClass('active-thumb');
        $(this).addClass('active-thumb');
        var imgBigSrc = $(this).attr('data-src');
        $('.img-big').attr('src', imgBigSrc);
    });


    function slide(dir) {
        var current;
        var imgBigSrc;
        $('.img-thumbnail').each(function(){
            if ($(this).hasClass('active-thumb')) {
                current = $(this).index();
            }
        })





        if (dir === 'left') {

            if (current == 0) {
                return;
            }
            $('.img-thumbnail').removeClass('active-thumb');
            $('.img-thumbnail').eq(current).prev().addClass('active-thumb');
            imgBigSrc = $('.img-thumbnail').eq(current).prev().attr('data-src');


        }  else {

            if (current == $('.img-thumbnail').last().index()) {
                return;
            }
            $('.img-thumbnail').removeClass('active-thumb');
            $('.img-thumbnail').eq(current).next().addClass('active-thumb');
            imgBigSrc = $('.img-thumbnail').eq(current).prev().attr('data-src');

        }


        $('.img-big').attr('src', imgBigSrc);
    }


    $('.arrow-left').click(function(){
        slide('left');

    })


    $('.arrow-right').click(function(){
        slide('right');
    })
})



function defimeMenuWidth() {
    var width = $('.inner-text-content').outerWidth();
    var left = $('.inner-text-content').offset().left;
    $('.addition-menu').css({'width':width, 'left':left});
}

$(document).ready(function() {
//cлайдер
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        margin: 10,
        nav: true,
        loop: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    });
    $('.owl-prev, .owl-next').text('');





    if($(window).width()  < 600){


        $("a.gallery").click(function(e){
            e.preventDefault();
            $("a.gallery").attr('href', '#');
            return false
        })


    }
    else {
        $("a.gallery").fancybox();
    }

//конец слайдера
    if ($('.inner-text-content').length) {
        defimeMenuWidth();
        $(window).resize(function(){
            defimeMenuWidth();
            defineImgWidth();
            defineImgBorders();
        });
    }

    $('.service-tab').click(function(){
        $('.service-tab').removeClass('active-tab');
        $(this).addClass('active-tab');
        $('.services-content').removeClass('active-content');
        $('.services-content').eq($(this).index()).addClass('active-content');
    })


    $('.catalog-filter .catalog-title').click(function (e) {

        var target = e.target;
        if (!$(target).hasClass('catalog-title-link-follow')) {


            $(this).toggleClass('active');
            $(this).next().slideToggle(300);
        }

    });


    $('body').on('click', '.catalog-good', function(){
        var href = $(this).find('a').attr('href');
        location.href = href;
    })



    if ($(window).width() < 600) {
        $('.catalog-title').removeClass('active');
    }



    if ($('.filter-sel-title').length) {





        $('.filter-sel-title').sun({
            wrapperClass: 'reason-select',
            selClass: 'sel',
            optClass: 'option',
            arrowClass: 'arrow',
            maxListHeight: 200
        });


        $('.catalog-title-link').click(function () {
            return false;
        })
    }


    $('.burder').click(function(){
        $(this).toggleClass('switched-burder');
        $('.main-menu_test').toggleClass('switched-menu');
    })


    $('.menuCloseButton').click(function(){
        $('.burder').toggleClass('switched-burder');
        $('.main-menu_test').toggleClass('switched-menu');

    })








    $('.service-item').click(function(){
        var href = $(this).find('a').attr('href');
        location.href = href;
    })



    function defineImgBorders() {
        var $filtered;

        if ($(window).width() > 1330) {


            $filtered = $('.catalog-good').filter(function(index){
                return index > $('.catalog-good').length - 4
            });


        }


        if ($(window).width() < 1330 && $(window).width() > 930) {


            var $filtered = $('.catalog-good').filter(function(index){
                return index > $('.catalog-good').length - 3
            });


        }


        if ($(window).width() < 930) {


            var $filtered = $('.catalog-good').filter(function(index){
                return index > $('.catalog-good').length - 2
            });

        }


        if ($filtered !== undefined) {
            $filtered.css({'border-bottom':'none'});
        }



    }


    defineImgBorders();






    $('.product-slider-item').click(function(){
        var href = $(this).find('a').attr('href');
        location.href = href;
    })



    if ($(window).width() > 1025) {
        for (var i = 1; i < $('.product-slider-item').length; i += 3) {
            $('.product-slider-item').eq(i).addClass('centered-item');
        }

        if ($('.product-slider-item').length % 3 == 1) {
            $('.product-slider-item').eq($('.product-slider-item').length - 4).addClass('centered-item');
        }
    }



    $('.submenu-inner .submenu-list').each(function(){
        if ($(this).children().length > 6) {
            $(this).parent().addClass('submenu-inner_large');
        }
    })


})






$(function () {
    $('.coffin-input').click(function () {
		$(this).removeClass('error-input');
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
        if(elem.hasClass('coffin-grob') && lenght ===  3){

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

var error;

    $('.issue').on('click touchstart', function(){



		$('.required-coffin').each(function(){
			if(!$(this).hasClass('active')){
error = true;
$(this).addClass('error-input');



}
			else{
error = false;
}


})
			if(!error){
   $('.form-vac').fadeIn(300).toggleClass('active');
}

    })

console.log(error)

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