import KeepApp, { Label, Note } from "@/components/app-page";

export default function Page() {
  const defaultNotes: Note[] = [
    {
      id: "1",
      title: "Weekend Tasks",
      type: "task",
      tasks: [
        { id: "1-1", text: "Go grocery shopping", completed: false },
        { id: "1-2", text: "Clean the garage", completed: true },
        { id: "1-3", text: "Finish work project", completed: false },
      ],
      isPinned: true,
    },
    {
      id: "2",
      title: "Books to Read",
      type: "task",
      tasks: [
        { id: "2-1", text: "The Great Gatsby", completed: false },
        { id: "2-2", text: "1984", completed: false },
        { id: "2-3", text: "To Kill a Mockingbird", completed: true },
      ],
      isPinned: false,
    },
    {
      id: "3",
      title: "Project Ideas",
      type: "markdown",
      content: `# Project Ideas
  
  1. Build a personal website
  2. Create a mobile app for task management
  3. Develop a machine learning model for image recognition
  
  Remember to research the latest technologies for each project!`,
      isPinned: true,
    },
    {
      id: "4",
      title: "Shopping List",
      type: "task",
      tasks: [
        { id: "4-1", text: "Milk", completed: false },
        { id: "4-2", text: "Eggs", completed: false },
        { id: "4-3", text: "Bread", completed: false },
        { id: "4-4", text: "Cheese", completed: true },
      ],
      isPinned: false,
    },
    {
      id: "5",
      title: "Meeting Notes",
      type: "markdown",
      content: `## Team Meeting - 2023-05-15
  
  - Discussed Q2 goals
  - Assigned new projects to team members
  - Scheduled next review for June 1st
  
  **Action Items:**
  - John: Prepare project timeline
  - Sarah: Research new technologies
  - Mike: Update client presentation`,
      isPinned: false,
    },
  ];

  const defaultLabels: Label[] = [
    { id: "1", name: "Personal" },
    { id: "2", name: "Work" },
    { id: "3", name: "Ideas" },
    { id: "4", name: "To-Do" },
    { id: "5", name: "Important" },
  ];

  return <KeepApp notes={defaultNotes} labels={defaultLabels} />;
}
