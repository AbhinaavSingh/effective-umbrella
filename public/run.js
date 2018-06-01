function addCapacityToProcess(processID, processCapacity) {
    //capacity is units processed per unit time
    pro[processID-1].capacity = processCapacity - 0;
}

function addWIPToProcess(wipID, processWIP) {
    //capacity is units processed per unit time
    var processID = wipID.substring(3) - 0;
    pro[processID-1].WIP = processWIP - 0;
}

function createProcess() {
    //capacity is units processed per unit time
    var process = {
        currentTasks: [],
        completedQueue: [],
        capacity: -1,
    }
    return process;
}


function getTask(taskName) {
    var task = { 
        name: taskName,
        id:taskId 
    }
    cycleTimeDict[taskId] = [null,null]
    taskId = taskId +1
    return task;
}

// function getProcessproay(num) {
//     var pro = []
//     for (var i = 0; i < num; i++) {
//         pro.push(getProcess(5))
//     }
//     return pro;
// }

var req = []
function addTask(){
    newTask = getTask("<tr><td>Task</td></tr>");
    req.push(newTask);
   
    var result= "";
    for(i= req.length-1; i>=0;i--){
        result=req[i]['name']+result;
    }
    result = "<tr><th>Tasks Queue (" +  req.length + ")</th></tr>" + result;
    document.getElementById("taskTable").innerHTML = result;
}    


function makeBottleneckRed(){
    var queueLength = []
    for(i= pro.length-1; i>=0;i--){
        queueLength[i]=pro[i].completedQueue.length;
    }
    queueLength.pop();  //Last Queue is Output
    var maxlength = (queueLength.indexOf(Math.max(...queueLength))+1);

    //Remove Last Red
    for(i= pro.length-1; i>=0;i--){
        document.getElementById("pro"+(i+1)).style="background-color:lightblue;border:solid;display:inline-block;";
    }

    //Add Red to Process with Highest Items pending in Queue
    if (Math.max(...queueLength)>0 && (maxlength)!=pro.length){
         document.getElementById("pro"+(maxlength+1)).style="background-color:red;border:solid;display:inline-block;";
    }

}

function refreshTask(){
    var result= "";
    for(i= req.length-1; i>=0;i--){
        result=req[i]['name']+result;
    }
    result = "<tr><th>Tasks Queue (" +  req.length + ")</th></tr>" + result;
    document.getElementById("taskTable").innerHTML = result;
}    

function showQueueTables(){
    for(iterateProcess= pro.length; iterateProcess>=1;iterateProcess--){
    var result= "";
    for(i= pro[iterateProcess-1].completedQueue.length-1; i>=0;i--){
        result=pro[iterateProcess-1].completedQueue[i]['name']+result;
    }
        if (iterateProcess==pro.length){
          result = "<tr><th>Output (" +  pro[iterateProcess-1].completedQueue.length + ")</th></tr>" + result;
          document.getElementById("queueTable"+iterateProcess ).style="color:rgb(40, 14, 187);background-color:lightgreen;width:250px;border: 1px solid black";
      }
      else result = "<tr><th>Queue for Process "+(iterateProcess+1)+ " (Length = " +  pro[iterateProcess-1].completedQueue.length + ")</th></tr>" + result;
          document.getElementById("queueTable"+iterateProcess ).innerHTML = result;
        
    }
}    
pro = [];
function addProcess(){
    var process = {
        name: "Process <br/>",
        currentTasks: [],
        completedQueue: [],
        capacity: 1000000000,
        WIP: 1000000000
    }
    pro.push(process);
    var entryProcess = document.createElement('div');
    entryProcess.setAttribute("id", "pro"+pro.length);
    entryProcess.appendChild(document.createTextNode("Process" + (pro.length)));
    var processWIP = document.createElement("INPUT");
    processWIP.setAttribute("type", "text");
    processWIP.setAttribute("id", "WIP" + pro.length);
    var processCapacity = document.createElement("INPUT");
    processCapacity.setAttribute("type", "text");
    processCapacity.setAttribute("id", pro.length);
    processCapacity.setAttribute("placeholder",  "Capacity")
    processCapacity.setAttribute("style", "width : 60px");
    entryProcess.appendChild(processWIP);
    entryProcess.appendChild(processCapacity);
    entryProcess.setAttribute("style","background-color:lightblue;border:solid;display:inline-block;");
    document.getElementById("processList").appendChild(entryProcess);
    processCapacity.setAttribute("onchange", "addCapacityToProcess(this.id, this.value)");
    processWIP.setAttribute("onchange", "addWIPToProcess(this.id, this.value)");    
    processWIP.setAttribute("placeholder",  "WIP");    
    processWIP.setAttribute("style", "width : 60px");    
    var queueTable = document.createElement("table");
    queueTable.setAttribute("id","queueTable"+ (pro.length));
    queueTable.setAttribute("style","border: 1px solid black;");
    entryProcess.appendChild(queueTable);
   // document.getElementById("numberOfProcess").innerHTML = pro.length;   
} 


currentTime = 0
taskId = 0
cycleTimeDict = {}
// pro = getProcessproay(3);    


// for(var i =0;i<20;i++)
//     req.push(getTask(i+""))
// }

// function oneTimeStep(){
//     if(pro[0].currentTasks.length < pro[0].capacity)
//     for(var i=1;i<pro.length;i++){

//     }
// 
//}

function avgTime(timeArray){
    var total = 0;
    for(var i = 0; i < timeArray.length; i++) {
        total += timeArray[i];
    }
    return total / timeArray.length;
    }

    var timeArray = [];
function getCycleTime(){
    
    var time, iterateProcess,averageTime;
    outputQueue = pro[pro.length-1].completedQueue;
    for(iterateProcess= outputQueue.length; iterateProcess>=0;iterateProcess--){
    time = cycleTimeDict[outputQueue[outputQueue.length-1]["id"]]
    time = time[1] - time[0];
    timeArray.push(time);    
    }
    averageTime = avgTime(timeArray);
    if(time)
         document.getElementById("cycleTimeDiv").innerHTML = "<b>Average Cycle Time</b> <br />" + averageTime; 
}



function oneTimeStep(){
    currentTime = currentTime + 1;
      

    for(var i=pro.length-1;i>0;i--){
     var lesser = Math.min(pro[i].capacity, pro[i].WIP);        
        for (var j=0;j<lesser;j++){
            if(pro[i-1].completedQueue.length > 0){
                task = pro[i-1].completedQueue.shift()
                cycleTimeDict[task["id"]][1] = currentTime+1;
                pro[i].completedQueue.push(task)
            }
            
        }
    }

    for (var i=0;i<Math.min(pro[0].capacity, pro[0].WIP);i++){
        if(req.length > 0){
            task = req.shift();
            pro[0].completedQueue.push(task);
            cycleTimeDict[task["id"]][0] = currentTime;
        }
    }
}

// pro = getProcessproay(3);
req = []

// for(var i =0;i<20;i++){
//     req.push(getTask(i+""))
// }

