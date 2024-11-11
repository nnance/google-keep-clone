"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  LightbulbIcon,
  BellIcon,
  ArchiveIcon,
  TrashIcon,
  Menu,
  MoreVertical,
  Pin,
  X,
  Copy,
  Trash2,
  Palette,
  Image as ImageIcon,
  Tag,
  CheckSquare,
  Clock,
  Undo,
  Redo,
} from "lucide-react";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface BaseNote {
  id: string;
  title: string;
  isPinned: boolean;
}

interface TaskNote extends BaseNote {
  type: "task";
  tasks: Task[];
}

interface MarkdownNote extends BaseNote {
  type: "markdown";
  content: string;
}

export type Note = TaskNote | MarkdownNote;

export interface Label {
  id: string;
  name: string;
}

interface KeepAppProps {
  notes?: Note[];
  labels?: Label[];
}

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

const defaultLabels: Label[] = [];

export default function KeepApp({
  notes = defaultNotes,
  labels = defaultLabels,
}: KeepAppProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderNote = (note: Note) => (
    <Card key={note.id} className="mb-6 bg-zinc-800 border-zinc-700">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-bold text-zinc-100">{note.title}</h2>
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-100 hover:text-zinc-100"
          >
            <Pin className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {note.type === "task" &&
            note.tasks.map((task) => (
              <div key={task.id} className="flex items-center">
                <Checkbox
                  id={task.id}
                  checked={task.completed}
                  className={cn(
                    "mr-2 border-zinc-100 text-zinc-100",
                    "data-[state=checked]:bg-zinc-100 data-[state=checked]:text-zinc-800"
                  )}
                />
                <label
                  htmlFor={task.id}
                  className={cn(
                    "text-sm text-zinc-100",
                    task.completed && "line-through"
                  )}
                >
                  {task.text}
                </label>
              </div>
            ))}
          {note.type === "markdown" && (
            <div className="text-sm text-zinc-100 whitespace-pre-wrap">
              {note.content}
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-100 hover:text-zinc-100"
            >
              <CheckSquare className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-100 hover:text-zinc-100"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-100 hover:text-zinc-100"
            >
              <Clock className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-100 hover:text-zinc-100"
            >
              <Palette className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-100 hover:text-zinc-100"
            >
              <ArchiveIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-100 hover:text-zinc-100"
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-100 hover:text-zinc-100"
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-100 hover:text-zinc-100"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 bg-zinc-800 border-zinc-700 text-zinc-100">
              <div className="grid gap-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-100 hover:text-zinc-100"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete note
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-100 hover:text-zinc-100"
                >
                  <Tag className="mr-2 h-4 w-4" />
                  Add label
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-100 hover:text-zinc-100"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Make a copy
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-100 hover:text-zinc-100"
                >
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Add image
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-100 hover:text-zinc-100"
                >
                  <Palette className="mr-2 h-4 w-4" />
                  Change color
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex h-screen bg-zinc-900 text-zinc-100">
      {/* Sidebar for larger screens */}
      <aside
        className={`w-64 p-4 border-r border-zinc-700 fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 bg-zinc-900 md:bg-transparent`}
      >
        <div className="flex items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-2">
            <Menu
              className="h-6 w-6 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <h1 className="text-xl font-semibold">Keep</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav>
          <Button variant="ghost" className="w-full justify-start mb-1">
            <LightbulbIcon className="mr-2 h-4 w-4" />
            Notes
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-1">
            <BellIcon className="mr-2 h-4 w-4" />
            Reminders
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-1">
            <ArchiveIcon className="mr-2 h-4 w-4" />
            Archive
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-1">
            <TrashIcon className="mr-2 h-4 w-4" />
            Trash
          </Button>
        </nav>
        <div className="mt-6">
          <h2 className="text-sm font-semibold mb-2">Labels</h2>
          {labels.map((label) => (
            <Button
              key={label.id}
              variant="ghost"
              className="w-full justify-start mb-1 text-sm"
            >
              {label.name}
            </Button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="p-4">
          {/* Top Bar */}
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
              <Input
                type="text"
                placeholder="Search"
                className="pl-10 bg-zinc-800 border-zinc-700 text-zinc-100 w-full"
              />
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4">
            <div className="max-w-4xl mx-auto">
              {/* Pinned Notes */}
              {notes.filter((note) => note.isPinned).map(renderNote)}

              {/* Other Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {notes
                  .filter((note) => !note.isPinned)
                  .map((note) => (
                    <Card key={note.id} className="bg-zinc-800 border-zinc-700">
                      <CardContent className="p-4">
                        <h3 className="text-lg font-bold text-zinc-100 mb-2">
                          {note.title}
                        </h3>
                        {note.type === "task" &&
                          note.tasks.map((task) => (
                            <p key={task.id} className="text-sm text-zinc-100">
                              {task.text}
                            </p>
                          ))}
                        {note.type === "markdown" && (
                          <p className="text-sm text-zinc-100">
                            {note.content.split("\n")[0]}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </main>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
