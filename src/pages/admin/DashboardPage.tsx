import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useProjects } from '@/context/ProjectsContext';
import { Button, Card, CardHeader, CardBody } from '@/components/common';
import { ProjectFormModal } from '@/components/admin/ProjectFormModal';
import { ProjectsTable } from '@/components/admin/ProjectsTable';
import { Plus, LogOut } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { projects, loading } = useProjects();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<string | null>(null);

  React.useEffect(() => {
    if (!user) {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const handleEditProject = (projectId: string) => {
    setEditingProject(projectId);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProject(null);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-primary py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Welcome, {user.email}</p>
          </div>
          <Button
            variant="secondary"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            Logout
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Total Projects</p>
              <p className="text-4xl font-bold text-accent mt-2">{projects.length}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Published</p>
              <p className="text-4xl font-bold text-green-400 mt-2">{projects.length}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Last Updated</p>
              <p className="text-lg font-semibold text-gray-300 mt-2">
                {projects[0] ? new Date(projects[0].updatedAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </Card>
        </div>

        {/* Projects Section */}
        <Card>
          <CardHeader
            title="Projects Management"
            description="Add, edit, or delete your portfolio projects"
          />
          <CardBody>
            {isFormOpen ? (
              <ProjectFormModal
                editingProjectId={editingProject}
                onClose={handleCloseForm}
              />
            ) : (
              <>
                <div className="flex justify-end mb-6">
                  <Button
                    variant="primary"
                    onClick={handleAddProject}
                  >
                    <Plus size={20} />
                    Add New Project
                  </Button>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 border-4 border-gray-700 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading projects...</p>
                  </div>
                ) : projects.length > 0 ? (
                  <ProjectsTable
                    projects={projects}
                    onEdit={handleEditProject}
                  />
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-400 mb-4">No projects yet. Create your first project!</p>
                    <Button variant="primary" onClick={handleAddProject}>
                      <Plus size={20} />
                      Create Project
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
