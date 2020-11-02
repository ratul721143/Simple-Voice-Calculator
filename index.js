function getHistoryValue(){
    return document.getElementById("historyValue").innerText;
}
function printHistoryValue(num){
    document.getElementById('historyValue').innerText=num;
}

function getRecentValue(){
    return document.getElementById('recentValue').innerText;
}

function printRecentValue(num){
    var recentvalue = document.getElementById('recentValue');
    if(num==""){
        recentvalue.innerText=num;
    }
    else{
        recentvalue.innerText=getFormatedNumber(num);
    }

}

//comma seperatednumber
function getFormatedNumber(num){
    if(num == '-'){
        return "";
    }
    return Number(num).toLocaleString('en');
}

//for calculate remove commas
function removeCommas(num){
    return Number(num.replace(/,/g,''));
}



//operater's actions

var operater = document.getElementsByClassName('operator');
for(var i=0;i<operater.length;i++){
    operater[i].addEventListener('click',function(){
        if(this.id == "clear"){
            printHistoryValue("");
            printRecentValue("");
        }
        else if(this.id == "CE"){
            var output = removeCommas(getRecentValue()).toString();
            
            if(output){
                output = output.substr(0,output.length-1);
                printRecentValue(output);
            }
        }
        else{
            var output=getRecentValue();
            var history = getHistoryValue();
            if(output == "" && history!=""){
                if(isNaN(history[history.length-1])){
                    history = history.substr(0,history.length-1);

                }
            }
            if(output != '' || history != ""){
                output = output=="" ? output : removeCommas(output);
                history = history+output;
                var his=history;
                if(this.id == "="){
                    var result = eval(his);
                    printRecentValue(result);
                    printHistoryValue(history);
                }
                else{
                    history = history + this.id;
                    printHistoryValue(history);
                    printRecentValue("");
                }
                
            }
        }
    });
}

//action on numbers
var number = document.getElementsByClassName('number');
for(var i=0;i<number.length;i++){
    number[i].addEventListener('click',function(){
        var output = removeCommas(getRecentValue());
        if(output != NaN ){
            output = output + this.id;
            printRecentValue(output);
        }
    });
}

//microphone properties
var microphone = document.getElementById('microphone');

microphone.onclick = function(){
    microphone.classList.add('record');
    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
	recognition.lang = 'en-US';
    recognition.start();
    operations = {
        "plus":"+",
        "minus":"-",
        "multiply":"*",
        "multiplied":"*",
        "divide":"/",
        "divided":"/",
        "reminder":"%"
        }
    recognition.onresult = function(event){
        var input = event.results[0][0].transcript;
        for(property in operations){
			input= input.replace(property, operations[property]);
		}
        document.getElementById('recentValue').innerText=input;
        setTimeout(function(){
            evaluate(input);
        },2000);
        microphone.classList.remove('record');
    }
}

function evaluate(input){
    var recentvalue=document.getElementById('recentValue');
    try{
        var result = eval(input);
        recentvalue.innerText = result;
    }
    catch(e){
        console.log(e);
        recentvalue.innerText="";
    }
}