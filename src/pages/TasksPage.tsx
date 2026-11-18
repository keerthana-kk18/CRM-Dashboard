import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { Task, TaskPriority, TaskCategory } from '../types/crm';
import {
  CheckSquare,
  Plus,
  Clock,
  Phone,
  Mail,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge, getStatusBadgeVariant } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';

export const TasksPage: React.FC = () => {
  const { tasks, toggleTask, addTask } = useCRM();
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'COMPLETED'>('ALL');
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const [taskForm, setTaskForm] = useState({
    title: '',
    due: 'Tomorrow, 2:00 PM',
    priority: 'Medium' as TaskPriority,
    category: 'Follow-up' as TaskCategory,
    relatedTo: '',
  });

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'PENDING') return !t.completed;
    if (filter === 'COMPLETED') return t.completed;
    return true;
  });

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskForm.title) return;

    addTask({
      title: taskForm.title,
      due: taskForm.due,
      priority: taskForm.priority,
      category: taskForm.category,
      relatedTo: taskForm.relatedTo || 'General Account',
    });
    setIsAddTaskOpen(false);
    setTaskForm({
      title: '',
      due: 'Tomorrow, 2:00 PM',
      priority: 'Medium',
      category: 'Follow-up',
      relatedTo: '',
    });
  };

  const getCategoryIcon = (cat: TaskCategory) => {
    switch (cat) {
      case 'Call':
        return <Phone className="w-3.5 h-3.5 text-blue-500" />;
      case 'Meeting':
        return <Calendar className="w-3.5 h-3.5 text-amber-500" />;
      case 'Email':
        return <Mail className="w-3.5 h-3.5 text-purple-500" />;
      case 'Review':
        return <FileText className="w-3.5 h-3.5 text-cyan-500" />;
      default:
        return <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">CRM Tasks & Follow-ups</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Stay on top of deal milestones, customer call agendas, and executive reviews.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsAddTaskOpen(true)}
        >
          Add Task
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 bg-white border border-slate-200/80 p-1.5 rounded-2xl shadow-xs self-start text-xs font-medium">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-3 py-1.5 rounded-xl transition-all ${
            filter === 'ALL'
              ? 'bg-slate-900 text-white font-semibold shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          All Tasks ({tasks.length})
        </button>

        <button
          onClick={() => setFilter('PENDING')}
          className={`px-3 py-1.5 rounded-xl transition-all ${
            filter === 'PENDING'
              ? 'bg-brand-600 text-white font-semibold shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Pending ({pendingCount})
        </button>

        <button
          onClick={() => setFilter('COMPLETED')}
          className={`px-3 py-1.5 rounded-xl transition-all ${
            filter === 'COMPLETED'
              ? 'bg-emerald-600 text-white font-semibold shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`p-4 sm:px-5 flex items-start gap-3.5 hover:bg-slate-50/80 cursor-pointer transition-colors group ${
              task.completed ? 'bg-slate-50/40' : ''
            }`}
          >
            {/* Custom Checkbox */}
            <div className="mt-0.5 shrink-0">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                onClick={(e) => e.stopPropagation()}
                className="w-4.5 h-4.5 rounded text-brand-600 focus:ring-brand-500 border-slate-300 cursor-pointer"
              />
            </div>

            {/* Task Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <p
                  className={`text-sm font-semibold transition-all ${
                    task.completed
                      ? 'line-through text-slate-400 font-normal'
                      : 'text-slate-900 group-hover:text-brand-600'
                  }`}
                >
                  {task.title}
                </p>

                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={getStatusBadgeVariant(task.priority)} size="sm">
                    {task.priority} Priority
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                <span className="flex items-center gap-1 font-mono text-[11px] text-slate-400">
                  <Clock className="w-3 h-3" />
                  Due: {task.due}
                </span>

                <span className="text-slate-300">•</span>

                <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-medium">
                  {getCategoryIcon(task.category)}
                  {task.category}
                </span>

                {task.relatedTo && (
                  <>
                    <span className="text-slate-300 hidden sm:inline">•</span>
                    <span className="text-slate-600 font-medium hidden sm:inline">
                      Account: {task.relatedTo}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      <Modal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        title="Create New CRM Follow-up Task"
        description="Schedule a call, demo, or contract review task."
        footer={
          <>
            <Button variant="outline" size="md" onClick={() => setIsAddTaskOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={handleCreateTask}>
              Create Task
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateTask} className="space-y-3.5 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Task Description <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={taskForm.title}
              onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
              placeholder="e.g. Follow up on contract redlines with legal counsel"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Due Date / Time</label>
              <input
                type="text"
                value={taskForm.due}
                onChange={(e) => setTaskForm({ ...taskForm, due: e.target.value })}
                placeholder="Tomorrow, 3:00 PM"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Priority</label>
              <select
                value={taskForm.priority}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, priority: e.target.value as TaskPriority })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={taskForm.category}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, category: e.target.value as TaskCategory })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              >
                <option value="Call">Call</option>
                <option value="Meeting">Meeting</option>
                <option value="Email">Email</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Review">Review</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Related Account</label>
              <input
                type="text"
                value={taskForm.relatedTo}
                onChange={(e) => setTaskForm({ ...taskForm, relatedTo: e.target.value })}
                placeholder="e.g. Strata Health Global"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
