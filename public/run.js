function getProcess(processCapacity) {
    //capacity is units processed per unit time
    var process = {
        currentTasks: [],
        completedQueue: [],
        capacity: processCapacity,
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

function getProcessArray(num) {
    var arr = []
    for (var i = 0; i < num; i++) {
        arr.push(getProcess(5))
    }
    return arr;
}

function addTask(){
    newTask = getTask("Task <br/>");
    req.push(newTask);
   
    var result= "";
    for(i= req.length-1; i>=0;i--){
        result=req[i]['name']+result;
    }
    document.getElementById("taskList").innerHTML = result;
    document.getElementById("numberOfTasks").innerHTML = req.length;
}

currentTime = 0
taskId = 0
cycleTimeDict = {}

arr = getProcessArray(3);
req = []

// for(var i =0;i<20;i++)
//     req.push(getTask(i+""))
// }

// function oneTimeStep(){
//     if(arr[0].currentTasks.length < arr[0].capacity)
//     for(var i=1;i<arr.length;i++){

//     }
// 
//}

function oneTimeStep(){
    currentTime = currentTime + 1;
    for(var i=arr.length-1;i>0;i--){
        for (var j=0;j<arr[i].capacity;j++){
            if(arr[i-1].completedQueue.length > 0){
                task = arr[i-1].completedQueue.shift()
                cycleTimeDict[task["id"]][1] = currentTime+1;
                arr[i].completedQueue.push()
            }
            
        }
    }

    for (var i=0;i<arr[0].capacity;i++){
        if(req.length > 0){
            task = req.shift();
            arr[0].completedQueue.push(task);
            cycleTimeDict[task["id"]][0] = currentTime;
        }
    }
}

arr = getProcessArray(3);
req = []

// for(var i =0;i<20;i++){
//     req.push(getTask(i+""))
// }

