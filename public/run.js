function getProcess(processCapacity) {
    //capacity is units processed per unit time
    var process = {
        currentTasks: [],
        completedQueue: [],
        capacity: processCapacity,
        pushTask: (task) =>{
            if(currentTasks.length<processCapacity){
                currentTasks.push(task);
            }
            else{
                console.error("Capacity full");
            }
            
        },
        completeTasks: (num) => {
            for(var i=0;i<num;i++){
                completedQueue.push(currentTasks.shift())
            }
        }
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
    newTask = "Task <br/>";
    req.push(newTask);
   
    var result= "";
    for(i= req.length-1; i>=0;i--){
        result=req[i]+result;
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
