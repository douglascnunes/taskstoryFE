import { useMutation } from "@tanstack/react-query";
import { createActivity } from "../../../api/activities";
import { Form, useParams } from "react-router-dom";

export default function Modal({ isOpen, onClose, activity }) {
  const params = useParams();
  const [formData, setFormData] = useState({ title: "", description: "" });

  const { mutate } = useMutation({
    mutationFn: createActivity
  });

  function handleSubmit() {
    mutate({ id: params.id, activity: formData });
    onClose();
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    handleSubmit();
  };

  if (!isOpen) {
    return null;
  };

  return (
    <div className="modal">
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          onBlur={handleBlur}
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          onBlur={handleBlur}
        />
      </Form>
    </div>
  )
};