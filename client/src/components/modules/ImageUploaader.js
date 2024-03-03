import React, { useState } from 'react';

const ImageUploader = () => {
  const [items, setItems] = useState([]); // Assuming you fetch these from the backend
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission to upload the image to MongoDB
    // You'll need to use a function here to submit the form data
  };

  return (
    <div>
      <h1>To Upload Image on mongoDB</h1>
      <hr />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="name">Image Title</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={formData.name}
            name="name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="desc">Image Description</label>
          <textarea
            id="desc"
            name="desc"
            value={formData.desc}
            rows="2"
            placeholder="Description"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <hr />
      <h1>Uploaded Images</h1>
      <div>
        {items.map((image, index) => (
          <div key={index}>
            <img
              src={`data:image/${image.img.contentType};base64,${image.img.data.toString('base64')}`}
              alt={image.name}
            />
            <div>
              <h5>{image.name}</h5>
              <p>{image.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
