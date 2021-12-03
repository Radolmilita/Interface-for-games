var divText = document.createElement('div');
var content = document.createElement('div');
var inputQuestion = document.createElement('input');
var btn = document.createElement("button");
var divSphere = document.createElement('div');
var divAnswer = document.createElement('span');


divText.style.textAlign='center';
inputQuestion.style.marginTop='2%';
divText.innerHTML = '<span>Input your question<span>';
content.className="content";
divAnswer.innerHTML='Click to ask';
inputQuestion.setAttribute('type','text');
document.body.append(content);
content.append(divText);
content.append(inputQuestion);
divSphere.classList.add('sphere');
var prediction = ['Maybe', 'Never!', 'No','Possibly', 'Yes!','No matter','For shure', 'Seems real', 'Hit in point', ''];
btn.innerHTML = "Ask question";
btn.className = "btn"
content.append(btn);
btn.onclick = function Predict () {
    if(inputQuestion.value.length){
        divSphere.classList.add('sphereShake');
        var answer = prediction[Math.floor(Math.random() * prediction.length)];
        divAnswer.className="blinkcl";
        divAnswer.innerHTML = answer;
        divSphere.addEventListener( "animationend",  function() {
        divSphere.classList.remove("sphereShake");
        divAnswer.classList.remove("blinkcl")});
    }
}
content.append(divSphere);
divSphere.append(divAnswer);