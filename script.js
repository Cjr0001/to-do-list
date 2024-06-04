let taskList = [];

        function lister() {
            let x = document.getElementById("valtext").value;
            document.getElementById('valtext').value = "";
            if (x != '') {
                taskList.push({ text: x, editable: false, done: false });
            }
            displayTasks();
            localStorage.setItem("todolist", JSON.stringify(taskList));
        }

        function displayTasks() {
            let list = "Your Tasks are:<br>";
            for (let j = 0; j < taskList.length; j++) {
                let task = taskList[j];
                if (task.editable) {
                    list += `
                        <div class="task">
                            <input type="text" id="edit-${j}" value="${task.text}">
                            <button onclick="saveTask(${j})">Save</button>
                        </div>`;
                } else {
                    list += `
                        <div class="task ${task.done ? 'done' : ''}">
                            ${task.text}
                            <div>
                                <button class="edit" onclick="editTask(${j})">Edit</button>
                                <button onclick="markDone(${j})">${task.done ? 'Undone' : 'Done'}</button>
                                <button class="delete" onclick="deleteTask(${j})">Remove</button>
                            </div>
                        </div>`;
                }
            }
            document.getElementById("display-div").innerHTML = list;
        }

        function deleteTask(index) {
            taskList.splice(index, 1);
            displayTasks();
            localStorage.setItem("todolist", JSON.stringify(taskList));
        }

        function editTask(index) {
            taskList[index].editable = true;
            displayTasks();
        }

        function saveTask(index) {
            let editedText = document.getElementById(`edit-${index}`).value;
            taskList[index].text = editedText;
            taskList[index].editable = false;
            displayTasks();
            localStorage.setItem("todolist", JSON.stringify(taskList));
        }

        function markDone(index) {
            taskList[index].done = !taskList[index].done;
            displayTasks();
            localStorage.setItem("todolist", JSON.stringify(taskList));
        }

        window.onload = function() {
            let storedTaskList = JSON.parse(localStorage.getItem("todolist"));
            if (storedTaskList) {
                taskList = storedTaskList;
                displayTasks();
            }
        }