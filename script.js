var questions = [
  {
    question: '1) Please fill in the blanks, and the result will print out integers from 0 to 10.',
    type: 'input',
    ans: `for ( let i = <input type="text" id="a1"> ; i <= <input type="text" id="a2"> ; i ++) {<br><br>
            console.log(i);
            <br><br>
            }`,
    corr: ['0', '10'],
    corrText: 'for ( let i = 0; i <= 10; i ++)'
  },
  {
    question: '2) Please fill in the blanks, and the result will print out integers from 10 to 0.',
    type: 'input',
    ans: `for ( let i = <input type="text" id="a1"> ; i >= <input type="text" id="a2"> ; i <input type="text" id="a3"> ) {<br><br>
            console.log(i);
            <br><br>
            }`,
    corr: ['10', '0', '--'],
    corrText: 'for ( let i = 10; i >= 0; i --)'
  },
  {
    question: '3) Variable names cannot start with numbers.',
    type: 'boolean',
    ans: ['True', 'False'],
    corr: 'True',
  },
  {
    question: '4) _____ is a JavaScript keyword that creates, or declares, a new variable.',
    type: 'mc',
    ans: ['script', 'bar', 'var', 'console'],
    corr: 'var',
  },
  {
    question: '5) (What symbol) is the assignment operator. It assigns the value to the variable.',
    type: 'mc',
    ans: ['=', ':)', '+', ';'],
    corr: '=',
  },
  {
    question: '6) The "let" keyword signals that the variable cannot be changed',
    type: 'boolean',
    ans: ['True', 'False'],
    corr: 'False',
  },
  {
    question: '7) Which of the following is the correct Javascript format for a comment?',
    type: 'mc',
    ans: ['// "the text"', '/"the text"/', '\\"the text', '*/"the text"/*'],
    corr: '// "the text"',
  },
  {
    question: '8) In JavaScript, you should include a semi-colon at the end of each statement.',
    type: 'boolean',
    ans: ['True', 'False'],
    corr: 'True',
  },
  {
    question: '9) What character do we use for division?',
    type: 'mc',
    ans: ['#', 'x', '*', '/'],
    corr: '/',
  },
  {
    question: '10) Please fill in the blanks, and the result will print out integers 1, 4, 7, 10, ..., 88.(no need to type space)',
    type: 'input',
    ans: `<input type="text" id="a1"> ( let i = <input type="text" id="a2"> ; i <= <input type="text" id="a3"> ; i <input type="text" id="a4" class="longinput"> ) {<br><br>
            <input type="text" id="a5" class="longinput"> .log( i );
            <br><br>
            }`,
    corr: ['for', '1', '88', '+=3', 'console'],
    corrText: `for ( let i = 1 ; i <= 88 ; i + = 3  ) {<br><br>
            console.log( i );
            <br><br>
            }`
  },
]

let title = document.getElementById('title');
let answer = document.getElementById('answer');
let checkbtn = document.getElementById('check');
let toggletext = document.querySelector('.toggle');
let demo = document.getElementById('demo');
let correctext = document.getElementById('correctans');
let nextbtn = document.getElementById('nextbtn');
let totalscore = document.getElementById('totalscore');
let resume = document.getElementById('resume');


let currentquestion = 0;
let score = 0;
let choose = '';

function start() {
  resume.classList.add('none')
  checkbtn.classList.remove('none');
  totalscore.classList.add('none')
  checkbtn.disabled = false;

  let questionlist = questions[currentquestion];
  if (questionlist.type == "input") {
    title.innerHTML = questionlist.question;
    answer.innerHTML = questionlist.ans;
    correctext.innerHTML = questionlist.corrText;

  } else if (questionlist.type == "mc" || questionlist.type == "boolean") {

    title.innerHTML = questionlist.question;
    correctext.innerHTML = questionlist.corr;
    for (let i = 0; i < questionlist.ans.length; i++) {
      let button = document.createElement('button');
      button.innerText = questionlist.ans[i];
      answer.appendChild(button);
      button.classList.add('option');
      button.setAttribute('id', 'a' + i)
      button.onclick = (e) => {
        choose = e.target.innerText;
      }
    }
  }
  // toggle not working------------
  // let btn1 = document.getElementById('a0');
  // let btn2 = document.getElementById('a1');

  // btn1.addEventListener('click', function toggle() {
  //   btn1.classList.toggle('border');
  // })

  // btn2.addEventListener('click', function toggle() {
  //   btn2.classList.toggle('border');
  // })
}

function check(curr) {
  checkbtn.disabled = true;
  if (curr.type == 'input') {
    let correctcount = 0;
    for (let i = 1; i <= curr.corr.length; i++) {
      let a = 'a' + i;
      let currans = document.getElementById(a)
      currans.disabled = true;
      if (currans.value == curr.corr[i - 1]) {
        correctcount++;
      }
    }
    if (correctcount == curr.corr.length) {
      demo.innerHTML = 'Correct'
      demo.style.color = 'green'
      score++;
    } else {
      demo.innerHTML = 'Wrong'
      demo.style.color = 'red'
    }
  } else if (curr.type == 'mc' || curr.type == 'boolean') {
    if (choose == curr.corr) {
      demo.innerHTML = 'Correct'
      demo.style.color = 'green'
      score++;
    } else {
      demo.innerHTML = 'Wrong'
      demo.style.color = 'red'
    }
  }
}


function showans() {
  toggletext.classList.add('block');
}


nextbtn.onclick = () => {
  if (currentquestion >= 9) {
    title.innerHTML = 'Your score:';
    answer.innerHTML = '';
    totalscore.classList.remove('none')
    totalscore.innerHTML = score + ` / 10`;
    checkbtn.classList.add('none');
    resume.classList.remove('none')
    toggletext.classList.remove('block')
    currentquestion = 0;
    score = 0;
  } else {
    currentquestion++;
    answer.innerHTML = ''
    toggletext.classList.remove('block');
    start();
  }
}

start()
