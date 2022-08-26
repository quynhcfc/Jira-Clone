const initialState = {
  taskDetailModal: {
    priorityTask: {
      priorityId: 3,
      priority: "Low",
    },
    taskTypeDetail: {
      id: 2,
      taskType: "new task",
    },
    assigness: [
      {
        id: 2440,
        avatar: "https://ui-avatars.com/api/?name=Khai",
        name: "Khai",
        alias: "khai",
      },
      {
        id: 1191,
        avatar: "https://ui-avatars.com/api/?name=khai 123",
        name: "khai 123",
        alias: "khai",
      },
    ],
    lstComment: [],
    taskId: 5357,
    taskName: "Task 06",
    alias: "task-06",
    description: "<p>Giao task&nbsp;</p>",
    statusId: "2",
    originalEstimate: 15,
    timeTrackingSpent: 16,
    timeTrackingRemaining: 8,
    typeId: 2,
    priorityId: 3,
    projectId: 7018,
  },
};

export const TaskDetailModalReducer = (state = initialState, action) => {
  switch (action.type) {
    //
    default:
      return state;
  }
};
