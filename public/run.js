function addCapacityToProcess(processID, processCapacity) {
    //capacity is units processed per unit time
    pro[processID-1].capacity = processCapacity - 0;
}

function createProcess() {
    //capacity is units processed per unit time
    var process = {
        currentTasks: [],
        completedQueue: [],
        capacity: 0,
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
pro = [];
function addProcess(){
    var process = {
        name: "Process <br/>",
        currentTasks: [],
        completedQueue: [],
        capacity: 0,
    }
    pro.push(process);
    var entryProcess = document.createElement('div');
    entryProcess.appendChild(document.createTextNode("Process" + (pro.length)));
    var processCapacity = document.createElement("INPUT");
    processCapacity.setAttribute("type", "text");
    processCapacity.setAttribute("id", pro.length);
    entryProcess.appendChild(processCapacity);
    entryProcess.setAttribute("style","");
    document.getElementById("processList").appendChild(entryProcess);
    processCapacity.setAttribute("onchange", "addCapacityToProcess(this.id, this.value)");
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

function getCycleTime(){
    outputQueue = pro[pro.length-1].completedQueue;
    time = cycleTimeDict[outputQueue[outputQueue.length-1]["id"]]
    time = time[1] - time[0];
    return time 
}

function oneTimeStep(){
    currentTime = currentTime + 1;
    for(var i=pro.length-1;i>0;i--){
        for (var j=0;j<pro[i].capacity;j++){
            if(pro[i-1].completedQueue.length > 0){
                task = pro[i-1].completedQueue.shift()
                cycleTimeDict[task["id"]][1] = currentTime+1;
                pro[i].completedQueue.push(task)
            }
            
        }
    }

    for (var i=0;i<pro[0].capacity;i++){
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

