import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../css/App.css';

function EditPost(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.news_title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleSave = () => {
    const updatedPost = { id: props.news_num, title: editedTitle };
    props.onSave(updatedPost);
    setIsEditing(false);
  };

  const handleDelete = () => {
    props.onDelete(props.news_num);
  };

  return (
    <div className="edit-post">
      <div style={{ width: "80%" }}>
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={handleChange}
            className="form-control"
          />
        ) : (
          <h4>{editedTitle}</h4>
        )}
      </div>
      <div className="edit-btn">
        {isEditing ? (
          <button onClick={handleSave} className='btn btn-outline-success edit-post-btn'>
            Save
          </button>
        ) : (
          <button onClick={handleEdit} className='btn btn-outline-primary edit-post-btn'>
            Edit
          </button>
        )}
        <button onClick={handleDelete} className='btn btn-danger edit-post-btn'>
          {props.btn[1]}
        </button>
      </div>
    </div>
  );
}

EditPost.propTypes = {
  news_title: PropTypes.string,
  btn: PropTypes.arrayOf(PropTypes.string),
  news_num: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

EditPost.defaultProps = {
  news_title: "Hello this is news of limited words....",
  btn: ['Edit', 'Delete'],
  news_num: 0
};

export default EditPost;