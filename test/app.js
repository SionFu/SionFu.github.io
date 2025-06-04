// 全局变量
let allQuestions = {
    single_choice: [],
    multi_choice: [],
    true_false: []
};
let currentQuestions = [];
let wrongQuestions = [];
let usedQuestionIds = new Set();
let currentQuestionIndex = 0;
let startTime;
let timerInterval;
let isReviewMode = false;

// 统计数据
let stats = {
    single: { correct: 0, total: 0 },
    multi: { correct: 0, total: 0 },
    true_false: { correct: 0, total: 0 }
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 加载题库
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            allQuestions = data;
            console.log('题库加载完成', allQuestions);
        })
        .catch(error => console.error('加载题库失败:', error));

    // 绑定按钮事件
    document.getElementById('start-test').addEventListener('click', startTest);
    document.getElementById('btn-next').addEventListener('click', nextQuestion);
    document.getElementById('review-wrong').addEventListener('click', reviewWrongQuestions);
    document.getElementById('restart-test').addEventListener('click', restartTest);
});

// 开始测试
function startTest() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('test-screen').style.display = 'block';
    document.getElementById('result-screen').style.display = 'none';

    // 重置统计数据
    stats = {
        single: { correct: 0, total: 0 },
        multi: { correct: 0, total: 0 },
        true_false: { correct: 0, total: 0 }
    };

    // 随机选择题目
    if (!isReviewMode) {
        currentQuestions = selectRandomQuestions();
    }

    // 更新总题数显示
    document.getElementById('total-questions').textContent = currentQuestions.length;

    // 重置当前题目索引
    currentQuestionIndex = 0;

    // 显示第一题
    showQuestion(currentQuestions[currentQuestionIndex]);

    // 开始计时
    startTime = new Date();
    startTimer();
}

// 随机选择题目
function selectRandomQuestions() {
    const questions = [];
    
    // 确保不选择上次测试的题目
    const availableSingleChoice = allQuestions.single_choice.filter(q => !usedQuestionIds.has(q.id));
    const availableMultiChoice = allQuestions.multi_choice.filter(q => !usedQuestionIds.has(q.id));
    const availableTrueFalse = allQuestions.true_false.filter(q => !usedQuestionIds.has(q.id));

    // 如果可用题目不足，则重置已使用题目集合
    if (availableSingleChoice.length < 70 || availableMultiChoice.length < 10 || availableTrueFalse.length < 20) {
        usedQuestionIds.clear();
    }

    // 随机选择70道单选题
    const selectedSingleChoice = getRandomItems(allQuestions.single_choice, 70);
    selectedSingleChoice.forEach(q => {
        questions.push(q);
        usedQuestionIds.add(q.id);
        stats.single.total++;
    });

    // 随机选择10道多选题
    const selectedMultiChoice = getRandomItems(allQuestions.multi_choice, 10);
    selectedMultiChoice.forEach(q => {
        questions.push(q);
        usedQuestionIds.add(q.id);
        stats.multi.total++;
    });

    // 随机选择20道判断题
    const selectedTrueFalse = getRandomItems(allQuestions.true_false, 20);
    selectedTrueFalse.forEach(q => {
        questions.push(q);
        usedQuestionIds.add(q.id);
        stats.true_false.total++;
    });

    // 随机打乱题目顺序
    return shuffleArray(questions);
}

// 从数组中随机选择指定数量的元素
function getRandomItems(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// 打乱数组顺序
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// 显示题目
function showQuestion(question) {
    // 更新题目类型
    const questionTypeElement = document.getElementById('question-type');
    questionTypeElement.className = 'question-type';
    
    if (question.type === 'single') {
        questionTypeElement.textContent = '单选题';
        questionTypeElement.classList.add('single');
    } else if (question.type === 'multi') {
        questionTypeElement.textContent = '多选题';
        questionTypeElement.classList.add('multi');
    } else if (question.type === 'true_false') {
        questionTypeElement.textContent = '判断题';
        questionTypeElement.classList.add('true_false');
    }

    // 更新题目ID
    document.getElementById('question-id').textContent = `#${question.id}`;

    // 更新题目文本
    document.getElementById('question-text').textContent = question.question;

    // 更新选项
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    const options = question.options;
    const inputType = question.type === 'multi' ? 'checkbox' : 'radio';
    const name = `question-${currentQuestionIndex}`;

    for (const key in options) {
        const label = document.createElement('label');
        label.className = 'option-label';
        label.dataset.key = key;

        const input = document.createElement('input');
        input.type = inputType;
        input.name = name;
        input.value = key;
        input.id = `option-${key}`;
        input.style.marginRight = '10px';

        const text = document.createTextNode(`${key}. ${options[key]}`);

        label.appendChild(input);
        label.appendChild(text);
        optionsContainer.appendChild(label);

        // 为选项添加点击事件
        label.addEventListener('click', function(e) {
            if (inputType === 'radio') {
                // 单选题或判断题
                document.querySelectorAll('.option-label').forEach(l => l.classList.remove('selected'));
                this.classList.add('selected');
                checkAnswer();
            } else {
                // 多选题
                const checkbox = this.querySelector('input[type="checkbox"]');
                checkbox.checked = !checkbox.checked;
                this.classList.toggle('selected', checkbox.checked);
                e.preventDefault(); // 防止默认的checkbox行为
            }
        });
    }

    // 如果是多选题，显示提交按钮
    const btnNext = document.getElementById('btn-next');
    btnNext.style.display = question.type === 'multi' ? 'block' : 'none';
    btnNext.textContent = '提交答案';

    // 隐藏解析
    document.getElementById('explanation').style.display = 'none';

    // 更新进度条
    updateProgress();
}

// 检查答案
function checkAnswer() {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    const selectedOptions = [];
    let isCorrect = false;

    // 获取用户选择的答案
    document.querySelectorAll('.option-label.selected').forEach(label => {
        selectedOptions.push(label.dataset.key);
    });

    // 判断答案是否正确
    if (currentQuestion.type === 'multi') {
        // 多选题
        const correctAnswers = currentQuestion.answer;
        isCorrect = selectedOptions.length === correctAnswers.length && 
                    selectedOptions.every(option => correctAnswers.includes(option));
    } else {
        // 单选题或判断题
        isCorrect = selectedOptions.length === 1 && selectedOptions[0] === currentQuestion.answer;
    }

    // 更新统计数据
    if (isCorrect) {
        if (currentQuestion.type === 'single') {
            stats.single.correct++;
        } else if (currentQuestion.type === 'multi') {
            stats.multi.correct++;
        } else if (currentQuestion.type === 'true_false') {
            stats.true_false.correct++;
        }
    } else {
        // 添加到错题集
        if (!isReviewMode && !wrongQuestions.some(q => q.id === currentQuestion.id)) {
            wrongQuestions.push(currentQuestion);
        }
    }

    // 显示正确和错误的选项
    document.querySelectorAll('.option-label').forEach(label => {
        const key = label.dataset.key;
        
        if (currentQuestion.type === 'multi') {
            // 多选题
            if (currentQuestion.answer.includes(key)) {
                label.classList.add('correct');
            } else if (selectedOptions.includes(key)) {
                label.classList.add('incorrect');
            }
        } else {
            // 单选题或判断题
            if (key === currentQuestion.answer) {
                label.classList.add('correct');
            } else if (selectedOptions.includes(key)) {
                label.classList.add('incorrect');
            }
        }
    });

    // 显示解析
    const explanationElement = document.getElementById('explanation');
    explanationElement.textContent = currentQuestion.explanation;
    explanationElement.style.display = 'block';

    // 显示下一题按钮
    const btnNext = document.getElementById('btn-next');
    btnNext.style.display = 'block';
    btnNext.textContent = '下一题';

    // 如果答对了，自动进入下一题（除多选题外）
    if (isCorrect && currentQuestion.type !== 'multi') {
        setTimeout(() => nextQuestion(), 1000);
    }
}

// 下一题
function nextQuestion() {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    
    // 如果是多选题且尚未提交答案
    if (currentQuestion.type === 'multi' && document.getElementById('btn-next').textContent === '提交答案') {
        checkAnswer();
        return;
    }

    currentQuestionIndex++;

    // 如果还有题目，显示下一题
    if (currentQuestionIndex < currentQuestions.length) {
        showQuestion(currentQuestions[currentQuestionIndex]);
    } else {
        // 否则显示结果
        showResult();
    }
}

// 显示结果
function showResult() {
    // 停止计时
    clearInterval(timerInterval);

    // 计算得分
    const totalScore = stats.single.correct + stats.multi.correct + stats.true_false.correct;
    
    // 更新结果页面
    document.getElementById('score').textContent = totalScore;
    document.getElementById('time-used').textContent = document.getElementById('timer').textContent;
    
    document.getElementById('single-correct').textContent = stats.single.correct;
    document.getElementById('single-total').textContent = stats.single.total;
    
    document.getElementById('multi-correct').textContent = stats.multi.correct;
    document.getElementById('multi-total').textContent = stats.multi.total;
    
    document.getElementById('tf-correct').textContent = stats.true_false.correct;
    document.getElementById('tf-total').textContent = stats.true_false.total;

    // 显示结果页面
    document.getElementById('test-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
}

// 复习错题
function reviewWrongQuestions() {
    if (wrongQuestions.length === 0) {
        alert('没有错题需要复习！');
        return;
    }

    isReviewMode = true;
    currentQuestions = [...wrongQuestions];
    wrongQuestions = [];
    startTest();
}

// 重新开始测试
function restartTest() {
    isReviewMode = false;
    startTest();
}

// 更新进度条
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
    document.getElementById('progress-bar').setAttribute('aria-valuenow', progress);
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
}

// 开始计时器
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

// 更新计时器
function updateTimer() {
    const now = new Date();
    const diff = now - startTime;
    
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    const timeString = 
        (hours < 10 ? '0' + hours : hours) + ':' +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds);
    
    document.getElementById('timer').textContent = timeString;
}
