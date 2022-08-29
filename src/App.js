import "./App.css";
import List from "./List";
import { useState } from "react";
import { uid } from "uid";

function App() {
  const [contacts, setContacts] = useState([]);

  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  function handleChange(e) {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    let data = [...contacts];

    if (formData.name === "") {
      return false;
    }
    if (formData.email === "") {
      return false;
    }

    if (isUpdate.status) {
      data.forEach((contact) => {
        if (contact.id === isUpdate.id) {
          contact.name = formData.name;
          contact.email = formData.email;
        }
      });
    } else {
      data.push({ id: uid(), name: formData.name, email: formData.email });
    }
    // menambahkan kontak //

    setContacts(data);
    setFormData({ name: "", email: "" });
    setIsUpdate({ id: null, status: false });
  }

  function handleEdit(id) {
    let data = [...contacts];
    let foundData = data.find((contact) => contact.id === id);
    setFormData({ name: foundData.name, email: foundData.email });
    setIsUpdate({ id: id, status: true });
  }

  function handleDelete(id) {
    let data = [...contacts];
    let filteredData = data.filter((contact) => contact.id != id);
    setContacts(filteredData)
  }
  return (
    <div className="App">
      <h1 className="px-3 py-3">My Contact List</h1>

      <form onSubmit={handleSubmit} className="px-3 py-4">
        <div className="form-group">
          <label htmlFor="">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={formData.name}
            name="name"
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="">Email</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={formData.email}
            name="email"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Save
          </button>
        </div>
      </form>

      <List handleDelete={handleDelete} handleEdit={handleEdit} data={contacts} />
    </div>
  );
}

export default App;
