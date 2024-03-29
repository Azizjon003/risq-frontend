import { useEffect, useState } from "react";
import axios from "../api/axios";

export const AddCategoryModal = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!e.target.files[0]) {
      setImage("");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const res = await axios.post(`/upload`, formData);
      setImage(res?.data?.data?.data?.url);
      console.log("image", res?.data?.data?.data?.url);
    } catch (err) {
      console.log(`Error in image upload ${err}`);
    }
  };

  const handleCreateCategory = async () => {
    if (!name.length || !image.length) return;
    try {
      await axios.post(
        "/api/v1/category",
        JSON.stringify({
          name,
          image,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setImage("");
      setName("");
    } catch (err) {
      console.log(`Error in Creating Category: ${err}`);
    }
  };

  return (
    <div
      className="modal fade"
      id="addCategoryModal"
      tabIndex="-1"
      aria-labelledby="addCategoryModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen-sm-down">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addCategoryModalLabel">
              Добавить Категорию
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form action="">
              <div className="mb-3">
                <label htmlFor="defaultFormControlInput" className="form-label">
                  Заголовок
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="defaultFormControlInput"
                  placeholder="Напитки"
                  aria-describedby="defaultFormControlHelp"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div id="defaultFormControlHelp" className="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Загрузить Изобрежание
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={handleImageUpload}
                />
              </div>
              {image.length ? (
                <div className="mb-3">
                  <img src={`${image}`} alt="uploaded" width={200} />
                </div>
              ) : (
                ""
              )}
            </form>
          </div>
          <div className="modal-footer d-flex justify-content-start">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Отмена
            </button>
            <button
              onClick={() => handleCreateCategory(name)}
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addCategoryModal"
            >
              Создать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EditCategoryModal = ({ id }) => {
  const [category, setCategory] = useState({
    name: "",
  });

  const fetchCategory = async () => {
    try {
      const res = await axios.get(`/api/v1/branches/${id}`);
      // console.log("cat", res?.data?.data?.data?.category);
      setCategory(res?.data?.data);
    } catch (err) {
      console.log(`Error in fetching category: ${err}`);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCategory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // const handleImageUpload = async (e) => {
  //   e.preventDefault();
  //   if (!e.target.files[0]) {
  //     return;
  //   }
  //   try {
  //     const formData = new FormData();
  //     formData.append("image", e.target.files[0]);
  //     const res = await axios.post(`/upload`, formData);
  //     setCategory({ ...category, image: res?.data?.data?.data?.url });
  //     console.log("image", res?.data?.data?.data?.url);
  //   } catch (err) {
  //     console.log(`Error in image upload ${err}`);
  //   }
  // };

  const handleUpdateCategory = async () => {
    try {
      const res = await axios.patch(`/api/v1/branches/${id}`, category);
      console.log("res", res?.data);
    } catch (err) {
      console.log(`Error in update category ${err}`);
    }
  };

  console.log("c", category);

  return (
    <div
      className="modal fade"
      id="editCategoryModal"
      tabIndex="-1"
      aria-labelledby="editCategoryModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen-sm-down">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editCategoryModalLabel">
              Редактировать Категорию
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form action="">
              <div className="mb-3">
                <label htmlFor="defaultFormControlInput" className="form-label">
                  Заголовок
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="defaultFormControlInput"
                  placeholder="Напитки"
                  aria-describedby="defaultFormControlHelp"
                  value={category?.name || ""}
                  onChange={(e) =>
                    setCategory({ ...category, name: e.target.value })
                  }
                />
                <div id="defaultFormControlHelp" className="form-text d-none">
                  We'll never share your details with anyone else.
                </div>
              </div>
              {/* <div className="mb-3">
                <label
                  htmlFor="formFile"
                  className="form-label"
                  onChange={handleImageUpload}
                >
                  Загрузить Изобрежание
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={handleImageUpload}
                />
              </div>
              {category?.image.length ? (
                <div className="mb-3">
                  <img src={`${category?.image}`} alt="uploaded" width={200} />
                </div>
              ) : (
                ""
              )} */}
            </form>
          </div>
          <div className="modal-footer d-flex justify-content-start">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Отмена
            </button>
            <button
              type="button"
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#editCategoryModal"
              onClick={handleUpdateCategory}
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DeleteCategoryModal = ({ id }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/v1/category/${id}`);
    } catch (error) {
      console.log(`Error in deleting category ${error}`);
    }
  };

  return (
    <div
      className="modal fade"
      id="deleteCategoryModal"
      tabIndex="-1"
      aria-labelledby="deleteCategoryModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteCategoryModalLabel">
              <div className="alert">
                Вы уверены, что хотите удалить эту категорию?
              </div>
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body"></div>
          <div className="modal-footer d-flex justify-content-start">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Отмена
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
              data-bs-toggle="modal"
              data-bs-target="#deleteCategoryModal"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
