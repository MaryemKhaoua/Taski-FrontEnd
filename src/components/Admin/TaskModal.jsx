import { Modal, Form, Button, FloatingLabel, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import api from '../../api/axios';
import Swal from 'sweetalert2';

export default function TaskModal({ show, onHide, task, users, onSuccess, isAdmin }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    user_id: '',
    status: 'in_progress'
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (show) {
      setFormData({
        title: task?.title || '',
        description: task?.description || '',
        user_id: task?.user_id || '',
        status: task?.status || 'in_progress'
      });
      setError(null);
    }
  }, [task, show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task) {
        await api.put(`/tasks/${task.id}`, formData);
        Swal.fire('Updated!', 'Task updated successfully.', 'success');
      } else {
        await api.post('/tasks', formData);
        Swal.fire('Created!', 'Task added successfully.', 'success');
      }
      onSuccess();
      onHide();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{task ? 'Edit Task' : 'Create New Task'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <FloatingLabel controlId="title" label="Title" className="mb-3">
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter task title"
            />
          </FloatingLabel>

          <FloatingLabel controlId="description" label="Description" className="mb-3">
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ height: '100px' }}
              placeholder="Enter task description"
            />
          </FloatingLabel>

          {isAdmin && (
            <FloatingLabel controlId="assigned_user" label="Assign to" className="mb-3">
              <Form.Select
                name="user_id"
                value={formData.user_id}
                onChange={handleChange}
                required
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          )}

          <FloatingLabel controlId="status" label="Status" className="mb-3">
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </Form.Select>
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="light" className="text-danger" onClick={onHide}>
            Cancel
            </Button>

          <Button variant="primary" type="submit">
            Save Task
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}