import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import css from "./ourProjet.module.scss";
import ImageUpload from "../imageUpload/ImageUpload";
import addData from "../../redux/action/addData";


const OurProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageData, setImageData] = useState(null);
  const dispatch = useDispatch();
  console.log(imageData,"---------->")
  const handleAddProject = () => {
    if (!title || !description || !imageData) {
      alert('Please fill in all fields and upload an image.');
      return;
    }

    const newProject = {
      projectname: title,
      description,
      img: imageData.url,
    };


    dispatch(addData({ ourproject: newProject }));
    console.log(newProject,"newProject--------------------------------------kmhim")
    setTitle('');
    setDescription('');
    setImageData(null);
  };

  return (
    <div className={css['project-container']}>
      <h2>Our Projects</h2>
      <div className={css['project-form']}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <ImageUpload onImageUpload={setImageData} />
        <button onClick={handleAddProject}>Add Project</button>
      </div>
    </div>
  );
};

export default OurProject;
