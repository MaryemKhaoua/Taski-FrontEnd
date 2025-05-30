import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../assets/Navbar/Navbar";
import api from "../../api/axios";
import { Spinner, Alert, Form, InputGroup, Pagination } from "react-bootstrap";
import TaskModal from "./TaskModal";
import Swal from "sweetalert2";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login", { replace: true });
    } else if (user) {
      fetchData();
    }
  }, [user, authLoading, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tasksRes, usersRes] = await Promise.all([
        api.get("/tasks"),
        user?.role === "admin" ? api.get("/users") : Promise.resolve(null),
      ]);
      setTasks(tasksRes.data);
      if (usersRes) setUsers(usersRes.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId, status) => {
    try {
      await api.put(`/tasks/${taskId}`, { status });
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
    }
  };

  const handleDelete = async (taskId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/tasks/${taskId}`);
        fetchData();
        Swal.fire("Deleted!", "Task has been deleted.", "success");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete task");
      }
    }
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentTask(null);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;
      const matchesUser =
        userFilter === "all" || task.user?.id === parseInt(userFilter);

      return matchesSearch && matchesStatus && matchesUser;
    });
  }, [tasks, searchTerm, statusFilter, userFilter]);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const paginatedTasks = filteredTasks.slice(
    startIndex,
    startIndex + tasksPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, userFilter]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setUserFilter("all");
    setCurrentPage(1);
  };

  if (authLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="container-fluid" style={{ maxWidth: "64rem" }}>
          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          )}

          <div className="mb-4">
            <h1 className="welcome-title">
              Welcome, <span className="username-accent">{user?.username}</span>
              .
            </h1>
            <p className="subtitle">
              {user?.role === "admin" ? "Your team got" : "You got"}{" "}
              {filteredTasks.length} of {tasks.length}{" "}
              {tasks.length === 1 ? "task" : "tasks"}
              {searchTerm || statusFilter !== "all" || userFilter !== "all"
                ? " (filtered)"
                : ""}
              .
            </p>

          </div>

          <div className="filters-section">
            <div className="d-flex gap-3 align-items-center mb-4">
              <div className="flex-fill">
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <InputGroup.Text>
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </InputGroup.Text>
                </InputGroup>
              </div>

              <div style={{ minWidth: "150px" }}>
                <Form.Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
                </Form.Select>
              </div>

              <div style={{ minWidth: "150px" }}>
                <Form.Select
                  value={userFilter}
                  onChange={(e) => setUserFilter(e.target.value)}
                >
                  <option value="all">All Users</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.username}
                    </option>
                  ))}
                </Form.Select>
              </div>

              <button onClick={clearFilters} className="clear-filters-btn">
                Clear
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <>
              {paginatedTasks.length === 0 ? (
                <div className="no-tasks-message">
                  <div className="text-center py-5">
                    <svg
                      width="64"
                      height="64"
                      fill="#dee2e6"
                      viewBox="0 0 16 16"
                      className="mb-3"
                    >
                      <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353L4.707 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    </svg>
                    <h5 className="text-muted">No tasks found</h5>
                    <p className="text-muted">
                      {searchTerm ||
                      statusFilter !== "all" ||
                      userFilter !== "all"
                        ? "Try adjusting your filters"
                        : "No tasks available"}
                    </p>
                  </div>
                </div>
              ) : (
                paginatedTasks.map((task) => (
                  <div key={task.id} className="task-card">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-fill">
                        <div className="user-tag d-flex align-items-center gap-2">
                          {task.status === "done" && (
                            <svg
                              width="16"
                              height="16"
                              fill="#0d6efd"
                              viewBox="0 0 16 16"
                            >
                              <path d="M13.485 1.929a1 1 0 0 1 1.414 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4A1 1 0 1 1 2.929 5.93L6.5 9.5l7-7z" />
                            </svg>
                          )}
                          @{task.user?.username || "Unassigned"}
                        </div>
                        <h3
                          className={`task-title ${
                            task.status === "done"
                              ? "text-decoration-line-through text-muted"
                              : ""
                          }`}
                        >
                          {task.title}
                        </h3>
                        <p
                          className={`task-description ${
                            task.status === "done"
                              ? "text-decoration-line-through text-muted"
                              : ""
                          }`}
                        >
                          {task.description}
                        </p>
                      </div>

                      <div className="task-actions ms-3">
                        {user?.role === "admin" && (
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="icon-btn icon-btn-delete"
                          >
                            <svg
                              width="18"
                              height="18"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                          </button>
                        )}

                        {task.status !== "done" && (
                          <>
                            <button
                              onClick={() => handleEditTask(task)}
                              className="icon-btn icon-btn-edit"
                            >
                              <svg
                                width="18"
                                height="18"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                              </svg>
                            </button>

                            <button
                              onClick={() =>
                                handleStatusChange(task.id, "done")
                              }
                              className="done-btn"
                            >
                              Done
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}

              {totalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div className="pagination-info">
                    Showing {startIndex + 1} to{" "}
                    {Math.min(startIndex + tasksPerPage, filteredTasks.length)}{" "}
                    of {filteredTasks.length} tasks
                  </div>
                  <Pagination className="mb-0">
                    <Pagination.First
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                    />
                    <Pagination.Prev
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    />

                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <Pagination.Item
                            key={page}
                            active={page === currentPage}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </Pagination.Item>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return <Pagination.Ellipsis key={page} />;
                      }
                      return null;
                    })}

                    <Pagination.Next
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    />
                    <Pagination.Last
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </div>
              )}

              {user?.role === "admin" && (
                <div className="add-task-card">
                  <button
                    onClick={() => setShowModal(true)}
                    className="add-task-btn"
                  >
                    <div className="plus-icon-container">
                      <svg
                        width="14"
                        height="14"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                      </svg>
                    </div>
                    <span className="add-task-text">Add a new task...</span>
                  </button>
                </div>
              )}
            </>
          )}

          <TaskModal
            show={showModal}
            onHide={handleCloseModal}
            task={currentTask}
            users={users}
            onSuccess={fetchData}
            isAdmin={user?.role === "admin"}
          />
        </div>
      </div>
    </>
  );
}