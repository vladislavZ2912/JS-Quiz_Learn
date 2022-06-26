const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

const headerContainer = document.querySelector('#header')
const listContainer = document.querySelector('#list')
const submitButton = document.querySelector('#submit')
const Block = document.querySelector('#quiz')

let score = 0;
let questionIndex = 0;

clearPage()
showQuestion(questionIndex)


submitButton.addEventListener('click', function(){
	const user_answer = listContainer.querySelector('input[type="radio"]:checked')
	console.log(user_answer)
	if (!user_answer){
		console.log('OK')
		submitButton.blur()
		const ErrorSpan = document.createElement('span');
		ErrorSpan.innerText = 'Выберите один из предложенных вариантов ответа!';
		ErrorSpan.setAttribute('id', 'errSpan')
		ErrorSpan.style['text-align'] = 'center'
		ErrorSpan.style['color'] = 'red'
		Block.append(ErrorSpan)
		setTimeout(()=>{Block.querySelector('#errSpan').remove()},2000)
		return
	}
	const userAnswer = parseInt(user_answer.value)
	if (userAnswer === questions[questionIndex].correct){
		score++
		console.log(userAnswer, questions[questionIndex].correct)
	}
	if (questionIndex !== questions.length-1 ){
		questionIndex++;
		clearPage();
		showQuestion(questionIndex);
		return
	}else{
		clearPage()
		finish()
	}
})

function clearPage(){
	headerContainer.innerHTML = ''
	listContainer.innerHTML = ''
}

function showQuestion(questionIndex){
	//Title
	headerContainer.title.innerText = questions[questionIndex].question
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex].question);
	headerContainer.innerHTML = title;

	//Questions
	for ([i, item] of questions[questionIndex].answers.entries()){
		console.log(item)
		const questionTemplate = `			
		<li>
			<label>
				<input value="${i+1}" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
		</li>`
		const answerHTML = questionTemplate.replace('%answer%', item)

		listContainer.innerHTML += answerHTML
	}
}

function finish(){
	console.log('Это последний вопрос', score)
	let title, message;

	if (score === questions.length){
		title = 'Поздравляем!'
		message= 'Вы ответили на все вопросы верно!'
	}else if (score*100/questions.length > 50){
		title = 'Не плохо!'
		message= 'Вы ответили на большенство вопросов!'
	} else{
		title = 'Плохо!'
		message= 'Можно и лучше!'
	}

	let result = `${score} из ${questions.length} верных ответов`
	const resultTemplat = `
		<h2 class="title">${title}</h2>
		<h3 class="summary">${message}</h3>
		<p class="result">${result}</p>
	`;
	headerContainer.innerHTML = resultTemplat;
	submitButton.remove()
}








