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
    var task = { name: taskName }
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
    for(var i=arr.length-1;i>0;i--){
        for (var j=0;j<arr[i].capacity;j++){
            if(arr[i-1].completedQueue.length > 0){
                arr[i].completedQueue.push(arr[i-1].completedQueue.shift())
            }
        }
    }

    for (var i=0;i<arr[0].capacity;i++){
        if(req.length > 0){
            arr[0].completedQueue.push(req.shift())
        }
    }
}

arr = getProcessArray(3);
req = []

// for(var i =0;i<20;i++){
//     req.push(getTask(i+""))
// }

