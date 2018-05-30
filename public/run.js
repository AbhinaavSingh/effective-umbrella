function getProcess(processCapacity) {
    //capacity is units processed per unit time
    var process = {
        currentTasks: [],
        completedQueue: [],
        capacity: processCapacity,
        pushTask: (task,self) =>{
            // if(self.currentTasks.length < self.capacity){
            //     self.currentTasks.push(task);
            // }
            // else{
            //     console.error("Capacity full");
            // }
            self.completedQueue.push(task);
            
        },
        // completeTasks: (num,self) => {
        //     for(var i=0;i<num;i++){
        //         if(self.currentTasks.length > 0){
        //             self.completedQueue.push(self.currentTasks.shift())
        //         }
                
        //     }
        // }
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

var req = []
function addTask(){
    newTask = "<tr>    <td>Task</td></tr>";
    req.push(newTask);
   
    var result= "";
    for(i= req.length-1; i>=0;i--){
        result=req[i]+result;
    }
    document.getElementById("taskTable").innerHTML = result;
    document.getElementById("numberOfTasks").innerHTML = req.length;
}    
arr = getProcessArray(3);


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
                arr[i].pushTask(arr[i-1].completedQueue.shift(),arr[i])
            }
        }
    }

    for (var i=0;i<arr[0].capacity;i++){
        if(req.length > 0){
            arr[0].pushTask(req.shift(),arr[0])
        }
    }
}

arr = getProcessArray(3);
req = []

// for(var i =0;i<20;i++){
//     req.push(getTask(i+""))
// }

