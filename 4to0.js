$.ajaxSetup({ async: false });
const url_endpoint = 'https://nyc.cs.berkeley.edu/classic/service/gamesman/puzzles/4to0/'
const start = `${url_endpoint}/getStart`;
var value = 11;
var response1 = 0;
var response2 = 0;
var pMoves = [];
var winlose = ["win", "lose"];

function reset() {
    $.getJSON(start, function(result) {
        value = result['response'];
        $('#board').replaceWith(`<h1 id="board">${value}</h1>`);
    });
    var url = `${url_endpoint}getMoveValue?board=${value}`
    $.getJSON(url, function(result) {
        $('#value').replaceWith(`<h2 id="value">${result['response']['value']}</h2>`);
    });
    var next = `${url_endpoint}getNextMoveValues?board=${value}`;
    $.getJSON(next, function(result) {
        response1 = result['response'][0];
        response2 = result['response'][1];
        $('.btn1').css("background-color", "black");
        $('.btn2').css("background-color", "black");
        if (response1["value"] == "win") {
            $('.btn1').css("background-color", "red");
        }
        else if (response1["value"] == "lose") {
            $('.btn1').css("background-color", "green");
        }
        if (response2["value"] == "win") {
            $('.btn2').css("background-color", "red");
        }
        else if (response2["value"] == "lose") {
            $('.btn2').css("background-color", "green");
        }
        pMoves = [];
        drawMVH(pMoves);
        // $('.btn1').html(response1['board']);
        // $('.btn2').html(response2['board']);
    });
}

$(document).ready(function() {
    $.getJSON(start, function(result) {
        value = result['response'];
        $('#board').replaceWith(`<h1 id="board">${value}</h1>`);
    });
    var url = `${url_endpoint}getMoveValue?board=${value}`
    $.getJSON(url, function(result) {
        $('#value').replaceWith(`<h2 id="value">${result['response']['value']}</h2>`);
        pMoves.push({ remoteness: result["board"], value: result["value"] })
        drawMVH(pMoves);
    });
    var next = `${url_endpoint}getNextMoveValues?board=${value}`;
    $.getJSON(next, function(result) {
        response1 = result['response'][0];
        response2 = result['response'][1];
        drawMVH(pMoves);
        $('.btn1').css("background-color", "black");
        $('.btn2').css("background-color", "black");
        if (response1["value"] == "win") {
            $('.btn1').css("background-color", "red");
        }
        else if (response1["value"] == "lose") {
            $('.btn1').css("background-color", "green");
        }
        if (response2["value"] == "win") {
            $('.btn2').css("background-color", "red");
        }
        else if (response2["value"] == "lose") {
            $('.btn2').css("background-color", "green");
        }

        // $('.btn1').html(response1['board']);
        // $('.btn2').html(response2['board']);
    });
    reset();
});

$('.btn1').click(function() {
    console.log('yeet');
    $('#board').replaceWith(`<h1 id="board">${response1['board']}</h1>`);
    $('#value').replaceWith(`<h2 id="value">${response1['value']}</h2>`);
    value = response1['board'];
    var next = `${url_endpoint}getNextMoveValues?board=${value}`;
    $.getJSON(next, function(result) {
        pMoves.push({ remoteness: response1["board"], value: response1["value"] })
        drawMVH(pMoves);
        response1 = result['response'][0];
        $('.btn1').css("background-color", "black");
        if (response1["value"] == "win") {
            $('.btn1').css("background-color", "red");
        }
        else if (response1["value"] == "lose") {
            $('.btn1').css("background-color", "green");
        }
        // $('.btn1').html(response1['board']);
        response2 = result['response'][1];
        $('.btn2').css("background-color", "black");
        if (response2["value"] == "win") {
            $('.btn2').css("background-color", "red");
        }
        else if (response2["value"] == "lose") {
            $('.btn2').css("background-color", "green");
        }
        // $('.btn2').html(response2['board']);
    });
});

$('.btn2').click(function() {
    $('#board').replaceWith(`<h1 id="board">${response2['board']}</h1>`);
    $('#value').replaceWith(`<h2 id="value">${response2['value']}</h2>`);
    value = response2['board'];
    var next = `${url_endpoint}getNextMoveValues?board=${value}`;
    $.getJSON(next, function(result) {
        pMoves.push({ remoteness: response2["board"], value: response2["value"] })
        drawMVH(pMoves);
        $('.btn2').css("background-color", "black");

        response1 = result['response'][0];
        $('.btn1').css("background-color", "black");
        if (response1["value"] == "win") {
            $('.btn1').css("background-color", "red");
        }
        else if (response1["value"] == "lose") {
            $('.btn1').css("background-color", "green");
        }
        response2 = result['response'][1];

        if (response2["value"] == "win") {
            $('.btn2').css("background-color", "red");
        }
        else if (response2["value"] == "lose") {
            $('.btn2').css("background-color", "green");
        }
    });
});

$('.restart').click(reset());

function drawMVH(pMoves) {
    /* find maximum remoteness */
    var m = 0;
    for (var i = 0; i < pMoves.length; i++) {
        m = Math.max(m, pMoves[i].remoteness)
    };
    m += 1;
    var r = [m];
    var w = [2];
    var p = [1];
    for (var i = 0; i < pMoves.length; i++) {
        r.push(pMoves[i].remoteness);
        switch (pMoves[i].value) {
            case "win":
                w.push(1);
                break;
            case "tie":
                w.push(2);
                break;
            case "lose":
                w.push(3);
                break;
        }
        p.push(i % 2);
    }
    // Draw graph
    vvh_main("Player 1", "Player 2", r, w, p, m);
    // Scroll to bottom
    $("#history-graph-container").scrollTop(10000);
}
