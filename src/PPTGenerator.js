import React, { useState } from "react";
import pptxgen from "pptxgenjs";

const PPTGenerator = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const generatePPT = () => {
    if (!title || !imageFile) {
      alert("Title and Image are required!");
      return;
    }

    const pptx = new pptxgen();

    const titleSlide = pptx.addSlide();
    titleSlide.addText(title, {
      x: 2,
      y: 2,
      w: "100%",
      h: 1.5,
      align: "center",
      fontSize: 44,
      color: "#00008B",
      bold: true,
      italic: true,
    });

    const maxCharsPerSlide = 680;
    let remainingDescription = description;

    while (remainingDescription.length > 0) {
      const currentDescription = remainingDescription.substring(
        0,
        maxCharsPerSlide
      );
      remainingDescription = remainingDescription.substring(maxCharsPerSlide);

      const descriptionSlide = pptx.addSlide();
      descriptionSlide.addText(currentDescription, {
        x: 1,
        y: 1,
        w: "80%",
        h: 3,
        fontSize: 16,
        color: "#AA336A",
        italic: true,
        align: "justify",
      });
    }

    const imageSlide = pptx.addSlide();
    imageSlide.addImage({
      path: imageFile,
      x: 2,
      y: 1,
      w: 6,
      h: 4,
    });

    pptx.writeFile({ fileName: "presentation" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(URL.createObjectURL(file));
  };

  return (
    <div className="container mx-auto my-8 text-center">
      <h1 className="text-4xl font-bold mb-6 text-blue-500">
        PPT Generator Application
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Your Title:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter slide title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Add Description:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Enter slide description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="imageFile"
        >
          Add Image:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="imageFile"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <button
        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={generatePPT}
      >
        Generate PPT
      </button>
    </div>
  );
};

export default PPTGenerator;
