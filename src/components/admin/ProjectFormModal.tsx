import React, { useState, useEffect } from 'react';
import { useProjects } from '@/context/ProjectsContext';
import { Button, Input, Textarea, Card } from '@/components/common';
import { PORTFOLIO_SECTORS } from '@/constants/config';
import { X, Upload } from 'lucide-react';
import type { ProjectFormData } from '@/types';

interface ProjectFormModalProps {
  editingProjectId: string | null;
  onClose: () => void;
}

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  editingProjectId,
  onClose,
}) => {
  const { projects, addProject, updateProject } = useProjects();
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    shortDescription: '',
    sector: PORTFOLIO_SECTORS[1]?.id || 'ecommerce',
    liveLink: '',
    codeLink: '',
    technologies: [],
  });
  const [techInput, setTechInput] = useState('');
  const [errors, setErrors] = useState<Partial<ProjectFormData>>({});

  // Load existing project data if editing
  useEffect(() => {
    if (editingProjectId) {
      const project = projects.find((p) => p.id === editingProjectId);
      if (project) {
        setFormData({
          title: project.title,
          description: project.description,
          shortDescription: project.shortDescription,
          sector: project.sector,
          liveLink: project.liveLink,
          codeLink: project.codeLink || '',
          technologies: project.technologies,
        });
        setImagePreview(project.imageUrl);
      }
    }
  }, [editingProjectId, projects]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTechnology = () => {
    if (techInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput('');
    }
  };

  const handleRemoveTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProjectFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Short description is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.liveLink.trim()) {
      newErrors.liveLink = 'Live link is required';
    }

    if (formData.technologies.length === 0) {
      newErrors.technologies = ['Add at least one technology'];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      if (editingProjectId) {
        await updateProject(editingProjectId, formData);
      } else {
        await addProject(formData);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save project:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">
            {editingProjectId ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-200">
              Project Image
            </label>
            <div className="relative">
              {imagePreview && (
                <div className="mb-4 h-48 bg-gray-900 rounded-lg overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg hover:border-accent cursor-pointer transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="text-gray-400 mb-2" size={24} />
                  <p className="text-gray-400 text-sm">Click to upload image</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={submitting}
                />
              </label>
            </div>
          </div>

          {/* Title */}
          <Input
            label="Project Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Amazing E-commerce Store"
            error={errors.title}
            disabled={submitting}
            required
          />

          {/* Short Description */}
          <Textarea
            label="Short Description"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Brief description of the project"
            rows={2}
            error={errors.shortDescription}
            disabled={submitting}
            required
          />

          {/* Full Description */}
          <Textarea
            label="Full Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Detailed description of the project"
            rows={4}
            error={errors.description}
            disabled={submitting}
            required
          />

          {/* Sector */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-200">
              Sector <span className="text-danger">*</span>
            </label>
            <select
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              className="input-field"
              disabled={submitting}
            >
              {PORTFOLIO_SECTORS.slice(1).map((sector) => (
                <option key={sector.id} value={sector.id}>
                  {sector.name}
                </option>
              ))}
            </select>
          </div>

          {/* Live Link */}
          <Input
            label="Live Project Link"
            name="liveLink"
            type="url"
            value={formData.liveLink}
            onChange={handleChange}
            placeholder="https://example.com"
            error={errors.liveLink}
            disabled={submitting}
            required
          />

          {/* Code Link */}
          <Input
            label="Code Repository Link (Optional)"
            name="codeLink"
            type="url"
            value={formData.codeLink}
            onChange={handleChange}
            placeholder="https://github.com/username/repo"
            disabled={submitting}
          />

          {/* Technologies */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-200">
              Technologies <span className="text-danger">*</span>
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTechnology();
                  }
                }}
                placeholder="React, TypeScript, etc."
                className="input-field flex-1"
                disabled={submitting}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleAddTechnology}
                disabled={submitting || !techInput.trim()}
              >
                Add
              </Button>
            </div>
            {formData.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech) => (
                  <div
                    key={tech}
                    className="badge bg-accent bg-opacity-20 text-accent flex items-center gap-2"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTechnology(tech)}
                      className="hover:text-red-400"
                      disabled={submitting}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.technologies && (
              <p className="text-danger text-sm mt-2">{errors.technologies}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-700">
            <Button
              type="submit"
              variant="primary"
              isLoading={submitting}
              className="flex-1"
            >
              {editingProjectId ? 'Update Project' : 'Add Project'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={submitting}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
