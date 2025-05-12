import React from "react";

const BookForm = ({ book, onSubmit, onCancel }) => {
    const [formData, setFormData] = React.useState({
        title: book?.title || "",
        author: book?.author || "",
        genre: book?.genre || "",
        availabilityStatus: book?.availabilityStatus || "AVAILABLE",
    });

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-gray-800 text-white p-6 rounded-xl shadow-md space-y-4"
        >
            {["title", "author", "genre"].map((field) => (
                <div key={field}>
                    <label className="block capitalize">{field}</label>
                    <input
                        type="text"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700"
                        required
                    />
                </div>
            ))}

            <div>
                <label>Status</label>
                <select
                    name="availabilityStatus"
                    value={formData.availabilityStatus}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700"
                >
                    <option value="AVAILABLE">Available</option>
                    <option value="CHECKED_OUT">Checked Out</option>
                </select>
            </div>

            <div className="flex justify-end gap-2">
                <button type="submit" className="bg-blue-500 px-4 py-2 rounded">
                    Save
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-red-500 px-4 py-2 rounded"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default BookForm;
