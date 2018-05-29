function getProcess(processCapacity) {
    //capacity is units processed per unit time
    var process = {
        currentTasks: [],
        completedQueue: [],
        capacity: processCapacity,
        pushTask: (task,self) =>{
            if(self.currentTasks.length < self.capacity){
                self.currentTasks.push(task);
            }
            else{
                console.error("Capacity full");
            }
            
        },
        completeTasks: (num,self) => {
            for(var i=0;i<num;i++){
                if(self.currentTasks.length > 0){
                    self.completedQueue.push(self.currentTasks.shift())
                }
                
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
    newTask = getTask("task");
    req.push(newTask);
}

function oneTimeStep(){
    while(arr[0].currentTasks.length < arr[0].capacity && req.length > 0){
        arr[0].pushTask(req.shift(),arr[0])
    }
    for(var i=1;i<arr.length;i++){
        while(arr[i].currentTasks.length < arr[i].capacity && arr[i-1].completedQueue.length > 0){
            arr[i].pushTask(arr[i-1].completedQueue.shift(),arr[i])
        }
    }

    for(var i=0;i<arr.length;i++){
        arr[i].completeTasks(arr[i].capacity,arr[i])
    }
}

arr = getProcessArray(3);
req = []

for(var i =0;i<20;i++){
    req.push(getTask(i+""))
}

