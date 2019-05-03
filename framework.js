var Game = {
    pMoves: [],
    boardState: '',
    drawMVH: function (pMoves) {
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
    },
}
