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

function addTask(){
    newTask = getTask("task");
    req.push(newTask);
}

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

for(var i =0;i<20;i++){
    req.push(getTask(i+""))
}

