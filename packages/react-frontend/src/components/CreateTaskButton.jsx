import "../styles/CreateTaskButton.css";
import PropTypes from "prop-types";

// onclick is the props -> use to open modal
function CreateTaskButton({ onClick }) {
  return (
    <button id="CreateTask" onClick={onClick}>
      Create Task
    </button>
  );
}

CreateTaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  initialEvent: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    deadline: PropTypes.string,
    details: PropTypes.string,
    in_progress: PropTypes.bool,
    course_no: PropTypes.shape({
      dept: PropTypes.string.isRequired,
      no: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }),
  }),
};

export default CreateTaskButton;
