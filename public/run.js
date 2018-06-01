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
datapoints = []

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

    var dataPoint = {
        name: "Process",
        type: "spline",
        showInLegend: true,
        dataPoints: [
            // { x: 0, y: 31 }
        ]
    }
    data.push(dataPoint)
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

    setData(getPoints());
    buildChart();
}

function setData(points){
    for(var i=0 ; i<points.length;i++){
        data[i]["dataPoints"].push({
            x:currentTime,
            y:points[i]
        })
    }
}

function getPoints(){
    var points = []
    var tot = 0;
    for(var i=pro.length-1;i>=0;i++){
        tot = tot + pro[i].completedQueue.length
        points.push(tot);
    }
    return points;
}

// pro = getProcessproay(3);
req = []
data = []
// for(var i =0;i<20;i++){
//     req.push(getTask(i+""))
// }
function buildChart(){
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title:{
            text: "Daily High Temperature at Different Beaches"
        },
        axisX: {
            valueFormatString: "DD MMM,YY"
        },
        axisY: {
            title: "Temperature (in °C)",
            includeZero: false,
            suffix: " °C"
        },
        legend:{
            cursor: "pointer",
            fontSize: 16,
            itemclick: toggleDataSeries
        },
        toolTip:{
            shared: true
        },
        data:[]
        // data: [{
        //     name: "Myrtle Beach",
        //     type: "spline",
        //     showInLegend: true,
        //     dataPoints: [
        //         { x: new Date(2017,6,24), y: 31 },
        //         { x: new Date(2017,6,25), y: 31 },
        //         { x: new Date(2017,6,26), y: 29 },
        //         { x: new Date(2017,6,27), y: 29 },
        //         { x: new Date(2017,6,28), y: 31 },
        //         { x: new Date(2017,6,29), y: 30 },
        //         { x: new Date(2017,6,30), y: 29 }
        //     ]
        // },
        // {
        //     name: "Martha Vineyard",
        //     type: "spline",
        //     yValueFormatString: "#0.## °C",
        //     showInLegend: true,
        //     dataPoints: [
        //         { x: new Date(2017,6,24), y: 20 },
        //         { x: new Date(2017,6,25), y: 20 },
        //         { x: new Date(2017,6,26), y: 25 },
        //         { x: new Date(2017,6,27), y: 25 },
        //         { x: new Date(2017,6,28), y: 25 },
        //         { x: new Date(2017,6,29), y: 25 },
        //         { x: new Date(2017,6,30), y: 25 }
        //     ]
        // },
        // {
        //     name: "Nantucket",
        //     type: "spline",
        //     yValueFormatString: "#0.## °C",
        //     showInLegend: true,
        //     dataPoints: [
        //         { x: new Date(2017,6,24), y: 22 },
        //         { x: new Date(2017,6,25), y: 19 },
        //         { x: new Date(2017,6,26), y: 23 },
        //         { x: new Date(2017,6,27), y: 24 },
        //         { x: new Date(2017,6,28), y: 24 },
        //         { x: new Date(2017,6,29), y: 23 },
        //         { x: new Date(2017,6,30), y: 23 }
        //     ]
        // }]
    });
    chart.render();
}


function toggleDataSeries(e){
	if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	}
	else{
		e.dataSeries.visible = true;
	}
	chart.render();
}