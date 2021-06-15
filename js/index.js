'use strict'; {
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const btn = document.getElementById('btn');
    const result = document.getElementById('result');
    const scoreLabel = document.querySelector('#result > p');
    const start = document.getElementById('start');
    const startScreen = document.getElementById('startScreen');
    const timeCount = document.getElementById('timeCount');
    let id;
    let count = 10;

    const quizSet = shuffle([
        { q: '世界で一番大きな湖は?', c: ['カスピ海', 'カリブ海', '琵琶湖', '朝倉海'] },
        { q: '2の8乗は?', c: ['256', '64', '1024', '128'] },
        {
            q: '次のうち最初にリリースされた言語は?',
            c: ['Python', 'JavaScript',
                'C++', 'ヒラサワ語'
            ]
        },
        { q: "三歩歩くと？？", c: ["トラベリング", "サイクリング", "リファクタリンング", "マスタング"] }
    ]);

    let currentNum = 0;
    let isAnswered;
    let score = 0;


    function shuffle(arr) {
        // arrの末尾のインデックス取得
        for (let i = arr.length - 1; i > 0; i--) {
            // arrの要素数からランダムな値をjに
            const j = Math.floor(Math.random() * (i + 1));
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
    }

    function checkAnswer(li) {
        if (isAnswered) {
            return;
        }
        isAnswered = true;
        if (li.textContent === quizSet[currentNum].c[0]) {
            li.classList.add('correct');
            score++;
        } else {
            li.classList.add('wrong');
        }

        btn.classList.remove('disabled');
    }

    function setQuiz() {
        isAnswered = false;
        question.textContent = quizSet[currentNum].q;

        while (choices.firstChild) {
            choices.removeChild(choices.firstChild);
        }

        const shuffledChoices = shuffle([...quizSet[currentNum].c]);
        shuffledChoices.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', () => {
                checkAnswer(li);
            })
            choices.appendChild(li);
        });

        if (currentNum === quizSet.length - 1) {
            btn.textContent = 'show score';
        }
    }　


    function countDown() {
        const now = new Date(); //今の時間
        const end = new Date(now.getTime() + count * 1000);

        id = setInterval(() => {
            const differ = (end.getTime() - now.getTime()) / 1000;
            timeCount.textContent = `制限時間 ${count}`;
            count--;
            if (count === -1) {
                clearInterval(id);
                scoreLabel.textContent = `Score: ${score}/${quizSet.length}`;
                result.classList.remove('hidden');
            }
        }, 1000);
    }

    document.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        setQuiz();
        countDown();
    }, { once: true })

    btn.addEventListener('click', () => {
        if (btn.classList.contains('disabled')) {
            return;
        }
        btn.classList.add('disabled');

        if (currentNum === quizSet.length - 1) {
            scoreLabel.textContent = `Score: ${score}/${quizSet.length}`;
            result.classList.remove('hidden');
            clearInterval(id);
        } else {
            currentNum++;
            setQuiz();
        }
    });
}