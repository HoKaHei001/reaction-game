let bg_change = false;
let btn_show = false;
let game_stop = false;
let time_start = 0;
let bg_default = '#2550c4';
let high_score = [];

function bgc_change() {
    if (bg_change === false) {
        let color_arr = []
        for (let i = 0; i < 3; i++) {
            let random = Math.random() * 150;
            color_arr.push(random);
        }
        document.querySelector("body").style.backgroundColor = `rgb(${color_arr[0]},${color_arr[1]},${color_arr[2]})`;
        document.querySelector(".img_change").src = "./images/start.png"
        bg_change = true;
        time_start = new Date();
    }
}

function bgc_reset() {
    if (bg_change === true) {
        document.querySelector("body").style.backgroundColor = bg_default;
        document.querySelector(".img_change").src = "./images/ready.png"
        bg_change = false;
    }
}

function show_btn() {
    if (btn_show === false) {
        document.querySelector(".again").classList.remove("again_hide");
        btn_show = true;
        game_stop = true;
    }
}

function hide_btn() {
    if (btn_show === true) {
        document.querySelector(".again").classList.add("again_hide");
        btn_show = false;
        game_stop = false;
    }
}

function start() {
    if (game_stop) return
    else {
        document.querySelector("body").addEventListener("click",
            function () {
                document.querySelector(".text").innerText = "色が変わったらすぐにクリックしてください！";

                window.setTimeout(bgc_change, (Math.floor(Math.random() * 5 + 3)) * 1000);
                document.removeEventListener("click", start);
            }
        )
    }
}

function game() {
    document.querySelector("body").addEventListener("click",
        function (e) {
            if ((bg_change === true) && (btn_show === false) && (game_stop === false)) {
                let time_end = new Date();
                let score = ((time_end - time_start) / 1000);
                alert(`今回掛かった時間は：${score}s`);
                react_score(score);
                show_btn();
                show_score();
            } else if ((bg_change === false) && (btn_show === false) && (game_stop === false)) {
                alert("焦りすぎですよ！");
                bgc_change();
                show_btn();
            }
            document.querySelector(".text").innerText = "もう一回クリックして、再チャレンジ！";
            document.querySelector(".img_change").src = "./images/failed.png"
        }
    )
}

function show_score() {
    const score_li = document.querySelectorAll("li");
    for (let i = 0; i < high_score.length; i++) {
        score_li[i].innerText = `${i + 1} 番: ${high_score[i]}s`;
    }
    document.querySelector('.score').style.display = "inline-block";
}

function sort_score(high_score, score) {
    // 最後の点数から比較
    for (let i = high_score.length - 1; i >= 0; i--) {
        // 時間なので大きな数値の方が遅い
        if (score > high_score[i]) {
            // 配列の順番はゼロから始まるので+1
            return i + 1;
        }
    }
    // 一番早い
    return 0;

    // returnした値でscore_splice_numの配列の値の参照となる
}

function react_score(score) {
    document.querySelector("h4").innerText = "これが君の反射速度だ！";
    if (high_score.length < 1) {
        high_score.push(score);
    } else {
        if (score < high_score[high_score.length - 1]) {
            let score_splice_num = sort_score(high_score, score);
            // splice():指定した値により追加、削除、取り除く
            // 第1引数で指定した値から、第2引数で指定した数を取り除き、第3引数の値を追加します。
            high_score.splice(score_splice_num, 0, score);
            // 3番目まで取り除く
            high_score.splice(3);
        } else if (high_score.length < 3) {
            // push():配列の最後に追加する要素を指定します。
            high_score.push(score);
        } else {
            document.querySelector("h4").innerText = "まだ成績残されていないみたいです！";
        }
    }
}

function reset() {
    document.querySelector(".again").addEventListener("click",
        function (e) {
            if (game_stop === true) {

                document.querySelector(".text").innerText = "色が変わったらすぐにクリックしてください！";
                document.querySelector('.score').style.display = "none";
                hide_btn();
                bgc_reset();
                e.stopImmediatePropagation();
            }
        }
    )
}

start();
document.querySelector("body").addEventListener("click",
    function (e) {
        if (e.target.tagName === 'BODY' || e.target.tagName === 'DIV') {
            game();
        } else if (e.target.tagName === 'BUTTON') {
            reset();
        }
    }
)