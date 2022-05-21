$(function () {
    const memoryBoard = $('#memory-game');

    let cardArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
    let comparisonArray = [];

    let attempts = 0;
    let stars = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>'; //stores the stars to display
    let clickCount = 0; 
    let pairs = 0; 
    let cardID = ''; 


    let seconds = 00;
    let tens = 00;
    let minutes = 00;
    let appendSeconds = $("#seconds");
    let appendMinutes = $("#minutes");
    let showSeconds = "00";
    let showMinutes = "00";
    let Interval;

    createBoard();

    $(document).on('click', '.fa-undo', function () {
        location.reload();
    });


    $('.card').click(function (event) {

    
        if (attempts === 0) {
            startWatch();
        };



        if ($(this).hasClass("flipped") || $(this).hasClass("solved") || comparisonArray.length >= 2) {

            return;

        } else {

            flipCard($(event.target).parent());
        };


        comparisonArray.push($(this).data("card-type"));


        if (clickCount === 0) {

            clickCount++;
            recordAttempts();

        } else {

      
            if (comparisonArray[0] === comparisonArray[1]) {


                $("[data-card-type=" + comparisonArray[0] + "]").removeClass('flipped').addClass('solved');

                $("[data-card-type=" + comparisonArray[0] + "]").parent().addClass('animated pulse');

                pairs++;

                if (pairs === 8) {
                    gameOver();
                }
            };

    
            setTimeout(function () {
                flipCard($('.flipped'));
                comparisonArray = [];

            }, 1000);


            clickCount = 0;

        }

    });


    function flipCard(element) {
        $(element).toggleClass('flipped');

    }

    function recordAttempts() {
        attempts++;
        $('#attempts').html(attempts);

        if (attempts > 16 && attempts < 24) {
            stars = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>';
            $('#stars').html(stars);
        } else if (attempts >= 24 && attempts < 32) {
            stars = '<i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
            $('#stars').html(stars);
        } else if (attempts >= 32) {
            stars = '<i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
            $('#stars').html(stars);
        } else {
            return;
        };

    }

    function createBoard() {

        cardArray = shuffle(cardArray);

        for (i = 1; i <= cardArray.length; i++) {
            memoryBoard.append($(`<div class='container'><div class='card' data-card-type='${cardArray[i-1]}'><figure class='front'></figure><figure class='back'></figure></div></div>'`));
        }
    };


    function gameOver() {
        stopWatch();

        $('.container').addClass('animated infinite rotateIn');

        messageWinning();
    }

    function messageWinning() {

        $(`<section class="game-over"><div class="message-box"><h2>Yay! You have found all pairs!</h2><p>Number of attempts: ${attempts}</p><p>Time required: ${showMinutes}:${showSeconds} </p><p>Level: ${stars} </p><p><i class="fas fa-undo"></i></p></div></section>`).insertAfter($('.game'));

        $('.message-box').fadeIn(1000);

    }

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }


    function stopWatch() {
        clearInterval(Interval);
    }

    function startWatch() {

        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);

        function startTimer() {
            tens++;

            if (tens > 99) {
                seconds++;
                showSeconds = "0" + seconds;
                appendSeconds.html(showSeconds);
                tens = 0;
            }

            if (seconds > 9) {
                showSeconds = seconds;
                appendSeconds.html(showSeconds);
            }

            if (seconds > 59) {
                minutes++;
                showMinutes = "0" + minutes;
                appendMinutes.html(showMinutes);
                seconds = 0;
                showSeconds = "0" + 0;
                appendSeconds.html(showSeconds);
            }

            if (minutes > 9) {
                showMinutes = minutes;
                appendMinutes.html(showMinutes);
            }

        }


    }


});
